import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkpresentComponent } from './work-present.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'work-present', 
      component: WorkpresentComponent, 
      loadChildren: './work-present.module#WorkpresentModule',
      data: { title: extract('Present Work Details') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkpresentRoutingModule { }
