import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteListComponent } from './entite-list.component';

describe('EntiteListComponent', () => {
  let component: EntiteListComponent;
  let fixture: ComponentFixture<EntiteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntiteListComponent]
    });
    fixture = TestBed.createComponent(EntiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
