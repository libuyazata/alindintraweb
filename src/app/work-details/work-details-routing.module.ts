import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkDetailsComponent } from './work-details.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'work-details', 
      component: WorkDetailsComponent, 
      loadChildren: './work-details.module#WorkDetailsModule',
      data: { title: extract('Work Details') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkDetailsRoutingModule { }
