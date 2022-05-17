export function checkValues(start,endVal)
{

    if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 1 )
    {
        return Math.abs(start-endVal);
    }
    //senario two +start and 0end
    else if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 0 )
    {

        return Math.abs(start-endVal)
    }
    //senario three -start and +end
    else if(Math.sign(start) === -1  && Math.sign(endVal) === 1  ||  Math.sign(endVal) === 0)
    {
        return Math.abs(start-endVal)
    }
    //senario four -start and -end
    else if(Math.sign(start) === -1 || Math.sign(start) === 0 && Math.sign(endVal) === -1 )
    {
        return Math.abs(-start+endVal)
    }

   
}



export function transformValues(start,endVal,betweenNum,easeNum,easing)
{
    // console.log(Math.sign(endVal))

        //senario one +start and +end
        if(Math.sign(start) === 1 && Math.sign(endVal) === 1 )
        {
            if(start > endVal) return (start - (betweenNum * easing(easeNum)))
            else return (start + (betweenNum * easing(easeNum)))
    
        }
    
        else if(Math.sign(start) === 0 && Math.sign(endVal) === 1 )
        {
                return (start + (betweenNum * easing(easeNum)))
        }
        //senario two +start and 0end
        else if(Math.sign(start) === 1 || Math.sign(start) === 0 && Math.sign(endVal) === 0 )
        {
            // console.log('wow')
                return (start - (betweenNum * easing(easeNum)))
        }
        //senario three -start and +end
        else if(Math.sign(start) === -1  && Math.sign(endVal) === 1  ||  Math.sign(endVal) === 0)
        {
                return (start + (betweenNum * easing(easeNum)))

        }
        //senario four -start and -end
        else if(Math.sign(start) === -1 || Math.sign(start) === 0  && Math.sign(endVal) === -1 )
        {
               return (start - (betweenNum * easing(easeNum)))

        }


   

}
