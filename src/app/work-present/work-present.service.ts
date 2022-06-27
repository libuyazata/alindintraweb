import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class WorkpresentService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  
  public getWorkDetailsByDate(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDate/"+data);
  }
  public getWorkTypeList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkType",{ params: data });
  }
  public getWorkDetailsBySearch(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsBySearch", { params : data});
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllDepartment/");
  }
  public getAllEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllEmployees/");
  }
  public getWorkStatusList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkStatus",{ params: data });
  }
  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public saveOrUpdateWorkStatusList(data: any) : Observable<any> {
	if(data.workDetailsId!=""){
	return this.httpClient.post("project/updateWorkDetails", data);
	}else{
	return this.httpClient.post("project/saveWorkDetails", data);
	}
  }
}
