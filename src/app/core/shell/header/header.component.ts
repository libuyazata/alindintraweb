import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';
import { SideBarService } from '../sidebar/sidebar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  isAdminUser:Boolean;
  public fileType : string;
  public profPicBase64 : string;
  
  isResetPasswordFormVisible = false;
  isFormSubmitInitiated = false;
  public resetPasswordForm : FormGroup;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              public nav: SideBarService) { }

  ngOnInit() { 
    this.isAdminUser = this.authenticationService.isAdminUser();

    this.resetPasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      retypePassword: new FormControl('', Validators.required)
    });
  }

  toggleMenu() {
    this.nav.toggle();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  openResetPassword() {
    this.isResetPasswordFormVisible = true;
  }

  closeResetPasswordModal() {
    this.isResetPasswordFormVisible = false;
    this.isFormSubmitInitiated = false;
  }

  validPasswords() {
    return (this.resetPasswordForm.controls.newPassword.value === this.resetPasswordForm.controls.retypePassword.value)
  }

  onSubmitResetPassword() {
    this.isFormSubmitInitiated = true;
    if(this.resetPasswordForm.valid) {
      let data = this.resetPasswordForm.value;

      let params = {
        newPassword: data.newPassword,
        currentPassword : data.currentPassword
      }

      /* this.authenticationService.doResetPersonalPassword(params).subscribe((resp:any)=>{
        if(resp.status == "success") {
          this.alertService.showSuccess("Password reset successful. Please login to continue", "Password Reset");
          this.closeResetPasswordModal();
          this.logout();
        } else {
          this.alertService.showSuccess("Password reset failed. Please try again", "Password Reset");
        }
      }); */
    }
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.name : null;
  }
  get userId(): number | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.userId : null;
  }
  /* get profilePicPath(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.profilePicPath : null;
  }
  get fileType(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.fileType : null;
  }
  get profPicBase64(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.profPicBase64 : null;
  } */
  get resetForm() { return this.resetPasswordForm.controls; }

  menuButtonClicked() {
    
  }
  
  showProfilePic(employeeId:number){
	let empParams = { "employeeId" : employeeId};
    this.nav.getEmployeeDetailsById(empParams).subscribe((emp: any) => {
      //this.profilepic = emp.employeeList[0]['profilePicPath'];
	  this.fileType = emp.employeeList[0]['fileType'];
      this.profPicBase64 = emp.employeeList[0]['profPicBase64'];
	  //alert(emp.employee.profilePicPath);
	  
    });
  }
}
