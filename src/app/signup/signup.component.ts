import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup
  emailAlreadyExists:boolean;
  allUsers: any[];
  passwordForgotten : boolean;


  constructor(private authService: AuthService, private route: Router , private firestore: Firestore) { }

  async ngOnInit():Promise<void>{
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}$')]),
      lname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}$')]),
      email: new FormControl('', [Validators.required, this.emailFormatValidator]),
      age: new FormControl('', [Validators.required, this.ageRangeValidator(18, 65)]), 
      password: new FormControl('', [Validators.required, this.passwordFormatValidator]),
      retypedPassword: new FormControl('', [Validators.required]),
      shifts: new FormControl([])
    });
    (await (this.authService.getAllUsers())).subscribe((usersFromService) => {
      this.allUsers = [...Object.values(usersFromService)];
      console.log(this.allUsers)
    })
  }

val:Boolean



  async register(){
    const { fname, lname, email, age,  password , shifts} = this.registerForm.value
   this.val =  this.accountAlreadyExists();
   console.log("va: " , this.val)
    
    this.authService.signUp(email, password, fname, lname , age , shifts)
    .then(() => {
      console.log("validare4:"  , this.authService.registered)
      if(this.authService.registered === true || this.val === false){
        console.log("validare2:" , this.val)
        this.route.navigate(['/user/login'])
      }else{
        console.log("validare3:"  , this.val)
        console.log("error la autentificare")
        this.registerForm.reset()
      }
    }).catch((err) => {
      console.error("Error adding user:", err);
    })
  }

 
  get fname(){
    return this.registerForm.get('fname');
  }

  get lname(){
    return this.registerForm.get('lname');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
  get age(){
    return this.registerForm.get('age');
  }

  emailFormatValidator(control: FormControl){
    const emailPattern = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
  
    return null;
  }

   ageRangeValidator(minAge: number, maxAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const age = control.value;
      if (age >= minAge && age <= maxAge) {
        return null; // Vârsta este în interval
      } else {
        return { ageRange: true }; // Vârsta nu este în interval
      }
    };
  }





accountAlreadyExists():Boolean{
      try {
        console.log("useri: " , this.allUsers)
        console.log(this.email.value)
        const rezultat = this.allUsers.filter(element => element.email === this.email.value);
        console.log("rezultat: " , rezultat)
        if (rezultat.length != 0){
          console.log("rezultat: " , rezultat)
          alert("alerta")
          return true
        }else{
          return false
        }
      } catch (error) {
       console.log("eroare: " , error)
      }
  
}


  passwordFormatValidator(control:FormControl){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // retypePasswordCheckValidator(control:FormControl){
  //   if (control.value != this.password) {
  //     return { retypedPasswordError: true };
  //   }
  //   return null;
  // }

  forgotPassword() {
    this.passwordForgotten = true;
  }

}