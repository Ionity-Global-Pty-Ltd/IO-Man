# IONITY IO-MAN — GET OVER IT DOOR

> ASCII / ANSI depth-lane beat-em-up in a single HTML file. Chop the spores, open the door, get over it.

**Document ID:** GME-2026-09-002 · **Version:** 2.0.0 · **Classification:** INTERNAL (source published for reference)
**Author:** Johan Wilhelm van Antwerp · Ionity (Pty) Ltd · AEDI (Antwerp Ecosystems Designs Ionity) · ORCID [0009-0005-7181-0347](https://orcid.org/0009-0005-7181-0347)
**Governance:** Policy 986 AED · **License:** AED 900 · CC BY-NC-SA 4.0 where stated
**Web:** https://www.ionity.today · https://www.ionity.world · Ref: https://www.ionity.co.za · Contact: ai@ionity.today

---

## Play

Open `IONITY_IO-MAN_GET_OVER_IT_DOOR.html` in any modern browser. No install, no assets, no network. Works on touch devices (on-screen pad).

The original 2D build is kept as `v1/IONITY_GET_OVER_IT_DOOR.html` (GME-2026-09-001).

| Action | Keys |
|---|---|
| Move (W/S = depth lane) | `WASD` / arrows |
| Jump · Jump-slam | `Space` · `Space` then `J` |
| Chop | `J` (`X`/`F`) |
| **SLOW** — 3 s time dilation, 18 s recharge | `K` |
| **CLEAVE** — 360° AoE, breaks guards, 7 s recharge | `L` |
| **ULTRA** — screen wipe, halves any boss, 4 min cooldown | `U` |
| Pause · Mute · Next track | `P` · `M` · `N` |
| Start / skip · Continue from checkpoint | `Enter` · `C` |

## What's inside

**7-second ANSI intro** — a seed sprouts into a procedurally grown tree (deterministic L-system, seed 986) while the IONITY banner resolves and a loading bar runs. `Enter` skips.

**Depth-lane arena** — 11 lanes of semi-3D movement on a perspective floor, depth-sorted rendering, depth shading, shadows under airborne sprites. The door sits on the back wall: when it opens you fight your way to it.

**Ten spore types** — walker, fast, tank (3 HP), flyer, spitter (kites and lobs), shield (blocks two frontal hits), bomber (fuses and blows — hurts spores too), splitter (spawns minis), mini, sprout (bonus).
**THE AUDITOR** — stage-4 midboss, lane dash attack, calls shields. **THE GREAT FUNGUS** — root boss, 3D spore volleys, minions; ULTRA halves it.

**Loot & gear** — `+` HP · `A` Ion Armor (absorbs 60% until depleted, cap 75) · `B` Ion Boots (speed, x2) · `X` Axe+ (chop damage, x2) · `S` Spread Shot (Contra-style three-lane ion bolts, 12 s) · `U` Ultra charge (−60 s) · `$ @ *` score. Drop tables per enemy type; bosses shower loot.

**AI Director** — every 5 s reads HP, kill rate and damage taken; scales spawn pressure 0.65×–1.6× and biases drops toward HP when you're struggling. Enemy roles: rushers, flankers (path around you), kiters. Pack separation spreads spores across lanes.

**AEDI Coach** — one-line callouts driven by live run data (first tank, first shield, HP < 30, ULTRA ready, combo x5, boss intros, door open). Each fires once per run.

**Checkpoints** — furthest stage reached is saved; `C` continues from it with fresh gear.

**Backtracks** — three original chiptune loops sequenced live in WebAudio: *RUN-N-GUN* (fast run-and-gun feel), *AXE OF IONS* (dark heroic fantasy), *ROOT SYSTEM* (boss pulse). Composed for this build; no third-party soundtracks are reproduced.

**DTA (run data)** — chops, hits, blocks, accuracy, jumps, slams, kills per type, abilities used, damage / armor absorbed / healed, loot picked, gear, per-stage time/kills/damage/score with Director mood, build block. On pause, game-over and victory screens; COPY / DOWNLOAD as JSON.

## Stages

| # | Name | Quota | New | Track |
|---|---|---|---|---|
| 1 | INIT | 8 | walkers | RUN-N-GUN |
| 2 | HANDSHAKE | 12 | fast | RUN-N-GUN |
| B | SPORE COIN RAIN | 20 s | `$` `@` from the sky | RUN-N-GUN |
| 3 | FIREWALL | 15 | tank, spitter, ground pops | RUN-N-GUN |
| 4 | GOVERNANCE | 16 + Auditor | flyer, shield, **THE AUDITOR** | AXE OF IONS |
| B | CHOP FRENZY | 15 s | sprouts, combo points | RUN-N-GUN |
| 5 | ENCRYPTION | 20 | bomber, splitter | AXE OF IONS |
| 6 | EDGE NODE | 26 | everything | AXE OF IONS |
| B | HP SHRINE | 15 s | `+` `A` `*` | AXE OF IONS |
| 7 | ROOT | boss | **THE GREAT FUNGUS** | ROOT SYSTEM |

## Build

Vanilla JS, strict mode, ~1200 lines, 112×30 character grid painted to canvas. Palette: Ionity cyan `#00c6ff` on `#0d1b2a`, ANSI LGREEN / ORANGE / RED / PURPLE from the AEDI shell scripts.
Verified headless in Chromium (Playwright): intro → title → depth combat → SLOW / CLEAVE / slam → ULTRA wipe → loot → Auditor → door → bonus → boss (ULTRA halves 44→22) → victory → game-over → continue → pause, zero console errors.

```
sha256  IONITY_IO-MAN_GET_OVER_IT_DOOR.html  9eff69c13e647b6279f06b6cacdec37015c6ab35057d0c704edbd8131d058a98
sha256  v1/IONITY_GET_OVER_IT_DOOR.html       3a46b422853e8d61012c99a808cf25c2c3e3c71dff6af47f0d79b3f92f9580d7
```

## Repository layout

```
IONITY_IO-MAN_GET_OVER_IT_DOOR.html   v2.0.0 (GME-2026-09-002)
v1/IONITY_GET_OVER_IT_DOOR.html       v1.0.0 (GME-2026-09-001)
previews/                             headless screenshots
README.md                             this file
```

---

© 2018–2026 Antwerp Designs | Ionity (Pty) Ltd · All rights reserved · Policy 986 AED · AED 900
Ionity refers exclusively to www.ionity.today / www.ionity.world and is not affiliated with www.ionity.com.

**BUILDING TOMORROW, TODAY**
