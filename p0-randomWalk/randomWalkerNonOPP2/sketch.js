var x=250;
var y=250;
var x2 = 250;
var y2 = 250;
var step = 5;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

}

// 函数draw()：作画阶段
function draw() {
	//drawBoard();// 清理画布

	var coin1 = 
		random(0,1)>0.5?true:false;
	/*
	if(random(0,1)>0.5)
	{
		coin1 = true;
	}
	else
	{
		coin1 = false;
	}*/

	if(coin1)
	{
		x+=step;
	}
	else
	{
		x-=step;
	}
	
	var coin2 = 
		random(0,1)>0.5?true:false;
	if(coin2)
	{
		y+=step;
	}
	else
	{
		y-=step;
	}

	fill(0);
	noStroke();
	ellipse(x,y,3,3);


	choice = random(0,4);
	if(choice<1)
	{
		x2+=step;
	}
	else if(choice>=1&&choice<2)
	{
		x2-=step;
	}
	else if(choice>=2&&choice<3)
	{
		y2+=step;
	}
	else if(choice>=3&&choice<4)
	{
		y2-=step;
	}
	
	fill(255,0,0,255);
	noStroke();
	ellipse(x2,y2,3,3);

}

function drawBoard() {
	push();
	fill(255,10);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);
	pop();
}