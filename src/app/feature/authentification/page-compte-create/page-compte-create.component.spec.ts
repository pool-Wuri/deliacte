import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCompteCreateComponent } from './page-compte-create.component';

describe('PageCompteCreateComponent', () => {
  let component: PageCompteCreateComponent;
  let fixture: ComponentFixture<PageCompteCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCompteCreateComponent]
    });
    fixture = TestBed.createComponent(PageCompteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
