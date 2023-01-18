import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class PrivilegesService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getAllEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllEmployees/");
  }
  public getAdminDashBoard(): Observable<any>{
    return this.httpClient.get("dashBoard/getAdminDashBoard/");
  }
  public getprivilegesList(data:any): Observable<any>{
    return this.httpClient.get("user/getAuthorization/"+data);
  }
   public updateAuthorization(data: any) : Observable<any> {
	return this.httpClient.post("user/updateAuthorization", data);
  }
  public deleteDeputation(data:any): Observable<any>{
    return this.httpClient.get("user/deleteDeputation/"+data);
  }
  public getUserRole(): Observable<any>{
    return this.httpClient.get("user/getAllUserRoles/");
  }
  
  /* public getUserRole(): Observable<any>{
    const userRole = [{
      userRoleId : 1, userRoleName : "Admin"
    },{
      userRoleId : 2, userRoleName : "HOD"
    },{
      userRoleId : 3, userRoleName : "Employee"
    },{
      userRoleId : 4, userRoleName : "Department coordinator"
    }];
    return of(userRole);
  } */
}
