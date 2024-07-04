import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
