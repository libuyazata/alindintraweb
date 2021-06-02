import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { UserListComponent } from './users.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';


const routes: Routes = [
  Route.withShell([
    // { 
    //   path: '', redirectTo: '/employees', pathMatch: 'full', 
    //   canActivate: [AuthenticationGuard],
    //   loadChildren: './users.module#UserListModule',
    //   data: { title: extract('User List'),  role: 'Admin' } 
    // },
    { 
      path: 'employees', 
      component: UserListComponent, 
      canActivate: [AuthenticationGuard],
      loadChildren: './users.module#UserListModule',
      data: { title: extract('User List')} 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserRoutingModule { }
