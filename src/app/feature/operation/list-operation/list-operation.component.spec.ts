import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperationComponent } from './list-operation.component';

describe('ListOperationComponent', () => {
  let component: ListOperationComponent;
  let fixture: ComponentFixture<ListOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOperationComponent]
    });
    fixture = TestBed.createComponent(ListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
