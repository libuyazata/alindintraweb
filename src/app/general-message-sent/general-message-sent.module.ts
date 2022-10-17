import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { GeneralmessagesentRoutingModule } from './general-message-sent-routing.module';
import { GeneralmessagesentComponent } from './general-message-sent.component';
import { GeneralmessagesentService } from '@app/general-message-sent/general-message-sent.service';
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
    GeneralmessagesentRoutingModule,
	SharedModule,
	CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
 ],
  declarations: [
    GeneralmessagesentComponent
  ],
  providers:[
    GeneralmessagesentService
  ]
})
export class GeneralmessagesentModule { }
