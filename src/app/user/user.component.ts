import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/user/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { BaseComponent } from '@app/core/component/base.component';
//import { LeaveStatus } from '@app/core/pipes/leave-status/leave-status.pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {

  public userId:number;
  public userLeaveInfo:any;
  public userLeaveCredits:any;
  public attendanceTypeList:any;
  public saveLeaveRequestForm:FormGroup;  
  public isLeaveReqFormAttemptSubmit = false;

  public attendancePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
  };

  constructor(private userService:UserService) { 
    super(userService);    
  }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getUserHomeData();
    this.saveLeaveRequestForm = new FormGroup({
      userId : new FormControl(''),
      attendanceTypeId : new FormControl('', Validators.required),
      leaveReason : new FormControl('', Validators.required),
      dateFrom : new FormControl('', Validators.required),
      dateTo : new FormControl('', Validators.required)
    });
    // Set attendance type list after removing the items Present and Absent from the list
    this.attendanceTypeList = this.userService.getAttendanceTypes().filter(item => item.id > 2);
  }

  // Convenience getter for easy access to leave request form fields.
  get leaveRequestForm() { return this.saveLeaveRequestForm.controls; }

  protected getUserHomeData(){
    let userInfo = { "userId": this.userId, "year": new Date().getFullYear() };
    this.userService.getUserHomeData(userInfo).subscribe(
      (userData : any) => {
        this.userLeaveInfo = userData.user.leaveList;
        // No need to show the Present and Absent over here for credits.
        this.userLeaveCredits = userData.user.leaveCredits.filter((item :any) => item.attendanceTypeId > 2);
      }
    );
  }

  public openLeaveRequestView() {
    this.saveLeaveRequestForm.reset();
    this.makeDropDownSelected(this.saveLeaveRequestForm,
			[{"attendanceTypeId" : "" }
			]);
    document.getElementById('leaveRequestModal').classList.toggle('d-block');
  }

  public closeLeaveRequestView() {
    this.isLeaveReqFormAttemptSubmit = false;
    document.getElementById('leaveRequestModal').classList.toggle('d-block');
  }

  public onLeaveRequestSubmitted(){
    this.isLeaveReqFormAttemptSubmit = true;
    if(!this.saveLeaveRequestForm.invalid) {
      let leaveRequest = this.saveLeaveRequestForm.value;
      leaveRequest.userId = this.userId;
      leaveRequest.dateTo = this.getDateFromMyDP(leaveRequest.dateTo);
      leaveRequest.dateFrom = this.getDateFromMyDP(leaveRequest.dateFrom);
      if(this.isValidDates(leaveRequest.dateFrom, leaveRequest.dateTo)) {   
        leaveRequest.approvalId = 0; // Pending request
        this.userService.submitLeaveRequest(leaveRequest).subscribe((resp: any) =>{
          if(resp.leave && resp.leave.leaveStatus == "failure") {
            this.showAlert("Unable to apply the leave. You may not be having enough leaves in balance. Please contact your administrator.")
          }
          this.closeLeaveRequestView();
          this.getUserHomeData();
        });
      } else {
        this.showAlert("Invalid dates. Please select the correct date range.");
      }
    }
  }

  public getClassName(approvalId:number){
    let className = "pending";
    switch(approvalId){
      case 0: { className = "pending"; break;  } 
      case 1: { className = "rejected"; break;  } 
      case 2: { className = "approved"; break;  }       
      default:{ className = "pending"; break; }
    }
    return className;
  }

  protected isValidDates(fromDate:Date, toDate: Date) { 
    return fromDate < toDate || (fromDate.getTime() === toDate.getTime());
  }
}
