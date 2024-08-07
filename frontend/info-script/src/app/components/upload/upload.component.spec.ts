import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComponent],
      providers:[
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
