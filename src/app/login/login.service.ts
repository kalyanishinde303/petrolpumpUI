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
import { JwtRequest } from '../models/JwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(jwtRequest :  JwtRequest): Observable<string>{
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
    console.log("calling");
    let data = JSON.stringify(jwtRequest)
    return this.http.post<string>(environment.url+"/authenticate", jwtRequest, httpOptions);
  }
}
