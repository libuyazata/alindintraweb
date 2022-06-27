import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class InterofficeCommunicationService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }
  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public getcommunicationList(data:any): Observable<any>{
    return this.httpClient.get("project/communicationListByDeptId/"+data);
  }
  public getdepartmentListByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/departmentListByWorkId/"+data);
  }
  public getCommunicationById(data:any): Observable<any>{
    return this.httpClient.get("project/getCommunicationById/"+data);
  }
  public getsubtaskListByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/getSubTaskByWorkId",{ params: data });
  }
  public getworkDescription(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsById/",{ params: data });
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllDepartment/");
  }

  public saveInterOfficeCommunication(data:any): Observable<any>{
	return this.httpClient.post("project/saveInterOfficeCommunication", data);
  }
  
  public deleteDepartment(data:any): Observable<any>{
    return this.httpClient.get("/user/deleteDepartment/", { params : data});
  }
}
