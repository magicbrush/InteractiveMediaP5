var x,y;

// 函数setup() ：准备阶段
function setup() {
	createCanvas(400,300);
}

// 函数draw()：作画阶段
function draw() {
	fill(255,10);// 填充白色
	rect(-1,-1,width+2,height+1);
	randDrawEllipse1();

	var tNow = millis()/1000;
	noiseDrawEllipse0(tNow);
}

function noiseDrawEllipse0(t)
{
	var xr = noise(0.3*t+random(0,0.3));
	var yr = noise(0.3*t+random(0,0.3)+10000);
	var size = noise(0.4*t +20000);

	var x = map(xr,0,1,0,width);
	var y = map(yr,0,1,0,height);
	var s = map(size,0,1,10,30);

	push();
	fill(255,0,0);
	ellipse(x,y,s,s);
	pop();
}

function randDrawEllipse3()
{
	var r = random(0,1);
	var x = randX(0,width);
	var y = randX(0,height);
	ellipse(x,y,20,20);
}

function randDrawEllipse2()
{
	var r = random(0,1);
	if(r<0.2)
	{
		var x = random(0,width);
		var y = random(0,height);
		ellipse(x,y,20,20);
	}
	else
	{
		var x = random(width/3,width/2);
		var y = random(height/3,height/2);
		ellipse(x,y,20,20);
	}

	
}

function randDrawEllipse0()
{
	var x = random(0,width);
	var y = random(0,height);

	ellipse(x,y,20,20);
}

function randDrawEllipse1()
{
	var xr = random(0,1);
	var yr = random(0,1);

	var x = map(xr,0,1,0,width);
	var y = map(yr,0,1,0,width);

	ellipse(x,y,20,20);
}



function randX(a,b)
{
	var n=0
	while(n<10000)
	{
		var x = random(a,b);
		var y = random(0,b);
		var p = map(x,a,b,b,0);
		var ok = (y<p);

		print("(x,y): " + x + ", " + y + " ok?" + ok);

		if(ok)
		{
			return x;
		}
		n++;
	}
	return 0;
}