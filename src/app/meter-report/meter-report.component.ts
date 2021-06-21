import { Component, OnInit } from '@angular/core';
import { MeterService } from '../meter-mgt/meter.service';
import { petrolCal } from '../models/petrolCal';
import { diselCal } from '../models/diselCal';

@Component({
  selector: 'app-meter-report',
  templateUrl: './meter-report.component.html',
  styleUrls: ['./meter-report.component.css']
})
export class MeterReportComponent implements OnInit {

  meterType : string;
  fromDate : string;
  toDate : string;
  ptList: petrolCal[] =[];
  dsList: diselCal[] =[];
  totalDiselSale : number =0;
  totalPetrolSale : number =0;
  constructor( private service: MeterService) { }

  ngOnInit() {
  }
  validation() {
    if(this.fromDate === undefined || this.toDate === undefined){
      window.alert("Please Select From Date and To date");
      return true;
    }
    if(this.meterType === undefined){
      window.alert("Please Select meter type");
      return true;
    }
    return false;
  }
  search(){
      this.dsList =[];
      this.ptList = [];
      this.totalDiselSale = 0;
      this.totalPetrolSale = 0;
      if(this.validation()){
        return;
      }
      if(this.meterType ==='Petrol') {
        this.calPetrol('Petrol');
      }
      if(this.meterType ==='Disel') {
      this.calDisel('Disel');
      }
      if(this.meterType ==='Both') {
        this.calPetrol('Petrol');
        this.calDisel('Disel');
        }
  }

   calPetrol(type) {
      this.service.getMeterPetrolReport(type,this.fromDate,this.toDate).subscribe( data => {
        console.log(data);
       this.ptList = data;
        this.ptList.forEach(pt => {
          this.totalPetrolSale += +pt.petrolSale;
        });
      });
    }
    calDisel(type) {
      this.service.getMeterDiselReport(type,this.fromDate,this.toDate).subscribe( data => {
        console.log(data);
       this.dsList = data;
       this.dsList.forEach(ds=> {
        this.totalDiselSale += +ds.diselSale;
       });
      });
    }

    print(){
      this.dsList =[];
      this.ptList = [];
      this.totalDiselSale = 0;
      this.totalPetrolSale = 0;
      if(this.validation()){
        return;
      }
      if(this.meterType ==='Petrol') {
        this.printPetrol('Petrol');
      }
      if(this.meterType ==='Disel') {
      this.printDisel('Disel');
      }
      if(this.meterType ==='Both') {
        this.printPetrol('Petrol');
        this.printDisel('Disel');
        }
      //  window.alert("Files are downloaded at reports folder");
  }

  printPetrol(type) {
    this.service.printMeterReport(type,this.fromDate,this.toDate).subscribe (data => {
      window.alert(data.message);
    });
  
   
  }
  printDisel(type) {
    this.service.printMeterReport(type,this.fromDate,this.toDate).subscribe (data => {
      window.alert(data.message);
    });
  }

}
