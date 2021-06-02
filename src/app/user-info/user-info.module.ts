import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { ViewUserModule } from '@app/shared/components/view-user/view-user.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    UserInfoRoutingModule,
    ViewUserModule,
  ],
  declarations: [
    UserInfoComponent
  ]
})
export class UserInfoModule { }
