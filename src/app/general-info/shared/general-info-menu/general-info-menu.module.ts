import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralInfoMenuComponent } from './general-info-menu.component';
import { GeneralInfoMenuService } from './general-info-menu.service';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    GeneralInfoMenuComponent
  ],
  providers: [
    GeneralInfoMenuService

  ],
  exports:[
    GeneralInfoMenuComponent
  ]
})

export class GeneralInfoMenuModule { }
