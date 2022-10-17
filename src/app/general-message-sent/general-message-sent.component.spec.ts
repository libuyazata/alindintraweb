import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterofficeCommunicationComponent } from './inter-office-communication.component';

describe('InterofficeCommunicationComponent', () => {
  let component: InterofficeCommunicationComponent;
  let fixture: ComponentFixture<InterofficeCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [InterofficeCommunicationComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterofficeCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
