import { Component, OnInit } from '@angular/core';
import { customer } from '../models/customer';
import { CustTransactionsService } from '../expenses-details/cust-transactions.service';

@Component({
  selector: 'app-cust-update',
  templateUrl: './cust-update.component.html',
  styleUrls: ['./cust-update.component.css']
})
export class CustUpdateComponent implements OnInit {

  customer: customer = new customer();
  custList: customer[]=[]
  id:number;
  constructor(private custService : CustTransactionsService) { }


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

  changeCust(){
    this.custList.forEach(t =>{
      if(t.id == this.id){
        this.customer = t;
      }
    })
  }
  saveCustomer() {
    
    if(this.validation()){
      this.custService.addCustomer(this.customer).subscribe(data=> {
        if(data.respCode ==='200')
        window.alert(data.message);
        this.clear();
        this.customer = new customer();
        this.loadCustList();
      });
                  
      } else {
        window.alert("Enter all fields");
      }

  }
  validation(){
    if(this.customer.name ==='' || this.customer.date===undefined ||this.customer.mobile ==='' || this.customer.address === '') {
      return false;
    }
    return true;
}
clear() {
  this.customer= new customer();
  this.id=undefined;
}
}
