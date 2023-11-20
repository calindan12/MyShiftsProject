import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit{
  shifts:any;

  constructor(private authService:AuthService , private route:Router){

  }

  async ngOnInit(): Promise<void> {
    (await this.authService.getAllUsers()).subscribe((data) => {
      this.shifts = data;
      console.log(this.shifts)
    })
  }
  async deleteShift(userUid , shiftId){
    console.log("id: " , shiftId);
    (await this.authService.deleteShiftUserIfAdmin(userUid, shiftId)).subscribe((data)=>{
      this.shifts = data;
      console.log('shift deleted')
      console.log(this.shifts)
    })
  }
}
