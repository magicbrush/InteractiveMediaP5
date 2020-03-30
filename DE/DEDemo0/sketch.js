var x,y;
var dt = 5;
var a = 0.03;
var b = 0.05;
var ballCount = 100;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,400);
	x = new Array();
	y = new Array();
	initXY();
}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色

	for(i=0;i<ballCount;i++)
	{
		var xi = x[i];
		var yi = y[i];
		var dx = dt * sin(a * yi);
		var dy = dt * sin(b * xi);
		xi = xi + dx;
		yi = yi + dy;
		x[i] = xi;
		y[i] = yi;

		ellipse(xi,yi,10,10); // 画圆形
	}

	if(mouseIsPressed)
	{
		initXY();
	}
	
}

function initXY()
{
	for(i=0;i<ballCount;i++)
	{
		x[i] = random(0,400);
		y[i] = random(0,400);
	}
}