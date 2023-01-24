import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';
import {IMyDpOptions} from 'mydatepicker';

import { UsersService } from './users-list.service';
import { BaseComponent } from '@app/core/component/base.component';



@Component({
  selector: 'app-home',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UserListComponent extends BaseComponent  implements OnInit {

  public employeeList: any;
  public departmentList : Array<any>;
  public searchForm:FormGroup;
  public itemName: string = "Employee";
  // Our future instance of DataTable
  protected dataTable: any;
  public data:any;
  public sortBy = "firstName";
  public sortOrder = "asc";
  public empSearchForm:FormGroup;
  public viewForm : FormGroup;
  public prv_employeeEdit : string;
  public prv_employeeDelete : string;
  public minsOfMeetingForm : FormGroup;
  public employeeDetails : Array<any>;
  protected fileToUpload : any; // MoM files
  isAdminUser:Boolean;
  //public dateOfJoin:any;
  //public addEmployeeForm: FormGroup;
  //public departmentList:any;
  //public designationList:any;
  //public isEmployeeFormAttemptSubmit = false;
  public uploadPerCent : string;
  public userprofilepicUploadsForm : FormGroup;
  public isMomFormAttemptSubmit : boolean = false;
  public materialRequestSearchForm : FormGroup;
  public empuserRoleid : number;  
  public myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd mmm yyyy',
  };

  constructor(private alertService : AlertNotificationService,
			  protected employeeService: UsersService,
              private chRef: ChangeDetectorRef,
			  private authenticationService: AuthenticationService,
              private datePipe: DatePipe) { 
                super(employeeService);
  }

  ngOnInit() { 
	const userRoleId = this.authenticationService.getuserRole();
	this.empuserRoleid =userRoleId;
	const storage = sessionStorage;
    this.prv_employeeEdit = storage.getItem('prv_employeeEdit');
	this.prv_employeeDelete = storage.getItem('prv_employeeDelete');
	
	this.getEmployeeList();
	this.getDepartmentList();
    this.initializeprofilepicUploadForm(); 

    this.minsOfMeetingForm = new FormGroup({
      employeeId : new FormControl(''),
    });
	
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      departmentId : new FormControl(''),
    })
	this.materialRequestSearchForm.patchValue({"departmentId" : 0});

	this.isAdminUser = this.authenticationService.isAdminUser();

  }
  protected initializeprofilepicUploadForm() {
    this.userprofilepicUploadsForm = new FormGroup({
      employeeId : new FormControl(''),
      document : new FormControl(''),
    });
  }
  protected getDepartmentList() {
	let params = {
      status : 1
    }
	this.employeeService.getDepartmentList(params).subscribe((resp:any)=>{      
	  this.departmentList = resp["departments"];
    });
  }
  public onEmployeeSearched(){
	  let params = this.getSearchParams();
	  this.employeeService.searchEmployee(params).subscribe((resp:any)=>{
	  this.employeeList = resp["empModels"];
    });
  }
  protected getSearchParams(){
    //const credentials = this.authenticationService.credentials;
    //const departmentId = credentials.departmentId;
    const departmentId = 0;
	
	let searchFilter = this.materialRequestSearchForm.value;    
    let params = {
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "departmentId" : departmentId,
    }
    return params;
  }
  protected getEmployeeList(){
    // var searchFilterData = this.getSearchFilter();
    this.employeeService.getEmployeeList()
      .subscribe((employeeListData: any) => {         
        setTimeout(()=> {
          this.employeeList =  employeeListData.employees;
        }, 100);
        // You'll have to wait that changeDetection occurs and projects data into 
        // the HTML template, you can ask Angular to that for you ;-)
        //this.chRef.detectChanges();
        //const table: any = $('table');
        //this.dataTable = table.DataTable();
        //console.log("Call Completed getEmployeeList()");
      });
  }

  // protected getDepartmentList(){
  //   this.employeeService.getDepartmentList()
  //     .subscribe((departmentListData: any) => { 
  //       this.departmentList = departmentListData.departmentList; 
  //   });
  // }

  // protected getDesignationList(){
  //   this.employeeService.getDesignationList()
  //     .subscribe((designationListData: any) => { 
  //       this.designationList = designationListData.designation; 
  //   });
  // }

  private getSearchFilter(){
    return {
      "departmentId" : -1,
      "designationId" : -1
    }
  }

  // Convenience getter for easy access to attendance form fields.
  //get employeeForm() { return this.addEmployeeForm.controls; }

  public onSearchButtonClicked() {
   
  }

  clearSearchForm(){
	this.getEmployeeList();
  }
  public onUserEditClicked(event:any, userData:any){ // TODO: Redefine the logic to go to add-user in edit mode
    event.preventDefault();
    //console.log(JSON.stringify(userData));
    // if(userData.doj){
    //   this.setDate(new Date(userData.doj));
    // }
    // this.addEmployeeForm.patchValue(userData);
    // this.openEmployeeModal();
  }
	deleteEmployee(item: any) {
    let params = {
      employeeId : item.employeeId
    };
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
    public onConfirmDelete(_self: any, params: any) {
    _self.employeeService.deleteEmployee(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getEmployeeList();
    });
	}
	
	public openUploadprofileModal(){
		//this.openDescriptionForm(item);
	    document.getElementById('profilePhotoModal').classList.toggle('d-block');
    }
	public closeprofilePictureModal() {
		document.getElementById('profilePhotoModal').classList.toggle('d-block');
	}
	public onMoMFileSelected(files: FileList) {
		this.fileToUpload = files.item(0);
    }
	public onMoMDetailsSubmitted(){
    this.isMomFormAttemptSubmit = true;
    if(!this.minsOfMeetingForm.invalid) {      
      //alert(this.momForm.employeeId.value);
	  var formData = new FormData();     
      if(this.fileToUpload){
         // Array.from(files).forEach(f => formData.append('file', f, f.name));
        formData.append('momFile', this.fileToUpload, this.fileToUpload.name);
      }
      //formData.append("employeeId", this.momForm.employeeId.value);
      formData.append("employeeId", "1");
      //console.log(formData);
      this.employeeService.uploadDocument(formData).subscribe((event:any)=>{        
        if (event && event instanceof HttpResponse) {
          //this.closeMoMModalView();
          //this.getNewWorkDetails();
          alert("The details has been submitted successfully.");
        }
      })
    }
    console.log(this.minsOfMeetingForm.value);
  }

	
	public upload(files: File[]){
/*     if(this.userDocumentUploadsForm.get("documentTypeId").value > 0) {
 */   
     var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file', f, f.name));
      //formData.append("userId", this.employeeId.toString());
      //formData.append("documentTypeId", this.userDocumentUploadsForm.get("documentTypeId").value);
      const userId = 1;
	  this.employeeService.uploadDocument(userId).subscribe((event:any) => {
        if (event && event.type === HttpEventType.UploadProgress) {
          let percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadPerCent = percentDone.toString();
          console.log("Percentage Done " + percentDone);
        } else if (event && event instanceof HttpResponse) {
          let uploadSuccess = true;
          this.uploadPerCent = '0';
          this.userprofilepicUploadsForm.reset();
          console.log("Upload Success " + uploadSuccess);
          //this.getEmployeeDocuments(this.employeeId);
        }
      });
    /* } else {      
      this.userDocumentUploadsForm.reset();
      this.showAlert("Please select the document type");
    } */
  }
  // public openAddEmployeeView(){
  //   this.addEmployeeForm.reset();
  //   this.toggleField(this.addEmployeeForm,"employeeCode", true);
  //   this.makeDropDownSelected(this.addEmployeeForm,
	// 		[{"departmentId" : "" },
	// 		 {"designationId" : "" }
	// 		]);
  //   document.getElementById('employeeModal').classList.toggle('d-block');
  // }

  // public openEmployeeModal() {
  //   this.toggleField(this.addEmployeeForm,"employeeCode", false);
  //   document.getElementById('employeeModal').classList.toggle('d-block');
  // }

  // public closeEmployeeModal() {
  //   this.isEmployeeFormAttemptSubmit = false;
  //   this.addEmployeeForm.reset();
  //   document.getElementById('employeeModal').classList.toggle('d-block');
  // }  

  // public onSubmitClicked() {    
  //   this.isEmployeeFormAttemptSubmit = true;
  //   if(!this.addEmployeeForm.invalid){
  //     this.toggleField(this.addEmployeeForm,"employeeCode", true);    
  //     let employeeData = this.addEmployeeForm.value;
  //     employeeData.doj = (employeeData.doj && employeeData.doj.jsdate) ? employeeData.doj.jsdate : null;
  //     employeeData.userId = (employeeData.userId) ? employeeData.userId : 0;
  //     employeeData.isActive = employeeData.isActive ? 1 : 0;
  //     this.employeeService.submitEmployeeDetails(employeeData).subscribe((resp: any) =>{
  //       this.closeEmployeeModal();
  //       setTimeout(() => this.getEmployeeList(), 100);
  //       alert("Employee details has been submitted successfully");
  //     });
  //   }
  // }

  // protected toggleField(form: FormGroup, fieldName:string, enable:boolean){
  //   let control = form.get(fieldName);      
  //   if(enable) {
  //     control.enable(); 
  //   } else {
  //     control.disable(); 
  //   }
  // }

  // protected setDate(date:Date): void {
  //   this.addEmployeeForm.patchValue({doj: {
  //   date: {
  //       year: date.getFullYear(),
  //       month: date.getMonth() + 1,
  //       day: date.getDate()}
  //   }});
  // }
  public viewDetails(item:any){
	this.openDescriptionForm(item);
  }
  public openDescriptionForm(item:any) {    
	let params = {
      employeeId : item
    }
	this.employeeService.getEmployeeById(params).subscribe((resp:any)=>{      
	  this.employeeDetails = resp["employeeList"];
    });
	document.getElementById('descriptionModal').classList.toggle('d-block');
  }
  public closeDescriptionModal() {
    document.getElementById('descriptionModal').classList.toggle('d-block');
  } 
  
  get momForm() { return this.minsOfMeetingForm.controls; }
  get viewForms() { return this.viewForm.controls; }

} 
