import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { PrivilegesService } from '@app/privileges/privileges.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent extends BaseComponent implements OnInit {
  
  public privilegesList : Array<any>;
  public authorizationId : Array<any>;
  public userRoleId : Array<any>;
  public employeeView : Array<any>;
  public employeeEdit : Array<any>;
  public employeeDelete : Array<any>;
  public departmentView : Array<any>;
  public departmentEdit : Array<any>;
  public departmentDelete : Array<any>;
  public workView : Array<any>;
  public workEdit : Array<any>;
  public workDelete : Array<any>;
  public subTaskView : Array<any>;
  public subTaskEdit : Array<any>;
  public subTaskDelete : Array<any>;
  public doucmentView : Array<any>;
  public documentEdit : Array<any>;
  public documentDelete : Array<any>;
  public deputationView : Array<any>;
  public deputationEdit : Array<any>;
  public deputationDelete : Array<any>;
  public authorizationEntity : Array<any>;
  
  public serviceReportSearchForm : FormGroup;
  public addPrivilegeForm : FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Privileges";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;


  constructor(private PrivilegesService : PrivilegesService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(PrivilegesService);
  }

  ngOnInit() {    
	this.initializeForm(null)
  }
  
  protected getprivilegesList() {
		this.PrivilegesService.getAdminDashBoard().subscribe((resp:any)=>{      
		  this.authorizationEntity = resp.adminDashBoard.authorizationEntity['userRoleId'];
		  const userRoleId=1;
		  this.PrivilegesService.getprivilegesList(this.authorizationEntity).subscribe((resp:any)=>{      
		  this.privilegesList = resp["authorization"];
		});
	});
	
  }
  
  private initializeForm(data: any) {
	this.addPrivilegeForm = new FormGroup({
      authorizationId : new FormControl((null != data ? data.authorizationId : '')),
      userRoleId : new FormControl((null != data ? data.userRoleId : '')),
      employeeView : new FormControl((null != data ? data.employeeView : '')),
      employeeEdit : new FormControl((null != data ? data.employeeEdit : '')),
      employeeDelete : new FormControl((null != data ? data.employeeDelete : '')),
      departmentView : new FormControl((null != data ? data.departmentView : '')),
      departmentEdit : new FormControl((null != data ? data.departmentEdit : '')),
      departmentDelete : new FormControl((null != data ? data.departmentDelete : '')),
      workView : new FormControl((null != data ? data.workView : '')),
      workEdit : new FormControl((null != data ? data.workEdit : '')),
      workDelete : new FormControl((null != data ? data.workDelete : '')),
      subTaskView : new FormControl((null != data ? data.subTaskView : '')),
      subTaskEdit : new FormControl((null != data ? data.subTaskEdit : '')),
      subTaskDelete : new FormControl((null != data ? data.subTaskDelete : '')),
      doucmentView : new FormControl((null != data ? data.doucmentView : '')),
      documentEdit : new FormControl((null != data ? data.documentEdit : '')),
      documentDelete : new FormControl((null != data ? data.documentDelete : '')),
      deputationView : new FormControl((null != data ? data.deputationView : '')),
      deputationEdit : new FormControl((null != data ? data.deputationEdit : '')),
      deputationDelete : new FormControl((null != data ? data.deputationDelete : '')),
	 });
	this.getprivilegesList();
  }
  
  addPrivilege() { 
    this.isFormSubmitInitiated = true;
      let submitData = this.addPrivilegeForm.value;
      let params = this.getPreparedParams(submitData);

      this.PrivilegesService.updateAuthorization(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
         
          this.getprivilegesList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
	  authorizationId: submitData.authorizationId,
      userRoleId: submitData.userRoleId,
	  employeeView : submitData.employeeView,
      employeeEdit : submitData.employeeEdit,
      employeeDelete : submitData.employeeDelete,
      departmentView : submitData.departmentView,
      departmentEdit : submitData.departmentEdit,
      departmentDelete : submitData.departmentDelete,
      workView : submitData.workView,
      workEdit : submitData.workEdit,
      workDelete : submitData.workDelete,
      subTaskView : submitData.subTaskView,
      subTaskEdit : submitData.subTaskEdit,
      subTaskDelete : submitData.subTaskDelete,
      doucmentView : submitData.doucmentView,
      documentEdit : submitData.documentEdit,
      documentDelete : submitData.documentDelete,
      deputationView : submitData.deputationView,
      deputationEdit : submitData.deputationEdit,
      deputationDelete : submitData.deputationDelete,
    }
    return params;
  }
  get privilegeForm() { return this.addPrivilegeForm.controls; }

}
