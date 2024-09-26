import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDashboardComponent } from './liste-dashboard.component';

describe('ListeDashboardComponent', () => {
  let component: ListeDashboardComponent;
  let fixture: ComponentFixture<ListeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDashboardComponent]
    });
    fixture = TestBed.createComponent(ListeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
