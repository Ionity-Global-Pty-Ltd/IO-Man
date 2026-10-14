/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 10-sound.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 1. SOUND */
class RealmSoundEngine {
    constructor() { this.ctx = null; }
    init() { if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (A) this.ctx = new A(); } if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }
    playTone(f1, f2, dur = 0.18, type = 'sine', vol = 0.16) { this.init(); if (!this.ctx) return; const now = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f1, now); o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + dur); g.gain.setValueAtTime(vol, now); g.gain.exponentialRampToValueAtTime(0.001, now + dur); o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now + dur + 0.02); }
    playJump() { this.playTone(170, 420, 0.22, 'triangle', 0.18); }
    playHit() { this.playTone(190, 45, 0.16, 'sawtooth', 0.24); }
    playSpell() { this.playTone(440, 880, 0.28, 'sine', 0.18); }
    playLoot() { this.playTone(587, 880, 0.15, 'triangle', 0.18); setTimeout(() => this.playTone(880, 1174, 0.22, 'sine', 0.18), 110); }
    playSkinning() { this.playTone(260, 190, 0.14, 'sawtooth', 0.12); }
    playRoar() { this.playTone(130, 52, 0.45, 'sawtooth', 0.28); }
    playDrum() { this.playTone(95, 38, 0.32, 'triangle', 0.32); setTimeout(() => this.playTone(110, 42, 0.35, 'triangle', 0.32), 180); }
}
const sfx = new RealmSoundEngine();
