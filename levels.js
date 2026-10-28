'use strict';
// Each world owns its music, chart, costume, background and visual palette.
window.RR_LEVELS = Object.freeze([
  {
    id: 'doces', name: 'Reino dos Doces', title: 'Reino dos', emphasis: 'Doces',
    subtitle: 'Doces, cristais e uma batida que abre caminhos.', bpm: 90, beats: 64,
    song: 'Doce Travessia', style: 'Sinos de cristal · Pop suave',
    background: 'assets/reino-dos-doces.png', sprite: 'assets/pixel-doces-danca-v6.png', designWidth: 384, designHeight: 512,
    colors: ['#d2a0ff', '#73e5ff', '#8ff1ba', '#ff91d3'], accent: '#ff9fdf', ornament: '♡',
    frames: RR_SPRITES.cells(),
    melody: [72,76,79,76,74,79,83,79,69,72,76,79,77,76,72,69],
    bass: [48,43,45,41], minorChord: 2,
    sequence: [0,1,2,3,2,1,0,2,3,1,2,0,1,3,2,3],
    skipBeat: beat => (beat < 16 && beat % 2 !== 0) || (beat >= 16 && beat < 48 && beat % 8 === 7)
  },
  {
    id: 'brinquedos', name: 'Brinquedolândia', title: 'Brinquedolândia', emphasis: '',
    subtitle: 'Estrelas, blocos e um grande desfile musical.', bpm: 104, beats: 64,
    song: 'Desfile dos Brinquedos', style: 'Caixa de música · Marcha de brinquedos',
    background: 'assets/brinquedolandia.png', sprite: 'assets/pixel-brinquedos-danca-v4.png',
    colors: ['#74b7ff', '#ffda65', '#7df4ba', '#ff8999'], accent: '#ffda65', ornament: '★',
    frames: [[4,12,390,505],[406,28,377,489],[779,0,386,517],[1170,12,366,505],
      [2,609,431,394],[424,532,395,478],[816,520,357,494],[1178,535,358,478]],
    // D major, different melody and D–G–Bm–A harmony from the candy world's C major.
    melody: [74,78,81,86,83,81,78,76,79,83,86,83,81,79,78,74,
      71,74,78,81,83,81,78,74,73,76,81,85,83,81,76,73],
    bass: [50,55,47,45], minorChord: 2,
    sequence: [2,0,1,3,2,1,0,3,1,2,3,0,2,3,1,0],
    skipBeat: beat => beat === 15 || beat === 31 || beat === 47
  }
]);
