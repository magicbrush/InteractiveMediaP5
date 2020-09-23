var L;
var LD;
var VtNum = 512;
var LineWd = 2.0;
var LLength = 0;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(400,200);
	L = createBaseLine_Hor(VtNum);
	//L = createBaseLine_Ring(VtNum,width/2,height/2,50, 1.68);
	LLength = ComputeLineLength(L);
	LD = GenLD();
}


// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,255);
	rect(-1,-1,2*width,2*height);

	// 端点断开
	//drawLD(LD,2,false);

	// 端点相连
	//drawLD(LD,1,true);

	// 对白气泡
	//drawLD_Arrow(LD,12,new Vector(width/2,height-10,0));

	// 移动的小球
	//drawMovingBallAtSpd(1);
	drawMovingBallAtSpd(0.33,0,1);
	//drawMovingBallAtSpd(0.16,0,1);
	//drawMovingBall(LD,pt,8,cr);
	
	//ellipse(width/2,height/2,50,50);
}


function drawMovingBallAtSpd(speed,tBias,dtOnSpeed)
{
	var t = fract(speed*millis()/5000);
	push();
	stroke(0);
	//fill(0);
	var dDt = 0.0005*dtOnSpeed;
	var pt = 0;
	var tMax = 0.03;
	var ballDiameter = 5;
	for(var dt =0;dt<tMax;dt+=dDt)
	{
		var deltaT = dt + tBias;
		var pt = t+deltaT;
		pt = constrain(pt,0,1);
		var alpha = pow(dt,0.5)*255;
		var cr = color(0,0,0,alpha);
		//color(0,0,0,30/speed)
		drawMovingBall(LD,pt,deltaT*ballDiameter/tMax,cr);
	}
	drawMovingBall(LD,pt,ballDiameter,color(0,0,0,255));
	pop();
}

function drawMovingBall(LD,t,ballSize,cr)
{
	var vtId = lerp(0,LD.length-1,t);

	var id0 = floor(vtId);
	var id1 = id0 +1;
	var idt = vtId - id0;
	noStroke();
	fill(cr);
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
	var v0 = LD[LD.length-vtBias+1];
	line(v0.x,v0.y,tgtPos.x,tgtPos.y);
	var v1 = LD[vtBias-1];
	line(tgtPos.x,tgtPos.y,v1.x,v1.y);
	pop();
}

function GenLD()
{
	// 正弦
	//var L2 = genLineSin(L,LLength,0.033,5,0);
	//var L2 = genLineSin(L,LLength,0.1,5,0);
	//var L2 = genLineSin(L,LLength,0.033,15,0);
	//var L2 = genLineSin(L,LLength,0.1,15,0);

	// 双正弦
	//var L2 = genLineSinSin(L,LLength,0.1,2,0,20,0);
	//var L2 = genLineSinSin(L,LLength,0.1,2,0,60,0);
	//var L2 = genLineSinSin(L,LLength,0.04,2,0,20,0);
	//var L2 = genLineSinSin(L,LLength,0.04,2,0,60,0);

	// 噪声
	//var L2 = genLineNoise(L,LLength,0.1,3.3,0);
	//var L2 = genLineNoise(L,LLength,0.03,3.3,0);
	//var L2 = genLineNoise(L,LLength,0.1,10,0);
	//var L2 = genLineNoise(L,LLength,0.03,10,0);
	//var L2 = genLineNoise(L,LLength,0.1,30,0);
	//var L2 = genLineNoise(L,LLength,0.03,30,0);

	// 随机干扰
	//var L2 = genLineRand(L,LLength,-2,2,5000);
	//var L2 = genLineRand(L,LLength,-10,10,5000);
	//var L2 = genLineRand(L,LLength,-20,20,5000);
	//var L2 = genLineRand(L,LLength,-2,2,50);
	//var L2 = genLineRand(L,LLength,-10,10,50);
	//var L2 = genLineRand(L,LLength,-20,20,50);


	// 圆形
	//var L2 = genLineHalfCirc(L,LLength,LLength/14,-0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/14,-1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/14,0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/14,1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/40,-0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/40,-1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/40,0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/40,1);


	// 三角波
	//var L2 = genLineTriangle(L,LLength,LLength/10,-1.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/10,-0.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/30,-4.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/30,-1.5,1);

	// 三角曲线波
	//var L2 = genLineTriangle(L,LLength,LLength/10,-1.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/10,-0.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/30,-4.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/30,-1.5,2);

	// 锯齿波
	//var L2 = genLineSaw(L,LLength,LLength/20,-3,1);
	//var L2 = genLineSaw(L,LLength,LLength/20,-3,2.5);
	//var L2 = genLineSaw(L,LLength,LLength/20,-3,0.4);
	//var L2 = genLineSaw(L,LLength,LLength/20,-1,1);
	//var L2 = genLineSaw(L,LLength,LLength/20,-1,2.5);
	//var L2 = genLineSaw(L,LLength,LLength/20,-1,0.4);

	// 矩形波
	//var L2 = genLineRect(L,LLength,LLength/20,1,0.8);
	//var L2 = genLineRect(L,LLength,LLength/20,1,0.5);
	//var L2 = genLineRect(L,LLength,LLength/20,1,0.2);
	//var L2 = genLineRect(L,LLength,LLength/20,0.3,0.8);
	//var L2 = genLineRect(L,LLength,LLength/20,0.3,0.5);
	//var L2 = genLineRect(L,LLength,LLength/20,0.3,0.2);


	//云状波
	//var L2 = genLineCloud(L,LLength,20,0.1);
	//var L2 = genLineCloud(L,LLength,20,0.05);
	//var L2 = genLineCloud(L,LLength,-20,0.1);
	//var L2 = genLineCloud(L,LLength,-20,0.05);
	//var L2 = genLineCloud(L,LLength,50,0.03);
	//var L2 = genLineCloud(L,LLength,50,0.015);
	//var L2 = genLineCloud(L,LLength,-50,0.03);
	//var L2 = genLineCloud(L,LLength,-50,0.015);

	// 噪声位移
	//var L2 = genLineNoiseOffset(L,LLength,0.05,20,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.15,20,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.05,80,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.15,80,0);

	// 随机位移
	//var L2 = genLineRandomOffset(L,LLength,0.025);
	//var L2 = genLineRandomOffset(L,LLength,0.05);
	//var L2 = genLineRandomOffset(L,LLength,0.1);


	// 特殊云状
	//var L2 = genLineCloudXY(L,LLength,40,20,0.03);
	//var L2 = genLineCloudXY(L,LLength,60,20,0.04);
	//var L2 = genLineCloudXY(L,LLength,60,10,0.03);
	//var L2 = genLineCloudXY(L,LLength,60,21,0.04);
	//var L2 = genLineCloudXY(L,LLength,100,40,0.03);
	//var L2 = genLineCloudXY(L,LLength,100,60,0.03);
	//var L2 = genLineCloudXY(L,LLength,100,70,0.03);
	//var L2 = genLineCloudXY(L,LLength,100,80,0.03);
	//var L2 = genLineCloudXY(L,LLength,100,90,0.03);
	//var L2 = genLineCloudXY(L,LLength,10,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,21.5,100,0.03);
	var L2 = genLineCloudXY(L,LLength,26,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,38,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,40,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,50,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,60,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,90,100,0.03);

	// Sin+Sin
	//var L2 = genLineSinPSin(L,LLength,0.1,5,0,0.01,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.1,5,0,0.033,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.1,5,0,0.1,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.04,5,0,0.01,20,0);
	//var L2 = genLineSinPSin(L,LLength,0.04,5,0,0.033,20,0);
	//var L2 = genLineSinPSin(L,LLength,0.04,5,0,0.1,20,0);

	// SinNoise
	//var L2 = genLineSinNoise(L,LLength,0.2,1.5,0,200,0);
	//var L2 = genLineSinNoise(L,LLength,0.2,1.5,0,25,0);
	//var L2 = genLineSinNoise(L,LLength,0.08,1.5,0,200,0);
	//var L2 = genLineSinNoise(L,LLength,0.08,1.5,0,25,0);
	//var L2 = genLineSinNoise(L,LLength,0.2,3,0,50,0);
	//var L2 = genLineSinNoise(L,LLength,0.08,3,0,50,0);

	return L2;
}



