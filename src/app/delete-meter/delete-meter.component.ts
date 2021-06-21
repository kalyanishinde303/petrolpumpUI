import { Component, OnInit } from '@angular/core';
import { MeterService } from '../meter-mgt/meter.service';

@Component({
  selector: 'app-delete-meter',
  templateUrl: './delete-meter.component.html',
  styleUrls: ['./delete-meter.component.css']
})
export class DeleteMeterComponent implements OnInit {

  constructor(private service: MeterService) { }

  ngOnInit() {
  }

  delete(){
    let k = window.prompt("Are You sure to delete all records if yes then type 'ok' otherwise type 'no'")
    if(k==='ok') {
     this.service.deleteMeter().subscribe(data =>{
      window.alert(data.message);
    })
    }

  }
}
