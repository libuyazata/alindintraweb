import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { DataTableModule } from 'angular-6-datatable';
import { NotificationService } from '@app/notifications/notification.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NotificationRoutingModule,
    DataTableModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NotificationComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
