var drunkers;
var drunkerStates;
var drunkerNum = 3000;
var startX = 0;// 起始位置
var goalX = 240; // 家的位置
var dispSize = 8;
var a = 0.08;
var b = 0.06;

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
var lastTime = 0.0;
function draw() {
	fill(255);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);

	drawField(10,Field);

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
			var tgt = Move(x,y);
			
			drunkers[i].x = tgt.x;
			drunkers[i].y = tgt.y;

			count --;
		}
		
		push();
		translate(width/2,height/2);
		if(arrived)
		{
			fill(0,255,0);
		}
		else
		{
			fill(255);
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

function drawField(gap,F)
{
	var minX = 0.5*width/gap;
	var minY = 0.5*height/gap;
	for(x=minX;x<width;x+=gap)
	{
		for(y=minY;y<height;y+=gap)
		{
			var f = F(x,y);
			push();
			translate(x,y);
			fill(255-f*50,255,255);
			noStroke();
			rect(-gap/2,-gap/2,gap,gap);
			pop();
			
		}

	}
}

function Move(x,y)
{
	var F = Field(x,y);
	var FW = Field(x-1,y);
	var FE = Field(x+1,y);
	var FN = Field(x,y-1);
	var FS = Field(x,y+1);

	var sum = F + FW + FE + FN + FS;
	var pF = F/sum;
	var pFW = FW/sum;
	var pFE = FE/sum;
	var pFN = FN/sum;
	var pFS = FS/sum;

	var pThres = new Array();
	pThres[0] = pF;
	pThres[1] = pThres[0] + pFW;
	pThres[2] = pThres[1] + pFE;
	pThres[3] = pThres[2] + pFN;
	pThres[4] = pThres[3] + pFS;

	var r = random(0,1);
	var xout = x;
	var yout = y;
	if(r<pThres[0])
	{
		
	}
	else if(r<pThres[1])
	{
		xout --;
	}
	else if(r<pThres[2])
	{
		xout ++;
	}
	else if(r<pThres[3])
	{
		yout --;
	}
	else if(r<pThres[4])
	{
		yout ++;
	}

	return createVector(xout,yout);
}

function Field(x,y)
{
	return sin(a*x)*cos(b*y) + 1;
}

