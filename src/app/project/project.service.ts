import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { ResponseContentType} from '@angular/http';

import { BaseService } from './../core/services/base.service';

@Injectable()
export class ProjectService extends BaseService {


  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }


  public getProjectList(data: any): Observable<any>{
    return this.httpClient.get("project/getAllProject", { params : data});
  }

  public getProjectResourceList(data:any): Observable<any>{
    return this.httpClient.get("getProjectResourceDeploymentByProjectId", { params : data});
  }

  public getProjectDocumentResourceList(data:any): Observable<any>{
    return this.httpClient.get("project/getDocumentUsersList", { params : data});
  }

  public saveProject(projectData:any): Observable<any>{
    return this.httpClient.post("project/saveOrUpdateProject", projectData);
  }

  public assignProjectResource(projectResourceInfo:any): Observable<any>{
    return this.httpClient.post("project/saveOrUpdateDocumentUsers", projectResourceInfo);
  }

  public removeProjectResource(projectResourceInfo:any): Observable<any>{
    return this.httpClient.post("deleteProjectResource", projectResourceInfo);
  }

  public getProjectByResource(projectResourceInfo:any): Observable<any>{
    return this.httpClient.get("getLiveProjectDetailsByUserId", { params : projectResourceInfo });
  }

  public saveProjectPayment(projectPaymentInfo:any): Observable<any>{
    return this.httpClient.post("saveOrUpdateProjectPaymentStatus", projectPaymentInfo);
  }

  public getProjectPaymentStatusList(projectPaymentInfo:any): Observable<any>{
    return this.httpClient.get("getProjectPaymentStatusList", { params : projectPaymentInfo });
  }

  public getProjectDocumentTypes(): Observable<any>{
    return this.httpClient.get("project/getAllDocumentTypes");
  }

  public getProjectDocuments(data:any): Observable<any>{
    return this.httpClient.get("project/getAllDocumentByProjectId",  { params : data });
  }

  public uploadDocument(formData:FormData){
    return this.httpClient.post('project/uploadProjectDocument', formData, {reportProgress: true, observe: 'events'});
  }

  public downloadProjectDocument(data:any): Observable<any>{
    // return this.httpClient.get("project/downLoadProjectDocument", {responseType: ResponseContentType.Blob});
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(url, { headers: headers, responseType: 'blob' });
    return this.httpClient.get("project/downLoadProjectDocument",  { params : data,  headers: headers, responseType: 'blob' });
  }

  public saveOrUpdateDocumentType(documentTypeInfo:any): Observable<any>{
    return this.httpClient.post("project/saveOrUpdateDocumentTypes/", documentTypeInfo);
  }
}
