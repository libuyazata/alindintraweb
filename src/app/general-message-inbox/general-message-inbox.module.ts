import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { GeneralmessageinboxRoutingModule } from './general-message-inbox-routing.module';
import { GeneralmessageinboxComponent } from './general-message-inbox.component';
import { GeneralmessageinboxService } from '@app/general-message-inbox/general-message-inbox.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    GeneralmessageinboxRoutingModule,
	SharedModule,
	CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
 ],
  declarations: [
    GeneralmessageinboxComponent
  ],
  providers:[
    GeneralmessageinboxService
  ]
})
export class GeneralmessageinboxModule { }
