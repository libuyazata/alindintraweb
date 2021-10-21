import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkTypeRoutingModule } from './work-type-routing.module';
import { WorkTypeComponent } from './work-type.component';
import { WorkTypeService } from '@app/general-info/work-type/work-type.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { GeneralInfoMenuModule } from '@app/general-info/shared/general-info-menu/general-info-menu.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
	FormsModule, 
    ReactiveFormsModule,
    WorkTypeRoutingModule,
	GeneralInfoMenuModule
  ],
  declarations: [
    WorkTypeComponent
  ],
  providers:[
    WorkTypeService,
	AlertNotificationService
  ]
})
export class WorkTypeModule { }
