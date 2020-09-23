var L;
var LineWd = 2.0;
var LLength = 0;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(400,200);
	L = createBaseLine();
	LLength = ComputeLineLength(L);

	//drawLine();
}


// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,255);
	rect(-1,-1,2*width,2*height);

	drawLine();
	//ellipse(width/2,height/2,50,50);
}

function drawLine()
{
	strokeWeight(LineWd);

	push();
	strokeWeight(LineWd);
	// 正弦
	//lineSin(L,LLength,0.033,5,0);
	//lineSin(L,LLength,0.1,5,0);
	//lineSin(L,LLength,0.033,15,0);
	//lineSin(L,LLength,0.1,15,0);

	// 双正弦
	//lineSinSin(L,LLength,0.1,2,0,20,0);
	//lineSinSin(L,LLength,0.1,2,0,60,0);
	//lineSinSin(L,LLength,0.04,2,0,20,0);
	//lineSinSin(L,LLength,0.04,2,0,60,0);

	// 噪声
	//lineNoise(L,LLength,0.1,3.3,0);
	//lineNoise(L,LLength,0.03,3.3,0);
	//lineNoise(L,LLength,0.1,10,0);
	//lineNoise(L,LLength,0.03,10,0);
	//lineNoise(L,LLength,0.1,30,0);
	lineNoise(L,LLength,0.03,30,0);
	
	
	// 随机干扰
	//lineRand(L,LLength,-2,2,5000);
	//lineRand(L,LLength,-10,10,5000);
	//lineRand(L,LLength,-20,20,5000);
	//lineRand(L,LLength,-2,2,50);
	//lineRand(L,LLength,-10,10,50);
	//lineRand(L,LLength,-20,20,50);

	// 圆形
	//lineHalfCirc(L,LLength,LLength/14,-0.4);
	//lineHalfCirc(L,LLength,LLength/14,-1);
	//lineHalfCirc(L,LLength,LLength/14,0.4);
	//lineHalfCirc(L,LLength,LLength/14,1);
	//lineHalfCirc(L,LLength,LLength/40,-0.4);
	//lineHalfCirc(L,LLength,LLength/40,-1);
	//lineHalfCirc(L,LLength,LLength/40,0.4);
	//lineHalfCirc(L,LLength,LLength/40,1);

	// 三角波
	//lineTriangle(L,LLength,LLength/10,-1.5,1);
	//lineTriangle(L,LLength,LLength/10,-0.5,1);
	//lineTriangle(L,LLength,LLength/30,-4.5,1);
	//lineTriangle(L,LLength,LLength/30,-1.5,1);
	
	// 三角曲线波
	//lineTriangle(L,LLength,LLength/10,-1.5,2);
	//lineTriangle(L,LLength,LLength/10,-0.5,2);
	//lineTriangle(L,LLength,LLength/30,-4.5,2);
	//lineTriangle(L,LLength,LLength/30,-1.5,2);

	// 锯齿波
	//lineSaw(L,LLength,LLength/20,-3,1);
	//lineSaw(L,LLength,LLength/20,-3,2.5);
	//lineSaw(L,LLength,LLength/20,-3,0.4);
	//lineSaw(L,LLength,LLength/20,-1,1);
	//lineSaw(L,LLength,LLength/20,-1,2.5);
	//lineSaw(L,LLength,LLength/20,-1,0.4);
	
	// 矩形波
	//lineRect(L,LLength,LLength/20,1,0.8);
	//lineRect(L,LLength,LLength/20,1,0.5);
	//lineRect(L,LLength,LLength/20,1,0.2);
	//lineRect(L,LLength,LLength/20,0.3,0.8);
	//lineRect(L,LLength,LLength/20,0.3,0.5);
	//lineRect(L,LLength,LLength/20,0.3,0.2);

	//云状波
	//lineCloud(L,LLength,20,0.1);
	//lineCloud(L,LLength,20,0.05);
	//lineCloud(L,LLength,-20,0.1);
	//lineCloud(L,LLength,-20,0.05);
	//lineCloud(L,LLength,50,0.03);
	//lineCloud(L,LLength,50,0.015);
	//lineCloud(L,LLength,-50,0.03);
	//lineCloud(L,LLength,-50,0.015);

	// 噪声位移
	//lineNoiseOffset(L,LLength,0.05,20,0);
	//lineNoiseOffset(L,LLength,0.15,20,0);
	//lineNoiseOffset(L,LLength,0.05,80,0);
	//lineNoiseOffset(L,LLength,0.15,80,0);

	// 随机位移
	//lineRandomOffset(L,LLength,0.025);
	//lineRandomOffset(L,LLength,0.05);
	//lineRandomOffset(L,LLength,0.1);

	// 特殊云状
	//lineCloudXY(L,LLength,40,20,0.03);
	//lineCloudXY(L,LLength,60,20,0.04);
	//lineCloudXY(L,LLength,60,10,0.03);
	//lineCloudXY(L,LLength,60,21,0.04);
	//lineCloudXY(L,LLength,100,40,0.03);
	//lineCloudXY(L,LLength,100,60,0.03);
	//lineCloudXY(L,LLength,100,70,0.03);
	//lineCloudXY(L,LLength,100,80,0.03);
	//lineCloudXY(L,LLength,100,90,0.03);
	//lineCloudXY(L,LLength,10,100,0.03);
	//lineCloudXY(L,LLength,21.5,100,0.03);
	//lineCloudXY(L,LLength,26,100,0.03);
	//lineCloudXY(L,LLength,38,100,0.03);
	//lineCloudXY(L,LLength,40,100,0.03);
	//lineCloudXY(L,LLength,50,100,0.03);
	//lineCloudXY(L,LLength,60,100,0.03);
	//lineCloudXY(L,LLength,90,100,0.03);
	

	// Sin+Sin
	//lineSinPSin(L,LLength,0.1,5,0,0.01,50,0);
	//lineSinPSin(L,LLength,0.1,5,0,0.033,50,0);
	//lineSinPSin(L,LLength,0.1,5,0,0.1,50,0);
	//lineSinPSin(L,LLength,0.04,5,0,0.01,20,0);
	//lineSinPSin(L,LLength,0.04,5,0,0.033,20,0);
	//lineSinPSin(L,LLength,0.04,5,0,0.1,20,0);

	// SinNoise
	//lineSinNoise(L,LLength,0.2,1.5,0,200,0);
	//lineSinNoise(L,LLength,0.2,1.5,0,25,0);
	//lineSinNoise(L,LLength,0.08,1.5,0,200,0);
	//lineSinNoise(L,LLength,0.08,1.5,0,25,0);
	//lineSinNoise(L,LLength,0.2,3,0,50,0);
	//lineSinNoise(L,LLength,0.08,3,0,50,0);

	pop();
	
}