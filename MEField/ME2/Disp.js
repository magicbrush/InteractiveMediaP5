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
				ellipse(c,r,b*dispScale*3);
			}
			else
			{
				strokeWeight(1);
				stroke(255,0,0,100);
				var L = b*dispScale;
				var x0 = c-L;
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

function drawB_Points(B)
{
	push();
	colorMode(RGB,1,1,1,1);
	noFill();
	for(var c=0;c<B.length;c++)
	{
		for(var r=0;r<B[c].length;r++)
		{
			var b = B[c][r];
			if(b>0)
			{
				stroke(10*b,0,0,0.5);
			}
			else
			{
				stroke(0,0,10*b,0.5);
			}
			point(c,r);
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
			stroke(0,0,0,200);
			strokeWeight(1);
			translate(Origin.x,Origin.y,0);
			//rotate(theta * 360/TWO_PI);
			rotate(theta);
			scale(S*e.mag(),1,1);

			//ellipse(Origin.x,Origin.y,5,5);
			//line(Start.x,Start.y,End.x,End.y);
			line(-1,0,1,0);
			triangle(0.7,0.5,0.7,-0.5,1,0);
			pop();
		}
	}

}


function drawE_Points(E)
{
	push();
	colorMode(RGB,1,1,1,1);
	noFill();
	for(var c=0;c<E.length;c++)
	{
		for(var r=0;r<E[c].length;r++)
		{
			var evec = E[c][r];
			print("evec.x:" + evec.x + " y:" + evec.y);
			var ex = evec.x;
			var ey = evec.y;

			var r = map(ex,-1,1,0,1);
			var g = map(ey,-1,1,0,1);
			fill(r,g,0,1);
			point(c,r);
		}
	}
	pop();
}

