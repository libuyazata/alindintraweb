import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralInfoMenuComponent } from './general-info-menu.component';
import { GeneralInfoMenuService } from './general-info-menu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
	FormsModule, 
	ReactiveFormsModule,
  ],
  declarations: [
    GeneralInfoMenuComponent
  ],
  providers: [
    GeneralInfoMenuService,
	AlertNotificationService

  ],
  exports:[
    GeneralInfoMenuComponent
  ]
})

export class GeneralInfoMenuModule { }
