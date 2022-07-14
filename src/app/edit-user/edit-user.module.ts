import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular-6-datatable";

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { EditUserManagementService } from './edit-user.service';
import { DataFilterPipeModule } from '@app/shared/pipes/data-filter/data-filter-pipe.module';
import { CreateUserModule } from '@app/shared/components/create-user/create-user.module';
import { UserDocumentsModule } from '@app/shared/components/user-documents/user-docs.module';
import { UploadProfilepicModule } from '@app/shared/components/upload-profile-pic/upload-profile-pic.module';

//import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
//import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    //CoreModule,
    SharedModule,
    EditUserRoutingModule,
    CreateUserModule,
    UserDocumentsModule,
    NgbModule.forRoot(),
	UploadProfilepicModule,
    //MyDatePickerModule,
    //DataTableModule,
    //DataFilterPipeModule,
    //NgDatepickerModule,
    //NgbDatepicker,
    //ReactiveFormsModule,
  ],
  declarations: [
    EditUserComponent
  ],
  providers: [
    EditUserManagementService
  ]
})
export class EditUserModule { }
