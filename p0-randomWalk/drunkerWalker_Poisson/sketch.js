var drunkers;
var leftTimes;
var drunkerNum = 3000;
var startX = 0;// 起始位置
var goalX = 150; // 家的位置
var maxStep = 15.0; // 每一步的最大距离
var lamda = 10.0;
var maxTimeStep = 10.0;
var dispSize = 5.0;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

	drunkers = new Array();
	leftTimes = new Array();
	for(let i =0;i<drunkerNum;i++)
	{
		var x = startX;
		var y = 0;
		drunkers[i] = createVector(x,y);
		leftTimes[i] = 1.0;
	}

}

// 函数draw()：作画阶段
var lastTime = 0.0;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);

	var TNow = millis()/1000;
	var dt = TNow - lastTime;
	lastTime = TNow;

	// 醉鬼移动&显示
	var count = drunkers.length;
	for(let i=0;i<drunkers.length;i++)
	{
		var x = drunkers[i].x;
		var y = drunkers[i].y;
		var arrived = (x>=goalX);
		if(!arrived)
		{
			var leftT = leftTimes[i];
			leftT -= dt;

			if(leftT<=0)
			{
				var moveVec = randMove(maxStep);
				x += moveVec.x;
				y += moveVec.y;
				drunkers[i].x = x;
				drunkers[i].y = y;

				leftT = randPoisson(lamda,maxTimeStep);// 重新算剩余时间
			}
			leftTimes[i] = leftT;

			count --;
			fill(255);
		}
		else
		{
			fill(0,255,0);
		}
		push();
		translate(width/2,height/2);
		ellipse(drunkers[i].x,drunkers[i].y,dispSize,dispSize);
		pop();

	}

	// 画出“家”的位置
	push();
	translate(width/2,height/2);
	line(goalX,-500,goalX,500);
	pop();

	// 显示到达家的醉鬼数量
	textSize(32);
	fill(0);
	var txt = "arrived: " + count + "/" + drunkers.length;
	text(txt, 10, 30);
	//text(txt,30,30);
	//text('word', 10, 30);

}

function randMove(maxDist)
{
	var r = random(0,maxDist);
	var theta = random(0,TWO_PI);
	var x = r * cos(theta);
	var y = r * sin(theta);

	var movement = createVector(x,y);
	return movement;
}

function randPoisson(lamda, maxValue)
{
	var pMax = exp(-1);
	var x = 0;
	var y = 0;

	var cnt = 100;
	while(cnt>0)
	{
		x = random(0,maxValue);
		y = random(0,pMax);
		var pvalue = poisson(1,lamda,x);
		if(y<pvalue)
		{
			break;
		}
		cnt--;
	}

	return x;
}


function poisson(n, lamda, t)
{
	var value = pow(lamda * t, n) * exp(-lamda * t)/factorial(n);
	return value;
}

function factorial(n)
{
	if(n==1)
	{
		return 1;
	}
	else
	{
		return n*factorial(n-1);
	}
}