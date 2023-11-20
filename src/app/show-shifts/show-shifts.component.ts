import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddShiftService } from '../add-shift.service';

@Component({
  selector: 'app-show-shifts',
  templateUrl: './show-shifts.component.html',
  styleUrls: ['./show-shifts.component.css']
})
export class ShowShiftsComponent implements OnInit{

  userUid: any
  shifts:any;
  users:any


  async ngOnInit(): Promise<void> {

    this.userUid = this.activatedRoute.snapshot.paramMap.get('id');
    // get all the shifts for a specific user
    (await(this.authService.getUserShifts(this.userUid))).subscribe((data) => {
      console.log("info: " , data[0])
      this.shifts = data[0];
    })
  }
  constructor(private authService: AuthService , private route: Router, private activatedRoute: ActivatedRoute) { }
  
  async deleteShift(userUid:any , shiftId:any){
    (await this.authService.deleteUsersShift(userUid, shiftId)).subscribe((data)=>{
      console.log("data: " ,data)
      this.shifts = data;
      console.log('shift deleted')
      console.log("shifturi:" , this.shifts)
    })
  }
  

}
