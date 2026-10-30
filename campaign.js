'use strict';
// One source of truth for the ten-stage campaign. Only released levels are playable.
window.RR_CAMPAIGN=Object.freeze([
 {id:'doces',name:'Reino dos Doces',goal:2600,released:true},
 {id:'brinquedos',name:'Brinquedolândia',goal:3000,released:true},
 {id:'gelo',name:'Castelo Invernal',goal:3400,released:true},
 {id:'ceu',name:'Paraíso',goal:3800,released:true},
 {id:'deserto',name:'Deserto Escaldante',goal:4200,released:true},
 {id:'pantano',name:'Pântano Mágico',goal:4600,released:true},
 {id:'nebulosa',name:'Floresta Nebulosa',goal:5000,released:true},
 {id:'atlanta',name:'Atlanta',goal:5400,released:true},
 {id:'masmorra',name:'Masmorra Ardente',goal:5800,released:false},
 {id:'colina',name:'Colina Escarlate',goal:6200,released:false}
].map((stage,index)=>Object.freeze({...stage,number:index+1})));
