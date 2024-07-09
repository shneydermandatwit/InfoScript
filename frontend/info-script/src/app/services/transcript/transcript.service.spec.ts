import { TestBed } from '@angular/core/testing';

import { TranscriptService } from './transcript.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';
describe('TranscriptService', () => {
  let service: TranscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    });
    service = TestBed.inject(TranscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
