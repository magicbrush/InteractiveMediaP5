//  GenVibration
function GenVibration_Linear(
    cnt,A,B,ampScale)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        V[i] = ampScale * lerp(A,B,t);
    }
    return V;
}

function GenVibration_PowSin(
    cnt, ampScale, distScale, powerFactor)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        var s = sin(distScale*t);
        if(s>0)
        {
            s = pow(s,powerFactor);
        }
        else
        {
            s = -pow(-s,powerFactor);
        }
        V[i] = ampScale*s;
    }
    return V;
}

function GenVibration_PowComplementSin(
    cnt,ampScale,distScale,powerFactor)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        var s = sin(distScale*t);
        if(s>0)
        {
            s = 1-pow(s,powerFactor);
        }
        else
        {
            s = pow(-s,powerFactor)-1;
        }
        V[i] = ampScale*s;
    }
    return V;
}


function GenVibration_PowComplementAbsSin(
    cnt,ampScale,distScale,powerFactor)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        var s = abs(sin(distScale*t));
        s = 1-pow(s,powerFactor);
        V[i] = ampScale*s;
    }
    return V;
}


function GenVibration_AbsPowSin(
    cnt,ampScale,distScale,powerFactor)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        var s = sin(distScale*t);
        if(s>0)
        {
            s = pow(s,powerFactor);
        }
        else
        {
            s = -pow(-s,powerFactor);
        }
        V[i] = abs(ampScale*s);
    }
    return V;
}

function GenVibration_Noise(
    cnt,ampScale,distScale)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        V[i] = ampScale * map(noise(distScale*t),0,1,-1,1);
    }
    return V;
}

function GenVibration_Saw(
    cnt,ampScale,sawInterval,powerFactor)
{
    var V = new Array();
    for(var i=0;i<cnt;i++)
    {
        var t = i/(cnt-1);
        var s = ampScale * pow(fract(t/sawInterval),powerFactor);
        V[i] = s;
    }
    return V;
}