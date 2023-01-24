import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumenttypesComponent } from './document-types.component';

describe('DocumenttypesComponent', () => {
  let component: DocumenttypesComponent;
  let fixture: ComponentFixture<DocumenttypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumenttypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumenttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
