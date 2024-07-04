import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFormComponent } from './save-form.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';

describe('SaveFormComponent', () => {
  let component: SaveFormComponent;
  let fixture: ComponentFixture<SaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveFormComponent],
      providers:[
        provideHttpClient(withInterceptors([authInterceptor]))
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
