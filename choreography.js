(() => {
  'use strict';
  // Continuous joint animation. Music time drives a composed sequence; hits
  // add sparkles only, never interrupt a step or choose a random body pose.
  const rects = [[35,12,399,348],[498,52,222,311],[803,121,548,232],[1300,15,231,381],
    [105,390,164,250],[504,386,148,289],[925,386,152,250],[1253,386,161,292],
    [77,668,265,346],[478,679,224,342],[842,665,265,352],[1188,673,232,348]];
  const cache=new Map(), clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  function load(url){
    if(cache.has(url))return cache.get(url);
    const asset=RR_SPRITES.load(url),kit={image:asset.image,parts:null};
    kit.ready=asset.ready.then(image=>{
      kit.parts=rects.map((r,i)=>{
        const sx=image.naturalWidth/1536,sy=image.naturalHeight/1024;
        let [x,y,w,h]=r.map((v,j)=>Math.round(v*(j%2?sy:sx)));
        w=Math.min(w,image.naturalWidth-x);h=Math.min(h,image.naturalHeight-y);
        if(x<0||y<0||w<=0||h<=0)throw Error('Peça de Pixel inválida: '+i);
        // Authored source regions need no pixel readback, including file:// play.
        return [x,y,w,h];
      });return kit;
    });kit.ready.catch(()=>{});cache.set(url,kit);return kit;
  }
  // Values: hip x/y, left foot x/lift, right foot x/lift, torso/head angle,
  // guitar angle, free-hand reach. Knots are two musical beats apart.
  const dances={
    doces:{name:'Passinho de açúcar',style:'Pop · step-touch e balanço',steps:['Balanço doce','Passo e toca','Onda de açúcar','Grande acorde'],knots:[
      [0,0,-48,0,48,0,0,0,-.12,0],[-13,7,-65,0,36,10,-.06,.04,-.08,0],
      [0,0,-42,9,53,0,0,-.03,-.12,0],[13,7,-35,12,68,0,.06,-.04,-.18,0],
      [0,0,-48,0,48,0,0,.02,-.12,0],[-18,11,-72,0,28,17,-.1,.06,-.05,0],
      [0,3,-44,16,52,0,.04,-.06,-.25,.35],[18,8,-30,10,72,0,.08,-.04,-.12,0],
      [0,0,-48,0,48,0,0,0,-.12,0]]},
    brinquedos:{name:'Desfile dos brinquedos',style:'Funk de brinquedo · marcha e robô',steps:['Marcha das estrelas','Joelho no ritmo','Robô de mola','Desfile final'],knots:[
      [0,0,-43,0,43,0,0,0,-.14,0],[-9,5,-50,28,43,0,-.025,.035,-.1,0],
      [0,0,-43,0,43,0,0,0,-.14,0],[9,5,-43,0,50,28,.025,-.035,-.2,0],
      [0,10,-62,0,62,0,0,.04,0,.3],[-14,14,-76,0,36,20,-.09,-.04,-.23,0],
      [0,0,-43,0,43,0,0,0,-.14,.65],[14,14,-36,20,76,0,.09,.04,-.05,0],
      [0,0,-43,0,43,0,0,0,-.14,0]]},
    gelo:{name:'Valsa dos cristais',style:'Ballet · plié, tendu e arabesque',steps:['Plié de cristal','Tendu na neve','Arabesque lunar','Reverência real'],knots:[
      [0,0,-38,0,38,0,0,0,-.16,0],[0,18,-58,0,58,0,0,-.03,-.12,0],
      [-17,-4,-35,0,91,12,-.06,.03,-.24,.65],[0,0,-38,0,38,0,0,0,-.16,0],
      [17,-4,-91,12,35,0,.06,-.03,-.07,.65],[0,18,-58,0,58,0,0,0,-.12,0],
      [-12,-8,-40,0,76,42,-.1,.08,-.25,1],[0,14,-45,0,45,0,.04,-.08,-.16,0],
      [0,0,-38,0,38,0,0,0,-.16,0]]},
    ceu:{name:'Órbita das nuvens',style:'Contemporâneo · ondas e passos largos',steps:['Respirar nas nuvens','Onda celestial','Passo de órbita','Abraço das estrelas'],knots:[
      [0,0,-48,0,48,0,0,0,-.1,0],[-16,3,-75,0,28,12,-.08,.06,-.23,.7],
      [0,-8,-42,9,56,0,.02,-.04,-.28,1],[16,3,-28,12,75,0,.08,-.06,-.06,.7],
      [0,12,-65,0,65,0,0,.06,.02,0],[-20,0,-66,0,25,27,-.12,.08,-.3,.45],
      [0,-6,-46,5,46,5,0,0,-.18,1],[20,0,-25,27,66,0,.12,-.08,-.02,.45],
      [0,0,-48,0,48,0,0,0,-.1,0]]}
  };
  const spline=(a,b,c,d,t)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
  function pose(id,beat,progress=0){
    const dance=dances[id]||dances.doces,period=id==='gelo'?12:16,phase=((Math.max(0,beat)%period)/period*8),i=Math.floor(phase),t=phase-i,k=dance.knots;
    const p=k[i].map((_,j)=>spline(k[(i+7)%8][j],k[i][j],k[i+1][j],k[(i+2)%8][j],t));
    const growth=.55+.45*clamp(progress,0,1);
    for(const j of [0,1,3,5,6,7,9])p[j]*=growth;
    const rise=(start,end)=>{const q=clamp((progress-start)/(end-start),0,1);return q*q*(3-2*q);};
    const wave=rise(.23,.37),finale=rise(.65,.9),pulse=Math.sin(beat*Math.PI/2);
    // Later phrases introduce new gestures gradually, without snapping at labels.
    if(id==='doces'){p[6]+=.035*wave*Math.sin(beat*Math.PI/4);p[9]+=finale*.35*(.5+.5*pulse);}
    if(id==='brinquedos'){p[3]+=finale*8*Math.max(0,pulse);p[5]+=finale*8*Math.max(0,-pulse);p[8]+=.05*wave*Math.sin(beat*Math.PI);}
    if(id==='gelo'){p[2]-=finale*12*Math.max(0,-pulse);p[4]+=finale*12*Math.max(0,pulse);p[9]+=wave*.15*(.5+.5*pulse);}
    if(id==='ceu'){p[6]+=.045*wave*Math.sin(beat*Math.PI/4);p[9]+=finale*.22*(.5+.5*Math.sin(beat*Math.PI/4));}
    // Sustained secondary motion follows the beat with small delayed oscillation.
    p[7]+=.018*Math.sin(beat*Math.PI-.3);return p;
  }
  function ik(a,b,l1,l2,bend=1){
    let dx=b[0]-a[0],dy=b[1]-a[1],d=clamp(Math.hypot(dx,dy),1,l1+l2-.1);
    const angle=Math.atan2(dy,dx),offset=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1))*bend;
    return [a[0]+Math.cos(angle+offset)*l1,a[1]+Math.sin(angle+offset)*l1];
  }
  function draw(c,kit,{id='doces',beat=0,progress=0,x,floor,height=500,still=false,storyPose=null,guitar=true,guitarAlpha=1,reachDown=0}){
    if(!kit.parts)return null;const p=storyPose?[...storyPose]:pose(id,still?0:beat,progress),s=height/510;
    const part=(n,px,py,w,h,rotation=0,ax=.5,ay=0)=>{
      const r=kit.parts[n];c.save();c.translate(px,py);c.rotate(rotation);
      const mask=n===2?[[0,0],[1,0],[1,.64],[.55,.64],[.55,1],[0,1]]:n===3?[[.33,0],[.45,0],[.64,.18],[.9,.38],[.98,.68],[.75,.98],[.45,.88],[0,.82],[.2,.6],[.34,.3]]:null;
      if(mask){c.beginPath();mask.forEach(([u,v],i)=>i?c.lineTo((u-ax)*w,(v-ay)*h):c.moveTo((u-ax)*w,(v-ay)*h));c.closePath();c.clip();}
      c.drawImage(kit.image,...r,-w*ax,-h*ay,w,h);c.restore();
    };
    const pivots={4:.63,5:.34,6:.34,7:.45,8:.5,9:.29,10:.44,11:.58};
    const bone=(n,a,b,w,extra=8)=>{const d=Math.hypot(b[0]-a[0],b[1]-a[1]);part(n,a[0],a[1],w,d+extra,Math.atan2(b[1]-a[1],b[0]-a[0])-Math.PI/2,pivots[n]||.5,.04);};
    const hip=[p[0],-224+p[1]],footL=[p[2],-22-Math.max(0,p[3])],footR=[p[4],-22-Math.max(0,p[5])];
    c.save();c.translate(x,floor);c.scale(s,s);
    // Back tails have delayed follow-through and remain behind the body.
    part(3,hip[0]-32,hip[1]-110,42,220, .16+p[6]+(still?0:Math.sin(beat*Math.PI/2-.8)*.06));
    part(3,hip[0]+32,hip[1]-110,42,220,-.16+p[6]-(still?0:Math.sin(beat*Math.PI/2-.8)*.06));
    for(const [side,foot] of [[-1,footL],[1,footR]]){
      const a=[hip[0]+side*25,hip[1]],knee=ik(a,foot,109,109,side<0?1:-1),n=side<0?8:10;
      bone(n,a,knee,70,16);bone(n+1,knee,foot,66,31);
    }
    c.save();c.translate(hip[0],hip[1]);c.rotate(p[6]);
    part(1,0,8,119,155,0,.5,1);
    part(0,0,-135,156,137,p[7],.5,1);
    const shoulders=[[-49,-123],[49,-123]],g=[15,-58],ga=p[8];
    const rot=(u,v)=>[g[0]+u*Math.cos(ga)-v*Math.sin(ga),g[1]+u*Math.sin(ga)+v*Math.cos(ga)];
    const hands=[rot(-40,5),rot(98,-3)];
    if(!guitar){hands[0]=[-78,-48];hands[1]=[78,-48];}
    const reach=clamp(p[9],0,1);hands[0]=[hands[0][0]*(1-reach)+(-112)*reach,hands[0][1]*(1-reach)+(-126)*reach];
    if(reachDown){for(let i=0;i<2;i++){hands[i][0]=hands[i][0]*(1-reachDown)+(i?74:-58)*reachDown;hands[i][1]=hands[i][1]*(1-reachDown)+(i?-8:4)*reachDown;}}
    const elbows=shoulders.map((a,i)=>ik(a,hands[i],69,76,1));
    for(let i=0;i<2;i++)bone(i?6:4,shoulders[i],elbows[i],44,10);
    if(guitar){c.save();c.globalAlpha*=guitarAlpha;part(2,g[0],g[1],260,104,ga,.5,.5);c.restore();}
    for(let i=0;i<2;i++)bone(i?7:5,elbows[i],hands[i],36,21);
    c.restore();c.restore();
    return {name:dances[id].name,phrase:dances[id].steps[Math.min(3,Math.floor(progress*4))],pose:p,beat};
  }
  window.RR_CHOREO=Object.freeze({load,draw,pose,definitions:dances});
})();
