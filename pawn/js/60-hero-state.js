/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 60-hero-state.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 6. HERO STATE */
const hero = { name: 'Thunderhoof_76', classType: 'druid', isOxen: true, level: 1, xp: 0, xpNext: 100, hp: 260, maxHp: 260, mp: 100, maxMp: 100, zart: 180, hides: 0, kills: 0, totalXp: 0, pos: new THREE.Vector3(0, 3.2, 0), velY: 0, isGrounded: true, jumpsRemaining: 2, facingYaw: 0, inBearForm: false, bonusDmg: 0, passiveZartPer10s: 0, armor: { helm: 0, chest: 0, legs: 0 }, plots: {}, mesh: null, wolfPetMesh: null, dead: false, cd: [0,0,0,0,0,0], res: { wood: 0, stone: 0, ore: 0, scales: 0 }, quest: { idx: 0, p: 0, done: false }, stats: { killsByKind: {} }, talents: { vitality: 0, fury: 0, skystep: 0 }, talentPts: 0, relics: 0, mounted: false, mountMesh: null, drumsUntil: 0, warband: [], warpCd: 0 };
function getMaxJumps() { return 2 + (hero.plots.sanctuary ? 1 : 0) + (hero.talents.skystep >= 3 ? 1 : 0); }
function getMoveSpeed() { return (hero.inBearForm ? 13.5 : 11.2) * (1 + hero.talents.skystep * 0.08) * (hero.drums ? 1.22 : 1) * (hero.mounted ? 1.7 : 1); }
const SKILL_CD = { druid: [1.0, 8, 6, 2, 9, 20], warrior: [1.2, 6, 7, 14, 10, 22], mage: [1.1, 8, 5, 16, 6, 24], hunter: [1.0, 7, 5, 10, 8, 20] };
const UNLOCKS = { druid: [{ lvl: 3, icon: '🌱', name: 'Entangle' }, { lvl: 6, icon: '🌪️', name: 'Hurricane' }], warrior: [{ lvl: 3, icon: '🛡️', name: 'ShieldWall' }, { lvl: 6, icon: '💥', name: 'Earthquake' }], mage: [{ lvl: 3, icon: '🔮', name: 'ArcBarrage' }, { lvl: 6, icon: '🧊', name: 'Blizzard' }], hunter: [{ lvl: 3, icon: '🌋', name: 'Volley' }, { lvl: 6, icon: '🦅', name: 'Eagle' }] };
function spellPower() { return (32 + hero.level * 8 + hero.bonusDmg) * (1 + (hero.level - 1) * 0.06) * (hero.plots.forge ? 1.25 : 1) * (1 + hero.talents.fury * 0.06) * (Date.now() < hero.drumsUntil ? 1.2 : 1); }
function refreshSkillBar() { CLASS_SKILL_BARS[hero.classType].forEach((s, i) => { $(`skill-${i + 1}-icon`).textContent = s.icon; $(`skill-${i + 1}-name`).textContent = s.name; }); UNLOCKS[hero.classType].forEach((u, i) => { const ok = hero.level >= u.lvl; $(`skill-${i + 5}-icon`).textContent = ok ? u.icon : '🔒'; $(`skill-${i + 5}-name`).textContent = ok ? u.name : 'Lv' + u.lvl; $(`skill-${i + 5}`).style.opacity = ok ? 1 : .45; }); }
function equipArmorPiece(slot, tier) {
    if (tier <= hero.armor[slot]) { hero.zart += tier * 18; spawnFloatingText(hero.pos, `+${tier * 18} ZAR-T (Salvage)`, '#fbbf24'); updateAllHUD(); saveProgress(false); return; }
    hero.armor[slot] = tier; const spec = ARMOR_TIERS[tier]; applyArmorToRig(hero.mesh, hero.armor);
    $('slot-' + slot).textContent = spec.name; $('hud-armor-dr').textContent = `${getHeroDamageReduction()}% DR`;
    spawnFloatingText(hero.pos, `EQUIPPED ${spec.name.toUpperCase()} ${slot.toUpperCase()}!`, tier >= 5 ? '#fef3c7' : tier === 4 ? '#c084fc' : '#00f0ff'); if (tier >= 4) { spawnFlash(hero.pos.clone().add(new THREE.Vector3(0, 2.2, 0)), tier >= 5 ? 0xfde68a : 0xc084fc, 12, .7); spawnRing(hero.pos, tier >= 5 ? 0xfde68a : 0xc084fc, 1.2, .9); if (slot === 'chest') systemChat(`🪽 ${hero.name} now wears ${spec.name} ${slot} — spirit wings unfurl!`); }
    updateAllHUD(); pushPresence(true); saveProgress(true);
}
function getHeroDamageReduction() { return Math.min(85, ARMOR_TIERS[hero.armor.helm].dr + ARMOR_TIERS[hero.armor.chest].dr + ARMOR_TIERS[hero.armor.legs].dr + (hero.inBearForm ? 20 : 0) + (hero.shieldUntil && Date.now() < hero.shieldUntil ? 40 : 0)); }
function spawnFloatingText(worldPos, text, color = '#ffffff') {
    const proj = worldPos.clone(); proj.y += 2.8; proj.project(camera); if (proj.z > 1) return;
    const div = document.createElement('div'); div.className = 'floating-dmg text-sm sm:text-base'; div.style.left = `${(proj.x * 0.5 + 0.5) * innerWidth}px`; div.style.top = `${(-proj.y * 0.5 + 0.5) * innerHeight}px`; div.style.color = color; div.textContent = text;
    $('combat-text-layer').appendChild(div); setTimeout(() => div.remove(), 1150);
}
function heroDamage(raw, src) {
    if (hero.dead) return;
    if (!hero.isGrounded) { spawnFloatingText(hero.pos, 'DODGED (AIRBORNE)!', '#38bdf8'); return; }
    if (hero.mounted) dismountKodo('knocked off');
    const reduced = Math.round(raw * (1 - getHeroDamageReduction() / 100)); hero.hp = Math.max(0, hero.hp - reduced); spawnFloatingText(hero.pos, `-${reduced}`, '#f43f5e'); sfx.playHit(); spawnSparks(hero.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0xf43f5e, 8, .7); camShake = Math.max(camShake, .25); if (casting) cancelCast(); updateAllHUD();
    if (hero.hp <= 0) onHeroDeath();
}
function onHeroDeath() {
    hero.dead = true; const pen = Math.floor(hero.zart * 0.1); hero.zart -= pen; const ov = $('death-overlay'); ov.classList.remove('hidden'); ov.classList.add('flex'); let n = 5;
    const t = setInterval(() => { n--; $('death-sub').textContent = `Spirit returns to Red Cloud Mesa in ${n}s… (-${pen} ZAR-T)`; if (n <= 0) { clearInterval(t); ov.classList.add('hidden'); ov.classList.remove('flex'); hero.dead = false; hero.hp = hero.maxHp; hero.pos.set(0, getTerrainHeight(0, 0), 0); updateAllHUD(); saveProgress(true); } }, 1000);
    systemChat(`${hero.name} fell on the plains.`);
}
