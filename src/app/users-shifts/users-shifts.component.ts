import { Component, OnInit } from '@angular/core';
import { AddShiftService } from '../add-shift.service';

@Component({
  selector: 'app-users-shifts',
  templateUrl: './users-shifts.component.html',
  styleUrls: ['./users-shifts.component.css']
})
export class UsersShiftsComponent implements OnInit {
  shifts: any;
  startDate: any;
  endDate: any;

  shiftName:any;

  constructor(private auth: AddShiftService) { }

  async ngOnInit(): Promise<void> {
    (await this.auth.getShiftsFromCurrentUser('' , '' , '')).subscribe((shifts) => {
      this.shifts = shifts;
    })
  }
  async delete(id:any){
  try {
    (await this.auth.deleteShift(id)).subscribe((data)=>{
      this.shifts = data;
    })
  } catch (error) {
    console.log("error")
  }
}
async searchByDate(){
  console.log(this.startDate, this.endDate)
  ;(await this.auth.getShiftsFromCurrentUser(this.startDate, this.endDate , '')).subscribe((data) => {
    console.log("shifts nou:" , this.shifts)
    this.shifts = data;
  })
}

async searchByName(){
  console.log(this.shiftName)
  ;(await this.auth.getShiftsFromCurrentUser('' , '' , this.shiftName)).subscribe((data) => {
    this.shifts = data;
  })

}

}


