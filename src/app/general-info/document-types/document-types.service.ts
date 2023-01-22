import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../../core/services/base.service';


@Injectable()
export class DocumenttypesService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getDocumenttypesList(data:any): Observable<any>{
	return this.httpClient.get("masterTable/getAllDocumentTypes/"+data);
  }
   public saveOrUpdateDocumenttypesList(data: any) : Observable<any> {
    if(data.DocumenttypesId!=""){
	return this.httpClient.post("masterTable/updateDocumenttypes", data);
	}else{
	return this.httpClient.post("masterTable/saveDocumenttypes", data);
	}
  
  }
  public deleteDocumenttypes(data:any): Observable<any>{
    return this.httpClient.get("masterTable/deleteDocumenttypes", { params : data});
  }
}
