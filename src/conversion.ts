// conversion methods
// converts number to string in currency format
function convertToCurrency(value:number){
    let output="0";
    // remove cents
    value=Math.trunc(value);

    // to string
    let valueString=value.toString();
    let splits=Math.trunc(valueString.length/3);
    if(valueString.length>3){
        // split string into strings that have a size of 3 or less
        let beginIndex=valueString.length-3;
        let endIndex=valueString.length;
        let splitArr=[];
        for(let i=0; i<=splits; i++){
            let splitValue=valueString.slice(beginIndex,endIndex);
            if(splitValue!="")splitArr.push(splitValue);
            endIndex-=3;
            beginIndex-=3;
            if(beginIndex<0) beginIndex=0;
        }
        output="$"+splitArr.reverse().join(',');
    }else{
        output="$"+valueString;   
    }
    return output;
 }
// convert value and total to percentage
function convertToPercentage(value:number,total:number){
    let percentageString="0%";
    let percentage=(value/total)*100;
    percentage=Math.floor(percentage*100)/100;
    if(!Number.isInteger(percentage)){
        let roundOff=percentage.toFixed(1);
        percentageString=roundOff.toString()+"%";
    }else{
        percentageString=percentage.toString()+"%";
    }
    console.log(percentage);
    console.log(percentageString);
    return percentageString;
 }

module.exports={
    convertToCurrency,
    convertToPercentage
};