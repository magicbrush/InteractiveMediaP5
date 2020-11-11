var Traces;
function setup() {
  // put setup code here
  createCanvas(400,500);
  //line_rand_0011(50,150,350,150,5,100);
  Traces = new Array();
}

function draw() {
	fill(255,100);
	rect(-1,-1,width+2,height+2);
  
  	// 线条轨迹变化
  	Traces[0] = lineAry_rand_0011(
		50,50,350,50,0.1*mouseY,100);
	Traces[1] = lineAry_roll_0011(
		50,100,350,100,0.1*mouseY,mouseX,300);
	Traces[2]= lineAry_noise_0011(
		50,150,350,150,0.1*mouseY,0.1*mouseX,200);
	
	// 将轨迹渲染出来
	for(var i=0;i<3;i++)
	{
		// 渲染方式1:简单线条
		renderTrace_Line(Traces[i]);
		// 渲染方式2:一组脸
		//renderTrace2_Sprites(
		//	Traces[i],0.025,drawStdFace,0.2);
		// 渲染方式3:一个移动sprite
		//renderTrace2_MovingSprite(
		//	Traces[i],1,0.5,drawStdFace,0.2);
		// 渲染方式4:一组移动的sprite
		renderTrace3_MovingSprites(
			Traces[i],0.1,0.5,0.05,drawStdFace,0.1);
	}
	
}

function renderTrace_Line(Tr)
{
	for(var i=1;i<Tr.length;i++)
	{
		var P0 = Tr[i-1];
		var P1 = Tr[i];
		line(P0.x,P0.y,P1.x,P1.y);
	}
}

function renderTrace2_Sprites(
	Tr,tStep,SpriteFcn,Scale)
{
	for(var t=0;t<1;t+=tStep)
	{
		renderSpriteOnTrace(
			Tr,t,SpriteFcn,Scale);
	}
}

function renderTrace2_MovingSprite(
	Tr,tSpd,tBias,SpriteFcn,Scale)
{
	var tNow = tSpd * millis()/1000 + tBias;
	tNow = tNow - floor(tNow);
	//print(tNow);
	renderSpriteOnTrace(
		Tr,tNow,SpriteFcn,Scale);
}


function renderTrace3_MovingSprites(
	Tr,tSpd,tBias,tStep,SpriteFcn,Scale)
{
	for(t0=0;t0<1;t0+=tStep)
	{
		renderTrace2_MovingSprite(
			Tr,tSpd,tBias+t0,SpriteFcn,Scale);
	}
}

function renderSpriteOnTrace(
	Tr,t,SpriteFcn,Scale)
{
	idt = t*Tr.length;
	id0 = floor(idt);
	id1 = id0+1;
	tt = (idt-id0);

	var P0 = Tr[id0];
	var P1 = Tr[id1];
	var p = p5.Vector.lerp(P0,P1,tt);
		
	push();
	translate(p.x,p.y);
	scale(Scale,Scale);
	strokeWeight(2/Scale);
	ellipse(0,0,100,100);
	pop();
}
