import { Injectable } from '@angular/core';

import { customer } from '../models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transaction } from '../models/transaction';
import { expenses } from '../models/expenses';
import { environment } from 'src/environments/environment';
import { responseGen } from '../models/ResponseGen';
import { balancesheet } from '../models/balancesheet';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(user :  user): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       
      })
    };
  
    console.log("calling");
    let data = JSON.stringify(user)
    return this.http.post<string>(environment.url+"/user", data, httpOptions);
  }
}
