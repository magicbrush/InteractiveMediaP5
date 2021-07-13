var Shapes;// 一组图元

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	
	Shapes = new Array();// 一个序列容器
	Shapes[0] = new sprite(
		primitive1,width/2,height/2,PI/3,2,2);

	for(var i=0;i<5;i++)
	{
		Shapes = evolveShapes(Shapes);
	}
	
}

function evolveShapes(S)
{
	var S2 = new Array();
	for(var i=0;i<S.length;i++)
	{
		var cnt= round(random(3,6));
		for(k=0;k<cnt;k++)
		{
			S2.push(S[i].regen());
		}
	}
	for(var j=0;j<S2.length;j++)
	{
		S.push(S2[j]);
	}

	return S;
}


// 函数draw()：作画阶段
function draw() {
	//fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	
	for(var i=0;i<Shapes.length;i++)
	{
		Shapes[i].draw();
	}
	
}


function sprite(primitive,x,y,rot,sx,sy)
{
	this.primitive = primitive;
	this.x= x;
	this.y = y;
	this.rot = rot;
	this.sx = sx;
	this.sy = sy;

	this.draw = function()
	{
		push();
		translate(this.x,this.y);
		rotate(this.rot);
		scale(this.sx,this.sy);
		this.primitive();
		pop();
	}

	this.regen = function()
	{
		var x = this.x+random(-50,50)*this.sx;
		var y = this.y+random(-50,50)*this.sy;
		var rot = this.rot+random(-0.3,0.3);
		var sx = this.sx*random(0.3,0.8);
		var sy = this.sy *random(0.3,0.8);
		var r = random(0,1);
		var p = primitive0;
		if(r>0.7)
		{
			p = primitive1;
		}
		
		var childSprite = 
			new sprite(p,x,y,rot,sx,sy);
		return childSprite;
	}
}


function primitive0()
{
	ellipse(0,0,100,100);
}

function primitive1()
{
	rect(-40,-40,80,80);
}

function randColor()
{
	var cr = color(
		random(0,255),random(0,255),random(0,255));
	return cr;
}

