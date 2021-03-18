
// 更新Particle
function MoveParticleByE(P,E,dt)
{
	rowNum = E.length;
	colNum = E[0].length;
	for(var i=0;i<P.length;i++)
	{
		var px = P[i].x;
		var py = P[i].y;
		var r = round(px)%rowNum;
		var c = round(py)%colNum;
		var evec = E[r][c];

		px += evec.x*dt;
		py += evec.y*dt;
		if(i==10)
		{
			//print("ex:"+evec.x + " ey:" + evec.y + " px:" + px + " py:" + py);
		}
		
		//px+= 0.1;
		//py +=0.1;
		if(px>rowNum)
		{
			px-=rowNum;
		}
		if(px<0)
		{
			px+= rowNum;
		}
		if(py>colNum)
		{
			py-=colNum;
		}
		if(py<0)
		{
			py+=colNum;
		}
		P[i].x = px;
		P[i].y = py;
	}
	return P;
}

