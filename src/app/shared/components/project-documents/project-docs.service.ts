import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '@app/core/services/base.service';

@Injectable()
export class ProjectDocumentsService extends BaseService {  

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  // public getDocumentTypes(): Observable<any> {
  //   return this.httpClient.get("getAllEmployeeDocumentTypes");
  // }
  
  public getProjectDocuments(projectId:any): Observable<any> {
    let prjParams = { "projectId" :  projectId };
    return this.httpClient.get("getProjectDocumentsByProjectId", { params : prjParams });
  }

  public uploadDocument(formData:FormData){
    return this.httpClient.post('uploadProjectDocumentDetails', formData, {reportProgress: true, observe: 'events'});
  }
  
  public deleteProjectDocumentById(projectDocumentInfo:any){
    return this.httpClient.post('deleteProjectDocuments', projectDocumentInfo);
  }
}
