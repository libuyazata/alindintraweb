import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CallManagementComponent } from './call-management.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'call-management', 
      component: CallManagementComponent, 
      loadChildren: './call-management.module#CallManagementModule',
      data: { title: extract('call-management') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CallManagementRoutingModule { }
