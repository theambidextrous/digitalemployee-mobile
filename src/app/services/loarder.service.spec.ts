import { TestBed } from '@angular/core/testing';

import { LoarderService } from './loarder.service';

describe('LoarderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoarderService = TestBed.get(LoarderService);
    expect(service).toBeTruthy();
  });
});
