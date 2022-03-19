import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ChartModule } from 'angular-highcharts';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { WorkHomeRoutingModule } from './work-home-routing.module';
import { WorkHomeComponent } from './work-home.component';
import { WorkHomeService } from './work-home.service';
import { DictToKeyValModule } from '@app/shared/pipes/iter-dict/iter-dict-key-val-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    //CoreModule,
    SharedModule,
    WorkHomeRoutingModule,
    ChartModule,
    DictToKeyValModule,
  ],
  declarations: [
    WorkHomeComponent
  ],
  providers: [
    WorkHomeService
  ]
})
export class WorkHomeModule { }
