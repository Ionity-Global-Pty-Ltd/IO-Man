# IONITY IO-MAN — GET OVER IT DOOR

> ASCII / ANSI side-scrolling beat-em-up in a single HTML file. Chop the spores, push forward, open the door, get over it.

**Document ID:** GME-2026-10-005 · **Version:** 4.1.0 · **Classification:** INTERNAL (source published for reference)
**Author:** Johan Wilhelm van Antwerp · Ionity (Pty) Ltd · AEDI (Antwerp Ecosystems Designs Ionity) · ORCID [0009-0005-7181-0347](https://orcid.org/0009-0005-7181-0347)
**Governance:** Policy 986 AED · **License:** AED 900 · CC BY-NC-SA 4.0 where stated
**Play:** https://ionity.fun · **Web:** https://www.ionity.today · https://www.ionity.world · Ref: https://www.ionity.co.za · Contact: ai@ionity.today

---

## Play

Open `index.html` (identical to `IONITY_IO-MAN_GET_OVER_IT_DOOR.html`) in any modern browser, or play at https://ionity.fun. No install, no assets, no network.
Phones and tablets: play in **landscape** (portrait shows a rotate screen and pauses). Tap `[ ]` for fullscreen with landscape lock where the browser allows it.

| Action | Keyboard | Touch |
|---|---|---|
| Move (W/S = depth lane) | `WASD` / arrows | drag joystick |
| Jump · Jump-slam | `Space` · `Space` then `J` | JUMP · JUMP then CHOP |
| Chop · 3-hit chain (3rd = FINISHER) | `J` (`X`/`F` in play) | CHOP ==> |
| Dash · Dash strike | double-tap `A`/`D` · chop mid-dash | — |
| Hop off IO-BEAST | `Space` while riding | JUMP |
| **SLOW** — 3 s time dilation, 18 s recharge | `K` | SLOW |
| **CLEAVE** — 360° AoE, breaks guards, 7 s recharge | `L` | CLEAVE |
| **ULTRA** — screen wipe, halves any boss, 4 min cooldown | `U` | ULTRA |
| Hall of Fame (title) | `H` | menu |
| Pause · Options · Mute · Next track · Fullscreen | `P` · `O` · `M` · `N` · `F` (menus) | `||` · `≡` · `♪` · `[ ]` |
| NEW GAME+ (after beating ROOT) | `G` | — |
| Start / skip · Continue from checkpoint | `Enter` · `C` | START / OK · CONT |

## v4.1.0 — what's new

**New IONITY logo.** A block-letter ANSI wordmark (ANSI Shadow style): solid `█` letters with a `╗║╚═╝` drop shadow, a six-step cyan gradient, a typewriter-style reveal and a light sweep. It appears on the boot screen and the intro. The title screen uses the same style for **IO-MAN**.

**Vector glyph renderer.** Block characters (`█ ▀ ▄ ░ ▒ ▓`) and box-drawing characters (`─ │ ┌ ═ ║ ╔ ╟` …) are drawn as shapes rather than font glyphs, the way real terminals do it. The logo and frames are pixel-perfect and joined up on every font, phone and DPI.

**Neater GUI.**
- The title screen has a framed **MENU** (NEW RUN / CONTINUE / OPTIONS / HALL OF FAME / FULLSCREEN, navigated with W/S + Enter or the stick) next to a **CONTROLS** panel, which switches to touch controls on phones.
- There's a dedicated **Hall of Fame** screen (`H`).
- The boot POST, options, pause, stage cards and run summary all use double-line ANSI panels with drop shadows.
- The HUD is laid out in fixed bracketed columns: `[ STAGE ]`, `[ TIME ]`, `[ DIFF ]`, then the wave map in the centre, with `[ SCORE ]` and `[ COMBO / AI ]` on the right.
- The ground line carries block-meter HP and ARMOR bars.
- Below it, an aligned ability row shows a meter, cooldown and READY state for SLOW, CLEAVE and ULTRA, plus your gear.

## v4.0.0 — what's new

**Combat depth.** The third chop in a chain is a **FINISHER**: double damage, launches the spore, and adds a short hit-stop. Double-tap left or right to **dash** (brief invulnerability). Chopping mid-dash is a **DASH STRIKE** that shatters shield guards.

**IO-BEAST mount** (original design). RIDERs bring one in at wave 2 of FIREWALL, EDGE NODE and UPLINK. Knock the rider off, then walk into the beast to ride it. While riding you move 35% faster and CHOP breathes a piercing ion stream. The beast soaks 70% of incoming damage, and three hits throws you off. `Space` hops off.

**Two-phase bosses.** At 50% HP, THE AUDITOR enters **ZERO TOLERANCE**: faster, longer dashes that scatter spores, and two extra shields. THE GREAT FUNGUS **ENRAGES**: it moves faster, volleys faster, and drops **SPORE RAIN** on your position. A banner warns when either phase starts.

**World map.** Between stages, an ASCII route map shows IO walking to the next node, with the next stage's brief.

**Difficulty and replay.** EASY / NORMAL / IRON scale spore damage, speed, HP and the Director's ceiling. **NEW GAME+** loops the run with your gear kept, and spores get +15% damage, +10% speed and +1 HP each loop. The **Hall of Fame** keeps a local top 5 with 3-letter initials, rank, stage, loop and difficulty.

**Weather per stage.** Data bits in the server row, embers in FIREWALL, falling leaves in DATA FOREST, glyph dust in ENCRYPTION, sparks on the antennas, rain over the UPLINK sea, and rising spores in ROOT.

**Platform.**
- **Gamepad**, standard mapping: stick or d-pad to move, A jump, X chop, Y cleave, B/LB slow, RB/RT ultra, Start pause, Back mute.
- **Options** (`O`): music and SFX volume, difficulty, screen shake, CRT scanlines, reduced flashing, phone haptics, and reset. Settings persist on the device.
- **Haptics** on hits and finishers.
- An inline **IO** icon for the browser tab and home screen.
- DTA now also logs finishers, dashes, mounts, NG+ loop and Hall of Fame rank. Accuracy counts swings that connected.

## v3.0.0

**Golden Axe-style scrolling.** Main stages are 2–4 screens long. The camera only moves forward. Each area locks the screen for a wave, then `GO >>>` flashes and you push on, and the door waits at the far end. The HUD map tracks your run: `WAVE 2/4 [===+====>----|----|----D]`.

**Nine scrolling stages + three bonus**, each with its own animated ASCII parallax backdrop. The two new stages are **DATA FOREST** and **UPLINK** (a bridge over a data sea). ROOT is three zones deep, and THE GREAT FUNGUS rises in the last one.

**PACKET THIEF.** It sprints across after a cleared area, and every hit shakes loot loose. Catch it before it leaves the screen. **DATA CRATES** sit along the route and always drop loot.

**Boot + intro + music.** A BIOS-style `PRESS ANY KEY / TAP TO BOOT` screen unlocks audio (browsers block sound until you interact). The 7-second tree intro plays with its own theme, *SEED*, and the title gets *IO-MAN THEME*. There are six original chiptune loops in all: SEED, IO-MAN THEME, RUN-N-GUN, AXE OF IONS, EDGE RUNNER, ROOT SYSTEM. They are composed for this build, and no third-party soundtracks are reproduced.

**Mobile.** The canvas resizes to fit any screen and re-renders its font at the device pixel ratio, so glyphs stay sharp from phone to 4K. Touch devices get a drag joystick and a see-through terminal-style button deck with live cooldowns (SLOW 12s / READY). Page chrome is hidden on short landscape screens, and safe-area insets are respected.

## Core systems (from v2)

The arena has 11 depth lanes with perspective, depth-sorted rendering, depth shading and shadows.

**Thirteen types** (rider added in v4). Walker, fast, tank (3 HP), flyer, spitter (kites and lobs), shield (blocks two frontal hits), bomber (fuses and blows, and hurts spores too), splitter (spawns minis), mini, sprout (bonus), packet thief, data crate. **THE AUDITOR** is the GOVERNANCE midboss (lane dash, calls shields). **THE GREAT FUNGUS** is the ROOT boss (3D spore volleys, minions), and ULTRA halves it.

**Loot and gear:** `+` HP, `A` Ion Armor (absorbs 60%, cap 75), `B` Ion Boots (x2), `X` Axe+ (x2), `S` Spread Shot (three-lane ion bolts, 12 s), `U` Ultra charge (−60 s), and `$ @ *` for score.

**AI Director.** It scales spawn pressure 0.65×–1.6× based on your HP, kill rate and damage taken, and shifts drops toward HP when you're struggling. Enemy roles are rusher, flanker and kiter.

**AEDI Coach** gives one-line callouts driven by the live run. **Checkpoints** save your progress, and `C` continues from the furthest stage. **DTA** records full run telemetry that you can COPY or DOWNLOAD as JSON.

## Stages

| # | Name | Screens | Waves | New | Theme | Track |
|---|---|---|---|---|---|---|
| 1 | INIT | 2 | 2 | walkers | city | RUN-N-GUN |
| 2 | HANDSHAKE | 3 | 3 | fast | server racks | RUN-N-GUN |
| B | SPORE COIN RAIN | 1 | 20 s | `$` `@` | city | IO-MAN THEME |
| 3 | FIREWALL | 3 | 3 | tank, spitter | firewall flames | EDGE RUNNER |
| 4 | GOVERNANCE | 3 | 3 + Auditor | flyer, shield, THE AUDITOR | courthouse | AXE OF IONS |
| 5 | DATA FOREST | 4 | 4 | splitter swarms | forest | AXE OF IONS |
| B | CHOP FRENZY | 1 | 15 s | sprouts | forest | RUN-N-GUN |
| 6 | ENCRYPTION | 4 | 4 | bomber, splitter | cipher ruins | EDGE RUNNER |
| 7 | EDGE NODE | 4 | 4 | everything | antenna field | EDGE RUNNER |
| 8 | UPLINK | 4 | 4 | bomber-heavy | bridge / data sea | RUN-N-GUN |
| B | HP SHRINE | 1 | 15 s | `+` `A` `*` | courthouse | IO-MAN THEME |
| 9 | ROOT | 3 | 2 + boss | THE GREAT FUNGUS | root cavern | ROOT SYSTEM |

## Build

The game is vanilla JS in one file (~1,500 lines, ~100 KB). It draws a 112×30 character grid onto a canvas, using the Ionity palette (cyan `#00c6ff` on `#0d1b2a`) plus the ANSI LGREEN / ORANGE / RED / PURPLE colours from the AEDI shell scripts.

v4 was verified headless in Chromium (Playwright) with an injected standard gamepad: options persistence, gamepad start and movement, finisher chain, dash strike breaking a shield, rider to beast to mount to thrown, UPLINK weather, world map transition, Auditor and Fungus phase 2 (spore rain), win to initials to Hall of Fame to NEW GAME+ (gear kept, damage x1.15), game over to initials, and hit-stop freezing game time. A Pixel 7 landscape pass rendered the touch deck. Zero console errors. The v3 checks below still apply.

v3 was verified headless in Chromium (Playwright). The desktop run covered boot, intro, title, a scrolling wave lock and release, the door at the end of the level, the themed long stages, a thief loot drop, THE AUDITOR, the ROOT boss zone, ULTRA halving the boss (44→22), victory and the bonus stage. The Pixel 7 portrait run confirmed the rotate screen. The landscape run confirmed the canvas fit (791×410 in an 839×412 viewport) and joystick input. Zero console errors.

```
sha256  index.html / IONITY_IO-MAN_GET_OVER_IT_DOOR.html   9593264b56904f35148e4d83b857b3b043fc7f264283c06b44bceee2323dc08e   v4.1.0
sha256  (v4.0.0)                                             4584fdeeaf36bf4fd8f61789721fc38ba41d8a36b9b7801afb9f107ca6818daa
sha256  (v3.0.0)                                             ba4618e83bb9f22be75d25f1e2491b8201caa3a6a16e99c9a9777037cc09ae54
sha256  v1/IONITY_GET_OVER_IT_DOOR.html                     3a46b422853e8d61012c99a808cf25c2c3e3c71dff6af47f0d79b3f92f9580d7   v1.0.0
v2.0.0 (9eff69c1…) is kept in git history.
```

## Repository layout

```
index.html                            v4.1.0 — served at ionity.fun
IONITY_IO-MAN_GET_OVER_IT_DOOR.html   v4.1.0 (same file, descriptive name)
v1/                                   GET OVER IT DOOR v1.0.0 (GME-2026-09-001)
previews/                             headless screenshots
README.md                             this file
```

---

© 2018–2026 Antwerp Designs | Ionity (Pty) Ltd · All rights reserved · Policy 986 AED · AED 900
Ionity refers exclusively to www.ionity.today / www.ionity.world / ionity.fun and is not affiliated with www.ionity.com.

**BUILDING TOMORROW, TODAY**
