import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { ChangepasswordService } from '@app/change-password/change-password.service';
import { BaseComponent } from '@app/core/component/base.component';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
// import { stat } from 'fs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangepasswordComponent extends BaseComponent implements OnInit {
  version: string = environment.version;
  public passwordChangeForm : FormGroup;
  public isChangepasswordFormAttemptSubmit :Boolean = false;

  public departmentList : Array<any>;
  public departmentSearchForm : FormGroup;
  public itemName: string = "Change Password";
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  public deptuserRoleid : number;  
  constructor(private alertService : AlertNotificationService,private changepasswordService : ChangepasswordService,private authenticationService: AuthenticationService) { 
	super(changepasswordService);
  }

  ngOnInit() {
	const userRoleId = this.authenticationService.getuserRole();
	const storage = sessionStorage;
	this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
	this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
	//storage.setItem('deptuserRoleid', JSON.stringify(userRoleId));
	this.deptuserRoleid =userRoleId;
	this.passwordChangeForm = new FormGroup({
      existPassword : new FormControl('',  [Validators.required]),
      newPassword : new FormControl('',  [Validators.required]),
      reNewPassword : new FormControl('',  [Validators.required,this.passwordMatch])
    });
  }
  private passwordMatch: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const newPassword = this.passwordChangeForm && this.passwordChangeForm.get("newPassword").value;
    const reNewPassword = this.passwordChangeForm && this.passwordChangeForm.get("reNewPassword").value;
		if (newPassword && reNewPassword) {
		  invalid = newPassword != reNewPassword;
		}
		return invalid ? { invalidRange: { newPassword, reNewPassword } } : null;
  };

  // Convenience getter for easy access to leave request form fields.
  get changepasswordForm() { return this.passwordChangeForm.controls; }

  public onChangepasswordDetailsSubmitted(){
    this.isChangepasswordFormAttemptSubmit = true;
    if(this.passwordChangeForm.valid) {
      let passwordForm = this.passwordChangeForm.value;
      let newPassword = passwordForm.newPassword;
      let existPassword = passwordForm.existPassword;
		this.changepasswordService.updatePassword(newPassword,existPassword).subscribe((resp:any)=>{
		if(resp.status == "success") {
          this.alertService.showSaveStatus('Password', true);
			this.resetForm();
		  } 
		//  if(resp.status == "failed") {
		 else{
			this.alertService.showSaveStatus('Password', false);
          }
      }); 
    }
  }
  resetForm() {
    this.isChangepasswordFormAttemptSubmit = false;
	this.passwordChangeForm.reset();
  }
  
}
