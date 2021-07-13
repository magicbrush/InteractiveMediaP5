var Z;
var C;
var Colors;
var T,S;
var iterNum = 100;

var Img;
var res = 300;

function InitImg(res)
{
	colorMode(RGB, 100, 100, 100, 100);
	I = new Array();
	for(var i=0;i<res;i++)
	{
		I[i] = new Array();
		for(var j=0;j<res;j++)
		{
			I[i][j] = color(100,100,100,100);
		}
	}
	return I;
}
function drawImg(I)
{
	for(var i=0;i<I.length;i++)
	{
		for(var j=0;j<I[i].length;j++)
		{
			var XY = createVector(i,j);
			var L = XY2Loc(XY);
			fill(I[i][j]);
			noStroke();
			rect(L.x,L.y,1,1);
		}
	}
}


function drawImgScreening(I,row)
{
	for(var j=0;j<I[row].length;j++)
	{
		var XY = createVector(j,row);
		var L = XY2Loc(XY);
		fill(I[row][j]);
		noStroke();
		rect(L.x,L.y,0.01,0.01);
		//fill(100,0,0,100);
		//ellipse(L.x,L.y,0.01,0.01);
	}
}

function XY2Loc(XY)
{
	XY.x -= T.x;
	XY.y -= T.y;
	XY.x /= S.x;
	XY.y /= S.y;
	return XY;
}

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(res,res);

	Z = new Array();
	C = new Array();
	Colors = new Array();
	
	T = createVector(width/2,height/2);
	S = createVector(width/2,height/2);

	Img = InitImg(res);
}


var row = 0;
// 函数draw()：作画阶段
function draw() {
	fill(255,255,255,1);
	//rect(-10,-10,2*width,2*height);
	//drawCircle5(width/2,height/2,width*0.8);
	
	push();
	translate(T.x,T.y);
	scale(S.x,S.y);
	strokeWeight(0.0015);
	fill(0,0);
	ellipse(0,0,1,1);
	line(-2,0,2,0);
	line(0,-2,0,2);
	var m = MousePos2Loc();
	ellipse(m.x,m.y,0.05,0.05);
	//drawImg(I);
	drawImgScreening(I,row);
	pop();
	row ++;
	row = row%height;

	drawZ();

	var zs = ZSfromMousePos(100);
	drawZs(zs,0.005,color(255));
	zmag = zs[99].mag();
	zx = constrain(mouseX,0,width-1);
	zy = constrain(mouseY,0,height-1);
	colorMode(RGB,100,100,100,100);
	I[zx][zy] = color(zmag,100-zmag,300-zmag,100);
	//I[zx][zy] = color(100,0,0,100);
}

function drawZ()
{
	for(var i=0;i<Z.length;i++)
	{
		zs = Z[i];
		drawZs(zs,0.001,Colors[i]);
	}
}

function randColor()
{
	colorMode(RGB, 100, 100, 100, 100);
	var cr = 
		color(random(0,255),random(0,255),random(0,255));
	return cr;
}

function drawZs(Zs,lineWt,fillCr)
{
	push();
	translate(T.x,T.y);
	scale(S.x,S.y);
	for(var j=1;j<zs.length;j++)
	{
		zA = zs[j-1];
		zB = zs[j];
		strokeWeight(lineWt);
		line(zA.x,zA.y,zB.x,zB.y);
		strokeWeight(lineWt);
		fill(fillCr);
		ellipse(zA.x,zA.y,0.02,0.02);
		ellipse(zB.x,zB.y,0.02,0.02);
	}
	pop();
}

function MousePos2Loc()
{
	var m = createVector((mouseX-T.x)/S.x,(mouseY-T.y)/S.y);
	return m;
}

function mousePressed()
{
	var mpos = MousePos2Loc();
	var c = new Complex(mpos.x,mpos.y);
	C.push(c);
	var zs = ZSfromMousePos(iterNum);
	Z.push(zs);
	Colors.push(randColor());
}

function ZSfromMousePos(itrNum)
{
	var mpos = MousePos2Loc();
	var c = new Complex(mpos.x,mpos.y);
	zs = new Array();
	zs.push(new Complex(0,0));
	for(var i=1;i<itrNum;i++)
	{
		var zsqr = Mult(zs[i-1],zs[i-1]);
		var sum = Add(zsqr,c);
		zs.push(sum);
	}
	return zs;
}
