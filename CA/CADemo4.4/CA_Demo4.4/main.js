// 函数setup() ：准备阶段
function setup() {
	createCanvas(300,300);
	InitC2();// 1 初始化阵列
}

// 函数draw()：作画阶段
var stepPeriod = 200;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);
	//ellipse(100,100,200,200); // 画圆形

	CDisp = LerpC(CDisp,C,0.05);
	RenderFloatArray(CDisp);// 2 显示阵列

	if(stepPeriod<=0)
	{
		C = Step1(C); // 3 更新数值
		stepPeriod = 60;
	}
	stepPeriod --;
}




