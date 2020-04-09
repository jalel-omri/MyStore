import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from './customer.service';

describe('AdminService', () => {
  let service: CustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
