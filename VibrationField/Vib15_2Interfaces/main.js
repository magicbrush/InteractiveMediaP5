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
var stirPower = 100;
var n0 = 7;

function setup() {
	createCanvas(w,h);
	A0 = CreateCellArray(w,h);
	A1 = CreateCellArray(w,h);
	
	K = CreateCellArray(w,h);

	K = ApplyCells_Value(K,n0);
	K = ApplyValueInRect(8,K,0,w,0,80);
	K = ApplyValueInRect(3,K,0,w,80,150);
	K = ApplyValueInRect(6,K,0,w,150,200);

	R = CreateCellArray(w,h);
	R = ApplyCells_Value(R,n0);

	R = ApplyValueInRect(8,R,0,w,0,80);
	R = ApplyValueInRect(3,R,0,w,80,150);
	R = ApplyValueInRect(6,R,0,w,150,200);
	
	Decay = CreateCellArray(w,h);
	Decay = ApplyCells_Value(Decay,0.9999);
	//print("Decay" + Decay);
	Decay = ApplyValueToBound(Decay,10,0.95);
	//InitResonators();
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

	//ResonatorVib(tNow);
}

function mousePressed()
{
	A0[mouseX][mouseY] = stirPower;
}

function keyPressed() {
	print(keyCode);
    if (key === 'A') {
    	ClearA0A1();
    } 
}


