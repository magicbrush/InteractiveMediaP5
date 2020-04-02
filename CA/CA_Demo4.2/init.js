// 1 细胞阵列的数据表达：表达一个二维阵列，
// 每个格子为一个0~1之间的数
var C;
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
}