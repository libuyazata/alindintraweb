import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationComponent } from './deputation.component';

describe('DeputationComponent', () => {
  let component: DeputationComponent;
  let fixture: ComponentFixture<DeputationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
