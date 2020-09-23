var pos0;
var pos1;
var pos2;
var pos3;
var stepScale = 5.0;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(300,300);
	pos0 = createVector(width/2,height/2);
	pos1 = createVector(width/2,height/2);
	pos2 = createVector(width/2,height/2);
	pos3 = createVector(width/2,height/2);
}

var LeftTime = 0.1;
var DT = 0.01;
// 函数draw()：作画阶段
function draw() {
	fill(255,5);// 填充白色
	rect(-1,-1,width+2,height+2);

	// noise walk
	var tNow = millis()/1000;
	pos0.x += map(noise(10000+tNow),0,1,-1,1);
	pos0.y += map(noise(tNow),0,1,-1,1);

	pos1.x += random(-1,1);
	pos1.y += random(-1,1);

	if(random()<0.01)
	{
		pos2.x += 5*random(-1,1);
		pos2.y += 5*random(-1,1);
	}

	LeftTime -= DT;
	if(LeftTime<=0)
	{
		// 按照泊松分布重新生成LeftTime
		LeftTime = 1; // 替换用用泊松分布生成随机数

		// 执行要发生的事件
		pos3.x += 15*random(-1,1);
		pos3.y += 15*random(-1,1);
	}
	
	// wrap on the canvas
	pos0 = wrapOnCanvas(pos0);
	pos1 = wrapOnCanvas(pos1);
	pos2 = wrapOnCanvas(pos2);
	pos3 = wrapOnCanvas(pos3);

	fill(255);
	stroke(0);
	ellipse(pos0.x,pos0.y,8,8);
	fill(0);
	ellipse(pos1.x,pos1.y,5,5);
	fill(255,0,0);
	ellipse(pos2.x,pos2.y,10,10);
	fill(0,255,0);
	ellipse(pos3.x,pos3.y,6,6);
}

function poissionRandomN1(lamda)
{

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