import jsonFile from "../data.json";

// get total amount of account by category
function getAccountAmountTotal(category:string){
    let total=0;
    let results=jsonFile.data.filter((account:any)=>
        account.account_category==category
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    //console.log(total);
    return total;
}
// get total amount for sales account that is debit
function getGrossProfitTotal(){
    let total=0;
    let results=jsonFile.data.filter((account:any)=>
        account.account_type=="sales"&&account.value_type=="debit"
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    return total;
}
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
            //console.log(beginIndex+" "+endIndex);
            //console.log(splitValue);
        }
        output="$"+splitArr.reverse().join(',');
    }else{
        output="$"+valueString;   
    }
    return output;
}
//
function convertToPercentage(value:number,total:number){
    let percentageString="0%";
    let percentage=(value/total)*100;
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
var results={
    Revenue:'0',
    Expenses:'0',
    GrossProfitMargin:'0%',
    NetProfitMargin:'0%',
    WorkingCaptialRatio:'0%'
};
var totalRev=getAccountAmountTotal("revenue");
var totalExp=getAccountAmountTotal("expense");
var grossProfitTot=getGrossProfitTotal();
var netProfitCal=totalRev-totalExp;

//console.log(netProfitCal);
results.Revenue=convertToCurrency(totalRev);
results.Expenses=convertToCurrency(totalExp);
results.GrossProfitMargin=convertToPercentage(grossProfitTot,totalRev);
results.NetProfitMargin=convertToPercentage(netProfitCal,totalRev);
console.log(results);
