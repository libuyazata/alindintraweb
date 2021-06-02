import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { NotificationComponent } from './notification.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'notification', 
      component: NotificationComponent, 
      canActivate : [AuthenticationGuard],
      loadChildren: './notification.module#NotificationModule',
      data: { title: extract('Notification'), role: 'Admin' } 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class NotificationRoutingModule { }
