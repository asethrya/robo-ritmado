(() => {
  'use strict';
  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n)),smooth=t=>{t=clamp(t);return t*t*(3-2*t);},lerp=(a,b,t)=>a+(b-a)*t;
  const shots=[
    {name:'Uma aventura começa!',duration:5,world:'orbit',action:'Pixel acena na praça de OrbitHop, segurando a guitarra estrela.',lines:[['PIXEL','Oi! Eu sou Pixel. Este é meu lar: OrbitHop!',0],['PIXEL','Bora descobrir o que tem além das estrelas?',2.5]]},
    {name:'Um acorde mágico',duration:6,world:'orbit',action:'A guitarra solta ondas de som. Um portal se abre e gira diante de Pixel.',lines:[['PIXEL','Uma guitarra… e um universo de possibilidades!',0],['GUITARRA','♪ Conexão entre mundos encontrada! ♪',3]]},
    {name:'Opa! Que ventania!',duration:4.5,world:'orbit',action:'O portal muda de direção. As fitas da roupa e as notas são puxadas para ele.',lines:[['PIXEL','Ué? Esse portal tá puxando tudo!',0],['PIXEL','Ei, ei… eu ainda nem escolhi o destino!',2.2]]},
    {name:'Fuuuuush!',duration:4.2,world:'orbit',action:'Pixel perde o chão, gira no ar e é sugado para dentro do portal com a guitarra.',lines:[['PIXEL','Segura firme, guitarra! Lá vamos nóóós!',.1]]},
    {name:'Entre um mundo e outro',duration:3.8,world:'tunnel',action:'Pixel atravessa um túnel de anéis coloridos e estrelas, em direção a uma saída rosa.',lines:[['PIXEL','Uaaaaau! Quantas cores!',0],['PIXEL','Mas… como eu volto pra casa?',1.9]]},
    {name:'Tem alguém chegando!',duration:5,world:'candy',action:'Um portal abre no céu do Reino dos Doces. Pixel sai girando e cai; a guitarra escapa das mãos.',lines:[['PIXEL','Aaaah! Onde fica o freio?!',.5]]},
    {name:'Pof! Uma aterrissagem doce',duration:4.8,world:'candy',action:'Pixel cai sentado numa nuvem macia de açúcar. A guitarra quica e para ao lado dele.',lines:[['PIXEL','Pof! Ufa… acho que tô inteiro!',.5],['PIXEL','Até a minha roupa virou doce!',2.6]]},
    {name:'Um passinho de cada vez',duration:5.6,world:'candy',action:'Pixel apoia a mão, se levanta e tira o açúcar da roupa. Ele vê a guitarra no chão.',lines:[['PIXEL','Primeiro: levantar. Depois: tirar esse açúcar!',0],['PIXEL','Minha guitarra! Já vou te buscar.',3.2]]},
    {name:'Parceiros de novo',duration:5.5,world:'candy',action:'Pixel se abaixa, pega a guitarra, coloca a correia e ajeita o instrumento.',lines:[['PIXEL','Vem cá, parceira! Vamos nos ajeitar.',0],['GUITARRA','♪ Plim-plim! Pronta pra tocar! ♪',3]]},
    {name:'O ritmo mostra o caminho',duration:7,world:'candy',action:'Pixel se recompõe, toca um acorde e aponta para o caminho de portais dos outros mundos.',lines:[['PIXEL','Pra voltar pra casa, preciso aprender o ritmo de cada mundo!',0],['PIXEL','Você me ajuda? Vamos tocar juntos!',3.5]]}
  ];
  function create(canvas){
    const ctx=canvas.getContext('2d');let w=1440,h=900,dpr=1,lastModel={};
    const standard=RR_SPRITES.load('assets/pixel-padrao-v1.png'),candy=RR_SPRITES.load('assets/pixel-doces-danca-v6.png'),story=RR_SPRITES.load('assets/pixel-doces-historia-v6.png'),guitar=RR_SPRITES.load('assets/guitarra-doces-v6.png');
    const ready=Promise.all([standard.ready,candy.ready,story.ready,guitar.ready]).then(()=>{
      RR_SPRITES.validate(standard.image,RR_SPRITES.standard);RR_SPRITES.validate(candy.image,RR_SPRITES.cells());RR_SPRITES.validate(story.image,RR_SPRITES.story.map(f=>f.r));
    });ready.catch(()=>{});
    new ResizeObserver(()=>{const b=canvas.getBoundingClientRect();w=Math.max(1,b.width);h=Math.max(1,b.height);dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}).observe(canvas);
    function star(x,y,r,angle=0){ctx.beginPath();for(let i=0;i<10;i++){const a=angle+i*Math.PI/5-Math.PI/2,rr=i%2?r*.42:r;i?ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):ctx.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}ctx.closePath();}
    function portal(x,y,rx,ry,time,open=1,front=false){
      if(open<=.01)return;const gentle=RR_SETTINGS.gentle(),safe=RR_SETTINGS.get().sensitivity;
      ctx.save();ctx.translate(x,y);ctx.scale(Math.max(.02,open),Math.max(.02,open));
      if(!front){
        const g=ctx.createRadialGradient(0,0,4,0,0,ry*1.25);g.addColorStop(0,'#171845');g.addColorStop(.52,'#302962f2');g.addColorStop(.75,safe?'#626184':'#9857d9e6');g.addColorStop(.88,'#d9a7ee85');g.addColorStop(1,'#dca5f000');
        ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,rx*1.26,ry*1.18,0,0,Math.PI*2);ctx.fill();
        if(!safe){ctx.save();ctx.beginPath();ctx.ellipse(0,0,rx*.96,ry*.96,0,0,Math.PI*2);ctx.clip();
          for(let i=0;i<7;i++){const p=(i/7+(gentle?0:time*.08))%1;ctx.strokeStyle=['#b3efff66','#ebb0f27a','#8a83f066'][i%3];ctx.lineWidth=2+p*6;ctx.beginPath();ctx.ellipse(Math.sin(i+time*.18)*rx*.15,Math.cos(i)*ry*.1,rx*(.06+p*.9),ry*(.06+p*.9),(gentle?0:time*.2)+i*.12,0,Math.PI*2);ctx.stroke();}
          ctx.restore();}
      }
      ctx.shadowColor=safe?'transparent':'#e9a3ff';ctx.shadowBlur=safe?0:18;ctx.lineWidth=front?4:8;
      ctx.strokeStyle=safe?'#c7c5e0':front?'#d9edff':'#eeaeef';ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,front?-.4:0,front?Math.PI*.9:Math.PI*2);ctx.stroke();
      ctx.shadowBlur=0;
      if(!safe){for(let j=0;j<3;j++){ctx.strokeStyle=['#a5edffbb','#eeb6fb99','#f8dfac99'][j];ctx.lineWidth=1.5;ctx.setLineDash([6+j*4,12+j*9]);ctx.lineDashOffset=gentle?0:-time*(14+j*6);ctx.beginPath();ctx.ellipse(0,0,rx+9+j*7,ry+11+j*8,(j-1)*.018,0,Math.PI*2);ctx.stroke();}ctx.setLineDash([]);
        for(let i=0;i<10;i++){const a=i*Math.PI/5+(gentle?0:time*.18);ctx.fillStyle=i%2?'#f5d887':'#abf2ff';star(Math.cos(a)*(rx+20),Math.sin(a)*(ry+21),i%3===0?5:3,a);ctx.fill();}}
      ctx.restore();
    }
    function body(asset,frame,x,y,height,rotation=0,alpha=1){if(asset.image.complete&&asset.image.naturalWidth)RR_SPRITES.draw(ctx,asset.image,frame,x,y,height,{rotation,alpha});}
    function guitarProp(x,y,scale=1,rotation=0,alpha=1){if(!guitar.image.complete||!guitar.image.naturalWidth)return;ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.globalAlpha=alpha;const ww=w*(w<700?.28:.16)*scale;ctx.drawImage(guitar.image,-ww/2,-ww*.33,ww,ww*2/3);ctx.restore();}
    function puffs(x,y,t){if(RR_SETTINGS.gentle())return;const p=clamp(t/1.7);ctx.save();ctx.globalAlpha=(1-p)*.6;for(let i=0;i<9;i++){ctx.fillStyle=i%2?'#ffe2f1':'#d7eeff';ctx.beginPath();ctx.ellipse(x+(i-4)*(12+p*23),y-6-Math.sin(i)*p*25,15+p*30,9+p*16,0,0,Math.PI*2);ctx.fill();}ctx.restore();}
    function draw(index,t){
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
      const gentle=RR_SETTINGS.gentle(),safe=RR_SETTINGS.get().sensitivity,mobile=w<700;
      const floor=h*(mobile?.73:.83),H=Math.min(h*(mobile?.41:.62),w*(mobile?.82:.46)),x=w*(mobile?.59:.69),px=w*(mobile?.47:.48),py=h*(mobile?.36:.43),rx=Math.min(w*.15,h*.2),ry=Math.min(h*.24,w*.24);
      let actorX=x,actorY=floor,actorH=H,rotation=0,alpha=1,pose=0,kind='default',portalOpen=0,portalX=px,portalY=py,prop=false,propX=w*.67,propY=floor-4;
      const bob=gentle?0:Math.sin(t*2)*3;
      if(index===0){pose=t<2.6?5:0;actorY+=bob;}
      if(index===1){pose=t<1.5?3:4;actorY+=gentle?0:Math.sin(t*5)*2;portalOpen=smooth((t-.6)/2.1);}
      if(index===2){pose=7;portalOpen=1;actorX-=gentle?0:smooth(t/4.5)*w*.06;rotation=gentle?0:-.09*Math.sin(t*2);}
      if(index===3){pose=7;portalOpen=1;const p=smooth((t-.1)/3.5);actorX=lerp(x-w*.06,px,p);actorY=lerp(floor,py,p);actorH=H*(1-.95*p);rotation=gentle?0:-p*Math.PI*.95;alpha=1-smooth((p-.84)/.16);}
      if(index===4){
        const g=ctx.createRadialGradient(w*.5,h*.45,20,w*.5,h*.45,w*.7);g.addColorStop(0,'#c8b0f0');g.addColorStop(.25,'#6d52a4');g.addColorStop(1,'#141a43');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
        if(!safe)for(let i=0;i<16;i++){const p=(i/16+(gentle?0:t*.12))%1;ctx.strokeStyle=['#eac4ed80','#a0edff77','#ad97f688'][i%3];ctx.lineWidth=1+p*3;ctx.beginPath();ctx.ellipse(w*.5,h*.45,(40+p*w*.9),(20+p*h*.65),-.2,0,Math.PI*2);ctx.stroke();}
        pose=7;actorX=w*.5+(gentle?0:Math.sin(t*1.1)*w*.06);actorY=h*.6;actorH=H*.6;rotation=gentle?0:Math.sin(t)*.24;alpha=1;
      }
      if(index===5){kind='story';pose=0;portalX=w*.51;portalY=h*.27;portalOpen=smooth(t/1.3);const p=smooth((t-1.2)/2.8);actorX=lerp(portalX,x,p);actorY=lerp(portalY+H*.1,floor,p*p);actorH=H*(.2+.8*p);rotation=gentle?0:lerp(-.8,.1,p);alpha=clamp((t-1.1)/.5);prop=true;propX=lerp(portalX,w*.48,p);propY=lerp(portalY+40,floor,p*p);if(t>4.1){pose=1;rotation=0;actorY=floor;puffs(x,floor,t-4.1);}}
      if(index===6){kind='story';pose=1;portalX=w*.51;portalY=h*.27;portalOpen=1-smooth(t/2.2);actorY=floor+(gentle?0:Math.sin(Math.min(1,t)*Math.PI)*4);prop=true;propX=w*.46;propY=floor-(gentle?0:Math.abs(Math.sin(Math.min(1,t/1.2)*Math.PI*2))*18*(1-clamp(t/1.2)));puffs(x,floor,t+.1);}
      if(index===7){kind='story';pose=t<2.1?2:3;prop=true;propX=w*.46;propY=floor;actorX=x+(gentle?0:Math.sin(t*.6)*5);}
      if(index===8){kind='story';pose=t<1.9?4:t<3.6?5:6;actorX=lerp(x,w*.59,smooth(t/2));prop=t<2.05;propX=w*.46;propY=floor;}
      if(index===9){kind='story';pose=t<3?6:7;actorY+=bob*.4;actorX=w*.59;}
      if(gentle){rotation=0;if(index===1)portalOpen=t>.6?1:0;if(index===5)portalOpen=1;if(index===6)portalOpen=t<1.5?1:0;if(index===3){actorX=px;actorY=floor;actorH=H;alpha=1-smooth(t/3.5);}if(index===4){actorX=w*.5;actorY=h*.68;}if(index===5){actorX=x;actorH=H;actorY=floor;alpha=clamp(t);pose=t<2?0:1;}}
      if(index!==4&&portalOpen>0)portal(portalX,portalY,rx,ry,t,portalOpen);
      // A floor shadow anchors Pixel, but is absent while flying through the tunnel.
      if(index!==3&&index!==4&&index!==5){ctx.save();ctx.globalAlpha=.2;ctx.fillStyle='#36264b';ctx.beginPath();ctx.ellipse(actorX,floor+2,H*.2,H*.025,0,0,Math.PI*2);ctx.fill();ctx.restore();}
      if(prop)guitarProp(propX,propY,1,index===5&&!gentle?t*1.4:gentle?0:.14);
      body(kind==='story'?story:standard,kind==='story'?RR_SPRITES.story[pose]:RR_SPRITES.standard[pose],actorX,actorY,actorH,rotation,alpha);
      if(index!==4&&portalOpen>0)portal(portalX,portalY,rx,ry,t,portalOpen,true);
      if(!gentle&&[2,3].includes(index)){ctx.save();ctx.strokeStyle='#dccef066';ctx.lineWidth=2;for(let i=0;i<22;i++){const a=i*.62,tau=(t*.35+i*.071)%1;const xx=lerp(w*(.2+(i*.177)% .8),portalX,tau),yy=lerp(h*(.12+(i*.237)%.7),portalY,tau);ctx.beginPath();ctx.moveTo(xx+Math.cos(a)*15*(1-tau),yy+Math.sin(a)*15*(1-tau));ctx.lineTo(xx,yy);ctx.stroke();}ctx.restore();}
      lastModel={index,world:shots[index].world,pose,kind,x:actorX,y:actorY,height:actorH,rotation,alpha,portalOpen,guitarOnGround:prop,width:w,heightCanvas:h};
      return lastModel;
    }
    return Object.freeze({ready,draw,snapshot:()=>({...lastModel}),shots});
  }
  window.RR_CINEMA=Object.freeze({create,shots});
})();
