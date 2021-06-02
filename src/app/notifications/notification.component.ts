import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { environment } from '@env/environment';
import { NotificationService } from '@app/notifications/notification.service';
import { DatePipe } from '@angular/common';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit  {

  public leaveAlerts:any;
  public leaveInfoList:any;
  public documentExpiryAlerts:any;

  @ViewChild('tabs')
  private tabset: NgbTabset; 

  constructor(private notificationService:NotificationService,
              private route: ActivatedRoute,
              private datePipe:DatePipe) { }

  ngOnInit() {
    this.getAlerts();
    this.getLeaveRequests();
    this.getDocumetExpiryAlerts();
  }

  ngAfterViewInit() {    
    this.route.queryParams.subscribe((params: any) => {
        if(params["tab"] && params["tab"] == 1) {
          this.tabset.select("ngb-tab-1");
        }
    });
  }

  public approveOrRejectLeave(leaveId:number, approvalId:number){
    let params = { "leaveId" : leaveId, "approvalId" : approvalId };
    this.notificationService.approveOrRejectLeaveRequest(params).subscribe((resp:any)=>{
      this.getLeaveRequests();
      this.getAlerts();
    });
  }

  protected getLeaveRequests(){
    let params = { "dateFrom" : "", "dateTo" : "" };
    this.notificationService.getLeaveRequests(params).subscribe((resp:any)=>{
      this.leaveInfoList = resp.leaves;
    });
  }

  protected getAlerts(){
    let params = { "year" : new Date().getFullYear() };
    this.notificationService.getAlerts(params).subscribe((resp:any)=>{
      this.leaveAlerts = resp.allAlert;
    });
  }

  protected getDocumetExpiryAlerts(){
    this.notificationService.getDocumetExpiryAlerts().subscribe((resp:any)=>{
      this.documentExpiryAlerts = resp.documentExpiryAlerts;
    });
  }

}
