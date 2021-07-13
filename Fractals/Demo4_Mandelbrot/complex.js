
function Complex(x,y)
{
	this.x = x;
	this.y = y;

	this.mag = function()
	{
		var m = sqrt(this.x*this.x + this.y*this.y);
		return m;
	}
}

function Add(a,b)
{
	c = new Complex(a.x+b.x, a.y+b.y);
	return c;
}

function Mult(a,b)
{
	var real = a.x*a.x - b.y*b.y;
	var img = 2*a.x*b.y;
	//print(real+"," + img);
	var c = new Complex(real,img);
	//print("c.x:" + c.x + " c.y:" + c.y);
	return c;
}

function ZPlusC(Z,C)
// z = z^2 + c
{
	//print(Z.x+"," + Z.y);
	var ZS = Mult(Z,Z);
	
	var Sum = Add(ZS,C);
	return Sum;
}
