function InitField(w,h,minVal, maxVal)
{
	var F = new Array();
	for(var i=0;i<w;i++)
	{
		var Col = new Array();
		for(var j=0;j<h;j++)
		{
			Col[j] = random(minVal,maxVal);
		}
		F[i] = Col;
	}
	return F;
}

function CopyField(F)
{
	var F2 = new Array();
	var FWidth = F.length;
	var FHeight = F[0].length;

	for(var i=0;i<FWidth;i++)
	{
		F2[i] = new Array();
		for(var j=0;j<FHeight;j++)
		{
			F2[i][j] = F[i][j];
		}
	}
	return F2;
}