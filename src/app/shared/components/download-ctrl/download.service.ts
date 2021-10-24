import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '@app/core/services/base.service';

@Injectable()
export class DownloadService extends BaseService {  

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  public downloadExcel(url:string, paramsData:any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/excel');  
    return this.httpClient.get(url,  { params : paramsData,  headers: headers, responseType: 'blob' });
  }

  public downloadPdf(url: string, tAlId:any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');  
    return this.httpClient.get("project/getWorkDocument/"+tAlId,{ headers: headers, responseType: 'blob' });
  }
}
