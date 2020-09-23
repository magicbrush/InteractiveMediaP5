

// 动态线条
function DynamicLine(A,B,vtNum,lineWd,cr)
{
    var AB = A.subtract(B);
    var Len = AB.length();
    var LineSeg= {
        L: new Array(),
        AFP: new Array(),
        LineWidth: lineWd,
        color: cr,
        Length: Len,
        computeLength: function()
        {
            var Len= 0;
            for(var i=1;i<this.L.length;i++)
            {
                var V0 = this.L[i-1];
                var V1 = this.L[i];
                var D = V1.subtract(V0);
                var dist = D.length();
                Len += dist;
            }
            this.Length = Len;
        },
        render: function(tNow)
        {
           strokeWeight(this.LineWidth);
           stroke(this.color);
           var num = this.L.length;
           var Pts = new Array();
           Pts[0] = this.L[0];
           for(var i=1;i<num-2;i++)
           {
                //var V0 = this.L[i-1];
                var V1 = this.L[i];
                // var V2 = this.L[i+1];

                var T = getTangentAt(this.L,i);
                var N = getNormalAt(this.L,i);

                var chlNum = this.AFP.length;
                var bias = 0;
                for(var c=0;c<chlNum;c++)
                {
                    bias += this.getBias(c,i,tNow);
                }

                var Offset = N.multiply(bias);
                var P = V1.add(Offset);

                Pts[i] = P;
           }
           Pts[Pts.length] = this.L[num-1];

           for(var i=1;i<=Pts.length-1;i++)
           {
                P0 = Pts[i-1];
                P1 = Pts[i];
                line(P0.x,P0.y,P1.x,P1.y);
           }
        },
        getBias: function(chl,i,t)
        {
            var amp = this.AFP[chl][0][i];
            var freq = this.AFP[chl][1][i];
            var phase = this.AFP[chl][2][i];
            var v = amp * sin(freq*t + phase);
            return v;
        },
        // 振幅分布
        SetAmpChl: function(chl, scale )
        {
            //var vtNum = this.L.length;
            // 振幅和频率的分布
            var amp = 5;// 2, 5, 12.5
            var lenScale = 0.45; // 0.05, 0.15, 0.45
            
            var Len = lenScale*this.Length;

            // 线性分布
            //var C = GenVibration_Linear(vtNum,Len*scale,Len*scale,1);
            //var C = GenVibration_Linear(vtNum,-Len*scale,Len*scale,1);
            
            // 正弦分布
            var C = GenVibration_PowSin(vtNum,amp,Len,1);
            //var C = GenVibration_PowSin(vtNum,amp,Len,0.1);
            //var C = GenVibration_PowSin(vtNum,amp,Len,8);
            //var C = GenVibration_PowSin(vtNum,amp,Len,-0.2);

            //var C = GenVibration_PowComplementSin(vtNum,scale*amp,Len,1);
            //var C = GenVibration_PowComplementSin(vtNum,scale*amp,Len,20);
            //var C = GenVibration_PowComplementAbsSin(vtNum,scale*amp,Len,-0.2);

            // 噪声分布
           // var C = GenVibration_Noise(vtNum,scale*amp,Len);
            
            // 锯齿分布
            //print("Len:" + Len);
             //var C = GenVibration_Saw(vtNum,3*amp,0.05*scale*Len,1);

            this.AFP[chl][0] = C;
        },
        // 频率分布
        SetFreqChl: function(chl,scale)
        {
            var vtNum = this.L.length;

            var C = GenVibration_Linear(vtNum,5*scale,5*scale,1);
            //var C = GenVibration_PowSin(vtNum, -3*scale,3*scale,1);

            this.AFP[chl][1] = C;
        },
        // 相位分布
        SetPhaseChl: function(chl,scale)
        {
            var vtNum = this.L.length;

            //var C = GenVibration_Linear(vtNum,0,0,1);
            //var C = GenVibration_Linear(vtNum,0,TWO_PI*scale,1);
            var C = GenVibration_Linear(vtNum,0,3*TWO_PI*scale,1);

            //var C = GenVibration_PowSin(vtNum,5*scale,10*scale,1);
            //var C = GenVibration_Noise(vtNum,1*scale,1*this.Length);
            //var C = GenVibration_Noise(vtNum,3*scale,1*this.Length);
            //var C = GenVibration_Saw(vtNum, scale*2, 0.001*this.Length, 1);
            this.AFP[chl][2] = C;
        }

    }

    //this.L = new Array(); //Base Line
    for(var i=0;i<vtNum;i++)
    {
        var t = i/(vtNum-1);
        var P =  Vector.lerp(A,B,t);
        LineSeg.L[i] = P;
    }

    LineSeg.computeLength();

    LineSeg.AFP = new Array();// dynamic params
    LineSeg.AFP[0] = new Array();
    for(var c=0;c<3;c++)
    {
        LineSeg.AFP[0][c] = new Array();
    }

    var scl = sqrt(width*height)/400;
    LineSeg.SetAmpChl(0,scl);
    LineSeg.SetFreqChl(0,scl);
    LineSeg.SetPhaseChl(0,scl);

    return LineSeg;
}










