import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class WorkissuedService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  
  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public getAllEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllEmployees/");
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllDepartment/");
  }
  public getWorkIssuedDetailsByDeptId(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkIssuedDetailsByDeptId/"+data);
  }
  public saveWorkIssuedDetails(data: any) : Observable<any> {
	return this.httpClient.post("project/saveWorkIssuedDetails", data);
  }
  public deleteWorkIssuedDetails(data:any): Observable<any>{
    return this.httpClient.get("project/deleteWorkIssuedDetails/"+data);
  }
}
