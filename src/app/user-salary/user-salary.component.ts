import { Component, OnInit } from '@angular/core';
import { AddShiftService } from '../add-shift.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-user-salary',
  templateUrl: './user-salary.component.html',
  styleUrls: ['./user-salary.component.css']
})
export class UserSalaryComponent implements OnInit {

  salarii: any;
  arrayProfits:any;
  profits:any[] = [];
  arrayLuni = [0,0,0,0,0,0,0,0,0,0,0,0];


  async ngOnInit(): Promise<void> {
    (await this.auth.getShiftsFromCurrentUser('' , '' , '')).subscribe((shifts) => {
      this.salarii = shifts;

      // let profits: number[] = [];
      for(let i=0 ;i < this.salarii.length ; i++){
        console.log(this.salarii[i])
        console.log("tip:" , typeof this.profits)
        this.profits.push(this.salarii[i])       
      }

      console.log("profituri1:" ,this.profits)
      this.arrayProfits = [...this.profits]
      console.log("profituri2:" , this.arrayProfits)
      // this.arrayProfits = profits
      console.log(this.arrayProfits[0])
      let array = (this.arrayProfits).forEach((element)=>{
        console.log("element" , element)
        let data = new Date(element.dateShift);
        let nrLuna = data.getMonth()
        this.arrayLuni[nrLuna] = this.arrayLuni[nrLuna] + element.profit
      })

      
      console.log("arrayLuni" , this.arrayLuni)
        

    var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
      labels: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie' , 'Iulie' , 'August','Septembrie','Octombrie','Noiembrie','Decembrie'],
        datasets: [{
            label: 'profit/month',
            data: this.arrayLuni,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(100, 50, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(90, 30, 110, 0.5)',
              'rgba(50, 100, 150, 0.5)',
              'rgba(100, 48, 10, 0.5)',
              'rgba(100, 48, 10, 0.5)',
              'rgba(100, 88, 50, 0.5)',
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

  constructor(private auth: AddShiftService) { }



  

}
