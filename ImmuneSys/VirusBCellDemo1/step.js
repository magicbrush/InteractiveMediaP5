function stepField(dt)
{
	// 1 扩散：基于热扩散方程
	Virus = Diffuse(dt,Virus, virusDiffuse);
	Antibody = Diffuse(dt,Antibody,antiDiffuse);

	// 2 杀毒：病毒被抗体清除，且抗体也消耗
	Virus = 
		Kill(dt, Antibody, Virus, antiEffect);
	Antibody = 
		Kill(dt, Virus, Antibody, antiExhaust);

	// 3 增殖：
	// 病毒向载量极限增加
	Virus = IncreaseToMax(
		dt, Virus, VirusMax, virusIncRate);

	// 抗体随病毒量而制造：
	// 每个细胞都有免疫力,
	// 会根据感染的严重程度，
	// 制造抗体
	/*
	Antibody = IncreaseWith(
		dt, 
		Antibody,
		Virus,
		AntiMax, 
		antiIncRate);
		*/
		
}

function IncreaseWith(dt, F, E, maxAmt, incRate)
{
	var w = F.length;
	var h = F[0].length;

	var F2 = copyField(F);
	for(i=1;i<w-1;i++)
	{
		for(j=1;j<h-1;j++)
		{
			var fNow = F[i][j];
			var eNow = E[i][j];

			// 类比SIR:
			// S(易感者)->I(感染者)的速率 = S*I
			var incAmt = 
				dt * incRate * eNow * fNow * (maxAmt - fNow);
			var fNext = fNow + incAmt;
			F2[i][j] = fNext;
		}
	}
	return F2;
}

function IncreaseToMax(dt, F, maxAmt, incRate)
{
	var w = F.length;
	var h = F[0].length;

	var F2 = copyField(F);
	for(i=1;i<w-1;i++)
	{
		for(j=1;j<h-1;j++)
		{
			var fNow = F[i][j];

			// 类比SIR:
			// S(易感者)->I(感染者)的速率 = S*I
			var incAmt = 
				dt * incRate * fNow*(maxAmt - fNow);
			var fNext = fNow + incAmt;
			F2[i][j] = fNext;
		}
	}
	return F2;
}

function Kill(dt, Killer, Killee, effect)
{
	var w = Killee.length;
	var h = Killee[0].length;

	var Killee2 = copyField(Killee);
	for(i=1;i<w-1;i++)
	{
		for(j=1;j<h-1;j++)
		{
			var killer = Killer[i][j];
			var killee = Killee[i][j];

			var killRate = 
				killer * killer * killee;
			var killAmt =
				 effect * killRate * dt;
			var killeeNext = killee - killAmt;
			Killee2[i][j]= killeeNext;
		}
	}
	return Killee2;
}

function Diffuse(dt,F,k)
// dt: 时间步长
// F: 场量
// k: 扩散系数
{
	var w = F.length;
	var h = F[0].length;

	var F2 = copyField(F);
	for(i = 1;i<w-1;i++)
	{
		for(j=1;j<h-1;j++)
		{
			var fNow = F[i][j];

			// 扩散的计算
			// laplacian(F[i][j])
			// 对（i，j)领域内的值求加权和，权重为：
			// [ 0  1  0]
			// [ 1 -4  1]
			// [ 0  1  0]
			var wtSum = -4 * F[i][j];
			wtSum += 1 * F[i][j-1];
			wtSum += 1 * F[i-1][j];
			wtSum += 1 * F[i+1][j];
			wtSum += 1 * F[i][j+1];

			var fNext = fNow + k * wtSum * dt
			// F[i][j] = fNext;// WRONG!
			F2[i][j] = fNext;
		}
	}
	return F2;
}