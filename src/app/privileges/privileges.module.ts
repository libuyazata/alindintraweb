import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PrivilegesRoutingModule } from '@app/privileges/privileges-routing.module';
import { PrivilegesComponent } from '@app/privileges/privileges.component';
import { PrivilegesService } from '@app/privileges/privileges.service';
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
    PrivilegesRoutingModule
  ],
  declarations: [
    PrivilegesComponent
  ],
  providers:[
    PrivilegesService,
	AlertNotificationService
  ]
})
export class PrivilegesModule { }
