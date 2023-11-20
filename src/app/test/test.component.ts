import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  constructor(private authService: AuthService, private route: Router){}

  currentUser: any | null;


  async ngOnInit(): Promise<void> {
    (await this.authService.getCurrentUser()).subscribe((user) => {
     
       this.currentUser = user;
       console.log(this.currentUser)
    })
   }

   

}
