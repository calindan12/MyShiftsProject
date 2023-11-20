import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string ='';
  password:string = '';

  param:boolean;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  loginUser() {
   this.authService.login(this.email, this.password)
    .then(() => {
      console.log('user logged in 2');
      // this.route.navigate(['/home'])
      this.password = "";
      this.param = this.authService.invalidCredentials;
    }).catch((error) => {
      console.log("Error logging user", error)
    })
  } 
}
