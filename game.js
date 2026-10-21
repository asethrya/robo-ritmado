(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const LEVELS = window.RR_LEVELS;
  let levelIndex = 0, level = LEVELS[0], bankedScore = 0, toysUnlocked = false;
  let BPM, BEAT, SONG_BEATS, DURATION, COLORS, MELODY, BASS, CHART, MAX_POINTS, GOAL, FRAMES;
  function configureLevel(index) {
    levelIndex = index; level = LEVELS[index];
    BPM = level.bpm; BEAT = 60 / BPM; SONG_BEATS = level.beats; DURATION = SONG_BEATS * BEAT;
    COLORS = level.colors; MELODY = level.melody; BASS = level.bass; FRAMES = level.frames;
    CHART = [];
    for (let beat = 4, n = 0; beat < 60; beat++) {
      if (level.skipBeat(beat)) continue;
      CHART.push({ beat, lane: level.sequence[n++ % level.sequence.length], time: beat * BEAT });
    }
    MAX_POINTS = CHART.length * 100; GOAL = Math.ceil(MAX_POINTS * .55 / 100) * 100;
  }
  configureLevel(0);
  const KEYS = ['ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'];
  const DIRECTIONS = ['esquerda', 'baixo', 'cima', 'direita'];
  const POINTS = { perfect: 100, good: 60, near: 20, miss: 0 };
  const LABELS = { perfect: 'No ritmo!', good: 'Muito bem!', near: 'Quase!', miss: 'Na próxima!' };
  const JCOLORS = { perfect: '#ffb7e7', good: '#92e6ff', near: '#ffe49d', miss: '#c8bfde' };
  const canvas = $('track'), ctx = canvas.getContext('2d');
  const dancer = $('pixelSprite'), danceCtx = dancer.getContext('2d');
  function imageAsset(url) {
    const image = new Image();
    const ready = new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Não foi possível carregar ' + url + '. Extraia a pasta completa do jogo.'));
    });
    ready.catch(() => {}); // Errors are surfaced when the player enters this world.
    image.src = url; return { image, ready };
  }
  const assets = LEVELS.map(l => ({ sprite: imageAsset(l.sprite), background: imageAsset(l.background) }));
  let sprite = assets[0].sprite.image;
  const GROOVES = [
    [0, 1, 2, 7, 0, 1, 2, 7, 4, 5, 2, 7, 0, 1, 2, 3],
    [0, 1, 5, 7, 4, 5, 2, 3, 0, 1, 6, 3, 4, 5, 2, 7],
    [0, 5, 6, 3, 4, 5, 6, 7, 0, 1, 6, 3, 4, 5, 6, 3]
  ];
  let dancerWidth = 600, dancerHeight = 500, spriteReady = false;
  let danceTime = 0, danceFrame = 0, danceLevel = 0, reaction = 0, reactionKind = 'perfect', reactionLane = 0;
  const danceSparks = [];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  assets[0].sprite.ready.then(() => { spriteReady = true; $('spriteStatus').hidden = true; }).catch(error => { $('spriteStatus').textContent = error.message; });
  let width = 500, height = 500, notes = [], particles = [], rings = [];
  let state = 'ready', previousState = '', score = 0, combo = 0, maxCombo = 0;
  let stats = { perfect: 0, good: 0, near: 0, miss: 0 }, best = 0;
  let audio = null, master = null, analyser = null, compressor = null, noise = null;
  let epoch = 0, step = -8, scheduler = null, offset = 0, generation = 0, starting = false;
  let soft = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFrame = performance.now(), lastSpeech = 0, judgmentUntil = 0, lastCount = null, visualTime = 0;
  const flashes = [0, 0, 0, 0], pressed = [false, false, false, false];
  const voices = new Set();
  const settingsLocked = () => ['playing', 'countdown', 'paused', 'transition', 'loading'].includes(state);
  try {
    best = Number(localStorage.getItem('robo-ritmado-best-v04')) || 0;
    toysUnlocked = localStorage.getItem('robo-ritmado-toys-unlocked') === 'true';
    offset = Math.max(-200, Math.min(200, Number(localStorage.getItem('pixel-offset')) || 0));
    const saved = localStorage.getItem('pixel-effects');
    if (saved !== null) soft = saved === 'soft';
  } catch { /* The game also runs with browser storage disabled. */ }
  $('best').textContent = String(best).padStart(5, '0');
  $('offset').value = offset;
  $('offsetValue').textContent = `${offset > 0 ? '+' : ''}${offset} ms`;
  function save(key, value) { try { localStorage.setItem(key, value); } catch {} }
  const formatTime = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  function updateWorldButtons() {
    $('worldCandy').disabled = settingsLocked();
    $('worldToys').disabled = settingsLocked() || !toysUnlocked;
    $('worldCandy').setAttribute('aria-current', levelIndex === 0 ? 'step' : 'false');
    $('worldToys').setAttribute('aria-current', levelIndex === 1 ? 'step' : 'false');
    $('toyLock').textContent = toysUnlocked ? '✦' : '🔒';
    $('worldToys').title = toysUnlocked ? 'Treinar em Brinquedolândia (novo placar)' : 'Faça 2.600 pontos no Reino dos Doces e conclua a música';
  }
  function updateLevelUI() {
    document.body.dataset.theme = level.id;
    document.documentElement.style.setProperty('--pink', level.accent);
    document.querySelector('.world').style.backgroundImage = `url('${level.background}')`;
    $('chapterLabel').textContent = `FASE 0${levelIndex + 1} · ${levelIndex ? 'O SHOW CONTINUA' : 'PRIMEIRA PARADA'}`;
    $('levelTitle').textContent = level.title; $('levelEm').textContent = level.emphasis;
    $('levelSubtitle').textContent = level.subtitle;
    $('trackName').textContent = levelIndex ? 'PISTA DAS ESTRELAS' : 'PISTA DE CRISTAL';
    $('tempoLabel').textContent = `${BPM} BPM · ${levelIndex ? 'NOVO RITMO' : 'FÁCIL'}`;
    $('songName').textContent = level.song; $('songDescription').textContent = `${level.style} · ${BPM} BPM`;
    $('time').textContent = `0:00 / ${formatTime(Math.ceil(DURATION))}`;
    $('songFill').style.width = '0%';
    document.querySelector('.song-progress').setAttribute('aria-valuenow', '0');
    $('introTitle').innerHTML = levelIndex ? 'Um mundo de estrelas.<br>Um novo <em>ritmo!</em>' : 'O caminho de casa<br>começa no <em>ritmo.</em>';
    $('introCopy').innerHTML = levelIndex ? `O traje mudou. A música também!<br>${bankedScore ? bankedScore.toLocaleString('pt-BR') + ' pontos vieram com você.' : 'Vamos tocar em Brinquedolândia?'}` : 'Pixel se perdeu entre os mundos.<br>Toque na batida e carregue o portal!';
    $('introDetail').textContent = `${Math.ceil(DURATION)} segundos de música · Meta: ${GOAL.toLocaleString('pt-BR')} pontos`;
    $('pixelArt').setAttribute('aria-label', `Pixel dançando com a guitarra e o traje de ${level.name}`);
    document.querySelector('.stage').setAttribute('aria-label', `Jogo de ritmo em ${level.name}`);
    updateWorldButtons(); updateScore();
  }
  async function showLevel(index, carry = 0) {
    const token = ++generation;
    state = 'loading'; updateWorldButtons(); clearInterval(scheduler); stopVoices();
    await Promise.all([assets[index].sprite.ready, assets[index].background.ready]);
    if (token !== generation) return;
    configureLevel(index); bankedScore = carry; sprite = assets[index].sprite.image; spriteReady = true;
    score = 0; combo = 0; maxCombo = 0; notes = []; particles = []; rings = []; danceSparks.length = 0;
    stats = { perfect: 0, good: 0, near: 0, miss: 0 }; reaction = 0;
    $('intro').hidden = false; $('results').hidden = true; $('pauseOverlay').hidden = true;
    $('countdown').innerHTML = ''; $('judgment').classList.remove('show');
    $('pause').disabled = true; $('offset').disabled = false; $('spriteStatus').hidden = true;
    state = 'ready'; updateLevelUI();
  }
  async function selectWorld(index) {
    if (settingsLocked() || (index === 1 && !toysUnlocked)) return;
    try { await showLevel(index, 0); }
    catch (error) { state = 'ready'; $('spriteStatus').hidden = false; $('spriteStatus').textContent = error.message; updateWorldButtons(); }
  }
  async function travel() {
    if (levelIndex !== 0 || state !== 'results' || score < GOAL) return;
    const carry = bankedScore + score;
    state = 'transition'; updateWorldButtons(); $('nextStage').disabled = true;
    $('travelOverlay').hidden = false; $('retryTravel').hidden = true;
    $('travelSummary').textContent = `${carry.toLocaleString('pt-BR')} pontos viajam com você.`;
    $('travelStatus').textContent = 'Abrindo o portal…';
    try {
      if (audio && audio.state === 'running') {
        [72,76,79,84,88].forEach((n, i) => tone(n, audio.currentTime + i * .09, .5, .055, 'sine'));
      }
      await Promise.all([assets[1].sprite.ready, assets[1].background.ready,
        new Promise(resolve => setTimeout(resolve, reducedMotion ? 150 : 2200))]);
      await showLevel(1, carry);
      $('travelOverlay').hidden = true;
      $('announcer').textContent = 'Bem-vindo a Brinquedolândia. Seus pontos foram preservados. Clique em Vamos tocar para ouvir a nova música.';
      $('start').focus({ preventScroll: true });
    } catch (error) {
      state = 'results'; $('nextStage').disabled = false; updateWorldButtons();
      $('travelStatus').textContent = error.message; $('retryTravel').hidden = false;
    }
    $('nextStage').disabled = false;
  }
  function setSoft() {
    document.body.classList.toggle('soft-effects', soft);
    $('effects').setAttribute('aria-pressed', String(soft));
    $('effects').title = soft ? 'Ativar efeitos completos' : 'Reduzir os efeitos visuais';
  }
  setSoft();
  updateLevelUI();
  function clock() { return audio ? audio.currentTime - epoch : -4 * BEAT; }
  // Positive offset accepts the command later; the displayed note and judgment
  // share this clock so the visual alignment remains the target.
  function chartTime() { return clock() - offset / 1000; }
  function resize() {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = box.width; height = box.height;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(resize).observe(canvas);
  function resizeDancer() {
    const box = dancer.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    dancerWidth = Math.max(1, box.width); dancerHeight = Math.max(1, box.height);
    dancer.width = Math.round(dancerWidth * dpr); dancer.height = Math.round(dancerHeight * dpr);
    danceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(resizeDancer).observe(dancer);
  function drawDancer(dt, isSongRunning) {
    danceCtx.clearRect(0, 0, dancerWidth, dancerHeight);
    if (!spriteReady) return;
    if (state !== 'paused') {
      danceTime = isSongRunning ? clock() : danceTime + dt;
      reaction = Math.max(0, reaction - dt);
    }
    const scoredLevel = score >= GOAL * .7 ? 2 : score >= GOAL * .25 ? 1 : 0;
    danceLevel = Math.max(scoredLevel, combo >= 8 ? 2 : combo >= 4 ? 1 : 0);
    const phase = danceTime / BEAT;
    const cycle = ((Math.floor(phase * 2) % 16) + 16) % 16;
    danceFrame = reducedMotion ? 0 : GROOVES[danceLevel][cycle];
    if (!reducedMotion && reaction > .18 && ['playing', 'paused'].includes(state)) {
      if (reactionKind === 'perfect' || reactionKind === 'good') danceFrame = [1, 4, 6, 3][reactionLane];
      else if (reactionKind === 'near') danceFrame = 7;
    }
    const [sx, sy, sw, sh] = FRAMES[danceFrame];
    const scale = Math.min(dancerWidth * .92 / 440, dancerHeight * .95 / 552);
    const motion = soft ? .35 : 1;
    const sway = Math.sin(phase * Math.PI), spring = Math.abs(Math.sin(phase * Math.PI * 2));
    const power = (1 + danceLevel * .38) * motion;
    const hop = reducedMotion ? 0 : spring * (4 + danceLevel * 3) * scale * motion;
    const center = dancerWidth * .52 + (reducedMotion ? 0 : sway * 12 * scale * power);
    const floor = dancerWidth < 180 ? dancerHeight * .59 + 220 * scale : dancerHeight * .965;
    const reactionPower = reaction > 0 ? Math.sin(Math.min(1, reaction / .42) * Math.PI) : 0;
    const lift = reactionKind === 'perfect' ? reactionPower * 12 * scale * motion : 0;
    // A floor contact shadow is drawn separately; the sprite background stays empty.
    danceCtx.save();
    danceCtx.fillStyle = '#34114b35'; danceCtx.beginPath();
    danceCtx.ellipse(dancerWidth * .52, floor - 3, 114 * scale, 12 * scale, 0, 0, Math.PI * 2); danceCtx.fill();
    danceCtx.restore();
    const glowY = floor - 220 * scale;
    const beatGlow = reducedMotion ? .2 : .4 + spring * .25;
    const aura = danceCtx.createRadialGradient(center, glowY, 12 * scale, center, glowY, 225 * scale);
    aura.addColorStop(0, level.accent + (soft ? '12' : '2b')); aura.addColorStop(1, level.accent + '00');
    danceCtx.fillStyle = aura; danceCtx.fillRect(center - 240 * scale, glowY - 240 * scale, 480 * scale, 480 * scale);
    if (!soft && !reducedMotion) {
      danceCtx.save(); danceCtx.shadowBlur = 13; danceCtx.lineWidth = 2 * scale;
      for (let arc = 0; arc < 3; arc++) {
        danceCtx.strokeStyle = COLORS[(arc + danceLevel) % 4] + 'a0';
        danceCtx.shadowColor = COLORS[(arc + danceLevel) % 4];
        danceCtx.beginPath();
        danceCtx.ellipse(center, floor - (22 + arc * 5) * scale, (130 + arc * 15 + spring * 8) * scale,
          (15 + arc * 5) * scale, -.12, visualTime * .5 + arc, visualTime * .5 + arc + Math.PI * 1.25);
        danceCtx.stroke();
      }
      danceCtx.restore();
    }
    danceCtx.save();
    if (!soft && reaction > 0 && reactionKind !== 'miss') {
      danceCtx.shadowColor = JCOLORS[reactionKind]; danceCtx.shadowBlur = 12 * reactionPower;
    }
    // Draw each transparent pose once to avoid alpha seams. Authored arm/leg
    // changes provide the dance, with a continuous foot-pivot sway between poses.
    danceCtx.translate(center, floor - hop - lift);
    danceCtx.rotate(reducedMotion ? 0 : sway * .018 * power);
    danceCtx.drawImage(sprite, sx, sy, sw, sh, -sw * scale / 2, -sh * scale, sw * scale, sh * scale);
    danceCtx.restore();
    if (reaction > 0 && reactionKind !== 'miss' && !soft && !reducedMotion) {
      const progress = 1 - reaction / .42, radius = (25 + progress * 120) * scale;
      danceCtx.save(); danceCtx.globalAlpha = (1 - progress) * .8;
      danceCtx.strokeStyle = COLORS[reactionLane]; danceCtx.lineWidth = (4 - progress * 3) * scale;
      danceCtx.shadowColor = COLORS[reactionLane]; danceCtx.shadowBlur = 20;
      danceCtx.beginPath(); danceCtx.arc(center - 40 * scale, floor - 240 * scale, radius, 0, Math.PI * 2); danceCtx.stroke();
      danceCtx.restore();
    }
    if (state !== 'paused') {
      for (const spark of danceSparks) { spark.age += dt; spark.x += spark.vx * dt; spark.y += spark.vy * dt; spark.vy += dt * 70; }
    }
    for (const spark of danceSparks) {
      danceCtx.globalAlpha = Math.max(0, 1 - spark.age / spark.life);
      danceCtx.fillStyle = spark.color; danceCtx.font = `${spark.size}px Segoe UI, Arial`;
      danceCtx.fillText(spark.symbol, center + spark.x * scale, floor - 240 * scale + spark.y * scale);
    }
    danceCtx.globalAlpha = 1;
    for (let i = danceSparks.length - 1; i >= 0; i--) if (danceSparks[i].age >= danceSparks[i].life) danceSparks.splice(i, 1);
    if (!soft && !reducedMotion) {
      // Low-intensity musical sparkles continue during idle and gameplay.
      for (let i = 0; i < 9; i++) {
        const p = ((danceTime * .24 + i / 9) % 1 + 1) % 1;
        const x = center + Math.sin(i * 2.4 + p * 2) * (170 + i * 9) * scale;
        const y = floor - (50 + p * 420) * scale;
        danceCtx.globalAlpha = Math.sin(p * Math.PI) * beatGlow;
        danceCtx.fillStyle = COLORS[i % 4];
        danceCtx.font = `${(16 + i % 3 * 5) * scale}px Segoe UI, Arial`;
        danceCtx.fillText(i % 3 ? level.ornament : '♫', x, y);
      }
      danceCtx.globalAlpha = 1;
    }
  }
  const hz = midi => 440 * 2 ** ((midi - 69) / 12);
  function tone(midi, when, duration, level = .09, type = 'triangle', destination = master) {
    const osc = audio.createOscillator(), gain = audio.createGain();
    osc.type = type; osc.frequency.value = hz(midi);
    gain.gain.setValueAtTime(.0001, when);
    gain.gain.exponentialRampToValueAtTime(level, when + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, when + duration);
    osc.connect(gain); gain.connect(destination); osc.start(when); osc.stop(when + duration + .015);
    osc.onended = () => { voices.delete(osc); osc.disconnect(); gain.disconnect(); };
    voices.add(osc);
  }
  function kick(when) {
    const osc = audio.createOscillator(), gain = audio.createGain();
    osc.frequency.setValueAtTime(145, when);
    osc.frequency.exponentialRampToValueAtTime(45, when + .17);
    gain.gain.setValueAtTime(.43, when);
    gain.gain.exponentialRampToValueAtTime(.0001, when + .26);
    osc.connect(gain); gain.connect(master); osc.start(when); osc.stop(when + .27);
    osc.onended = () => { voices.delete(osc); osc.disconnect(); gain.disconnect(); };
    voices.add(osc);
  }
  function percussion(when, snare = false) {
    const source = audio.createBufferSource(), filter = audio.createBiquadFilter(), gain = audio.createGain();
    source.buffer = noise;
    filter.type = 'highpass'; filter.frequency.value = snare ? 1300 : 7500;
    gain.gain.setValueAtTime(snare ? .16 : .045, when);
    gain.gain.exponentialRampToValueAtTime(.0001, when + (snare ? .14 : .055));
    source.connect(filter); filter.connect(gain); gain.connect(master);
    source.start(when); source.stop(when + (snare ? .15 : .06));
    source.onended = () => { voices.delete(source); source.disconnect(); filter.disconnect(); gain.disconnect(); };
    voices.add(source);
  }
  function scheduleMusic() {
    if (!audio || !['countdown', 'playing'].includes(state)) return;
    const now = audio.currentTime;
    while (step < SONG_BEATS * 2 && epoch + step * BEAT / 2 < now + .18) {
      const when = epoch + step * BEAT / 2;
      const beat = step / 2;
      if (when >= now) {
        if (beat < 0) {
          if (step % 2 === 0) tone(beat === -1 ? 84 : 79, when, .08, .08, 'sine');
        } else {
          const bar = Math.floor(beat / 4), chord = Math.floor(bar / 2) % 4;
          if (!levelIndex || step % 2) percussion(when);
          if (step % 2 === 0) {
            const b = Math.floor(beat);
            if (b % 2 === 0) kick(when);
            else if (levelIndex) {
              // Short wood-blocks and a tiny rattle make a toy marching rhythm.
              tone(b % 4 === 1 ? 88 : 83, when, .055, .095, 'triangle');
              percussion(when + .025);
            } else percussion(when, true);
            tone(BASS[chord] + (b % 4 === 2 ? 12 : 0), when, levelIndex ? .20 : .38, levelIndex ? .11 : .19, levelIndex ? 'triangle' : 'sine');
            const melody = MELODY[b % MELODY.length];
            if (levelIndex) {
              // Music-box attack with bell overtones, distinct from candy's soft lead.
              tone(melody, when, .34, .12, 'sine');
              tone(melody + 12, when, .16, .036, 'sine');
              tone(melody + 19, when, .07, .014, 'sine');
            } else {
              tone(melody, when, .28, .095, 'triangle');
              tone(melody + 12, when, .17, .021, 'sine');
            }
            if (b % 4 === 0) {
              const root = BASS[chord] + 12;
              [root, root + (chord === level.minorChord ? 3 : 4), root + 7].forEach(n => tone(n, when, levelIndex ? .42 : 1.5, .025, 'triangle'));
            }
            // A bell accents every playable note at exactly its chart timestamp.
            const note = CHART.find(n => n.beat === beat);
            if (note) tone((levelIndex ? [86,81,90,88] : [84,79,88,86])[note.lane], when, .14, .052, 'sine');
          } else if (beat >= 16) {
            tone(MELODY[Math.floor(beat) % MELODY.length] + (levelIndex ? 0 : 12), when, .13, levelIndex ? .043 : .023, levelIndex ? 'triangle' : 'sine');
          }
        }
      }
      step++;
    }
  }
  async function prepareAudio() {
    if (!audio || audio.state === 'closed') {
      audio = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });
      master = audio.createGain();
      compressor = audio.createDynamicsCompressor();
      compressor.threshold.value = -14; compressor.knee.value = 15; compressor.ratio.value = 4;
      analyser = audio.createAnalyser(); analyser.fftSize = 256;
      master.connect(compressor); compressor.connect(analyser); analyser.connect(audio.destination);
      noise = audio.createBuffer(1, Math.ceil(audio.sampleRate * .2), audio.sampleRate);
      const data = noise.getChannelData(0);
      // Fixed seed keeps the percussion identical between attempts.
      let seed = 39271;
      for (let i = 0; i < data.length; i++) { seed = (seed * 16807) % 2147483647; data[i] = seed / 1073741823.5 - 1; }
    }
    await audio.resume();
    if (audio.state !== 'running') throw new Error('O navegador ainda não liberou o som. Clique em Vamos tocar novamente.');
    master.gain.setValueAtTime(Number($('volume').value) / 100 * .72, audio.currentTime);
  }
  function stopVoices() {
    for (const voice of voices) { try { voice.stop(); } catch {} }
    voices.clear();
  }
  function updateScore() {
    $('score').textContent = String(bankedScore + score).padStart(5, '0');
    $('combo').textContent = combo;
    const energy = Math.min(100, Math.round(score / GOAL * 100));
    $('energyValue').textContent = `${energy}%`; $('energyFill').style.width = `${energy}%`;
    $('energyHint').textContent = energy >= 100 ? (levelIndex ? 'Show carregado! Continue tocando.' : 'Portal carregado! Conclua a música.') : `Nesta fase: ${score.toLocaleString('pt-BR')} / ${GOAL.toLocaleString('pt-BR')} pontos`;
    document.body.classList.toggle('portal-charged', energy >= 100);
  }
  async function start() {
    if (starting || ['transition', 'loading'].includes(state)) return;
    starting = true; $('start').disabled = true; $('audioError').hidden = true;
    const token = ++generation;
    clearInterval(scheduler); stopVoices();
    try {
      await Promise.all([assets[levelIndex].sprite.ready, assets[levelIndex].background.ready]);
      await prepareAudio();
      if (token !== generation) return;
      score = 0; combo = 0; maxCombo = 0;
      stats = { perfect: 0, good: 0, near: 0, miss: 0 };
      notes = CHART.map((n, i) => ({ ...n, id: i, result: null }));
      particles = []; rings = []; flashes.fill(0); pressed.fill(false); judgmentUntil = 0;
      danceSparks.length = 0; reaction = 0;
      $('judgment').classList.remove('show');
      $('intro').hidden = true; $('pauseOverlay').hidden = true; $('results').hidden = true;
      $('pause').disabled = false; $('pause').textContent = 'Ⅱ'; $('pause').setAttribute('aria-label', 'Pausar música');
      $('offset').disabled = true;
      state = 'countdown'; epoch = audio.currentTime + .15 + 4 * BEAT;
      updateWorldButtons();
      step = -8; lastCount = null;
      updateScore(); $('pixelMessage').textContent = 'Prepare as setas. Vamos nessa!';
      $('announcer').textContent = 'Prepare-se. A música vai começar.';
      scheduleMusic(); scheduler = setInterval(scheduleMusic, 25);
    } catch (error) {
      state = 'ready'; $('intro').hidden = false;
      $('pauseOverlay').hidden = true; $('results').hidden = true;
      $('audioError').textContent = error.message || 'Não foi possível iniciar o áudio. Tente novamente.';
      $('audioError').hidden = false; $('pause').disabled = true; $('offset').disabled = false;
      updateWorldButtons();
    } finally { starting = false; $('start').disabled = false; }
  }
  async function pause() {
    if (!['playing', 'countdown'].includes(state)) return;
    previousState = state; state = 'paused';
    clearInterval(scheduler); pressed.fill(false);
    $('pauseOverlay').hidden = false; $('pause').textContent = '▶';
    $('pause').setAttribute('aria-label', 'Continuar música');
    await audio.suspend();
    $('resume').focus({ preventScroll: true });
    $('announcer').textContent = 'Jogo pausado.';
  }
  async function resume() {
    if (state !== 'paused' || starting) return;
    starting = true;
    try {
      await audio.resume();
      state = previousState; $('pauseOverlay').hidden = true;
      $('pause').textContent = 'Ⅱ'; $('pause').setAttribute('aria-label', 'Pausar música');
      scheduleMusic(); scheduler = setInterval(scheduleMusic, 25);
      $('announcer').textContent = 'Vamos continuar!';
    } catch { $('announcer').textContent = 'Clique em Continuar para liberar o som.'; }
    finally { starting = false; }
  }
  function spawn(lane, kind) {
    const x = laneX(lane), y = targetY();
    for (let i = 0; i < (soft ? 4 : kind === 'perfect' ? 42 : kind === 'miss' ? 8 : 24); i++) {
      const angle = Math.random() * Math.PI * 2, speed = 40 + Math.random() * 230;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 65,
        life: .45 + Math.random() * .6, age: 0, color: kind === 'miss' ? '#b9a6ce' : i % 5 === 0 ? '#fff5cf' : COLORS[(lane + i % 3) % 4],
        size: 2 + Math.random() * 6, star: i % 3 === 0, angle, spin: Math.random() * 5 - 2.5 });
    }
    if (kind !== 'miss') rings.push({ x, y, age: 0, color: COLORS[lane], life: .6, perfect: kind === 'perfect' });
    if (particles.length > 240) particles.splice(0, particles.length - 240);
  }
  function judge(note, kind) {
    if (note.result) return;
    note.result = kind; stats[kind]++; score += POINTS[kind];
    combo = kind === 'perfect' || kind === 'good' ? combo + 1 : 0;
    maxCombo = Math.max(maxCombo, combo);
    reaction = .42; reactionKind = kind; reactionLane = note.lane;
    if (kind !== 'miss' && !reducedMotion) for (let i = 0; i < (soft ? 2 : kind === 'perfect' ? 24 : 14); i++) {
      danceSparks.push({ x: -100 + Math.random() * 170, y: -50 + Math.random() * 60,
        vx: (Math.random() - .5) * 220, vy: -70 - Math.random() * 130,
        age: 0, life: .8 + Math.random() * .4, color: COLORS[note.lane],
        size: 14 + Math.random() * 13, symbol: i % 3 ? level.ornament : '♪' });
    }
    if (danceSparks.length > 90) danceSparks.splice(0, danceSparks.length - 90);
    updateScore(); spawn(note.lane, kind);
    flashes[note.lane] = kind === 'miss' ? .08 : .35;
    const label = $('judgment');
    label.style.color = JCOLORS[kind];
    label.innerHTML = `${LABELS[kind]}<small>${POINTS[kind] ? '+' + POINTS[kind] + ' PONTOS' : 'CONTINUE TOCANDO'}</small>`;
    label.classList.remove('show'); void label.offsetWidth; label.classList.add('show');
    judgmentUntil = performance.now() + 650;
    const now = performance.now();
    if (now - lastSpeech > 900 || combo % 8 === 0) {
      const messages = { perfect: combo >= 8 ? `Combo ${combo}! A gente está brilhando!` : 'Isso! Senti essa batida!', good: 'Muito bem! Vamos juntos!', near: 'Quase! Olhe para o alvo.', miss: 'Tudo bem! A próxima é nossa.' };
      $('pixelMessage').textContent = messages[kind]; lastSpeech = now;
    }
  }
  function input(lane) {
    flashes[lane] = .16;
    if (state !== 'playing') return;
    const t = chartTime();
    const candidates = notes.filter(n => !n.result && n.lane === lane && Math.abs(n.time - t) <= .24);
    candidates.sort((a, b) => Math.abs(a.time - t) - Math.abs(b.time - t));
    if (candidates.length) {
      const note = candidates[0], delta = Math.abs(note.time - t);
      judge(note, delta <= .075 ? 'perfect' : delta <= .15 ? 'good' : 'near');
    } else {
      // Wrong direction consumes a note only during its actual hit window.
      // Extra presses between notes do not create additional score penalties.
      const wrong = notes.filter(n => !n.result && Math.abs(n.time - t) <= .24)
        .sort((a, b) => Math.abs(a.time - t) - Math.abs(b.time - t))[0];
      if (wrong) judge(wrong, 'miss');
    }
  }
  function finish() {
    if (state === 'results') return;
    state = 'results'; clearInterval(scheduler); stopVoices();
    $('countdown').innerHTML = ''; $('pause').disabled = true; $('offset').disabled = false;
    $('songFill').style.width = '100%';
    document.querySelector('.song-progress').setAttribute('aria-valuenow', '100');
    $('time').textContent = `${formatTime(Math.ceil(DURATION))} / ${formatTime(Math.ceil(DURATION))}`;
    $('results').hidden = false;
    $('resultScore').innerHTML = `${score.toLocaleString('pt-BR')} <small>pontos</small>`;
    $('resultPerfect').textContent = stats.perfect; $('resultGood').textContent = stats.good;
    $('resultNear').textContent = stats.near; $('resultMiss').textContent = stats.miss;
    const accuracy = Math.round(score / MAX_POINTS * 100);
    const stars = accuracy >= 85 ? 3 : accuracy >= 55 ? 2 : accuracy > 0 ? 1 : 0;
    $('stars').textContent = '✦'.repeat(stars) + '✧'.repeat(3 - stars);
    $('stars').setAttribute('aria-label', `${stars} de 3 estrelas`);
    const charged = score >= GOAL;
    if (charged) $('energyHint').textContent = levelIndex ? 'Show concluído! Veja o seu resultado.' : 'Portal aberto para Brinquedolândia!';
    if (charged && levelIndex === 0) { toysUnlocked = true; save('robo-ritmado-toys-unlocked', 'true'); }
    $('resultPill').textContent = levelIndex ? '✦ SEGUNDA VIAGEM CONCLUÍDA' : '✦ PRIMEIRA VIAGEM CONCLUÍDA';
    $('resultTitle').textContent = charged ? (levelIndex ? 'Que grande show!' : 'O portal despertou!') : score ? 'Você fez música!' : 'Vamos tentar juntos?';
    $('resultMessage').textContent = charged ? (levelIndex ? 'Dois mundos, uma grande aventura com Pixel!' : 'Brinquedolândia espera por você!') : `Meta: ${GOAL.toLocaleString('pt-BR')} pontos. Vamos ensaiar mais uma vez?`;
    $('resultDetail').textContent = `Combo: ${maxCombo} · Precisão: ${accuracy}% · Total: ${(bankedScore + score).toLocaleString('pt-BR')}`;
    $('nextStage').hidden = !(charged && levelIndex === 0);
    $('playAgain').classList.toggle('replay-secondary', charged && levelIndex === 0);
    $('resultHint').textContent = levelIndex ? `Você trouxe ${bankedScore.toLocaleString('pt-BR')} pontos do mundo anterior.` : charged ? 'Seus pontos seguem com você pelo portal.' : `Faltaram ${Math.max(0, GOAL - score).toLocaleString('pt-BR')} pontos para abrir o portal.`;
    $('pixelMessage').textContent = charged ? 'Conseguimos! Olha o nosso portal!' : 'Adorei tocar com você. Mais uma?';
    if (bankedScore + score > best) { best = bankedScore + score; save('robo-ritmado-best-v04', best); $('best').textContent = String(best).padStart(5, '0'); }
    $('announcer').textContent = `Viagem concluída! ${score} pontos e ${stars} estrelas. Maior combo: ${maxCombo}.`;
    updateWorldButtons();
    (charged && levelIndex === 0 ? $('nextStage') : $('playAgain')).focus({ preventScroll: true });
  }
  function laneX(lane) { return width * .16 + lane * width * .2266667; }
  function targetY() { return height - 67; }
  function starPath(context, x, y, radius, rotation = 0) {
    context.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = rotation + i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? radius * .4 : radius;
      if (i) context.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      else context.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    context.closePath();
  }
  function arrow(x, y, lane, size, color, filled = true, glow = 0) {
    ctx.save(); ctx.translate(x, y);
    ctx.rotate([Math.PI, Math.PI / 2, -Math.PI / 2, 0][lane]);
    ctx.beginPath();
    const path = [[-.44, -.23], [.03, -.23], [.03, -.46], [.49, 0], [.03, .46], [.03, .23], [-.44, .23]];
    path.forEach(([px, py], i) => i ? ctx.lineTo(px * size, py * size) : ctx.moveTo(px * size, py * size));
    ctx.closePath(); ctx.lineJoin = 'round'; ctx.lineWidth = filled ? 2 : 2.5;
    ctx.shadowColor = color; ctx.shadowBlur = glow;
    const fill = ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
    fill.addColorStop(0, '#fff7f6'); fill.addColorStop(.35, color); fill.addColorStop(1, color + 'aa');
    ctx.fillStyle = filled ? fill : '#19152ed9'; ctx.fill(); ctx.strokeStyle = filled ? '#fff3ffdd' : color; ctx.stroke();
    if (filled) {
      ctx.save(); ctx.clip(); ctx.shadowBlur = 0;
      if (levelIndex) {
        ctx.fillStyle = '#ffffffb0'; starPath(ctx, 0, 0, size * .105, visualTime * .7); ctx.fill();
        ctx.fillStyle = '#ffffff75';
        for (const dx of [-.3, -.15]) { ctx.beginPath(); ctx.arc(dx * size, 0, size * .035, 0, Math.PI * 2); ctx.fill(); }
      } else {
        ctx.strokeStyle = '#ffffff85'; ctx.lineWidth = 3;
        const shift = (visualTime * 12) % 15;
        for (let sx = -size; sx < size; sx += 15) { ctx.beginPath(); ctx.moveTo(sx + shift, -size); ctx.lineTo(sx + size + shift, size); ctx.stroke(); }
      }
      ctx.restore();
      ctx.shadowBlur = 0; ctx.globalAlpha = .45; ctx.translate(-size * .035, -size * .045);
      ctx.scale(.72, .7); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      // Canvas paths are not restored by save/restore: rebuild the arrow after
      // drawing the clipped stripes/star so decorative paths cannot leak out.
      ctx.beginPath();
      path.forEach(([px, py], i) => i ? ctx.lineTo(px * size, py * size) : ctx.moveTo(px * size, py * size));
      ctx.closePath(); ctx.stroke();
    }
    ctx.restore();
  }
  function draw(timestamp) {
    requestAnimationFrame(draw);
    const dt = Math.min(.05, (timestamp - lastFrame) / 1000); lastFrame = timestamp;
    if (state !== 'paused') visualTime += dt;
    const active = state === 'playing' || state === 'countdown';
    let t = active || state === 'paused' || state === 'results' ? chartTime() : -4 * BEAT;
    const musicT = audio && state !== 'ready' ? clock() : -4 * BEAT;
    const pulse = active && !soft ? Math.max(0, 1 - ((Math.max(0, musicT) / BEAT) % 1) * 3) : .15;
    if (state === 'countdown') {
      const count = Math.ceil(-musicT / BEAT);
      if (count !== lastCount) {
        lastCount = count;
        $('countdown').innerHTML = count > 0 ? `${Math.min(4, count)}<small>PREPARE AS SETAS</small>` : 'Vai!';
      }
      if (musicT >= 0) { state = 'playing'; $('pixelMessage').textContent = 'Ouça a batida. As setas estão chegando!'; }
    }
    if (state === 'playing') {
      if (musicT > BEAT * .8) $('countdown').innerHTML = '';
      for (const note of notes) if (!note.result && t > note.time + .24) judge(note, 'miss');
      if (musicT >= DURATION + Math.max(0, offset / 1000)) finish();
    }
    if (active && state !== 'results') {
      const progress = Math.min(1, Math.max(0, musicT / DURATION));
      $('songFill').style.width = `${progress * 100}%`;
      document.querySelector('.song-progress').setAttribute('aria-valuenow', Math.round(progress * 100));
      $('time').textContent = `${formatTime(Math.min(DURATION, Math.max(0, musicT)))} / ${formatTime(Math.ceil(DURATION))}`;
    }
    if (judgmentUntil && timestamp > judgmentUntil) { $('judgment').classList.remove('show'); judgmentUntil = 0; }
    drawDancer(dt, active);
    ctx.clearRect(0, 0, width, height);
    const target = targetY(), laneWidth = width * .2266667, size = Math.min(56, laneWidth * .64);
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, levelIndex ? '#10265fe3' : '#31143fe0'); bg.addColorStop(1, levelIndex ? '#25224bc9' : '#351535cb'); ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
    // Lanes carry a subtle stable color so the hit line remains readable.
    for (let lane = 0; lane < 4; lane++) {
      const x = laneX(lane);
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, COLORS[lane] + '0b'); grad.addColorStop(.6, COLORS[lane] + '1d'); grad.addColorStop(1, COLORS[lane] + '38');
      ctx.fillStyle = grad; ctx.fillRect(x - laneWidth / 2 + 1, 0, laneWidth - 2, height);
      if (lane < 3) { ctx.strokeStyle = '#ffffff0c'; ctx.beginPath(); ctx.moveTo(x + laneWidth / 2, 0); ctx.lineTo(x + laneWidth / 2, height); ctx.stroke(); }
      if (flashes[lane] > 0) {
        if (state !== 'paused') flashes[lane] = Math.max(0, flashes[lane] - dt);
        ctx.fillStyle = COLORS[lane] + Math.floor(Math.min(1, flashes[lane] * 2) * 50).toString(16).padStart(2, '0');
        ctx.fillRect(x - laneWidth / 2, target - 65, laneWidth, 126);
      }
    }
    // Jewel lights and themed ornaments along the track edges.
    for (let side = 0; side < 2; side++) {
      const x = side ? width - 7 : 7;
      for (let i = 0; i < 13; i++) {
        const y = 17 + i * (height - 34) / 12;
        ctx.save(); ctx.fillStyle = COLORS[(i + side) % 4];
        ctx.globalAlpha = soft ? .55 : .5 + Math.sin(visualTime * 3 + i * .6) * .22;
        ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = soft ? 0 : 9;
        if (levelIndex) { starPath(ctx, x, y, 3.6, i * .2); ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(x, y, 2.8, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
    }
    if (!soft) for (let i = 0; i < 24; i++) {
      const y = ((i * 67 + visualTime * 15) % height), x = (i * 137.5 + 29) % width;
      ctx.fillStyle = COLORS[i % 4] + '55';
      if (i % 4 === 0) { starPath(ctx, x, y, 3.2, visualTime); ctx.fill(); } else ctx.fillRect(x, y, 2, 2);
    }
    const travel = 2.3, speed = (target - 15) / travel;
    if (settingsLocked() || state === 'results') {
      const first = Math.floor(t / BEAT);
      for (let b = first; b < first + 5; b++) {
        const y = target - (b * BEAT - t) * speed;
        if (y < 0 || y > height) continue;
        ctx.strokeStyle = b % 4 === 0 ? '#e3b5ff18' : '#ffffff08';
        ctx.beginPath(); ctx.moveTo(13, y); ctx.lineTo(width - 13, y); ctx.stroke();
      }
    }
    // The approach line and judging use exactly the same audio clock.
    ctx.shadowColor = '#ffb8e0'; ctx.shadowBlur = soft ? 0 : 8 + pulse * 8;
    ctx.strokeStyle = '#ffc3e565'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(13, target); ctx.lineTo(width - 13, target); ctx.stroke(); ctx.shadowBlur = 0;
    for (let lane = 0; lane < 4; lane++) {
      if (!soft) {
        ctx.save(); ctx.globalAlpha = .28 + pulse * .25; ctx.strokeStyle = COLORS[lane]; ctx.lineWidth = 1;
        ctx.shadowColor = COLORS[lane]; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(laneX(lane), target, size * (.65 + pulse * .08), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      }
      arrow(laneX(lane), target, lane, size + (flashes[lane] > .1 ? 4 : 0), COLORS[lane], false, soft ? 0 : 7);
      ctx.font = '9px Segoe UI, Arial'; ctx.fillStyle = '#c2b0d3'; ctx.textAlign = 'center';
      ctx.fillText(DIRECTIONS[lane].toUpperCase(), laneX(lane), target + 44);
    }
    for (const note of notes) {
      if (note.result) continue;
      const y = target - (note.time - t) * speed;
      if (y < -70 || y > height + 50) continue;
      const approach = Math.max(0, Math.min(1, (target - y) / target));
      const x = laneX(note.lane) + (soft ? 0 : Math.sin(visualTime * 4 + note.id) * 3 * approach), color = COLORS[note.lane];
      const trail = ctx.createLinearGradient(0, y - 95, 0, y); trail.addColorStop(0, color + '00'); trail.addColorStop(1, color + '75');
      ctx.fillStyle = trail; ctx.fillRect(x - 5, y - 95, 10, 82);
      if (!soft) {
        const halo = ctx.createRadialGradient(x, y, 3, x, y, size * .9);
        halo.addColorStop(0, color + '55'); halo.addColorStop(1, color + '00');
        ctx.fillStyle = halo; ctx.fillRect(x - size, y - size, size * 2, size * 2);
        for (let i = 0; i < 3; i++) {
          const a = visualTime * 2.5 + i * Math.PI * 2 / 3 + note.id, r = size * .62;
          ctx.fillStyle = i === 0 ? '#fff9dd' : color;
          starPath(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, 2.4 + pulse, a); ctx.fill();
        }
      }
      arrow(x, y, note.lane, size * (.88 + (soft ? 0 : Math.sin(visualTime * 6 + note.id) * .035 * approach)), color, true, soft ? 0 : 19);
    }
    for (const ring of rings) {
      if (state !== 'paused') ring.age += dt;
      const p = ring.age / ring.life, radius = 12 + p * (ring.perfect ? 92 : 65);
      ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p); ctx.strokeStyle = ring.color;
      ctx.shadowColor = ring.color; ctx.shadowBlur = soft ? 0 : 16; ctx.lineWidth = 4 * (1 - p) + .5;
      ctx.beginPath(); ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2); ctx.stroke();
      if (!soft) for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 + p * .7;
        ctx.beginPath(); ctx.moveTo(ring.x + Math.cos(a) * radius * .75, ring.y + Math.sin(a) * radius * .75);
        ctx.lineTo(ring.x + Math.cos(a) * radius * 1.3, ring.y + Math.sin(a) * radius * 1.3); ctx.stroke();
      }
      ctx.restore();
    }
    rings = rings.filter(r => r.age < r.life);
    for (const p of particles) {
      if (state !== 'paused') { p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 170 * dt; }
      ctx.globalAlpha = Math.max(0, 1 - p.age / p.life); ctx.fillStyle = p.color;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle + p.age * p.spin);
      if (p.star && !soft) { ctx.shadowColor = p.color; ctx.shadowBlur = 8; starPath(ctx, 0, 0, p.size); ctx.fill(); }
      else ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
    ctx.globalAlpha = 1; particles = particles.filter(p => p.age < p.life);
    if (!active && state !== 'paused') {
      // A gentle idle meter keeps the world alive without simulating gameplay.
      const mx = width - 30;
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = '#dca4ff38'; const h = soft ? 8 : 5 + (Math.sin(timestamp / 370 + i) + 1) * 6;
        ctx.fillRect(mx + i * 4, 15 - h / 2, 2, h);
      }
    }
  }
  $('start').addEventListener('click', start);
  $('nextStage').addEventListener('click', travel);
  $('retryTravel').addEventListener('click', () => {
    assets[1] = { sprite: imageAsset(LEVELS[1].sprite), background: imageAsset(LEVELS[1].background) }; travel();
  });
  $('worldCandy').addEventListener('click', () => selectWorld(0));
  $('worldToys').addEventListener('click', () => selectWorld(1));
  $('playAgain').addEventListener('click', start);
  $('restartPause').addEventListener('click', start);
  $('resume').addEventListener('click', resume);
  $('pause').addEventListener('click', () => state === 'paused' ? resume() : pause());
  $('effects').addEventListener('click', () => { soft = !soft; setSoft(); save('pixel-effects', soft ? 'soft' : 'full'); });
  $('volume').addEventListener('input', () => {
    if (audio && master) master.gain.setTargetAtTime(Number($('volume').value) / 100 * .72, audio.currentTime, .02);
  });
  $('offset').addEventListener('input', () => {
    if (settingsLocked()) return;
    offset = Number($('offset').value); $('offsetValue').textContent = `${offset > 0 ? '+' : ''}${offset} ms`; save('pixel-offset', offset);
  });
  $('fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { $('announcer').textContent = 'Use o botão de tela cheia do seu navegador.'; }
  });
  document.addEventListener('keydown', event => {
    if (event.target instanceof HTMLInputElement && !['playing', 'countdown'].includes(state)) return;
    const lane = KEYS.indexOf(event.key);
    if (lane >= 0) {
      event.preventDefault();
      if (!event.repeat && !pressed[lane]) { pressed[lane] = true; input(lane); }
    } else if (event.key === 'Escape' && !event.repeat) {
      if (state === 'paused') resume(); else pause();
    }
  });
  document.addEventListener('keyup', event => { const lane = KEYS.indexOf(event.key); if (lane >= 0) pressed[lane] = false; });
  for (const button of document.querySelectorAll('[data-lane]')) {
    button.addEventListener('pointerdown', event => {
      event.preventDefault(); const lane = Number(button.dataset.lane);
      if (!pressed[lane]) { pressed[lane] = true; input(lane); }
      button.setPointerCapture(event.pointerId);
    });
    const release = () => { pressed[Number(button.dataset.lane)] = false; };
    button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('blur', () => { pressed.fill(false); pause(); });
  window.addEventListener('pagehide', () => { clearInterval(scheduler); stopVoices(); if (audio) audio.close(); });
  // Read-only diagnostics for verifying timing, scoring, audio and pause behavior.
  // Gameplay has no autoplay or score-writing test hooks.
  Object.defineProperty(window, 'pixelDiagnostics', { value: Object.freeze({
    snapshot: () => ({ state, level: levelIndex + 1, world: level.id, bpm: BPM, song: level.song,
      duration: DURATION, sprite: level.sprite, background: level.background, musicSignature: MELODY.join(',') + '/' + BASS.join(','),
      bankedScore, totalScore: bankedScore + score, unlocked: toysUnlocked,
      effects: { trackParticles: particles.length, rings: rings.length, dancerParticles: danceSparks.length, reduced: soft },
      time: audio ? clock() : null, chartTime: audio ? chartTime() : null,
      score, combo, maxCombo, stats: { ...stats }, totalNotes: CHART.length, maxPoints: MAX_POINTS,
      goal: GOAL, offset, audioState: audio?.state || 'not-started',
      dancer: { ready: spriteReady, frame: danceFrame, level: danceLevel, time: danceTime,
        reaction: reactionKind, reactionRemaining: reaction, width: dancerWidth, height: dancerHeight },
      notes: notes.map(n => ({ lane: n.lane, time: n.time, result: n.result })) }),
    audioLevel: () => {
      if (!analyser) return 0;
      const data = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(data);
      return Math.sqrt(data.reduce((sum, v) => sum + v * v, 0) / data.length);
    }
  }), writable: false });
  resize(); resizeDancer(); requestAnimationFrame(draw);
})();
