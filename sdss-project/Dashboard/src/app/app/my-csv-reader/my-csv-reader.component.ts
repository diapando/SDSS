import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CSVRecord } from './../../CSVModel';

@Component({
  selector: 'app-my-csv-reader',
  templateUrl: './my-csv-reader.component.html',
  styleUrls: ['./my-csv-reader.component.css']
})
export class MyCsvReaderComponent {

    // message: string = "Hola Latina!"
    @Output() messageEvent = new EventEmitter();
    
    title = 'SDSS DashBoard';
    public allArrays: any[] = [];
    public arrayTimeGlobal: any[];
    public arrayCountryGlobal: any[] = []; 
    public arrayNbOfDetectionsGlobal: any[];
    public arrayNbOfViolationsGlobal: any[] = [];     
    public records: any[] = [];
    public countriesAvaregaDetections : any[] = [];
    public totalDetectionsMonthsGlobal: any[] = [];
    public totalDetectionsDaysGlobal: any[] = [];
    public totalDetectionsHoursGlobal: any[] = [];

       

    
    
    @ViewChild('csvReader') csvReader: any;  
    
    uploadListener($event: any): void {  
      let text = [];  
      let files = $event.srcElement.files;  
    
    
      if (this.isValidCSVFile(files[0])) {  
        let input = $event.target;  
        let reader = new FileReader();  
        reader.readAsText(input.files[0]);  
    
        reader.onload = () => {  
          let csvData = reader.result;  
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
    
          let headersRow = this.getHeaderArray(csvRecordsArray);  
    
          this.allArrays  = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          // this.records = this.allArrays[0];
          this.arrayTimeGlobal= this.allArrays[0];
          this.arrayCountryGlobal= this.allArrays[1]; 
          this.arrayNbOfDetectionsGlobal= this.allArrays[2];
          this.arrayNbOfViolationsGlobal= this.allArrays[3];
          this.arrayNbOfViolationsGlobal= this.allArrays[3];
          this.countriesAvaregaDetections = this.allArrays[4];
          this.totalDetectionsMonthsGlobal = this.allArrays[5];
          this.totalDetectionsDaysGlobal = this.allArrays[6];
          this.totalDetectionsHoursGlobal = this.allArrays[6];
          this.sendMessage();
        };  
    
        reader.onerror = function () {  
          console.log('error is occured while reading file!');  
        };  
    
      } else {  
        alert("Please import valid .csv file.");  
        this.fileReset();  
      }

    }  
    
    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
      let csvArr = [];
      let arrayNbOfDetectionsLocal: any[] = [];
      let arrayNbOfViolationsLocal: any[] = [];
      let arrayTimeLocal: any[]= [];
      let arrayCountryLocal: any[] = [];
      let totalDetectionsJanLocal :any[]=[]
      let totalDetectionsFebLocal:any[]=[]
      let totalDetectionsMarLocal :any[]=[]
      let totalDetectionsAvrLocal:any[]=[]
      let totalDetectionsMayLocal:any[]=[]
      let totalDetectionsJuiLocal:any[]=[]
      let totalDetectionsJulLocal:any[]=[]
      let totalDetectionsAugLocal:any[]=[]
      let totalDetectionsSepLocal:any[]=[]
      let totalDetectionsOctLocal:any[]=[]
      let totalDetectionsNovLocal:any[]=[]
      let totalDetectionsDecLocal:any[]=[]
      // Days
      let totalDetectionsMondayLocal:any[]=[]
      let totalDetectionsTuesdayLocal:any[]=[]
      let totalDetectionsWednesdayLocal:any[]=[]
      let totalDetectionsThursdayLocal:any[]=[]
      let totalDetectionsFridayLocal:any[]=[]
      let totalDetectionsSaturdayLocal:any[]=[]
      let totalDetectionsSundayLocal:any[]=[]
      //Hours
      let totalDetections0hLocal:any[]=[]
      let totalDetections1hLocal:any[]=[]
      let totalDetections2hLocal:any[]=[]
      let totalDetections3hLocal:any[]=[]
      let totalDetections4hLocal:any[]=[]
      let totalDetections5hLocal:any[]=[]
      let totalDetections6hLocal:any[]=[]
      let totalDetections7hLocal:any[]=[]
      let totalDetections8hLocal:any[]=[]
      let totalDetections9hLocal:any[]=[]
      let totalDetections10hLocal:any[]=[]
      let totalDetections11hLocal:any[]=[]
      let totalDetections12hLocal:any[]=[]
      let totalDetections13hLocal:any[]=[]
      let totalDetections14hLocal:any[]=[]
      let totalDetections15hLocal:any[]=[]
      let totalDetections16hLocal:any[]=[]
      let totalDetections17hLocal:any[]=[]
      let totalDetections18hLocal:any[]=[]
      let totalDetections19hLocal:any[]=[]
      let totalDetections20hLocal:any[]=[]
      let totalDetections21hLocal:any[]=[]
      let totalDetections22hLocal:any[]=[]
      let totalDetections23hLocal:any[]=[]


      for (let i = 1; i < csvRecordsArray.length; i++) {  
        let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
        if (curruntRecord.length == headerLength) {  
          var csvRecord: CSVRecord = new CSVRecord();  
          csvRecord.id = curruntRecord[0].trim();  
          csvRecord.firstName = curruntRecord[1].trim();  
          csvRecord.lastName = curruntRecord[2].trim();  
          csvRecord.age = curruntRecord[3].trim();  
          // csvRecord.position = curruntRecord[4].trim();  
          // csvRecord.mobile = curruntRecord[5].trim();  
          csvArr.push(csvRecord);  
        }  
      } 
      // exporting the time data
      csvArr.forEach(function (csvArr) {
        arrayTimeLocal.push(csvArr.id);
      });

      // exporting the country data
      csvArr.forEach(function (csvArr) {
        arrayCountryLocal.push(csvArr.firstName);
      });
      // exporting the nb of detections data
      csvArr.forEach(function (csvArr) {
        arrayNbOfDetectionsLocal.push(csvArr.lastName);
      });
      // exporting the nb of nb of violations data
      csvArr.forEach(function (csvArr) {
        arrayNbOfViolationsLocal.push(csvArr.age);
      });     
      
      // extracting data for USA
      let USADetections : any[] = [];   
      var USAcsvArr = csvArr.filter(function(person) {
        return person.firstName == "United States";
      });
      USAcsvArr.forEach(function (USAcsvArr) {
        USADetections.push(USAcsvArr.lastName);
      });
      var avgUSADetections = USADetections.reduce(function(p,c,i,a){return p + (c/a.length)},0);

      // extracting data for Australia
      let AustraliaDetections : any[] = [];   
      var AustraliacsvArr = csvArr.filter(function(person) {
        return person.firstName == "Australia";
      });
      AustraliacsvArr.forEach(function (AustraliacsvArr) {
        AustraliaDetections.push(AustraliacsvArr.lastName);
      });
      var avgAustraliaDetections = AustraliaDetections.reduce(function(p,c,i,a){return p + (c/a.length)},0);


      // extracting data for Canada
      let CanadaDetections : any[] = [];   
      var CanadacsvArr = csvArr.filter(function(person) {
        return person.firstName == "Canada";
      });
      CanadacsvArr.forEach(function (CanadacsvArr) {
        CanadaDetections.push(CanadacsvArr.lastName);
      });
      var avgCanadaDetections = CanadaDetections.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      
      
      // Extracting months from dates
      let counterMonths = 0;
      while (counterMonths < arrayTimeLocal.length) 
      {
        var date = new Date(arrayTimeLocal[counterMonths++]);
        let month = date.getMonth();
        switch(month) {
          case 0:
            totalDetectionsJanLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
            break;
          case 1:
            totalDetectionsFebLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
            break;
          case 2:
            totalDetectionsMarLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 3:
          totalDetectionsAvrLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 4:
          totalDetectionsMayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 5:
          totalDetectionsJuiLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 6:
          totalDetectionsJulLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 7:
          totalDetectionsAugLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 8:
          totalDetectionsSepLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 9:
          totalDetectionsOctLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 10:
          totalDetectionsNovLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 11:
          totalDetectionsDecLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
        }
      }
      var avgtotalDetectionsJanLocal = totalDetectionsJanLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      var avgtotalDetectionsFebLocal = totalDetectionsFebLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      var avgtotalDetectionsMarLocal = totalDetectionsMarLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsAvrLocal = totalDetectionsAvrLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsMayLocal = totalDetectionsMayLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsJuiLocal = totalDetectionsJuiLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsJulLocal = totalDetectionsJulLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsAugLocal = totalDetectionsAugLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsSepLocal = totalDetectionsSepLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsOctLocal = totalDetectionsOctLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsNovLocal = totalDetectionsNovLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsDecLocal = totalDetectionsDecLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      
      // Extracting Daysfrom dates
      let counterDays = 0;
      while (counterMonths < arrayTimeLocal.length) 
      {
        var date = new Date(arrayTimeLocal[counterMonths++]);
        let month = date.getDay();
        switch(month) {
          case 0:
            totalDetectionsMondayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
            break;
          case 1:
            totalDetectionsTuesdayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
            break;
          case 2:
            totalDetectionsWednesdayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 3:
          totalDetectionsThursdayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 4:
          totalDetectionsFridayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 5:
          totalDetectionsSaturdayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
          case 6:
          totalDetectionsSundayLocal.push( arrayNbOfDetectionsLocal[counterMonths]);
          break;
        }
      }
      var avgtotalDetectionsMondayLocal = totalDetectionsJanLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      var avgtotalDetectionsTuesdayLocal = totalDetectionsFebLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsWednesdayLocal = totalDetectionsAvrLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsThursdayLocal = totalDetectionsMayLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsFridayLocal = totalDetectionsJuiLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsSaturdayLocal = totalDetectionsJulLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetectionsSundayLocal = totalDetectionsAugLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);

      // Extracting Hours from dates
     
      let counterHours = 0;
      while (counterHours < arrayTimeLocal.length) 
      {
        var date = new Date(arrayTimeLocal[counterHours++]);
        let Hour = date.getHours();
        switch(Hour) {
          case 0:
            totalDetections0hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
            break;
          case 1:
            totalDetections1hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
            break;
          case 2:
            totalDetections2hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 3:
            totalDetections3hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 4:
            totalDetections4hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 5:
            totalDetections5hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 6:
            totalDetections6hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 7:
            totalDetections7hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 8:
            totalDetections8hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 9:
            totalDetections9hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 10:
            totalDetections10hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 11:
            totalDetections11hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 12:
            totalDetections12hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 13:
            totalDetections13hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 14:
            totalDetections14hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 15:
            totalDetections15hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 16:
            totalDetections16hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 17:
            totalDetections17hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 18:
            totalDetections18hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 19:
            totalDetections19hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 20:
            totalDetections20hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 21:
            totalDetections21hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 22:
            totalDetections22hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          case 23:
            totalDetections23hLocal.push( arrayNbOfDetectionsLocal[counterHours]);
          break;
          
        }
      }
      var avgtotalDetections0hLocal= totalDetections0hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      var avgtotalDetections1hLocal = totalDetections1hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      var avgtotalDetections2hLocal = totalDetections2hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections3hLocal = totalDetections3hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections4hLocal = totalDetections4hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections5hLocal = totalDetections5hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections6hLocal = totalDetections6hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections7hLocal = totalDetections7hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections8hLocal = totalDetections8hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections9hLocal = totalDetections9hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections10hLocal = totalDetections10hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections11hLocal = totalDetections11hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections12hLocal = totalDetections12hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections13hLocal = totalDetections13hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections14hLocal = totalDetections14hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections15hLocal = totalDetections15hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections16hLocal = totalDetections16hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections17hLocal = totalDetections17hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections18hLocal = totalDetections18hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections19hLocal = totalDetections19hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections20hLocal = totalDetections20hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections21hLocal = totalDetections21hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections22hLocal = totalDetections22hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      let avgtotalDetections23hLocal = totalDetections23hLocal.reduce(function(p,c,i,a){return p + (c/a.length)},0);
      
      // Data to be sent
      return [arrayTimeLocal, arrayCountryLocal, arrayNbOfDetectionsLocal, arrayNbOfViolationsLocal, 
        [ avgUSADetections,
          avgAustraliaDetections,
          avgCanadaDetections,
        ], 
        [
          avgtotalDetectionsJanLocal,
          avgtotalDetectionsFebLocal,
          avgtotalDetectionsMarLocal,
          avgtotalDetectionsAvrLocal,
          avgtotalDetectionsMayLocal,
          avgtotalDetectionsJuiLocal,
          avgtotalDetectionsJulLocal,
          avgtotalDetectionsAugLocal,
          avgtotalDetectionsSepLocal,
          avgtotalDetectionsOctLocal,
          avgtotalDetectionsNovLocal,
          avgtotalDetectionsDecLocal
        ],
        [
          avgtotalDetectionsMondayLocal,
          avgtotalDetectionsTuesdayLocal,
          avgtotalDetectionsWednesdayLocal,
          avgtotalDetectionsThursdayLocal,
          avgtotalDetectionsFridayLocal,
          avgtotalDetectionsSaturdayLocal,
          avgtotalDetectionsSundayLocal
        ],
        [
          avgtotalDetections0hLocal,
          avgtotalDetections1hLocal,
          avgtotalDetections2hLocal,
          avgtotalDetections3hLocal,
          avgtotalDetections4hLocal,
          avgtotalDetections5hLocal,
          avgtotalDetections6hLocal,
          avgtotalDetections7hLocal,
          avgtotalDetections8hLocal,
          avgtotalDetections9hLocal,
          avgtotalDetections10hLocal,
          avgtotalDetections11hLocal,
          avgtotalDetections12hLocal,
          avgtotalDetections13hLocal,
          avgtotalDetections14hLocal,
          avgtotalDetections15hLocal,
          avgtotalDetections16hLocal,
          avgtotalDetections17hLocal,
          avgtotalDetections18hLocal,
          avgtotalDetections19hLocal,
          avgtotalDetections20hLocal,
          avgtotalDetections21hLocal,
          avgtotalDetections22hLocal,
          avgtotalDetections23hLocal
        ]
      ]; 
    }  
    
    isValidCSVFile(file: any) {  
      return file.name.endsWith(".csv");  
    }  
    
    getHeaderArray(csvRecordsArr: any) {  
      let headers = (<string>csvRecordsArr[0]).split(',');  
      let headerArray = [];  
      for (let j = 0; j < headers.length; j++) {  
        headerArray.push(headers[j]);  
      }  
      return headerArray;  
    }  
    
    fileReset() {  
      this.csvReader.nativeElement.value = "";  
      this.records = [];  
    }  
  constructor() { }

  sendMessage() {
    console.log( "From sender" );  
    this.messageEvent.emit([this.arrayTimeGlobal,
                            this.arrayCountryGlobal,
                            this.arrayNbOfDetectionsGlobal,
                            this.arrayNbOfViolationsGlobal,
                            this.countriesAvaregaDetections,
                            this.totalDetectionsMonthsGlobal,
                            this.totalDetectionsDaysGlobal,
                            this.totalDetectionsHoursGlobal
    ])

  }
}
