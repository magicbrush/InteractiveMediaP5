
var cells; // 细胞： 健康=0，染病=1
var colNum = 100;
var rowNum = 100;
var infectious = 0.1; // 传染能力
var timeStep = 0.1;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);

	cells = new Array();
	for(var i=0;i<colNum;i++)
	{
		cells[i] = new Array();
		for(var j=0;j<rowNum;j++)
		{
			cells[i][j] = 0;
		}
	}
	cells[60][40] = 1;
}

var lastDrawTime = 0.0
var leftTime = 1.0;
// 函数draw()：作画阶段
function draw() {
	fill(255,50);
	rect(-5,-5,width+10,height+10);
	drawCells(cells);
	
	var TNow = millis()/1000;
	var dt = TNow - lastDrawTime;
	leftTime -= dt;
	if(leftTime<=0.0)
	{
		cells = infect(cells);// 传染
		leftTime = timeStep;
		//leftTime = random(..);
	}
	dispInfectionState(cells);
	lastDrawTime = TNow;
}

function CopyCellArray(c)
{
	var cols = c.length;
	var rows = c[0].length;
	var c2 = new Array();
	for(var i=0;i<cols;i++)
	{
		c2[i] = new Array();
		for(var j=0;j<rows;j++)
		{
			c2[i][j] = c[i][j];
		}
	}
	return c2;
}
var infectPerDay  = 0;
function infect(c)
{
	var ccopy = CopyCellArray(c);

	var cols = c.length;
	var rows = c[0].length;
	var infectCnt = 0;
	for(var i=0;i<cols;i++)
	{
		for(var j=0;j<rows;j++)
		{
			if(c[i][j]==1)
			// 如果已经感染，不发生事情
			{
				continue;
			}
			var ileft = i-1;
			var cl = getCellValue(c,i-1,j);
			var cr = getCellValue(c,i+1,j);
			var cu = getCellValue(c,i,j-1);
			var cb = getCellValue(c,i,j+1);
			var thres = infectious*(cl+cr+cu+cb)/4;
			if(random(0,1)<thres)
			{
				ccopy[i][j] = 1;
				infectCnt ++;
			}
		}
	}
	infectPerDay = infectCnt;
	return ccopy;
}

function getCellValue(c,i,j)
{
	var cols = c.length;
	var rows = c[0].length;

	if(i<0)
	{
		i = i+cols;
	}
	if(j<0)
	{
		j = j+rows;
	}

	i = i%cols;
	j = j%rows;
	return c[i][j];
}

function drawCells(c)
{
	var cols = c.length;
	var rows = c[0].length;
	var xgap = width/cols;
	var ygap = height/rows;

	var x0 = 0;
	var y0 = 0;
	push();
	for(var i=0;i<cols;i++)
	{
		for(var j=0;j<rows;j++)
		{
			var cval = c[i][j];
			fill(cval*255,255*(1-cval),0);
			noStroke();
			var x = x0 + xgap*i;
			var y = y0 + ygap*j;
			rect(x,y,xgap,ygap);
		}
	}
	pop();
}


function dispInfectionState(c)
{
	var cols = c.length;
	var rows = c[0].length;

	var totalNum = cols*rows;
	var infectNum = 0;
	for(var i=0;i<cols;i++)
	{
		for(var j=0;j<rows;j++)
		{
			var cval = c[i][j];
			if(cval>=1)
			{
				infectNum ++;
			}
		}
	}

	push();
	textSize(18);
	fill(0);
	text(
		"Infect: " + infectNum + " / " + totalNum + "    " + infectPerDay + "/day",20,20);
	pop();

}


