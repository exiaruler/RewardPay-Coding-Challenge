// conversion methods
// converts number to string in currency format
function convertToCurrency(value:number):string{
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
function convertToPercentage(value:number,total:number):string{
    let percentageString="0%";
    let percentage=(value/total)*100;
    percentage=Math.floor(percentage*100)/100;
    // round off and retrieve first decimal point number for validation
    let decimalNum=Number.parseInt((Math.round(percentage * 10) / 10).toString().split(".")[1]);
    if(!Number.isInteger(percentage)&&decimalNum>0){
        let roundOff=Math.round(percentage * 10) / 10
        percentageString=roundOff.toString()+"%";
    }else{
        percentage=Math.round(percentage);
        percentageString=percentage.toString()+"%";
    }
    return percentageString;
 }

module.exports={
    convertToCurrency,
    convertToPercentage
};