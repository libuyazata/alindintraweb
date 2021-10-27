import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkDocumentRoutingModule } from './work-document-routing.module';
import { WorkDocumentComponent } from './work-document.component';
import { WorkDocumentService } from '@app/general-info/work-document/work-document.service';
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
    WorkDocumentRoutingModule,
	GeneralInfoMenuModule
  ],
  declarations: [
    WorkDocumentComponent
  ],
  providers:[
    WorkDocumentService,
	AlertNotificationService
  ]
})
export class WorkDocumentModule { }
