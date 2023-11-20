import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.css']
})
export class AdminEditProfileComponent implements OnInit {

  editProfileIfAdmin: FormGroup;
  userUid: any

  constructor(private authService: AuthService, private route: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.editProfileIfAdmin = new FormGroup({
      uid: new FormControl(''),
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isAdmin: new FormControl(),
      shifts: new FormControl()
    })

    this.userUid = this.activatedRoute.snapshot.paramMap.get('id');


    (await this.authService.getUserByUidIfAdmin(this.userUid)).subscribe((data) => {
      console.log(this.userUid)
      this.editProfileIfAdmin.patchValue({
        uid: data['uid'],
        fname: data['fname'],
        lname: data['lname'],
        email: data['email'],
        password: data['password'],
        isAdmin: data['isAdmin'],
        shifts: data['shifts']
      })
    })
  }

  async editProfile(){
    const newData = {
      fname: this.editProfileIfAdmin.value.fname,
      lname: this.editProfileIfAdmin.value.lname,
      email: this.editProfileIfAdmin.value.email,
      shifts: this.editProfileIfAdmin.value.shifts
    }
    console.log(this.userUid, newData)
    ;(await this.authService.updateProfileUserIfAdmin(this.userUid, newData)).subscribe(() => {
      console.log('updated')
      this.route.navigate(['/all-users'])
    })
    
  }

}
