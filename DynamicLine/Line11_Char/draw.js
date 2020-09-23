
function drawFace(ctrX,ctrY,Scale,type)
{
	push();
	strokeWeight(2);
	var lx = ctrX - 50*Scale;
	var ly = ctrY - 20*Scale;
	ellipse(lx,ly,50,50);
	fill(0);
	ellipse(lx,ly+5,30,30);

	var rx = ctrX + 50*Scale;
	var ry = ctrY - 20*Scale;
	fill(255)
	ellipse(rx,ry,50,50);
	fill(0);
	ellipse(rx,ry+5,30,30);

	var mx = ctrX;
	if(type=="Smile")
	{
		var my = ctrY+30;
		arc(mx,my,80*Scale,80*Scale,0,PI);
	}
	else if(type=="Sad")
	{
		var my = ctrY+60;
		arc(mx,my,80*Scale,80*Scale,PI,TWO_PI);
	}
	else if(type=="Surprise")
	{
		var my = ctrY+40;
		ellipse(mx,my,50*Scale,80*Scale);
	}
	pop();
}


function drawMovingBallAtSpd(speed,tBias)
{
	var t = fract(speed*millis()/5000);
	push();
	stroke(0);
	fill(0);
	drawMovingBall(LD,t+tBias,8);
	pop();
}

function drawMovingBall(LD,t,ballSize)
{
	var vtId = lerp(0,LD.length-1,t);

	var id0 = floor(vtId);
	var id1 = id0 +1;
	var idt = vtId - id0;
	if(id1>=LD.length-1)
	{
		id1 = 0;
	}
	var V0 = LD[id0];
	var V1 = LD[id1];

	//idt = 0.5;
	var Pos = Vector.lerp(V0,V1,idt);
	ellipse(Pos.x,Pos.y,ballSize,ballSize);
}

function drawLD(LD,vtBias,bClose)
{
	push();
	strokeWeight(LineWd);
	stroke(0);
	for(var i=vtBias;i<LD.length-vtBias+1;i++)
	{
		var v0 = LD[i-1];
		var v1 = LD[i];
		line(v0.x,v0.y,v1.x,v1.y);
		//print(v0);
	}
	if(bClose)
	{
		var v0 = LD[LD.length-vtBias];
		var v1 = LD[vtBias];
		line(v0.x,v0.y,v1.x,v1.y);
	}
	pop();
}

function drawLD_Arrow(LD,vtBias,tgtPos)
{
	push();
	strokeWeight(LineWd);
	stroke(0);
	for(var i=vtBias;i<LD.length-vtBias+1;i++)
	{
		var v0 = LD[i-1];
		var v1 = LD[i];
		line(v0.x,v0.y,v1.x,v1.y);
		//print(v0);
	}
	var v0 = LD[LD.length-vtBias];
	line(v0.x,v0.y,tgtPos.x,tgtPos.y);
	var v1 = LD[vtBias-1];
	line(tgtPos.x,tgtPos.y,v1.x,v1.y);
	pop();
}