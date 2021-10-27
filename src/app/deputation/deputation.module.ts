import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DeputationRoutingModule } from '@app/deputation/deputation-routing.module';
import { DeputationComponent } from '@app/deputation/deputation.component';
import { DeputationService } from '@app/deputation/deputation.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
	FormsModule, 
    ReactiveFormsModule,
    DeputationRoutingModule
  ],
  declarations: [
    DeputationComponent
  ],
  providers:[
    DeputationService,
	AlertNotificationService
  ]
})
export class DeputationModule { }
