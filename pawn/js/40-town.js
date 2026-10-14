/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 40-town.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 4. TOWN */
const townGroup = new THREE.Group(); scene.add(townGroup); let sovereignCoreMesh = null; const townPlotMarkers = {};
const CORE_POS = { x: 0, z: 18 };
function buildThunderhoofTown() {
    const townY = getTerrainHeight(0, 0), totem = new THREE.Group(); totem.position.set(0, townY, -8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.7 }), goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.4, metalness: 0.8, roughness: 0.2 }), cyanMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00a8ff, emissiveIntensity: 0.7 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, 11.5, 10), poleMat); pole.position.y = 5.75; pole.castShadow = true; totem.add(pole);
    const wings = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.9, 0.45), goldMat); wings.position.y = 9.2; wings.castShadow = true; totem.add(wings);
    const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.6, 8), goldMat); hornL.position.set(-1.6, 11.4, 0); hornL.rotation.z = Math.PI / 3; const hornR = hornL.clone(); hornR.position.x = 1.6; hornR.rotation.z = -Math.PI / 3; totem.add(hornL, hornR);
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), cyanMat); eyeL.position.set(-0.4, 9.8, 0.92); const eyeR = eyeL.clone(); eyeR.position.x = 0.4; totem.add(eyeL, eyeR);
    townGroup.add(totem);
    const coreGroup = new THREE.Group(); coreGroup.position.set(CORE_POS.x, getTerrainHeight(CORE_POS.x, CORE_POS.z), CORE_POS.z);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.3, 0.8, 8), rockMat); ped.position.y = 0.4; coreGroup.add(ped);
    sovereignCoreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.35, 0), new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00a8ff, emissiveIntensity: 0.85, roughness: 0.1, metalness: 0.9 })); sovereignCoreMesh.position.y = 2.6; sovereignCoreMesh.castShadow = true; coreGroup.add(sovereignCoreMesh);
    const cl = new THREE.PointLight(0x00f0ff, 1.6, 22); cl.position.y = 3.0; coreGroup.add(cl); townGroup.add(coreGroup);
    createBuyablePlotFoundation('lodge', 14, -4, 0xf59e0b); createBuyablePlotFoundation('forge', -14, -4, 0x00f0ff); createBuyablePlotFoundation('sanctuary', 14, 12, 0x38bdf8);
    buildBossAltar();
}
function buildBossAltar() {
    const g = new THREE.Group(); g.position.set(BOSS_ALTAR.x, getTerrainHeight(BOSS_ALTAR.x, BOSS_ALTAR.z), BOSS_ALTAR.z);
    const altarMat = new THREE.MeshStandardMaterial({ color: 0x2e1065, emissive: 0x6d28d9, emissiveIntensity: 0.18, roughness: 0.5, metalness: 0.4 });
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, pil = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 7 + (i % 2) * 2, 6), altarMat); pil.position.set(Math.cos(a) * 9, 3.5, Math.sin(a) * 9); pil.castShadow = true; g.add(pil); const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color: 0xc084fc })); tip.position.set(Math.cos(a) * 9, 7.6 + (i % 2) * 2, Math.sin(a) * 9); g.add(tip); }
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.6, 0.6, 24), altarMat); disc.position.y = 0.3; g.add(disc);
    const rune = new THREE.Mesh(new THREE.RingGeometry(3.2, 4.2, 32), new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })); rune.rotation.x = -Math.PI / 2; rune.position.y = 0.65; g.add(rune); g.userData.rune = rune;
    const pl = new THREE.PointLight(0x9333ea, 1.3, 30); pl.position.y = 6; g.add(pl); townGroup.add(g); window.__altar = g;
}
function createBuyablePlotFoundation(plotId, x, z, colorHex) {
    const y = getTerrainHeight(x, z), group = new THREE.Group(); group.position.set(x, y, z);
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.0, 24), new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08; group.add(ring);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 6), trunkMat); post.position.y = 1.1; group.add(post);
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 0.16), new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.35 })); board.position.y = 2.1; group.add(board);
    townGroup.add(group); townPlotMarkers[plotId] = { group, owned: false, x, y, z };
}
function constructPurchasedTownBuilding(plotId) {
    const slot = townPlotMarkers[plotId]; if (!slot || slot.owned) return false; slot.owned = true;
    while (slot.group.children.length > 0) slot.group.remove(slot.group.children[0]);
    if (plotId === 'lodge') { const cone = new THREE.Mesh(new THREE.ConeGeometry(3.6, 5.5, 8), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75, flatShading: true })); cone.position.y = 2.75; cone.castShadow = true; slot.group.add(cone); const horns = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.18, 6, 16), new THREE.MeshStandardMaterial({ color: 0xfef3c7 })); horns.position.y = 5.2; slot.group.add(horns); }
    else if (plotId === 'sanctuary') { const stoneMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x0ea5e9, emissiveIntensity: 0.5, roughness: 0.3 }); for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + i * .12, 0), stoneMat); s.position.set(Math.cos(i * 1.26) * 2.4, 1.5 + i * 1.1, Math.sin(i * 1.26) * 2.4); s.userData.float = i; s.castShadow = true; slot.group.add(s); } slot.group.userData.sanctuary = true; }
    else { const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 2.4), rockMat); base.position.y = 0.7; base.castShadow = true; slot.group.add(base); const cf = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.9 })); cf.position.y = 2.6; slot.group.add(cf); }
    return true;
}
