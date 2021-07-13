var Rects;


// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	
	Rects = new Array();
	Rects[0] = 
		new rectangle(10,10,
			width-10,height-1,color(0,0,0));

	for(var i=0;i<5;i++)
	{
		Rects = evolveRects(Rects,200);
	}
	
}

// 函数draw()：作画阶段
function draw() {
	//fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	for(var i=0;i<Rects.length;i++)
	{
		Rects[i].draw();
	}
	print(Rects.length);
}

function evolveRects(R,minArea)
{
	RectsNew = new Array();
	print("R cnt:" + R.length);
	for(var i=0;i<R.length;i++)
	{
		var rvalue = random(0,1);
		var ratio = random(0.2,0.8);
		var a = R[i].area();
		if(a<minArea)
		{
			RectsNew.push(R[i]);
			continue;
		}
		if(rvalue>0.6)
		{
			var RL = R[i].splitHorL(ratio,randColor());
			var RR = R[i].splitHorR(ratio,randColor());
			RectsNew.push(RL);
			RectsNew.push(RR);
			//print("RL:" + RL);
			//print("RectsNew cnt:" + RectsNew.length);
		}
		else
		{
			var RT = R[i].splitVerT(ratio,randColor());
			var RB = R[i].splitVerB(ratio,randColor());
			RectsNew.push(RT);
			RectsNew.push(RB);
		}
	}
	//print("RectsNew cnt:" + RectsNew.length);
	return RectsNew;
}

function randColor()
{
	var cr = color(
		random(0,255),random(0,255),random(0,255));
	return cr;
}

function rectangle(x,y,w,h,cr)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.cr = cr;

	this.draw = function()
	{
		push();
		//rectMode()
		noStroke();
		fill(this.cr);
		rect(this.x,this.y,this.w,this.h);
		pop();
	}

	this.area = function()
	{
		var a = this.w*this.h;
		return a;
	}
	this.splitHorL = function(r01,cr)
	{
		var x0 = this.x;
		var y0 = this.y;
		var w0 = this.w*r01;
		var h0 = this.h;
		var RL = new rectangle(x0,y0,w0,h0,cr);
		return RL;
	}
	this.splitHorR = function(r01,cr)
	{
		var x1 = this.x + this.w*r01;
		var y1 = this.y;
		var w1 = this.w*(1-r01);
		var h1 = this.h;
		var RR = new rectangle(x1,y1,w1,h1,cr);
		return RR;
	}
	this.splitVerT = function(r01,cr)
	{
		var x1 = this.x;
		var y1 = this.y;
		var w1 = this.w;
		var h1 = this.h*r01;
		var RT = new rectangle(x1,y1,w1,h1,cr);
		return RT;
	}
	this.splitVerB = function(r01,cr)
	{
		var x1 = this.x;
		var y1 = this.y+this.h*r01;
		var w1 = this.w;
		var h1 = this.h*(1-r01);
		var RB = new rectangle(x1,y1,w1,h1,cr);
		return RB;
	}

}

