import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    DataTableModule,
  ],
  declarations: [SettingComponent]
})
export class SettingModule {}
