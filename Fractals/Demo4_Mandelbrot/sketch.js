var Z;

var ctrX = -0.5;
var ctrY = 0;
var xbound = 2;
var ybound = 2;


// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(300,300);
	Z = new Array()
	for(var i=0;i<width;i++)
	{
		Z[i] = new Array();
		for(var j=0;j<height;j++)
		{
			Z[i][j] = new Complex(0,0);
		}
	}

	var xMin = ctrX - xbound/2;
	var xMax = ctrX + xbound/2;
	var yMin = ctrY - ybound/2;
	var yMax = ctrY + ybound/2;
	for(var k=0;k<100;k++)
	{
		for(var i=0;i<width;i++)
		{
			for(var j=0;j<height;j++)
			{
				var x = map(i,0,width,xMin,xMax);
				var y = map(j,0,height,yMin,yMax);
				var C = new Complex(x,y);
				Z[i][j] = ZPlusC(Z[i][j],C);
			}
		}
	}

	
}

// 函数draw()：作画阶段
function draw() {
	//fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	ellipse(width/2,height/2,100,80);
	noStroke();
	for(var i=0;i<width;i++)
	{
		for(var j=0;j<height;j++)
		{
			var zx = Z[i][j].mag();

			if(zx<1)
			{
				fill(0);
			}
			else
			{
				fill(255);
			}

			//fill(zx*300);
			rect(i,j,1,1);
		}
	}

	
}

