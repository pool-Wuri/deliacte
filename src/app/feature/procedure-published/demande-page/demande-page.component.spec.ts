import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePageComponent } from './demande-page.component';

describe('DemandePageComponent', () => {
  let component: DemandePageComponent;
  let fixture: ComponentFixture<DemandePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandePageComponent]
    });
    fixture = TestBed.createComponent(DemandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
