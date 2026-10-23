(() => {
  'use strict';
  let context, menuGain, fxGain, meter, timer, step = 0, next = 0, mode = 'silent', ready = false;
  const voices = new Set(), hz = n => 440 * 2 ** ((n - 69) / 12);
  function gains() {
    if (!context) return;
    const s = RR_SETTINGS.get();
    menuGain.gain.setTargetAtTime(s.menuVolume / 100 * .4, context.currentTime, .06);
    fxGain.gain.setTargetAtTime(s.sfxVolume / 100 * .45, context.currentTime, .02);
  }
  async function unlock() {
    try {
      if (!context || context.state === 'closed') {
        context = new (window.AudioContext || window.webkitAudioContext)();
        menuGain = context.createGain(); fxGain = context.createGain();
        const comp = context.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 5;
        meter = context.createAnalyser(); meter.fftSize = 256;
        menuGain.connect(comp); fxGain.connect(comp); comp.connect(meter); meter.connect(context.destination); gains();
      }
      await context.resume(); ready = context.state === 'running';
      document.dispatchEvent(new CustomEvent('rr-audio-status', { detail: ready }));
      return ready;
    } catch { ready = false; return false; }
  }
  function note(midi, when, duration = .2, volume = .12, type = 'sine', bus = fxGain) {
    if (!context || !bus || context.state !== 'running') return;
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = type; osc.frequency.value = hz(midi);
    gain.gain.setValueAtTime(.0001, when); gain.gain.exponentialRampToValueAtTime(Math.max(.0002,volume), when + .014);
    gain.gain.exponentialRampToValueAtTime(.0001, when + duration);
    osc.connect(gain); gain.connect(bus); osc.start(when); osc.stop(when + duration + .02);
    voices.add(osc); osc.onended = () => { voices.delete(osc); osc.disconnect(); gain.disconnect(); };
  }
  function stop() { clearInterval(timer); timer = null; for (const v of voices) { try { v.stop(); } catch {} } voices.clear(); }
  function schedule() {
    if (!ready || document.hidden || mode === 'silent') return;
    // OrbitHop's original F# minor synth arpeggio: 78 BPM, unlike either stage.
    const beat = 60 / 78, melody = [78,81,85,88,85,81,80,76,76,80,83,88,83,80,78,76];
    while (next < context.currentTime + .18) {
      const chord = Math.floor(step / 16) % 4, root = [42,38,45,40][chord];
      if (next >= context.currentTime) {
        note(melody[step % melody.length], next, .48, .10, 'triangle', menuGain);
        note(melody[step % melody.length] + 12, next, .3, .018, 'sine', menuGain);
        if (step % 4 === 0) note(root, next, .75, .15, 'sine', menuGain);
        if (step % 16 === 0) [root+12,root+15,root+19,root+26].forEach(n => note(n,next,2.9,.024,'sine',menuGain));
        if (step % 4 === 2) note(91, next, .055, .035, 'triangle', menuGain);
      }
      step++; next += beat / 2;
    }
  }
  async function menu() { mode = 'menu'; if (!await unlock() || mode !== 'menu') return; if (timer) return; next = context.currentTime + .08; schedule(); timer = setInterval(schedule,35); }
  function silence() { mode = 'silent'; stop(); }
  const signature = { play: [73,80,85], tutorial: [76,78,83], options: [66,73,78], accessibility: [69,76,81], about: [71,75,82], back: [78,73,66] };
  async function cue(kind, action = 'click') {
    if (action === 'hover' && !ready) return;
    if (!await unlock()) return;
    const notes = signature[kind] || signature.options;
    if (action === 'hover') { note(notes[0]+12,context.currentTime,.075,.055,'sine'); return; }
    notes.forEach((n,i) => note(n,context.currentTime+i*.055,.22,.12, i===1?'triangle':'sine'));
  }
  function hit(lane, kind = 'perfect') {
    if (!context || !ready) return;
    note((kind === 'miss' ? [48,50,52,53] : [84,79,88,86])[lane], context.currentTime, kind === 'miss' ? .13 : .2, .10, kind === 'miss' ? 'triangle' : 'sine');
  }
  function portal(stage) {
    if (!context || !ready) return;
    const melody = stage === 2 ? [78,77,73,66] : stage === 3 ? [76,72,67] : [66,73,78,85,90];
    melody.forEach((n,i)=>note(n,context.currentTime+i*.13,.65,.13,'triangle'));
  }
  function cheer(){if(!context||!ready)return;[79,83,86,91].forEach((n,i)=>note(n,context.currentTime+i*.09,.28,.10,'sine'));}
  function story(index){
    if(!context||!ready)return;
    if([1,2,3,4,5].includes(index))portal(index===2?2:1);
    else if(index===6){note(48,context.currentTime,.22,.13,'sine');note(76,context.currentTime+.15,.35,.07,'triangle');}
    else if(index===8)cheer();
    else [66,73,78].forEach((n,i)=>note(n,context.currentTime+i*.12,1.4,.04,'triangle'));
    if([3,4,5].includes(index)){
      const osc=context.createOscillator(),gain=context.createGain(),now=context.currentTime;
      osc.type='sine';osc.frequency.setValueAtTime(index===5?620:120,now);osc.frequency.exponentialRampToValueAtTime(index===5?90:700,now+1.2);
      gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.08,now+.35);gain.gain.exponentialRampToValueAtTime(.0001,now+1.4);
      osc.connect(gain);gain.connect(fxGain);osc.start(now);osc.stop(now+1.45);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (mode === 'menu') menu();
  });
  window.addEventListener('rr-settings',gains);
  window.addEventListener('pagehide',()=>{stop(); context?.close();});
  window.RR_AUDIO = Object.freeze({ unlock, menu, silence, cue, hit, portal, cheer, story,
    snapshot: () => ({ state: context?.state || 'not-started', mode, music: 'Órbita de Casa', bpm: 78,
      menuGain: menuGain?.gain.value || 0, effectsGain: fxGain?.gain.value || 0, voices: voices.size }),
    level: () => { if (!meter) return 0; const d=new Float32Array(meter.fftSize); meter.getFloatTimeDomainData(d); return Math.sqrt(d.reduce((s,v)=>s+v*v,0)/d.length); }
  });
})();
