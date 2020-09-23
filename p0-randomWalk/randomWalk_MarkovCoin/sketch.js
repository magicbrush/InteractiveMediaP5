var x;
var coin = 0;
//0-H , 1-T

// 函数setup() ：准备阶段
function setup() {
	createCanvas(300,50);
	x = width/2;
}



// 函数draw()：作画阶段
function draw() {
	fill(255,5);// 填充白色
	rect(-1,-1,width+2,height+2);

	if(coin===0)
	{
		if(random()<0.9)
		{
			coin = 0
		}
		else
		{
			coin = 1;
		}
	}
	else
	{
		if(random()<0.3)
		{
			coin = 0;
		}
		else
		{
			coin = 1;
		}
	}

	if(coin===0)
	{
		x ++;
	}
	else
	{
		x --;
	}


	fill(255);
	stroke(0);
	ellipse(x,height/2,10,10);
}

function wrapOnCanvas(p)
{

	if(p.x<0)
	{
		p.x += width;
	}
	else if(p.x>width)
	{
		p.x -=width;
	}
	if(p.y<0)
	{
		p.y += height;
	}
	else if(p.y>height)
	{
		p.y -= height;
	}

	return p;
}