// 渲染
function drawA_Points(A,Min,Max)
{
	push();
	colorMode(RGB,1,1,1,1);
	noFill();
	for(var c=0;c<A.length;c++)
	{
		for(var r=0;r<A[c].length;r++)
		{
			var a = A[c][r];
			var bright = map(a,Min,Max,0,1);
			stroke(bright,1);
			point(c,r);
		}
	}
	pop();
}


