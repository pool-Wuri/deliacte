import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglageListComponent } from './reglage-list.component';

describe('ReglageListComponent', () => {
  let component: ReglageListComponent;
  let fixture: ComponentFixture<ReglageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglageListComponent]
    });
    fixture = TestBed.createComponent(ReglageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
