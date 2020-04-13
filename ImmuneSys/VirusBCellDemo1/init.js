function InitField(w,h,minValue,maxValue)
{
	var F = new Array();

	for(var i = 0;i<w;i++)
	{
		F[i] = new Array();
		for(var j=0;j<h;j++)
		{
			F[i][j] = 
				random(minValue,maxValue);
		}
	}

	return F;
}

function copyField(F)
{
	// w,h为场F的尺寸
	var w = F.length;
	var h = F[0].length;

	var F2 = new Array();
	for(var i = 0;i<w;i++)
	{
		F2[i] = new Array();
		for(var j=0;j<h;j++)
		{
			F2[i][j] = F[i][j];
		}
	}
	return F2;
}