import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {

  menuHidden = true;
  isAdminUser:Boolean;
  isAdmin: Boolean;
  isHod: Boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) { }

  ngOnInit() { 
    this.isAdminUser = this.authenticationService.isAdminUser();
    this.isAdmin = this.authenticationService.isAdmin();
    this.isHod = this.authenticationService.isHodCoordinator();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
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
    
  }
}
