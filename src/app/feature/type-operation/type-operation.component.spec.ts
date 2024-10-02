import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOperationComponent } from './type-operation.component';

describe('TypeOperationComponent', () => {
  let component: TypeOperationComponent;
  let fixture: ComponentFixture<TypeOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOperationComponent]
    });
    fixture = TestBed.createComponent(TypeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
