import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../../core/services/base.service';


@Injectable()
export class WorkDocumentService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getWorkDocumentList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllDocumentTypes/"+data);
  }
   public saveDocumentTypes(data: any) : Observable<any> {
	if(data.documentTypeId!=""){
	return this.httpClient.post("masterTable/updateDocumentTypes", data);
	}else{
	return this.httpClient.post("masterTable/saveDocumentTypes", data);
	}

  }
  public deleteDocumentTypes(data:any): Observable<any>{
    return this.httpClient.get("masterTable/deleteDocumentTypes/"+data);
  }
}
