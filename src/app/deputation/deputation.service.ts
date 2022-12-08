import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class DeputationService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getAllEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllEmployees/");
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getActiveDepartments/");
  }
  public getdeputationList(data:any): Observable<any>{
    return this.httpClient.get("user/getDeputationListByDeptId/"+data);
  }
   public saveDeputation(data: any) : Observable<any> {
	if(data.deputationId!=""){
	return this.httpClient.post("user/updateDeputation", data);
	}else{
	return this.httpClient.post("user/saveDeputation", data);
	}

  }
  public deleteDeputation(data:any): Observable<any>{
    return this.httpClient.get("user/deleteDeputation/"+data);
  }
}
