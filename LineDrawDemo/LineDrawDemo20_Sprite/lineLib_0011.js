
// ---------------- 轨迹变化 ----------------//
function line_rand_0011(x0,y0,x1,y1,randness,res)
{
	var xp = x0;
	var yp = y0;

	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

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
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

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
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		theta = t*Freq;
		var x = xt + Amp * map(noise(t*Freq),0,1,-1,1);
		var y = yt + Amp * map(noise(t*Freq+10000),0,1,-1,1);

		line(xp,yp,x,y);
		xp = x;
		yp = y;
	}
}


// ---------------- 宽度变化 ----------------//
function line_randWid_0011(x0,y0,x1,y1,widMin,widMax,res)
{
	var xp = x0;
	var yp = y0;

	push();
	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var x = xt;
		var y = yt;

		strokeWeight(random(widMin,widMax))
		line(xp,yp,x,y);

		xp = x;
		yp = y;
	}
	pop();
}


function line_SinWid_0011(x0,y0,x1,y1,MinWid,MaxWid,Freq,Phase,res)
{
	var theta = 0;
	var xp = x0;
	var yp = y0;

	push();
	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var x = xt;
		var y = yt;

		var S = sin(t*Freq+Phase);
		var wd = map(S,-1,1,MinWid,MaxWid);

		strokeWeight(wd);
		line(xp,yp,x,y);

		xp = x;
		yp = y;
	}
	pop();
}

function line_noiseWid_0011(x0,y0,x1,y1,MinWd,MaxWd,Freq,Bias,res)
{
	var xp = x0;
	var yp = y0;

	push();
	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var x = xt;
		var y = yt;

		N = noise(t*Freq+Bias);
		wd = map(N,0,1,MinWd,MaxWd);
		//print(wd);
		strokeWeight(wd);
		line(xp,yp,x,y);
		xp = x;
		yp = y;
	}
	pop();
}

// --------------- 赋予特定形态 ----------------//
function line_randWidSprite_0011(
	x0,y0,x1,y1,widMin,widMax,res,SpriteFcn)
{
	var xp = x0;
	var yp = y0;

	
	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var x = xt;
		var y = yt;

		var wd = random(widMin,widMax);
		push();
		strokeWeight(2/wd);
		translate(x,y);
		scale(wd,wd);
		SpriteFcn();
		pop();

		xp = x;
		yp = y;
	}
	
}

function line_SinWidSprite_0011(
	x0,y0,x1,y1,MinWid,MaxWid,Freq,Phase,res,SpriteFcn)
{
	var theta = 0;
	var xp = x0;
	var yp = y0;

	for(var i=1;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var x = xt;
		var y = yt;

		var S = sin(t*Freq+Phase);
		var wd = map(S,-1,1,MinWid,MaxWid);

		push();
		strokeWeight(2/wd);
		translate(x,y);
		scale(wd,wd);
		SpriteFcn();
		pop();

		xp = x;
		yp = y;
	}
}

















