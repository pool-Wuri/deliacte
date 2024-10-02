import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeOperationComponent } from './list-type-operation.component';

describe('ListTypeOperationComponent', () => {
  let component: ListTypeOperationComponent;
  let fixture: ComponentFixture<ListTypeOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTypeOperationComponent]
    });
    fixture = TestBed.createComponent(ListTypeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
