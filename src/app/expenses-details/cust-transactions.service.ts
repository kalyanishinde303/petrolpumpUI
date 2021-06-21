import { Injectable } from '@angular/core';

import { customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transaction } from '../models/transaction';
import { expenses } from '../models/expenses';
import { environment } from 'src/environments/environment';
import { responseGen } from '../models/ResponseGen';
import { balancesheet } from '../models/balancesheet';

@Injectable({
  providedIn: 'root'
})
export class CustTransactionsService {

  constructor(private http: HttpClient) { }

  saveCustTrans(customerTran :  customer[]): Observable<string>{
   
    console.log("calling");
    return this.http.post<string>(environment.url+"/saveCustTransactions", customerTran);
  
  }
  saveTransactions(transactionList :  transaction[]): Observable<responseGen>{
   
    console.log("calling");
    return this.http.post<responseGen>(environment.url+"/saveTransactions", transactionList);
  
  }
  saveBalanceSheet(sheet :  balancesheet): Observable<responseGen>{
   
    console.log("calling");
    return this.http.post<responseGen>(environment.url+"/saveBalanceSheet", sheet);
  
  }
  saveExpenses(expList :  expenses[]): Observable<string>{
   
    return this.http.post<string>(environment.url+"/saveExpenses", expList);
  
  }
  addCustomer(customer :  customer):Observable<responseGen>{
   
    return this.http.post<responseGen>(environment.url+"/addCustomer", customer);
  
  }
  deleteCustomer(customer :  customer):Observable<responseGen>{
   
    return this.http.post<responseGen>(environment.url+"/deleteCustomer", customer);
  
  }
  getAllCustomer(): Observable<customer[]> {
   
    console.log("calling");
    return this.http.get<customer[]>(environment.url+"/getCustomers");
  
  }
  getAllTranCust(): Observable<customer[]> {
   
    console.log("calling");
    return this.http.get<customer[]>(environment.url+"/getAllCustTransDetails");
  
  }

  getOneTranCust(customer :  customer): Observable<transaction[]> {
   
    console.log("calling");
    return this.http.get<transaction[]>(environment.url+"/getOneCustTransDetails?custId="+customer.id);
  
  }
  printOneTranCust(customer :  customer): Observable<responseGen> {
   
    return this.http.get<responseGen>(environment.url+"/printOneCustTransDetails?custId="+customer.id);
  
  }
  upodateCustBalance(customer :  customer[]){
   
    console.log("calling");
    return this.http.post<string>(environment.url+"/upodateCustBalance", customer);
  
  }

  generatePDF(date : string):Observable<responseGen>{
    return this.http.get<responseGen>(environment.url+"/generatePDF?date="+date);
  
  }

  
  getTranBasedOnDate(custId, fromDate,toDate, tranType): Observable<transaction[]> {
   
    return this.http.get<transaction[]>(environment.url+"/getTranBasedOnDate?custId="
    +custId+ "&" + "fromDate="+ fromDate + "&" + "toDate="+ toDate +  "&" + "tranType="+ tranType);
  
  }
  getSelectedDateTran(selectedDate): Observable<transaction[]> {
   
    return this.http.get<transaction[]>(environment.url+"/getSelectedDateTran?selectedDate="+selectedDate);
  
  }
  
  printTranBasedOnDate(custId, fromDate,toDate, tranType): Observable<responseGen> {
   
    return this.http.get<responseGen>(environment.url+"/printTranBasedOnDate?custId="
    +custId+ "&" + "fromDate="+ fromDate + "&" + "toDate="+ toDate +  "&" + "tranType="+ tranType);
  
  }
  getExpensesReport(fromDate,toDate): Observable<expenses[]> {
   
    return this.http.get<expenses[]>(environment.url+"/getExpensesReport?fromDate="+ fromDate + "&" + "toDate="+ 
    toDate );
  
  }
  printExpensesReport(fromDate,toDate): Observable<responseGen> {
   
    return this.http.get<responseGen>(environment.url+"/printExpensesReport?fromDate="+ fromDate + "&" + "toDate="+ 
    toDate );
  
  }
}
