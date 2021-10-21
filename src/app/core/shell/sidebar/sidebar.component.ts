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

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              public nav: SideBarService) { }

  ngOnInit() { 
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
