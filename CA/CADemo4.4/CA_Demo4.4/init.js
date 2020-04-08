// 1 细胞阵列的数据表达：表达一个二维阵列，
// 每个格子为一个0~1之间的数
var C;
var CDisp;
var m = 20;
var n = 20;
function InitC()
{
	C = new Array();
	// C[0], C[1], C[2], ..... 
	// m x n 的阵列
	for(var c = 0;c<m;c++)
	{
		C[c] = new Array();
		for(var r =0;r<n;r++)
		{
			if(random(0,1)>0.8)
			{
				C[c][r] = 0.9;
			}
			else
			{
				C[c][r] = 0.1;
			}
			
		}
	}

	// 访问 (i,j)： C[i][j]
}
function InitC2()
{
	C = new Array();
	// C[0], C[1], C[2], ..... 
	// m x n 的阵列
	for(var c = 0;c<m;c++)
	{
		C[c] = new Array();
		for(var r =0;r<n;r++)
		{
			value = (c/m) * (r/n);
			C[c][r]= value;
		}
	}
	// 访问 (i,j)： C[i][j]

	CDisp = LerpC(C,C,0);
}

function LerpC(C0,C1,t)
// C0,C1是相通尺寸的阵列
// 计算结果C2, 是C0,C1的中间状态，由t（0~1）指定
// t=0: C2=C0
// t=1: C2=C1
// 0<t<1: C2处于C0和C1的中间状态
// t越接近0, C2越接近C0，
// t越接近1, C2越接近C1
{
	var C2 = new Array();
	for(var i = 0;i<C0.length;i++)
	{
		C2[i] = new Array();
		for(var j=0;j<C0[i].length;j++)
		{
			// 混合（C0[i][j] ,C1[i][j])
			C2[i][j] = lerp(C0[i][j], C1[i][j], t);
		}

	}
	return C2;
}
