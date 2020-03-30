var Cells; // 细胞阵列
var CellsDisp; // 显示的细胞阵列
var colNum = 20;
var rowNum = 20;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	Cells = Init();
}

var i=0;
// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+2,height+2);

	// 演化
	if(i>50)
	{
		Cells = CA_Step(Cells);
		i=0;
	}
	i++;

	// 将Cells渐变地拷贝到CellsDisp;
	CellDisp = LerpCells(Cells,CellsDisp,0.05);

	// 显示
	RenderCells2(CellsDisp);
}



function LerpCells(From,To,t)
{
	var FT = Init();
	for(var c=0;c<colNum;c++)
	{
		for(var r=0;r<rowNum;r++)
		{
			var F = From[c][r];
			var T = To[c][r];
			FT[c][r] = lerp(F,T,t);
		}
	}
	return FT;
}




