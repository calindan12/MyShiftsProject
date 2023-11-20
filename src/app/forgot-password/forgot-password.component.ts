import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(private authSevice: AuthService){

  }

  email:any;
  emails:any
  id:any;
  valid:boolean;
  deleted:boolean

  async send(){
    this.valid = true
    this.deleted = true;
    console.log("email: " , this.email);
    (await this.authSevice.getUserWithEmail(this.email)).subscribe((data) => {
      let result = data;
      if(Object.keys(result).length == 0){
        this.deleted = true
        this.valid = false
        console.log("valid: " , this.valid , "deleted: " , this.deleted)
        this.email = '';
      }else{
        console.log("userul este: " , result)
        this.id = result[0].uid;
        console.log("id: " , this.id)
        const emailuriUtilizatori = Object.values(result).map((utilizator) => utilizator['email']);
        emailuriUtilizatori.filter((value)=>{
          if(value == this.email){
            console.log("am gasit email: " , this.email)
            const continuaOperatie = window.confirm("Doriți să stergeti utilizatorul?");
            if (continuaOperatie) {
              console.log("Operația a fost confirmată.");
              console.log(this.id)
              this.deleteUser(this.id)
              this.deleted = false
              this.valid = true
              this.email = '';
            } else {
              console.log("Operația a fost anulată.");
            }
          }else{
            console.log("nu am gasit emailul: " , this.email)
          }
        })
      }
    })

    
    // console.log("aici" , this.result)
    
  }

  async deleteUser(uidUser: any){
    (await this.authSevice.deleteUserWhenForgetingPassword(uidUser)).subscribe(() => {
    })
  }



}
