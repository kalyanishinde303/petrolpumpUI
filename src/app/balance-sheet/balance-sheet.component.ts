import { Component, OnInit } from '@angular/core';
import { BalanceSheetService } from './balanceSheet.service';
import { balancesheet } from '../models/balancesheet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  sheetList: balancesheet []=[];
  fromDate:string;
  toDate: string;
  totalAmount: number =0;
  constructor(private service: BalanceSheetService, private d: DatePipe) { }

  ngOnInit() {
  }
  validation() {
    if(this.fromDate === undefined || this.toDate === undefined){
      window.alert("Please Select From Date and To date");
      return true;
    }
   
    return false;
  }
  search() {
    if(this.validation()){
      return;
    }
    this.sheetList = [];
    this.totalAmount = 0;
    this.service.getBalanceSheet(this.fromDate, this.toDate).subscribe (data =>{
      data.forEach( s => {
        s.sheetDate =   this.d.transform(new Date(s.sheetDate),"dd-MM-yyyy");
        console.log("Date"+s.sheetDate);
      }); 
      this.sheetList = data; 
    });  
     
 
  }

  print() {
    if(this.validation()){
      return;
    }
    
    this.service.printBalanceSheetReport(this.fromDate, this.toDate).subscribe (data =>{
      window.alert(data.message);
    })
  }
}
