import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { meterDetails } from '../models/meterDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { petrolCal } from '../models/petrolCal';
import { diselCal } from '../models/diselCal';
import { responseGen } from '../models/ResponseGen';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  mDetails = new meterDetails();
  constructor(private http: HttpClient) { }


  getMeterDetails1(meterDate: String):Observable<meterDetails> {
   
    return this.http.get<meterDetails>(environment.url+"/getOpeningMeter?date="+meterDate);

  }
  getBalance(meterDate: String):Observable<meterDetails> {
    
    return this.http.get<meterDetails>(environment.url+"/getBalance?date="+meterDate);

  }
  deleteMeter():Observable<responseGen> {
    
    return this.http.get<responseGen>(environment.url+"/deleteAllMeterDetails");

  }
  saveMeterDetails(meter: meterDetails):Observable<responseGen>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<responseGen>(environment.url+"/saveMeterDetails",meter);
  }

  getMeterPetrolReport(meterType,fromDate, toDate):Observable<petrolCal[]> {
    
    return this.http.get<petrolCal[]>(environment.url+"/getMeterReport?fromDate="+ fromDate + "&" + "toDate="+ toDate +  "&" + "meterType="+ meterType);
  

  }
  getMeterDiselReport(meterType,fromDate, toDate):Observable<diselCal[]> {
    
    return this.http.get<diselCal[]>(environment.url+"/getMeterReport?fromDate="+ fromDate + "&" + "toDate="+ toDate +  "&" + "meterType="+ meterType);
  

  }
  printMeterReport(meterType,fromDate, toDate):Observable<responseGen> {
    
     return this.http.get<responseGen>(environment.url+"/printMeterReport?fromDate="+ fromDate + "&" + "toDate="+ toDate +  "&" + "meterType="+ meterType);
  

  }
}
