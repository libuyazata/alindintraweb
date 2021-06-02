import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';

import { SettingComponent } from './setting.component';

const routes: Routes = [
  Route.withShell([
    {
      path: 'setting',
      component: SettingComponent,
      loadChildren: './setting.module#SettingModule',
      data: { title: extract('setting'), role: 'Admin' }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
