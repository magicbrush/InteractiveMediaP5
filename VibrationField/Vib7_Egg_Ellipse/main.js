// 主程序
var A0; // 0-order 
var A1; // 1-order

// 细胞阵列的更新
var K; // elastic factors
var R;

var w = 200;
var h = 200;
var dt = 0.05;

var F0,F1;

function setup() {
	createCanvas(w,h);
	A0 = CreateCellArray(w,h);
	A0[50][100] = 100;
	A1 = CreateCellArray(w,h);
	K = CreateCellArray(w,h);
	K = ApplyCells_Value(K,1);
	F0 = createVector(50,100);
	F1 = createVector(150,100);
	var m = 1;
	var n = 1;
	//print("F0:" + F0);
	K = InitF_Egg(F0,F1,m,n,0,150,6,6,K);
	R = CreateCellArray(w,h);
	R = ApplyCells_Value(R,1);
	R = InitF_Egg(F0,F1,m,n,0,150,6,6,R);
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


