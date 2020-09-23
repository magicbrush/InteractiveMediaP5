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
	if(poissonInvoke())
	{
		pos0.x += stepScale * random(-1,1);
		pos0.y += stepScale * random(-1,1);
	}
	
	// wrap on the canvas
	pos0 = wrapOnCanvas(pos0);

	fill(255);
	stroke(0);
	ellipse(pos0.x,pos0.y,8,8);
}

var leftTime =-1;
function poissonInvoke()
{
	if(leftTime<0)
	{
		// 用泊松分布重新生成LeftTime
		leftTime = poissonRandom()
		//leftTime = random(0,2);
		return true;
	}
	else
	{
		leftTime -= 0.05;
		return false;
	}
}

var lamda = 1;
function poissonRandom()
{
	// 取一个矩形范围
	var tMin = 0;
	var tMax = 5;
	var pMin = 0;
	var pMax = 0.37;

	var count = 0;
	while(count<10000)
	{
		// 1 在矩形范围内按均匀分布去一个点
		var x = random(tMin,tMax);
		var p = random(pMin,pMax);

		// 2 判断该点在概率分布曲线上还是下
		// 计算对应的曲线上的p值
		var pThres = exp(-lamda * x) * lamda * x;

		// 3 判断是否成功
		// 若再曲线下方，返回该点的x坐标
		if(p<pThres)
		{
			return x;
		}
		count ++;
	}
	
	return tMax;
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