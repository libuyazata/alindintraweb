import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class ChangepasswordService extends BaseService {

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }
  
  public updatePassword(newPassword:any,existPassword:any): Observable<any>{
    return this.httpClient.get("user/updatePassword/"+newPassword+"/"+existPassword);
  }
  public forgetPassword(empCode:any): Observable<any>{
    return this.httpClient.get("user/forgetPassword/"+empCode);
  }
}
