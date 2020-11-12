var drunkers;
var drunkerStates;// 每个张三的状态：醉或醒
var drunkerNum = 1000;
var startX = -200;// 起始位置
var goalX = 240; // 家的位置
var maxStep = 5.0; // 每一步的最大距离
var normalStep = 1.0;// 正常的步伐
var p = 0.3;
var q = 0.3;
var dispSize = 10.0;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

	drunkers = new Array();
	drunkerStates = new Array();
	for(let i =0;i<drunkerNum;i++)
	{
		var x = startX;
		var y = 0;
		drunkers[i] = createVector(x,y);
		drunkerStates[i] = "drunk";
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
			var state = drunkerStates[i];

			// move
			if(state == "drunk")
			{
				var moveVec = randMove(maxStep);
				x += moveVec.x;
				y += moveVec.y;
				
			}
			else if(state == "awake")
			{
				x += normalStep;
				y += 0;
			}
			drunkers[i].x = x;
			drunkers[i].y = y;

			// state change
			var r = random(0,1);
			if(state =="drunk")
			{
				if(r<p)
				{
					state = "awake";
				}
			}
			else if(state == "awake")
			{
				if(r<q)
				{
					state = "drunk";
				}
			}
			drunkerStates[i] = state;

			count --;
		}
		
		push();
		translate(width/2,height/2);
		if(arrived)
		{
			fill(0,255,0)
		}
		else if(state=="drunk")
		{
			fill(255,0,0);
		}
		else if(state == "awake")
		{
			fill(255,255,0);
		}
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
