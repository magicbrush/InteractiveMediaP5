
function renderTrace_Line(Tr)
{
	// 渲染风格1-无粗细变化的轨迹
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
	// 渲染风格2——贴图
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