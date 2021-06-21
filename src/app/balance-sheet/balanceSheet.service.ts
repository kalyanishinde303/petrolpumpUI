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
export class BalanceSheetService {

  constructor(private http: HttpClient) { }

  
  saveBalanceSheet(sheet :  balancesheet): Observable<responseGen>{
   
    console.log("calling");
    return this.http.post<responseGen>(environment.url+"/saveBalanceSheet", sheet);
  
  }
  
  getBalanceSheet(fromDate,toDate): Observable<balancesheet[]> {
   
    return this.http.get<balancesheet[]>(environment.url+"/getBalanceSheet?fromDate="+ fromDate + "&" + "toDate="+ 
    toDate );
  
  }
  getLastBalance(fromDate,toDate): Observable<balancesheet> {
   
    return this.http.get<balancesheet>(environment.url+"/getLastBalance?fromDate="+ fromDate + "&" + "toDate="+ 
    toDate );
  
  }
  printBalanceSheetReport(fromDate,toDate): Observable<responseGen> {
   
    return this.http.get<responseGen>(environment.url+"/printBalanceSheetReport?fromDate="+ fromDate + "&" + "toDate="+ 
    toDate );
  
  }
}
