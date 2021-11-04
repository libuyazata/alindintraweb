import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class WorkDetailsService extends BaseService {

  studentList: any[];

  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }  

  public getWorkDetailsList(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsByDeptId",{ params: data });
  }
  public getAllocatedEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("project/getEmployeeListForTaskAllocationByDeptId/"+data);
  }
  public getWorkDetailsById(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsById",{ params: data });
  }
  public getSubTaskByWorkId(data:any): Observable<any>{
    return this.httpClient.get("project/getSubTaskByWorkId",{ params: data });
  }
  public getSubtaskDocumentDetails(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDocumentBySubTaskId/"+data);
  }
  public documentDownload(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDocument/"+data);
  }
  public getWorkVerificationStatus(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkVerificationStatus/"+data);
  }
  public getWorkTypeList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkType",{ params: data });
  }
  public saveOrUpdateWorkStatusList(data: any) : Observable<any> {
	if(data.workDetailsId!=""){
	return this.httpClient.post("project/updateWorkDetails", data);
	}else{
	return this.httpClient.post("project/saveWorkDetails", data);
	}
  }
  public saveOrUpdatesubWorkStatusList(data: any) : Observable<any> {
	if(data.subTaskId!=""){
	return this.httpClient.post("project/updateSubTask", data);
	}else{
	return this.httpClient.post("project/saveSubTask", data);
	}

  }
  /* public saveWorkDocument(data: any) : Observable<any> {
		return this.httpClient.post("project/saveWorkDocument", data);
  } */
  public saveWorkDocument(data: any): Observable<any>{
    return this.httpClient.post('project/saveWorkDocument', data);
  }
  public saveEmployeeTaskAllocation(data:any): Observable<any>{
    return this.httpClient.post("project/saveEmployeeTaskAllocation",  { params: data });
  }
  
/*   public getSubTasklistById(data: any): Observable<any> {
    return this.httpClient.get("project/getSubTaskByWorkId",{ params: data });
  } */
  public deleteworkStatus(data:any): Observable<any>{
    return this.httpClient.get("project/deleteWorkDetailsById", { params : data});
  }
  public confirmDocument(data:any): Observable<any>{
    return this.httpClient.get("project/verifyDocument/"+data);
  }
  public approveDocument(data:any): Observable<any>{
    return this.httpClient.get("project/approveDocument/"+data);
  }
  public deleteworkStatussub(data:any): Observable<any>{
    return this.httpClient.get("project/deleteSubTask", { params : data});
  }
  public getDepartmentList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllDepartment/");
  }
  public getAllEmployeeList(data:any): Observable<any>{
    return this.httpClient.get("user/getAllEmployees/");
  }
  public getWorkStatusList(data:any): Observable<any>{
    return this.httpClient.get("masterTable/getAllWorkStatus",{ params: data });
  }
  public getWorkDetailsBySearch(data:any): Observable<any>{
    return this.httpClient.get("project/getWorkDetailsBySearch", { params : data});
  }
  public getDocumentTypes(data:any): Observable<any> {
    return this.httpClient.get("masterTable/getAllDocumentTypes/"+data);
  }
  public getAllDocumentCategory(data:any): Observable<any> {
    return this.httpClient.get("masterTable/getAllDocumentCategory/"+data);
  }
  public getAllEmployeeTaskAllocationByWorkDetailsId(data:any): Observable<any> {
    return this.httpClient.get("project/getAllEmployeeTaskAllocationByWorkDetailsId/"+data);
  }
  public getAllEmployeeTaskAllocationBySubTaskId(data:any): Observable<any> {
    return this.httpClient.get("project/getAllEmployeeTaskAllocationBySubTaskId/"+data);
  }

}
