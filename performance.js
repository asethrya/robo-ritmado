(() => {
  'use strict';
  const clamp = (n,a=0,b=1) => Math.max(a,Math.min(b,n));
  const smooth = n => { n=clamp(n);return n*n*(3-2*n); };
  const TAU=Math.PI*2;
  function mixColor(a,b,t){return '#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');}
  const definitions=Object.freeze({
    doces:{style:'Pop de açúcar',name:'Doce balanço',phrases:['Balanço de açúcar','Passo de nuvem','Onda de confeitos','Final coração']},
    brinquedos:{style:'Funk dos brinquedos',name:'Desfile das estrelas',phrases:['Marca o passinho','Deslize de brinquedo','Balanço das estrelas','Desfile triunfal']},
    gelo:{style:'Ballet · valsa em 3 tempos',name:'Valsa dos cristais',phrases:['Plié suave','Passo de valsa','Arco de cristal','Reverência de neve']},
    ceu:{style:'Dança contemporânea',name:'Órbita das nuvens',phrases:['Respiração das nuvens','Onda celestial','Passo em órbita','Abraço das estrelas']}
  });
  // Every dance uses one connected, complete illustration. No ragdoll, joints,
  // separately rotating limbs or instantaneous pose changes are involved.
  function pose(id,beat,progress,amount=1){
    const grow=smooth(progress),a=amount*(.65+grow*.35),t=beat*TAU;
    let x=0,lift=0,lean=0,bend=0,step=0;
    if(id==='doces'){
      x=Math.sin(t/4)*(.019+.008*grow)*a;
      lift=(1-Math.cos(t))*.003*a;
      lean=Math.sin(t/2)*.022*a;
      bend=Math.sin(t/2-.5)*.013*a;
      step=Math.sin(t/2)*.009*a;
    }else if(id==='brinquedos'){
      x=(Math.sin(t/8)*.023+Math.sin(t/2)*.005)*a;
      lift=(1-Math.cos(t))*.004*a;
      lean=(Math.sin(t/2)*.026+Math.sin(t/8)*.008)*a;
      bend=Math.sin(t)*.008*a;step=Math.sin(t/2)*.014*a;
    }else if(id==='gelo'){
      x=Math.sin(t/6)*.028*a;
      lift=(1-Math.cos(t/3))*.006*a;
      lean=Math.sin(t/6)*.025*a;
      bend=Math.sin(t/3)*.012*a;step=Math.sin(t/3)*.006*a;
    }else{
      x=Math.sin(t/8)*.028*a;
      lift=(1-Math.cos(t/4))*.006*a;
      lean=Math.sin(t/8-.2)*.025*a;
      bend=Math.sin(t/4)*.014*a;step=Math.sin(t/4)*.008*a;
    }
    const phrase=definitions[id].phrases[Math.min(3,Math.floor(clamp(progress)*4))];
    const feet=id==='gelo'?Math.sin(t/3):id==='ceu'?Math.sin(t/4):Math.sin(t/2);
    return {x,lift,lean,bend,step,leftFoot:Math.max(0,feet)**2*.019*a,rightFoot:Math.max(0,-feet)**2*.019*a,phrase};
  }
  const moods=[
    {name:'Tristinho',message:'A próxima é nossa. Vamos juntos!',color:'#b5b8f4'},
    {name:'Concentrado',message:'No seu tempo. Estou com você!',color:'#a5d8ff'},
    {name:'Animando',message:'Isso! Estamos pegando o ritmo!',color:'#c6a8ff'},
    {name:'Feliz',message:'Que alegria tocar com você!',color:'#f6a1d8'},
    {name:'Radiante',message:'Uau! Nosso show está brilhando!',color:'#ffe29b'}
  ];
  const textures=new WeakMap();
  function face(ctx,box,mood,id,clip){
    const [x,y,w,h,angle=0]=box;
    ctx.save();
    if(clip){ctx.beginPath();clip.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();}
    ctx.translate(x,y);ctx.rotate(angle);ctx.scale(w,h);
    // Only the LED display is repainted. Hair, face shell and outfit stay intact.
    ctx.beginPath();ctx.ellipse(0,0,.5,.5,0,0,TAU);ctx.clip();
    const glass=ctx.createLinearGradient(0,-.5,0,.5);glass.addColorStop(0,'#100e24');glass.addColorStop(1,'#080b1b');
    ctx.fillStyle=glass;ctx.fillRect(-.55,-.55,1.1,1.1);
    const color=id==='gelo'?'#94ebff':id==='ceu'?'#ffdf93':id==='brinquedos'?'#a3cfff':'#ff9bdf';
    ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=.055;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.shadowColor=color;ctx.shadowBlur=3;
    const curve=(x1,y1,cx,cy,x2,y2)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(cx,cy,x2,y2);ctx.stroke();};
    if(mood===0){
      curve(-.33,-.02,-.23,-.18,-.12,-.12);curve(.12,-.12,.23,-.18,.33,-.02);
      curve(-.12,.24,0,.11,.12,.24);
      ctx.fillStyle='#a5dfff';ctx.beginPath();ctx.ellipse(.3,.15,.03,.07,-.2,0,TAU);ctx.fill();
    }else if(mood===1){
      for(const ex of [-.23,.23]){ctx.beginPath();ctx.moveTo(ex,-.19);ctx.lineTo(ex,-.03);ctx.stroke();}
      curve(-.12,.2,0,.24,.12,.2);
    }else if(mood===2){
      ctx.beginPath();ctx.moveTo(-.29,-.1);ctx.lineTo(-.13,-.1);ctx.moveTo(-.21,-.19);ctx.lineTo(-.21,-.01);ctx.stroke();
      curve(.12,-.06,.23,-.24,.34,-.06);curve(-.13,.17,0,.33,.14,.17);
    }else{
      for(const ex of [-.23,.23]){
        if(mood!==4)curve(ex-.1,-.04,ex,-.23,ex+.1,-.04);
        else {
          ctx.save();ctx.translate(ex,-.1);ctx.lineWidth=.027;
          if(id==='doces'){
            ctx.beginPath();ctx.moveTo(0,.085);ctx.bezierCurveTo(-.2,-.025,-.09,-.19,0,-.075);ctx.bezierCurveTo(.09,-.19,.2,-.025,0,.085);ctx.fill();
          }else if(id==='gelo'){
            for(let n=0;n<6;n++){ctx.save();ctx.rotate(n*Math.PI/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-.11);ctx.stroke();ctx.restore();}
          }else{
            const points=id==='brinquedos'?5:4;ctx.beginPath();
            for(let n=0;n<points*2;n++){const a=n*Math.PI/points-Math.PI/2,r=n%2?.045:.115;n?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();
          }
          ctx.restore();
        }
      }
      if(mood===4){ctx.beginPath();ctx.moveTo(-.15,.13);ctx.quadraticCurveTo(0,.42,.15,.13);ctx.closePath();ctx.fill();}
      else curve(-.14,.14,0,.35,.14,.14);
      ctx.globalAlpha=.55;ctx.fillStyle='#ffa0df';for(const ex of [-.33,.33]){ctx.beginPath();ctx.ellipse(ex,.14,.06,.03,0,0,TAU);ctx.fill();}
    }
    ctx.restore();
  }
  function texture(image,rect,box,mood,id,clip){
    let cache=textures.get(image);if(!cache){cache=new Map();textures.set(image,cache);}
    const key=rect.join(',')+':'+mood+':'+id;if(cache.has(key))return cache.get(key);
    const c=document.createElement('canvas');c.width=rect[2];c.height=rect[3];const cx=c.getContext('2d');
    cx.drawImage(image,...rect,0,0,c.width,c.height);if(box)face(cx,box,mood,id,clip);cache.set(key,c);return c;
  }
  // A single continuous textured surface keeps the anatomy connected. Shared
  // vertices gently bend knees and alternate toe taps; no limb is detached.
  function body(ctx,texture,x,floor,scale,p){
    const w=texture.width,h=texture.height;
    ctx.save();ctx.translate(x,floor-h*scale*p.lift);ctx.rotate(p.lean);
    const cols=6,rows=16,vertices=[];
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
      const u=i/cols,v=j/rows,sx=u*w,sy=v*h,lower=smooth((v-.57)/.4);
      const left=1-smooth((u-.4)/.2),right=1-left;
      const dx=(p.bend*Math.sin(v*Math.PI)+p.step*Math.sin(v*TAU)*lower)*h;
      const dy=-(p.leftFoot*left+p.rightFoot*right)*lower*h+p.lift*lower*h;
      vertices.push({sx,sy,x:(sx-w/2+dx)*scale,y:(sy-h+dy)*scale});
    }
    function triangle(a,b,c){
      // Source triangles are axis aligned, making the affine mapping exact.
      const det=(b.sx-a.sx)*(c.sy-a.sy)-(c.sx-a.sx)*(b.sy-a.sy);
      const A=((b.x-a.x)*(c.sy-a.sy)-(c.x-a.x)*(b.sy-a.sy))/det;
      const C=((c.x-a.x)*(b.sx-a.sx)-(b.x-a.x)*(c.sx-a.sx))/det;
      const B=((b.y-a.y)*(c.sy-a.sy)-(c.y-a.y)*(b.sy-a.sy))/det;
      const D=((c.y-a.y)*(b.sx-a.sx)-(b.y-a.y)*(c.sx-a.sx))/det;
      ctx.save();ctx.beginPath();
      const mx=(a.x+b.x+c.x)/3,my=(a.y+b.y+c.y)/3;
      for(const [i,v] of [a,b,c].entries()){
        const len=Math.hypot(v.x-mx,v.y-my)||1,px=v.x+(v.x-mx)/len*.22,py=v.y+(v.y-my)/len*.22;
        i?ctx.lineTo(px,py):ctx.moveTo(px,py);
      }
      ctx.closePath();ctx.clip();ctx.transform(A,B,C,D,a.x-A*a.sx-C*a.sy,a.y-B*a.sx-D*a.sy);
      // Keep the complete texture under each clip. Cropping it to each cell
      // creates sampler seams along the cell borders at fractional scales.
      ctx.drawImage(texture,0,0);ctx.restore();
    }
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
      const a=vertices[j*(cols+1)+i],b=vertices[j*(cols+1)+i+1],c=vertices[(j+1)*(cols+1)+i],d=vertices[(j+1)*(cols+1)+i+1];
      triangle(a,b,c);triangle(b,d,c);
    }
    ctx.restore();
    return {x,floor:floor-h*scale*p.lift,height:h*scale,lean:p.lean};
  }
  function platform(ctx,{width,height,floor,x,id,colors,accent,power,beat,soft,still}){
    ctx.clearRect(0,0,width,height);
    const targetX=x;x=width*.52;
    const rx=width*.44,ry=Math.min(28,width*.073),cy=floor-5,depth=Math.min(24,width*.06),intensity=soft?.12:.25+power*.55;
    const tint=id==='doces'?'#59325e':id==='brinquedos'?'#2d4772':id==='gelo'?'#253957':'#49405e';
    ctx.save();
    // A stable, dark scenic backing separates the original outfit from the view.
    const halo=ctx.createRadialGradient(x,cy-height*.42,12,x,cy-height*.42,width*.7);
    halo.addColorStop(0,tint+'8c');halo.addColorStop(.7,tint+'45');halo.addColorStop(1,tint+'00');
    ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
    const front=ctx.createLinearGradient(0,cy,0,cy+ry+depth);front.addColorStop(0,accent);front.addColorStop(1,tint);
    ctx.fillStyle=front;ctx.beginPath();ctx.ellipse(x,cy+depth,rx,ry,0,0,TAU);ctx.fill();ctx.fillRect(x-rx,cy,rx*2,depth);
    ctx.save();ctx.beginPath();ctx.ellipse(x,cy+depth,rx,ry,0,0,TAU);ctx.rect(x-rx,cy,rx*2,depth);ctx.clip();
    for(let i=0;i<12;i++){
      const px=x-rx+i*rx/6,ww=rx/6;
      if(id==='doces'){
        ctx.fillStyle=i%2?'#f7cfed':'#f4a9d9';ctx.beginPath();ctx.roundRect(px,cy-2,ww+2,depth*.6+ry*(.5+(i%3)*.1),[0,0,ww*.35,ww*.35]);ctx.fill();
      }else if(id==='brinquedos'){
        ctx.fillStyle=colors[i%4];ctx.fillRect(px+2,cy+5,ww-4,depth+ry);ctx.strokeStyle='#ffffff99';ctx.strokeRect(px+2,cy+5,ww-4,depth+ry);
      }else if(id==='gelo'){
        ctx.fillStyle=i%2?'#94dfffc0':'#cbbcf9b0';ctx.beginPath();ctx.moveTo(px,cy);ctx.lineTo(px+ww,cy+depth+ry);ctx.lineTo(px+ww*1.5,cy);ctx.closePath();ctx.fill();
      }else{
        ctx.fillStyle='#e3cb8dbb';ctx.fillRect(px,cy+depth+ry*.4,ww,3);
        ctx.fillStyle='#e7e4fff0';ctx.beginPath();ctx.ellipse(px+ww*.5,cy+depth+ry*.4,ww*.55,ry*.38,0,0,TAU);ctx.fill();
      }
    }
    ctx.restore();
    ctx.fillStyle=tint;ctx.beginPath();ctx.ellipse(x,cy,rx,ry,0,0,TAU);ctx.fill();
    const top=ctx.createLinearGradient(0,cy-ry,0,cy+ry);top.addColorStop(0,colors[1]+'66');top.addColorStop(1,accent+'9a');
    ctx.fillStyle=top;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#f5ecff';ctx.stroke();
    ctx.lineWidth=2;ctx.strokeStyle=colors[1];ctx.beginPath();ctx.ellipse(x,cy,rx*.86,ry*.72,0,0,TAU);ctx.stroke();
    for(let i=0;i<9;i++){
      const px=x-rx*.86+i*rx*.215,py=cy+depth+Math.sqrt(Math.max(0,1-((px-x)/rx)**2))*ry*.7;
      ctx.save();ctx.translate(px,py);ctx.fillStyle=colors[i%4];ctx.strokeStyle='#fff';ctx.lineWidth=1;
      if(id==='doces'){ctx.beginPath();ctx.arc(0,0,4,0,TAU);ctx.fill();}
      else if(id==='brinquedos'){ctx.rotate((i%2?.12:-.12));ctx.fillRect(-5,-5,10,10);ctx.strokeRect(-5,-5,10,10);}
      else if(id==='gelo'){ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(4,0);ctx.lineTo(0,7);ctx.lineTo(-4,0);ctx.closePath();ctx.fill();}
      else {ctx.font='16px Trebuchet MS';ctx.textAlign='center';ctx.fillText('✦',0,5);}
      ctx.restore();
    }
    // Stage-mounted moving fixtures aim at the same dancer center.
    for(const side of [-1,1]){
      const sx=width*.5+side*rx*.86,sy=cy-ry*.1;
      const base=side===-1?0:1,color=mixColor(colors[base],colors[base+2],smooth((power-.25)/.75));
      const target=targetX+Math.sin(still?0:beat*Math.PI/4)*width*.015;
      if(!soft){
        const beam=ctx.createLinearGradient(sx,sy,target,sy-height*.75);
        beam.addColorStop(0,color+'90');beam.addColorStop(.6,color+'25');beam.addColorStop(1,color+'00');
        ctx.globalAlpha=intensity;ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(sx-4,sy);ctx.lineTo(target-width*.23,sy-height*.84);ctx.quadraticCurveTo(target,sy-height*.94,target+width*.23,sy-height*.84);ctx.lineTo(sx+4,sy);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
      }
      ctx.save();ctx.translate(sx,sy);ctx.rotate(side*.27);ctx.fillStyle='#28243f';ctx.strokeStyle='#eee4ff';ctx.lineWidth=2;
      ctx.beginPath();ctx.roundRect(-11,-6,22,15,4);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=soft?0:8+power*12;
      ctx.beginPath();ctx.ellipse(0,-5,8,4,0,0,TAU);ctx.fill();ctx.restore();
    }
    ctx.restore();
    return {theme:id,center:x,floor:cy,power,intensity,fixtures:2,following:true};
  }
  function draw(ctx,image,level,{width,height,beat,progress,amount,mood=2,soft=false}){
    const rect=level.frames[0],scale=Math.min(width*.9/(level.designWidth||440),height*.94/(level.designHeight||552));
    const p=pose(level.id,beat,progress,amount),x=width*.52+p.x*Math.min(height,width*1.1),floor=height*.965;
    const tex=texture(image,rect,level.face,mood,level.id,level.faceClip);
    ctx.save();ctx.fillStyle='#15142e66';ctx.beginPath();ctx.ellipse(x,floor-2,rect[2]*scale*.28,7*scale,0,0,TAU);ctx.fill();ctx.restore();
    const model=body(ctx,tex,x,floor,scale,p);
    return {...model,phrase:p.phrase,pose:p,scale,frame:0,connected:true,mood:moods[mood].name};
  }
  window.RR_PERFORMANCE=Object.freeze({definitions,pose,moods,draw,platform,texture});
})();
