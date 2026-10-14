/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 120-ui.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 12. UI */
function toggleModal(id) { const m = $(id), hidden = m.classList.contains('hidden'); m.classList.toggle('hidden', !hidden); m.classList.toggle('flex', hidden); }
function updateAllHUD() {
    $('hud-hero-name').textContent = hero.name; $('hud-level').textContent = `LV ${hero.level}`;
    $('hud-hp-bar').style.width = `${(hero.hp / hero.maxHp) * 100}%`; $('hud-hp-text').textContent = `${Math.round(hero.hp)} / ${hero.maxHp} HP`; $('hud-xp-bar').style.width = `${Math.min(100, hero.xp / hero.xpNext * 100)}%`;
    $('hud-zart').textContent = `${hero.zart} ZAR-T`; $('hud-hides').textContent = `${hero.hides} HIDES`; $('hud-res').textContent = `🪵${hero.res.wood} 🪨${hero.res.stone} ⛏️${hero.res.ore} 🐉${hero.res.scales || 0}`; updateQuestHUD();
    const cs = coreState || { hp: 1500, maxHp: 1500 }; $('hud-core-hp').textContent = cs.downUntil && Date.now() < cs.downUntil ? 'CORE DOWN' : `CORE ${Math.round((cs.hp / cs.maxHp) * 100)}%`;
    ['helm', 'chest', 'legs'].forEach(s => { const el = $('slot-' + s); el.textContent = ARMOR_TIERS[hero.armor[s]].name; el.className = TIER_CLASS[hero.armor[s]]; }); $('hud-armor-dr').textContent = `${getHeroDamageReduction()}% DR`;
    const bio = biomeAt(hero.pos.x, hero.pos.z), zi = bio === 'PLAINS' && hero.pos.y > 7.5 ? BIOME_INFO.CRAGS : BIOME_INFO[bio]; $('hud-zone-name').textContent = zi.label; $('hud-zone-name').style.color = zi.color;
    const tp = $('hud-talent-pts'); if (tp) { tp.textContent = hero.talentPts; tp.classList.toggle('hidden', !(hero.talentPts > 0)); }
    $('btn-mount-label').textContent = hero.mounted ? 'DISMOUNT' : 'MOUNT'; $('btn-mount').classList.toggle('active', hero.mounted);
    document.querySelectorAll('.btn-buy-plot').forEach(b => { if (hero.plots[b.dataset.plot]) { b.textContent = 'OWNED ✓'; b.disabled = true; b.classList.add('opacity-50'); } });
}
function updateTargetFrame() {
    const f = $('target-frame'); if (!selectedTarget || (!worldMobs[selectedTarget.id] && !playerStructures[selectedTarget.id]) || (selectedTarget.skinnedBy || {})[currentUser.uid]) { f.classList.add('hidden'); f.classList.remove('flex'); return; }
    f.classList.remove('hidden'); f.classList.add('flex'); $('target-name').textContent = selectedTarget.name.toUpperCase();
    $('target-status').textContent = ((selectedTarget.state || '').startsWith('DEAD') ? 'CORPSE (LOOT [F] / SKIN [K])' : (selectedTarget.struct ? (selectedTarget.ownerName || 'ENEMY') + ' STRUCTURE LV' + (selectedTarget.level || 1) : selectedTarget.boss ? '💀 WORLD BOSS' : selectedTarget.tpl.core ? '🏰 RIVAL CITADEL CORE' : selectedTarget.rival ? '🔥 RIVAL TOWER' : selectedTarget.elite ? '👑 RARE ELITE' : (selectedTarget.isCreep ? 'CREEP INVADER' : 'WILD BEAST'))) + ' · ' + Math.round(hero.pos.distanceTo(selectedTarget.mesh.position)) + 'm';
    $('target-hp-bar').style.width = `${(selectedTarget.hp / selectedTarget.maxHp) * 100}%`; $('target-hp-text').textContent = `${Math.round(selectedTarget.hp)} / ${selectedTarget.maxHp}`;
}
function selectClassCard(cls) { document.querySelectorAll('.class-card').forEach(c => { const on = c.dataset.class === cls; c.classList.toggle('border-amber-400', on); c.classList.toggle('bg-slate-900/90', on); c.classList.toggle('border-slate-700/80', !on); c.classList.toggle('bg-slate-900/70', !on); }); hero.classType = cls; }
function setRig(isOxen) { hero.isOxen = isOxen; $('btn-rig-oxen').className = isOxen ? 'px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-xs font-bold text-amber-200' : 'px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300'; $('btn-rig-classic').className = !isOxen ? 'px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-xs font-bold text-cyan-200' : 'px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300'; }
document.querySelectorAll('.class-card').forEach(card => card.addEventListener('click', () => selectClassCard(card.dataset.class)));
$('btn-rig-oxen').addEventListener('click', () => setRig(true)); $('btn-rig-classic').addEventListener('click', () => setRig(false));

$('btn-enter-realm').addEventListener('click', async () => {
    if (!currentUser) return;
    const nameVal = $('input-hero-name').value.trim().replace(/[.#$\[\]\/]/g, ''); if (nameVal) hero.name = nameVal.slice(0, 18);
    realm = $('realm-select').value; $('realm-label').textContent = realm.toUpperCase();
    if (hero.mesh) scene.remove(hero.mesh); hero.mesh = createStickOxenCharacter({ isOxen: hero.isOxen, classType: hero.classType }); applyArmorToRig(hero.mesh, hero.armor);
    hero.pos.set(0, getTerrainHeight(0, 0), 0); hero.mesh.position.copy(hero.pos); scene.add(hero.mesh); hero.mounted = false; if (hero.mountMesh) hero.mountMesh.visible = false;
    CLASS_SKILL_BARS[hero.classType].forEach((s, i) => { $(`skill-${i + 1}-icon`).textContent = s.icon; $(`skill-${i + 1}-name`).textContent = s.name; });
    $('hud-class-icon').textContent = { druid: '🐂', warrior: '⚔️', mage: '🔥', hunter: '🏹' }[hero.classType];
    Object.keys(hero.plots).forEach(p => constructPurchasedTownBuilding(p));
    $('char-select-modal').classList.add('hidden'); sfx.playLoot();
    try { await seedWorldIfEmpty(); bindWorld(); } catch (e) { spawnFloatingText(hero.pos, 'World sync error: ' + e.message, '#f43f5e'); }
    gameStarted = true; updateAllHUD(); updateQuestHUD(); saveProgress(true); systemChat(`${hero.name} the ${hero.classType} entered Red Cloud Mesa.`);
});
document.querySelectorAll('.action-slot[data-slot]').forEach(el => el.addEventListener('click', () => triggerClassSkill(parseInt(el.dataset.slot, 10))));
$('btn-jump').addEventListener('click', triggerHeroJump); $('btn-bar-loot').addEventListener('click', interactF); $('btn-bar-skin').addEventListener('click', trySkinNearestCorpse); $('btn-context-loot').addEventListener('click', tryLootNearestCorpse); $('btn-context-skin').addEventListener('click', trySkinNearestCorpse);
$('btn-open-town').addEventListener('click', () => toggleModal('town-modal')); $('btn-close-town').addEventListener('click', () => toggleModal('town-modal')); $('btn-leaderboard').addEventListener('click', () => toggleModal('lb-modal')); $('btn-close-lb').addEventListener('click', () => toggleModal('lb-modal'));
$('btn-toggle-build').addEventListener('click', () => $('build-drawer').classList.toggle('hidden'));
document.querySelectorAll('.btn-build-struct').forEach(btn => btn.addEventListener('click', () => { setBlueprint(btn.dataset.build); buildStructureAtHero(btn.dataset.build); }));
$('btn-spawn-wave-now').addEventListener('click', () => { if (gameStarted) spawnCreepWave(true); });
document.querySelectorAll('.btn-buy-plot').forEach(btn => btn.addEventListener('click', () => {
    const plotId = btn.dataset.plot, cost = parseInt(btn.dataset.cost, 10); if (hero.plots[plotId]) return; if (hero.zart < cost) { spawnFloatingText(hero.pos, `Need ${cost} ZAR-T!`, '#f43f5e'); return; }
    if (constructPurchasedTownBuilding(plotId)) { hero.zart -= cost; hero.plots[plotId] = true; if (plotId === 'lodge') { hero.maxHp += 40; hero.hp += 40; hero.passiveZartPer10s += 6; } else if (plotId === 'sanctuary') { hero.passiveZartPer10s += 10; spawnFloatingText(hero.pos, '🪽 TRIPLE JUMP UNLOCKED', '#38bdf8'); } else { hero.bonusDmg += 15; hero.passiveZartPer10s += 10; } sfx.playDrum(); spawnFloatingText(hero.pos, `🏡 PURCHASED TOWN ${plotId.toUpperCase()}!`, '#fbbf24'); systemChat(`${hero.name} raised a ${plotId} in Thunderhoof town.`); updateAllHUD(); saveProgress(true); }
}));
// Crafting (Tannery & Forge)
$('btn-craft-drums').addEventListener('click', () => { if (hero.drums) { spawnFloatingText(hero.pos, 'War-Drums already crafted', '#94a3b8'); return; } if (hero.hides < 3 || hero.res.wood < 4) { spawnFloatingText(hero.pos, 'Need 3 Hides [K] + 4 Wood [F]', '#f43f5e'); return; } hero.hides -= 3; hero.res.wood -= 4; hero.drums = true; hero.bonusDmg += 25; sfx.playDrum(); spawnFlash(hero.pos.clone().add(new THREE.Vector3(0, 2, 0)), 0xf59e0b, 8, .5); spawnFloatingText(hero.pos, '🥁 KODO WAR-DRUMS: +22% SPEED · +25 POWER', '#fbbf24'); systemChat(`🥁 ${hero.name}'s war-drums echo across the realm!`); updateAllHUD(); saveProgress(true); });
function craftFullSet(tier, label) { ['helm', 'chest', 'legs'].forEach(s => { if (hero.armor[s] < tier) { hero.armor[s] = tier; } }); applyArmorToRig(hero.mesh, hero.armor); spawnFlash(hero.pos.clone().add(new THREE.Vector3(0, 2.2, 0)), tier >= 5 ? 0xfde68a : 0xe879f9, 16, .8); spawnRing(hero.pos, tier >= 5 ? 0xfde68a : 0xe879f9, 1.6, 1); camShake = .6; sfx.playDrum(); spawnFloatingText(hero.pos, label, tier >= 5 ? '#fef3c7' : '#e879f9'); systemChat(`${hero.name} now wears the full ${ARMOR_TIERS[tier].name} set${tier >= 4 ? ' — spirit wings unfurl!' : ''}`); updateAllHUD(); pushPresence(true); saveProgress(true); }
$('btn-craft-mythic').addEventListener('click', () => { if (hero.hides >= 4 && hero.res.scales >= 2 && hero.res.ore >= 6) { hero.hides -= 4; hero.res.scales -= 2; hero.res.ore -= 6; } else if (hero.zart >= 320) hero.zart -= 320; else { spawnFloatingText(hero.pos, 'Need 4 Hides + 2 Scales + 6 Ore (or 320 ZAR-T)', '#f43f5e'); return; } craftFullSet(4, '🪽 MYTHIC T4 WINGED SET FORGED!'); });
function ascendT5() { if (hero.armor.helm >= 5 && hero.armor.chest >= 5 && hero.armor.legs >= 5) { spawnFloatingText(hero.pos, 'Already Celestial', '#94a3b8'); return; } if (hero.res.scales >= 3) hero.res.scales -= 3; else if (hero.zart >= 350) hero.zart -= 350; else { spawnFloatingText(hero.pos, 'Need 3 Dragon Scales or 350 ZAR-T', '#f43f5e'); return; } craftFullSet(5, '🌟 CELESTIAL T5 SUN-WALKER ASCENSION!'); }
$('btn-craft-celestial').addEventListener('click', ascendT5); $('btn-ascend-t5').addEventListener('click', ascendT5);
// APEX HUD buttons
$('btn-char').addEventListener('click', toggleCharSheet); $('btn-close-char').addEventListener('click', toggleCharSheet);
$('btn-oracle').addEventListener('click', () => toggleModal('oracle-modal')); $('btn-close-oracle').addEventListener('click', () => toggleModal('oracle-modal'));
$('btn-mount').addEventListener('click', toggleKodoMount);
$('btn-sky').addEventListener('click', () => { applySkyMode(skyMode + 1); if (hero.mesh) spawnFloatingText(hero.pos, `🌌 ${['APEX NOON', 'EMBER DUSK', 'AURORA NIGHT'][skyMode]}`, '#38bdf8'); });
$('btn-bloom').addEventListener('click', e => { if (!window.__bloom) return; __bloom.enabled = !__bloom.enabled; $('bloom-label').textContent = __bloom.enabled ? 'HDR ON' : 'HDR OFF'; });
document.querySelectorAll('.btn-talent').forEach(b => b.addEventListener('click', () => spendTalent(b.dataset.talent)));
$('btn-rally').addEventListener('click', summonAlliedWarband); $('btn-upgrade-tower').addEventListener('click', upgradeNearestStructure); $('btn-summon-siege').addEventListener('click', summonSiegeKodo);
document.querySelectorAll('.warp-btn').forEach(b => b.addEventListener('click', () => warpTo(b.dataset.warp)));
$('oracle-form').addEventListener('submit', e => { e.preventDefault(); const q = $('oracle-input').value.trim(); if (!q) return; $('oracle-input').value = ''; askOracle(q); });
$('btn-bounty').addEventListener('click', postBounty);
$('btn-sell-hides').addEventListener('click', () => { if (hero.hides <= 0) { spawnFloatingText(hero.pos, 'No Skinned Hides to sell yet!', '#94a3b8'); return; } const pay = hero.hides * 35; hero.zart += pay; hero.hides = 0; sfx.playLoot(); spawnFloatingText(hero.pos, `+${pay} ZAR-T (Sold Hides)`, '#10b981'); updateAllHUD(); saveProgress(true); });
$('btn-buy-sovereign').addEventListener('click', () => { if (hero.zart < 150) { spawnFloatingText(hero.pos, 'Need 150 ZAR-T!', '#f43f5e'); return; } hero.zart -= 150; const slots = ['helm', 'chest', 'legs']; equipArmorPiece(slots.find(s => hero.armor[s] < 3) || slots[Math.floor(Math.random() * 3)], 3); sfx.playLoot(); });
$('cam-rot-left').addEventListener('click', () => { cam.yaw += 0.35; }); $('cam-rot-right').addEventListener('click', () => { cam.yaw -= 0.35; }); $('cam-tilt-up').addEventListener('click', () => { cam.pitch = Math.min(1.3, cam.pitch + 0.15); }); $('cam-tilt-down').addEventListener('click', () => { cam.pitch = Math.max(0.15, cam.pitch - 0.15); }); $('cam-zoom-in').addEventListener('click', () => { cam.dist = Math.max(6, cam.dist - 3); }); $('cam-zoom-out').addEventListener('click', () => { cam.dist = Math.min(44, cam.dist + 3); });
window.addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); if (composer) composer.setSize(innerWidth, innerHeight); });
window.addEventListener('beforeunload', () => { if (gameStarted) saveProgress(true); });
