import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppComponent } from './../app.component';
import { Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css'],
})
export class MyBarChartComponent {
  recive: boolean = true;
  //Data for charts number of detections
  arrayTimeGlobal: any[] = [];
  arrayCountryGlobal: any[] = [];
  arrayNbOfDetectionsGlobal: any[] = [];
  arrayNbOfViolationsGlobal: any[] = [];
  countriesAvaregaDetections: any[] = [];
  arrayAvgDetectionsMonthsGlobal: any[] = [];
  arrayAvgDetectionsDaysGlobal: any[] = [];
  arrayAvgDetectionsHoursGlobal: any[] = [];
  pieChartDataPlaces: any[] = [];
  pieChartDataMonths: any[] = [];
  pieChartDataDays: any[] = [];
  pieChartDataHours: any[] = [];

  public lineChartData: ChartDataSets[] = [];

  // Attributes for bar charts
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
  };
  // Default data for pie
  public pieChartType = 'pie';

  // default data fior chart detections
  public barChartData = [
    { data: [], label: 'Detected Individuals' },
    { data: [], label: 'Social distancing Violations' },
  ];
  // CHART COLOR.
  public barChartColors: Color[] = [
    { backgroundColor: 'blue' },
    { backgroundColor: 'red' },
  ];

  public colorsPie = [
    {
      backgroundColor: [
        '#FF6633',
        '#FFB399',
        '#FF33FF',
        '#FFFF99',
        '#00B3E6',
        '#E6B333',
        '#3366E6',
        '#999966',
        '#99FF99',
        '#B34D4D',
        '#80B300',
        '#809900',
        '#E6B3B3',
        '#6680B3',
        '#66991A',
        '#FF99E6',
        '#CCFF1A',
        '#FF1A66',
        '#E6331A',
        '#33FFCC',
        '#66994D',
        '#B366CC',
        '#4D8000',
        '#B33300',
        '#CC80CC',
        '#66664D',
        '#991AFF',
        '#E666FF',
        '#4DB3FF',
        '#1AB399',
        '#E666B3',
        '#33991A',
        '#CC9999',
        '#B3B31A',
        '#00E680',
        '#4D8066',
        '#809980',
        '#E6FF80',
        '#1AFF33',
        '#999933',
        '#FF3380',
        '#CCCC00',
        '#66E64D',
        '#4D80CC',
        '#9900B3',
        '#E64D66',
        '#4DB380',
        '#FF4D4D',
        '#99E6E6',
        '#6666FF',
      ],
    },
  ];
  public barChartLabels = [];
  // default data fior chart violations
  // public barChartData1 =[
  //   {data: [], label: 'Social distancing Violations'},
  //   {data: [], label: 'Series B'}
  // ];
  public barChartLabels1 = [];

  // Attributes for pie charts Locations
  public pieChartLabelsPlaces = [
    'Camera Location 1',
    'Camera Location 2',
    'Camera Location 3',
  ];
  // Attributes for pie charts Months
  public pieChartLabelsMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // Attributes for pie charts Days
  public pieChartLabelsDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  // Attributes for pie charts Days
  public pieChartLabelsHours = [
    '00h',
    '01h',
    '02h',
    '03h',
    '04h',
    '05h',
    '06h',
    '07h',
    '08h',
    '09h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h',
    '23h',
  ];

  // Default Attributes for line Chart
  public lineChartLegend = true;

  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
  };

  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  public lineChartLabels = [];

  receiveMessage($event) {
    this.recive = false;
    let sliceSize = 150;
    console.log('From receiver');

    this.arrayTimeGlobal = $event[0];
    this.arrayCountryGlobal = $event[1];
    this.arrayNbOfDetectionsGlobal = $event[2];
    this.arrayNbOfViolationsGlobal = $event[3];
    this.countriesAvaregaDetections = $event[4];
    this.arrayAvgDetectionsMonthsGlobal = $event[5];
    this.arrayAvgDetectionsDaysGlobal = $event[6];
    this.arrayAvgDetectionsHoursGlobal = $event[7];

    //Displaying the data for pie places
    var totalNumberOfdetctionsCountries = 0;
    var counterCountries = 0;
    while (counterCountries < this.countriesAvaregaDetections.length) {
      totalNumberOfdetctionsCountries += this.countriesAvaregaDetections[
        counterCountries++
      ];
    }
    console.log(totalNumberOfdetctionsCountries);
    this.pieChartDataPlaces = [
      (this.countriesAvaregaDetections[0] / totalNumberOfdetctionsCountries) *
        100,
      (this.countriesAvaregaDetections[1] / totalNumberOfdetctionsCountries) *
        100,
      (this.countriesAvaregaDetections[2] / totalNumberOfdetctionsCountries) *
        100,
    ];

    //Displaying the data for pie days
    let totalNumberOfdetctionsDays = 0;
    let i = 0;
    while (i < 5) {
      totalNumberOfdetctionsDays += this.arrayAvgDetectionsDaysGlobal[i++];
    }

    this.pieChartDataDays = [
      (this.arrayAvgDetectionsDaysGlobal[0] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[1] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[2] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[3] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[4] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[5] / totalNumberOfdetctionsDays) * 100,
      (this.arrayAvgDetectionsDaysGlobal[6] / totalNumberOfdetctionsDays) * 100,
    ];
    //Displaying the data for pie Hours
    let totalNumberOfdetctionsHours = 0;
    let counterHours = 0;
    while (counterHours < this.arrayAvgDetectionsHoursGlobal.length) {
      totalNumberOfdetctionsHours += this.arrayAvgDetectionsHoursGlobal[
        counterHours++
      ];
    }
    console.log('totalNumberOfdetctionsMonths', totalNumberOfdetctionsHours);

    this.pieChartDataHours = [
      (this.arrayAvgDetectionsHoursGlobal[0] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[1] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[2] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[3] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[4] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[5] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[6] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[7] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[8] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[9] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[10] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[11] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[12] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[13] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[14] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[15] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[16] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[17] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[18] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[19] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[20] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[21] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[22] / totalNumberOfdetctionsHours) *
        100,
      (this.arrayAvgDetectionsHoursGlobal[23] / totalNumberOfdetctionsHours) *
        100,
    ];
    //Displaying the data for pie Days
    let totalNumberOfdetctionsMonths = 0;
    let counterDays = 0;
    while (counterDays < 5) {
      totalNumberOfdetctionsMonths += this.arrayAvgDetectionsMonthsGlobal[
        counterDays++
      ];
    }
    console.log('totalNumberOfdetctionsMonths', totalNumberOfdetctionsMonths);

    this.pieChartDataMonths = [
      (this.arrayAvgDetectionsMonthsGlobal[0] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[1] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[2] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[3] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[4] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[5] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[6] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[7] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[8] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[9] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[10] / totalNumberOfdetctionsMonths) *
        100,
      (this.arrayAvgDetectionsMonthsGlobal[11] / totalNumberOfdetctionsMonths) *
        100,
    ];
    //Displaying the data for chart detections
    this.barChartLabels = this.arrayTimeGlobal.slice(0, sliceSize);
    this.barChartData = [
      {
        data: this.arrayNbOfDetectionsGlobal.slice(0, sliceSize).map(Number),
        label: 'Detected Individuals',
      },
      {
        data: this.arrayNbOfViolationsGlobal.slice(0, sliceSize).map(Number),
        label: 'Social distancing Violations',
      },
    ];

    // Calculating the SMA
    let moveMean: any[] = [];
    let maSize = 3;
    for (var w = 3; w < sliceSize + 100 - maSize; w++) {
      var mean =
        Math.trunc(
          parseInt(this.arrayNbOfViolationsGlobal[w - 2]) +
            parseInt(this.arrayNbOfViolationsGlobal[w - 1]) +
            parseInt(this.arrayNbOfViolationsGlobal[w])
        ) / maSize;
      moveMean.push(mean);
    }

    this.lineChartLabels = this.arrayTimeGlobal.slice(0, sliceSize + 100);

    this.lineChartData = [
      //  { data: this.arrayNbOfViolationsGlobal.slice(0,sliceSize+100), label: 'Moving Average Detected Individuals' },
      { data: moveMean, label: 'Social Distancing Violations MA' },
      //
    ];
  }

  constructor() {}
}
