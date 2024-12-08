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
        output=splitArr.reverse().join(',');
    }else{
        output="$"+valueString;
        
    }
    console.log(output);
    return output;
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
convertToCurrency(12345);
