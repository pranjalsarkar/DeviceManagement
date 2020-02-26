import { TestBed } from '@angular/core/testing';

import { DeviceFacadeService } from './device-facade.service';

describe('DeviceFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceFacadeService = TestBed.get(DeviceFacadeService);
    expect(service).toBeTruthy();
  });
});
