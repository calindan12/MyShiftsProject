import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Place {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-edit-shift',
  templateUrl: './admin-edit-shift.component.html',
  styleUrls: ['./admin-edit-shift.component.css']
})

export class AdminEditShiftComponent implements OnInit {

 
  editShiftFormAdmin: FormGroup;
  shiftId: any
  id:any;

  places: Place[] = [
    {value: 'Remote', viewValue: 'Remote'},
    {value: 'Office', viewValue: 'Office'},
    {value: 'Hybrid', viewValue: 'Hybrid'},
  ];

  
  

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router ,  private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.editShiftFormAdmin = new FormGroup({
      eid: new FormControl(''),
      ecreated: new FormControl(''),
      estart: new FormControl(''),
      eend: new FormControl(''),
      eprice: new FormControl(''),
      eplace: new FormControl(''),
      eshift_name: new FormControl(''),      
    })

    
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.shiftId = this.route.snapshot.paramMap.get('id');
    console.log("id user: " , this.shiftId);
    (await this.authService.getShiftByIdIfAdmin(this.shiftId)).subscribe((data) => {
      console.log(data)
      this.editShiftFormAdmin.patchValue({
        eid: data['id'],
        ecreated : data["dateShift"],
        estart: data['startTime'],
        eend: data['endTime'],
        eprice: data['wage'],
        eplace: data['place'],
        eshift_name: data ['nameShift'],
      })
    })
  }

  async editShiftIfAdmin(){
    var dataCurenta = new Date();
    var data1 = new Date(dataCurenta.toDateString() + ' ' + this.editShiftFormAdmin.value.estart);
    var data2 = new Date(dataCurenta.toDateString() + ' ' + this.editShiftFormAdmin.value.eend);
    console.log("data1" , data1)
    console.log("data2" , data2)
    var diferentaMilisecunde = Math.abs(data2.getTime() - data1.getTime());
    let diferentaOre = diferentaMilisecunde/(1000*60*60);
    let profit = Math.ceil(diferentaOre*this.editShiftFormAdmin.value.eprice)

    const shiftUpdated = {
      id: this.editShiftFormAdmin.value.eid,
      dateShift: this.editShiftFormAdmin.value.ecreated,
      startTime: this.editShiftFormAdmin.value.estart,
      endTime: this.editShiftFormAdmin.value.eend,
      wage: this.editShiftFormAdmin.value.eprice,
      place: this.editShiftFormAdmin.value.eplace,
      nameShift: this.editShiftFormAdmin.value.eshift_name,
      profit:profit
    };
    (await this.authService.updateShiftIfAdmin(this.shiftId, shiftUpdated)).subscribe(() => {
      console.log('shift updated');
      this.router.navigate(['/all-users'])
    })
  }
}
