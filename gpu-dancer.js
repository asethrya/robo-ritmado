(() => {
  'use strict';
  // One connected texture and one GPU draw replace 192 Canvas clipping passes.
  // A complete-image fallback remains available when WebGL is disabled/lost.
  let device=null,failed=false;
  function create(){
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,premultipliedAlpha:true,preserveDrawingBuffer:false});
    if(!gl)return null;
    let lost=false;canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;});
    function shader(type,code){const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader');return s;}
    const program=gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,'attribute vec2 p;attribute vec2 uv;uniform vec2 viewport;varying vec2 v;void main(){v=uv;gl_Position=vec4(p.x/viewport.x*2.0-1.0,1.0-p.y/viewport.y*2.0,0.0,1.0);}'));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 v;uniform sampler2D picture;void main(){gl_FragColor=texture2D(picture,v);}'));
    gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Program');gl.useProgram(program);
    const cols=6,rows=16,count=(cols+1)*(rows+1),positions=new Float32Array(count*2),uv=new Float32Array(count*2),indices=new Uint16Array(cols*rows*6);
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const n=(j*(cols+1)+i)*2;uv[n]=i/cols;uv[n+1]=j/rows;}
    let n=0;for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=j*(cols+1)+i,b=a+1,c=a+cols+1,d=c+1;indices.set([a,b,c,b,d,c],n);n+=6;}
    const posBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);gl.bufferData(gl.ARRAY_BUFFER,positions.byteLength,gl.DYNAMIC_DRAW);
    const posAttribute=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(posAttribute);gl.vertexAttribPointer(posAttribute,2,gl.FLOAT,false,0,0);
    const uvBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffer);gl.bufferData(gl.ARRAY_BUFFER,uv,gl.STATIC_DRAW);
    const uvAttribute=gl.getAttribLocation(program,'uv');gl.enableVertexAttribArray(uvAttribute);gl.vertexAttribPointer(uvAttribute,2,gl.FLOAT,false,0,0);
    const indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
    const viewport=gl.getUniformLocation(program,'viewport'),textures=new Map();gl.uniform1i(gl.getUniformLocation(program,'picture'),0);
    gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
    const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
    return {
      draw(ctx,image,x,floor,scale,p){
        if(lost)return false;
        const ratio=ctx.getTransform().a,width=ctx.canvas.width/ratio,height=ctx.canvas.height/ratio;
        const dpr=Math.min(ratio,1.5),cw=Math.max(1,Math.round(width*dpr)),ch=Math.max(1,Math.round(height*dpr));
        if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;gl.viewport(0,0,cw,ch);}
        gl.useProgram(program);gl.uniform2f(viewport,width,height);
        let t=textures.get(image);
        if(!t){
          if(textures.size>=6){const [key,value]=textures.entries().next().value;gl.deleteTexture(value);textures.delete(key);}
          t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
          let source=image;const k=Math.min(1,1024/Math.max(image.width,image.height));
          if(k<1){source=document.createElement('canvas');source.width=Math.round(image.width*k);source.height=Math.round(image.height*k);source.getContext('2d').drawImage(image,0,0,source.width,source.height);}
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);textures.set(image,t);
        }else gl.bindTexture(gl.TEXTURE_2D,t);
        const w=image.width,h=image.height,cos=Math.cos(p.lean),sin=Math.sin(p.lean);
        for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
          const u=i/cols,v=j/rows,lower=smooth((v-.57)/.4),left=1-smooth((u-.4)/.2);
          const dx=(p.bend*Math.sin(v*Math.PI)+p.step*Math.sin(v*Math.PI*2)*lower)*h;
          const dy=-(p.leftFoot*left+p.rightFoot*(1-left))*lower*h+p.lift*lower*h;
          const px=(u*w-w/2+dx)*scale,py=(v*h-h+dy)*scale,n=(j*(cols+1)+i)*2;
          positions[n]=x+px*cos-py*sin;positions[n+1]=floor-h*scale*p.lift+px*sin+py*cos;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER,posBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,positions);gl.vertexAttribPointer(posAttribute,2,gl.FLOAT,false,0,0);
        gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
        ctx.drawImage(canvas,0,0,width,height);return true;
      }
    };
  }
  window.RR_MESH=Object.freeze({draw(...args){
    if(failed)return false;
    try{if(!device){device=create();if(!device){failed=true;return false;}}return device.draw(...args);}catch{failed=true;return false;}
  }});
})();
