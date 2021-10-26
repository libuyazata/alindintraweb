import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseService } from '@app/core/services/base.service';



@Injectable()
export class GeneralInfoMenuService extends BaseService {

    visible: boolean;
    isScreenSmall: boolean


  constructor(public httpClient: HttpClient) { 
    super(httpClient);
    this.visible = true;
  }
  

  toggle() {
    this.visible = !this.visible;
  }
  
  public getDocumentTypes(data:any): Observable<any> {
    return this.httpClient.get("masterTable/getAllDocumentTypes/"+data);
  }
  public saveWorkDocument(data: any): Observable<any>{
    return this.httpClient.post('masterTable/saveDocumentTypes', data);
  }
  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public getWorkDetailsById(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsById",{ params: data });
  }
  public getSubTaskByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/getSubTaskByWorkId",{ params: data });
  }
}
