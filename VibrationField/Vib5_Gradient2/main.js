// 主程序
var A0; // 0-order 
var A1; // 1-order

// 细胞阵列的更新
var K; // elastic factors
var R;

var w = 200;
var h = 200;
var dt = 0.05;

function setup() {
	createCanvas(w,h);
	A0 = CreateCellArray(w,h);
	A0[80][100] = 100;
	A1 = CreateCellArray(w,h);
	K = CreateCellArray(w,h);
	K = ApplyCells_Value(K,1);
	K = InitF_3(100,100,20,60,4,20,K);
	R = CreateCellArray(w,h);
	R = ApplyCells_Value(R,1);
	//R = InitF_3(100,100,30,60,4,5,R);
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
}


