import { TestBed } from '@angular/core/testing';

import { PreinscriptionService } from './preinscription.service';

describe('PreinscriptionService', () => {
  let service: PreinscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreinscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
