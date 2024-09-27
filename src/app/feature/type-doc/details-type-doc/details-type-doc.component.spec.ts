import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeDocComponent } from './details-type-doc.component';

describe('DetailsTypeDocComponent', () => {
  let component: DetailsTypeDocComponent;
  let fixture: ComponentFixture<DetailsTypeDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsTypeDocComponent]
    });
    fixture = TestBed.createComponent(DetailsTypeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
