import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkViewComponent } from './work-view.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'work-view', 
      component: WorkViewComponent, 
      loadChildren: './work-view.module#WorkViewModule',
      data: { title: extract('Work View') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkViewRoutingModule { }
