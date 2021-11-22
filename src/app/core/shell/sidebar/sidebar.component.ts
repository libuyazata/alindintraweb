import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';
import { SideBarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {

  menuHidden = true;
  isAdminUser:Boolean;
  isMobileLayout: Boolean;
  isWebLayout: Boolean;

  
  public privilegesList : Array<any>;
  public prv_employeeView : string;
  public prv_employeeEdit : string;
  public prv_employeeDelete : string;
  public prv_departmentView : string;
  public prv_departmentEdit : string;
  public prv_departmentDelete : string;
  public prv_workView : string;
  public prv_workEdit : string;
  public prv_workDelete : string;
  public prv_subTaskView : string;
  public prv_subTaskEdit : string;
  public prv_subTaskDelete : string;
  public prv_doucmentView : string;
  public prv_documentEdit : string;
  public prv_documentDelete : string;
  public prv_deputationView : string;
  public prv_deputationEdit : string;
  public prv_deputationDelete : string;  
  
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              public nav: SideBarService) { }

  ngOnInit() { 
  	const storage = sessionStorage;
    this.prv_employeeView = storage.getItem('prv_employeeView');
		 this.prv_employeeEdit = storage.getItem('prv_employeeEdit');
		 this.prv_employeeDelete = storage.getItem('prv_employeeDelete');
		 this.prv_departmentView = storage.getItem('prv_departmentView');
		 this.prv_departmentEdit = storage.getItem('prv_departmentEdit');
		 this.prv_departmentDelete = storage.getItem('prv_departmentDelete');
		 this.prv_workView = storage.getItem('prv_workView');
		 this.prv_workEdit = storage.getItem('prv_workEdit');
		 this.prv_workDelete = storage.getItem('prv_workDelete');
		 this.prv_subTaskView = storage.getItem('prv_subTaskView');
		 this.prv_subTaskEdit = storage.getItem('prv_subTaskEdit');
		 this.prv_subTaskDelete = storage.getItem('prv_subTaskDelete');
		 this.prv_doucmentView = storage.getItem('prv_doucmentView');
		 this.prv_documentEdit = storage.getItem('prv_documentEdit');
		 this.prv_documentDelete = storage.getItem('prv_documentDelete');
		 this.prv_deputationView = storage.getItem('prv_deputationView');
		 this.prv_deputationEdit = storage.getItem('prv_deputationEdit');
		 this.prv_deputationDelete = storage.getItem('prv_deputationDelete');

	this.isAdminUser = this.authenticationService.isAdminUser();
    this.updateLayout();

    window.onresize = () => {
      this.updateLayout();      
    }
  }

  toggleMenu() {

    this.menuHidden = this.nav.visible;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  updateLayout() {
    if(window.innerWidth <= 576) {
      if(! this.isMobileLayout) {
        this.nav.visible = false;
      }
      this.isMobileLayout = true;
      this.isWebLayout = false;
    } else {
      if( ! this.isWebLayout) {
        this.nav.visible = true;
      }
      this.isWebLayout = true;
      this.isMobileLayout = false;
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
    return credentials ? credentials.userName : null;
  }

  menuButtonClicked() {
    if(this.isMobileLayout) {
      this.nav.visible = false;
    }
  }
}
