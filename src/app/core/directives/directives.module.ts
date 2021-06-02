import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordDirective } from '@app/core/directives/showhide-password.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShowHidePasswordDirective
  ],
  exports:[    
    ShowHidePasswordDirective
  ]
})
export class AppDirectivesModule { }