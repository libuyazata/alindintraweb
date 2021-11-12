import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { PrivilegesComponent } from '@app/privileges/privileges.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'privileges', 
      component: PrivilegesComponent, 
      loadChildren: './privileges.module#PrivilegesModule',
      data: { title: extract('Manage privileges') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrivilegesRoutingModule { }
