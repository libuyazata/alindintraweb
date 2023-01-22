import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DocumenttypesRoutingModule } from './document-types-routing.module';
import { DocumenttypesComponent } from './document-types.component';
import { DocumenttypesService } from '@app/general-info/document-types/document-types.service';
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
    DocumenttypesRoutingModule,
	GeneralInfoMenuModule
  ],
  declarations: [
    DocumenttypesComponent
  ],
  providers:[
    DocumenttypesService,
	AlertNotificationService
  ]
})
export class DocumenttypesModule { }
