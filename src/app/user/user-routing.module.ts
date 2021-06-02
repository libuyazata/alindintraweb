import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { UserComponent } from './user.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';


const routes: Routes = [
  Route.withShell([        
    { 
      path: 'employee', canActivate : [AuthenticationGuard],
      component: UserComponent, 
      loadChildren: './user.module#UserModule',
      data: { title: extract('Employee View'), role: 'Employee' } 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserRoutingModule { }
