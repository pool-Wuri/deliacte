import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcedurePublishedComponent } from './list-procedure-published.component';

describe('ListProcedurePublishedComponent', () => {
  let component: ListProcedurePublishedComponent;
  let fixture: ComponentFixture<ListProcedurePublishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProcedurePublishedComponent]
    });
    fixture = TestBed.createComponent(ListProcedurePublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
