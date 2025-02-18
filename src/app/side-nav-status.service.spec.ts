import { TestBed } from '@angular/core/testing';

import { SideNavStatusService } from './side-nav-status.service';

describe('SideNavStatusService', () => {
  let service: SideNavStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
