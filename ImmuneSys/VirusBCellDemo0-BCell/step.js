function stepField(dt)
{
	// 1 扩散：以热传导方式扩散
	/*Virus = 
		Diffuse(dt,Virus,virusDiffuse);*/
	Antibody = 
		Diffuse(dt,Antibody,antiDiffuse);

	// 2 反应：抗体清除病毒，且抗体消耗
	// 2.1 病毒被抗体清除
	var Virus2 = Kill(
		dt, Antibody,Virus, antiKillEffect);
	// 2.2 抗体消耗掉
	var Antibody2 = Kill(
		dt, Virus, Antibody, antiUse);
	Virus = CopyField(Virus2);
	Antibody = CopyField(Antibody2);
		
	// 3 持续的增减：按指数方式增/衰减
	// 3.1 病毒持续感染
	/*
	Virus = IncreaseToMax(
		dt,
		virusIncRate,
		Virus,
		virusMax);*/
		

	// 3.2 抗体随病毒量而制造出来
	// 病毒越多，抗体制作速率越快；
	// 免疫能力越强，抗体制造速率越快；
	// 抗体载量越大，抗体制造速率降低；
	/*
	Antibody = IncreaseWith(
		dt, 
		Antibody, 
		Virus, 
		anitProductionRate, 
		antiMax);*/
		

}

function IncreaseWith(
	dt, A, V, IncRate, AMaxAmt)
// V: 病毒越多，抗体制作速率越快；
// IncRate: 免疫能力越强，抗体制造速率越快；
// AMaxAmt: 抗体载量A越大，抗体制造速率降低；
{
	var w = A.length;
	var h = A[0].length;
	var A2 = CopyField(A);
	for(let i = 1;i<w-1;i++)
	{
		for(let j=1;j<h-1;j++)
		{
			// 计算A的变化，保存到A2中
			var a = A[i][j];
			var v = V[i][j];
			//var dAmt = dt * v * IncRate / a;
			var deltaA = 
				dt * v * IncRate * (AMaxAmt - a) ;
			var aNext = a + deltaA;
			A2[i][j] = aNext;
		}
	}
	return A2;
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
			killAmt = constrain(killAmt,0,1);

			Kee2[i][j] = Killee[i][j] - killAmt;
			Kee2[i][j] = constrain(Kee2[i][j],0,1000);
		}
	}

	return Kee2;
}