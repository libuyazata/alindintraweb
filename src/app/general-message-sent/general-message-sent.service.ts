import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class GeneralmessagesentService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }
  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public sentGeneralMessageListByDeptId(data:any): Observable<any>{
    return this.httpClient.get("project/sentGeneralMessageListByDeptId/"+data);
    //return this.httpClient.get("project/test/",{ params: data });
  }
  public getGeneralMessageCountByDeptId(data:any): Observable<any>{
    return this.httpClient.get("project/getGeneralMessageCountByDeptId/"+data);
  }
  public sentGeneralMessageListByDeptIdPageData(id:any,page:any,number:any): Observable<any>{
    return this.httpClient.get("project/sentGeneralMessageListByDeptId/"+id+"/"+page+"/"+number);
  }
  public getdepartmentListByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/departmentListByWorkId/"+data);
  }
  public getGeneralMessageById(data:any): Observable<any>{
    return this.httpClient.get("project/getGeneralMessageById/"+data);
  }
  public getsubtaskListByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/getSubTaskByWorkId",{ params: data });
  }
  public getworkDescription(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsById/",{ params: data });
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllDepartment/");
  }
  /* public saveInterOfficeCommunication(data:any): Observable<any>{
	return this.httpClient.post("project/saveInterOfficeCommunication", data);
  } */
  public sendToGeneralMessage(formData:FormData){
	//return this.httpClient.post('project/sendWorkMessage/', formData, {reportProgress: true, observe: 'events'});
	return this.httpClient.post('project/sendToGeneralMessage/', formData);
  }
  //public replyInterOfficeCommunication(data:any): Observable<any>{
  public replyGeneralMessage(formData:FormData){
	//return this.httpClient.post("project/replyInterOfficeCommunication", data);
  	return this.httpClient.post('project/replyGeneralMessage/', formData);
  }
  public deleteDepartment(data:any): Observable<any>{
    return this.httpClient.get("/user/deleteDepartment/", { params : data});
  }
  public viewUpdateDepartmentCommunicationMessage(data:any): Observable<any>{
    return this.httpClient.get("project/viewUpdateDepartmentCommunicationMessage/"+data);
  }
  public viewUpdateDepartmentGenMessage(data:any): Observable<any>{
    return this.httpClient.get("project/viewUpdateDepartmentGenMessage/"+data);
  }
  public searchInterDeptCommList(data:any): Observable<any>{
    return this.httpClient.get("project/searchGeneralMessageListTest", { params : data});
  }
  public downloadWorkMessageAttachmentByOffComId(data:any): Observable<any>{
	return this.httpClient.get("project/downloadWorkMessageAttachmentByOffComId/"+data);
  }
}
