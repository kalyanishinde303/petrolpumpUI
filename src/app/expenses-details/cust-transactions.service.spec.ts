import { TestBed } from '@angular/core/testing';

import { CustTransactionsService } from './cust-transactions.service';

describe('CustTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustTransactionsService = TestBed.get(CustTransactionsService);
    expect(service).toBeTruthy();
  });
});
