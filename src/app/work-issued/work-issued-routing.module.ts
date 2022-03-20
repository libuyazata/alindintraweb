import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkissuedComponent } from './work-issued.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'work-issued', 
      component: WorkissuedComponent, 
      loadChildren: './work-issued.module#WorkissuedModule',
      data: { title: extract('Work Issued Details') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkissuedRoutingModule { }
