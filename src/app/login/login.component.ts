import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { ShowHidePasswordDirective } from '@app/core/directives//showhide-password.directive'
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { ChangepasswordService } from '@app/change-password/change-password.service';
// import { debug } from 'util';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  public forgotPasswordForm : FormGroup;
  public isforgotPasswordformSubmit :Boolean = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
			  private alertService : AlertNotificationService,
			  private changepasswordService : ChangepasswordService) {
    this.createForm();
  }

  ngOnInit() { 
   //const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  this.forgotPasswordForm = new FormGroup({
      email : new FormControl('',  [Validators.required])
      //email : new FormControl('',  [Validators.required, Validators.pattern(emailPattern)])
    });
  }

  // login() {
  //   this.isLoading = true;;
  //   this.authenticationService.login(this.loginForm.value)
  //     .pipe(finalize(() => {
  //       this.loginForm.markAsPristine();
  //       this.isLoading = false;
  //     }))
  //     .subscribe(credentials => {
  //       log.debug(`${credentials.userName} successfully logged in`);        
  //       const userInfo = {
  //         userId : credentials.userId,
  //         userName : credentials.userName,
  //         token : credentials.token,
  //         userRole : credentials.userRole,
  //         name : credentials.name
  //       }        
  //       this.authenticationService.setRolesAndPermissions(userInfo); // TODO: Set proper permission here
  //       this.authenticationService.saveCredentials(userInfo, this.loginForm.get("remember").value);
  //       this.router.navigate(['/home'], { replaceUrl: true });
  //     }, error => {
  //       log.debug(`Login error: ${error}`);
  //       this.error = error;
  //     });
  // }

  login() {
    this.authenticationService.doLoginRequest(this.loginForm.value).subscribe(
      loginData => {
        if (loginData && loginData.status == "success" && loginData.loginDetails) {
		  const credentials = {
            userId : loginData.loginDetails.employeeId,
            profilePicPath : loginData.loginDetails.profilePicPath,
            departmentId : loginData.loginDetails.departmentId,
			userName : loginData.loginDetails.userName,
			fileType : loginData.loginDetails.fileType,
			profPicBase64 : loginData.loginDetails.profPicBase64,
            //fileType : "image/jpeg",
			//profPicBase64 : "/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN6aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzE4YzQ2ZjItNWU5MC0zMDQwLWE1MzktOGQyYzI2Yzc4MzZjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY0RkZBMDY0REUzNzExRTdCOTREQTFBQzY3OUIwRjBBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY0RkZBMDYzREUzNzExRTdCOTREQTFBQzY3OUIwRjBBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphYjVmYjY0Yy05NDY2LTQ2NGQtOTJkYi0zNjNlNGJhMzI3ODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzE4YzQ2ZjItNWU5MC0zMDQwLWE1MzktOGQyYzI2Yzc4MzZjIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3Jk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",
            token : loginData.token,
             userRole : this.getUserRole(loginData.loginDetails.roleName),
            // userRole : 1,
            name : loginData.loginDetails.firstName + " " + loginData.loginDetails.lastName
          }
          this.authenticationService.setRolesAndPermissions(credentials);
          this.authenticationService.saveCredentials(credentials,this.loginForm.get("remember").value);
          
		  /* if(credentials.userRole == 1 || credentials.userRole == 2 || credentials.userRole == 4){
            // Super Admin & Admin View
            this.router.navigate(['/home'], { replaceUrl: true });
          } else if(credentials.userRole == 3) {
            // Employee View
			this.router.navigate(['/project'], { replaceUrl: true });
          } */
		  this.router.navigate(['/home'], { replaceUrl: true });
		  
        } else {
          alert("Invalid Username and Password. Please provide the correct credentials.");
        }
      }
    )
  }

  getUserRole(roleName:string) {
    let userRole = 3; // Employee
    if (roleName.toUpperCase() == "ADMIN") {
      userRole = 1;
    } else if (roleName.toUpperCase() == "HOD") {
      userRole = 2;
    }else if (roleName.toUpperCase() == "DEPARTMENT COORDINATOR") {
      userRole = 4;
    } else {
      userRole = 3; // Employee
    }
    return userRole;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
  get forgotPassForm() { return this.forgotPasswordForm.controls; }

  public openPasswordModal() {    
    document.getElementById('passwordModal').classList.toggle('d-block');
  }
  public closePasswordModal() {
    this.isforgotPasswordformSubmit = false;
	this.forgotPasswordForm.reset();
    document.getElementById('passwordModal').classList.toggle('d-block');
  }
  
 
 public forgotPasswordformSubmit(){
    this.isforgotPasswordformSubmit = true;
    if(this.forgotPasswordForm.valid) {
      let forgotPasswordForm = this.forgotPasswordForm.value;
      let empCode = forgotPasswordForm.email;
		this.changepasswordService.forgetPassword(empCode).subscribe((resp:any)=>{
		if(resp.status == "success") {
          this.alertService.forgotPasswordStatus('Password', true);
			this.closePasswordModal();
		  } 
		//  if(resp.status == "failed") {
		 else{
			this.alertService.forgotPasswordStatus('Password', false);
          }
      }); 
    }
  }

}
