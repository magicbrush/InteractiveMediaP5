var B;
var E;
var DE;
var w = 200;
var h = 200;
var a = 0.02;
var b = 0.02;

var P;
var PColor;
var PNum = 500;
var dt = 0.05;
var k = 1;
var tNow = 0;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(w,h);

	// Init B and E
	B = CreateValueArray(w,h);
	B = InitValueArray_SinThetaSinRadius(B,a,b,0.15,3);
	E = CreateVector2Array(w,h);
	//E = InitVec2Array_RTheta(E,0.1,0.1,0.15,3);
	DE = CreateVector2Array(w,h);

	P = new Array();
	PColor = new Array();
	for(var i=0;i<PNum;i++)
	{
		var px = random(0,w);
		var py = random(0,h);
		P[i] = createVector(px,py);
		PColor[i] = color(random(0,255),random(0,255),random(0,255),30);
		//PColor[i] = color(random(200,255),random(200,255),random(200,255),50);
		//PColor[i] = color(random(0,25),random(0,25),random(0,25),50);
	}	

	tNow = GetTimeNow();
}

// 函数draw()：作画阶段
function draw() {
	fill(255,2);// 填充白色
	rect(-1,-1,width+2,height+2);
	//ellipse(100,100,200,200); // 画圆形

	P = MoveParticleByE(P,E,100*dt);

	DE = CalDEbyB(B,DE,k);
	B = StepB2(B);
	E = StepE(E,DE,dt);

	drawParticleArray(P,PColor,5);
	var res = 16;
	//drawValueArray(B,res,0.5,0.15);
	//drawVec2Array(E,res,0.0,0.66,color(0,0,0,125));	
	//drawVec2Array(DE,res,0.0,0.5,color(0,200,0,200));	
}