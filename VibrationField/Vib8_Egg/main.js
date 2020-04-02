// 主程序
var A0; // 0-order 
var A1; // 1-order

// 细胞阵列的更新
var K; // elastic factors
var R;
var Decay;

var w = 200;
var h = 200;
var dt = 0.05;
var F0,F1;
var stirPower = 200;
var n0 = 8;
var n1 = 5;

function setup() {
	createCanvas(w,h);
	A0 = CreateCellArray(w,h);
	A0[40][30] = stirPower;
	A1 = CreateCellArray(w,h);
	K = CreateCellArray(w,h);
	K = ApplyCells_Value(K,n0);
	F0 = createVector(50,100);
	F1 = createVector(150,100);
	var m = 1;
	var n = 2;
	//print("F0:" + F0);
	K = InitF_Egg(F0,F1,m,n,0,230,n1,n1,K);
	R = CreateCellArray(w,h);
	R = ApplyCells_Value(R,n0);
	R = InitF_Egg(F0,F1,m,n,0,230,n1,n1,R);
	Decay = CreateCellArray(w,h);
	Decay = ApplyCells_Value(Decay,0.999);
	Decay = ApplyValueToBound(Decay,10,0.95);
}

// 函数draw()：作画阶段
var LastBDispT = 0.0;
function draw() {
	fill(255);// 填充白色
	//rect(-1,-1,width+2,height+2);

	var tNow = millis()/1000;
	var passedT = tNow - LastBDispT;
	if(passedT>0.1)
	{
		drawA_Points(A0,-0.1,0.1);
		LastBDispT = tNow;
	}

	for(var i=0;i<20;i++)
	{
		Step(dt);
	}

	fill(255,0,0)
	stroke(255,0,0);
	ellipse(F0.x,F0.y,5,5);
	ellipse(F1.x,F1.y,5,5);
}

function mousePressed()
{
	A0[mouseX][mouseY] = stirPower;
}


