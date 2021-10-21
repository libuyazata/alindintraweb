import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFilterPipeModule } from '@app/shared/pipes/data-filter/data-filter-pipe.module';
import { LeaveStatusFormatModule } from '@app/shared/pipes/leave-status/leave-status-pipe.module';
import { ConvertSizeInBytesPipeModule } from '@app/shared/pipes/convert-bytes/convert-bytes-pipe.module';
import { DictToKeyValModule } from '@app/shared/pipes/iter-dict/iter-dict-key-val-pipe.module';


@NgModule({
  imports: [
    CommonModule,
    DataFilterPipeModule,
    LeaveStatusFormatModule,
    ConvertSizeInBytesPipeModule,
    DictToKeyValModule
  ],
  declarations: [
  ],
  exports:[
          
  ]
})
export class PipesModule { }
