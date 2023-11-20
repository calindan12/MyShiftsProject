import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddShiftService } from '../add-shift.service';
import { get } from '@angular/fire/database';
import { getAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface Place {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css'],
})
export class AddShiftComponent implements OnInit {

  places: Place[] = [
    {value: 'Remote', viewValue: 'Remote'},
    {value: 'Office', viewValue: 'Office'},
    {value: 'Hybrid', viewValue: 'Hybrid'},
  ];

  currentUser: any|null;

  addShiftForm: FormGroup;



  constructor(private service : AddShiftService , private authService: AuthService , private router:Router){}

  selectedPlace: string;
  shifts:any;

  ngOnInit(): void {
    this.addShiftForm = new FormGroup({
      id: new FormControl(''),
      nameShift: new FormControl("" , [Validators.required]),
      dateShift: new FormControl("",[Validators.required]),
      startTime: new FormControl("",[Validators.required]),
      endTime: new FormControl("",[Validators.required]),
      wage: new FormControl("",[Validators.required]),
      place: new FormControl("",[Validators.required]),
    })
  }


  param :any;
  shiftName:string;

  error:boolean;
  async checkShiftName(){
    // console.log("shift name: " + this.addShiftForm.value.nameShift);
    
    // let nume:any
    (await this.service.getShiftsFromCurrentUser("" , "" , "")).subscribe((shifts) => {
      this.shifts = shifts;
      this.param = this.shifts.find((shift: { nameShift: any; }) => shift.nameShift === this.addShiftForm.value.nameShift)
      if(this.param){
          console.log("nume existent")
          this.shiftName = this.addShiftForm.value.nameShift;
          return true
       }else{
        return true
      }
      // nume = param.nameShift
      // console.log("am gasit: " , nume)
   })
  }

  invalidShiftName:Boolean

  async shiftNameValidator(){
    if(this.addShiftForm.value.nameShift === this.shiftName){
      console.log("am intrat aici")
      return { invalidShiftName: false };
    }else{
      return null
    }

  //   (await this.service.getShiftsFromCurrentUser()).subscribe((shifts) => {
  //     this.shifts = shifts;
  //     this.param = this.shifts.find((shift: { nameShift: any; }) => shift.nameShift === this.addShiftForm.value.nameShift)
  //     if(this.param){
  //         console.log("nume existent")
  //         this.shiftName = this.addShiftForm.value.nameShift;
  //         return true
  //      }else{
  //       return true
  //     }
  //     // nume = param.nameShift
  //     // console.log("am gasit: " , nume)
  //  })


  }

  show(){
    console.log("nume: " , this.shiftName)
  }


  async addShift(){
    var dataCurenta = new Date();
    var data1 = new Date(dataCurenta.toDateString() + ' ' + this.addShiftForm.value.startTime);
    var data2 = new Date(dataCurenta.toDateString() + ' ' + this.addShiftForm.value.endTime);
    console.log("data1" , data1)
    console.log("data2" , data2)
    var diferentaMilisecunde = Math.abs(data2.getTime() - data1.getTime());
    let diferentaOre = diferentaMilisecunde/(1000*60*60);
    let profit = Math.ceil(diferentaOre*this.addShiftForm.value.wage)
    console.log("inceput" , this.addShiftForm.value.startTime)
    console.log("sfarsit" , this.addShiftForm.value.startTime)
    console.log("profit" , this.addShiftForm.value.profit)

    const shift = {
        id:this.generateRandomId(),
        nameShift: this.addShiftForm.value.nameShift,
        dateShift: this.addShiftForm.value.dateShift,
        startTime: this.addShiftForm.value.startTime,
        endTime: this.addShiftForm.value.endTime,
        wage: this.addShiftForm.value.wage,
        place: this.addShiftForm.value.place,
        profit: profit,
    };

    console.log("shifts: " , shift);
    (await this.service.addNewShift(shift)).subscribe(()=>{
        console.log("shift added")
        // alert("shift added")
        this.addShiftForm.reset()
        this.router.navigate(['/addShift'])
      }),
      (error)=>{
        console.log('Error adding the Shift')
      }
  }

  generateRandomId(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    const charactersLength = characters.length;
    for(let i = 0 ; i < 6; i ++){
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex)
    }
    return result;
  }


  get nameShift(){
    return this.addShiftForm.get('nameShift');
  }


  get dateShift(){
    return this.addShiftForm.get('dateShift');
  }

  get startTime(){
    return this.addShiftForm.get('startTime');
  }
  get endTime(){
    return this.addShiftForm.get('endTime');
  }
  get wage(){
    return this.addShiftForm.get('wage');
  }
  get place(){
    return this.addShiftForm.get('place');
  }

 

}
