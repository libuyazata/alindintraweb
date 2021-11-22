import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

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

  public searchForm:FormGroup;
  public itemName: string = "Employee";
  // Our future instance of DataTable
  protected dataTable: any;
  public data:any;
  public sortBy = "firstName";
  public sortOrder = "asc";
  public empSearchForm:FormGroup;
  public prv_employeeEdit : string;
  public prv_employeeDelete : string;
  //public dateOfJoin:any;
  //public addEmployeeForm: FormGroup;
  //public departmentList:any;
  //public designationList:any;
  //public isEmployeeFormAttemptSubmit = false;

  public myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd mmm yyyy',
  };

  constructor(private alertService : AlertNotificationService,
			  protected employeeService: UsersService,
              private chRef: ChangeDetectorRef,
              private datePipe: DatePipe) { 
                super(employeeService);
  }

  ngOnInit() { 
    const storage = sessionStorage;
    this.prv_employeeEdit = storage.getItem('prv_employeeEdit');
	this.prv_employeeDelete = storage.getItem('prv_employeeDelete');
	
	this.getEmployeeList();
    //this.getDepartmentList();
    //this.getDesignationList();

    // this.addEmployeeForm = new FormGroup({
    //   userId : new FormControl(),
    //   employeeCode : new FormControl(),
    //   firstName : new FormControl('', Validators.required),
    //   lastName : new FormControl('', Validators.required),
    //   designationId : new FormControl('', Validators.required),
    //   departmentId: new FormControl('', Validators.required),
    //   doj : new FormControl(),
    //   isActive : new FormControl()
    // });

    //let defaultDate = this.datePipe.transform(new Date(), 'MMM dd, yyyy');     
    //this.addEmployeeForm.patchValue({"doj": defaultDate });
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
} 
