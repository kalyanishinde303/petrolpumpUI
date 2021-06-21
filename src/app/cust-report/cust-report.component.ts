import { Component, OnInit } from '@angular/core';
import { customer } from '../models/customer';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';
import { transaction } from '../models/transaction';

@Component({
  selector: 'app-cust-report',
  templateUrl: './cust-report.component.html',
  styleUrls: ['./cust-report.component.css']
})
export class CustReportComponent implements OnInit {

  customerList: customer[] = [];
  transactionList: transaction[] = [];
  tFlag: boolean[]= [];
  flag : boolean;
  cust:customer;
  totalCredit : number=0;
  constructor(private custService : CustTransactionsService) { }

  ngOnInit() {
    this.custService.getAllCustomer().subscribe( data => {
      this.customerList = data;
      this.customerList.forEach( cst => {
        this.totalCredit += cst.balance;
      })
    });
  }
  tranDetails(i,cust:customer) {
  
   
    if(this.tFlag[i] == true) {
      this.tFlag[i] = false;
      this.cust = null;
      this.cust = undefined;
      this.flag = false;
    } else {
      
      this.tFlag[i] = true;
      this.cust =cust;
      this.flag = true;
    }
    
  }
}
