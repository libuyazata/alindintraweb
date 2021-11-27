import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'department', 
      component: DepartmentComponent, 
      loadChildren: './department.module#DepartmentModule',
      data: { title: extract('Department')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DepartmentRoutingModule { }
