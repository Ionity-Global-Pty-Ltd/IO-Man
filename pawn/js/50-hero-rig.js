/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 50-hero-rig.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 5. HERO RIG */
const ARMOR_TIERS = { 0: { name: 'None', color: 0x64748b, emissive: 0x000000, dr: 0 }, 1: { name: 'Scrap', color: 0x92400e, emissive: 0x000000, dr: 8 }, 2: { name: 'Steel', color: 0xcbd5e1, emissive: 0x0ea5e9, dr: 18 }, 3: { name: 'Sovereign', color: 0xf59e0b, emissive: 0x00f0ff, dr: 30 }, 4: { name: 'Mythic', color: 0x7c3aed, emissive: 0xc084fc, dr: 42 }, 5: { name: 'Celestial', color: 0xfde68a, emissive: 0xfff7d6, dr: 55 } };
const TIER_CLASS = ['rar-common', 'rar-scrap', 'rar-steel', 'rar-sovereign', 'rar-mythic', 'rar-celestial'];
function createStickOxenCharacter({ isOxen = true, classType = 'druid', tint = null }) {
    const root = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: tint ?? (isOxen ? 0x4a2c18 : 0xe2e8f0), roughness: 0.55, metalness: 0.2 }), hornMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.3, metalness: 0.25 });
    const biped = new THREE.Group(); root.add(biped);
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(isOxen ? 0.42 : 0.22, isOxen ? 0.32 : 0.18, 1.35, 10), bodyMat); torso.position.y = 1.65; torso.castShadow = true; biped.add(torso);
    const headGroup = new THREE.Group(); headGroup.position.set(0, 2.55, 0); const head = new THREE.Mesh(new THREE.SphereGeometry(isOxen ? 0.38 : 0.32, 14, 14), bodyMat); head.castShadow = true; headGroup.add(head);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff }); const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), eyeMat); eyeL.position.set(-0.13, 0.05, 0.31); const eyeR = eyeL.clone(); eyeR.position.x = 0.13; headGroup.add(eyeL, eyeR);
    if (isOxen) { const snout = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.32), bodyMat); snout.position.set(0, -0.06, 0.32); headGroup.add(snout); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 12), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 })); ring.position.set(0, -0.14, 0.48); headGroup.add(ring); const hL = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.78, 8), hornMat); hL.position.set(-0.46, 0.22, 0.05); hL.rotation.z = Math.PI / 2.6; const hR = hL.clone(); hR.position.x = 0.46; hR.rotation.z = -Math.PI / 2.6; headGroup.add(hL, hR); }
    biped.add(headGroup);
    const mkLimb = (x, y, r1, r2, len) => { const piv = new THREE.Group(); piv.position.set(x, y, 0); const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, 8), bodyMat); m.position.y = -len / 2 + 0.02; m.castShadow = true; piv.add(m); biped.add(piv); return piv; };
    const leftArmPivot = mkLimb(-0.52, 2.2, 0.11, 0.09, 1.05), rightArmPivot = mkLimb(0.52, 2.2, 0.11, 0.09, 1.05), leftLegPivot = mkLimb(-0.24, 1.0, 0.13, 0.1, 1.0), rightLegPivot = mkLimb(0.24, 1.0, 0.13, 0.1, 1.0);
    const weaponMount = new THREE.Group(); weaponMount.position.set(0, -0.95, 0.25); rightArmPivot.add(weaponMount);
    const weaponMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x0088ff, emissiveIntensity: 0.45, metalness: 0.85, roughness: 0.2 });
    if (classType === 'warrior') { const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.9, 6), trunkMat); shaft.rotation.x = Math.PI / 2; const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.55), weaponMat); blade.position.set(0, 0, 0.75); weaponMount.add(shaft, blade); }
    else if (classType === 'hunter') { const bow = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.05, 6, 16, Math.PI), weaponMat); bow.rotation.y = Math.PI / 2; weaponMount.add(bow); }
    else { const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 2.1, 6), trunkMat); staff.rotation.x = Math.PI / 3; const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), weaponMat); orb.position.set(0, 0.52, 0.85); weaponMount.add(staff, orb); }
    const helmArmor = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.42, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.25 })); helmArmor.position.y = 0.22; helmArmor.visible = false; headGroup.add(helmArmor);
    const chestArmor = new THREE.Group(); const cuirass = new THREE.Mesh(new THREE.BoxGeometry(isOxen ? 0.96 : 0.68, 0.92, 0.58), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.25 })); cuirass.position.y = 1.72; const pL = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), cuirass.material); pL.position.set(-0.58, 2.24, 0); const pR = pL.clone(); pR.position.x = 0.58; chestArmor.add(cuirass, pL, pR); chestArmor.visible = false; biped.add(chestArmor);
    const greavesL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.32), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.25 })); greavesL.position.y = -0.58; greavesL.visible = false; leftLegPivot.add(greavesL); const greavesR = greavesL.clone(); rightLegPivot.add(greavesR);
    const bearGroup = new THREE.Group(); bearGroup.visible = false; const bb = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.15, 2.2), bodyMat); bb.position.y = 1.05; bb.castShadow = true; const bh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.78, 0.85), bodyMat); bh.position.set(0, 1.45, 1.25); const bhorn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.7, 6), hornMat); bhorn.position.set(0, 1.95, 1.25); bearGroup.add(bb, bh, bhorn); root.add(bearGroup);
    // Mythic / Celestial: spirit wings + halo
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0x7c3aed, emissiveIntensity: 0.3, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false });
    const wingShape = new THREE.Shape(); wingShape.moveTo(0, 0); wingShape.lineTo(1.9, 0.9); wingShape.lineTo(2.3, 0.1); wingShape.lineTo(1.6, -0.5); wingShape.lineTo(2.0, -1.2); wingShape.lineTo(0.9, -1.0); wingShape.lineTo(0, -0.3); wingShape.lineTo(0, 0);
    const wingGeo = new THREE.ShapeGeometry(wingShape); const wingL = new THREE.Mesh(wingGeo, wingMat); wingL.position.set(-0.25, 2.1, -0.32); wingL.rotation.y = Math.PI + 0.6; wingL.scale.x = -1; const wingR = new THREE.Mesh(wingGeo, wingMat); wingR.position.set(0.25, 2.1, -0.32); wingR.rotation.y = -0.6; const wings = new THREE.Group(); wings.add(wingL, wingR); wings.visible = false; biped.add(wings);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 8, 24), new THREE.MeshBasicMaterial({ color: 0xfff7d6 })); halo.rotation.x = Math.PI / 2; halo.position.y = 0.72; halo.visible = false; headGroup.add(halo);
    root.userData = { bipedGroup: biped, bearGroup, leftArmPivot, rightArmPivot, leftLegPivot, rightLegPivot, helmArmor, chestArmor, cuirassMat: cuirass.material, greavesL, greavesR, wings, wingL, wingR, wingMat, halo, gearKey: '' };
    return root;
}
function applyArmorToRig(mesh, armor) {
    const u = mesh.userData, key = JSON.stringify(armor); if (u.gearKey === key) return; u.gearKey = key;
    const setM = (mat, tier) => { const s = ARMOR_TIERS[tier]; mat.color.setHex(s.color); mat.emissive.setHex(s.emissive); mat.emissiveIntensity = tier >= 5 ? 0.5 : tier === 4 ? 0.38 : tier === 3 ? 0.4 : 0.15; };
    u.helmArmor.visible = armor.helm > 0; if (armor.helm) setM(u.helmArmor.material, armor.helm);
    u.chestArmor.visible = armor.chest > 0; if (armor.chest) setM(u.cuirassMat, armor.chest);
    u.greavesL.visible = u.greavesR.visible = armor.legs > 0; if (armor.legs) setM(u.greavesL.material, armor.legs);
    const top = Math.max(armor.helm, armor.chest, armor.legs);
    if (u.wings) { u.wings.visible = (armor.chest || 0) >= 4; if (u.wings.visible) { const cel = armor.chest >= 5; u.wingMat.color.setHex(cel ? 0xfff7d6 : 0xc084fc); u.wingMat.emissive.setHex(cel ? 0xfde68a : 0x7c3aed); } u.halo.visible = top >= 5; }
}
