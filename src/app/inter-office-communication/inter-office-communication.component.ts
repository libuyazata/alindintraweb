import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InterofficeCommunicationService } from '@app/inter-office-communication/inter-office-communication.service';
import { BaseComponent } from '@app/core/component/base.component';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

// import { stat } from 'fs';

@Component({
  selector: 'app-inter-office-communication',
  templateUrl: './inter-office-communication.component.html',
  styleUrls: ['./inter-office-communication.component.scss']
})
export class InterofficeCommunicationComponent extends BaseComponent implements OnInit {
  version: string = environment.version;
  public interCommForm : FormGroup;
  public replyForm : FormGroup;
  public viewForm : FormGroup;
  public isDepartmentFormAttemptSubmit :Boolean = false;
  public isFormSubmitInitiated : boolean = false;
  public isreplyFormSubmitInitiated : boolean = false;
  public isEdit : boolean = false;
  public isDescription : boolean = false;
  public isFormVisible : boolean = false;

  public workDetailsList : Array<any>;
  public departmentList : Array<any>;
  public workDescList : Array<any>;
  public communicationList : Array<any>;
  public communicationList2 : Array<any>;
  public subtaskList : Array<any>;
  public itemName: string = "Inter Office Communication";
  public itemNameReply: string = "Inter Office Communication Reply";
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  public detailsId : string;
  constructor(private alertService : AlertNotificationService,private InterofficeCommunicationService : InterofficeCommunicationService) { 
	super(InterofficeCommunicationService);
  }

  ngOnInit() { 
	const storage = sessionStorage;
	this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
	this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 
    this.interCommForm = new FormGroup({
       workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       departmentId : new FormControl('',  Validators.required),
       subject : new FormControl('',  Validators.required),
       description : new FormControl('',  Validators.required),
    });
	this.replyForm = new FormGroup({
       workName : new FormControl('',Validators.required),
       subTaskName : new FormControl('',Validators.required),
       departmentName : new FormControl('',Validators.required),
	   workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       departmentId : new FormControl('',Validators.required),
	   subject : new FormControl('',Validators.required),
	   description : new FormControl('',Validators.required),
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
	this.initializeviewForm(null);
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
    this.interCommForm.reset();
  }
  protected getWorkDetailsList() {
	let params = {
      departmentId : 1,
	  status:1
    }
	this.InterofficeCommunicationService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  protected getcommunicationList() {
	const departmentId = 1;
	this.InterofficeCommunicationService.getcommunicationList(departmentId).subscribe((resp:any)=>{      
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
	this.InterofficeCommunicationService.getdepartmentListByWorkId(workId).subscribe((resp:any) => {
      if(resp["deptList"] != null){
		  this.departmentList = resp["deptList"];
	  }
	  else{
		  this.departmentList = [];
	  }
   });
  }
  protected getsubtaskListByWorkId(workDetailsId:number){
	let params = {
      workDetailsId:workDetailsId,
	  departmentId : 1,
	  status:1
    }
	this.InterofficeCommunicationService.getsubtaskListByWorkId(params).subscribe((resp:any) => {
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
	this.InterofficeCommunicationService.getworkDescription(params).subscribe((resp:any) => {
	  this.workDescList = resp["model"];
   });
  }
  
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.interCommForm.valid ) { 
      let submitData = this.interCommForm.value;
      let params = this.getPreparedParams(submitData);
      this.InterofficeCommunicationService.saveInterOfficeCommunication(params).subscribe((resp:any)=>{      
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
      let submitDataReply = this.replyForm.value;
      let params = this.getPreparedReplyParams(submitDataReply);
      this.InterofficeCommunicationService.saveInterOfficeCommunication(params).subscribe((resp:any)=>{      
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
	  workDetailsId : submitData.workDetailsId,
      subTaskId : submitData.subTaskId,
      departmentId : submitData.departmentId,
      subject : submitData.subject,
      description : submitData.description,
	  createdOn: "2022-06-22",
      updatedOn: "2022-06-22" 
    }
    return params;
  }
  private getPreparedReplyParams(submitDataReply: any) {
	let params : {[k : string]: any}= {
      workDetailsId : submitDataReply.workDetailsId,
      subTaskId : submitDataReply.subTaskId,
      departmentId : submitDataReply.departmentId,
      subject : submitDataReply.subject,
      description : submitDataReply.description,
	  createdOn: "2022-06-22",
      updatedOn: "2022-06-22" 
    }
    return params;
  }
  
  private initializeForm(data: any) {
    this.isDescription = false;
	this.interCommForm = new FormGroup({
       workDetailsId : new FormControl('',Validators.required),
       subTaskId : new FormControl('',Validators.required),
       departmentId : new FormControl('',Validators.required),
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
		workDetailsId : new FormControl((null != data ? data.workDetailsId : '')),
		subTaskId : new FormControl((null != data ? data.subTaskId : '')),
		departmentId : new FormControl((null != data ? data.departmentId : '')),
        description : new FormControl('',Validators.required),
        subject : new FormControl('',Validators.required),
		subTaskName : new FormControl((null != data ? data.subTaskName : '')),
		workName : new FormControl((null != data ? data.workName : '')),
		departmentName : new FormControl((null != data ? data.departmentName : '')),
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
  
  public viewDetails(item:any){
	//this.detailsId=item;
		//this.initializeViewForm(item);
	this.openDescriptionForm(item);
  }
  public openDescriptionForm(item:any) {    
	//this.communicationList2 = item;
	const officeCommunicationId = item;
	this.InterofficeCommunicationService.getCommunicationById(officeCommunicationId).subscribe((resp:any)=>{      
	  this.communicationList2 = resp["communicationModel"];
    });
	document.getElementById('descriptionModal').classList.toggle('d-block');
  }
  public closeDescriptionModal() {
    document.getElementById('descriptionModal').classList.toggle('d-block');
  } 
  
  public replyMessage(item:any){
	//this.detailsId=item;
	/* const departmentId = 1;
	this.InterofficeCommunicationService.getcommunicationList(departmentId).subscribe((resp:any)=>{      
	  this.communicationList2 = resp["communicationList"];
    }); */
	this.initializeReplyForm(item);
	this.openReplyForm();
  }
  public openReplyForm() {    
    document.getElementById('replyModal').classList.toggle('d-block');
  }
  public closeReplyModal() {
    document.getElementById('replyModal').classList.toggle('d-block');
  } 
   private clearForm() {
    document.getElementById('replyModal').classList.toggle('d-block');
  }
  
  get interCommForms() { return this.interCommForm.controls; }
  get replyForms() { return this.replyForm.controls; }
  get viewForms() { return this.viewForm.controls; }

}
