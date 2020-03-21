import { TestBed } from '@angular/core/testing';

import { CroppService } from './cropp.service';

describe('CroppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CroppService = TestBed.get(CroppService);
    expect(service).toBeTruthy();
  });
});
