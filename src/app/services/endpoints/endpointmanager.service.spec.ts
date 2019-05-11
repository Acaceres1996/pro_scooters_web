import { TestBed } from '@angular/core/testing';

import { EndpointmanagerService } from './endpointmanager.service';

describe('EndpointmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndpointmanagerService = TestBed.get(EndpointmanagerService);
    expect(service).toBeTruthy();
  });
});
