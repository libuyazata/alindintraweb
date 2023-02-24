import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ChangepasswordComponent } from './change-password.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'change-password', 
      component: ChangepasswordComponent, 
      loadChildren: './change-password.module#ChangepasswordModule',
      data: { title: extract('Change Password')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ChangepasswordRoutingModule { }
