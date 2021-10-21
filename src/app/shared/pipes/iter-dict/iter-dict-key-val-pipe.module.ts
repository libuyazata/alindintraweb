import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictToKeyVal } from '@app/shared/pipes/iter-dict/iter-dict-key-val.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DictToKeyVal
  ],
  exports:[
    DictToKeyVal
  ]
})
export class DictToKeyValModule { }