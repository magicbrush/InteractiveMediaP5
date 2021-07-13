
// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	//rectMode(CENTER);
	//drawCircle4(width/2,height/2,width*0.8);
	
}

// 函数draw()：作画阶段
function draw() {
	//fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	drawCircle6(width/2,height/2,width*0.8);
	
}

function drawCircle(x,y,r)
{
	push();
	fill(255);
	ellipse(x,y,r,r);
	pop();
}

function drawCircle1(x,y,r)
{
	push();
	fill(255);
	ellipse(x,y,r,r);
	pop();

	if(r>5)
	{
		drawCircle1(x,y,r*0.66);
	}
}

function drawCircle2(x,y,r)
{
	push();
	fill(255);
	ellipse(x,y,r,r);
	pop();

	if(r>5)
	{
		drawCircle2(x-r,y,r*0.66);
		drawCircle2(x+r,y,r*0.66);
	}
}


function drawCircle3(x,y,r)
{
	push();
	fill(0,0);
	ellipse(x,y,r,r);
	pop();

	if(r>20)
	{
		drawCircle3(x-r,y,r*0.66);
		drawCircle3(x+r,y,r*0.66);
		drawCircle3(x,y-r,r*0.66);
		drawCircle3(x,y+r,r*0.66);
	}
}



function drawCircle4(x,y,r)
{
	push();
	fill(r*2,255-r,0,30);
	ellipse(x,y,r,r);
	pop();

	if(r>30)
	{
		drawCircle4(x-r,y,r*0.7);
		drawCircle4(x+r,y,r*0.7);
		drawCircle4(x,y-r,r*0.66);
		drawCircle4(x,y+r,r*0.66);
	}
}


function drawCircle5(x,y,r)
{
	push();
	fill(r*2,255-r,0,30);
	ellipse(x,y,r,r);
	pop();

	k = mouseX/width;
	if(r>30)
	{
		drawCircle5(x-k*r,y,r*0.66);
		drawCircle5(x+k*r,y,r*0.66);
		drawCircle5(x,y-k*r,r*0.66);
		drawCircle5(x,y+k*r,r*0.66);
	}
}



function drawCircle6(x,y,r)
{
	push();
	fill(r*2,255-r,0,30);
	ellipse(x,y,r,r);
	pop();

	k = mouseX/width;
	tNow = millis()/3000;
	m = 0.5*(sin(tNow)+1);
	n = map(sin(m),-1,1,8,12);
	if(r>10)
	{
		for(var theta = 0;theta<TWO_PI;theta+= TWO_PI/n)
		{
			var dx = m*r*cos(theta);
			var dy = m*r*sin(theta);
			drawCircle6(x+dx,y+dy,r*0.33);
		}
		
	}
}
