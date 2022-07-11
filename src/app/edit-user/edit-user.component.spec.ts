import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EditUserComponent } from './edit-user.component';
import { EditUserManagementService } from './edit-user.service';

describe('UserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          //CoreModule,
          SharedModule,
          HttpClientTestingModule
        ],
        declarations: [AddUserComponent],
        providers: [EditUserManagementService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
