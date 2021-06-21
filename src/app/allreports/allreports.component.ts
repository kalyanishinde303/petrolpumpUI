import { Component, OnInit } from '@angular/core';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';
import { MeterService } from '../meter-mgt/meter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { customer } from '../models/customer';
import { transaction } from '../models/transaction';

@Component({
  selector: 'app-allreports',
  templateUrl: './allreports.component.html',
  styleUrls: ['./allreports.component.css']
})
export class AllreportsComponent implements OnInit {
  customerList: customer[] =[];
  fromDate: string;
  toDate: string;
  tranType:string;
  custName:string;
  id: string;
  transactionList : transaction[] = [];
  length : number;
  totalCreditAmount : number = 0;
  totalDebitAmount : number = 0;
  constructor(private custTranService: CustTransactionsService) { }

  ngOnInit() {
       this.custTranService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    });
    
  }
  validation() {
    if(this.fromDate === undefined || this.toDate === undefined){
      window.alert("Please Select From Date and To date");
      return true;
    }
    if(this.tranType === undefined){
      window.alert("Please Select Transaction type");
      return true;
    }
    if(this.id === undefined){
      window.alert("Please Select Customer Name");
      return true;
    }
    return false;
  }
  
  search(){
    if(this.validation()){
      return;
    }
    this.transactionList = [];
    this.totalCreditAmount =0;
    this.totalDebitAmount = 0;
    this.custTranService.getTranBasedOnDate(this.id, this.fromDate, this.toDate, this.tranType).subscribe( data => {
      this.transactionList = data;
      this.length = this.transactionList.length;
      for(let i=0; i<this.transactionList.length; i++) {
        if(this.transactionList[i].type ==='Credit'){
         this.totalCreditAmount = this.totalCreditAmount + this.transactionList[i].amount;
        }else if(this.transactionList[i].type ==='Debit'){
          this.totalDebitAmount = this.totalDebitAmount + this.transactionList[i].amount;
         }
      }
      if(this.length <= 0){
        window.alert("No transaction found for selected search");
      }
      console.log(this.transactionList);
    });
  }
    print(){
      if(this.validation()){
        return;
      }

      this.custTranService.printTranBasedOnDate(this.id, this.fromDate, this.toDate, this.tranType).subscribe( data => {
         window.alert(data.message);
      });
  
    }
}
