import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { AttendanceComponent } from './attendance.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';

const routes: Routes = [
  Route.withShell([
    //{ path: '', redirectTo: '/attendance', pathMatch: 'full' },
    { 
      path: 'attendance', canActivate : [AuthenticationGuard],
      component: AttendanceComponent, 
      loadChildren: './attendance.module#AttendanceModule',
      data: { title: extract('Attendance'), role: 'Admin' } 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AttendanceRoutingModule { }
