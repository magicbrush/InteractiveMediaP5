
var brushRadius = 10;
var brushSharpness = 1;
var brushPower = 1;
var brushSpd = 10.0;
function brushOperateAt(mousePos,dt)
{
	var BMax = 0;
	if(mouseButton === LEFT)
	{
		BMax = brushPower;
	}
	else if(mouseButton === RIGHT)
	{
		BMax = -brushPower;
	}

	for(c=0;c<B.length;c++)
	{
		for(r=0;r<B[c].length;r++)
		{
			var p = createVector(c,r);
			var offset = p5.Vector.sub(mousePos,p);
			var offsetLen = offset.mag();
			var offset01 = offsetLen/brushRadius;
			if(offset01>1)
			{
				continue;
			}
			var B0 = lerp(BMax,0,offset01);
			var B1 = pow(B0,brushSharpness);

			var b = B[c][r];
			var b2 = lerp(b,B1,dt*brushSpd);

			BNext[c][r] = b2;
		}
	}
	B = CopyCell(BNext);
}