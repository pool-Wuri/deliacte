import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocTypeComponent } from './list-doc-type.component';

describe('ListDocTypeComponent', () => {
  let component: ListDocTypeComponent;
  let fixture: ComponentFixture<ListDocTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocTypeComponent]
    });
    fixture = TestBed.createComponent(ListDocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
