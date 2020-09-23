var K;
var L;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);

	CreateLine_HI(width/50,color(0,0,0));
}



// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,125);
	rect(-1,-1,2*width,2*height);
	noFill();
	strokeWeight(2);
	stroke(0);
	rect(2,2,width-4,height-4);

	var spd = 1.0;// 1,3
	var tNow = spd*millis()/1000;
	for(var i=0;i<L.length;i++)
	{
		L[i].render(tNow);
	}
	
}


function CreateLine_HI(LineWd,Cr)
{
	// 设置端点序列
	var V = new Array();
	var xMin = width/4;
	var xMax = width/2;
	var yMin = height/4;
	var yMax = 3*height/4;
    V[0] = new Vector(xMin,yMin);
	V[1] = new Vector(xMin,yMax);
	V[2] = new Vector(xMax,yMin);
	V[3] = new Vector(xMax,yMax);
	V[4] = new Vector(xMin,(yMax+yMin)/2);
	V[5] = new Vector(xMax,(yMax+yMin)/2);
	var xMin2 = 0.6*width;
	var xMax2 = 0.8*width;
	var yMin2 = 1.1*height/4;
	var yMax2 = 2.9*height/4;
	V[6] = new Vector(xMin2,yMin2);
	V[7] = new Vector(xMax2,yMin2);
	V[8] = new Vector(xMin2,yMax2);
	V[9] = new Vector(xMax2,yMax2);
	var ex = (xMin2+xMax2)/2;
	V[10] = new Vector(ex,yMin2);
	V[11] = new Vector(ex,yMax2);
	
	L = new Array();
	var res = 1;
	//var n = GetRes(V[0],V[1],res);
	//print("n:" + n);
	L[0] = DynamicLine(V[0],V[1],GetRes(V[0],V[1],res),LineWd,Cr);
	L[1] = DynamicLine(V[2],V[3],GetRes(V[0],V[1],res),LineWd,Cr);
	L[2] = DynamicLine(V[4],V[5],GetRes(V[0],V[1],res),LineWd,Cr);
	L[3] = DynamicLine(V[6],V[7],GetRes(V[0],V[1],res),LineWd,Cr);
	L[4] = DynamicLine(V[8],V[9],GetRes(V[0],V[1],res),LineWd,Cr);
	L[5] = DynamicLine(V[10],V[11],GetRes(V[0],V[1],res),LineWd,Cr);
}

function GetRes(V0,V1,res)
{
	var D = V1.subtract(V0);
	var dist = D.length();
	var vtNum = round(dist*res)+1;
	return vtNum;
}


/*
function GenLD()
{
	//var L2 = genLine_Base(L,LLength);

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
	//var L2 = genLineHalfCirc(L,LLength,LLength/80,-1);
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
}*/

/*
function InitDAFP()
{
	InitDAFPLC(L,1);

	//GenDAFP_0(0);
	//GenDAFP_1(0);
	//GenDAFP_2(0);

	//GenDAFP_VaryA_Sin5(0);
	//GenDAFP_VaryA_AbsSin5(0);
	//GenDAFP_VaryA_AbsSin5(0);

	//GenDAFP_VaryA_Noise5(0);
	//GenDAFP_VaryA_Noise50(0);
	//GenDAFP_VaryA_Noise50_PhaseSin10(0);
	//GenDAFP_ANoise50_PhaseNoise10(0);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],0.1,12,0.3);
	//DAmp[0] = GenDynamicProp_Noise(DAmp[0],0.1,10);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],0.1,36,0.5);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(
	//	DAmp[0],0.06,36,0.3);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],0.06,0.1,0.1);
	// 振幅和频率的分布
	var amp = 0.033;// 0.01 0.033 0.1
	var freq = 4; // 2,4,8
	
	//DAmp[0] = GenDynamicProp_Linear(DAmp[0],1,1,amp,1);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,10,1);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,33.3,1);
	DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,100,1);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,10,0.33);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,33.3,0.33);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,100,0.33);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,10,0.01);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,33.3,0.01);
	//DAmp[0] = GenDynamicProp_PowSin(DAmp[0],amp,100,0.01);

	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,10,1);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,33.3,1);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,100,1);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,10,0.33);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,33.3,0.33);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,100,0.33);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,10,10);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,33.3,10);
	//DAmp[0] = GenDynamicProp_PowComplementSin(DAmp[0],amp,100,10);

	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,10,1);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,33.3,1);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,100,1);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,10,10);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,33.3,10);
	//DAmp[0] = GenDynamicProp_PowComplementAbsSin(DAmp[0],amp,100,10);
	// noise
	//DAmp[0] = GenDynamicProp_Noise(DAmp[0],amp,33);
	//DAmp[0] = GenDynamicProp_Noise(DAmp[0],amp,100);
	//DAmp[0] = GenDynamicProp_Noise(DAmp[0],amp,333);
	// saw
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.33,1);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.1,1);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.033,1);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.33,10);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.1,10);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.033,10);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.33,0.33);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.1,0.33);
	//DAmp[0] = GenDynamicProp_Saw(DAmp[0],amp,0.033,0.33);

	// 频率分布
	DFreq[0] = GenDynamicProp_Linear(DFreq[0],1,1,freq,1);
	
	// 相位分布
	// 1. 线性分布
	//DPhase[0] = GenDynamicProp_Linear(DPhase[0],0,0,1);
	//DPhase[0] = GenDynamicProp_Linear(DPhase[0],0,15*TWO_PI,1);
	// 2. 正弦分布
	DPhase[0] = GenDynamicProp_PowSin(DPhase[0],5,10,1);
	//DPhase[0] = GenDynamicProp_PowSin(DPhase[0],30,10,1);
	//DPhase[0] = GenDynamicProp_PowSin(DPhase[0],5,3.3,1);
	//DPhase[0] = GenDynamicProp_PowSin(DPhase[0],30,3.3,1);
	//DPhase[0] = GenDynamicProp_PowComplementAbsSin(DPhase[0],5,10,1);
	// 3. 噪声分布
	//DPhase[0] = GenDynamicProp_Noise(DPhase[0],20,1);
	//DPhase[0] = GenDynamicProp_Noise(DPhase[0],100,1);
	//DPhase[0] = GenDynamicProp_Noise(DPhase[0],20,8);
	//DPhase[0] = GenDynamicProp_Noise(DPhase[0],100,8);
	// 4. 锯齿分布
	//DPhase[0] = GenDynamicProp_Saw(DPhase[0],1,0.25,1);
	//DPhase[0] = GenDynamicProp_Saw(DPhase[0],3,0.25,1);
	//DPhase[0] = GenDynamicProp_Saw(DPhase[0],1,0.05,1);
	//DPhase[0] = GenDynamicProp_Saw(DPhase[0],3,0.05,1);


}

*/

