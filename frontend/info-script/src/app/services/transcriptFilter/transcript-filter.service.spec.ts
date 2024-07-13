import { TestBed } from '@angular/core/testing';

import { TranscriptFilterService } from './transcript-filter.service';

describe('TranscriptFilterService', () => {
  let service: TranscriptFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
