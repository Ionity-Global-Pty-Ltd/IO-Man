/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 75-quests-harvest-spawns.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 7b. QUEST CHAIN (Chieftain Thunderhoof), HARVESTING, SPAWN ZONES */
const QUESTS = [
    { id: 'q1', title: 'Welcome to the Mesa', desc: 'Slay 4 Prairie Plainstriders on the plains south of town.', type: 'kill', kind: 'strider', n: 4, reward: { zart: 60, xp: 80 } },
    { id: 'q2', title: 'The Tanner\'s Request', desc: 'Skin 3 beasts [K] and bring the hides back.', type: 'skin', n: 3, reward: { zart: 80, xp: 100, armor: ['legs', 1] } },
    { id: 'q3', title: 'Timber & Stone', desc: 'Harvest 8 wood from trees and 6 stone from boulders [F].', type: 'harvest', n: 14, reward: { zart: 70, xp: 120 } },
    { id: 'q4', title: 'Hold the South Gate', desc: 'Build 2 structures near the Sovereign Core [B].', type: 'build', n: 2, reward: { zart: 120, xp: 150, armor: ['helm', 2] } },
    { id: 'q5', title: 'Kodo Stampede', desc: 'Slay 5 Woolly Thunder-Kodos out on the eastern plains.', type: 'kill', kind: 'kodo', n: 5, reward: { zart: 150, xp: 220 } },
    { id: 'q6', title: 'Bloodtotem Raiders', desc: 'Repel 8 Bloodtotem Creep Raiders during a wave.', type: 'kill', kind: 'creep', n: 8, reward: { zart: 180, xp: 260, armor: ['chest', 2] } },
    { id: 'q7', title: 'Crags of Stonetalon', desc: 'Climb the mountains and slay 4 Crag Mountain Cougars.', type: 'kill', kind: 'cougar', n: 4, reward: { zart: 200, xp: 320 } },
    { id: 'q8', title: 'Veins of the Deep', desc: 'Mine 10 ore from the glowing veins on the peaks.', type: 'harvestore', n: 10, reward: { zart: 220, xp: 340 } },
    { id: 'q9', title: 'The Alpha', desc: 'Hunt down a rare elite beast (👑) roaming the realm.', type: 'elite', n: 1, reward: { zart: 400, xp: 600, armor: ['chest', 3] } },
    { id: 'q10', title: 'Sovereign of the Plains', desc: 'Slay 20 beasts of any kind. Endless glory awaits.', type: 'kill', n: 20, reward: { zart: 500, xp: 900, armor: ['helm', 3] } },
    { id: 'q11', title: 'Siege of the Warlords', desc: 'Conquer a Rival Warlord Citadel (🏰 RAID warp on the radar). Destroy its core.', type: 'base', n: 1, reward: { zart: 600, xp: 1200, armor: ['legs', 4] } },
    { id: 'q12', title: 'Earthshatter Matriarch', desc: 'Slay MAGATHA at the Boss Crags altar (0, -105). Jump her nova.', type: 'boss', n: 1, reward: { zart: 1500, xp: 2500, armor: ['chest', 5] } }
];
function currentQuest() { return QUESTS[Math.min(hero.quest.idx, QUESTS.length - 1)]; }
function questEvent(type, kind, amount = 1) {
    if (!gameStarted) return; const q = currentQuest(); if (hero.quest.done || hero.quest.idx >= QUESTS.length) return;
    let match = false;
    if (q.type === 'kill' && type === 'kill' && (!q.kind || q.kind === kind) && kind !== 'creep' || (q.type === 'kill' && q.kind === 'creep' && type === 'kill' && kind === 'creep')) match = true;
    if (q.type === 'skin' && type === 'skin') match = true; if (q.type === 'harvest' && type === 'harvest' && kind !== 'ore') match = true; if (q.type === 'harvestore' && type === 'harvest' && kind === 'ore') match = true;
    if (q.type === 'build' && type === 'build') match = true; if (q.type === 'elite' && type === 'elite') match = true; if (q.type === 'base' && type === 'base') match = true; if (q.type === 'boss' && type === 'boss') match = true;
    if (!match) return; hero.quest.p = Math.min(q.n, hero.quest.p + amount); updateQuestHUD();
    if (hero.quest.p >= q.n) { hero.quest.done = true; spawnFloatingText(hero.pos, `📜 QUEST COMPLETE — return to Chieftain Thunderhoof [F]`, '#fbbf24'); sfx.playLoot(); }
    saveProgress(false);
}
function turnInQuest() {
    const q = currentQuest(); if (!hero.quest.done) return false;
    hero.zart += q.reward.zart; hero.xp += q.reward.xp; hero.totalXp += q.reward.xp; if (q.reward.armor) equipArmorPiece(q.reward.armor[0], q.reward.armor[1]);
    spawnFloatingText(hero.pos, `🎁 +${q.reward.zart} ZAR-T · +${q.reward.xp} XP`, '#fbbf24'); spawnFlash(chieftain.position.clone().add(new THREE.Vector3(0, 3, 0)), 0xfbbf24, 10, .6); sfx.playLoot();
    systemChat(`${hero.name} completed "${q.title}" for Chieftain Thunderhoof.`); showChatBubble('chieftain', `Well done, ${hero.name}. ${QUESTS[hero.quest.idx + 1] ? 'Your next task: ' + QUESTS[hero.quest.idx + 1].title + '.' : 'You are Sovereign of the Plains.'}`, true);
    hero.quest = { idx: hero.quest.idx + 1, p: 0, done: false };
    while (hero.xp >= hero.xpNext) { hero.level++; hero.xp -= hero.xpNext; hero.xpNext = Math.round(hero.xpNext * 1.35); hero.maxHp += 35; hero.hp = hero.maxHp; spawnFloatingText(hero.pos, `✨ LEVEL UP! LV ${hero.level}`, '#00f0ff'); refreshSkillBar(); }
    updateAllHUD(); saveProgress(true); return true;
}
function updateQuestHUD() {
    const q = currentQuest(); if (!q || hero.quest.idx >= QUESTS.length) { $('quest-title').textContent = 'All chieftain quests complete'; $('quest-text').textContent = 'Roam the endless plains, raid rival bases, hunt elites.'; $('quest-bar').style.width = '100%'; return; }
    $('quest-title').textContent = `${hero.quest.idx + 1}/${QUESTS.length} · ${q.title}`; $('quest-text').textContent = hero.quest.done ? '✅ Return to Chieftain Thunderhoof at the totem [F]' : `${q.desc} (${hero.quest.p}/${q.n})`; $('quest-bar').style.width = `${(hero.quest.p / q.n) * 100}%`; $('quest-progress').textContent = hero.quest.done ? 'TURN IN' : 'ACTIVE';
}
// Chieftain NPC
const chieftain = createStickOxenCharacter({ isOxen: true, classType: 'druid', tint: 0x6b3a1a }); chieftain.position.set(4, getTerrainHeight(4, -4), -4); chieftain.rotation.y = Math.PI; scene.add(chieftain); applyArmorToRig(chieftain, { helm: 3, chest: 3, legs: 3 });
const questMark = new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#fbbf24'; x.font = '900 110px Inter, sans-serif'; x.textAlign = 'center'; x.shadowColor = '#000'; x.shadowBlur = 8; x.fillText('!', 32, 104); return new THREE.CanvasTexture(c); })(), transparent: true, depthWrite: false })); questMark.scale.set(1.2, 2.4, 1); questMark.position.y = 4.4; chieftain.add(questMark);
const chieftainTag = document.createElement('div'); chieftainTag.className = 'name-tag'; chieftainTag.innerHTML = '<span style="color:#fbbf24">Chieftain Thunderhoof</span> <span style="color:#94a3b8">Quest Giver</span>'; $('name-tags').appendChild(chieftainTag);
// Harvesting
let harvesting = false;
function nearestNode() { let best = null, bd = 4.2; for (const n of harvestNodes) { if (n.ready > Date.now()) continue; const d = Math.hypot(n.x - hero.pos.x, n.z - hero.pos.z); if (d < bd) { bd = d; best = n; } } return best; }
function tryHarvest(n) {
    if (harvesting || casting) return; harvesting = true; const label = { wood: 'CHOPPING TIMBER', stone: 'QUARRYING STONE', ore: 'MINING ORE' }[n.type];
    startCast(label, 1.5, n.type === 'ore' ? '#00f0ff' : (n.type === 'wood' ? '#a3e635' : '#cbd5e1'), () => { harvesting = false; const amt = 2 + Math.floor(Math.random() * 3); hero.res[n.type] += amt; n.ready = Date.now() + 60000; n.mesh.traverse(o => { if (o.material && !o.userData.dim) { o.userData.dim = true; o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .35; } }); setTimeout(() => n.mesh.traverse(o => { if (o.material && o.userData.dim) { o.material.opacity = 1; o.material.transparent = false; o.userData.dim = false; } }), 60000); spawnSparks(new THREE.Vector3(n.x, n.y + 1, n.z), n.type === 'ore' ? 0x00f0ff : 0xa3e635, 10); sfx.playLoot(); spawnFloatingText(hero.pos, `+${amt} ${n.type.toUpperCase()}`, '#a3e635'); questEvent('harvest', n.type, amt); updateAllHUD(); saveProgress(false); });
    setTimeout(() => { if (!casting) harvesting = false; }, 1700);
}
// Host spawn manager: beasts around every player on the endless map, by zone, with rare elites
let lastSpawnTick = 0;
function spawnManager(now) {
    if (now - lastSpawnTick < 4000) return; lastSpawnTick = now;
    const players = [hero.pos, ...Object.values(remotePlayers).map(p => new THREE.Vector3(p.x, p.y, p.z))], mobsArr = Object.values(worldMobs), upd = {}; let total = mobsArr.length;
    mobsArr.forEach(m => { if (m.isCreep || m.boss || m.rival || (m.state || '').startsWith('DEAD')) return; const near = players.some(p => Math.hypot(p.x - m.tx, p.z - m.tz) < 170); if (!near) { upd[m.id] = null; total--; } });
    players.forEach(p => {
        const nearby = mobsArr.filter(m => !m.isCreep && !m.rival && !m.boss && !(m.state || '').startsWith('DEAD') && Math.hypot(p.x - m.tx, p.z - m.tz) < 75).length;
        for (let i = nearby; i < 9 && total < 56; i++) {
            const a = Math.random() * 6.28, d = 30 + Math.random() * 45, x = Math.round(p.x + Math.cos(a) * d), z = Math.round(p.z + Math.sin(a) * d); if (Math.hypot(x, z) < 44) continue;
            const h = getTerrainHeight(x, z), dist = Math.hypot(x, z), bio = biomeAt(x, z); let kind;
            if (bio === 'BOSS_CRAGS') { if (Math.hypot(x - BOSS_ALTAR.x, z - BOSS_ALTAR.z) < 14) continue; kind = 'crag_guardian'; }
            else if (bio === 'CRYSTAL_OASIS') kind = Math.random() < 0.05 ? 'basilisk_king' : 'basilisk';
            else if (bio === 'ASHEN_RIFT') kind = Math.random() < 0.05 ? 'magma_alpha' : 'ash_hound';
            else { kind = h > 7 ? 'cougar' : (dist > 130 ? 'kodo' : (Math.random() < .35 ? 'kodo' : 'strider')); if (Math.random() < 0.04) kind = h > 7 ? 'cougar_matriarch' : 'kodo_alpha'; }
            const tpl = MOB_TEMPLATES[kind]; upd['s' + now.toString(36) + Math.floor(Math.random() * 999)] = { kind, x, z, hp: tpl.hp, maxHp: tpl.hp, state: 'WANDER', creep: false, wander: Math.random() * 6.28 }; total++;
        }
    });
    // World boss MAGATHA at the Boss Crags altar (respawns 2.5 min after her corpse clears)
    if (!mobsArr.some(m => m.boss) && (!bossMeta || now > (bossMeta.respawnAt || 0))) { const t = MOB_TEMPLATES.magatha; upd['boss_magatha'] = { kind: 'magatha', x: BOSS_ALTAR.x, z: BOSS_ALTAR.z, hp: t.hp, maxHp: t.hp, state: 'WANDER', creep: false, novaAt: 0 }; worldRef('bossMeta').set({ respawnAt: now + 150000 }); }
    ensureRivalBases(now, players, mobsArr, upd);
    if (Object.keys(upd).length) worldRef('mobs').update(upd);
}
// Rival Warlord Citadels: 3 guaranteed + deterministic chunk-hash citadels near players (shared, respawn 5 min after conquest)
const RIVAL_FIXED = REALM_CONFIG.rivalCitadels.fixed;
function rivalCandidatesNear(players) {
    const out = [...RIVAL_FIXED];
    players.forEach(p => { const ccx = Math.round(p.x / CHUNK_SIZE), ccz = Math.round(p.z / CHUNK_SIZE); for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) { const cx = ccx + dx, cz = ccz + dz; if (Math.hypot(cx, cz) < 1.8) continue; const hash = Math.abs(Math.sin(cx * 127.1 + cz * 311.7) * 43758.5453) % 1; if (hash >= 0.3) continue; const bx = Math.round(cx * CHUNK_SIZE + (hash - 0.15) * 24), bz = Math.round(cz * CHUNK_SIZE + Math.cos(cx + cz) * 14); if (Math.hypot(bx, bz) < 68 || Math.hypot(bx - BOSS_ALTAR.x, bz - BOSS_ALTAR.z) < 40) continue; const key = `c${cx}_${cz}`.replace(/-/g, 'n'); if (!out.some(o => o.key === key)) out.push({ key, x: bx, z: bz, clan: RIVAL_CLAN_NAMES[Math.floor(hash * 1000) % RIVAL_CLAN_NAMES.length] }); } });
    return out;
}
function ensureRivalBases(now, players, mobsArr, upd) {
    const present = new Set(mobsArr.filter(m => m.rival && m.base).map(m => m.base));
    rivalCandidatesNear(players).forEach(c => { if (present.has(c.key)) return; const meta = (rivalMeta || {})[c.key]; if (meta && now < (meta.respawnAt || 0)) return; const core = MOB_TEMPLATES.rival_core, tur = MOB_TEMPLATES.rival_turret; upd['rc_' + c.key] = { kind: 'rival_core', x: c.x, z: c.z, hp: core.hp, maxHp: core.hp, state: 'STATIC', creep: false, base: c.key, clan: c.clan }; for (let t = 0; t < 3; t++) { const a = t / 3 * Math.PI * 2 + 0.4; upd[`rt_${c.key}_${t}`] = { kind: 'rival_turret', x: Math.round((c.x + Math.cos(a) * 9.2) * 10) / 10, z: Math.round((c.z + Math.sin(a) * 9.2) * 10) / 10, hp: tur.hp, maxHp: tur.hp, state: 'STATIC', creep: false, base: c.key }; } present.add(c.key); worldRef(`rivalMeta/${c.key}`).set({ respawnAt: 0, spawnedAt: now }); });
}
