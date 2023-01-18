import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from './home.service';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { SideBarService } from '@app/core/shell/sidebar/sidebar.service';

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
  public homeuserRoleid : number;  
  
  public privilegesList : Array<any>;
  public prv_employeeView : string;
  public prv_employeeEdit : string;
  public prv_employeeDelete : string;
  public prv_departmentView : string;
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  public prv_workView : string;
  public prv_workEdit : string;
  public prv_workDelete : string;
  public prv_subTaskView : string;
  public prv_subTaskEdit : string;
  public prv_subTaskDelete : string;
  public prv_doucmentView : string;
  public prv_documentEdit : string;
  public prv_documentDelete : string;
  public prv_deputationView : string;
  public prv_deputationEdit : string;
  public prv_deputationDelete : string;  
  public prv_userRoleId : string;
  constructor(private homeService: HomeService, private datePipe: DatePipe,private authenticationService: AuthenticationService,public nav: SideBarService) {
    // this.homeService.getDashboardData({}).subscribe((resp:any) => {
    //   this.dashboardData = resp.dashBoard;
    //   let emp30DaysTrend = this.convertToChartData(this.dashboardData.dashBoardEmployeeStatus);
    //   this.renderLast30DaysAttendanceTrend(emp30DaysTrend);
    //   // this.getLeaveAlerts();
    // });
  }

  ngOnInit() {  
	
	
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
    const userRole = credentials.userRole;
	this.homeuserRoleid =userRole;
    this.nav.getprivilegesList(userRole).subscribe((resp:any)=>{      
		  this.privilegesList = resp["authorization"];
		  const storage = sessionStorage;
		  storage.setItem('prv_employeeView', JSON.stringify(this.privilegesList['employeeView']));
		  storage.setItem('prv_employeeEdit', JSON.stringify(this.privilegesList['employeeEdit']));
		  storage.setItem('prv_employeeDelete', JSON.stringify(this.privilegesList['employeeDelete']));
		  storage.setItem('prv_departmentView', JSON.stringify(this.privilegesList['departmentView']));
		  storage.setItem('prv_departmentEdit', JSON.stringify(this.privilegesList['departmentEdit']));
		  storage.setItem('prv_departmentDelete', JSON.stringify(this.privilegesList['departmentDelete']));
		  storage.setItem('prv_workView', JSON.stringify(this.privilegesList['workView']));
		  storage.setItem('prv_workEdit', JSON.stringify(this.privilegesList['workEdit']));
		  storage.setItem('prv_workDelete', JSON.stringify(this.privilegesList['workDelete']));
		  storage.setItem('prv_subTaskView', JSON.stringify(this.privilegesList['subTaskView']));
		  storage.setItem('prv_subTaskEdit', JSON.stringify(this.privilegesList['subTaskEdit']));
		  storage.setItem('prv_subTaskDelete', JSON.stringify(this.privilegesList['subTaskDelete']));
		  storage.setItem('prv_doucmentView', JSON.stringify(this.privilegesList['doucmentView']));
		  storage.setItem('prv_documentEdit', JSON.stringify(this.privilegesList['documentEdit']));
		  storage.setItem('prv_documentDelete', JSON.stringify(this.privilegesList['documentDelete']));
		  storage.setItem('prv_deputationView', JSON.stringify(this.privilegesList['deputationView']));
		  storage.setItem('prv_deputationEdit', JSON.stringify(this.privilegesList['deputationEdit']));
		  storage.setItem('prv_deputationDelete', JSON.stringify(this.privilegesList['deputationDelete']));
		  storage.setItem('prv_userRoleId', JSON.stringify(userRole));
		 
		 this.prv_employeeView = storage.getItem('prv_employeeView');
		 this.prv_employeeEdit = storage.getItem('prv_employeeEdit');
		 this.prv_employeeDelete = storage.getItem('prv_employeeDelete');
		 this.prv_departmentView = storage.getItem('prv_departmentView');
		 this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
		 this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 this.prv_workView = storage.getItem('prv_workView');
		 this.prv_workEdit = storage.getItem('prv_workEdit');
		 this.prv_workDelete = storage.getItem('prv_workDelete');
		 this.prv_subTaskView = storage.getItem('prv_subTaskView');
		 this.prv_subTaskEdit = storage.getItem('prv_subTaskEdit');
		 this.prv_subTaskDelete = storage.getItem('prv_subTaskDelete');
		 this.prv_doucmentView = storage.getItem('prv_doucmentView');
		 this.prv_documentEdit = storage.getItem('prv_documentEdit');
		 this.prv_documentDelete = storage.getItem('prv_documentDelete');
		 this.prv_deputationView = storage.getItem('prv_deputationView');
		 this.prv_deputationEdit = storage.getItem('prv_deputationEdit');
		 this.prv_deputationDelete = storage.getItem('prv_deputationDelete');
		 this.prv_userRoleId = storage.getItem('prv_userRoleId');
		});
	/* if(this.sessionstorage.getItem("dashboardsessiondeptId")==null){
	const credentials = this.authenticationService.credentials;
      this.depId = credentials.departmentId;
	  this.sessionstorage.setItem("dashboardsessiondeptId", 0);
	}else{
	  this.depId = this.sessionstorage.getItem("dashboardsessiondeptId");
	} */
	
	this.getDepartmentList();
	this.departmentDashboard = new FormGroup({
      departmentId : new FormControl('')
	});
	
	//this.departmentDashboard.patchValue({"departmentId" : departmentId});
/* 	NEW DEPARTMENT WISE CODE START */
	//this.getDepartmentDashboardDataSession(departmentId); 
	//this.departmentDashboard.patchValue({"departmentId" : departmentId});
	if(userRole == 1){
		this.showDefault=true;
	}else{
		this.showDefault=false;
	}
if(this.sessionstorage.getItem("dashboardsessiondeptId")==null){
	    this.depId = credentials.departmentId;
		this.getDepartmentDashboardDataSession(this.depId);
	    this.departmentDashboard.patchValue({"departmentId" : this.depId});
	}else{
		this.depId = this.sessionstorage.getItem("dashboardsessiondeptId");
	    this.getDepartmentDashboardDataSession(this.depId);
	    this.departmentDashboard.patchValue({"departmentId" : this.depId});
	}
	
/* 	NEW DEPARTMENT WISE CODE END */
/* 	OLD DEPARTMENT WISE CODE START */
 	/*
	if(userRole == 1){
	this.showDefault=true;
	if(!this.sessionstorage.getItem("dashboardsessiondeptId")){
		this.depId = 0;
	    this.sessionstorage.setItem("dashboardsessiondeptId", 0);
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
	}*/
	/* OLD DEPARTMENT WISE CODE END  */
	
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
	  this.homeService.getAdminDashboardData(departmentId).subscribe((resp:any) => {      
      
	  if(resp.deptDashBoard != null){
        this.dashboardData = resp.deptDashBoard;
      }
      })	
	  }
	  this.sessionstorage.setItem("dashboardsessiondeptId", departmentId);
  }
  public getDepartmentDashboardDataSession(data:any){
	let departmentId = data;
	  if(departmentId == 0){
		 this.getDefaultDepartmentDashboardData(); 
	  }
	  else{	
	  this.homeService.getAdminDashboardData(departmentId).subscribe((resp:any) => {      
	  this.sessionstorage.setItem("dashboardsessiondeptId", departmentId);
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