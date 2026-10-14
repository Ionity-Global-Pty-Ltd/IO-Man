/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 70-world-sync.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 7. SHARED WORLD: BEASTS, CREEPS, STRUCTURES, CORE (Realtime Database) */
const worldMobs = {}, activeProjectiles = [], playerStructures = {}, remotePlayers = {};
let selectedTarget = null, coreState = null, waveMeta = null, skinningActive = false, sectorRefs = [];
const MOB_TEMPLATES = { kodo_alpha: { name: 'Thunderhoof Alpha Kodo', color: 0x3b3b3b, scale: 2.4, hp: 1400, dmg: 38, hideName: 'Alpha Kodo Hide', elite: true }, cougar_matriarch: { name: 'Stonetalon Matriarch', color: 0x7c2d12, scale: 1.8, hp: 900, dmg: 30, hideName: 'Matriarch Pelt', elite: true }, strider: { name: 'Prairie Plainstrider', color: 0xd97706, scale: 1.0, hp: 95, dmg: 12, hideName: 'Plainstrider Pelt' }, kodo: { name: 'Woolly Thunder-Kodo', color: 0x57534e, scale: 1.55, hp: 185, dmg: 20, hideName: 'Thick Kodo Hide' }, cougar: { name: 'Crag Mountain Cougar', color: 0xb45309, scale: 1.1, hp: 130, dmg: 17, hideName: 'Mountain Lion Fang-Pelt' }, creep: { name: 'Bloodtotem Creep Raider', color: 0x991b1b, scale: 1.15, hp: 120, dmg: 15, hideName: 'Raider War-Hide' },
    basilisk: { name: 'Crystal Basilisk', color: 0x67e8f9, scale: 1.3, hp: 260, dmg: 24, hideName: 'Basilisk Scale-Hide', scales: true }, ash_hound: { name: 'Ashen Rift Hound', color: 0x7f1d1d, scale: 1.05, hp: 220, dmg: 26, hideName: 'Ash Hound Pelt' }, crag_guardian: { name: 'Crag Altar Guardian', color: 0x4c1d95, scale: 1.7, hp: 480, dmg: 32, hideName: 'Guardian Scale', scales: true, elite: false },
    basilisk_king: { name: 'Prismatic Basilisk King', color: 0x22d3ee, scale: 2.2, hp: 1600, dmg: 40, hideName: 'Prismatic Scale', scales: true, elite: true }, magma_alpha: { name: 'Magma Hound Alpha', color: 0xf97316, scale: 1.9, hp: 1300, dmg: 42, hideName: 'Magma Pelt', elite: true },
    magatha: { name: 'MAGATHA, EARTHSHATTER MATRIARCH', color: 0x4c1d95, scale: 3.4, hp: 6000, dmg: 58, hideName: 'Matriarch Dragon-Scale', scales: true, boss: true },
    rival_core: { name: 'Warlord Citadel Core', color: 0xf43f5e, scale: 2.0, hp: 650, dmg: 22, hideName: 'Warlord Citadel Banner-Hide', rival: true, core: true, static: true },
    rival_turret: { name: 'Rival Hellfire Tower', color: 0xf43f5e, scale: 1.4, hp: 210, dmg: 16, hideName: 'Salvaged Siege Plating', rival: true, static: true } };
const RIVAL_CLAN_NAMES = ["WARLORD KROM'GAR CITADEL", 'GRIMTOTEM IRON FORTRESS', 'BLOODHOOF RENEGADE BASTION', 'ASHENVALE RAIDER STRONGHOLD', 'SUN-SUNDER OUTPOST', 'OVERLORD GARROSH CITADEL'];
function createRivalMesh(tpl) {
    const g = new THREE.Group();
    if (tpl.core) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(11.2, 11.8, 36), new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide, transparent: true, opacity: 0.7, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.12; g.add(ring);
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.5, 1.2, 8), rockMat); ped.position.y = 0.6; ped.castShadow = true; g.add(ped);
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.65, 0), new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.95, roughness: 0.15, metalness: 0.85 })); crystal.position.y = 3.2; crystal.castShadow = true; g.add(crystal); g.userData.crystal = crystal;
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.78; const wall = new THREE.Mesh(new THREE.BoxGeometry(6, 2.2, 0.7), rockMat); wall.position.set(Math.cos(a) * 10.5, 1.1, Math.sin(a) * 10.5); wall.rotation.y = -a + Math.PI / 2; wall.castShadow = true; g.add(wall); const spike = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.4, 5), trunkMat); spike.position.set(Math.cos(a) * 10.5, 2.8, Math.sin(a) * 10.5); g.add(spike); }
        const banner = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 1.3), new THREE.MeshBasicMaterial({ color: 0x991b1b })); banner.position.set(0, 5.6, 0); g.add(banner); const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4, 5), trunkMat); pole.position.set(0, 5.2, -0.7); g.add(pole);
                } else {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.05, 3.6, 8), rockMat); tower.position.y = 1.8; tower.castShadow = true; g.add(tower);
        const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), new THREE.MeshBasicMaterial({ color: 0xf43f5e })); orb.position.y = 4.0; g.add(orb); g.userData.crystal = orb;
    }
    const lootBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.9, 8, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xe879f9, transparent: true, opacity: 0.55, side: THREE.DoubleSide })); lootBeam.position.y = 4.5; lootBeam.visible = false; g.add(lootBeam); g.userData.lootBeam = lootBeam;
    return g;
}
function createBeastMesh(tpl, isCreep = false) {
    if (tpl.rival) return createRivalMesh(tpl);
    const g = new THREE.Group(), mat = new THREE.MeshStandardMaterial({ color: isCreep ? 0x991b1b : tpl.color, roughness: 0.65, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1 * tpl.scale, 0.9 * tpl.scale, 1.75 * tpl.scale), mat); body.position.y = 0.85 * tpl.scale; body.castShadow = true; g.add(body);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.75 * tpl.scale, 0.75 * tpl.scale, 0.85 * tpl.scale), mat); head.position.set(0, 1.25 * tpl.scale, 1.0 * tpl.scale); g.add(head);
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.18 * tpl.scale, 0.75 * tpl.scale, 6), new THREE.MeshStandardMaterial({ color: 0xfef3c7 })); horn.rotation.x = Math.PI / 3; horn.position.set(0, 1.45 * tpl.scale, 1.45 * tpl.scale); g.add(horn);
    const lootBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.55, 6.5, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45, side: THREE.DoubleSide })); lootBeam.position.y = 3.2; lootBeam.visible = false; g.add(lootBeam); g.userData.lootBeam = lootBeam;
    if (tpl.scales) { for (let k = 0; k < 5; k++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.12 * tpl.scale, 0.45 * tpl.scale, 4), new THREE.MeshStandardMaterial({ color: tpl.color, emissive: tpl.color, emissiveIntensity: 0.5 })); sp.position.set(0, 1.35 * tpl.scale, (k - 2) * 0.32 * tpl.scale); g.add(sp); } }
    if (tpl.boss) { const eyeMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e }); [-0.25, 0.25].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.12 * tpl.scale, 8, 8), eyeMat); e.position.set(x * tpl.scale, 1.35 * tpl.scale, 1.44 * tpl.scale); g.add(e); }); const h2 = horn.clone(); h2.position.x = -0.35 * tpl.scale; h2.rotation.z = 0.5; const h3 = horn.clone(); h3.position.x = 0.35 * tpl.scale; h3.rotation.z = -0.5; g.add(h2, h3); const aura = new THREE.PointLight(0x9333ea, 1.1, 18); aura.position.y = 3 * tpl.scale; g.add(aura); const ring = new THREE.Mesh(new THREE.RingGeometry(5.5, 6.2, 48), new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.0, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.15; g.add(ring); g.userData.novaRing = ring; }
    return g;
}
function listen(ref, evt, cb) { ref.on(evt, cb); sectorRefs.push({ ref, evt, cb }); }
async function seedWorldIfEmpty() {
    await worldRef('meta').transaction(cur => { if (cur && cur.seeded) return; return { seeded: true, ts: Date.now() }; });
    if (!(await worldRef('mobs').get()).exists()) { const m = {}; const kinds = ['strider', 'kodo', 'cougar']; for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2, d = 46 + (i % 3) * 18, k = kinds[i % 3]; m['b' + i] = { kind: k, x: Math.round(Math.cos(a) * d), z: Math.round(Math.sin(a) * d), hp: MOB_TEMPLATES[k].hp, maxHp: MOB_TEMPLATES[k].hp, state: 'WANDER', creep: false, wander: Math.random() * 6.28 }; } await worldRef('mobs').set(m); }
    if (!(await worldRef('core').get()).exists()) await worldRef('core').set({ hp: 1500, maxHp: 1500, downUntil: 0 });
    if (!(await worldRef('waveMeta').get()).exists()) await worldRef('waveMeta').set({ wave: 0, nextAt: Date.now() + 40000 });
}
function bindWorld() {
    listen(worldRef('mobs'), 'value', snap => {
        const data = snap.val() || {};
        Object.entries(data).forEach(([id, m]) => {
            const tpl = Object.assign({ kind: m.kind }, MOB_TEMPLATES[m.kind] || MOB_TEMPLATES.strider);
            if (!worldMobs[id]) { const mesh = createBeastMesh(tpl, m.creep); mesh.position.set(m.x, getTerrainHeight(m.x, m.z), m.z); scene.add(mesh); if (tpl.elite) { const crown = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xf59e0b, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); crown.scale.set(4, 4, 1); crown.position.y = 2.2 * tpl.scale + 1.5; mesh.add(crown); } worldMobs[id] = { id, mesh, x: m.x, z: m.z, tx: m.x, tz: m.z, tpl, name: tpl.core && m.clan ? `🏰 ${m.clan}` : tpl.name, dmg: tpl.dmg, hideName: tpl.hideName, isCreep: !!m.creep, elite: !!tpl.elite, boss: !!tpl.boss, rival: !!tpl.rival, base: m.base || null, clan: m.clan || null, attackCd: 0, yaw: 0, novaAt: 0 }; if (m.rot) mesh.rotation.y = m.rot; if (tpl.boss) systemChatLocal(`💀 ${tpl.name} stirs at the Boss Crags altar (0, -105). Bring a warband.`); }
            const mo = worldMobs[id]; const wasAlive = !(mo.state || '').startsWith('DEAD');
            mo.tx = m.x; mo.tz = m.z; mo.hp = m.hp; mo.maxHp = m.maxHp; mo.state = m.state; mo.lootedBy = m.lootedBy || {}; mo.skinnedBy = m.skinnedBy || {}; mo.killer = m.killer; mo.diedAt = m.diedAt || 0;
            if ((m.novaAt || 0) !== mo.novaAt) { mo.novaAt = m.novaAt || 0; mo.novaShown = false; mo.novaFired = false; }
            const dead = (m.state || '').startsWith('DEAD');
            if (dead && wasAlive && mo.hp <= 0) { if (mo.rival) { mo.mesh.scale.y = 0.35; if (mo.mesh.userData.crystal) mo.mesh.userData.crystal.visible = false; spawnShatter(mo.mesh.position.clone(), mo.tpl.core ? 0xe879f9 : 0xf97316); spawnShatter(mo.mesh.position.clone().add(new THREE.Vector3(2, 0, -2)), 0x475569); } else mo.mesh.rotation.z = Math.PI / 2; if (!mo.rival) spawnShatter(mo.mesh.position.clone(), mo.tpl.color); spawnFlash(mo.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xf59e0b, 6); if (mo.boss) { hideBossBanner(); spawnFlash(mo.mesh.position.clone().add(new THREE.Vector3(0, 4, 0)), 0xc084fc, 30, 1.2); camShake = Math.max(camShake, 1.4); } }
            if (!dead) { mo.mesh.rotation.z = 0; if (mo.rival) { mo.mesh.scale.y = 1; if (mo.mesh.userData.crystal) mo.mesh.userData.crystal.visible = true; } }
            mo.mesh.userData.lootBeam.visible = dead; mo.mesh.userData.lootBeam.material.color.setHex(dead && mo.lootedBy[currentUser.uid] ? 0x10b981 : 0xf59e0b);
            if (selectedTarget && selectedTarget.id === id) updateTargetFrame();
        });
        Object.keys(worldMobs).forEach(id => { if (!data[id]) { scene.remove(worldMobs[id].mesh); if (selectedTarget && selectedTarget.id === id) { selectedTarget = null; updateTargetFrame(); } delete worldMobs[id]; } });
    });
    listen(worldRef('structures'), 'value', snap => {
        const data = snap.val() || {};
        Object.entries(data).forEach(([id, s]) => {
            if (!playerStructures[id]) { const g = makeStructureMesh(s.type); g.position.set(s.x, getTerrainHeight(s.x, s.z), s.z); g.rotation.y = s.rot || 0; scene.add(g); playerStructures[id] = { id, mesh: g, type: s.type, x: s.x, z: s.z, fireCd: 0, struct: true, name: ({ wall: 'Totem Barricade', turret: 'Spirit Tower', gen: 'ZAR-T Harvester', totem: 'War Totem', heal: 'Healing Totem' })[s.type] || 'Structure', tpl: { scale: 1.4 }, lootedBy: {}, skinnedBy: {} }; }
            playerStructures[id].hp = s.hp; playerStructures[id].maxHp = s.maxHp; playerStructures[id].owner = s.owner; playerStructures[id].ownerName = s.ownerName; const lv = s.level || 1; if (playerStructures[id].level !== lv) { playerStructures[id].level = lv; playerStructures[id].mesh.scale.setScalar(1 + (lv - 1) * 0.18); if (lv > 1) spawnRing(playerStructures[id].mesh.position, 0xe879f9, 1, .7); }
        });
        Object.keys(playerStructures).forEach(id => { if (!data[id]) { spawnShatter(playerStructures[id].mesh.position.clone(), 0x7c3aed); scene.remove(playerStructures[id].mesh); if (selectedTarget && selectedTarget.id === id) setTarget(null); delete playerStructures[id]; } });
    });
    listen(worldRef('core'), 'value', s => { coreState = s.val(); updateAllHUD(); });
    listen(worldRef('waveMeta'), 'value', s => { waveMeta = s.val(); });
    listen(worldRef('bossMeta'), 'value', s => { bossMeta = s.val(); });
    listen(worldRef('rivalMeta'), 'value', s => { rivalMeta = s.val() || {}; });
    listen(worldRef('bounty'), 'value', s => { bounty = s.val(); updateBountyHUD(); });
    presenceRef = db.ref(`presence/${realm}/oxen/${currentUser.uid}`); presenceRef.onDisconnect().remove(); pushPresence(true);
    listen(db.ref(`presence/${realm}/oxen`), 'value', snap => {
        const data = snap.val() || {}, uids = Object.keys(data).sort(); isHost = uids.length ? uids[0] === currentUser.uid : true;
        $('hud-online').textContent = `${uids.length} ONLINE · ${isHost ? 'HOST' : 'CLIENT'}`;
        Object.entries(data).forEach(([uid, p]) => {
            if (uid === currentUser.uid) return;
            if (!remotePlayers[uid]) { const mesh = createStickOxenCharacter({ isOxen: p.isOxen !== false, classType: p.cls || 'druid' }); scene.add(mesh); const tag = document.createElement('div'); tag.className = 'name-tag'; $('name-tags').appendChild(tag); remotePlayers[uid] = { mesh, tag, x: p.x, y: p.y, z: p.z, tx: p.x, ty: p.y, tz: p.z, yaw: p.yaw || 0 }; }
            const rp = remotePlayers[uid]; rp.tx = p.x; rp.ty = p.y; rp.tz = p.z; rp.tyaw = p.yaw || 0; rp.name = p.name; rp.lvl = p.lvl; rp.hp = p.hp; rp.maxHp = p.maxHp; if (p.armor) applyArmorToRig(rp.mesh, p.armor);
            rp.mesh.userData.bipedGroup.visible = !p.bear; rp.mesh.userData.bearGroup.visible = !!p.bear;
            if (p.mount && !rp.mount) { rp.mount = createKodoMountMesh(); scene.add(rp.mount); } else if (!p.mount && rp.mount) { scene.remove(rp.mount); rp.mount = null; }
            rp.tag.innerHTML = `<span style="color:#00f0ff">${escapeHtml(p.name)}</span> <span style="color:#94a3b8">L${p.lvl}</span><div class="bar"><i style="width:${Math.max(0, 100 * p.hp / p.maxHp)}%"></i></div>`;
        });
        Object.keys(remotePlayers).forEach(uid => { if (!data[uid]) { scene.remove(remotePlayers[uid].mesh); if (remotePlayers[uid].mount) scene.remove(remotePlayers[uid].mount); remotePlayers[uid].tag.remove(); delete remotePlayers[uid]; } });
    });
    const log = $('chat-log'); log.innerHTML = '';
    const chatBoundAt = Date.now(); listen(db.ref(`chat/${realm}`).limitToLast(40), 'child_added', s => { const m = s.val(); if (m.uid && !m.sys && (!m.ts || m.ts > chatBoundAt - 1500)) showChatBubble(m.uid, m.text); const el = document.createElement('div'); el.className = 'chat-line' + (m.sys ? ' sys' : ''); el.innerHTML = `<span class="who">${escapeHtml(m.name)}:</span> <span class="text-slate-200">${escapeHtml(m.text)}</span>`; log.appendChild(el); log.scrollTop = log.scrollHeight; while (log.children.length > 60) log.removeChild(log.firstChild); });
    db.ref('leaderboard').orderByChild('score').limitToLast(15).on('value', s => { const arr = []; s.forEach(c => arr.push(c.val())); arr.reverse(); $('lb-list').innerHTML = arr.map((p, i) => `<div class="flex items-center justify-between p-2 rounded-lg ${p.uid === currentUser.uid ? 'bg-amber-500/15 border border-amber-400/40' : 'bg-slate-900/70 border border-white/5'}"><div class="flex items-center gap-3"><span class="w-6 text-right ${i < 3 ? 'text-amber-300' : 'text-slate-500'}">#${i + 1}</span><span class="text-white font-bold">${escapeHtml(p.name)}</span><span class="text-slate-500 text-[10px]">${escapeHtml(p.cls || '')}</span></div><div class="flex items-center gap-3"><span class="text-cyan-300">L${p.level}</span><span class="text-emerald-300">${p.kills || 0} kills</span><span class="text-amber-300">${p.score} pts</span></div></div>`).join('') || '<div class="text-slate-500">No heroes yet.</div>'; });
}
function pushPresence(force) {
    if (!presenceRef) return; const now = performance.now(); if (!force && now - lastPresencePush < 100) return; lastPresencePush = now;
    presenceRef.set({ name: hero.name, cls: hero.classType, isOxen: hero.isOxen, lvl: hero.level, x: Math.round(hero.pos.x * 10) / 10, y: Math.round(hero.pos.y * 10) / 10, z: Math.round(hero.pos.z * 10) / 10, yaw: Math.round(hero.facingYaw * 100) / 100, hp: Math.round(hero.hp), maxHp: hero.maxHp, armor: hero.armor, bear: hero.inBearForm, mount: hero.mounted, ts: SV() });
}
function saveProgress(force) {
    if (!currentUser || !gameStarted) return; const now = performance.now(); if (!force && now - lastSave < 4000) { dirtySave = true; return; } lastSave = now; dirtySave = false;
    db.ref('players/' + currentUser.uid).set({ name: hero.name, className: hero.classType, classType: hero.classType, isOxen: hero.isOxen, level: hero.level, xp: hero.xp, xpNext: hero.xpNext, maxHp: hero.maxHp, zart: hero.zart, hides: hero.hides, kills: hero.kills, totalXp: hero.totalXp, armor: hero.armor, plots: hero.plots, bonusDmg: hero.bonusDmg, passiveZartPer10s: hero.passiveZartPer10s, res: hero.res, quest: hero.quest, talents: hero.talents, talentPts: hero.talentPts, relics: hero.relics, drums: !!hero.drums, basesDestroyed: hero.basesDestroyed || 0, realm, updated: SV() });
    db.ref('leaderboard/' + currentUser.uid).set({ uid: currentUser.uid, name: hero.name, cls: hero.classType, level: hero.level, kills: hero.kills, score: hero.totalXp + hero.kills * 50, realm });
}
function systemChat(text) { if (currentUser) db.ref(`chat/${realm}`).push({ uid: currentUser.uid, name: 'SYS', sys: true, text, ts: SV() }); }
function systemChatLocal(text) { const log = $('chat-log'); if (!log) return; const el = document.createElement('div'); el.className = 'chat-line sys'; el.innerHTML = `<span class="who">REALM:</span> <span class="text-slate-200">${escapeHtml(text)}</span>`; log.appendChild(el); log.scrollTop = log.scrollHeight; }
$('chat-form').addEventListener('submit', e => { e.preventDefault(); const inp = $('chat-input'), t = inp.value.trim(); if (!t || !currentUser) return; db.ref(`chat/${realm}`).push({ uid: currentUser.uid, name: hero.name, text: t.slice(0, 240), ts: SV() }); inp.value = ''; inp.blur(); });

function damageStructure(st, amount) {
    if (st.owner === currentUser.uid) return; if (isInsideSanctuary(st.x, st.z)) { spawnFloatingText(st.mesh.position, '🛡️ Protected by the Sanctuary forcefield', '#34d399'); return; } spawnFloatingText(st.mesh.position, `-${Math.round(amount)}`, '#c084fc'); spawnSparks(st.mesh.position.clone().add(new THREE.Vector3(0, 1.5, 0)), 0xc084fc, 8); sfx.playHit();
    worldRef(`structures/${st.id}`).transaction(cur => { if (!cur) return cur; cur.hp = Math.max(0, cur.hp - amount); cur.lastAttacker = hero.name; return cur.hp === 0 ? null : cur; }, (e, c, snap) => { if (c && snap && !snap.exists()) { systemChat(`💥 ${hero.name} destroyed ${st.ownerName || 'a rival'}'s ${st.name}!`); hero.zart += 25; updateAllHUD(); } });
}
function damageMob(mob, amount, isCrit = false) {
    if (mob.struct) return damageStructure(mob, amount);
    if ((mob.state || '').startsWith('DEAD')) return; selectedTarget = mob; sfx.playHit();
    spawnFloatingText(mob.mesh.position, `${isCrit ? '💥 ' : ''}-${Math.round(amount)}`, isCrit ? '#f59e0b' : '#ffffff');
    worldRef(`mobs/${mob.id}`).transaction(cur => { if (!cur || (cur.state || '').startsWith('DEAD')) return cur; cur.hp = Math.max(0, cur.hp - amount); if (!cur.creep) cur.state = 'CHASE'; if (cur.hp <= 0) { cur.state = 'DEAD_LOOTABLE'; cur.killer = currentUser.uid; cur.diedAt = Date.now(); } return cur; },
        (err, committed, snap) => { if (committed && snap && snap.val() && snap.val().hp <= 0 && snap.val().killer === currentUser.uid) onKill(mob); });
    updateTargetFrame();
}
function levelUpCheck() {
    while (hero.xp >= hero.xpNext) { hero.level++; hero.xp -= hero.xpNext; hero.xpNext = Math.round(hero.xpNext * 1.35); hero.maxHp += 35; hero.hp = hero.maxHp; hero.talentPts = (hero.talentPts || 0) + 1; spawnFloatingText(hero.pos, `✨ LEVEL UP! LV ${hero.level} · +1 TALENT POINT (C)`, '#00f0ff'); spawnRing(hero.pos, 0x00f0ff, 1.2, .9); spawnFlash(hero.pos.clone().add(new THREE.Vector3(0, 2, 0)), 0x00f0ff, 10, .6); const u = UNLOCKS[hero.classType].find(x => x.lvl === hero.level); if (u) { setTimeout(() => spawnFloatingText(hero.pos, `🔓 NEW SPELL: ${u.name.toUpperCase()} (key ${u.lvl === 3 ? 5 : 6})`, '#f59e0b'), 600); systemChat(`${hero.name} unlocked ${u.name}!`); } refreshSkillBar(); if (hero.level % 5 === 0) systemChat(`${hero.name} reached Level ${hero.level}!`); }
}
function onKill(mob) {
    const xp = mob.boss ? 1500 : mob.tpl.core ? 250 : mob.rival ? 60 : (mob.isCreep ? 35 : 45) * (mob.elite ? 5 : 1); hero.xp += xp;
    if (mob.tpl.core) { hero.zart += 220; hero.res.scales += 2; hero.basesDestroyed = (hero.basesDestroyed || 0) + 1; spawnFloatingText(mob.mesh.position, '🏰 CONQUERED RIVAL CITADEL +220 ZAR-T & +2 SCALES!', '#e879f9'); systemChat(`🏰 ${hero.name} conquered ${mob.clan || 'a rival citadel'}!`); questEvent('base'); sfx.playDrum(); } else if (mob.rival) { hero.zart += 55; spawnFloatingText(mob.mesh.position, '💥 TOWER DEMOLISHED +55 ZAR-T', '#fbbf24'); }
    if (mob.boss) { hero.zart += 500; spawnFloatingText(mob.mesh.position, '💀 WORLD BOSS SLAIN +500 ZAR-T', '#c084fc'); systemChat(`💀 ${hero.name} landed the killing blow on ${mob.name}! The Crags fall silent.`); } else if (mob.elite) { hero.zart += 120; spawnFloatingText(mob.mesh.position, '👑 ELITE SLAIN +120 ZAR-T', '#f59e0b'); systemChat(`${hero.name} slew the elite ${mob.name}!`); } hero.totalXp += xp; hero.kills++;
    if (bounty && bounty.id === mob.id) { hero.zart += bounty.reward || 250; spawnFloatingText(hero.pos, `📜 BOUNTY CLAIMED +${bounty.reward || 250} ZAR-T`, '#fbbf24'); systemChat(`📜 ${hero.name} claimed the bounty on ${mob.name}!`); worldRef('bounty').remove(); }
    levelUpCheck();
    questEvent('kill', mob.isCreep ? 'creep' : mob.tpl.kind); if (mob.elite || mob.boss) questEvent('elite', mob.tpl.kind); if (mob.boss) questEvent('boss');
    updateAllHUD(); saveProgress(false);
}
function findNearestCorpse() { let best = null, bd = 7.5; Object.values(worldMobs).forEach(m => { if ((m.state || '').startsWith('DEAD') && !m.skinnedBy[currentUser.uid]) { const d = hero.pos.distanceTo(m.mesh.position); if (d < bd) { bd = d; best = m; } } }); return best; }
function interactF() {
    if (hero.pos.distanceTo(chieftain.position) < 5 && hero.quest.done) { turnInQuest(); return; }
    const corpse = findNearestCorpse(); if (corpse) { tryLootNearestCorpse(); return; }
    const node = nearestNode(); if (node) { tryHarvest(node); return; }
    if (hero.pos.distanceTo(chieftain.position) < 5) { const q = currentQuest(); showChatBubble('chieftain', q && hero.quest.idx < QUESTS.length ? q.desc : 'You have done well, Sovereign. The realm is yours to roam.', true); return; }
    tryLootNearestCorpse();
}
/* LOOT WINDOW — gold, prefixed armor (tiers scale with beast rank), relics; Take All with F / Space */
const ARMOR_PREFIX = ['Thunderhoof', 'Stonetalon', 'Windrider', 'Bloodtotem', 'Sunwalker', 'Mesa-Forged', 'Spiritbound', 'Kodo-Bone'];
let lootOpen = null;
function rollLoot(c) {
    const items = []; const rank = c.boss ? 3 : c.elite ? 2 : (c.tpl.scales ? 1 : 0);
    const gold = (c.boss ? 350 : c.elite ? 90 : 25) + Math.floor(Math.random() * (c.boss ? 200 : 30)); items.push({ kind: 'gold', icon: '🪙', name: `${gold} ZAR-T`, cls: 'rar-sovereign', gold });
    const armorChance = c.boss ? 1 : c.elite ? 0.95 : 0.75;
    if (Math.random() < armorChance) { const slot = ['helm', 'chest', 'legs'][Math.floor(Math.random() * 3)], r = Math.random(); let tier = r > 0.82 ? 3 : (r > 0.42 ? 2 : 1); if (rank >= 2 && Math.random() < 0.45) tier = 4; if (c.boss && Math.random() < 0.6) tier = 4; if (c.boss && Math.random() < 0.15) tier = 5; const slotName = { helm: 'Helm', chest: 'Cuirass', legs: 'Greaves' }[slot]; items.push({ kind: 'armor', icon: { helm: '⛑️', chest: '🦺', legs: '🥾' }[slot], name: `${ARMOR_PREFIX[Math.floor(Math.random() * ARMOR_PREFIX.length)]} ${ARMOR_TIERS[tier].name} ${slotName}`, sub: `${ARMOR_TIERS[tier].dr}% DR · tier ${tier}${tier >= 4 ? ' · wings' : ''}`, cls: TIER_CLASS[tier], slot, tier }); }
    if (c.boss || Math.random() < (c.elite ? 0.45 : 0.08)) items.push({ kind: 'relic', icon: '🗿', name: c.boss ? 'Relic of the Earthshatter' : 'Spirit Relic of the Mesa', sub: '+150 XP · +1 relic (sells 120 ZAR-T)', cls: 'rar-relic' });
    if (c.tpl.scales && Math.random() < 0.5) items.push({ kind: 'scales', icon: '🐉', name: `${c.boss ? 4 : 2}× Dragon Scales`, sub: 'crafting material', cls: 'rar-mythic', n: c.boss ? 4 : 2 });
    return items;
}
function tryLootNearestCorpse() {
    if (lootOpen) { takeAllLoot(); return; }
    const c = findNearestCorpse(); if (!c) { spawnFloatingText(hero.pos, 'No unlooted corpse nearby', '#94a3b8'); return; }
    if (c.lootedBy[currentUser.uid]) { spawnFloatingText(c.mesh.position, 'Already Looted — Press [K] to Skin!', '#10b981'); return; }
    c.lootedBy[currentUser.uid] = true; worldRef(`mobs/${c.id}/lootedBy/${currentUser.uid}`).set(true); sfx.playLoot();
    openLootWindow(c, rollLoot(c));
}
function openLootWindow(c, items) {
    lootOpen = { c, items }; $('loot-title').textContent = `LOOT · ${c.name.toUpperCase()}`;
    $('loot-items').innerHTML = items.map((it, i) => `<div class="loot-item" data-i="${i}"><span class="text-xl">${it.icon}</span><div class="flex-1 min-w-0"><div class="text-xs font-extrabold ${it.cls} truncate">${escapeHtml(it.name)}</div>${it.sub ? `<div class="text-[10px] mono-tag text-slate-400">${escapeHtml(it.sub)}</div>` : ''}</div><span class="text-[10px] mono-tag text-slate-500">TAKE</span></div>`).join('');
    $('loot-items').querySelectorAll('.loot-item').forEach(el => el.addEventListener('click', () => takeLootItem(parseInt(el.dataset.i, 10))));
    const w = $('loot-window'); w.classList.remove('hidden');
}
function takeLootItem(i) {
    if (!lootOpen) return; const it = lootOpen.items[i]; if (!it || it.taken) return; it.taken = true; const el = $('loot-items').querySelector(`[data-i="${i}"]`); if (el) el.classList.add('taken');
    if (it.kind === 'gold') { hero.zart += it.gold; spawnFloatingText(hero.pos, `+${it.gold} ZAR-T`, '#fbbf24'); }
    else if (it.kind === 'armor') equipArmorPiece(it.slot, it.tier);
    else if (it.kind === 'relic') { hero.relics = (hero.relics || 0) + 1; hero.xp += 150; hero.totalXp += 150; hero.maxHp += 15; hero.hp += 15; spawnFloatingText(hero.pos, '🗿 RELIC +150 XP · +15 MAX HP', '#34d399'); levelUpCheck(); }
    else if (it.kind === 'scales') { hero.res.scales += it.n; spawnFloatingText(hero.pos, `🐉 +${it.n} DRAGON SCALES`, '#c084fc'); }
    sfx.playLoot(); updateAllHUD(); saveProgress(false);
    if (lootOpen.items.every(x => x.taken)) closeLootWindow();
}
function takeAllLoot() { if (!lootOpen) return; lootOpen.items.forEach((_, i) => takeLootItem(i)); closeLootWindow(); }
function closeLootWindow() { lootOpen = null; $('loot-window').classList.add('hidden'); }
$('btn-loot-all').addEventListener('click', takeAllLoot); $('btn-loot-close').addEventListener('click', closeLootWindow);
function trySkinNearestCorpse() {
    if (skinningActive) return; const c = findNearestCorpse(); if (!c) { spawnFloatingText(hero.pos, 'Move closer to a slain beast to Skin', '#94a3b8'); return; }
    if (!c.lootedBy[currentUser.uid]) tryLootNearestCorpse();
    skinningActive = true; sfx.playSkinning(); const wrap = $('castbar-wrap'), fill = $('castbar-fill'), pct = $('castbar-pct'); $('castbar-label').textContent = `SKINNING ${c.hideName.toUpperCase()}...`; wrap.classList.remove('hidden');
    let p = 0; const t = setInterval(() => { p += 10; fill.style.width = `${p}%`; pct.textContent = `${p}%`; if (p >= 100) { clearInterval(t); wrap.classList.add('hidden'); skinningActive = false; c.skinnedBy[currentUser.uid] = true; worldRef(`mobs/${c.id}/skinnedBy/${currentUser.uid}`).set(true); hero.hides += 1; sfx.playLoot(); spawnFloatingText(hero.pos, `🦌 SKINNED: +1 ${c.hideName}!`, '#10b981'); if (c.tpl.scales) { const n = c.boss ? 5 : c.elite ? 3 : 1; hero.res.scales += n; setTimeout(() => spawnFloatingText(hero.pos, `🐉 +${n} DRAGON SCALE${n > 1 ? 'S' : ''}`, '#c084fc'), 350); } questEvent('skin'); updateAllHUD(); saveProgress(false); } }, 95);
}
