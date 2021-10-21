import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkTypeComponent } from './work-type.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-info/work-type', 
      component: WorkTypeComponent, 
      loadChildren: './work-type.module#WorkTypeModule',
      data: { title: extract('work-type') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkTypeRoutingModule { }
