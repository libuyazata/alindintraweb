import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../../core/services/base.service';


@Injectable()
export class WorkStatusService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getWorkStatusList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkStatus",{ params: data });
  }
   public saveOrUpdateWorkStatusList(data: any) : Observable<any> {
    if(data.workStatusId!=""){
	return this.httpClient.post("masterTable/updateWorkStatus", data);
	}else{
	return this.httpClient.post("masterTable/saveWorkStatus", data);
	}
  
  }
  public deleteworkStatus(data:any): Observable<any>{
    return this.httpClient.get("masterTable/deleteWorkStatus", { params : data});
  }
}
