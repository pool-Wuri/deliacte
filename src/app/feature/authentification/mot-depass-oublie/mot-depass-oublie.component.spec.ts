import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotDepassOublieComponent } from './mot-depass-oublie.component';

describe('MotDepassOublieComponent', () => {
  let component: MotDepassOublieComponent;
  let fixture: ComponentFixture<MotDepassOublieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotDepassOublieComponent]
    });
    fixture = TestBed.createComponent(MotDepassOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
