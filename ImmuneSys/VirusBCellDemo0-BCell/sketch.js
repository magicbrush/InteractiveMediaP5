// 场
var Virus; // 病毒
var Antibody; // 抗体

// 场量的设置
var virusMax = 10;// 病毒最大载量
var antiMax = 10;// 抗体最大载量

// 动态参数
var dt = 0.1; //时间步长
var virusDiffuse = 0.03; // 病毒扩散系数
var virusIncRate = 1.00; // 病毒增值率
var antiDiffuse = 0.1; // 抗体扩散系数
var antiKillEffect = 0.1; // 抗体清除病毒的效率
var antiUse = 0.03; // 抗体消耗率
var anitProductionRate = 0.01; // 抗体制造效率: 免疫力

// 尺寸参数
var canvasWd = 200;// 画布的尺寸
var canvasHt = 200;
var fieldWd = 80; // 场的尺寸
var fieldHt = 80; 

// 函数setup() ：准备阶段
function setup() {
	createCanvas(canvasWd,canvasHt);
	Virus = InitField(fieldWd,fieldHt,0,1);
	Antibody = InitField(fieldWd,fieldHt,0,0);
	InitBCells();
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	// 显示病毒
	let crVirusMin = color(255,255,255,100);
	let crVirusMax = color(255,0,0,100);
	RenderField(
		Virus,0,virusMax,
		crVirusMin,crVirusMax);

	// 显示抗体
	let crAntiMin = color(255,255,255,100);
	let crAntiMax = color(0,255,255,100);
	RenderField(Antibody,0,antiMax,
		crAntiMin,crAntiMax,100);

	// 显示B细胞
	BCellRender();

	// 更新场
	stepField(dt);

	// 更新B细胞
	BCellWander(dt);
	BCellProduceAntibody(dt);
	BCellSeekVirus(dt, Virus);

	// 鼠标按下时增加病毒
	if(mouseIsPressed)
	{
		Virus = AddAtCanvas(
			Virus, 50*dt, virusMax,mouseX,mouseY)
	}
}


function CanvasX2FieldC(x)
{
	var c = floor(x * (fieldWd/canvasWd));
	return c;
}

function CanvasY2FieldR(y)
{
	var r = floor(y * (fieldHt/canvasHt));
	return r;
}

function AddAtCanvas(
		A, amt, maxAmt, x,y)
{
	var c = CanvasX2FieldC(x);
	var r = CanvasX2FieldC(y);

	//print("c:" + c + " x:" + x);
	A[c][r] += amt;

	A[c][r] = constrain(A[c][r],0,maxAmt);
	return A;
}

