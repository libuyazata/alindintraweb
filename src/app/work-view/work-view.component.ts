import { Component, Input, OnInit, EventEmitter, Output, OnChanges,ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkViewService } from '@app/work-view/work-view.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DownloadComponent } from '@app/shared/components/download-ctrl/download.component';
import { ReplaySubject } from 'rxjs';
import {  } from '@angular/core';
@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss']
})
export class WorkViewComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public workDetailsList : Array<any>;
  public subtaskDetailsList : Array<any>;
  public subtaskDetailsListbyId : Array<any>;
  public workTypeList : Array<any>;
  public departmentList : Array<any>;
  public employeeList : Array<any>;
  public workStatusList : Array<any>;
  public documentTypeList : Array<any>;
  public documentCatList : Array<any>;
  public subtaskDocumentDetails : Array<any>;
  public workDetailsById : Array<any>;
  public allocatedEmployeeList : Array<any>;
  public getWorkVerificationStatus : Array<any>;
  public employeeAllocatelist : Array<any>;
  public employeeAllocatesublist : Array<any>;
  public dropdownSettings: any = {};

  public data  : any = {};
  public settings  : any = {};
  public selectedItems  : any = {};
  
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;
  public addItemsubForm: FormGroup;
  public addItemuploadForm: FormGroup;
  public addempAllocateForm: FormGroup;
  public addempAllocateList: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public issubFormVisible : boolean = false;
  public isuploadFormVisible : boolean = false;
  public isempAllocateFormVisible : boolean = false;
  public empAllocatelistFormVisible : boolean = false;
  public empAllocatesublistFormVisible : boolean = false;
  public isEdit : boolean = false;
  public issubEdit : boolean = false;
  public isuploadEdit : boolean = false;
  public isAllocateEdit : boolean = false;
  
  public isFormSubmitInitiated : boolean = false;
  public issubFormSubmitInitiated : boolean = false;
  public isuploadFormInitiated : boolean = false;
  public isAllocateFormInitiated : boolean = false;
  public isNotEmployeesSelected: boolean = false; // For Call allotment


  public itemName: string = "Work";
  public subitemName: string = "Sub Task";
  public uploadName: string = "Upload Document";
  public allocateName: string = "Employee Allocate";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;
  private previousItemDoc : any;
  public uploadPerCent : string;
  protected fileToUpload : any; // MoM files
  @ViewChild(DownloadComponent) downloadCtrl:DownloadComponent;
  public btnVal1: string= "Verify";
  public btnVal2: string= "Approval";
  public btnVal3: string= "Approved";
  public btnClass1: string= "btn-info";
  public btnClass2: string= "btn-warning";
  public btnClass3: string= "btn-success";
  
  public documentConfirmlabel: string= "documentConfirm";
  public documentApprovallabel: string= "documentApproval";
  
  public prv_workEdit : string;
  public prv_workDelete : string;
  public prv_subTaskView : string;
  public prv_subTaskEdit : string;
  public prv_subTaskDelete : string;
  public prv_doucmentView : string;
  public prv_documentEdit : string;
  public prv_documentDelete : string;
 constructor(private WorkViewService : WorkViewService,
			  private alertService : AlertNotificationService, 
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { 
    super(WorkViewService);
  }

  ngOnInit() {     
	this.dropdownSettings = {
      singleSelection: false,
      idField: 'employeeId',
      textField: 'empFullNameWithEmpCode', 
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
	  maxHeight: 197,
	  clearSearchFilter: true,
	  defaultOpen: false
    };
	this.serviceReportSearchForm = new FormGroup({
      //callManagementStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      //dateFrom : new FormControl(''),
      //dateTo : new FormControl('')
    });    
    //this.getOnGoingCallManagementList();
	this.getWorkDetailsList();
	this.getWorkTypeList();
	this.getDepartmentList();
	this.getworkStatusList();
	this.getemployeeList();
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      workTypeId : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })
	this.materialRequestSearchForm.patchValue({"workTypeId" : 0});
    
	const storage = sessionStorage;
	this.prv_workEdit = storage.getItem('prv_workEdit');
	this.prv_workDelete = storage.getItem('prv_workDelete');
	this.prv_subTaskView = storage.getItem('prv_subTaskView');
	this.prv_subTaskEdit = storage.getItem('prv_subTaskEdit');
	this.prv_subTaskDelete = storage.getItem('prv_subTaskDelete');
	this.prv_doucmentView = storage.getItem('prv_doucmentView');
	this.prv_documentEdit = storage.getItem('prv_documentEdit');
	this.prv_documentDelete = storage.getItem('prv_documentDelete');
  }

  /*
    Combination of Call Management "OnGoing" status and service report data is the work details.
  */
  protected getOnGoingCallManagementList() {
    let searchFilter = this.serviceReportSearchForm.value;    
    let params = { 
      "dateFrom" : "",
      "dateTo" : "",
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "callStatus" : 1
    };
    this.WorkViewService.getWorkStatusList(params).subscribe((resp:any)=>{
      this.onGoingServiceReportList = resp["callDetails"]; 
    });
  }

	
  protected getWorkDetailsList() {
	let params = {
      departmentId : 1,
	  status:1
    }
	this.WorkViewService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  protected getAllocatelist(item:any) {
    const workDetailsId = item;
	this.WorkViewService.getAllEmployeeTaskAllocationByWorkDetailsId(workDetailsId).subscribe((resp:any)=>{      
	  this.employeeAllocatelist = resp["models"];
    });
  }
  protected getAllocatesublist(item:any) {
    const subTaskId = item;
	this.WorkViewService.getAllEmployeeTaskAllocationBySubTaskId(subTaskId).subscribe((resp:any)=>{      
	  this.employeeAllocatesublist = resp["models"];
    });
  }
  protected getAllocatedEmployeeList() {
	/* const departmentId = this.departmentId;*/
	const departmentId = this.addempAllocateForm.get('departmentId').value
	//const departmentId =1;
	this.WorkViewService.getAllocatedEmployeeList(departmentId).subscribe((resp:any)=>{      
	  this.allocatedEmployeeList = resp["models"];
    });
  }
  protected getSubTaskByWorkId(item:any){
	let params = {
      workDetailsId:item
    }

	this.WorkViewService.getWorkDetailsById(params).subscribe((resp:any)=>{      
	  this.workDetailsById = resp["model"];
	  this.addItemuploadForm.patchValue({
		departmentId: this.workDetailsById['departmentId'],
		});
    });
	this.WorkViewService.getWorkDetailsById(params).subscribe((resp:any)=>{      
	  this.workDetailsById = resp["model"];
		this.addempAllocateForm.patchValue({
		departmentId: this.workDetailsById['departmentId'],
		});
    });
	let params1 = {
      workDetailsId:item,
	  departmentId : 1,
	  status:1
    }
	this.WorkViewService.getSubTaskByWorkId(params1).subscribe((resp:any)=>{      
	  this.subtaskDetailsListbyId = resp["models"];
	/*   this.addItemuploadForm.patchValue({
		departmentId: 12,
		}); */
    });
  }
  
  protected getWorkTypeList() {
	let params = {
      status : 1
    }
	this.WorkViewService.getWorkTypeList(params).subscribe((resp:any)=>{      
	  this.workTypeList = resp["workStatusList"];
    });
  }
  protected getDepartmentList() {
	let params = {
      status : 1
    }
	this.WorkViewService.getDepartmentList(params).subscribe((resp:any)=>{      
	  this.departmentList = resp["departments"];
    });
  }
  protected getworkStatusList() {
	let params = {
      status : 1
    }
	this.WorkViewService.getWorkStatusList(params).subscribe((resp:any)=>{      
	  this.workStatusList = resp["workStatus"];
    });
  }
  protected getemployeeList() {
	let params = {
      status : 1
    }
	this.WorkViewService.getAllEmployeeList(params).subscribe((resp:any)=>{      
	  this.employeeList = resp["employees"];
    });
  }
	
  openCreateForm() {
    this.isFormVisible = true;
    this.isEdit = false;

    this.initializeForm(null)
  }
/*   openCreateSubForm() {
    this.issubFormVisible = true;
    this.issubEdit = false;
    this.initializesubForm(null)
  } */
  openCreateSubForm(item:any) {
    this.issubFormVisible = true;
    this.issubEdit = false;
	this.initializesubForm(null)
	this.addItemsubForm.patchValue({"workDetailsId" : item.workDetailsId});
  }
  /* openUploadForm() { 
    this.isuploadFormVisible = true;
    this.isuploadEdit = false;
    this.initializeuploadForm(null)
  } */
  openUploadForm(item:any) { 
    this.isuploadFormVisible = true;
    this.isuploadEdit = false;
    this.initializeuploadForm(null)
	this.addItemuploadForm.patchValue({"workDetailsId" : item.workDetailsId});
	this.addItemuploadForm.patchValue({"subTaskId" : item.subTaskId});
	//this.addItemuploadForm.patchValue({"departmentId" : 1});
	let params = {
      workDetailsId:item.workDetailsId
    }

	this.WorkViewService.getWorkDetailsById(params).subscribe((resp:any)=>{      
	  this.workDetailsById = resp["model"];
	  this.addItemuploadForm.patchValue({
		departmentId: this.workDetailsById['departmentId'],
		});
    });
  }
  /* openAllocateForm() { 
    this.isempAllocateFormVisible = true;
    this.isAllocateEdit = false;
    this.initializeAllocateForm(null)
  } */
  openAllocateForm(item:any) { 
    this.isempAllocateFormVisible = true;
    this.isAllocateEdit = false;
    this.initializeAllocateForm(null)
	let params = {
      workDetailsId:item.workDetailsId
    }

	this.WorkViewService.getWorkDetailsById(params).subscribe((resp:any)=>{      
	  this.workDetailsById = resp["model"];
	  this.addempAllocateForm.patchValue({
		departmentId: this.workDetailsById['departmentId'],
		});
    });
	//const departmentId = this.addempAllocateForm.get('departmentId').value
	const departmentId =1;
	this.WorkViewService.getAllocatedEmployeeList(departmentId).subscribe((resp:any)=>{      
	  this.allocatedEmployeeList = resp["models"];
    });
	
	this.addempAllocateForm.patchValue({"workDetailsId" : item.workDetailsId});
	this.addempAllocateForm.patchValue({"subTaskId" : item.subTaskId});
	
  }
  /* openAllocatelistForm() { 
    this.empAllocatelistFormVisible = true;
    this.initializeAllocatelist(null)
  } */
  openAllocatelistForm(item:any) { 
    this.empAllocatelistFormVisible = true;
    this.initializeAllocatelist(null)
	this.getAllocatelist(item.workDetailsId);
	//this.addempAllocateList.patchValue({"workDetailsId" : item.workDetailsId});
  }
  openAllocatesublistForm(item:any) { 
    this.empAllocatesublistFormVisible = true;
    this.initializeAllocatesublist(item)
  }
  closePopup() {
    this.clearForm();
    this.resetForm();
  }
  closePopupempAlloclist() {
    this.clearempAlloclist();
    //this.resetForm();
  }
  closePopupempAllocsublist() {
    this.clearempAllocsublist();
    //this.resetForm();
  }
  closesubPopup() {
    this.clearsubForm();
    this.resetsubForm();
  }
  closeuploadPopup() {
    this.clearuploadForm();
    this.resetuploadForm();
  }
  closeAllocatePopup() {
    this.clearAllocateForm();
    this.resetAllocateForm();
  }
  private clearForm() {
    this.isEdit = false;
    this.isFormVisible = false;
    this.isFormSubmitInitiated = false;
  }
  private clearempAlloclist() {
    this.empAllocatelistFormVisible = false;
  }
  private clearempAllocsublist() {
    this.empAllocatesublistFormVisible = false;
  }
  private clearsubForm() {
    this.issubEdit = false;
    this.issubFormVisible = false;
    this.issubFormSubmitInitiated = false;
  }
  private clearuploadForm() {
    this.isuploadEdit = false;
    this.isuploadFormVisible = false;
    this.isuploadFormInitiated = false;
  }
  private clearAllocateForm() {
    this.isAllocateEdit = false;
    this.isempAllocateFormVisible = false;
    this.isAllocateFormInitiated = false;
  }
   resetForm() {
    this.addItemForm.reset();
  }
  resetsubForm() {
    this.addItemsubForm.reset();
  }
  resetuploadForm() {
    this.addItemuploadForm.reset();
  }
  resetAllocateForm() {
    this.allocatedEmployeeList = [];
	this.addempAllocateForm.reset();
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
	this.getWorkDetailsList();
	this.getWorkTypeList();
	this.getDepartmentList();
	this.getworkStatusList();
	this.getemployeeList();

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
  private subdateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.addItemsubForm && this.addItemsubForm.get("startDate").value;
    const to = this.addItemsubForm && this.addItemsubForm.get("endDate").value;
		if (from && to) {
		  invalid = new Date(from).valueOf() > new Date(to).valueOf();
		}
		return invalid ? { invalidRange: { from, to } } : null;
  };
  
  private currentDate() {
  const currentDate = new Date();
  return currentDate.toISOString().substring(0,10);
  }
  private initializesubForm(data: any) {
    this.addItemsubForm = new FormGroup({
      subTaskId : new FormControl((null != data ? data.subTaskId : '')),
      workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
      subTaskName : new FormControl((null != data ? data.subTaskName : ''), Validators.required),
      description : new FormControl((null != data ? data.description : ''), Validators.required),
      workStatusId : new FormControl((null != data ? data.workStatusId : ''), Validators.required),
      startDate : new FormControl((null != data ? data.startDate : ''), Validators.required),
      endDate : new FormControl((null != data ? data.endDate : ''), [Validators.required,this.subdateRangeValidator]),
      createdOn : new FormControl((null != data ? data.createdOn : '')),
	  updatedOn : new FormControl((null != data ? data.updatedOn : ''))
	});
	//this.getWorkDetailsList();
	//this.getworkStatusList();

  }
  private initializeuploadForm(data: any) {
    this.addItemuploadForm = new FormGroup({
      departmentId : new FormControl((null != data ? data.departmentId : ''), Validators.required),
      subTaskId : new FormControl((null != data ? data.subTaskId : ''), Validators.required),
      workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
      description : new FormControl((null != data ? data.description : ''), Validators.required),
      documentName : new FormControl((null != data ? data.documentName : ''), Validators.required),
      documentTypeId : new FormControl((null != data ? data.documentTypeId : ''), Validators.required),
      documentCategoryId : new FormControl((null != data ? data.documentCategoryId : ''), Validators.required),
      docfile : new FormControl((null != data ? data.docfile : ''), Validators.required),
      });
	//this.getWorkDetailsList();
	this.getDocumentTypes();
	this.getdocumentCatList();
  }
  private initializeAllocateForm(data: any) {
    this.addempAllocateForm = new FormGroup({
      departmentId : new FormControl((null != data ? data.departmentId : '')),
      subTaskId : new FormControl((null != data ? data.subTaskId : ''), Validators.required),
      workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
      employeeList : new FormControl((null != data ? data.employeeList : ''), Validators.required),
		//employeeList: new FormControl(this.addempAllocateForm, Validators.required)
	 // employeeList : new FormControl('', Validators.required),

	});
	//this.getWorkDetailsList();
  }
  private initializeAllocatelist(data: any) {
	this.addempAllocateList = new FormGroup({
       workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
     });
	//this.getWorkDetailsList();
	//this.getAllocatelist();
  }
  private initializeAllocatesublist(data: any) {
	this.getAllocatesublist(data);
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.WorkViewService.saveOrUpdateWorkStatusList(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getWorkDetailsList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  onAddsubItem() { 
    this.issubFormSubmitInitiated = true;
    if( this.addItemsubForm.valid ) { 
      let submitData = this.addItemsubForm.value;
      let params = this.getPreparedParamssub(submitData);

      this.WorkViewService.saveOrUpdatesubWorkStatusList(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.subitemName.toLowerCase(), true);
          this.resetsubForm();
          this.clearsubForm();
          //this.getWorkDetailsList();
         // this.getSubtaskDetails(item.workDetailsId);
          this.getSubtaskDetails(submitData.workDetailsId);
		} else {
          this.alertService.showSaveStatus(this.subitemName.toLowerCase(), false);
        }
      });

    
    }
  };
  onAddemployeeAllocate() { 
    this.isAllocateFormInitiated = true;
    if( this.addempAllocateForm.valid ) { 
	    let submitData = this.addempAllocateForm.value;
	   let params = this.getPreparedParamsAlloc(submitData);
	  //let allotInfo = this.addempAllocateForm.value;   
      //alert(allotInfo);
	  this.WorkViewService.saveEmployeeTaskAllocation(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.allocateName.toLowerCase(), true);
          this.resetAllocateForm();
          this.clearAllocateForm();
          //this.getWorkDetailsList();
        } else {
          this.alertService.showSaveStatus(this.allocateName.toLowerCase(), false);
        }
      });

    
    }
  };
  
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
  private getPreparedParamssub(submitData: any) {
  const credentials = this.authenticationService.credentials;
  const createdEmpId =credentials.userId;
    let params : {[k : string]: any}= {
      workDetailsId : submitData.workDetailsId,
      subTaskName : submitData.subTaskName,
      description : submitData.description,
      workStatusId : submitData.workStatusId,
      createdEmpId : createdEmpId,
      startDate : submitData.startDate,
      endDate : submitData.endDate,
	  createdOn : submitData.createdOn,
      updatedOn : submitData.updatedOn,
	  status : submitData.status,
	  subTaskId : submitData.subTaskId
    }
	

    if(this.issubEdit) { 
      params.subTaskId = submitData.subTaskId,
      params.status = 1
	  
    }

    return params;
  }
	
  
  private getPreparedParamsAlloc(submitData: any) {
	const credentials = this.authenticationService.credentials;
    let params : {[k : string]: any}= {
      workDetailsId : submitData.workDetailsId,
	  subTaskId : submitData.subTaskId,
	  employeeList : submitData.employeeList
    }
    return params;
  }
  private getPreparedParamsdocUpload(submitData: any) {
	const credentials = this.authenticationService.credentials;
	const createdEmpId =credentials.userId;
    let params : {[k : string]: any}= {
      departmentId : submitData.departmentId,
	  workDetailsId : submitData.workDetailsId,
      subTaskId : submitData.subTaskId,
      description : submitData.description,
      documentName : submitData.documentName,
      documentTypeId : submitData.documentTypeId,
      documentCategoryId : submitData.documentCategoryId
    }
	/* if(this.isuploadEdit) { 
      params.subTaskId = submitData.subTaskId,
      params.status = 1
	  
    } */

    return params;
  }
  private getItemList() {
    let params = {}
    this.WorkViewService.getWorkDetailsList(params).subscribe((resp:any)=>{      
      this.workDetailsList = resp["models"];
    });
  }
  editItem(item: any) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.initializeForm(item);
  }
  editsubItem(item: any) {
    this.issubEdit = true;
    this.issubFormVisible = true;
    this.initializesubForm(item);
  }
  //#region public function
  deleteItem(item: any) {
    let params = {
      workDetailsId : item.workDetailsId
    };
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
  deletesubItem(item: any) {
    let params = {
      subTaskId : item.subTaskId
    };
    this.alertService.showPermenantDeleteConfirmation(this, this.subitemName.toLowerCase(), this.onConfirmDeletesub, params);
  }
  documentConfirm(item: any) {
   
   /* let params = {
      workDocumentId : item.workDocumentId
    }; */
	const workDocumentId= item.workDocumentId;
	this.WorkViewService.getWorkVerificationStatus(workDocumentId).subscribe((resp:any)=>{
		if(resp.verficationStatus == 0){
		this.alertService.showConfirmation(this, "Are you sure you want to Confirm this Document?", "Document Confirmation", "OK", this.onConfirmDocument, workDocumentId);
		}
		if(resp.verficationStatus == 1){
		this.alertService.showConfirmation(this, "Are you sure you want to Approve this Document?", "Document Approval", "OK", this.onApproveDocument, workDocumentId);
		}
    });
	//alert(getWorkVerificationStatus['verificationStatus']);
	
  } 
  documentDownload(item: any) {
	const workDocumentId= item.workDocumentId;
	this.WorkViewService.documentDownload(workDocumentId).subscribe((resp:any)=>{      
      //this.workDetailsList = resp["models"];
    });
  }
  public onDownloadPdfClicked(item: any){
    const workDocumentId= item.workDocumentId;
	this.downloadCtrl.downloadPdf(item.documentnumber, workDocumentId);
 }
  public print(event: any) {
    event.preventDefault();

    let element: HTMLElement = document.getElementById("report-download-control") as HTMLElement;
    element.click();
  }
  documentApproval(item: any) {
    /* let params = {
      workDocumentId : item.workDocumentId
    }; */
	const workDocumentId= item.workDocumentId;
    this.alertService.showConfirmation(this, "Are you sure you want to Approve this Document?", "Document Approval", "OK", this.onApproveDocument, workDocumentId);
  }
  public onConfirmDocument(_self: any, params: any) {
    _self.WorkViewService.confirmDocument(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showSuccess("Document Verified Successfully", deleteStatus);
     _self.btnVal1 = "Approval";
     _self.btnClass1 = "btn-warning";
     _self.documentConfirmlabel = "documentConfirm";
	 
	 //_self.getWorkDetailsList();
    });
  }
  public onApproveDocument(_self: any, params: any) {
    _self.WorkViewService.approveDocument(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showSuccess("Document Approved Successfully", deleteStatus);
      //_self.getWorkDetailsList();
	 _self.btnVal1 = "Approved";
     _self.btnClass1 = "btn-success";
	 _self.btnVal2 = "Approved";
     _self.btnClass2 = "btn-success";
    });
  }
  public onConfirmDelete(_self: any, params: any) {
    _self.WorkViewService.deleteworkStatus(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getWorkDetailsList();
    });
  }
  public onConfirmDeletesub(_self: any, params: any) {
    _self.WorkViewService.deleteworkStatussub(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.subitemName.toLowerCase(), deleteStatus);
      _self.getWorkDetailsList();
    });
  }
  openServiceRequest(item : any) { 
    item.isDetailsSetVisible = ! item.isDetailsSetVisible;

    if(this.previousItem != null && item != this.previousItem) {
      this.previousItem.isDetailsSetVisible = false;
    }

    this.previousItem = item;
	this.getSubtaskDetails(item.workDetailsId);
  }
  openDocumentRequest(subData : any) { 
    subData.isDocumentSetVisible = ! subData.isDocumentSetVisible;

    if(this.previousItemDoc != null && subData != this.previousItemDoc) {
      this.previousItemDoc.isDocumentSetVisible = false;
    }

    this.previousItemDoc = subData;
	this.getSubtaskDocumentDetails(subData.subTaskId);
	
  }
  
  protected getSubtaskDocumentDetails(item : any){
    const subTaskId = item;
    /* let params = { 
       subTaskId : subTaskId,
    } */
	this.WorkViewService.getSubtaskDocumentDetails(subTaskId).subscribe((resp:any)=>{
	  this.subtaskDocumentDetails = resp["models"];
    });
  }
  /* protected getSubTaskByWorkId(item:any){
	  alert(item.workDetailsId);
	 //this.getSubTaskByWorkId(item.workDetailsId); 
  } */
  protected getSearchParams(){
    let searchFilter = this.materialRequestSearchForm.value;    
    let params = {
      //"callStatus"  : searchFilter.serviceReportStatus,
      "startDate" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
      "endDate" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "workTypeId" : searchFilter.workTypeId == null ? "0" : searchFilter.workTypeId,
    }
    return params;
  }
  public onWorkDetailsSearched(){
    let params = this.getSearchParams();
    this.WorkViewService.getWorkDetailsBySearch(params).subscribe((resp:any)=>{
	  this.workDetailsList = resp["models"];
    });
  }
  
  protected getSubtaskDetails(item : any){ 
    const workDetailsId = item;
    let params = { 
       workDetailsId : workDetailsId,
       status : 1
    }
	this.WorkViewService.getSubTaskByWorkId(params).subscribe((resp:any)=>{
	  this.subtaskDetailsList = resp["models"];
    });
  }
  protected getDocumentTypes(){
    const status = 1;
	this.WorkViewService.getDocumentTypes(status).subscribe((resp:any) => {
      this.documentTypeList = resp["models"];
    });
  } 
  protected getdocumentCatList(){
    const status = 1;
	this.WorkViewService.getAllDocumentCategory(status).subscribe((resp:any) => {
      this.documentCatList = resp["models"];
    });
  } 
  public onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onAddDocument() { 
      this.isuploadFormInitiated = true;
      if( this.addItemuploadForm.valid ) { 
	  var formData = new FormData();
	  if(this.fileToUpload){
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      }
	  const subId=this.addItemuploadForm.get("subTaskId").value;
	  formData.append("departmentId", this.addItemuploadForm.get("departmentId").value);
	  formData.append("workDetailsId", this.addItemuploadForm.get("workDetailsId").value);
	  formData.append("subTaskId", this.addItemuploadForm.get("subTaskId").value);
	  formData.append("description", this.addItemuploadForm.get("description").value);
	  formData.append("documentName", this.addItemuploadForm.get("documentName").value);
	  formData.append("documentTypeId", this.addItemuploadForm.get("documentTypeId").value);
	  formData.append("documentCategoryId", this.addItemuploadForm.get("documentCategoryId").value);
	
	  this.WorkViewService.saveWorkDocument(formData).subscribe((resp:any) => {	  
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.uploadName.toLowerCase(), true);
          this.resetuploadForm();
          this.clearuploadForm();
		  this.getSubtaskDocumentDetails(subId);
		  //this.getWorkDetailsList();
        } else {
          this.alertService.showSaveStatus(this.uploadName.toLowerCase(), false);
        }
		
		
      });
	}
	};   
	public onItemDeSelect(event:any){ 
    this.isNotEmployeesSelected = (!this.addempAllocateForm.value.employeeList || 
                                    this.addempAllocateForm.value.employeeList.length == 0);
	}
    public onItemSelect(event:any){ 
    this.isNotEmployeesSelected = !(this.addempAllocateForm.value.employeeList && 
                                    this.addempAllocateForm.value.employeeList.length > 0);    
    }
  

  get itemForm() { return this.addItemForm.controls; }
  get subitemForm() { return this.addItemsubForm.controls; }
  get uploadForm() { return this.addItemuploadForm.controls; }
  get allocateForm() { return this.addempAllocateForm.controls; }
  get allocateList() { return this.addempAllocateList.controls; }

}