import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class CallManagementService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }
  
  // public getCallManagementList(): Observable<any>{
  //   return this.httpClient.get("alindsalesapp/call/getCallDetails");
  // }

  public getCallManagementList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getCallDetails/",  { params: data });
  }

  public searchCallManagement(url:string, params:any): Observable<any>{
    return this.httpClient.get(url);
  }
}
