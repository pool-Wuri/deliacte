import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationsComponent } from './administrations.component';

describe('AdministrationsComponent', () => {
  let component: AdministrationsComponent;
  let fixture: ComponentFixture<AdministrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationsComponent]
    });
    fixture = TestBed.createComponent(AdministrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
