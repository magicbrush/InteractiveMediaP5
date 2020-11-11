var x;
var y;

var homeX = 1000;


// 函数setup() : 准备阶段
function setup() {
	createCanvas(400,400);

	// 一大堆张三
	x = new Array();
	y = new Array();
	for(var i=0;i<1000;i++)
	{
		x[i] = 0;
		y[i] = 0;
	}
}

// 函数draw()：作画阶段
function draw() {	


	fill(255,255);
	rect(-10,-10,width+20,height+20);
	
	var arriveCount = 0;
	for(var i=0;i<x.length;i++)
	{
		// 随机移动
		var r0 = random(0,1);
		var xi = x[i];
		var yi = y[i];

		if(xi>=homeX)
		{
			arriveCount ++;
			continue;
		}

		if(r0<0.5)
		{
			xi ++;
		}
		else
		{
			xi--;
		}
		var r1 = random(0,1);
		if(r1<0.5)
		{
			yi ++;
		}
		else
		{
			yi--;
		}
		x[i] = xi;
		y[i] = yi;

		// 显示出来
		fill(255);
		drawZhangSan(xi,yi);
	}
	
	fill(0, 102, 153);
	textSize(25);
	text('ArriveCount: ' + arriveCount, 10, 30);
	//text("ArriveCount:" + arriveCount, 10,10);
	//ellipse(100,100,10,50);
	drawHome(homeX);

}

function drawZhangSan(xi,yi)
{
	push();
	// 把绘图的坐标系移动到屏幕中心
	translate(width/2,height/2);

	ellipse(xi,yi,5,5);
	pop();
}

function drawHome(x)
{
	push();
	// 把绘图的坐标系移动到屏幕中心
	translate(width/2,height/2);

	line(x,-500,x,500);
	pop();
}
