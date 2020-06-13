import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent{
  

  public pieChartLabels = ['United States','Australia','Canada'];
  public pieChartData = [120,200,50,300];
  public pieChartType = 'pie';

  constructor() { 
    
    var date = new Date('01/01/2020 23:51:34');
    console.log(date.getHours()); // "Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)"    console.log( timeNow("011-04-20T09:30:51.01") ); 

  }
}

