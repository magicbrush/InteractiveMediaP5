function setup() {
  // put setup code here
  createCanvas(400,300);
  //line_rand_0011(50,150,350,150,5,100);

}

function draw() {
	fill(255);
	rect(-1,-1,width+2,height+2);
  
  	// put drawing code here
	line_rand_0011(50,50,350,50,0.1*mouseX,100);
	line_roll_0011(50,100,350,100,0.1*mouseY,mouseX,300);
	line_noise_0011(50,150,350,150,0.1*mouseY,0.1*mouseX,200);
}

function line_rand_0011(x0,y0,x1,y1,randness,res)
{
	var xp = x0;
	var yp = y0;

	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerpAB(x0,x1,t);
		var yt = lerpAB(y0,y1,t);

		var biasX = random(-randness,randness);
		var biasY = random(-randness,randness);

		var x = xt + biasX;
		var y = yt + biasY;

		line(xp,yp,x,y);

		xp = x;
		yp = y;
	}
}

function line_roll_0011(x0,y0,x1,y1,radius,Freq,res)
{
	var theta = 0;
	var xp = x0 + radius * cos(theta);
	var yp = y0 + radius * sin(theta);

	
	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerpAB(x0,x1,t);
		var yt = lerpAB(y0,y1,t);

		theta = t*Freq;
		var x = xt + radius * cos(theta);
		var y = yt + radius * sin(theta);

		line(xp,yp,x,y);

		xp = x;
		yp = y;
	}
}

function line_noise_0011(x0,y0,x1,y1,Amp,Freq,res)
{
	var xp = x0 + map(noise(0*Freq),0,1,-1,1);
	var yp = y0 + map(noise(0*Freq+10000),0,1,-1,1);

	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerpAB(x0,x1,t);
		var yt = lerpAB(y0,y1,t);

		theta = t*Freq;
		var x = xt + Amp * map(noise(t*Freq),0,1,-1,1);
		var y = yt + Amp * map(noise(t*Freq+10000),0,1,-1,1);

		line(xp,yp,x,y);
		xp = x;
		yp = y;
	}
}


function lerpAB(a,b,t)
{
	return a + t*(b-a);
}

