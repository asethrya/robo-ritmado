'use strict';
// Each world owns its score chart, instruments, approved complete costume and dance.
window.RR_LEVELS=Object.freeze([
 {id:'doces',name:'Reino dos Doces',title:'Reino dos',emphasis:'Doces',subtitle:'Um passinho de açúcar. Uma aventura deliciosa!',bpm:90,beats:64,meter:4,
 song:'Doce Travessia',style:'Pop de confeitaria · sinos e marimba',instrument:'candy',mouth:[167,122,13,6,.1,'#f8e8ed','#e986b8'],tears:[[145,112,-1,15],[183,113,-2,14]],face:[166,91,56,34,.25],faceClip:[[141,80],[150,72],[172,73],[187,82],[196,94],[193,104],[181,112],[160,113],[146,104],[138,91]],background:'assets/doces-v08.png',sprite:'assets/pixel-doces-danca-v6.png',designWidth:384,designHeight:512,frames:RR_SPRITES.cells(),
 colors:['#ee80d2','#65d9ff','#c09aff','#ffcf81'],accent:'#f18bcf',ornament:'♡',track:'Ateliê de açúcar',panel:['#53336ba6','#7c426c99'],
 melody:[72,76,79,76,74,79,83,79,69,72,76,79,77,76,72,69],bass:[48,43,45,41],minorChord:2,sequence:[0,1,2,3,2,1,0,2,3,1,2,0,1,3,2,3],skipBeat:b=>(b<16&&b%2!==0)||(b>=16&&b<48&&b%8===7)},
 {id:'brinquedos',name:'Brinquedolândia',title:'Brinquedolândia',emphasis:'',subtitle:'Blocos, estrelas e um desfile pra lá de divertido!',bpm:104,beats:64,meter:4,
 song:'Desfile dos Brinquedos',style:'Marcha divertida · caixa de música e madeira',instrument:'toy',mouth:[194,111,12,6,.35,'#f3edf4','#c982cf'],tears:[[186,100,-1,13],[215,102,-2,12]],face:[200,78,46,33,.42],faceClip:[[180,64],[197,57],[215,66],[225,83],[221,96],[214,103],[196,99],[181,85]],background:'assets/brinquedos-v08.png',sprite:'assets/pixel-brinquedos-danca-v4.png',
 frames:[[4,12,390,505],[406,28,377,489],[779,0,386,517],[1170,12,366,505],[2,609,431,394],[424,532,395,478],[816,520,357,494],[1178,535,358,478]],
 colors:['#70b9ff','#ffce65','#b098ff','#fb8aab'],accent:'#85c7ff',ornament:'★',track:'Desfile das estrelas',panel:['#284c86a6','#424d8999'],
 melody:[74,78,81,86,83,81,78,76,79,83,86,83,81,79,78,74,71,74,78,81,83,81,78,74,73,76,81,85,83,81,76,73],bass:[50,55,47,45],minorChord:2,sequence:[2,0,1,3,2,1,0,3,1,2,3,0,2,3,1,0],skipBeat:b=>b===15||b===31||b===47},
 {id:'gelo',name:'Castelo Invernal',title:'Castelo',emphasis:'Invernal',subtitle:'Pés leves na neve. A valsa dos cristais vai começar!',bpm:84,beats:72,meter:3,
 song:'Valsa dos Cristais',style:'Valsa em 3 tempos · piano de gelo e cordas',instrument:'ice',mouth:[580,239,27,12,.25,'#eeeaf5','#ad83d4'],tears:[[552,217,-1,25],[620,223,-3,23]],face:[579,180,100,76,.35],faceClip:[[548,139],[583,133],[605,165],[628,192],[628,217],[611,230],[584,211],[554,198],[540,172]],background:'assets/gelo-v08.png',sprite:'assets/pixel-gelo-v08.png',designWidth:1122,designHeight:1402,frames:[[0,0,1122,1402]],
 colors:['#72def2','#adacff','#fb9fd7','#9cc9ff'],accent:'#83e4f0',ornament:'❄',track:'Salão dos cristais',panel:['#294774a3','#3e3d7599'],
 melody:[74,77,81,86,84,81,79,77,76,74,72,69,70,74,77,82,81,77,76,73,69,73,76,81],bass:[50,46,43,45],minorChord:0,sequence:[0,2,3,1,2,0,3,2,1,0,2,3],skipBeat:b=>b<18&&b%3===2},
 {id:'ceu',name:'Paraíso',title:'Paraíso',emphasis:'Celestial',subtitle:'Um abraço nas nuvens. Deixe a música levar você!',bpm:96,beats:64,meter:4,
 song:'Órbita das Nuvens',style:'Fantasia celestial · harpa e sinos aéreos',instrument:'sky',mouth:[572,215,25,11,.3,'#f3f0f5','#ce9c5c'],tears:[[541,198,-1,24],[605,204,-3,22]],face:[567,158,94,72,.35],faceClip:[[538,121],[568,113],[593,145],[610,169],[610,195],[588,202],[563,183],[537,166],[526,144]],background:'assets/ceu-v08.png',sprite:'assets/pixel-ceu-v08.png',designWidth:1122,designHeight:1402,frames:[[0,0,1122,1402]],
 colors:['#ffc9a0','#b5a2fa','#7bdced','#f7a5d6'],accent:'#ffdb9c',ornament:'✧',track:'Órbita das nuvens',panel:['#5b437da3','#5c508699'],
 melody:[76,83,88,83,80,83,87,83,73,80,85,80,76,80,83,88,78,85,90,85,81,85,88,85,75,82,87,82,78,82,85,87],bass:[52,49,54,47],minorChord:1,sequence:[0,2,1,3,2,3,0,1,3,1,2,0,2,1,3,0],skipBeat:b=>b%8===7}
]);
