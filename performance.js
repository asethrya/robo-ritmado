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
    nebulosa:{style:'Dança dos vaga-lumes',name:'Órbita violeta',phrases:['Passo da névoa','Balanço de luz','Roda das estrelas','Abraço de vaga-lumes']},
    atlanta:{style:'Dança das marés',name:'Onda de cristal',phrases:['Passo da maré','Balanço de coral','Órbita das conchas','Onda de alegria']},
    deserto:{style:'Dança das dunas',name:'Passos do sol',phrases:['Balanço das dunas','Passo solar','Onda de areia','Grande final do sol']},
    pantano:{style:'Groove da floresta',name:'Balanço das raízes',phrases:['Passo de raiz','Onda de folhas','Groove dos vaga-lumes','Abraço da floresta']},
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
    }else if(id==='nebulosa'){
      x=(Math.sin(t/8)*.026+Math.sin(t/4)*.004)*a;lean=Math.sin(t/4)*.018*a;
    }else if(id==='atlanta'){
      x=Math.sin(t/6)*.03*a;lean=Math.sin(t/6-.3)*.017*a;
    }else if(id==='deserto'){
      x=(Math.sin(t/4)*.04+Math.sin(t/2)*.009)*a;lean=Math.sin(t/2)*.035*a;bend=Math.sin(t/2-.6)*.023*a;step=Math.sin(t/2)*.022*a;
    }else if(id==='pantano'){
      x=Math.sin(t/4)*.036*a;lean=Math.sin(t/2+.3)*.032*a;bend=Math.sin(t/4)*.026*a;step=Math.sin(t/2+.4)*.024*a;
    }else{
      x=Math.sin(t/8)*.028*a;
      lift=(1-Math.cos(t/4))*.006*a;
      lean=Math.sin(t/8-.2)*.025*a;
      bend=Math.sin(t/4)*.014*a;step=Math.sin(t/4)*.008*a;
    }
    // Larger continuous phrases; tempo is shared with the song, never random frames.
    x*=1.5;lean*=1.55;bend*=1.5;step*=1.5;
    const phrase=definitions[id].phrases[Math.min(3,Math.floor(clamp(progress)*4))];
    const feet=id==='gelo'?Math.sin(t/3):id==='ceu'?Math.sin(t/4):Math.sin(t/2);
    return {x,lift,lean,bend,step,leftFoot:Math.max(0,feet)**2*.028*a,rightFoot:Math.max(0,-feet)**2*.028*a,phrase};
  }
  const moods=[
    {name:'Tristinho',message:'A próxima é nossa. Vamos juntos!',color:'#b5b8f4'},
    {name:'Concentrado',message:'No seu tempo. Estou com você!',color:'#a5d8ff'},
    {name:'Animando',message:'Isso! Estamos pegando o ritmo!',color:'#c6a8ff'},
    {name:'Feliz',message:'Que alegria tocar com você!',color:'#f6a1d8'},
    {name:'Radiante',message:'Uau! Nosso show está brilhando!',color:'#ffe29b'}
  ];
  const textures=new WeakMap();
  function face(ctx,box,mood,id,clip,mouth,tears){
    // The original face and original eyes are never repainted. Only a small
    // mouth patch below the eyes and two cheek tear paths may change.
    if(mood===2||!mouth)return;
    const [x,y,w,h,angle,skin,ink]=mouth;
    ctx.save();ctx.translate(x,y);ctx.rotate(angle);
    ctx.fillStyle=skin;ctx.beginPath();ctx.ellipse(0,0,w*.65,h*.8,0,0,TAU);ctx.fill();
    ctx.strokeStyle=ink;ctx.lineWidth=Math.max(1,w*.11);ctx.lineCap='round';ctx.lineJoin='round';
    ctx.shadowColor=ink;ctx.shadowBlur=1.2;ctx.beginPath();ctx.moveTo(-w*.48,mood===0?h*.25:-h*.2);
    ctx.quadraticCurveTo(0,mood===0?-h*.65:h*.75,w*.48,mood===0?h*.25:-h*.2);ctx.stroke();
    if(mood===4){ctx.globalAlpha=.3;ctx.lineWidth=Math.max(.7,w*.045);ctx.translate(0,h*.16);ctx.stroke();}
    ctx.restore();
    if(mood===0&&tears){
      ctx.save();ctx.strokeStyle='#8ce6ff';ctx.fillStyle='#b9f4ff';ctx.lineCap='round';ctx.lineWidth=Math.max(1,w*.085);
      for(const [tx,ty,dx,dy]of tears){ctx.beginPath();ctx.moveTo(tx,ty);ctx.quadraticCurveTo(tx+dx*.3,ty+dy*.45,tx+dx,ty+dy);ctx.stroke();ctx.beginPath();ctx.ellipse(tx+dx,ty+dy,w*.085,h*.23,-.12,0,TAU);ctx.fill();}
      ctx.restore();
    }
  }
  function texture(image,rect,box,mood,id,clip,mouth,tears){
    let cache=textures.get(image);if(!cache){cache=new Map();textures.set(image,cache);}
    mood=mood===0?0:mood>=3?4:2;
    const key=rect.join(',')+':'+mood+':'+id;if(cache.has(key))return cache.get(key);
    const c=document.createElement('canvas');c.width=rect[2];c.height=rect[3];const cx=c.getContext('2d');
    cx.drawImage(image,...rect,0,0,c.width,c.height);if(box)face(cx,box,mood,id,clip,mouth,tears);cache.set(key,c);return c;
  }
  // Rigid whole-body illustration: uniform scale and sole-pivot rotation only.
  // No vertex warping, bending, stretching or separate limb physics.
  function projectRigid(px,py,groundY,contactX,x,floor,scale,angle){
    const dx=(px-contactX)*scale,dy=(py-groundY)*scale,c=Math.cos(angle),sn=Math.sin(angle);
    return{x:x+dx*c-dy*sn,y:floor+dx*sn+dy*c};
  }
  function body(ctx,tex,x,floor,scale,p,alpha=1){
    ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,floor);ctx.rotate(p.lean);ctx.drawImage(tex,-p.contactX*scale,-p.groundY*scale,tex.width*scale,tex.height*scale);ctx.restore();
    return{x,floor,height:tex.height*scale,lean:p.lean,backend:'rigid-illustration',bodyDrawCalls:1,groundContact:{x,y:floor}};
  }
  const stages=new Map();
  function staticPlatform(ctx,{width,height,floor,x,id,colors,accent,power,beat,soft,still}){
    ctx.clearRect(0,0,width,height);
    x=width*.52;
    const rx=width*.44,ry=Math.min(28,width*.073),cy=floor,depth=Math.min(24,width*.06),intensity=soft?.12:.25+power*.55;
    const tint=id==='doces'?'#59325e':id==='brinquedos'?'#2d4772':id==='gelo'?'#253957':id==='deserto'?'#68454b':id==='pantano'?'#254b4b':'#49405e';
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
      }else if(id==='nebulosa'){
        ctx.fillStyle=i%2?'#bb83d9':'#6e639d';ctx.beginPath();ctx.ellipse(px+ww*.5,cy+depth,ww*.6,ry*.7,0,0,TAU);ctx.fill();
        ctx.fillStyle='#f2d8ff';ctx.beginPath();ctx.arc(px+ww*.5,cy+depth,2,0,TAU);ctx.fill();
      }else if(id==='atlanta'){
        ctx.fillStyle=i%2?'#478fbe':'#73bfcf';ctx.fillRect(px,cy,ww+1,depth+ry);ctx.strokeStyle='#b4f5dd';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(px,cy+depth);ctx.quadraticCurveTo(px+ww*.5,cy+depth-ry*.6,px+ww,cy+depth);ctx.stroke();
      }else if(id==='deserto'){
        ctx.fillStyle=i%2?'#e3a271':'#a97b66';ctx.fillRect(px+1,cy,ww-2,depth+ry);ctx.strokeStyle='#ffe0aa';ctx.strokeRect(px+3,cy+7,ww-6,9);
      }else if(id==='pantano'){
        ctx.fillStyle=i%2?'#658d70':'#446d60';ctx.beginPath();ctx.ellipse(px+ww*.5,cy+depth,ww*.65,ry*.7,-.3,0,TAU);ctx.fill();
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
    ctx.restore();
  }
  function lighting(ctx,{width,height,floor,x,colors,power=0,beat=0,soft=false,still=false,deluxe=false}){
    const intensity=soft?.12:.38+power*.57,center=width*.52;
    ctx.save();
    if(!soft&&!deluxe){
      ctx.strokeStyle='#ded4ff80';ctx.lineWidth=deluxe?5:3;ctx.beginPath();ctx.moveTo(width*.12,height*.065);ctx.lineTo(width*.9,height*.065);ctx.stroke();
    }
    for(let n=0;n<4;n++){
      const top=n>=2,side=n%2?1:-1;
      const sx=center+side*width*(top?.36:.38),sy=top?height*.085:floor-6;
      const target=x+Math.sin(still?0:beat*Math.PI/4+n)*width*.018;
      const ty=top?floor-8:height*.2,spread=width*(top?.2:.19);
      const color=mixColor(colors[n%4],colors[(n+1)%4],smooth(power));
      if(!soft){
        const beam=ctx.createLinearGradient(sx,sy,target,ty);beam.addColorStop(0,color+'d5');beam.addColorStop(.5,color+'70');beam.addColorStop(1,color+'12');
        ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=intensity*(deluxe?.76:.65);ctx.fillStyle=beam;
        ctx.beginPath();ctx.moveTo(sx-4,sy);ctx.lineTo(target-spread,ty);ctx.quadraticCurveTo(target,ty+(top?15:-15),target+spread,ty);ctx.lineTo(sx+4,sy);ctx.closePath();ctx.fill();
        ctx.strokeStyle=beam;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(target,ty);ctx.stroke();
        if(top){ctx.fillStyle=color+'50';ctx.beginPath();ctx.ellipse(target,floor-6,width*.18,10+power*7,0,0,TAU);ctx.fill();}
        ctx.restore();
      }
      ctx.save();ctx.translate(sx,sy);ctx.rotate((top?-1:1)*side*.25);ctx.fillStyle='#28233d';ctx.strokeStyle='#f1e8ff';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(-11,-6,22,15,4);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=soft?0:10+power*15;ctx.beginPath();ctx.ellipse(0,top?7:-5,8,4,0,0,TAU);ctx.fill();ctx.restore();
    }
    if(!soft){
      ctx.strokeStyle=colors[1]+'a0';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(center,floor-4,width*.4,Math.min(23,width*.055),0,0,TAU);ctx.stroke();
      if(power>.45||deluxe){
        for(let i=0;i<8;i++){
          const phase=((beat*.08+i/8)%1+1)%1,alpha=Math.sin(phase*Math.PI)*intensity;
          ctx.globalAlpha=alpha;ctx.fillStyle=colors[i%4];const px=center+Math.sin(i*2.3+beat*.12)*width*.42,py=floor-height*(.08+phase*.68);
          ctx.beginPath();ctx.moveTo(px,py-4);ctx.lineTo(px+2,py);ctx.lineTo(px,py+4);ctx.lineTo(px-2,py);ctx.closePath();ctx.fill();
        }
      }
    }
    ctx.restore();return{intensity,fixtures:4,topFixtures:2,bottomFixtures:2,following:true,topProjected:true};
  }
  function platform(ctx,o){
    const {width,height,floor,id,colors,accent,power,x}=o;
    const key=[Math.round(width),Math.round(height),Math.round(floor),id,...colors,accent].join('|');
    let base=stages.get(key);
    if(!base){
      if(stages.size>=6)stages.delete(stages.keys().next().value);
      base=document.createElement('canvas');base.width=Math.ceil(width*1.25);base.height=Math.ceil(height*1.25);const cx=base.getContext('2d');cx.scale(1.25,1.25);staticPlatform(cx,o);stages.set(key,base);
    }
    ctx.clearRect(0,0,width,height);ctx.drawImage(base,0,0,width,height);
    return{theme:id,center:width*.52,floor,power,...lighting(ctx,o),cachedBase:true};
  }
  function draw(ctx,image,level,{width,height,beat,progress,amount,mood=2,soft=false}){
    const p=pose(level.id,beat,progress,amount),baseRect=level.frames[0];
    // A small grounded slide and rock follow the song. The outfit stays solid.
    p.lean*=.45;p.x*=.62;p.bend=0;p.step=0;p.leftFoot=0;p.rightFoot=0;p.lift=0;
    const floor=height*.935,center=width*.52+p.x*Math.min(height,width*1.1);
    const baseScale=Math.min(width*.93/(level.designWidth||440),height*.86/(level.designHeight||552));
    let frame=0,nextFrame=0,blend=0;
    if(!soft&&amount>0&&mood>=3&&level.frames.length>1){
      const sequence=level.id==='brinquedos'?[0,2,1,2,0,3,1,0]:[0,1,2,1,0,3,2,1];
      const step=beat/2,i=Math.floor(step),fraction=step-i;
      frame=sequence[i%sequence.length];nextFrame=sequence[(i+1)%sequence.length];blend=smooth((fraction-.83)/.17);
    }
    function drawFrame(index,alpha){
      const rect=level.frames[index],k=baseRect[3]/rect[3],scale=baseScale*k;
      const ground=(level.contacts?.[index]||[index===0?(level.groundY||rect[3]):rect[3],index===0?(level.contactX||rect[2]*.5):rect[2]*.45]);
      const local={...p,groundY:ground[0],contactX:ground[1]};
      const tex=texture(image,rect,index===0?level.face:null,index===0?mood:2,level.id,level.faceClip,index===0?level.mouth:null,index===0?level.tears:null);
      const x=center+(local.contactX-rect[2]*.5)*scale;
      const model=body(ctx,tex,x,floor,scale,local,alpha);return{...model,scale,groundY:local.groundY,contactX:local.contactX,rect,tex,x};
    }
    const model=drawFrame(frame,1-blend);if(blend>.001)drawFrame(nextFrame,blend);
    if(mood===0&&!soft&&level.tears){
      ctx.save();ctx.fillStyle='#bdf6ff';for(const [i,[tx,ty,dx,dy]]of level.tears.entries()){
        const t=((beat*.22+i*.43)%1+1)%1,q=projectRigid(tx+dx*t,ty+dy*t,model.groundY,model.contactX,model.x,floor,model.scale,p.lean);
        ctx.beginPath();ctx.ellipse(q.x,q.y,Math.max(.8,level.mouth[2]*model.scale*.065),Math.max(1.2,level.mouth[3]*model.scale*.23),p.lean-.12,0,TAU);ctx.fill();
      }ctx.restore();
    }
    return{x:center,floor,height:baseRect[3]*baseScale,lean:p.lean,backend:'rigid-illustration',bodyDrawCalls:blend>.001?2:1,groundContact:{x:model.x,y:floor},phrase:p.phrase,pose:p,scale:baseScale,frame,nextFrame,blend,connected:true,rigid:true,mood:moods[mood].name};
  }
  window.RR_PERFORMANCE=Object.freeze({definitions,pose,moods,draw,platform,texture,lighting,projectRigid});
})();
