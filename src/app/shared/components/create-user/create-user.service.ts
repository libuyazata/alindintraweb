import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '@app/core/services/base.service';

@Injectable()
export class CreateUserService extends BaseService {  

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  public saveEmployee(employeeData:any): Observable<any> {
	return this.httpClient.post("user/saveEmployee", employeeData);
  }
  
  public updateEmployee(employeeData:any): Observable<any> {
	return this.httpClient.post("user/updateEmployee", employeeData);
  }
  
  public getEmployeeDetailsById(employeeId:any): Observable<any> {
    return this.httpClient.get("user/getEmployeeById", { params : employeeId });
  }
}
