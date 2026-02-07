import { TestBed } from '@angular/core/testing';

import { MonetService } from './monet.service';

describe('MonetService', () => {
  let service: MonetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
