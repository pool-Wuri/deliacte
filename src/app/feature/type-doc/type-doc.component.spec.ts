import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocComponent } from './type-doc.component';

describe('TypeDocComponent', () => {
  let component: TypeDocComponent;
  let fixture: ComponentFixture<TypeDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDocComponent]
    });
    fixture = TestBed.createComponent(TypeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
