import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { ShowHidePasswordDirective } from '@app/core/directives//showhide-password.directive'
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

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

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
            departmentId : loginData.loginDetails.department.departmentId,
			userName : loginData.loginDetails.userName,
            token : loginData.token,
           userRole : this.getUserRole(loginData.loginDetails.usrRole.roleName),
             //userRole : 1,
            name : loginData.loginDetails.firstName + " " + loginData.loginDetails.lastName
          }
          this.authenticationService.setRolesAndPermissions(credentials);
          this.authenticationService.saveCredentials(credentials,this.loginForm.get("remember").value);
          if(credentials.userRole == 1 || credentials.userRole == 2){
            // Super Admin & Admin View
            this.router.navigate(['/home'], { replaceUrl: true });
          } else if(credentials.userRole == 3) {
            // Employee View
			this.router.navigate(['/project'], { replaceUrl: true });
          }
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

}
