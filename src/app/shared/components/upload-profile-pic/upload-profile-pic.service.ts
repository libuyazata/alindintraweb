import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '@app/core/services/base.service';

@Injectable()
export class UploadProfilepicService extends BaseService {  

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  public getDocumentTypes(): Observable<any> {
    return this.httpClient.get("getAllEmployeeDocumentTypes");
  }
  
  public getEmployeeDocuments(employeeId:any): Observable<any> {
    let empParams = { "userId" :  employeeId };
    return this.httpClient.get("getUsersFileByUserId", { params : empParams });
  }

  public uploadDocument(formData:FormData){
    return this.httpClient.post('uploadEmployeeDocuments', formData, {reportProgress: true, observe: 'events'});
  }
  
  public deleteEmployeeDocumentById(documentInfo:any){
    return this.httpClient.post('deleteUsersFile', documentInfo);
  }
 /*  public uploadEmployeeProfilePic(data:any): Observable<any>{
    return this.httpClient.get("user/uploadEmployeeProfilePic/"+data);
  } */
  public uploadEmployeeProfilePic(formData:FormData){
    return this.httpClient.post('user/uploadEmployeeProfilePic/1', formData, {reportProgress: true, observe: 'events'});
  }
}