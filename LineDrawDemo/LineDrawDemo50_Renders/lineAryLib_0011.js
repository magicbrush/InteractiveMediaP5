
// ---------------- 轨迹变化 ----------------//
function lineAry_rand_0011(x0,y0,x1,y1,randness,res)
{
	var VecArray = new Array();
	for(var i=0;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var biasX = random(-randness,randness);
		var biasY = random(-randness,randness);

		var x = xt + biasX;
		var y = yt + biasY;

		VecArray[i] = createVector(x,y);
	}
	return VecArray;
}

function lineAry_roll_0011(x0,y0,x1,y1,radius,Freq,res)
{
	var VecArray = new Array();
	var theta = 0;

	for(var i=0;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var theta = t*Freq;
		var x = xt + radius * cos(theta);
		var y = yt + radius * sin(theta);

		VecArray[i] = createVector(x,y);
	}
	return VecArray;
}

function lineAry_noise_0011(x0,y0,x1,y1,Amp,Freq,res)
{
	var VecArray = new Array();

	for(var i=0;i<res;i++)
	{
		var t = i/res;
		var xt = lerp(x0,x1,t);
		var yt = lerp(y0,y1,t);

		var theta = t*Freq;
		var x = xt + Amp * map(noise(t*Freq),0,1,-1,1);
		var y = yt + Amp * map(noise(t*Freq+10000),0,1,-1,1);

		VecArray[i] = createVector(x,y);
	}
	return VecArray;
}











