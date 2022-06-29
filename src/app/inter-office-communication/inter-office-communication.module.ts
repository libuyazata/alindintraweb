import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { InterofficeCommunicationRoutingModule } from './inter-office-communication-routing.module';
import { InterofficeCommunicationComponent } from './inter-office-communication.component';
import { InterofficeCommunicationService } from '@app/inter-office-communication/inter-office-communication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    InterofficeCommunicationRoutingModule,
	SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
 ],
  declarations: [
    InterofficeCommunicationComponent
  ],
  providers:[
    InterofficeCommunicationService
  ]
})
export class InterofficeCommunicationModule { }
