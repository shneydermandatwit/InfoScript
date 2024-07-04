import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../auth/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers:[
        provideHttpClient(withInterceptors([authInterceptor])),
        provideRouter(routes)

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
