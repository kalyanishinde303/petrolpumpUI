import { Component, OnInit, Input } from '@angular/core';
import { transaction } from '../models/transaction';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';
import { customer } from '../models/customer';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  @Input()cust:customer;
  transactionList: transaction[] = [];
  constructor(private custService : CustTransactionsService) { }

  ngOnInit() {

    this.tranDetails();
  }

  tranDetails() {
   if(this.cust !== undefined){
    this.custService.getOneTranCust(this.cust).subscribe(data => {
          this.transactionList = data;
        });
    
  } else {
    this.transactionList = [];
  }


}

print() {
  if(this.cust !== undefined){
   this.custService.printOneTranCust(this.cust).subscribe(data => {
          window.alert(data.message);
       });
   
 } else {
   this.transactionList = [];
 }

 
}
}
