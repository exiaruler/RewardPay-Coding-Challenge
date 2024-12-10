import jsonFile from "../data.json";
import accountInterface from "./interface/accountInterface";
const conversion=require("./conversion");

// get total amount of account by category
function getAccountAmountTotal(category:string){
    let total=0;
    let results=jsonFile.data.filter((account:accountInterface)=>
        account.account_category==category
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    return total;
}
// get total amount for sales account that is debit
function getGrossProfitTotal(){
    let total=0;
    let results=jsonFile.data.filter((account:accountInterface)=>
        account.account_type=="sales"&&account.value_type=="debit"
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    return total;
}
// get total amount for assets by value type
function getAssetAmountTotal(valueType:string){
    let total=0;
    let results=jsonFile.data.filter((account:accountInterface)=>
        account.account_category=="assets"&&account.value_type==valueType&&(account.account_type=="current"||account.account_type=="bank"||account.account_type=="current_accounts_receivable")
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    return total;
}
function getLiabilityAmountTotal(valueType:string){
    let total=0;
    let results=jsonFile.data.filter((account:accountInterface)=>
        account.account_category=="liability"&&account.value_type==valueType&&(account.account_type=="current"||account.account_type=="current_accounts_payable")
    );
    total=results.reduce((total,value)=>total+value.total_value,total);
    return total;
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
// calculate working captial
var asset=getAssetAmountTotal("debit")-getAssetAmountTotal("credit");
var libaility=getLiabilityAmountTotal("credit")-getLiabilityAmountTotal("debit");
results.Revenue=conversion.convertToCurrency(totalRev);
results.Expenses=conversion.convertToCurrency(totalExp);
results.GrossProfitMargin=conversion.convertToPercentage(grossProfitTot,totalRev);
results.NetProfitMargin=conversion.convertToPercentage(netProfitCal,totalRev);
results.WorkingCaptialRatio=conversion.convertToPercentage(asset,libaility);

console.log(results);

