import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { UserService } from './userservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  flag=true;
  user: user = new  user();
  constructor(private userService: UserService,
    private rout: Router) { }

  ngOnInit() {
  }

  save() {
    console.log("dsd : " + this.user.firstName);
    this.userService.saveUser(this.user).subscribe(response =>{
      this.flag=false;
      console.log("dsd : " + this.user.firstName);
   
    });
    this.flag = false;
    
  }
}
