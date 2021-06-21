import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { meterThree } from '../models/meterThree';
import { meterFour } from '../models/meterFour';
import { meterOne } from '../models/meterOne';
import { meterTwo } from '../models/meterTwo';
import { MeterService } from './meter.service';
import { meterDetails } from '../models/meterDetails';
import { diselCal } from '../models/diselCal';
import { petrolCal } from '../models/petrolCal';
import { Router } from '@angular/router';
import { BalanceSheetService } from '../balance-sheet/balanceSheet.service';


@Component({
  selector: 'app-meter-mgt',
  templateUrl: './meter-mgt.component.html',
  styleUrls: ['./meter-mgt.component.css']
})
export class MeterMgtComponent implements OnInit {

  met1 = new  meterOne();
  met2 = new meterTwo();
  met3 = new meterThree();
  met4 = new meterFour();
  dlCal = new diselCal();
  ptCal = new petrolCal();
  mDetails = new meterDetails();
  date: string;
  lastBalance:number =0;
  constructor(private service: MeterService, private rout: Router, private sheetService: BalanceSheetService) {
   }

  ngOnInit() {
  }

  save() {
    
    if(+this.ptCal.totalPtLtr<0) {
      window.alert('please check closing meter liters for petrol');
    } else if(+this.dlCal.totalDsLtr < 0) {
      window.alert('please check closing meter liters for Disel');
    } else if(this.ptCal.petrolRate == undefined) {
      window.alert("Please enter all Petrol rate");
    } else if(this.dlCal.diselRate == undefined) {
      window.alert("Please enter all Petrol rate");
    } else {
      this.mDetails.date = this.date;
      this.mDetails.m1 = this.met1;
      this.mDetails.m2 = this.met2;
      this.mDetails.m3 = this.met3;
      this.mDetails.m4 = this.met4;
      this.mDetails.ptCal = this.ptCal;
      this.mDetails.diselCal = this.dlCal;
      let totalSale = (+this.mDetails.ptCal.petrolSale)  + (+this.mDetails.diselCal.diselSale);
      totalSale = (Math.round(totalSale*100)/100)
      this.service.saveMeterDetails(this.mDetails).subscribe(data=>{
        if(data !== undefined && data.respCode === '200') {
        window.alert("Record saved.. Please add expenses on next page ...");
        
        this.rout.navigate(['expenses', this.mDetails.date, totalSale, this.lastBalance]);
        } else {
          window.alert("Record not saved.. Please try again...");
        }
      });
     
    }
  }

  ptLitTotal(){
    let pt1,pt2,pt3,pt4;
    pt1 = this.met1.mOpen != undefined ? +this.met1.mOpen: 0;
    pt2 = this.met1.mClose != undefined ? +this.met1.mClose: 0;
    pt3 = this.met2.mOpen != undefined ? +this.met2.mOpen: 0;
    pt4 = this.met2.mClose != undefined ?  +this.met2.mClose: 0;
    if(this.met1.mClose != undefined && this.met2.mClose != undefined) {
    let m1 = (pt2 - pt1);
    let m2 = pt4 - pt3;
    this.ptCal.totalPtLtr = (m1 + m2);
    } else if (this.met1.mClose != undefined) {
      this.ptCal.totalPtLtr = (pt2 - pt1);
    } else if (this.met2.mClose != undefined) {
      let m2 = pt4 - pt3;
      this.ptCal.totalPtLtr = (pt4 - pt3);
    }
    this.ptCal.totalPtLtr = (Math.round(+this.ptCal.totalPtLtr*100)/100);
    this.petrolRateTotal();
  }
    dsLitTotal() {
      let dM1O, dM1C, dM2O, dM2C;
      dM1O = this.met3.mOpen != undefined ? +this.met3.mOpen: 0;
      dM1C = this.met3.mClose != undefined ? +this.met3.mClose: 0;
      dM2O = this.met4.mOpen != undefined ? +this.met4.mOpen: 0;
      dM2C = this.met4.mClose != undefined ?  +this.met4.mClose: 0;
      if(this.met3.mClose != undefined && this.met4.mClose != undefined) {
      let m1 = (dM1C - dM1O);
      let m2 = dM2C - dM2O;
      this.dlCal.totalDsLtr = (m1 + m2);
      } else if (this.met3.mClose != undefined) {
        this.dlCal.totalDsLtr = (dM1C - dM1O);
      } else if (this.met4.mClose != undefined) {
        let m2 = dM2C - dM2O;
        this.dlCal.totalDsLtr = (dM2C - dM2O);
      }
      this.dlCal.totalDsLtr =  (Math.round(this.dlCal.totalDsLtr*100)/100);
      this. diselRateTotal();
    }

    petrolRateTotal() {
      if(this.ptCal.totalPtLtr !=undefined && this.ptCal.petrolRate != undefined) {
        this.ptCal.petrolSale = ((+this.ptCal.totalPtLtr) * (this.ptCal.petrolRate));
        this.ptCal.petrolSale = (Math.round(this.ptCal.petrolSale*100)/100);
      }
    }
    diselRateTotal() {
      if(this.dlCal.totalDsLtr !=undefined && this.dlCal.diselRate != undefined) {
        this.dlCal.diselSale = ((this.dlCal.totalDsLtr) * (+this.dlCal.diselRate));
        this.dlCal.diselSale = (Math.round(this.dlCal.diselSale*100)/100);
      }
    }

    getOpeningMeter1(){
      this.clear();
     
      this.sheetService.getLastBalance(this.date,this.date).subscribe(data =>{
        if(data !==undefined && data !==null){
          this.lastBalance = data.totalCashInHnd;
        }
      });
      this.service.getMeterDetails1(this.date).subscribe( data => {
        this.mDetails = data;
        this.met1 = this.mDetails.m1;
        this.met2 = this.mDetails.m2;
        this.met3 = this.mDetails.m3;
        this.met4 = this.mDetails.m4;
        if( this.mDetails.diselCal != undefined &&  this.mDetails.ptCal != undefined) {
        this.dlCal = this.mDetails.diselCal;
        this.ptCal = this.mDetails.ptCal;
        }
      });
    }
    compareOCM1(open, close) {
      if(+open > +close){
        window.alert('Please enter closing meter greater than Opening meter');       
      } 
    }
    clear() {
      this.met1.mClose=0;
      this.met2.mClose=0;
      this.met3.mClose=0;
      this.met4.mClose=0;
      this.met1.mOpen=0;
      this.met2.mOpen=0;
      this.met3.mOpen=0;
      this.met4.mOpen=0;
      this.ptCal.petrolRate=0;
      this.ptCal.petrolSale=0;
      this.ptCal.totalPtLtr=0;
      this.dlCal.diselRate=0;
      this.dlCal.diselSale=0;
      this.dlCal.totalDsLtr=0;
    }
}
