

function StepFields(dt)
{
	// 热传导：扩散过程
	Virus = StepThermoDynamics(
		dt,k,Virus);
	Antibody = StepThermoDynamics(
		dt,l,Antibody);

	// 增殖
	Virus = IncreaseExponentialToMax2(
		dt, virusIncRate,virusMax,Virus, Antibody);
	Antibody = IncreaseExponentialToMax(
		dt, antiIncRate, antiMax, Antibody);
	
	// 杀毒：抗体与病毒相互抵消
	var Virus2 = 
		Kill(dt,antiEffect, Antibody,Virus);
	Virus = CopyCell(Virus2);
	var Anti2 = 
		Kill(dt,antiExhaust, Virus, Antibody);
	Antibody = CopyCell(Anti2);
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


function IncreaseExponentialToMax2(t01,incRate,maxVal,C,D)
{
	var CCopy = CopyCell(C);
	for(var c=1;c<C.length-1;c++)
	{
		for(var r=1;r<C[c].length-1;r++)
		{
			var cnow = C[c][r];
			var dnow = C[c][r];
			var k = dnow * (maxVal - cnow)/(maxVal*maxVal);
			var deltaC =  
				 incRate * cnow * k;

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

