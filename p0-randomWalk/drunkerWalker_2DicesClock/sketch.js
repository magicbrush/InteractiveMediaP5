var drunkers;
var drunkerNum = 500;
var startX = -100;// 起始位置
var goalX = 200; // 家的位置

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

	drunkers = new Array();
	for(let i =0;i<drunkerNum;i++)
	{
		var x = startX;
		var y = 0;
		drunkers[i] = createVector(x,y);
	}

}

// 函数draw()：作画阶段
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);


	// 醉鬼移动&显示
	var count = drunkers.length;
	for(let i=0;i<drunkers.length;i++)
	{
		var x= drunkers[i].x;
		var y = drunkers[i].y;
		var arrived = (x>=goalX);
		if(!arrived)
		{
			var moveMent = randMove2();
			drunkers[i].x = x + moveMent.x;
			drunkers[i].y = y + moveMent.y;
			count --;

			fill(255);
		}
		else
		{
			fill(0,255,0);
		}
		push();
		translate(width/2,height/2);
		ellipse(drunkers[i].x,drunkers[i].y,5,5);
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

function randMove()
{
	var d1 = floor(random(1,7));
	var d2 = floor(random(1,7));
	var dirAngle = -TWO_PI/4 + ((d1+d2)*TWO_PI/12);

	var x = cos(dirAngle);
	var y = sin(dirAngle);
	return createVector(x,y);
}



function randMove2()
{
	var sum = 0;
	for(var i=0;i<6;i++)
	{
		var coin = random(0,1);
		if(coin>0.5)
		{
			sum += 1;
		}
	}
	
	var dirAngle = -TWO_PI/4 + (sum*TWO_PI/12);

	var x = cos(dirAngle);
	var y = sin(dirAngle);
	return createVector(x,y);
}
