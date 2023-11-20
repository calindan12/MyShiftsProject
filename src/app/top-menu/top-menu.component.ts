import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService, private route: Router){}

  async ngOnInit(): Promise<void> {
   (await this.authService.getCurrentUser()).subscribe((user) => {
    
      this.currentUser = user;
      console.log("aceste este userul: " , this.currentUser)
   })
  }

  logout(){
    if(this.currentUser){
      const auth = getAuth();
      signOut(auth);
    }
  }

}
