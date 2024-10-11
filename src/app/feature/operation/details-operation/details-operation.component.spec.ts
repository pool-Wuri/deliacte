import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationComponent } from './details-operation.component';

describe('DetailsOperationComponent', () => {
  let component: DetailsOperationComponent;
  let fixture: ComponentFixture<DetailsOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsOperationComponent]
    });
    fixture = TestBed.createComponent(DetailsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
