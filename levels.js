'use strict';
// Each world owns its score chart, instruments, articulated costume and dance.
window.RR_LEVELS=Object.freeze([
 {id:'doces',name:'Reino dos Doces',title:'Reino dos',emphasis:'Doces',subtitle:'Um passinho de açúcar. Uma aventura deliciosa!',bpm:90,beats:64,meter:4,
 song:'Doce Travessia',style:'Pop de confeitaria · sinos e marimba',instrument:'candy',background:'assets/doces-v07.png',sprite:'assets/pixel-doces-danca-v6.png',rig:'assets/pixel-doces-rig-v07.png',designWidth:384,designHeight:512,frames:RR_SPRITES.cells(),
 colors:['#ee80d2','#65d9ff','#c09aff','#ffcf81'],accent:'#f18bcf',ornament:'♡',track:'Ateliê de açúcar',panel:['#53336ba6','#7c426c99'],
 melody:[72,76,79,76,74,79,83,79,69,72,76,79,77,76,72,69],bass:[48,43,45,41],minorChord:2,sequence:[0,1,2,3,2,1,0,2,3,1,2,0,1,3,2,3],skipBeat:b=>(b<16&&b%2!==0)||(b>=16&&b<48&&b%8===7)},
 {id:'brinquedos',name:'Brinquedolândia',title:'Brinquedolândia',emphasis:'',subtitle:'Blocos, estrelas e um desfile pra lá de divertido!',bpm:104,beats:64,meter:4,
 song:'Desfile dos Brinquedos',style:'Marcha divertida · caixa de música e madeira',instrument:'toy',background:'assets/brinquedos-v07.png',sprite:'assets/pixel-brinquedos-danca-v4.png',rig:'assets/pixel-brinquedos-rig-v07.png',
 frames:[[4,12,390,505],[406,28,377,489],[779,0,386,517],[1170,12,366,505],[2,609,431,394],[424,532,395,478],[816,520,357,494],[1178,535,358,478]],
 colors:['#70b9ff','#ffce65','#b098ff','#fb8aab'],accent:'#85c7ff',ornament:'★',track:'Desfile das estrelas',panel:['#284c86a6','#424d8999'],
 melody:[74,78,81,86,83,81,78,76,79,83,86,83,81,79,78,74,71,74,78,81,83,81,78,74,73,76,81,85,83,81,76,73],bass:[50,55,47,45],minorChord:2,sequence:[2,0,1,3,2,1,0,3,1,2,3,0,2,3,1,0],skipBeat:b=>b===15||b===31||b===47},
 {id:'gelo',name:'Castelo Invernal',title:'Castelo',emphasis:'Invernal',subtitle:'Pés leves na neve. A valsa dos cristais vai começar!',bpm:84,beats:72,meter:3,
 song:'Valsa dos Cristais',style:'Valsa em 3 tempos · piano de gelo e cordas',instrument:'ice',background:'assets/gelo-v07.png',sprite:'assets/pixel-doces-danca-v6.png',rig:'assets/pixel-gelo-rig-v07.png',designWidth:384,designHeight:512,frames:RR_SPRITES.cells(),
 colors:['#72def2','#adacff','#fb9fd7','#9cc9ff'],accent:'#83e4f0',ornament:'❄',track:'Salão dos cristais',panel:['#294774a3','#3e3d7599'],
 melody:[74,77,81,86,84,81,79,77,76,74,72,69,70,74,77,82,81,77,76,73,69,73,76,81],bass:[50,46,43,45],minorChord:0,sequence:[0,2,3,1,2,0,3,2,1,0,2,3],skipBeat:b=>b<18&&b%3===2},
 {id:'ceu',name:'Paraíso',title:'Paraíso',emphasis:'Celestial',subtitle:'Um abraço nas nuvens. Deixe a música levar você!',bpm:96,beats:64,meter:4,
 song:'Órbita das Nuvens',style:'Fantasia celestial · harpa e sinos aéreos',instrument:'sky',background:'assets/ceu-v07.png',sprite:'assets/pixel-doces-danca-v6.png',rig:'assets/pixel-ceu-rig-v07.png',designWidth:384,designHeight:512,frames:RR_SPRITES.cells(),
 colors:['#ffc9a0','#b5a2fa','#7bdced','#f7a5d6'],accent:'#ffdb9c',ornament:'✧',track:'Órbita das nuvens',panel:['#5b437da3','#5c508699'],
 melody:[76,83,88,83,80,83,87,83,73,80,85,80,76,80,83,88,78,85,90,85,81,85,88,85,75,82,87,82,78,82,85,87],bass:[52,49,54,47],minorChord:1,sequence:[0,2,1,3,2,3,0,1,3,1,2,0,2,1,3,0],skipBeat:b=>b%8===7}
]);
