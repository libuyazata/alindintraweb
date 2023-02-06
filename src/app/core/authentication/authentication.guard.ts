import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';


const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {
public privilegesList : Array<any>;

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
		 const userRoleId = this.authenticationService.getuserRole();
		 this.authenticationService.getprivilegesList(userRoleId).subscribe((resp:any)=>{      
		  this.privilegesList = resp["authorization"];
		  let storage = sessionStorage;
		  sessionStorage.clear();
		  storage.setItem('prv_employeeView', JSON.stringify(this.privilegesList['employeeView']));
		  storage.setItem('prv_employeeEdit', JSON.stringify(this.privilegesList['employeeEdit']));
		  storage.setItem('prv_employeeDelete', JSON.stringify(this.privilegesList['employeeDelete']));
		  storage.setItem('prv_departmentView', JSON.stringify(this.privilegesList['departmentView']));
		  storage.setItem('prv_departmentEdit', JSON.stringify(this.privilegesList['departmentEdit']));
		  storage.setItem('prv_departmentDelete', JSON.stringify(this.privilegesList['departmentDelete']));
		  storage.setItem('prv_workView', JSON.stringify(this.privilegesList['workView']));
		  storage.setItem('prv_workCreate', JSON.stringify(this.privilegesList['workEdit']));
		  storage.setItem('prv_workEdit', JSON.stringify(this.privilegesList['workEdit']));
		  storage.setItem('prv_workDelete', JSON.stringify(this.privilegesList['workDelete']));
		  storage.setItem('prv_subTaskView', JSON.stringify(this.privilegesList['subTaskView']));
		  storage.setItem('prv_subTaskEdit', JSON.stringify(this.privilegesList['subTaskEdit']));
		  storage.setItem('prv_subTaskDelete', JSON.stringify(this.privilegesList['subTaskDelete']));
		  storage.setItem('prv_doucmentView', JSON.stringify(this.privilegesList['doucmentView']));
		  storage.setItem('prv_documentEdit', JSON.stringify(this.privilegesList['documentEdit']));
		  storage.setItem('prv_documentDelete', JSON.stringify(this.privilegesList['documentDelete']));
		  storage.setItem('prv_deputationView', JSON.stringify(this.privilegesList['deputationView']));
		  storage.setItem('prv_deputationEdit', JSON.stringify(this.privilegesList['deputationEdit']));
		  storage.setItem('prv_deputationDelete', JSON.stringify(this.privilegesList['deputationDelete']));
		}); 
		
	  }
    }
    if(!hasPrivilege) { 
      //log.debug('Not authenticated, redirecting...');
      this.router.navigate(['/login'], { replaceUrl: true });
    }
    return hasPrivilege;
  }

}
