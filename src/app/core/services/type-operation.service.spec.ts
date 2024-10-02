import { TestBed } from '@angular/core/testing';

import { TypeOperationService } from './type-operation.service';

describe('TypeOperationService', () => {
  let service: TypeOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
