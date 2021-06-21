import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from '../models/JwtRequest';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enable=true;
  clicked=true;
  jwtRequest: JwtRequest = new JwtRequest();
  constructor(private loginService : LoginService
              , private rout: Router) { }

  ngOnInit() {
  }
  clickedBtn(){
    if(this.clicked)
    this.clicked = false;
    else  this.clicked = true;
  }
  login() {
    
    this.loginService.login(this.jwtRequest).subscribe(resp => {
       this.enable= false;
      this.rout.navigate(['welcome']);
    })
  }
}
