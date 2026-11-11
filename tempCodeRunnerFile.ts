export{}
let checkNumber:unknown=25;
function convertType(checkNumber:unknown){
    if(typeof(checkNumber)==="string" && checkNumber.length!=0){
        let ansNumber=Number(checkNumber);
        return ansNumber;
    }
    
    else if(typeof(checkNumber)==='number'){
        let ansString=checkNumber.toString;
        return ansString;
    }
}

let ans=convertType(checkNumber);
console.log(ans);