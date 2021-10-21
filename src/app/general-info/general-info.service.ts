import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../core/services/base.service';


@Injectable()
export class GeneralInfoService extends BaseService {


  constructor(public httpClient: HttpClient) { 
    super(httpClient);
  }

  //#region Relay API Calls 
  public getRelayList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllRelayDetails", data);
  }

  public saveOrUpdateRelay(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateRelayDetails", data);
  }

  public deleteRelay(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteRelayDetails", { params : data});
  }
  //#endregion

  //#region Panel API Calls 
  public getPanelList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllPanelDetails", data);
  }

  public saveOrUpdatePanel(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdatePanelDetails", data);
  }

  public deletePanel(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deletePanelDetails", { params : data});
  }
  //#endregion

  //#region Customer API Calls 
  public getCustomerList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllCustomerDetails", data);
  }

  public saveOrUpdateCustomer(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateCusotmerDetails", data);
  }

  public deleteCustomer(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteCustomerDetails", { params : data});
  }
  //#endregion

  //#region Board Division API Calls
  public getBoardDivisionList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllBoardDivisionDetails", data);
  }

  public saveOrUpdateBoardDivision(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateBoardDivisionDetails", data);
  }

  public deleteBoardDivision(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteBoardDivisionDetails", { params : data});
  }
  //#endregion
  

  //#region Site Details API Calls
  public getAllCustomerSiteDetails(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllCustomerSiteDetails", data);
  }

  public saveOrUpdateCustomerSiteDetails(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateCustomerSiteDetails", data);
  }

  public deleteCustomerSiteDetailsById(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteCustomerSiteDetailsById", { params : data});
  }
  //#endregion

  //#region JobNature API Calls
  public getJobNatureList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllNatureOfJobs", data);
  }

  public saveOrUpdateJobNature(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateNatureOfJobs", data);
  }

  public deleteJobNature(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteNatureOfJobs", { params : data});
  }
  //#endregion

  //#region Observation Before Maitenance API Calls
  public getObmList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/getAllObservationBeforeMaintanence", data);
  }

  public saveOrUpdateObm(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/call/saveOrUpdateObervationBeforeMaintanence", data);
  }

  public deleteObm(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/call/deleteObservationBeforeMaintanence", { params : data});
  }
  //#endregion

  //#region Material Request Items API Calls
  public getMaterialStockList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/getMaterialStockInfo?isActive=1", data);
  }

  public saveOrUpdateMaterialStock(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/mreq/saveOrUpdateMaterialStock", data);
  }

  public deleteMaterialStock(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/deleteMaterialStockInfo", { params : data});
  }
  //#endregion


  //#region Material Request Item Category API Calls
  public getMaterialStockCategoryList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/getAllMaterialCategory?isActive=1", { params : data});
  }

  public saveOrUpdateMaterialStockCategory(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/mreq/saveOrUpdateMaterialCategory", data);
  }

  public deleteMaterialStockCategory(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/deleteMaterialCategory", { params : data});
  }
  //#endregion

  //#region Material Request Item Category API Calls
  public getCourierList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/getAllCourierServiceDetails", { params : data});
  }

  public saveOrUpdateCourier(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/mreq/saveOrUpdateCourierServiceDetails", data);
  }

  public deleteCourier(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/mreq/deleteCourierServiceDetailsById", { params : data});
  }
  //#endregion

   //#region Customer JobNature API Calls # for call registration
  public getCustomerJobNatureList(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/util/getAllNatureOfJobsCallReg?isActive=1", { params : data});
  }

  public saveOrUpdateCustomerJobNature(data: any) : Observable<any> {
    return this.httpClient.post("alindsalesapp/util/saveOrUdpateNatureOfJobsCallReg", data);
  }

  public deleteCustomerCustomerJobNature(data:any): Observable<any>{
    return this.httpClient.get("alindsalesapp/util/deleteNatureOfJobsCallReg", { params : data});
  }
  //#endregion
}
