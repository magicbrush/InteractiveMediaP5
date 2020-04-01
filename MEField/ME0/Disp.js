// 渲染
function drawB(B, interval, bias01, scaleF)
{
	push();
	fill(0);

	var dispScale = interval*scaleF;
	
	var startId = floor(interval*bias01);
	for(var c=startId;c<B.length;c+=interval)
	{
		for(var r=startId;r<B[c].length;r+=interval)
		{
			var b = B[c][r];
			if(b>0)
			{
				noStroke();
				fill(0,0,255,100);
				ellipse(c,r,b*dispScale*1.2);
			}
			else
			{
				strokeWeight(1);
				stroke(255,0,0,100);
				var L = b*dispScale;
				var x0 = c-L
				var y0 = r-L;
				var x1 = c+L;
				var y1 = r+L;

				line(x0,y0,x1,y1);
				line(x0,y1,x1,y0);
			}
		}
	}
	pop();
}

function drawE(E, interval, bias01, scaleF)
{
	var dispScale = interval*scaleF;
	var startId = floor(interval*bias01);
	var S  = interval * scaleF;
	for(var c=startId;c<E.length;c+=interval)
	{
		for(var r=startId;r<E[c].length;r+=interval)
		{
			var e = E[c][r];
			var theta = atan2(e.y,e.x);
			//var L = p5.Vector.mult(e,dispScale)
			var Origin = createVector(c,r);

			push();
			stroke(0,0,0,60);
			strokeWeight(1);
			translate(Origin.x,Origin.y,0);
			rotate(theta * 360/TWO_PI);
			scale(S,1,1);

			//ellipse(Origin.x,Origin.y,5,5);
			//line(Start.x,Start.y,End.x,End.y);
			line(-1,0,1,0);
			triangle(0.7,0.5,0.7,-0.5,1,0);
			pop();
		}
	}

}
