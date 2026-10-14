/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 100-host-sim.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 10. HOST SIMULATION (lowest uid present) */
function hostTick(now) {
    const players = [hero.pos, ...Object.values(remotePlayers).map(p => new THREE.Vector3(p.x, p.y, p.z))];
    const corePos = new THREE.Vector3(CORE_POS.x, 0, CORE_POS.z), upd = {}; let coreDmg = 0; const structDmg = {};
    Object.values(worldMobs).forEach(m => {
        if ((m.state || '').startsWith('DEAD')) {
            const ttl = m.boss ? 90000 : m.rival ? 60000 : 45000;
            if (m.diedAt && now - m.diedAt > ttl) { upd[m.id] = null; if (m.tpl.core && m.base) { worldRef(`rivalMeta/${m.base}`).set({ respawnAt: now + 300000 }); Object.values(worldMobs).forEach(t => { if (t.base === m.base && t.id !== m.id) upd[t.id] = null; }); } if (m.boss) worldRef('bossMeta').set({ respawnAt: now + 150000 }); }
            return;
        }
        if (m.tpl.static) return;
        let nx = m.tx, nz = m.tz, state = m.state;
        let nearest = null, nd = 1e9; players.forEach(p => { const d = Math.hypot(p.x - m.tx, p.z - m.tz); if (d < nd) { nd = d; nearest = p; } });
        const nearestSafe = nearest && isInsideSanctuary(nearest.x, nearest.z);
        if (m.boss) {
            const dh = Math.hypot(BOSS_ALTAR.x - m.tx, BOSS_ALTAR.z - m.tz);
            if (nearest && nd < 42 && dh < 60 && !nearestSafe) { state = 'CHASE'; if (nd > 6) { nx += (nearest.x - m.tx) / nd * 4.2 * 0.25; nz += (nearest.z - m.tz) / nd * 4.2 * 0.25; } if (!m.novaAt && now > (m.nextNova || 0) && nd < 16) { upd[`${m.id}/novaAt`] = now + 2600; m.nextNova = now + 13000; } }
            else if (dh > 2) { state = 'WANDER'; nx += (BOSS_ALTAR.x - m.tx) / dh * 5 * 0.25; nz += (BOSS_ALTAR.z - m.tz) / dh * 5 * 0.25; }
            if (m.novaAt && now > m.novaAt + 900) upd[`${m.id}/novaAt`] = 0;
        } else if (m.isCreep) {
            let target = null, td = 1e9, reach = 2.2;
            Object.values(playerStructures).forEach(s => { const d = Math.hypot(s.x - m.tx, s.z - m.tz); if (d < 8 && d < td) { td = d; target = { x: s.x, z: s.z, s }; } });
            if (nearest && nd < 10 && !nearestSafe) target = { x: nearest.x, z: nearest.z, player: true };
            if (!target) target = { x: corePos.x, z: corePos.z, core: true, reach: 3 };
            const d = Math.hypot(target.x - m.tx, target.z - m.tz);
            const stepX = (target.x - m.tx) / d * 5.2 * 0.25, stepZ = (target.z - m.tz) / d * 5.2 * 0.25;
            const atField = target.core && Math.hypot(m.tx + stepX, m.tz + stepZ) < SANCTUARY_RADIUS + 1.5;
            if (d > (target.reach || reach) && !atField) { nx += stepX; nz += stepZ; }
            else if (target.core) coreDmg += m.dmg * 0.05; else if (target.s) structDmg[target.s.id] = (structDmg[target.s.id] || 0) + m.dmg * 0.08;
        } else if (state === 'ROOTED') { if (Math.random() < 0.12) state = 'CHASE'; }
        else if (state === 'CHASE') { if (nd > 32 || nearestSafe) state = 'WANDER'; else if (nd > 2.4) { nx += (nearest.x - m.tx) / nd * 6.5 * 0.25; nz += (nearest.z - m.tz) / nd * 6.5 * 0.25; } }
        else { m.wander = (m.wander || 0) + (Math.random() - 0.5) * 0.25; nx += Math.sin(m.wander) * 1.6 * 0.25; nz += Math.cos(m.wander) * 1.6 * 0.25; if (isInsideSanctuary(nx, nz)) { m.wander += Math.PI; nx = m.tx; nz = m.tz; } if (nearest && nd < 6 && !nearestSafe && m.tpl.name !== 'Prairie Plainstrider') state = 'CHASE'; }
        if (Math.abs(nx - m.tx) > 0.01 || Math.abs(nz - m.tz) > 0.01 || state !== m.state) { upd[`${m.id}/x`] = Math.round(nx * 10) / 10; upd[`${m.id}/z`] = Math.round(nz * 10) / 10; upd[`${m.id}/state`] = state; }
    });
    if (Object.keys(upd).length) worldRef('mobs').update(upd);
    spawnManager(now);
    if (coreDmg > 0) worldRef('core').transaction(cur => { if (!cur || (cur.downUntil && now < cur.downUntil)) return cur; cur.hp = Math.max(0, cur.hp - coreDmg); if (cur.hp === 0) cur.downUntil = now + 60000; return cur; }, (e, c, s) => { if (c && s && s.val() && s.val().hp === 0) systemChat('💎 THE SOVEREIGN CORE HAS FALLEN — rebooting in 60s.'); });
    Object.entries(structDmg).forEach(([id, dmg]) => worldRef(`structures/${id}`).transaction(cur => { if (!cur) return cur; cur.hp = Math.max(0, cur.hp - dmg); return cur.hp === 0 ? null : cur; }));
    if (coreState && coreState.downUntil && now > coreState.downUntil) worldRef('core').update({ hp: 1500, maxHp: 1500, downUntil: 0 });
    if (coreState && coreState.maxHp < 1500) worldRef('core').update({ maxHp: 1500, hp: Math.max(coreState.hp, 1500) });
    if (waveMeta && now > waveMeta.nextAt && coreState && !(coreState.downUntil && now < coreState.downUntil)) spawnCreepWave(false);
}
