// 渲染
function drawCellAsRects(
	C, 
	Min, Max, 
	ColorMin, ColorMax, 
	scaleX,scaleY)
{
	push();
	//colorMode(RGB,1,1,1,1);
	noStroke();
	scale(scaleX,scaleY);
	for(var c=0;c<C.length;c++)
	{
		for(var r=0;r<C[c].length;r++)
		{
			var a = C[c][r];
			var t = (a-Min)/(Max-Min);
			var dispCr = 
				lerpColor(ColorMin,ColorMax,t);
			//dispCr.setAlpha(alpha);
			fill(dispCr);
			rect(c,r,1,1);
		}
	}
	pop();
}


