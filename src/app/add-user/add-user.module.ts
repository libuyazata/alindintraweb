import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyDatePickerModule } from 'mydatepicker';
import { DataTableModule } from "angular-6-datatable";

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { UserManagementService } from './add-user.service';
import { DataFilterPipeModule } from '@app/shared/pipes/data-filter/data-filter-pipe.module';
import { CreateUserModule } from '@app/shared/components/create-user/create-user.module';
import { UserDocumentsModule } from '@app/shared/components/user-documents/user-docs.module';

//import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
//import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    //CoreModule,
    SharedModule,
    AddUserRoutingModule,
    CreateUserModule,
    UserDocumentsModule,
    NgbModule.forRoot(),
    //MyDatePickerModule,
    //DataTableModule,
    //DataFilterPipeModule,
    //NgDatepickerModule,
    //NgbDatepicker,
    //ReactiveFormsModule,
  ],
  declarations: [
    AddUserComponent
  ],
  providers: [
    UserManagementService
  ]
})
export class AddUserModule { }
