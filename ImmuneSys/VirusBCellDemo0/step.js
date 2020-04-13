function step(dt)
{
	// 扩散：以热传导方式扩散
	Virus = Diffuse(dt,Virus,virusDiffuse);
	Antibody = Diffuse(dt,Antibody,antiDiffuse);

	// 反应：抗体清除病毒，且抗体消耗
	// 病毒被抗体清除
	Virus = Kill(dt,Antibody,Virus,antiKillEffect);
	// 抗体消耗掉
	Antibody = Kill(dt, Virus, Antibody, antiUse);

	// 持续的增减：按指数方式增/衰减
	// 病毒持续感染
	Virus = IncreaseToMax(dt,1.01,Virus,virusMax);
	
	// 抗体随病毒量而制造出来

}

function Diffuse(dt,F,k)
{
	var w = F.length;
	var h = F[0].length;
	var F2 = CopyField(F);
	for(let i = 1;i<w-1;i++)
	{
		for(let j=1;j<h-1;j++)
		{
			var wtSum = 0;

			wtSum += F[i][j-1];
			wtSum += F[i-1][j];
			wtSum += F[i+1][j];
			wtSum += F[i][j+1];
			wtSum += 4 * F[i][j];

			var delta = k * wtSum * dt;
			F2[i][j] = F[i][j] + delta;
		}
	}
	return F2;
}

function IncreaseToMax(dt, incSpd, F, maxAmt)
{
	var w = F.length;
	var h = F[0].length;
	var F2 = CopyField(F);
	for(let i = 1;i<w-1;i++)
	{
		for(let j=1;j<h-1;j++)
		{
			var f = F[i][j];
			var f2 = f * incSpd;
			var delta = (f2 - f)*dt;
			F2[i][j] = F[i][j] + delta;
		}
	}
	return F2;
}


function Kill(dt, Killer, Killee, effect)
{
	var w = Killer.length;
	var h = Killer[0].length;
	var Kee2 = CopyField(Killee);
	for(let i=1;i<w-1;i++)
	{
		for(let j=1;j<h-1;j++)
		{
			var killer = Killer[i][j];
			var killee = Killee[i][j];
			var killAmt = 
				dt * effect * killer * killer * killee;

			Kee2[i][j] = Killee[i][j] - killAmt;
		}
	}

	return Kee2;
}