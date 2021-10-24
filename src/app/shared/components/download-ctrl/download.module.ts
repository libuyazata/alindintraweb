import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DownloadService } from './download.service';
import { DownloadComponent } from './download.component';
import { NgxSpinnerModule } from "ngx-spinner"; 

@NgModule({
  imports: [
    CommonModule,
    TranslateModule, 
    NgxSpinnerModule ,  
  ],
  declarations: [
    DownloadComponent
  ],
  providers: [
    DownloadService
  ],
  exports:[
    DownloadComponent
  ]
})
export class DownloadReportModule { }
