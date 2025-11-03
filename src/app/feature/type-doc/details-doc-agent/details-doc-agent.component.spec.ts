import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDocAgentComponent } from './details-doc-agent.component';

describe('DetailsDocAgentComponent', () => {
  let component: DetailsDocAgentComponent;
  let fixture: ComponentFixture<DetailsDocAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDocAgentComponent]
    });
    fixture = TestBed.createComponent(DetailsDocAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
