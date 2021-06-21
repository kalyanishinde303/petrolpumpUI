import { Component, OnInit } from '@angular/core';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';
import { customer } from '../models/customer';

@Component({
  selector: 'app-delete-cust',
  templateUrl: './delete-cust.component.html',
  styleUrls: ['./delete-cust.component.css']
})
export class DeleteCustComponent implements OnInit {

  custList: customer[]=[];
  id:number;
  cust1: customer ;
  constructor(private custService: CustTransactionsService) { }

  ngOnInit() {
    this.loadCustList();
  }

  loadCustList() {
    this.custService.getAllCustomer().subscribe(data => {
      if(data!== undefined || data!== null){
        this.custList = data;
      } else {
        window.alert("Customer list not found");
      }
    });
  }
  delete() {
    let cs;

    this.custList.forEach(cust => {
       if(cust.id == this.id){
        let msg = window.prompt("You are deleting '"+ cust.name + "' type 'OK' if you dont want do delete type 'NO");
        if(msg ==='OK' || msg === 'ok'){
          this.custService.deleteCustomer(cust).subscribe(data => {
            window.alert(data.message);
          });
          this.loadCustList();
       }
      }
    });
   
  }

}
