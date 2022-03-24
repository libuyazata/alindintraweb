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
  public isDepartmentFormAttemptSubmit :Boolean = false;
  public isFormSubmitInitiated : boolean = false;
  public isEdit : boolean = false;
  public isDescription : boolean = false;

  public workDetailsList : Array<any>;
  public departmentList : Array<any>;
  public workDescList : Array<any>;
  public itemName: string = "Inter Office Communication";
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  constructor(private alertService : AlertNotificationService,private InterofficeCommunicationService : InterofficeCommunicationService) { 
	super(InterofficeCommunicationService);
  }

  ngOnInit() { 
	const storage = sessionStorage;
	this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
	this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 
    this.interCommForm = new FormGroup({
       workDetailsId : new FormControl('',Validators.required),
       departmentId : new FormControl('',  Validators.required),
       description : new FormControl('',  Validators.required),
     // description : new FormControl('')
      //emailId : new FormControl('', Validators.required),
      //isActive : new FormControl('',  Validators.required),
      //mobileNo : new FormControl('',  Validators.required)
    });
    
	this.getWorkDetailsList();
	//this.getDepartmentList();
	//this.initializeForm(null);
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
  
  public getDepartmentList(event:any){
    let workDetailsId = event.target.value;
    if(workDetailsId != "") {
	  this.isDescription = true;
      this.getdepartmentListByWorkId(workDetailsId);
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
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
		//window.location.reload();
		this.initializeForm(null);
      });
    }
  };
  
  private getPreparedParams(submitData: any) {
    let params : {[k : string]: any}= {
      workDetailsId : submitData.workDetailsId,
      departmentId : submitData.departmentId,
      description : submitData.description,
    }
    return params;
  }
  
  private initializeForm(data: any) {
    this.isDescription = false;
	this.interCommForm = new FormGroup({
      workDetailsId : new FormControl((null != data ? data.workDetailsId : '')),
	  departmentId : new FormControl((null != data ? data.departmentId : '')),
	  description : new FormControl((null != data ? data.description : '')),
	});
  }
  resetForm() {
    this.isDescription = false;
	this.interCommForm.reset();
  }
  get interCommForms() { return this.interCommForm.controls; }

}
