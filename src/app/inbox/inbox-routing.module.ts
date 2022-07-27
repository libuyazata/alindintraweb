import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'inbox', 
      component: InboxComponent, 
      loadChildren: './inbox.module#InboxModule',
      data: { title: extract('Inbox')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InboxRoutingModule { }
