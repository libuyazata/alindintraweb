import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { MonthViewModule } from './components/month-view/month-view.module';
import { UserProjectAllocationModule } from '@app/shared/components/user-project-allocation/user-project-allocation.module';
import { UploadProfilepicModule } from '@app/shared/components/upload-profile-pic/upload-profile-pic.module';
import { DirectivesModule } from './directives/directives.module';
import { AllowUserDirective } from './directives/permissions/permissions.directive';

@NgModule({
  imports: [
    CommonModule,
    MonthViewModule,
    UserProjectAllocationModule,
	UploadProfilepicModule,
    DirectivesModule,
  ],
  declarations: [
    LoaderComponent,
    AllowUserDirective,
  ],
  exports: [
    LoaderComponent,
    AllowUserDirective,
  ]
})
export class SharedModule { }
