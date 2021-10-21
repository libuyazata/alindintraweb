import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';

@Injectable()
export class UserService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  public getUserHomeData(data:any): Observable<any>{
    return this.httpClient.get("getUserHome", { params: data });
  }
  
  public submitLeaveRequest(leaveRequest:any): Observable<any>{    
    return this.httpClient.post("requestLeave", leaveRequest );
  }
}
