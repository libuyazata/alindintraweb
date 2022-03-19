import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { WorkHomeComponent } from './work-home.component';
import { WorkHomeService } from './work-home.service';

describe('WorkHomeComponent', () => {
  let component: WorkHomeComponent;
  let fixture: ComponentFixture<WorkHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          // CoreModule,
          SharedModule,
          HttpClientTestingModule
        ],
        declarations: [WorkHomeComponent],
        providers: [WorkHomeService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
