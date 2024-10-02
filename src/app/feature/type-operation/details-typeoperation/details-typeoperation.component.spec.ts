import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeoperationComponent } from './details-typeoperation.component';

describe('DetailsTypeoperationComponent', () => {
  let component: DetailsTypeoperationComponent;
  let fixture: ComponentFixture<DetailsTypeoperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsTypeoperationComponent]
    });
    fixture = TestBed.createComponent(DetailsTypeoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
