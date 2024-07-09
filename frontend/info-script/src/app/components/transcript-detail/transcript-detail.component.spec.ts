import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptDetailComponent } from './transcript-detail.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';

describe('TranscriptDetailComponent', () => {
  let component: TranscriptDetailComponent;
  let fixture: ComponentFixture<TranscriptDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptDetailComponent],
      providers:[
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
