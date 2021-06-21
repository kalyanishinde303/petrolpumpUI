import { Component, OnInit } from '@angular/core';
import { customer } from '../models/customer';
import { transaction } from '../models/transaction';
import { expenses } from '../models/expenses';
import { CustTransactionsService } from './cust-transactions.service';
import { MeterService } from '../meter-mgt/meter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { balancesheet } from '../models/balancesheet';
import { BalanceSheetService } from '../balance-sheet/balanceSheet.service';

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styleUrls: ['./expenses-details.component.css']
})
export class ExpensesDetailsComponent implements OnInit {

 
  explist : string[] =[];
  dcList : string[] =[];
  expCount : number;
  dcCount : number=-1;
  custBalance : number [] = [];
  customerList: customer[] =[];
  newCustomerList: customer[] =[];
  customers : customer [] = [];
  transaction : transaction;
  totalSale : number;
  cashInHand : number;
  totalBankPayment : number ;
  customerDebit: number;
  totalCashPayment: number;
  customerCredit: number;
  expensesList: expenses [] = [];
  finalList: customer[] = [];
  selectedCustomer: customer;
  id:number[] = [];
  transactions: transaction[] = [];
  transactionDate : string;
  bankPayment : number;
  piBank:number= 0;
  expFlag = false;
  sheet: balancesheet = new balancesheet();
  balance:number =0;
  oldExpCnt=0;
  oldTranCnt=0;
  newTran: transaction[]=[] ;
  newExp: expenses[]=[] ;
  constructor(private custTranService: CustTransactionsService, private service: MeterService, 
    private route1: ActivatedRoute,private route: Router, private sheetService: BalanceSheetService) { }
  ngOnInit() {
    this.expCount = -1;
    this.explist[this.expCount] = '0';
    this.dcCount = -1;
    this.dcList[this.dcCount] = '0';

    this.custTranService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    });
    
    this.route1.paramMap.subscribe(data => {
      this.transactionDate =  data.get('date');
      this.totalSale = +data.get('totalSale');
      this.balance = +data.get('lastBalance');
    })
    
}
  validation() {
    for(let i=0; i<this.transactions.length;i++){
      if(document.getElementById("cust_"+i) !== null){
      console.log(document.getElementById("cust_"+i).nodeValue);
      }
      if(this.transactions[i].custId === undefined || this.transactions[i].type === undefined || this.transactions[i].amount=== undefined){
        return false;
      } else if(this.transactions[i].type === undefined &&  this.transactions[i].medium === undefined){
        return false;
      }
    }
    return true;
  }
  validationExp(){
      for(let i=0; i<this.expensesList.length;i++){
        if(this.expensesList[i].expName === undefined || this.expensesList[i].expCost === undefined) {
          return false;
        }
      }
      return true;
  }
  addedDCRow() {
    
    
    if(this.transactionDate === undefined || this.transactionDate === null){
      window.alert("Please select  transaction date ");
      return;
    }
    console.log(this.transactions);
   if(this.validation() ){
    // this.customers[++this.dcCount] = new customer();
    this.transactions[++this.dcCount] = new transaction();
    this.dcList[this.dcCount] = '1';
    
 
   } else {
     window.alert("Enter all the fields");
   }
  }
  
  setId(i) {
    
    this.transactions[i].custId = this.id[i];
  }
 addExpRow() {
   
  if(this.transactionDate === undefined || this.transactionDate === null){
    window.alert("Please select  transaction date ");
    return;
  }
   if(this.validationExp()){
    this.explist[++this.expCount] = '1';
    this.expensesList[this.expCount] = new expenses();
      this.explist[this.expCount] = '1';
   } else {
    window.alert("Enter all the fields");
   }
 }
 
 deleteRecordDC(i) {
 this.dcList[i] = '0';
 }
 deleteRecordExp(i) {
  this.explist[i] = '0';
 }

 balanceCal(i : number){
   
    for(let k =0; k<this.customerList.length;k++){
     
        if(this.customerList[k].id === +this.transactions[i].custId){
            let custBal = this.customerList[k].balance;
          for(let s=0; s<this.transactions.length-1; s++){

            if(this.transactions[s].type==='Debit'){
              custBal = custBal - this.transactions[s].amount;
              
            }
            if(this.transactions[s].type==='Credit'){
              custBal = custBal + this.transactions[i].amount;
            }
          }
          if(this.transactions[i].amount > custBal && this.transactions[i].type==='Debit'){
            window.alert("Please enter amount less than balance = " +custBal);
            this.transactions[i].amount = 0;
            return ;
          }
 
      break;
   }
  }
   
}

  setBalance(i : number){
    
  }
  calculate () {
  
    if( this.transactionDate === undefined || this.transactionDate === null ) {
      window.alert("Please select date first");
      return;
    }
    this.totalBankPayment = 0;
    this.totalCashPayment = 0;
    let totalExp = 0;
    let sale = this.totalSale;
    let credit=0;
    for(let i = 0; i<this.transactions.length;i++){
          if(this.transactions[i].type ==='Debit' && this.transactions[i].medium === 'Bank' ){
            this.totalBankPayment = this.totalBankPayment + this.transactions[i].amount;
          } 
          if(this.transactions[i].type ==='Debit' && this.transactions[i].medium === 'Cash' ){
            this.totalCashPayment = this.totalCashPayment + this.transactions[i].amount;
          } 
          if(this.transactions[i].type ==='Credit'){
            credit = credit + this.transactions[i].amount;
          } 
      }
      for(let i = 0; i<this.expensesList.length;i++){
        totalExp = totalExp + this.expensesList[i].expCost;
      }
      sale = sale - this.piBank;
      sale = sale - credit;
      this.cashInHand = sale - totalExp;
      this.cashInHand = this.cashInHand + this.totalCashPayment;
      this.totalBankPayment = this.totalBankPayment + this.piBank
      this.cashInHand = this.cashInHand + this.balance;
      this.cashInHand = (Math.round(this.cashInHand*100)/100);
      this.totalCashPayment =  (Math.round(this.totalCashPayment*100)/100);
      this.totalBankPayment = (Math.round(this.totalBankPayment*100)/100);
}


  clear(){
    this.expCount = -1;
    this.explist=[];
    this.dcCount = -1;
    this.dcList=[];
    this.totalCashPayment =0;
    this.cashInHand =0;
    this.customerCredit = 0;
    this.customerDebit = 0;
    this.finalList = [];
    this.transactions = [];
    this.totalSale = 0;
    this.transactionDate = undefined;
    this.balance =0;
    this.totalBankPayment = 0;
    this.expensesList = [];
  }
 
  saveTranExp(){
    let transaction1: transaction[] =[];
    let custFinalList: customer[] = [];
    let cnt;
    let c = 0;
    for(let i = 0; i<this.transactions.length;i++){
      this.transactions[i].date = this.transactionDate;
      
    }
    for(let i = 0; i<this.expensesList.length;i++){
      this.expensesList[i].date = this.transactionDate;
     
    }
    if(this.validation() && this.validationExp()){
      
    } else {
      window.alert("Please enter all requried fields");
      return;
    }
    if(this.transactions.length > 0) {
        // update customer balance
       
        let k=0;
        for(let i = this.oldTranCnt; i<this.transactions.length ;i++){
          this.newTran[k] = this.transactions[i];
          k++
        }
        this.updateCustBalance();
        this.custTranService.saveTransactions(this.newTran).subscribe(data => {
              window.alert(data.message)
              this.clear();
            });
            
            this.custTranService.upodateCustBalance(this.newCustomerList).subscribe(data => {
              console.log(data);
            });
           this.sheet.totalSale = this.totalSale;
           this.sheet.totalCashInHnd = this.cashInHand;
           this.sheet.totalBP = this.totalBankPayment;
           this.sheet.sheetDate = this.transactionDate;
           this.sheet.totalDBP = this.totalCashPayment;
           this.sheet.balance = this.balance;
            this.custTranService.saveBalanceSheet(this.sheet).subscribe(data => {
              window.alert(data.message)
            });  
      } 
      

      
    if(this.expensesList.length > 0) {
      let st: expenses[]=[] ;
      let k=0;
      for(let i = this.oldExpCnt; i<this.expensesList.length ;i++){
        st[k] = this.expensesList[i];
        k++
      }
      this.custTranService.saveExpenses(st).subscribe(data => {
            console.log(data);
          });
          this.clear();
  }
 }

 generatePDF() {
   if(this.expFlag || this.transactionDate === undefined || this.transactionDate ==='mm/dd/yyyy' || this.transactionDate === null) {
    window.alert("Expenses not added for slected date. Please add expenses for selected date");
   } else {
    this.custTranService.generatePDF(this.transactionDate).subscribe(data =>{
      window.alert(data.message);
    });
   }
 }
 updateCustBalance (){
   let j=0;
  for(let k = 0; k<this.customerList.length; k++){
    for(let i = 0; i<this.newTran.length;i++){
      if(this.customerList[k].id === +this.newTran[i].custId) {
          if(this.newTran[i].type ==='Debit'){
            this.customerList[k].balance = this.customerList[k].balance - this.newTran[i].amount;
            this.newTran[i].balance = this.customerList[k].balance;
          }
          if(this.newTran[i].type ==='Credit'){
            this.customerList[k].balance = this.customerList[k].balance + this.newTran[i].amount;
            this.newTran[i].balance = this.customerList[k].balance;
          }
          this.newCustomerList[j++]= this.customerList[k];
      }  
    }
 }
}

getOpeningMeter1(){
  console.log('date' + this.transactionDate);
  if(this.expCount >0){
    this.clear();
  } 
  if(this.transactionDate === undefined || this.transactionDate === null){
    return;
  }
  this.service.getBalance(this.transactionDate).subscribe( data => {
        if( data.diselCal != undefined &&  data.ptCal != undefined) {
        this.totalSale = (+data.diselCal.diselSale ) + (+data.ptCal.petrolSale);
        this.custTranService.getExpensesReport(this.transactionDate, this.transactionDate).subscribe (data =>{
          let i=0;
          for(let i=0; i<data.length;i++){
            this.addExpRow();
            this.expensesList[i].expName = data[i].expName;
            this.expensesList[i].expCost = data[i].expCost;
          }
          this.oldExpCnt = data.length;
        }); 
        this.custTranService.getSelectedDateTran(this.transactionDate).subscribe(data => {
          for(let k=0; k<data.length;k++){
            this.addedDCRow();
            this.transactions[k] = data[k];
            this.id[k]= data[k].custId;
          }
          this.oldTranCnt=data.length;
        });
        this.sheetService.getBalanceSheet(this.transactionDate, this.transactionDate).subscribe (data =>{
          if(data !==undefined && data.length>0) {
            this.balance = data[0].balance;
            this.cashInHand = data[0].totalCashInHnd;
            this.totalCashPayment = data[0].totalDBP;
            this.totalSale = data[0].totalSale;
            this.totalBankPayment = data[0].totalBP;
          } else {
            if(this.transactionDate !==undefined && this.transactionDate !== null)
          this.sheetService.getLastBalance(this.transactionDate,this.transactionDate).subscribe(data =>{
            if(data !==undefined && data !==null){
              this.balance = data.totalCashInHnd;
            }
    });
          }
        });  


        this.expFlag = false;
    }  else {
      this.expFlag = true;
      this.transactionDate = undefined;
      this.clear();
      window.alert("Add meter details for selected Date");
    }

  });

}
}