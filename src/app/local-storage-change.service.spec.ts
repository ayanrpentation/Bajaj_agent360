import { TestBed } from '@angular/core/testing';

import { LocalStorageChangeService } from './local-storage-change.service';

describe('LocalStorageChangeService', () => {
  let service: LocalStorageChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
