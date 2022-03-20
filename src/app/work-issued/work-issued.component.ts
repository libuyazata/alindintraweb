import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkissuedService } from '@app/work-issued/work-issued.service';

@Component({
  selector: 'work-issued',
  templateUrl: './work-issued.component.html',
  styleUrls: ['./work-issued.component.scss']
})
export class WorkissuedComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public deputationList : Array<any>;
  public workissuedList : Array<any>;
  public employeeList : Array<any>;
  public departmentList : Array<any>;
  public workDetailsList : Array<any>;
  
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Work Issued Details";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;
  public prv_deputationEdit : string;
  public prv_deputationDelete : string;

  constructor(private WorkissuedService : WorkissuedService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(WorkissuedService);
  }

  ngOnInit() {    
    /* this.serviceReportSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
     
    });  */   
	this.getWorkIssuedDetailsByDeptId();
	
	this.getDepartmentList();
	this.getAllEmployeeList();
	this.getWorkDetailsList();
	
	const storage = sessionStorage;
	this.prv_deputationEdit = storage.getItem('prv_deputationEdit');
	this.prv_deputationDelete = storage.getItem('prv_deputationDelete');
	this.initializeFormSearch(null)
  }
	private initializeFormSearch(data: any) {
    this.materialRequestSearchForm = new FormGroup({
      //type : new FormControl(''),
      departmentId : new FormControl((null != data ? data.departmentId : ''), Validators.required),
    });
   }
  protected getWorkIssuedDetailsByDeptId() {
	const departmentId = 0;
	this.WorkissuedService.getWorkIssuedDetailsByDeptId(departmentId).subscribe((resp:any)=>{      
	  this.workissuedList = resp["workIssuedModels"];
    });
  }
  
  protected getWorkDetailsList() {
	let params = {
      departmentId : 1,
	  status:1
    }
	this.WorkissuedService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  
  protected getAllEmployeeList() {
	let params = {
      status : 1
    }
	this.WorkissuedService.getAllEmployeeList(params).subscribe((resp:any)=>{      
	  this.employeeList = resp["employees"];
    });
  }
  protected getDepartmentList() {
    let params = {
      status : 1
    }
    this.WorkissuedService.getDepartmentList(params).subscribe((resp:any)=>{      
      this.departmentList = resp["departments"];
    });
  }
  openCreateForm() {
    this.isFormVisible = true;
    this.isEdit = false;
    this.initializeForm(null)
  }
  closePopup() {
    this.clearForm();
    this.resetForm();
  }
  private clearForm() {
    this.isEdit = false;
    this.isFormVisible = false;
    this.isFormSubmitInitiated = false;
  }
   resetForm() {
    this.addItemForm.reset();
  }
  protected getSearchParams(){
    let searchFilter = this.materialRequestSearchForm.value;    
    return searchFilter.departmentId == null ? "0" : searchFilter.departmentId;
  }
  public onDepartmentsSearched(){
    const departmentId = this.getSearchParams();
	this.WorkissuedService.getWorkIssuedDetailsByDeptId(departmentId).subscribe((resp:any)=>{
	  this.workissuedList = resp["workIssuedModels"];
    });
  }
  private initializeForm(data: any) {
    this.addItemForm = new FormGroup({
      createdEmpId : new FormControl((null != data ? data.createdEmpId : ''), Validators.required),
	  departmentId : new FormControl((null != data ? data.departmentId : ''), Validators.required),
	  workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
	});
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.WorkissuedService.saveWorkIssuedDetails(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getWorkIssuedDetailsByDeptId();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
      createdEmpId : submitData.createdEmpId,
      departmentId : submitData.departmentId,
      workDetailsId : submitData.workDetailsId,
    }

   /*  if(this.isEdit) { 
      deputationId : submitData.deputationId
    } */

    return params;
  }
   private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.addItemForm && this.addItemForm.get("startDate").value;
    const to = this.addItemForm && this.addItemForm.get("endDate").value;
		if (from && to) {
		  invalid = new Date(from).valueOf() > new Date(to).valueOf();
		}
		return invalid ? { invalidRange: { from, to } } : null;
  };
  editItem(item: any) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.initializeForm(item);
  }
  //#region public function
  deleteItem(item: any) {
    /* let params = {
      documentTypeId : item.documentTypeId
    }; */
	const params=item.workIssuedId;
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
  public onConfirmDelete(_self: any, params: any) {
    _self.WorkissuedService.deleteWorkIssuedDetails(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getWorkIssuedDetailsByDeptId();
    });
  }
  openServiceRequest(item : any) { 
    item.isStatusSetVisible = ! item.isStatusSetVisible;

    if(this.previousItem != null && item != this.previousItem) {
      this.previousItem.isStatusSetVisible = false;
    }

    this.previousItem = item;
  }
  // Convenience getter for easy access to attendance form fields.
  get itemForm() { return this.addItemForm.controls; }

}
