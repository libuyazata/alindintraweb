import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkpresentService } from '@app/work-present/work-present.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
  selector: 'work-present',
  templateUrl: './work-present.component.html',
  styleUrls: ['./work-present.component.scss']
})
export class WorkpresentComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public presentWorkList : Array<any> = [];
  public workTypeList : Array<any>;
  public workDetailsList : Array<any>;
  public materialRequestSearchForm : FormGroup;
  public departmentList : Array<any>;
  public employeeList : Array<any>;
  public workStatusList : Array<any>;
  public employeeAllocatelist : Array<any>;

  public isFormVisible : boolean = false;
  public isPaginationVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;
  public addItemForm: FormGroup;
  public itemName: string = "Work";
  public depId : any;

  public page: number = 0;
  public itemsPerPage: number;
  public totalItems: number;
  public sessionstorage: any = sessionStorage;
  
  constructor(private WorkpresentService : WorkpresentService,
			  private alertService : AlertNotificationService,  
              private authenticationService: AuthenticationService,
			  private route: ActivatedRoute) { 
    super(WorkpresentService);
  }

  ngOnInit() {    
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	this.sessionstorage.setItem("sessiondeptId", departmentId);

	this.getpresentWorkList();
	this.getWorkTypeList();
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      workTypeId : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })
	this.materialRequestSearchForm.patchValue({"workTypeId" : 0});
   // this.getWorkDetailsList();
	//this.getDepartmentList();
	//this.getworkStatusList();
	//this.getemployeeList();
  }
  
  openCreateForm() {
    this.isFormVisible = true;
    this.isEdit = false;
    this.initializeForm(null)
  }
  private initializeForm(data: any) {
	this.addItemForm = new FormGroup({
      workDetailsId : new FormControl((null != data ? data.workDetailsId : '')),
      workName : new FormControl((null != data ? data.workName : ''), Validators.required),
      description : new FormControl((null != data ? data.description : ''), Validators.required),
      workTypeId : new FormControl((null != data ? data.workTypeId : ''), Validators.required),
      departmentId : new FormControl((null != data ? data.departmentId : ''), Validators.required),
      workStatusId : new FormControl((null != data ? data.workStatusId : ''), Validators.required),
      projectCoOrdinatorEmpId : new FormControl((null != data ? data.projectCoOrdinatorEmpId : ''), Validators.required),
      startDate : new FormControl((null != data ? data.startDate : ''), Validators.required),
	  endDate : new FormControl((null != data ? data.endDate : ''), [Validators.required,this.dateRangeValidator]),
	  createdOn : new FormControl((null != data ? data.createdOn : '')),
	  updatedOn : new FormControl((null != data ? data.updatedOn : ''))
	 });
	//this.getWorkTypeList();
	this.getDepartmentList();
	this.getworkStatusList();
  } 
  protected getEmployeeListbyDeptId(item:any) {
    const departmentId = item;
	this.WorkpresentService.getEmployeeListForTaskAllocationByDeptId(departmentId).subscribe((resp:any)=>{      
	  this.employeeList = resp["models"];
    });
  }
  public getEmployeeListbyDept(event:any){
	//this.addItemForm.get("projectCoOrdinatorEmpId").setValue("");
	let departmentId = event.target.value;;
    if(departmentId != "") {
      this.getEmployeeListbyDeptId(departmentId);
    } else {
      this.employeeAllocatelist = []; // Reset it.
    }
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
  protected getpresentWorkList() {
	const credentials = this.authenticationService.credentials;
    const departmentId = credentials.departmentId;
	if(this.sessionstorage.getItem("dashboardsessiondeptId")==null){
	const credentials = this.authenticationService.credentials;
      this.depId = credentials.departmentId;
	}else{
	  this.depId = this.sessionstorage.getItem("dashboardsessiondeptId");
	}
	this.WorkpresentService.getWorkDetailsByDeptIdPageData(this.depId,1,0,12).subscribe((resp:any)=>{      
	  this.presentWorkList = resp["models"]["workModelList"];
      this.totalItems = resp["models"].totalCount;
	  if(this.totalItems > 0){
		this.isPaginationVisible = true;
	  }
	});
	
  }
  public getpresentWorkListPage(page: any) {
	if(this.sessionstorage.getItem("dashboardsessiondeptId")==null){
	const credentials = this.authenticationService.credentials;
      this.depId = credentials.departmentId;
	}else{
	  this.depId = this.sessionstorage.getItem("dashboardsessiondeptId");
	}
	
	this.WorkpresentService.getWorkDetailsByDeptIdPageData(this.depId,1,page,12).subscribe((resp:any)=>{      
	  this.presentWorkList = resp["models"]["workModelList"];
      this.page = page;
	});
	
  }
  closePopup() {
    this.clearForm();
    this.resetForm();
  }
  private getPreparedParams(submitData: any) {
  const credentials = this.authenticationService.credentials;
  const createdEmpId =credentials.userId;
    let params : {[k : string]: any}= {
      workName : submitData.workName,
      description : submitData.description,
      workTypeId : submitData.workTypeId,
      workStatusId : submitData.workStatusId,
      departmentId : submitData.departmentId,
      createdEmpId : createdEmpId,
      projectCoOrdinatorEmpId : submitData.projectCoOrdinatorEmpId,
      startDate : submitData.startDate,
      endDate : submitData.endDate,
	  createdOn : submitData.createdOn,
      updatedOn : submitData.updatedOn,
	  status : submitData.status,
	  workDetailsId : submitData.workDetailsId
    }

    if(this.isEdit) {
      params.workDetailsId = submitData.workDetailsId,
      params.status = 1
    }

    return params;
  }

  protected getWorkTypeList() {
	let params = {
      status : 1
    }
	this.WorkpresentService.getWorkTypeList(params).subscribe((resp:any)=>{      
	  this.workTypeList = resp["workStatusList"];
    });
  }
  protected getDepartmentList() {
	let params = {
      status : 1
    }
	this.WorkpresentService.getDepartmentList(params).subscribe((resp:any)=>{      
	  this.departmentList = resp["departments"];
    });
  }
  protected getworkStatusList() {
	let params = {
      status : 1
    }
	this.WorkpresentService.getWorkStatusList(params).subscribe((resp:any)=>{      
	  this.workStatusList = resp["workStatus"];
    });
  }
  protected getemployeeList() {
	let params = {
      status : 1
    }
	this.WorkpresentService.getAllEmployeeList(params).subscribe((resp:any)=>{      
	  this.employeeList = resp["employees"];
    });
  }
  protected getWorkDetailsList() {
	let params = {
      departmentId : 1,
	  status:1
    }
	this.WorkpresentService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.WorkpresentService.saveOrUpdateWorkStatusList(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getpresentWorkList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  protected getSearchParams(){
    let searchFilter = this.materialRequestSearchForm.value;    
    let params = {
      "startDate" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
      "endDate" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "workTypeId" : searchFilter.workTypeId == null ? "0" : searchFilter.workTypeId,
      "pageNo" : 0,
      "pageCount" : 12,
	}
    return params;
  }
  public onWorkDetailsSearched(){
	let params = this.getSearchParams();
    this.WorkpresentService.getWorkDetailsBySearch(params).subscribe((resp:any)=>{
	  this.presentWorkList = resp["models"]["workModelList"];
	  this.totalItems = resp["models"].totalCount;
	  if(this.totalItems > 0){
		this.isPaginationVisible = true;
	  }
    });
  }
  clearForm() {
	this.isEdit = false;
    this.isFormVisible = false;
    this.isFormSubmitInitiated = false;
	this.getpresentWorkList();
  }
  resetForm() {
    this.addItemForm.reset();
  }
  get itemForm() { return this.addItemForm.controls; }

}
