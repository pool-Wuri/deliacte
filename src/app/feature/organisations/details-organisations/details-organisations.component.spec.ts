import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrganisationsComponent } from './details-organisations.component';

describe('DetailsOrganisationsComponent', () => {
  let component: DetailsOrganisationsComponent;
  let fixture: ComponentFixture<DetailsOrganisationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsOrganisationsComponent]
    });
    fixture = TestBed.createComponent(DetailsOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
