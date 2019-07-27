import { TestBed } from '@angular/core/testing';

import { AutoGuardService } from './auto-guard.service';

describe('AutoGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoGuardService = TestBed.get(AutoGuardService);
    expect(service).toBeTruthy();
  });
});
