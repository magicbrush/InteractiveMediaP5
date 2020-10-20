

function CreateV2Field(c,r)
{
    var F = new Array();
    for(var i=0;i<c;i++)
    {
        F[i] = new Array();
        for(var j=0;j<r)
        {
            F[i][j] = createVector(0,0);
        }
    }
    return F;
}

function RandomizeV2F(F)
{
    for(var i =0;i<F.length;i++){
        for(var j=0;j<F[i].length;j++){
            F[i][j] = createVector(random(-1,1),random(-1,1));
        }
    }
    return F;
}