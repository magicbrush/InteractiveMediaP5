var B0;
var BDelta;
var BFromE;
var BSum;

var E;
var EDelta;

var w = 200;
var h = 200;
var a = 0.02;
var b = 0.02;

var P;
var PColor;
var PNum = 300;
var dt = 0.1;
var k = 0.2;
var s = 10;
var tNow = 0;

var bShowField = true;


// 函数setup() ：准备阶段
function setup() {
	createCanvas(w,h);

	InitB();
	InitE();
	InitParticles();

	tNow = GetTimeNow();
}

function InitB()
{
	// Init B and E
	B0 = CreateValueArray(w,h,0);
	B0 = InitValueArray_SinThetaSinRadius(B0,a,b,1.5,3);
	BDelta = CreateValueArray(w,h,0);
	BFromE = CreateValueArray(w,h,0);
	BSum = CreateValueArray(w,h,1);
}

function InitE()
{
	var v0 = createVector(0,0);
	var v1 = createVector(0.33,0.33);
	var v2 = createVector(0.2,-0.4);
	E = CreateVector2Array(w,h,v0);
	//E = InitVec2Array_RTheta(E,0.1,0.1,0.05,3);
	EDelta = CreateVector2Array(w,h,v0);	
}

function InitParticles()
{
	P = new Array();
	PColor = new Array();
	for(var i=0;i<PNum;i++)
	{
		var px = random(0,w);
		var py = random(0,h);
		P[i] = createVector(px,py);
		//PColor[i] = color(random(0,255),random(0,255),random(0,255),30);
		//PColor[i] = color(random(200,255),random(200,255),random(200,255),50);
		PColor[i] = color(random(0,25),random(0,25),random(0,25),150);
	}	
}

// 函数draw()：作画阶段
function draw() {
	fill(255,2);// 填充白色
	rect(-1,-1,width+2,height+2);
	//ellipse(100,100,200,200); // 画圆形

	for(var i=0;i<7;i++)
	{
		P = MoveParticleByE(P,E,7*dt);
	}
	

	//EfromB = CalDEbyB(B,DE,k);
	//B = StepB2(B);
	//E = StepE(E,DE,dt);

	

	
	//var ES = AddVectorArray(E,EDelta,1,1);
	Step(0.1);
	//BSum = AddValueArray(B0,BFromE,1,1);

	if(bShowField)
	{
		push();
		drawEB();
		pop();
	}

	drawParticleArray(P,PColor,7);
	
}

function drawEB()
{
	var res = 18;
	colorMode(RGB,1,1,1,1);
	var alphaB = 0.4;
	drawValueArray2(B0,res,0.5,0.5, color(1,0,0,alphaB));
	//drawValueArray2(BDelta,res+2,0.5,5, color(0,1,0,alphaB));
	drawValueArray2(BFromE,res,0.5,0.5, color(0,1,0,alphaB));
	//drawValueArray2(BSum,res,0.5,0.5, color(0,1,0,alphaB));
	
	drawVec2Array(E,res,0.0,0.66,color(0,0,0,1));	
	//drawVec2Array(EDelta,res-6,0.0,0.66,color(0,1,1,1));	
}


function keyPressed() {
	print(keyCode);
	
  if (keyCode === 65) {
    bShowField = !bShowField;
  } 
}