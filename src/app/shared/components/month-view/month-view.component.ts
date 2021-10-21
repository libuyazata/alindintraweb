import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

class MonthViewEventInfo {
  constructor(public type: MonthViewEventType, public data: any) {
  }
}

enum MonthViewEventType {
  UserInfo = "UserInfo",
  Attendance = "Attendance"
}

@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges {

  public years:Array<number>;
  public months:Array<string>;
  public selectedDate:Date;
  public monthYearSelector:FormGroup;
  
  public eventList:any; // event list which is used to bind the control
  public datesList:any; // Dates in format 20181220 [YearMonthDay]
  public daysInMonth:number;

  @Input() resourceData: any;
  @Output() resourceRowClicked = new EventEmitter();
  @Output() monthAndYearChanged = new EventEmitter();

  constructor(private datePipe:DatePipe) {
    this.selectedDate = new Date();
  }

  ngOnInit() {    
    if(!this.resourceData) {
      this.resourceData = [];
    }
    this.initialize(); 
  }

  ngOnChanges(){
    if(this.resourceData){
      this.initialize();
    }
  }

  public onResourceClicked(event:any, data:any){
    event.preventDefault();
    let eventInfo = new MonthViewEventInfo(MonthViewEventType.UserInfo, data);
    this.resourceRowClicked.emit(eventInfo);
  }

  public onResourceAttendanceCellClicked(event:any, eventData:any, date:Date){
    eventData.eventDate = date;
    eventData.attendanceType = this.getCellValue(eventData, date);
    let eventInfo = new MonthViewEventInfo(MonthViewEventType.Attendance, eventData);
    this.resourceRowClicked.emit(eventInfo);
  }

  public getCellValue(events:any, date:any):string {
      date = this.datePipe.transform(date,"yyyyMMdd");
      return events.events[date] && events.events[date].value ? events.events[date].value : "";    
  }

  public getDayOfTheWeek(date:Date): string {
    let days = ["SU", "MO", "TU", "WE", "TH","FR", "SA"];
    let index = date.getDay();
    index = index % 7;
    return days[index];
  }

  public isAnOffDay(date:Date): Boolean {
    let isAnOffDay:Boolean;
    let day = this.getDayOfTheWeek(date);// TODO: Include Holidays from holiday list
    if(day == "FR" || day == "SA"){
      isAnOffDay = true;
    }
    return isAnOffDay;
  }

  public onMonthYearChanged(event:any){
    this.selectedDate = new Date(this.monthYearSelector.get("yearSelector").value, 
                                  this.monthYearSelector.get("monthSelector").value, 1);    
        this.datesList = this.generateDatesList();
        this.daysInMonth = this.daysInThisMonth();
        this.eventList = this.getEventList();
    let dateInfo = this.monthYearSelector.value;
    this.monthAndYearChanged.emit({ "month" : parseInt(dateInfo.monthSelector, 10) + 1, "year": dateInfo.yearSelector });
  }

  private getEventList() {    
    return this.resourceData; // this.prepareTestEvents
  }
  
  private initialize(){    
    this.monthYearSelector = new FormGroup({
      monthSelector : new FormControl(),
      yearSelector : new FormControl()
    });
    this.generateYears();
    this.generateMonths();    
    this.datesList = this.generateDatesList();
    this.daysInMonth = this.daysInThisMonth();
    this.eventList = this.getEventList(); 
  }

  private generateDatesList(){
    let arr = new Array();
    let date = this.selectedDate;
    let yr = date.getFullYear();
    let mo = date.getMonth();
    
    var firstDay = new Date(yr, mo, 1);
    var lastDay = new Date(yr, mo + 1, 0);

    while (firstDay <= lastDay) {
      arr.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }  
    return arr;
  }

  private daysInThisMonth() {
    var now = this.selectedDate;
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  }

  private prepareTestEvents(){
    return  [{
      "id": 1,
      "resource": "John Doe",
      "events": {
        "20181201": {
          "value": "1"
        },
        "20181202": {
          "value": "1"
        },
        "20181203": {
          "value": "1"
        },
        "20181204": {
          "value": "1"
        },
        "20181205": {
          "value": "1"
        },
        "20181206": {
          "value": "1"
        },
        "20181207": {
          "value": "1"
        },
        "20181208": {
          "value": "1"
        },
        "20181209": {
          "value": "1"
        },
        "20181109": {
          "value": "1"
        }
      }
    },
    {
      "id": 2,
      "resource": "Smith Doe",
      "events": {
        "20181201": {
          "value": "1"
        },
        "20181202": {
          "value": "1"
        },
        "20181203": {
          "value": "1"
        },
        "20181204": {
          "value": "1"
        },
        "20181205": {
          "value": "1"
        },
        "20181206": {
          "value": "1"
        },
        "20181207": {
          "value": "1"
        },
        "20181208": {
          "value": "1"
        },
        "20181209": {
          "value": "1"
        }
      }
    }];
  }

  private generateYears(){
    let num = 0;
    this.years = new Array<number>();
    let yr = new Date().getFullYear();
    this.years.push(yr);
    for(let index=0; index < num; index++) {
      this.years.push(--yr);
    }
    this.monthYearSelector.patchValue({ "yearSelector": this.selectedDate.getFullYear()});
  }

  private generateMonths(){
    this.months = new Array<string>();
    this.months.push("January");
    this.months.push("February");
    this.months.push("March");
    this.months.push("April");
    this.months.push("May");
    this.months.push("June");
    this.months.push("July");
    this.months.push("August");
    this.months.push("September");
    this.months.push("October");
    this.months.push("November");
    this.months.push("December");

    this.monthYearSelector.patchValue({ "monthSelector": this.selectedDate.getMonth() });
  }
}
