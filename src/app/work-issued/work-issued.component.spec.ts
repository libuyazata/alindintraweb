import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkissuedComponent } from './work-issued.component';

describe('WorkissuedComponent', () => {
  let component: WorkissuedComponent;
  let fixture: ComponentFixture<WorkissuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkissuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkissuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
