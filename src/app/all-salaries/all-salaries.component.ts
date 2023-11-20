import { Component, OnInit } from '@angular/core';
import { AddShiftService } from '../add-shift.service';
import * as Chart from 'chart.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-salaries',
  templateUrl: './all-salaries.component.html',
  styleUrls: ['./all-salaries.component.css']
})
export class AllSalariesComponent implements OnInit {
  useri: any;
  usersNames:any[] = [];
  arrayUtilizatori:any;
  utilizatori:any[] = [];
  arrayNames = [0,0,0,0,0,0,0,0,0,0,0,0];
  arrayProfits:any;
  suma:any =0;
  arraySume:any[] = [];





  async ngOnInit(): Promise<void> {
    (await this.auth.getAllUsers()).subscribe((users) => {
      this.useri = users;

      // let profits: number[] = [];
      for (let i = 0; i < this.useri.length; i++) {
        let suma = 0; // Inițializați suma pentru fiecare utilizator
        this.usersNames.push(this.useri[i].fname + " " + this.useri[i].lname);
    
        for (let j = 0; j < this.useri[i].shifts.length; j++) {
          suma += this.useri[i].shifts[j].profit;
        }
    
        this.arraySume.push(suma);
      }

      
      console.log("arrayLuni" , this.arraySume)
        

    var myChart = new Chart("adminChart", {
    type: 'bar',
    data: {
        labels: this.usersNames,
        datasets: [{
            label: 'profit/month',
            data: this.arraySume,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(0, 0, 0, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      scales:{
        
      }
    }
});

    })

  }

  constructor(private auth: AuthService) { }

}
