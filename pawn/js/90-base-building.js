/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 90-base-building.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 9. BASE BUILDING (shared) */
function makeStructureMesh(type) {
    const g = new THREE.Group();
    if (type === 'wall') { const w = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 0.8), rockMat); w.position.y = 1.2; w.castShadow = true; g.add(w); }
    else if (type === 'turret') { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.95, 2.8, 8), trunkMat); b.position.y = 1.4; const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), new THREE.MeshBasicMaterial({ color: 0x00f0ff })); c.position.y = 3.2; g.add(b, c); g.userData.crystal = c; }
    else if (type === 'totem') { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 5.5, 8), trunkMat); pole.position.y = 2.75; pole.castShadow = true; const face = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 0.9), new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: .5 })); face.position.y = 4.2; const eye = new THREE.Mesh(new THREE.SphereGeometry(.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf43f5e })); eye.position.set(0, 4.4, .5); const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x7c3aed, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending })); aura.scale.set(5, 5, 1); aura.position.y = 4.4; g.add(pole, face, eye, aura); g.userData.crystal = face; }
    else if (type === 'heal') { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 2.6, 8), trunkMat); pole.position.y = 1.3; pole.castShadow = true; const em = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 1.0 })); em.position.y = 3.0; const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x10b981, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending })); aura.scale.set(4, 4, 1); aura.position.y = 3; const ring = new THREE.Mesh(new THREE.RingGeometry(9.5, 10, 32), new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.25, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.1; g.add(pole, em, aura, ring); g.userData.crystal = em; }
    else if (type === 'mortar') { const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 2.2), rockMat); base.position.y = 0.6; base.castShadow = true; const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.62, 2.4, 10), new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xdc2626, emissiveIntensity: 0.55, metalness: 0.8 })); cannon.position.y = 1.9; cannon.rotation.x = -Math.PI / 5; g.add(base, cannon); g.userData.crystal = cannon; }
    else if (type === 'frost') { const spire = new THREE.Mesh(new THREE.ConeGeometry(0.85, 4.2, 6), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.75, roughness: 0.15 })); spire.position.y = 2.1; spire.castShadow = true; const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 8, 24), new THREE.MeshBasicMaterial({ color: 0x7dd3fc })); ring.rotation.x = Math.PI / 2; ring.position.y = 2.8; g.add(spire, ring); g.userData.crystal = ring; }
    else if (type === 'outpost') { const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.6, 1.0, 8), rockMat); ped.position.y = 0.5; ped.castShadow = true; const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.35, 0), new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0xf59e0b, emissiveIntensity: 0.85 })); core.position.y = 2.7; core.castShadow = true; const aura = new THREE.Mesh(new THREE.RingGeometry(8.5, 9.0, 32), new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5, depthWrite: false })); aura.rotation.x = -Math.PI / 2; aura.position.y = 0.1; const pl = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x00f0ff, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending })); pl.scale.set(6, 6, 1); pl.position.y = 2.7; const flag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.6, 1.0), new THREE.MeshBasicMaterial({ color: 0x00f0ff })); flag.position.set(0, 5.2, 0); const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.6, 5), trunkMat); pole.position.set(0, 4.8, -0.55); g.add(ped, core, aura, pl, flag, pole); g.userData.crystal = core; }
    else { const rig = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 1.8, 6), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 })); rig.position.y = 0.9; g.add(rig); }
    g.traverse(o => { if (o.isMesh) o.userData.structure = true; });
    return g;
}
const BUILD_COST = { wall: { zart: 20, wood: 12 }, turret: { zart: 40, stone: 10, ore: 4 }, gen: { zart: 50, stone: 8, wood: 6 }, totem: { zart: 80, wood: 10, stone: 10, ore: 6 }, heal: { zart: 60, wood: 8, stone: 6 }, mortar: { zart: 125, stone: 8, ore: 6 }, frost: { zart: 95, stone: 6, ore: 4 }, outpost: { zart: 150, stone: 10, wood: 10 } };
const STRUCT_NAMES = { wall: 'Totem Barricade', turret: 'Spirit Beam Tower', gen: 'ZAR-T Mine', totem: 'War Totem', heal: 'Healing Totem', mortar: 'Flame Mortar', frost: 'Frost Obelisk', outpost: 'Forward Outpost Core' };
function buildStructureAtHero(type) {
    const c = BUILD_COST[type], hp = { wall: 600, turret: 350, gen: 300, totem: 900, heal: 420, mortar: 380, frost: 360, outpost: 750 }, cost = c.zart;
    if (!c) return;
    const missing = Object.entries(c).filter(([k, v]) => k !== 'zart' && hero.res[k] < v).map(([k, v]) => `${v - hero.res[k]} ${k}`);
    if (missing.length) { spawnFloatingText(hero.pos, `Need ${missing.join(', ')} — harvest with [F]`, '#f43f5e'); return; }
    if (hero.zart < cost) { spawnFloatingText(hero.pos, `Need ${cost} ZAR-T!`, '#f43f5e'); return; }
    Object.entries(c).forEach(([k, v]) => { if (k !== 'zart') hero.res[k] -= v; }); questEvent('build');
    if (Object.keys(playerStructures).length >= 60) { spawnFloatingText(hero.pos, 'Realm build limit reached (60)', '#f43f5e'); return; }
    hero.zart -= cost; sfx.playLoot();
    const bx = hero.pos.x - Math.sin(hero.facingYaw) * 3.2, bz = hero.pos.z - Math.cos(hero.facingYaw) * 3.2;
    worldRef('structures').push({ type, x: Math.round(bx * 10) / 10, z: Math.round(bz * 10) / 10, rot: hero.facingYaw, hp: hp[type], maxHp: hp[type], level: 1, owner: currentUser.uid, ownerName: hero.name, ts: SV() });
    spawnRing(new THREE.Vector3(bx, 0, bz), 0x00f0ff, 1, .7); if (type === 'outpost') { hero.passiveZartPer10s += 20; systemChat(`🚩 ${hero.name} claimed a Forward Outpost at (${Math.round(bx)}, ${Math.round(bz)}).`); }
    spawnFloatingText(hero.pos, `🔨 BUILT ${STRUCT_NAMES[type].toUpperCase()} (LV 1)`, '#00f0ff'); $('blueprint-status').textContent = `${STRUCT_NAMES[type]} placed — press again to place another`; updateAllHUD(); saveProgress(false);
}
function upgradeNearestStructure() {
    let best = null, bd = 10; Object.values(playerStructures).forEach(s => { if (s.owner !== currentUser.uid) return; const d = hero.pos.distanceTo(s.mesh.position); if (d < bd) { bd = d; best = s; } });
    if (!best) { spawnFloatingText(hero.pos, 'Stand near one of your structures to upgrade', '#94a3b8'); return; }
    const lv = best.level || 1; if (lv >= 3) { spawnFloatingText(best.mesh.position, 'MAX LEVEL (LV 3 APEX)', '#e879f9'); return; }
    const cost = 90 * lv; if (hero.zart < cost) { spawnFloatingText(hero.pos, `Need ${cost} ZAR-T to upgrade to Lv ${lv + 1}`, '#f43f5e'); return; }
    hero.zart -= cost; sfx.playDrum();
    worldRef(`structures/${best.id}`).transaction(cur => { if (!cur) return cur; cur.level = (cur.level || 1) + 1; cur.maxHp = Math.round(cur.maxHp * 1.45); cur.hp = cur.maxHp; return cur; });
    spawnFlash(best.mesh.position.clone().add(new THREE.Vector3(0, 2, 0)), 0xe879f9, 8, .5); spawnFloatingText(best.mesh.position, `⬆️ UPGRADED TO LV ${lv + 1} (+45% DMG & HP)`, '#e879f9'); updateAllHUD(); saveProgress(false);
}
function spawnCreepWave(manual) {
    const wave = ((waveMeta && waveMeta.wave) || 0) + 1, count = Math.min(12, 4 + Math.floor(wave / 2)), upd = {};
    for (let i = 0; i < count; i++) upd['c' + wave + '_' + i] = { kind: 'creep', x: Math.round((i - (count - 1) / 2) * 5), z: 68 + i * 3, hp: MOB_TEMPLATES.creep.hp + wave * 10, maxHp: MOB_TEMPLATES.creep.hp + wave * 10, state: 'MARCH', creep: true };
    worldRef('mobs').update(upd); worldRef('waveMeta').set({ wave, nextAt: Date.now() + 50000 });
    systemChat(`⚠ WAVE ${wave}: ${count} Bloodtotem raiders march on the Sovereign Core${manual ? ' (called by ' + hero.name + ')' : ''}!`); sfx.playRoar();
}
