import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup

  constructor(private authService: AuthService, private route: Router) { }

  async ngOnInit(): Promise<void> {
    this.editProfileForm = new FormGroup({
      uid: new FormControl(''),
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      isAdmin: new FormControl(''),
      shifts: new FormControl('')
    })

    ;(await this.authService.getCurrentUser()).subscribe((data) => {
      this.editProfileForm.patchValue({
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
    const profileInfo = {
      uid: this.editProfileForm.value.uid,
      fname: this.editProfileForm.value.fname,
      lname: this.editProfileForm.value.lname,
      email: this.editProfileForm.value.email,
      password: this.editProfileForm.value.password,
      isAdmin: this.editProfileForm.value.isAdmin,
      shifts: this.editProfileForm.value.shifts
    }
    ;(await this.authService.updateProfile(profileInfo)).subscribe(() => {
      console.log('profile updated');
      this.route.navigate(['home'])

    })
  }

}
