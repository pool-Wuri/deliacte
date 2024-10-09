import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurePublishedComponent } from './procedure-published.component';

describe('ProcedurePublishedComponent', () => {
  let component: ProcedurePublishedComponent;
  let fixture: ComponentFixture<ProcedurePublishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedurePublishedComponent]
    });
    fixture = TestBed.createComponent(ProcedurePublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
