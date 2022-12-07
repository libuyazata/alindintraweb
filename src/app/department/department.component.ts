import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '@app/department/department.service';
import { BaseComponent } from '@app/core/component/base.component';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

// import { stat } from 'fs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends BaseComponent implements OnInit {
  version: string = environment.version;
  public departmentSaveForm : FormGroup;
  //public employeeList : Array<any>;
  //public salaryInfoList : Array<any>;
  public isDepartmentFormAttemptSubmit :Boolean = false;

  public departmentList : Array<any>;
  public departmentSearchForm : FormGroup;
  public itemName: string = "Department";
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  constructor(private alertService : AlertNotificationService,private departmentService : DepartmentService) { 
	super(departmentService);
  }

  ngOnInit() {
	const storage = sessionStorage;
	this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
	this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 
    this.departmentSaveForm = new FormGroup({
      departmentId : new FormControl(''),
      departmentName : new FormControl('',  Validators.required),
      description : new FormControl(''),
	 // description : new FormControl('', [Validators.required, Validators.maxLength(10)])
	  //emailId : new FormControl('', Validators.required),
      isActive : new FormControl('',  Validators.required)
      //mobileNo : new FormControl('',  Validators.required)
    });
	this.departmentSearchForm = new FormGroup({
      departmentStatus : new FormControl(''),
    });
    this.getDepartmentList();
  }

  // Convenience getter for easy access to leave request form fields.
  get departmentForm() { return this.departmentSaveForm.controls; }

  public onDepartmentDetailsSubmitted(){
    this.isDepartmentFormAttemptSubmit = true;
    if(this.departmentSaveForm.valid) {
      let department = this.departmentSaveForm.value;
      department.departmentId = department.departmentId == "" ? 0 : department.departmentId;
      //this.departmentService.saveOrUpdateDepartment(department).subscribe((resp:any)=>{
      if(department.departmentId == "" || department.departmentId == null){
		this.departmentService.saveDepartment(department).subscribe((resp:any)=>{
        this.showAlert("Department details has been Saved successfully");
        this.getDepartmentList();
        this.closeDepartmentEntryView();
      }); 
	  }
	  else{
	  this.departmentService.updateDepartment(department).subscribe((resp:any)=>{
        this.showAlert("Department details has been Updated successfully");
        this.getDepartmentList();
        this.closeDepartmentEntryView();
      });
	  }
	  
	  
    } else {
      this.showAlert("Please fill all the mandatory fields before submit.");
    }
  }

  public editDepartmentDetails(departmentInfo:any){
    this.openDepartmentEntryForm();
    this.departmentSaveForm.patchValue(departmentInfo);
  }

  /* Add / Save Project View  Model Open Close Method */
  public openDepartmentEntryForm() {    
	this.departmentSaveForm.patchValue({"isActive" : 1});
	this.isDepartmentFormAttemptSubmit = false;
    document.getElementById('departmentModal').classList.toggle('d-block');
  }

  public resetAndOpenDepartmentEntryForm() {    
    this.departmentSaveForm.reset();
    this.isDepartmentFormAttemptSubmit = false;
    document.getElementById('departmentModal').classList.toggle('d-block');
  }  

  public closeDepartmentEntryView() {
    this.departmentSaveForm.reset();
    this.isDepartmentFormAttemptSubmit = false;
    document.getElementById('departmentModal').classList.toggle('d-block');
  } 

  public onDepartmentStatusChanged(event:any){
    this.getDepartmentList();
  }
  
  /* End of Add / Save Project View */

  protected getDepartmentList() {
    let params = {
      status : this.departmentSearchForm.value.departmentStatus == "" ? "-1" : this.departmentSearchForm.value.departmentStatus
    }
    this.departmentService.getDepartmentList(params).subscribe((resp:any)=>{      
      this.departmentList = resp["departments"];
    });
  }  
  deleteDepartmentDetails(item: any) {
    let params = {
      departmentId : item.departmentId
    };
    this.alertService.showInactiveConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
    public onConfirmDelete(_self: any, params: any) {
    _self.departmentService.deleteDepartment(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showInactiveStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getDepartmentList();
    });
	}
}
