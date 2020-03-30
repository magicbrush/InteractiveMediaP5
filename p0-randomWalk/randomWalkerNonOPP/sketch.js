var x=250;
var y=250;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(500,500);

}

// 函数draw()：作画阶段
function draw() {
	drawBoard();// 清理画布

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
		x++;
	}
	else
	{
		x--;
	}
	
	var coin2 = 
		random(0,1)>0.5?true:false;
	if(coin2)
	{
		y++;
	}
	else
	{
		y--;
	}

	fill(0);
	ellipse(x,y,8,8);
	
	

}

function drawBoard() {
	push();
	fill(255,10);// 填充白色
	rect(-1,-1,width+1,height+1);
	noFill();
	rect(0,0,width-1,height-1);
	pop();
}