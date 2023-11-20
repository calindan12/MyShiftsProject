import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddShiftService } from '../add-shift.service';

interface Place {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css']
})
export class EditShiftComponent implements OnInit {

  editShiftForm:FormGroup
  shiftId:any
  constructor(private route: ActivatedRoute, private authService: AddShiftService, private router: Router) { }

  places: Place[] = [
    {value: 'Remote', viewValue: 'Remote'},
    {value: 'Office', viewValue: 'Office'},
    {value: 'Hybrid', viewValue: 'Hybrid'},
  ];

  async ngOnInit(): Promise<void> {
    this.editShiftForm = new FormGroup({
      eid: new FormControl(''),
      ecreated: new FormControl(''),
      estart: new FormControl(''),
      eend: new FormControl(''),
      eprice: new FormControl(''),
      eplace: new FormControl(''),
      eshift_name: new FormControl(''),      
    })
    this.shiftId = this.route.snapshot.paramMap.get("id");
    console.log("id:" , this.shiftId);

    (await this.authService.getShiftById(this.shiftId)).subscribe((data) => {
      console.log("start date: " , data["startTime"]);
      console.log("end date: " , data["endTime"])
      this.editShiftForm.patchValue({
        eid: data['id'],
        ecreated :  data["dateShift"],
        estart: data['startTime'],
        eend: data['endTime'],
        eprice: data['wage'],
        eplace: data['place'],
        eshift_name: data ['nameShift'],

      })
    });
  }


  async editShift(){

    var dataCurenta = new Date();
      var data1 = new Date(dataCurenta.toDateString() + ' ' + this.editShiftForm.value.estart);
      var data2 = new Date(dataCurenta.toDateString() + ' ' + this.editShiftForm.value.eend);
      console.log("data1" , data1)
      console.log("data2" , data2)
      var diferentaMilisecunde = Math.abs(data2.getTime() - data1.getTime());
      let diferentaOre = diferentaMilisecunde/(1000*60*60);
      let profit = Math.ceil(diferentaOre*this.editShiftForm.value.eprice)
      console.log("diferentaMilisecunde" , diferentaMilisecunde)
      console.log("diferentaOre" ,diferentaOre)

      console.log("inceput" , this.editShiftForm.value.estart)
      console.log("sfarsit" , this.editShiftForm.value.eend)
      console.log("profit" , profit)

    const shiftUpdated = {
      id: this.editShiftForm.value.eid,
      dateShift: this.editShiftForm.value.ecreated,
      startTime: this.editShiftForm.value.estart,
      endTime: this.editShiftForm.value.eend,
      wage: this.editShiftForm.value.eprice,
      place: this.editShiftForm.value.eplace,
      nameShift: this.editShiftForm.value.eshift_name,
      profit:profit
    }

   ;(await this.authService.updateShift(this.shiftId, shiftUpdated)).subscribe(() => {
      console.log("updated");
      this.router.navigate(['/home']);
   })
  }

}
