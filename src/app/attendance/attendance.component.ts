import { Component, OnInit } from '@angular/core';

import { IMyDpOptions } from 'mydatepicker';
import { AttendanceService } from './attendance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BaseComponent } from '@app/core/component/base.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent extends BaseComponent implements OnInit {

  public userList:any;
  public projectList:any;
  public attendanceData:any;
  public availabityList:any;
  public selectedMonthView: any;
  public attendanceTypeList: any;
  public aggregateLeaveInfo: any;
  public userAttendanceDetails:any;  
  public saveAttendanceForm:FormGroup;
  public isAttendanceFormAttemptSubmit = false;
  

  public attendancePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd mmm yyyy',
      inline: false,
  };
  constructor(private attendanceService:AttendanceService, private datePipe:DatePipe) { 
    super(attendanceService);
    this.availabityList = [
        { "availabilityId" : 1, "availabilityName" : "Full Day" },
        { "availabilityId" : 2, "availabilityName" : "Hourly" }
    ];
  }

  ngOnInit() { 
    this.saveAttendanceForm = new FormGroup({
      userId : new FormControl('', Validators.required),
      attendanceTypeId : new FormControl('', Validators.required),
      attendanceDate : new FormControl('', Validators.required),
      workHours : new FormControl('', Validators.required),
      extraHours : new FormControl('', Validators.required),
      projectId : new FormControl('', Validators.required),
      availabilityInOffice : new FormControl('', Validators.required),
      extraHourRate  : new FormControl(''),
    })
    this.aggregateLeaveInfo = {
      "P" : 0, "A" : 0,	"SL": 0, "PL": 0, "E"	: 0, "UL": 0, "T"	: 0, "S" : 0
    };
    this.attendanceTypeList = this.attendanceService.getAttendanceTypes();
    this.getUserList();
    this.selectedMonthView = { "month" : new Date().getMonth() + 1, "year": new Date().getFullYear() };
    this.getAllAttendanceDetails(this.selectedMonthView);
    this.saveAttendanceForm.patchValue({"userId" : ""});
    this.saveAttendanceForm.patchValue({"attendanceTypeId" : ""});
    this.saveAttendanceForm.patchValue({"extraHourRate" : "1.5"});    
  }

  // Convenience getter for easy access to attendance form fields.
  get attendanceForm() { return this.saveAttendanceForm.controls; }

  public onMonthViewRowDataEventReceived(eventData:any){
    if(eventData.type == "UserInfo") {
      this.getAttendanceDetailsByUser(eventData.data);
    } else if(eventData.type == "Attendance") {
      this.openAttendanceForm(eventData.data);
    }
  }

  public onMonthAndYearChanged(data:any){
    this.selectedMonthView = data; // Keep this to request the details again from server.
    this.getAllAttendanceDetails(data);
  }

  public openEmployeeView() {
    document.getElementById('employeeViewModal').classList.toggle('d-block');
  }

  public closeEmployeeView() {
    document.getElementById('employeeViewModal').classList.toggle('d-block');
  } 

  public openAddAttendanceView() {
    this.resetAttendanceView();
    this.setDate(new Date());
    document.getElementById('employeeAttendanceModal').classList.toggle('d-block');
  }

  public closeAddAttendanceView() {
    this.isAttendanceFormAttemptSubmit = false;
    document.getElementById('employeeAttendanceModal').classList.toggle('d-block');
  } 

  public onAttendanceDetailsSubmitted(){
    this.isAttendanceFormAttemptSubmit = true;
    if(!this.saveAttendanceForm.invalid) {
      let attendanceInfo = this.saveAttendanceForm.value;
      attendanceInfo.attendanceDate = this.getDateFromMyDP(attendanceInfo.attendanceDate);
      this.attendanceService.submitAttendanceDetails(attendanceInfo).subscribe((resp: any) =>{
        this.closeAndUpdateAttendanceView();
      });
    }
  }

  public deleteAttendance() {
    if(confirm("Are you sure you want to delete the time sheet for the selected date? \n "  +
               "Click Ok to delete or Cancel to terminate the current operation.")) {
      let attendanceInfo = this.saveAttendanceForm.value;
      attendanceInfo.attendanceDate = this.getDateFromMyDP(attendanceInfo.attendanceDate);           
      this.attendanceService.deleteAttendance(attendanceInfo).subscribe((resp:any)=>{
        this.closeAndUpdateAttendanceView();
      })
    }
  }

  public getClassName(shortCode:string){ 
    let className = "present-bg";
    switch(shortCode){
      case "A":  { className = "absent-bg"; break;  } 
      case "SL": { className = "sick-bg"; break;  } 
      case "PL": { className = "paid-leave-bg"; break;  } 
      case "E":  { className = "emergency-bg"; break;  } 
      case "UL": { className = "unpaid-leave-bg"; break;  } 
      case "T":  { className = "training-bg"; break;  } 
      case "S":  { className = "school-bg"; break;  } 
      default:   { className = "present-bg"; break; }
    }
    return className;
  }

  public onEmployeeChanged($event:any){
    this.getProjectsByUserId($event.target.value);
  }

  protected closeAndUpdateAttendanceView() {
    this.closeAddAttendanceView();
    this.getAllAttendanceDetails(this.selectedMonthView);
  }

  protected getAllAttendanceDetails(params:any){    
    this.attendanceService.getAllAttendance(params)
      .subscribe((attendanceListData: any) => {
        this.attendanceData = attendanceListData.attendanceStatus;         
    });
  }

  protected getProjectsByUserId(userId:number){
    const userInfo = { "userId" : userId };
    this.attendanceService.getProjectsByUserId(userInfo)
      .subscribe((projectInfo: any) => {
        this.projectList = projectInfo.projectDetails;         
    });
  }
  
  protected getAttendanceDetailsByUser(userData:any){
    const params = { "userId" : userData.userId, "year" : this.selectedMonthView.year };
    this.attendanceService.getAttendanceDetailsByUser(params)
      .subscribe((userAttendanceData: any) => { 
        this.userAttendanceDetails = userAttendanceData; 
        this.setAggregateAttendance(this.userAttendanceDetails.user.leaveDetails);
        this.openEmployeeView();
    });
  }

  protected setAggregateAttendance(leaveDetails:any){
    let aggregateLeave = {
      "P" : 0, "A" : 0,	"SL": 0, "PL": 0, "E"	: 0, "UL": 0, "T"	: 0, "S" : 0
    };
    
    for (let leave of leaveDetails) {
      for (let attendance of leave.attendanceTypes) {
        aggregateLeave[attendance.shortName] = parseInt(aggregateLeave[attendance.shortName],10) + 
                                               parseInt(attendance.noOfLeaves,10) ;
      }
    }
    this.aggregateLeaveInfo = aggregateLeave;
  }

  protected getUserList(){
    this.attendanceService.getEmployeeNames()
      .subscribe((userData: any) => { 
        this.userList = userData.userNameInfo; 
    });
  }
  
  protected resetAttendanceView(){
    this.saveAttendanceForm.patchValue({"userId" : ""});
    this.saveAttendanceForm.patchValue({"projectId" : ""});
    this.saveAttendanceForm.patchValue({"workHours" : ""});
    this.saveAttendanceForm.patchValue({"extraHours" : 0});
    this.saveAttendanceForm.patchValue({"availabilityInOffice" : ""});
    this.saveAttendanceForm.patchValue({"attendanceTypeId" : ""}); 
  }

  protected openAttendanceForm(data:any){
    // TODO : List Project based on the date, perform a call to Back end
    this.resetAttendanceView();
    this.setDate(data.eventDate);
    this.getProjectsByUserId(data.userId);
    this.saveAttendanceForm.patchValue({"userId" : data.userId});
    this.saveAttendanceForm.patchValue({"projectId" : data.projectId == 0 || data.projectId == undefined ? '' : data.projectId});
    this.saveAttendanceForm.patchValue({"workHours" : data.workHours == 0 || data.workHours == undefined ? '' : data.workHours});
    this.saveAttendanceForm.patchValue({"extraHours" : data.extraHours == 0 || data.extraHours == undefined ? '0' : data.extraHours});
    this.saveAttendanceForm.patchValue({"extraHourRate" : data.extraHourRate == 0 || data.extraHourRate == undefined ? '1.5' : data.extraHourRate});
    this.saveAttendanceForm.patchValue({"availabilityInOffice" : data.availabilityInOffice});
    this.saveAttendanceForm.patchValue({"attendanceTypeId" : this.getAttendanceType(data)}); 
    document.getElementById('employeeAttendanceModal').classList.toggle('d-block');
  }

  protected getAttendanceType(data:any){
    let attendanceType = "";
    let eventDate = data.eventDate; 
    eventDate = this.datePipe.transform(eventDate,"yyyyMMdd");
    if(data.events[eventDate]) {
      let attendanceValue = data.events[eventDate].value;
      switch(attendanceValue){
        case "P": attendanceType = "1"; break;
        case "A": attendanceType = "2"; break;
        case "SL": attendanceType = "3"; break;
        case "PL": attendanceType = "4"; break;
        case "E": attendanceType = "5"; break;
        case "UL": attendanceType = "6"; break;
        case "T": attendanceType = "7"; break;
        case "S": attendanceType = "8"; break;
        default: attendanceType = ""; break;
      }
    }
    return attendanceType;
  }

  protected setDate(date:Date): void {
    this.saveAttendanceForm.patchValue({attendanceDate: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
  }
}
