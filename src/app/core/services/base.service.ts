import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';


@Injectable()
export class BaseService {

  private endPoints: any;

  constructor(public httpClient: HttpClient) { 
    this.endPoints = environment;
  }

  protected getEndPoint(key:string){
    return this.endPoints[key];
  }

  
  public getGender():any{
    return  [
      {id: "", name: "SELECT"},
      {id: "M", name: "MALE"},
      {id: "F", name: "FEMALE"}
    ]; 
  }

  public getAttendanceTypes(): Array<any>{
    return  [
      {id: "1", attendanceType: "Present"},
      {id: "2", attendanceType: "Absent"},
      {id: "3", attendanceType: "Sick Leave"},
      {id: "4", attendanceType: "Paid Leave"},
      {id: "5", attendanceType: "Emergency"},
      {id: "6", attendanceType: "Unpaid Leave"},
      {id: "7", attendanceType: "Training"},
      {id: "8", attendanceType: "School"}
    ]; 
  }

  // public getDepartmentList(): Observable<any>{
  //   return this.httpClient.get("getDepartmentList");
  // }

  public getDesignationList(): Observable<any>{
    return this.httpClient.get("getAllDesignation");
  }

  public getEmployeeList(): Observable<any>{
    // return this.httpClient.get("alindsalesapp/user/getAllEmployee", { params: data });
    return this.httpClient.get("user/getAllEmployees");
  }

  public getEmployeeNames(): Observable<any>{
    return this.httpClient.get("user/getAllEmployees");
  }

  public getLeaveAlerts(data:any): Observable<any>{
    return this.httpClient.get("getAllAlert", { params: data });
  }

  public getProjectsByUserId(userInfo:any): Observable<any>{
    return this.httpClient.get("getProjectDetailsByUserId", { params: userInfo });
  }

  public getCountryList(): Observable<any>{
    const countryList = [{
      countryId : 1, countryName : "India"
    },{
      countryId : 2, countryName : "Qatar"
    }]
    return of(countryList);
  }

  public getUserRole(): Observable<any>{
    const userRole = [{
      userRoleId : 1, userRoleName : "Super Admin"
    },{
      userRoleId : 2, userRoleName : "Admin"
    },{
      userRoleId : 3, userRoleName : "Employee"
    }];
    return of(userRole);
  }
  
  public getEmployeeStatus(): Observable<any>{
    const userStatus = [{
      userStatusId : 1, userStatusName : "Active"
    },{
      userStatusId : 2, userStatusName : "In Active"
    },{
      userStatusId : 3, userStatusName : "Retired"
    },{
      userStatusId : 4, userStatusName : "Terminated"
    },{
      userStatusId : 5, userStatusName : "Suspended"
    }]
    return of(userStatus);
  }

  public getEmployeeType(): Observable<any>{
    const employeeType = [{
      employeeTypeId : 1, employeeTypeName : "Office"
    },{
      employeeTypeId : 2, employeeTypeName : "PMT"
    },{
      employeeTypeId : 3, employeeTypeName : "MKT"
    },{
      employeeTypeId : 4, employeeTypeName : "Workers"
    },{
      employeeTypeId : 5, employeeTypeName : "Stores"
    },{
      employeeTypeId : 5, employeeTypeName : "Trans"
    },{
      employeeTypeId : 5, employeeTypeName : "Al Balagh"
    }]
    return of(employeeType);
  }
  
  public getEmploymentRemarkList(): Observable<any>{
    const employmentRemarkList = [{
      employmentRemarkId : 1, employmentRemarkName : "Temporary"
    },{
      employmentRemarkId : 2, employmentRemarkName : "Permanent"
    }]
    return of(employmentRemarkList);
  }
  
  public getProjectStatusList(): Observable<any>{
    const projectStatusList = [{
      projectStatusId : 1, projectStatusName : "Not started"
    },{
      projectStatusId : 2, projectStatusName : "In progress"
    },{
      projectStatusId : 3, projectStatusName : "Completed"
    },{
      projectStatusId : 4, projectStatusName : "On Hold"
    }];
    return of(projectStatusList);
  }
  
  public getPaymentStatusList(): Observable<any>{
    const paymentStatusList = [{
      paymentStatusId : 1, paymentStatusName : "Open"
    },{
      paymentStatusId : 1, paymentStatusName : "Close"
    }];
    return of(paymentStatusList);
  }
}