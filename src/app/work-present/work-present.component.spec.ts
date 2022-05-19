import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpresentComponent } from './work-present.component';

describe('WorkpresentComponent', () => {
  let component: WorkpresentComponent;
  let fixture: ComponentFixture<WorkpresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
