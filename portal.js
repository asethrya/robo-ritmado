(() => {
  'use strict';
  function star(ctx,x,y,r,angle=0){ctx.beginPath();for(let i=0;i<10;i++){const a=angle+i*Math.PI/5-Math.PI/2,rr=i%2?r*.42:r;i?ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):ctx.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}ctx.closePath();}
  function draw(ctx,x,y,rx,ry,time,open=1,front=false){
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
        for(let i=0;i<10;i++){const a=i*Math.PI/5+(gentle?0:time*.18);ctx.fillStyle=i%2?'#f5d887':'#abf2ff';star(ctx,Math.cos(a)*(rx+20),Math.sin(a)*(ry+21),i%3===0?5:3,a);ctx.fill();}}
      ctx.restore();
    }
  window.RR_PORTAL=Object.freeze({draw});
})();
