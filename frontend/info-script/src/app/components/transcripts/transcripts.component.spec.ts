import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptsComponent } from './transcripts.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';

describe('TranscriptsComponent', () => {
  let component: TranscriptsComponent;
  let fixture: ComponentFixture<TranscriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptsComponent],
      providers:[
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
