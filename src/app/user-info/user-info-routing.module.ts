import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { UserInfoComponent } from './user-info.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'user-info', 
      component: UserInfoComponent,
      canActivate : [AuthenticationGuard],
      loadChildren: './user-info.module#UserInfoModule',
      data: { title: extract('User Details'),  role: 'Admin'} 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserInfoRoutingModule { }
