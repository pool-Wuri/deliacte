import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSuiviComponent } from './dossier-suivi.component';

describe('DossierSuiviComponent', () => {
  let component: DossierSuiviComponent;
  let fixture: ComponentFixture<DossierSuiviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DossierSuiviComponent]
    });
    fixture = TestBed.createComponent(DossierSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
