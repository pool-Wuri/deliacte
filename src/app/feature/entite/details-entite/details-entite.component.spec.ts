import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEntiteComponent } from './details-entite.component';

describe('DetailsEntiteComponent', () => {
  let component: DetailsEntiteComponent;
  let fixture: ComponentFixture<DetailsEntiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsEntiteComponent]
    });
    fixture = TestBed.createComponent(DetailsEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
