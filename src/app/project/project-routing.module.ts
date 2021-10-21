import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'project', 
      component: ProjectComponent, 
      loadChildren: './project.module#ProjectModule',
      data: { title: extract('Project'), role: 'Employee' } 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProjectRoutingModule { }
