// 每个b细胞活动
function StepAgents(dt)
{
	for(var j=0;j<BCells.length;j++)
	{
		BCells[j].step(dt);
		BCells[j].seekVirus(Virus,dt);
		BCells[j].render();
		var antiInc = BCells[j].genAntibody(dt,Virus,Antibody);
		if(antiInc>0)
		{
			var cr = BCells[j].getCR();
			var antiAmtNow = Antibody[cr.x][cr.y];
			antiAmtNow += antiInc;
			antiAmtNow = 
				constrain(antiAmtNow,0,antiMax);
			Antibody[cr.x][cr.y] = antiAmtNow;
		}
	}
}

function StepFields(dt)
{
	Virus = StepThermoDynamics(
		dt,k,Virus);
	Virus = IncreaseExponentialToMax(
		dt,virusIncRate,virusMax,Virus);
	var Virus2 = Kill(dt,antiEffect, Antibody,Virus);
	var Anti2 = Kill(dt,antiExhaust, Virus, Antibody);
	Antibody = CopyCell(Anti2);
	Virus = CopyCell(Virus2);
	Antibody = StepThermoDynamics(
		dt,l,Antibody);

}

function StepThermoDynamics(dt,k,C)
{
	var CCopy = CopyCell(C);
	for(var c=1;c<C.length-1;c++)
	{
		for(var r=1;r<C[c].length-1;r++)
		{
			var al = C[c-1][r];
			var ar = C[c+1][r];
			var au = C[c][r-1];
			var ab = C[c][r+1];
			var a = C[c][r];

			var delta = al+ar+au+ab-4*a;
			CCopy[c][r] += k*delta*dt;
		}
	}
	return CCopy;
}

function IncreaseExponentialToMax(t01,incRate,maxVal,C)
{
	var CCopy = CopyCell(C);
	for(var c=1;c<C.length-1;c++)
	{
		for(var r=1;r<C[c].length-1;r++)
		{
			var cnow = C[c][r];
			var k = (maxVal - cnow)/maxVal;
			var deltaC =  
				 incRate * cnow * (maxVal - cnow)/(maxVal*maxVal);

			var c2 = cnow + deltaC;
			var c3 = lerp(cnow,c2,t01);
			CCopy[c][r] = c3;
		}
	}
	return CCopy;
}

function Kill(dt, effectness, Killer, Victim)
{
	var CCopy = CopyCell(Victim);
	for(var c=1;c<Killer.length-1;c++)
	{
		for(var r=1;r<Killer[c].length-1;r++)
		{
			var k = Killer[c][r];
			var v = Victim[c][r];

			var death = dt*k*effectness;
			v -= death;
			v = constrain(v,0,1000000);
			CCopy[c][r] = v;
		}
	}
	return CCopy;
}

