import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: any
  userUid:any

  constructor(private authSevice: AuthService) { }

  async ngOnInit(): Promise<void> {
    (await this.authSevice.getAllUsers()).subscribe((data) => {
      this.users = data;
      console.log(this.users)
    })
}


  async deleteUser(uidUser){
    (await this.authSevice.deleteUser(uidUser)).subscribe((data) => {
      this.users = data;
    })
  }

}
