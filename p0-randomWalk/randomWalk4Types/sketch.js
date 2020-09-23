var pos0;
var stepScale = 5.0;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(300,300);
	pos0 = createVector(width/2,height/2)
}

// 函数draw()：作画阶段
function draw() {
	fill(255,5);// 填充白色
	rect(-1,-1,width+2,height+2);

	// random walk
	pos0.x += stepScale * random(-1,1);
	pos0.y += stepScale * random(-1,1);

	// wrap on the canvas
	pos0 = wrapOnCanvas(pos0);

	fill(255);
	stroke(0);
	ellipse(pos0.x,pos0.y,8,8);
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