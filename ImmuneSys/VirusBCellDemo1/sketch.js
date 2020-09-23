// 场量
var Virus; // 病毒-红色
var Antibody; // 抗体-蓝色

// 场量的参数
var VirusMax = 10.0; // 病毒载量极值
var AntiMax = 10.0; // 抗体载量极值

// 尺寸参数
var canvasW = 320;
var canvasH = 320;
var fieldW = 80;
var fieldH = 80;

// 动态参数
var dt = 0.1;
var virusDiffuse = 0.03; // 病毒扩散率
var virusIncRate = 0.002; // 病毒增殖速率
var antiDiffuse = 0.15;// 抗体扩散率
var antiEffect = 0.008; // 抗体杀毒效率
var antiExhaust = 0.016; // 抗体消耗率
var antiIncRate = 0.03; // 抗体增长率


// 函数setup() ：准备阶段
function setup() {
	createCanvas(canvasW,canvasH);

	// 创建Virus和Antibody
	Virus = 
		InitField(
			fieldW,fieldH,1,1);
	Antibody = 
		InitField(
			fieldW,fieldH,0,0);

	InitBCell();
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);


	step(dt);

	render();


	if(mouseIsPressed)
	{
		AddToFieldOnCanvas(Virus,10,mouseX,mouseY);
	}

	//ellipse(100,100,200,200); // 画圆形
}

function AddToFieldOnCanvas(F,amt,x,y)
// 在场F的对应于画布上（x,y)位置，增加amt的量
{
	// 将画布坐标x,y转换到场的标号(i,j)
	var i = canvasX2FieldC(x);
	var j = canvasY2FieldR(y);

	if(x>=width||x<0||y>=height||y<=0)
	{
		return;
	}

	// 对F[i][j]进行加入的操作
	F[i][j] += amt;
}

function canvasX2FieldC(x)
{
	return floor(x * fieldW/canvasW);
}

function canvasY2FieldR(y)
{
	return floor(y * fieldH/canvasH);
}


function step(dt)
{

	// 更新场
	stepField(dt);
	// 更新B细胞

	stepBCells(dt);
}

function render()
{
	// 显示病毒
	var crVirusMin = color(255,255,255,100);
	var crVirusMax = color(255,0,0,100);
	RenderField(
		Virus,
		0,VirusMax,
		crVirusMin,crVirusMax);

	// 显示抗体
	var crAntiMin = color(255,255,255,100);
	var crAntiMax = color(0,255,255,100);
	RenderField(
		Antibody,
		0,AntiMax,
		crAntiMin,crAntiMax);

	// 显示B细胞
	RenderBCells();
}

