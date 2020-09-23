

function step(dt)
{
	// 扩散
	Virus = diffuse(Virus,virusDiffuse,dt);
	Antibody = diffuse(Antibody,antiDiffuse,dt);

	// Virus 和 Antibody互相抵消
	/*
	Virus = kill(
		Antibody, Virus, antibodyEffect, dt);
	Antibody = kill(
		Virus, Antibody, antibodyUse, dt);
	*/
	
	// Virus 按指数增殖



	// Antibody 随Virus而制造



	// 可以继续增加动态机制



}

function kill(A, B, effect, dt)
// B[i][j]的量被A减少
// 减少的程度取决于A[i][j], effect,dt 的大小
{
	var w = F.length;
	var h = F[0].length;
	var B2 = CopyField(B);

	//算扩散
	for(var i=1;i<w-1;i++)
	{
		for(var j=1;j<h-1;j++)
		{
			b = B[i][j];
			a = A[i][j];

			// 根据b, a, effect, dt
			// 计算b2 = ....
			var b2 = b;

			B2[i][j] = b2;
		}
	}
	return B2;
}



function diffuse(F,k,dt)
// 场F扩散，
// k 扩散系数
// dt 时间步长
{	
	var w = F.length;
	var h = F[0].length;
	var F2 = CopyField(F);

	//算扩散
	for(var i=1;i<w-1;i++)
	{
		for(var j=1;j<h-1;j++)
		{
			// 通过对F[i][j]的领域执行
			// 拉普拉斯算符，得出更新的值
			// F_next = F_now + dt * k * laplacian(F);
			var wtSum = -4*F[i][j];
			wtSum += 1 * F[i-1][j];
			wtSum += 1 * F[i+1][j];
			wtSum += 1 * F[i][j-1];
			wtSum += 1 * F[i][j+1];

			// 将新的值复制到F2[i][j]
			F2[i][j] = F[i][j] + dt * k * wtSum;
		}
	}

	return F2;
}

function CopyField(F)
{
	var w = F.length;
	var h = F[0].length;
	var F2 = new Array();
	for(var i=0;i<w;i++)
	{
		F2[i] = new Array();
		for(var j=0;j<h;j++)
		{
			F2[i][j] = F[i][j]
		}
	}
	return F2;
}
	

