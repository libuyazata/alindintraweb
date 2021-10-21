import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let hasPrivilege = false;
    if (this.authenticationService.isAuthenticated()) {
      //log.info(route.component);
      //log.info("Auth Guard Called. Has Permission : " + this.authenticationService.hasPermission(route.data['role']));
      // Return true if it has no data[role] which means undefined.
      if(!route.data['role']) {
        hasPrivilege = true;
      }
      if(this.authenticationService.hasPermission(route.data['role'])){
        hasPrivilege = true;
      }
    }
    if(!hasPrivilege) { 
      //log.debug('Not authenticated, redirecting...');
      this.router.navigate(['/login'], { replaceUrl: true });
    }
    return hasPrivilege;
  }

}
