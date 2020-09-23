var L;
var LD;
var VtNum = 512;
var LineWd = 2.0;
var LLength = 0;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(400,400);
	//L = createBaseLine_Hor(VtNum);
	L = createBaseLine_Ring(VtNum,width/2,height/2,120, 0);
	LLength = ComputeLineLength(L);
	LD = GenLD();
}


// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,45);
	rect(-1,-1,2*width,2*height);

	// 端点断开
	//drawLD(LD,2,false);

	// 端点相连
	drawLD(LD,2,true);

	// 对白气泡
	//drawLD_Arrow(LD,12,new Vector(width/2,height-10,0));

	// 移动的小球
	//drawMovingBallAtSpd(1);
	//drawMovingBallAtSpd(1,0);
	//drawMovingBallAtSpd(0.33,0.5);
	
	//ellipse(width/2,height/2,50,50);
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
	var v0 = LD[LD.length-vtBias+1];
	line(v0.x,v0.y,tgtPos.x,tgtPos.y);
	var v1 = LD[vtBias-1];
	line(tgtPos.x,tgtPos.y,v1.x,v1.y);
	pop();
}

function GenLD()
{
	// 正弦
	//var L2 = genLineSin(L,LLength,0.0165,5,0);
	//var L2 = genLineSin(L,LLength,0.05,5,0);
	//var L2 = genLineSin(L,LLength,0.0165,15,0);
	//var L2 = genLineSin(L,LLength,0.05,15,0);

	// 双正弦
	//var L2 = genLineSinSin(L,LLength,0.05,2,0,20,0);
	//var L2 = genLineSinSin(L,LLength,0.05,2,0,60,0);
	//var L2 = genLineSinSin(L,LLength,0.02,2,0,20,0);
	//var L2 = genLineSinSin(L,LLength,0.02,2,0,60,0);

	// 噪声
	//var L2 = genLineNoise(L,LLength,0.05,3.3,0);
	//var L2 = genLineNoise(L,LLength,0.015,3.3,0);
	//var L2 = genLineNoise(L,LLength,0.05,10,0);
	//var L2 = genLineNoise(L,LLength,0.015,10,0);
	//var L2 = genLineNoise(L,LLength,0.05,30,0);
	//var L2 = genLineNoise(L,LLength,0.015,30,0);

	// 随机干扰
	//var L2 = genLineRand(L,LLength,-2,2,5000);
	//var L2 = genLineRand(L,LLength,-10,10,5000);
	//var L2 = genLineRand(L,LLength,-20,20,5000);
	//var L2 = genLineRand(L,LLength,-2,2,50);
	//var L2 = genLineRand(L,LLength,-10,10,50);
	//var L2 = genLineRand(L,LLength,-20,20,50);


	// 圆形
	//var L2 = genLineHalfCirc(L,LLength,LLength/28,-0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/28,-1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/28,0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/28,1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/80,-0.4);
	var L2 = genLineHalfCirc(L,LLength,LLength/80,-1);
	//var L2 = genLineHalfCirc(L,LLength,LLength/80,0.4);
	//var L2 = genLineHalfCirc(L,LLength,LLength/80,1);


	// 三角波
	//var L2 = genLineTriangle(L,LLength,LLength/20,-1.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/20,-0.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/60,-4.5,1);
	//var L2 = genLineTriangle(L,LLength,LLength/60,-1.5,1);

	// 三角曲线波
	//var L2 = genLineTriangle(L,LLength,LLength/20,-1.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/20,-0.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/60,-4.5,2);
	//var L2 = genLineTriangle(L,LLength,LLength/60,-1.5,2);

	// 锯齿波
	//var L2 = genLineSaw(L,LLength,LLength/40,-3,1);
	//var L2 = genLineSaw(L,LLength,LLength/40,-3,2.5);
	//var L2 = genLineSaw(L,LLength,LLength/40,-3,0.4);
	//var L2 = genLineSaw(L,LLength,LLength/40,-1,1);
	//var L2 = genLineSaw(L,LLength,LLength/40,-1,2.5);
	//var L2 = genLineSaw(L,LLength,LLength/40,-1,0.4);

	// 矩形波
	//var L2 = genLineRect(L,LLength,LLength/40,1,0.8);
	//var L2 = genLineRect(L,LLength,LLength/40,1,0.5);
	//var L2 = genLineRect(L,LLength,LLength/40,1,0.2);
	//var L2 = genLineRect(L,LLength,LLength/40,0.3,0.8);
	//var L2 = genLineRect(L,LLength,LLength/40,0.3,0.5);
	//var L2 = genLineRect(L,LLength,LLength/40,0.3,0.2);


	//云状波
	//var L2 = genLineCloud(L,LLength,20,0.05);
	//var L2 = genLineCloud(L,LLength,20,0.025);
	//var L2 = genLineCloud(L,LLength,-20,0.05);
	//var L2 = genLineCloud(L,LLength,-20,0.025);
	//var L2 = genLineCloud(L,LLength,50,0.015);
	//var L2 = genLineCloud(L,LLength,50,0.0075);
	//var L2 = genLineCloud(L,LLength,-50,0.015);
	//var L2 = genLineCloud(L,LLength,-50,0.0075);

	// 噪声位移
	//var L2 = genLineNoiseOffset(L,LLength,0.025,20,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.0075,20,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.025,80,0);
	//var L2 = genLineNoiseOffset(L,LLength,0.0075,80,0);

	// 随机位移
	//var L2 = genLineRandomOffset(L,LLength,0.0125);
	//var L2 = genLineRandomOffset(L,LLength,0.025);
	//var L2 = genLineRandomOffset(L,LLength,0.05);


	// 特殊云状
	//var L2 = genLineCloudXY(L,LLength,20,20,0.03);
	//var L2 = genLineCloudXY(L,LLength,30,20,0.04);
	//var L2 = genLineCloudXY(L,LLength,30,10,0.03);
	//var L2 = genLineCloudXY(L,LLength,30,21,0.04);
	//var L2 = genLineCloudXY(L,LLength,50,40,0.03);
	//var L2 = genLineCloudXY(L,LLength,50,60,0.03);
	//var L2 = genLineCloudXY(L,LLength,50,70,0.03);
	//var L2 = genLineCloudXY(L,LLength,50,80,0.03);
	//var L2 = genLineCloudXY(L,LLength,50,90,0.03);
	//var L2 = genLineCloudXY(L,LLength,5,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,10.75,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,13,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,19,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,20,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,25,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,30,100,0.03);
	//var L2 = genLineCloudXY(L,LLength,45,100,0.03);

	// Sin+Sin
	//var L2 = genLineSinPSin(L,LLength,0.05,5,0,0.005,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.05,5,0,0.033,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.05,5,0,0.05,50,0);
	//var L2 = genLineSinPSin(L,LLength,0.02,5,0,0.005,20,0);
	//var L2 = genLineSinPSin(L,LLength,0.02,5,0,0.0165,20,0);
	//var L2 = genLineSinPSin(L,LLength,0.02,5,0,0.05,20,0);

	// SinNoise
	//var L2 = genLineSinNoise(L,LLength,0.1,1.5,0,200,0);
	//var L2 = genLineSinNoise(L,LLength,0.1,1.5,0,25,0);
	//var L2 = genLineSinNoise(L,LLength,0.04,1.5,0,200,0);
	//var L2 = genLineSinNoise(L,LLength,0.04,1.5,0,25,0);
	//var L2 = genLineSinNoise(L,LLength,0.1,3,0,50,0);
	//var L2 = genLineSinNoise(L,LLength,0.04,3,0,50,0);

	return L2;
}



