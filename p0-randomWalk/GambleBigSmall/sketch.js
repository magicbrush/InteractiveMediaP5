var drunkers;
var drunkerNum = 1000;
var startX = 10;// 起始位置
var winX = 100; // 赢
var loseX = 1;  // 输

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
	var winCnt = 0;
	var loseCnt = 0;
	for(let i=0;i<drunkers.length;i++)
	{
		var x= drunkers[i].x;
		var y = drunkers[i].y;
		var win = (x>=winX);
		var lose = (x<=loseX);
		
		if(win)
		{
			winCnt ++;
		}
		if(lose)
		{
			loseCnt ++;
		}

		var gameOver = (win||lose);
		if(!gameOver)
		{
			var diceA = int(random(1,7));
			var diceB = int(random(1,7));
			var sum = diceA + diceB;
			var bBig = (sum>6);

			var bet = 0.5*x;// 赌注为0.5倍本金
			if(bBig)
			{
				x -= bet;
			}
			else
			{
				x += 1.1*bet;
			}
			
			

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
		push();
		translate(width/2,height/2);
		ellipse(drunkers[i].x,drunkers[i].y,5,5);
		pop();

	}


	// 画出“家”的位置
	push();
	translate(width/2,height/2);
	line(winX,-500,winX,500);
	line(loseX,-500,loseX,500);
	pop();

	// 显示到达家的醉鬼数量
	textSize(32);
	fill(0);
	var txt = "win: " + winCnt + ", lose:" + loseCnt + " / " + drunkers.length;
	text(txt, 10, 30);
	//text(txt,30,30);
	//text('word', 10, 30);

}