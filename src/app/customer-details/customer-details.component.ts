import { Component, OnInit } from '@angular/core';
import { customer } from '../models/customer';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: customer = new customer();
  cusList:  customer[] = []
  constructor(private custService : CustTransactionsService) { }

  ngOnInit() {
    this.custService.getAllCustomer().subscribe(data => {
      console.log(data);
      this.cusList = data;
    })
  }

  checkName(){
    console.log(this.cusList);
    console.log(this.customer);
    for(let i=0; i<this.cusList.length;i++){
     
      if(this.cusList[i].name === this.customer.name) {
        window.alert("Please enter different name. Name is already exist");
        this.customer.name = "";
        return false;
      }
    } 
    return true;
  }
  validation(){
      if(this.customer.name ==='' || this.customer.date===undefined ||this.customer.mobile ==='' || this.customer.address === '') {
        return false;
      }
      return true;
  }
  saveCustomer() {
    if( this.checkName()) {
    if(this.validation()){
      this.custService.addCustomer(this.customer).subscribe(data=> {
        if(data.respCode ==='200')
        window.alert(data.message);
        this.customer = new customer();
      });
                  
      } else {
        window.alert("Enter all fields");
      }
}
  }

clear() {
  this.customer= new customer();
}
}
