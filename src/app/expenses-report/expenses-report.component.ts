import { Component, OnInit } from '@angular/core';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';
import { expenses } from '../models/expenses';

@Component({
  selector: 'app-expenses-report',
  templateUrl: './expenses-report.component.html',
  styleUrls: ['./expenses-report.component.css']
})
export class ExpensesReportComponent implements OnInit {

  expList: expenses []=[];
  fromDate:string;
  toDate: string;
  totalAmount: number =0;
  constructor(private service: CustTransactionsService) { }

  ngOnInit() {
  }
  validation() {
    if(this.fromDate === undefined || this.toDate === undefined){
      window.alert("Please Select From Date and To date");
      return true;
    }
   
    return false;
  }
  search() {
    if(this.validation()){
      return;
    }
    this.expList = [];
    this.totalAmount = 0;
    this.service.getExpensesReport(this.fromDate, this.toDate).subscribe (data =>{
      this.expList = data;
      this.expList.forEach(exp => {
        this.totalAmount += +exp.expCost;
      })
    })
  }

  print() {
    if(this.validation()){
      return;
    }
    
    this.service.printExpensesReport(this.fromDate, this.toDate).subscribe (data =>{
      window.alert(data.message);
    })
  }
}
