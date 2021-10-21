import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkStatusComponent } from './work-status.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-info/work-status', 
      component: WorkStatusComponent, 
      loadChildren: './work-status.module#WorkStatusModule',
      data: { title: extract('work-status') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkStatusRoutingModule { }
