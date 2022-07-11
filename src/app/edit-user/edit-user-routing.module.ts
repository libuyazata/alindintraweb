import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { EditUserComponent } from './edit-user.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';


const routes: Routes = [
  Route.withShell([
    // { 
    //   path: '', redirectTo: '/save-user', pathMatch: 'full', 
    //   canActivate: [AuthenticationGuard],
    //   loadChildren: './add-user.module#AddUserModule',
    //   data: { title: extract('User Management'),  role: 'Admin' } 
    // },
    { 
      path: 'edit-user', 
      component: EditUserComponent, 
      canActivate: [AuthenticationGuard],
      loadChildren: './edit-user.module#EditUserModule',
      data: { title: extract('User Management')} 
      // data: { title: extract('User Management'),  role: 'Admin' }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class EditUserRoutingModule { }
