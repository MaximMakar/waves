(() => {
  const cnv = document.querySelector('canvas');
  const ctx=cnv.getContext('2d');
  

  function init(){
    cnv.width =  innerWidth;
    cnv.height = innerHeight;
  }

init();


const numberOfRings=5;
const ringRadiusOffset=8;
let ringRadius =200;
const waveOffset=22;
let startAngle=0;
let colors=[];
let runflag=0;
let centerX=cnv.width/2;
let centerY=cnv.height/2;


function updatePlace(){
  if (runflag==1){
    centerX=mx;
    centerY=my;
  }
  else{
    runflag=0;
  }
}


function generateColors(){
   for (let j=0; j<numberOfRings; j++){
      colors[j]='#' + (Math.random() * Math.pow(256, 3) | 0).toString(16).padStart(6, '0');
  }
}



cnv.onmousedown = e => {
   generateColors();
      runflag+=1;
   }

 cnv.onmousemove = e => {
    mx=e.x - cnv.getBoundingClientRect().x;
    my=e.y - cnv.getBoundingClientRect().y;
   }
 
  

 function updateRings(){
    for(let j=0;  j<numberOfRings; j++){
       let radius=j*ringRadiusOffset+ringRadius;
       let offsetAngle=j*waveOffset*Math.PI/180;
       drawRing(radius, colors[j], offsetAngle,centerX,centerY );
  }
  startAngle>=360 ? startAngle=0: startAngle++;
 }



let maxVawesAmplitude=17;
let numberOfvawes=9;

function drawRing(radius, color, offsetAngle, centerX, centerY) {
  ctx.strokeStyle=color;
  ctx.lineWidth=5;

  ctx.beginPath();
  
  for(let j=-180;j<180;j++){
    let currentAngle=(j+startAngle)*Math.PI/180;
    let displacement=0;
    let now=Math.abs(j);

    if (now>70){
      displacement=(now-70)/70;
    }
    if (displacement>=1){
      displacement=1;
    }


    let waveAmplitude =radius+displacement*Math.sin((currentAngle+offsetAngle)*numberOfvawes)*maxVawesAmplitude;
    let x=centerX+Math.cos(currentAngle)*waveAmplitude;
    let y=centerY+Math.sin(currentAngle)*waveAmplitude;
    j>-180  ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

  function loop() {
    cnv.width |= 0; 
    updatePlace();
    updateRings();
    requestAnimationFrame(loop);
  }

  loop();

window.addEventListener('resize', init);

})();