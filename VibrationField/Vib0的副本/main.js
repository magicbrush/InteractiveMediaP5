// 主程序
var A0; // 0-order- 显示的场
var A1; // 1-order A0的一阶导数

// 细胞阵列的更新
var K=5; // elastic factors
var R=0.1;

// 尺寸
var w = 200;
var h = 200;

// 时间间隔
var dt = 0.05;

function setup() {
	createCanvas(w,h);
	// 初始化为wxh尺寸的场，取值为0
	A0 = CreateCellArray(w,h);

	// 设置波源
	A0[100][100] = 10;
	//A0[20][150] = 5;

	// 设置一阶导数的初值为0
	A1 = CreateCellArray(w,h);
	A1[100][100] = 5;
}

// 函数draw()：作画阶段
var LastBDispT = 0.0;
function draw() {
	fill(255);// 填充白色
	//rect(-1,-1,width+2,height+2);

	// 显示A0
	var tNow = millis()/1000;
	var passedT = tNow - LastBDispT;
	if(passedT>0.1)
	{
		drawA_Points(A0,-0.1,0.1);
		LastBDispT = tNow;
	}

	// 按波动方程更新场
	for(var i=0;i<20;i++)
	{
		Step(dt);
	}
}


