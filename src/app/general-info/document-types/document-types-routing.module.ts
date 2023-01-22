import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DocumenttypesComponent } from './document-types.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-info/document-types', 
      component: DocumenttypesComponent, 
      loadChildren: './document-types.module#DocumenttypesModule',
      data: { title: extract('Document types') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DocumenttypesRoutingModule { }
