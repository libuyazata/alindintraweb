import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkDocumentComponent } from './work-document.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-info/work-document', 
      component: WorkDocumentComponent, 
      loadChildren: './work-document.module#WorkDocumentModule',
      data: { title: extract('Work Document') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkDocumentRoutingModule { }
