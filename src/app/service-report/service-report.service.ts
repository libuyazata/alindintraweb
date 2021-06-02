import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class ServiceReportService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }
  
  public getServiceReportList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getServiceReportByCallStatus", { params : data});
  }

  public searchServiceReport(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/searchServiceReport", { params : data});
  }

  // public saveOrUpdateDepartment(departmentInfo:any): Observable<any>{
  //   return this.httpClient.post("alindsalesapp/user/saveOrUpdateDepartment", departmentInfo);
  // }
}
