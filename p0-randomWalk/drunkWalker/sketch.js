var drunkers;
var drunkerNum = 10000;
var startX = 400;// 起始位置
var goalX = 410; // 家的位置

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

	drunkers = new Array();
	for(let i =0;i<drunkerNum;i++)
	{
		var x = startX;
		var y = 250;
		drunkers[i] = createVector(x,y);
	}

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);

	

	//ellipse(250,250,50,50);
	var count = drunkers.length;
	for(let i=0;i<drunkers.length;i++)
	{
		var x= drunkers[i].x;
		var y = drunkers[i].y;
		var arrived = (x>=goalX);
		if(!arrived)
		{
			x += (random(0,1)>=0.5)?1:-1;
			y += (random(0,1)>=0.5)?1:-1;
			drunkers[i].x = x;
			drunkers[i].y = y;
			count --;

			fill(255);
		}
		else
		{
			fill(0,255,0);
		}
		ellipse(drunkers[i].x,drunkers[i].y,5,5);

	}


	
	line(goalX,0,goalX,500);

	textSize(32);
	fill(0);
	var txt = "arrived: " + count + "/" + drunkers.length;
	text(txt, 10, 30);
	//text(txt,30,30);
	//text('word', 10, 30);

}