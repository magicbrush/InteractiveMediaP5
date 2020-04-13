// 场量
var Virus;  // 病毒
var Antibody; // 抗体

// 尺寸设置
var w = 400;// 画布尺寸
var h = 400;
var cols = 80;// 阵列尺寸
var rows = 80;

// 动力学参数
var dt = 0.1; // 时间步长
var k = 0.01; // 病毒扩散率
var virusIncRate = 0.05; // 病毒增殖速率
var virusMax = 10.0; // 病毒极限量
var l = 0.05; // 抗体扩散率
var antiIncRate = 0.03; // 抗体增殖速率
var antiMax = 20.0; // 抗体极限量
var antiEffect = 2; // 抗体效能
var antiExhaust = 1; // 抗体消耗率

// 显示效果设置
var crVirusMin;
var crVirusMax;
var crAntiMin;
var crAntiMax;

// 交互参数
var addVirusSpd = 50.0; // 增加病毒的速度

function setup() {
	createCanvas(w,h);
	Virus = CreateCellArray(cols,rows);
	Virus = InitCells_Rand(0,5,Virus);
	Antibody = CreateCellArray(cols,rows);
	Antibody = InitCells_Rand(0,3,Antibody);

	crVirusMin = color(255,255,255,0);
	//crVirusMin.setAlpha(0);
	crVirusMax = color(255,0,0,255);
	crAntiMin = color(255,255,255,0);
	crAntiMax = color(0,255,255,125);

}

// 函数draw()：作画阶段
var LastBDispT = 0.0;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	var tNow = millis()/1000;
	var passedT = tNow - LastBDispT;

	// 画病毒
	drawCellAsRects(
			Virus,
			0,virusMax,
			crVirusMin,crVirusMax,
			GetScaleX(), GetScaleY());
	// 画抗体
	drawCellAsRects(
		Antibody,
		0,antiMax,
		crAntiMin,crAntiMax,
		GetScaleX(), GetScaleY());
			
	// 经过dt时间，计算+更新场
	StepFields(dt);
	
	// 交互：用鼠标增加病毒
	if(mouseIsPressed)
	{
		var xy = 
			createVector(mouseX,mouseY);
		var cr = 
			XY2CR(xy);
		//Virus[floor(cr.x)][floor(cr.y)] += 
		//	addVirusSpd*dt;

		Antibody[floor(cr.x)][floor(cr.y)] += 
			addVirusSpd*dt;
	}

}

function GetScaleX()
{
	return w/cols;
}

function GetScaleY()
{
	return h/rows;
}

function keyPressed() {
	print(keyCode);
    if (key === 'A') {
    	
    } 
}


