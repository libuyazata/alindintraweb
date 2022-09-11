import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SentService } from '@app/sent/sent.service';
import { BaseComponent } from '@app/core/component/base.component';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

// import { stat } from 'fs';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent extends BaseComponent implements OnInit {
  version: string = environment.version;
  public interCommForm : FormGroup;
  public replyForm : FormGroup;
  public viewForm : FormGroup;
  public materialRequestSearchForm : FormGroup;
  public isDepartmentFormAttemptSubmit :Boolean = false;
  public isFormSubmitInitiated : boolean = false;
  public isreplyFormSubmitInitiated : boolean = false;
  public isEdit : boolean = false;
  public isDescription : boolean = false;
  public isFormVisible : boolean = false;
  public isNotDepartmentSelected: boolean = false; // For Call allotment
  public isNotDepartmentSelectedReply: boolean = false; // For Call allotment
  public isAdminUser: boolean = false; // For Call allotment

  public config : any;
  public workDetailsList : Array<any>;
  public departmentList : Array<any>;
  public workDescList : Array<any>;
  public communicationList : Array<any>;
  public communicationList2 : Array<any>;
  public communicationList3 : Array<any>;
  public communicationList4 : Array<any>;
  public searchcommunicationList : Array<any>;
  public subtaskList : Array<any>;
  public itemName: string = "Inter Office Communication";
  public itemNameReply: string = "Inter Office Communication Reply";
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  public detailsId : string;
  private previousItem : any;

  public dropdownSettings: any = {};
  public dropdownSettingsReply: any = {};
  constructor(private alertService : AlertNotificationService,private SentService : SentService,private authenticationService: AuthenticationService) { 
	super(SentService);
	this.config = {toolbarLocation:'bottom',toolbarGroups: [
        { name: 'clipboard', groups: ['undo'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list','align','paragraph'] },
        { name: 'colors', groups: ['colors'] },
      ],height: 60,};
  }

  ngOnInit() { 
	const storage = sessionStorage;
	this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
	this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 
    this.interCommForm = new FormGroup({
       workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       deptCommList : new FormControl('',  Validators.required),
       subject : new FormControl('',  Validators.required),
       description : new FormControl('',  Validators.required),
    });
	this.replyForm = new FormGroup({
       workName : new FormControl('',Validators.required),
       subTaskName : new FormControl('',Validators.required),
	   workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       deptCommList : new FormControl('',  Validators.required),
	   subject : new FormControl('',Validators.required),
	   description : new FormControl('',Validators.required),
	   description_old : new FormControl('',Validators.required),
	   referenceNo : new FormControl(''),
  	});
	this.viewForm = new FormGroup({
       employeeName : new FormControl(),
       workName : new FormControl(),
       subTaskName : new FormControl(),
       departmentName : new FormControl(),
	   subject : new FormControl(),
	   description : new FormControl(),
	   createdOn : new FormControl(),
	   });
	
	this.getWorkDetailsList();
	this.getcommunicationList();
	this.initializeForm(null);
	this.initializeReplyForm(null);
	this.initializeviewForm(null);
	
	 this.dropdownSettings = {
      singleSelection: false,
      idField: 'departmentId',
      textField: 'departmentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
	this.dropdownSettingsReply = {
      singleSelection: false,
      idField: 'departmentId',
      textField: 'departmentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.workDescList = [];
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })
	this.isAdminUser = this.authenticationService.isAdminUser();
}
	clearSearchForm(){
	this.getcommunicationList();
	}
	
	protected getSearchParams(){
    const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	let searchFilter = this.materialRequestSearchForm.value;    
    let params = {
      "startDate" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
      "endDate" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "departmentId" : departmentId,
    }
    return params;
  }
  public onCommunicationDetailsSearched(){
	  let params = this.getSearchParams();
	  this.SentService.searchInterDeptCommList(params).subscribe((resp:any)=>{
	  this.communicationList = resp["communicationModelList"];
    });
  }
  public onItemSelect(event:any){    
    this.isNotDepartmentSelected = !(this.interCommForm.value.deptCommList && 
                                    this.interCommForm.value.deptCommList.length > 0);    
  }

  public onItemDeSelect(event:any){    
    this.isNotDepartmentSelected = (!this.interCommForm.value.deptCommList || 
                                    this.interCommForm.value.deptCommList.length == 0);
  }
  
  public onItemSelectReply(event:any){    
    this.isNotDepartmentSelectedReply = !(this.replyForm.value.deptCommList && 
                                    this.replyForm.value.deptCommList.length > 0);    
  }

  public onItemDeSelectReply(event:any){    
    this.isNotDepartmentSelectedReply = (!this.replyForm.value.deptCommList || 
                                    this.replyForm.value.deptCommList.length == 0);
  }
  
  openCreateForm() {
    this.isFormVisible = true;
    this.isEdit = false;
    this.initializeForm(null)
  }
  closePopup() {
    this.clearinterCommForm();
    this.resetinterCommForm();
  }
  private clearinterCommForm() {
    this.isEdit = false;
    this.isFormVisible = false;
    this.isFormSubmitInitiated = false;
  }
  resetinterCommForm() {
	this.departmentList = []; // Reset it.
    this.interCommForm.reset();
  }
  protected getWorkDetailsList() {
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	let params = {
      departmentId : departmentId,
	  status:1
    }
	this.SentService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  protected getcommunicationList() {
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	//const departmentId = 1;
	
	this.SentService.getSentMessageListByDeptId(departmentId).subscribe((resp:any)=>{      
	  this.communicationList = resp["communicationList"];
    });
  }
  
  public getDepartmentList(event:any){
    let workDetailsId = event.target.value;
    if(workDetailsId != "") {
	  this.isDescription = true;
      this.getdepartmentListByWorkId(workDetailsId);
      this.getsubtaskListByWorkId(workDetailsId);
      this.getworkDescription(workDetailsId);
    } else {
      this.departmentList = []; // Reset it.
    }
  }
  
  protected getdepartmentListByWorkId(workDetailsId:number){
	const workId = workDetailsId;
	this.SentService.getdepartmentListByWorkId(workId).subscribe((resp:any) => {
      if(resp["deptList"] != null){
		  this.departmentList = resp["deptList"];
	  }
	  else{
		  this.departmentList = [];
	  }
   });
  }
  protected getsubtaskListByWorkId(workDetailsId:number){
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	let params = {
      workDetailsId:workDetailsId,
	  departmentId : departmentId,
	  status:1
    }
	this.SentService.getsubtaskListByWorkId(params).subscribe((resp:any) => {
		//  this.subtaskList = resp["models"];
		if(resp["models"] != null){
			  this.subtaskList = resp["models"];
		  }
		  else{
			  this.subtaskList = [];
		}  
		  
   });
  }
  protected getworkDescription(workDetailsId:number){
	let params = {
      workDetailsId : workDetailsId,
	  status:1
    }
	this.SentService.getworkDescription(params).subscribe((resp:any) => {
	  this.workDescList = resp["model"];
   });
  }
  
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.interCommForm.valid ) { 
    const credentials = this.authenticationService.credentials;
    const userId = credentials.userId;
    const departmentId = credentials.departmentId;
    
	  let submitData = this.interCommForm.value;
	  let params = this.getPreparedParams(submitData);
      params.departmentId=departmentId;
      params.employeeId=userId;
	  this.SentService.saveInterOfficeCommunication(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
			this.clearinterCommForm();
			//this.resetForm();
			//this.clearForm();
			this.getcommunicationList();
		  } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
		
      });
	  this.isFormSubmitInitiated = false;		
    }
	else{
	this.isNotDepartmentSelected = true;
	}
	this.isDescription = false;
	//this.initializeForm(null);		

  };
  private clearForms() {
   /*  this.isEdit = false;
    this.isFormVisible = false; */
    this.isFormSubmitInitiated = false;
  }
  submitReply() { 
    this.isreplyFormSubmitInitiated = true;
    if( this.replyForm.valid ) { 
      const credentials = this.authenticationService.credentials;
      const userId = credentials.userId;
      const departmentId = credentials.departmentId;
	  let submitDataReply = this.replyForm.value;
      let params = this.getPreparedReplyParams(submitDataReply);
      params.departmentId=departmentId;
      params.employeeId=userId;
	  this.SentService.replyInterOfficeCommunication(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemNameReply.toLowerCase(), true);
          this.clearForm();
		  this.getcommunicationList();
		} else {
          this.alertService.showSaveStatus(this.itemNameReply.toLowerCase(), false);
        }
      });
	  this.isreplyFormSubmitInitiated = false;	
    }
	this.isDescription = false;
	//this.initializeReplyForm(null);		
  };
  
  private getPreparedParams(submitData: any) {
    let params : {[k : string]: any}= {
	  workDetailsId : Number(submitData.workDetailsId),
      subTaskId : Number(submitData.subTaskId),
      deptCommList : submitData.deptCommList,
      referenceNo : null,
      subject : submitData.subject,
      description : submitData.description
    }
    return params;
  }
/*   
 {
  "departmentId": 1,
  "deptCommList": [
    {
      "departmentId": 4,      
      "viewStatus": 0
    }
  ],
  "description": "Test Message 08",  
  "employeeId": 1,
  "subTaskId": 1,  
  "subject": "Test Subject10",
  "workDetailsId": 1
}
 */ 
 private getPreparedReplyParams(submitDataReply: any) {
	let params : {[k : string]: any}= {
      workDetailsId : Number(submitDataReply.workDetailsId),
      subTaskId : Number(submitDataReply.subTaskId),
      deptCommList : submitDataReply.deptCommList,
      subject : submitDataReply.subject,
      description : submitDataReply.description,
      referenceNo : submitDataReply.referenceNo
    }
    return params;
  }
  
  private initializeForm(data: any) {
    this.isDescription = false;
	this.interCommForm = new FormGroup({
       workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       deptCommList : new FormControl('',Validators.required),
       referenceNo : new FormControl(''),
       subject : new FormControl('',Validators.required),
       description : new FormControl('',Validators.required),
  	});
  }
  private initializeviewForm(data: any) {
    this.isDescription = false;
	this.viewForm = new FormGroup({
       employeeName : new FormControl(),
       workName : new FormControl(),
       subTaskName : new FormControl(),
       departmentName : new FormControl(),
	   subject : new FormControl(),
	   description : new FormControl(),
	   createdOn : new FormControl(),
	   });
  }
  private initializeReplyForm(data: any) {
    this.isDescription = false;
	this.replyForm = new FormGroup({
		workDetailsId : new FormControl((null != data ? data.workDetailsId : ''),Validators.required),
		subTaskId : new FormControl((null != data ? data.subTaskId : ''),Validators.required),
		deptCommList : new FormControl((null != data ? data.deptCommList : ''),Validators.required),
        description : new FormControl((null != data ? '' : ''),Validators.required),
        subject : new FormControl((null != data ? data.subject : '')),
		subTaskName : new FormControl((null != data ? data.subTaskName : '')),
		referenceNo : new FormControl((null != data ? data.referenceNo : '')),
		workName : new FormControl((null != data ? data.workName : '')),
		description_old : new FormControl((null != data ? data.description : '')),
	});
  }
  private initializeViewForm(data: any) {
    //this.isDescription = false;
	 this.viewForm = new FormGroup({
       employeeName : new FormControl(),
       workName : new FormControl(),
       subTaskName : new FormControl(),
       departmentName : new FormControl(),
	   subject : new FormControl(),
	   description : new FormControl(),
	   createdOn : new FormControl(),
	   });
  }
  resetForm() {
    this.isDescription = false;
	this.interCommForm.reset();
  }
  public viewDetails(item:any,viewItem:any){
	//this.detailsId=item;
		//this.initializeViewForm(item);
	const viewStatus = viewItem[0]['viewStatus'];
	const deptCommId = viewItem[0]['deptCommId'];
	  
	  if(viewStatus == 0){
			this.SentService.viewUpdateDepartmentCommunicationMessage(deptCommId).subscribe((resp:any)=>{      
			this.getcommunicationList();
			});
	 }		
	this.openDescriptionForm(item);
  }
  public openDescriptionForm(item:any) {    
	//this.communicationList2 = item;
	const officeCommunicationId = item;
	this.SentService.getCommunicationById(officeCommunicationId).subscribe((resp:any)=>{      
	  this.communicationList2 = resp["communicationModelList"];
	  document.getElementById('htmlDescription1').innerHTML= this.communicationList2[0]['description'];
	});
	document.getElementById('descriptionModal').classList.toggle('d-block');
  }
  public closeDescriptionModal() {
    document.getElementById('descriptionModal').classList.toggle('d-block');
  } 
  
  public replyMessage(item:any){
    this.replyForm.get("description").setValue("");
	this.replyForm.reset();
	//this.detailsId=item;
	/* const workId = item.workDetailsId;
	this.SentService.getdepartmentListByWorkId(workId).subscribe((resp:any) => {
      if(resp["deptList"] != null){
		  this.departmentList = resp["deptList"];
	  }
	  else{
		  this.departmentList = [];
	  } 
	this.replyForm.get("deptCommList").setValue(this.departmentList);
    }); */
	//this.departmentList = [{"departmentId":item.departmentId,"departmentName":item.departmentName}]
	this.departmentList=item.deptCommList;
	this.replyForm.get("deptCommList").setValue(this.departmentList);
	this.replyForm.get("workDetailsId").setValue(item.workDetailsId);
    this.replyForm.get("workName").setValue(item.workName);
    this.replyForm.get("subTaskId").setValue(item.subTaskId);
    this.replyForm.get("subTaskName").setValue(item.subTaskName);
    this.replyForm.get("referenceNo").setValue(item.referenceNo);
    this.replyForm.get("subject").setValue(item.subject);
    this.replyForm.get("description_old").setValue(item.description);
	
	const htmlDescription = document.querySelector('.htmlDescription');
	htmlDescription.innerHTML  = item.description;
	
	//this.initializeReplyForm(item);
	
	this.openReplyForm();
  }
  public openReplyForm() {
	document.getElementById('replyModal').classList.toggle('d-block');
  }
  public closeReplyModal() {
    this.replyForm.reset();
	document.getElementById('replyModal').classList.toggle('d-block');
  } 
   private clearForm() {
    document.getElementById('replyModal').classList.toggle('d-block');
  }
  updateMessage(item:any){
	  const viewStatus = item[0]['viewStatus'];
	  const deptCommId = item[0]['deptCommId'];
	  
	  if(viewStatus == 0){
			this.SentService.viewUpdateDepartmentCommunicationMessage(deptCommId).subscribe((resp:any)=>{      
			this.getcommunicationList();
			});
	 }	  
  }
  openMessageList(item : any) { 
    item.isDetailsSetVisible = ! item.isDetailsSetVisible;

    if(this.previousItem != null && item != this.previousItem) {
      this.previousItem.isDetailsSetVisible = false;
    }

    this.previousItem = item;
	//this.getSubtaskDetails(item.workDetailsId);
  }
  get interCommForms() { return this.interCommForm.controls; }
  get replyForms() { return this.replyForm.controls; }
  get viewForms() { return this.viewForm.controls; }
}
