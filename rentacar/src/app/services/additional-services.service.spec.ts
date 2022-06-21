import { TestBed } from '@angular/core/testing';

import { AdditionalServicesService } from './additional-services.service';

describe('AdditionalServicesService', () => {
  let service: AdditionalServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
