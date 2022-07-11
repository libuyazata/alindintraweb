import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';

@Injectable()
export class EditUserManagementService extends BaseService {  

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  
  
  // public submitEmployeeDetails(employeeData:any): Observable<any> {
  //   return this.httpClient.post("saveOrUpdateUser", employeeData);
  // }
  
  // public getEmployeeDetailsById(employeeId:any): Observable<any> {
  //   return this.httpClient.get("getUserByUserId", { params : employeeId });
  // }
  public getEmployeeList1(data:any): Observable<any>{
    return this.httpClient.get("user/getEmployeeById",{ params: data });
  }
}
