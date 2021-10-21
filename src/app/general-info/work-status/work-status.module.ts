import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkStatusRoutingModule } from './work-status-routing.module';
import { WorkStatusComponent } from './work-status.component';
import { WorkStatusService } from '@app/general-info/work-status/work-status.service';
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
    WorkStatusRoutingModule,
	GeneralInfoMenuModule
  ],
  declarations: [
    WorkStatusComponent
  ],
  providers:[
    WorkStatusService,
	AlertNotificationService
  ]
})
export class WorkStatusModule { }
