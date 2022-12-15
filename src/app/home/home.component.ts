import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from './home.service';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart:any;
  dashboardData:any;

  onGoingCalls: Array<any>;
  completedCalls: Array<any>;
  nonAllottedCalls: Array<any>;
  public departmentList : Array<any>;
  public departmentDashboard : FormGroup;
  public showDefault : boolean = false;
  public sessionstorage: any = sessionStorage;
  public depId : any;


  constructor(private homeService: HomeService, private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    // this.homeService.getDashboardData({}).subscribe((resp:any) => {
    //   this.dashboardData = resp.dashBoard;
    //   let emp30DaysTrend = this.convertToChartData(this.dashboardData.dashBoardEmployeeStatus);
    //   this.renderLast30DaysAttendanceTrend(emp30DaysTrend);
    //   // this.getLeaveAlerts();
    // });
  }

  ngOnInit() {  
	this.sessionstorage.setItem("dashboardsessiondeptId", 0);
	
	this.getDepartmentList();
	this.departmentDashboard = new FormGroup({
      departmentId : new FormControl('')
	});
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
    const userRole = credentials.userRole;
	//this.departmentDashboard.patchValue({"departmentId" : departmentId});
	if(userRole == 1){
	this.showDefault=true;
	if(!this.sessionstorage.getItem("dashboardsessiondeptId")){
		this.depId = credentials.departmentId;
		this.departmentDashboard.patchValue({"departmentId" : 0});
		this.getDefaultDepartmentDashboardData(); 
	}else{
		this.depId = this.sessionstorage.getItem("dashboardsessiondeptId");
		this.departmentDashboard.patchValue({"departmentId" : Number(this.depId)});
		this.getDepartmentDashboardDataSession(Number(this.depId)); 

	}
	}else{
	this.showDefault=false;
	//this.departmentDashboard.patchValue({"departmentId" : departmentId});
	this.getDepartmentDashboardDataSession(departmentId); 
	}
	//this.getDefaultDepartmentDashboardData();
	//this.getAdminDashBoard();
	
	  
    //this.getCompletedCalls();
    //this.getNonAllottedCalls();
    //this.getOnGoingCalls();
  }

  protected renderLast30DaysAttendanceTrend(emp30DaysTrend:any) {
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Last 30 days Attendance Trend'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Number of employees present'
        }
    
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        // series: {
        //   borderWidth: 0,
        //   dataLabels: {
        //     enabled: true,
        //     format: '{point.y:.1f}'
        //   }
        // }
      },
    
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
    
      "series": [
        {
          "name": "Employees Present",
          //"colorByPoint": false,
          "data": emp30DaysTrend
        }
      ]
    });
  }

  protected convertToChartData(dataList:any) {
    let employeesData = [];
    for (let index=0; index < dataList.length; index++) {
      employeesData.push({
        "name" : this.datePipe.transform(dataList[index].dayDate, "dd MMM yyyy"),
        "y" : dataList[index].presentEmployeeCount
      })
    }
    return employeesData;
  }

  // protected getLeaveAlerts(){
  //   let params = { "year" : new Date().getFullYear() };
  //   this.homeService.getLeaveAlerts(params).subscribe((resp:any)=>{
  //     this.leaveAlerts = resp.allAlert;
  //   });
  // }

  /* protected getAdminDashBoard() {
    this.homeService.getAdminDashboardData().subscribe((resp:any) => {      
   */    /*
      noOfDepartments: 8
      noOfEmpoyees: 10
      empCountBasedOnDept: null
      projectDetails:
        totalProjects: 9
        pjtNotStarted: 0
        pjtStarted: 9
        totalPjtDoc: 18
      */
      /* if(resp.adminDashBoard != null){
        this.dashboardData = resp.adminDashBoard;
      } */
	  /* if(resp.deptDashBoard != null){
        this.dashboardData = resp.deptDashBoard;
      }
    })
  } */

  protected getCompletedCalls() {
    this.homeService.getCompletedCalls().subscribe((resp:any) => {
      
    })
  }

  protected getOnGoingCalls() {
    this.homeService.getOnGoingCalls().subscribe((resp:any) => {
      
    })
  }

  protected getNonAllottedCalls() {
    this.homeService.getNonAllottedCalls().subscribe((resp:any) => {
      
    })
  }
  
  protected getDepartmentList() {
	let params = {
      status : 1
    }
	this.homeService.getDepartmentList(params).subscribe((resp:any)=>{      
	  this.departmentList = resp["departments"];
    });
  }
  public getDepartmentDashboardData(event:any){
	let departmentId = event.target.value;
	  if(departmentId == 0){
		 this.getDefaultDepartmentDashboardData(); 
	  }
	  else{	
	  this.sessionstorage.setItem("dashboardsessiondeptId", departmentId);
	  this.homeService.getAdminDashboardData(departmentId).subscribe((resp:any) => {      
      
	  if(resp.deptDashBoard != null){
        this.dashboardData = resp.deptDashBoard;
      }
      })	
	  }

  }
  public getDepartmentDashboardDataSession(data:any){
	let departmentId = data;
	  if(departmentId == 0){
		 this.getDefaultDepartmentDashboardData(); 
	  }
	  else{	
	  this.sessionstorage.setItem("dashboardsessiondeptId", departmentId);
	  this.homeService.getAdminDashboardData(departmentId).subscribe((resp:any) => {      
      
	  if(resp.deptDashBoard != null){
        this.dashboardData = resp.deptDashBoard;
      }
      })	
	  }

  }
  public getDefaultDepartmentDashboardData(){
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	  this.homeService.getAdminDefaultDashboardData().subscribe((resp:any) => {      
	  if(resp.adminDashBoard != null){
        this.dashboardData = resp.adminDashBoard;
      }
    })	 

  }
  get departmentForm() { return this.departmentDashboard.controls; }

}