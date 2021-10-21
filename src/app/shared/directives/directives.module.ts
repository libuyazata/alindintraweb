import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecimalNumberDirective } from './decimal-number.directive/decimal-number.directive';
import { NumbersOnlyDirective } from './number-only.directive/number-only.directive';
import { StringInputDirective } from './string-input/string-input';
// import { AllowUserDirective } from './permissions/permissions.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NumbersOnlyDirective,
    DecimalNumberDirective,
    StringInputDirective,
    // AllowUserDirective,
  ],
  exports: [
    NumbersOnlyDirective,
    DecimalNumberDirective,
    StringInputDirective,
    // AllowUserDirective,
  ],
})
export class DirectivesModule { }
