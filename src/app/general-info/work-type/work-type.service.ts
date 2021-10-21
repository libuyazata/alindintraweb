import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../../core/services/base.service';


@Injectable()
export class WorkTypeService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getWorkStatusList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkType",{ params: data });
  }
   public saveOrUpdateWorkStatusList(data: any) : Observable<any> {
	if(data.workTypeId!=""){
	return this.httpClient.post("masterTable/updateWorkType", data);
	}else{
	return this.httpClient.post("masterTable/saveWorkType", data);
	}
  }
  public deleteworkStatus(data:any): Observable<any>{
    return this.httpClient.get("masterTable/deleteWorkType", { params : data});
  }
}
