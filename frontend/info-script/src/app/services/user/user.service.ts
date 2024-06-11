import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROOT } from '../../baseUrl';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$:Observable<boolean> = this.loggedInSubject.asObservable();
  httpClient = inject(HttpClient);
  router = inject(Router);
  constructor() { 
    const token: string | null = localStorage.getItem("token");
    if(token){
      this.loggedInSubject.next(true);
    }
  }

  login(email:string, password:string){
    console.log("login: ",email,password)
    this.httpClient.post(`${ROOT}/user/login`,{email:email, password:password}).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.loggedInSubject.next(true);
        localStorage.setItem('token',response.token)
        this.router.navigate(['/upload']);

      },
      error: (error) => {
        console.error('Login failed', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  register(email:string, displayName:string, password:string){
    console.log("register: ",email,displayName, password)
    this.httpClient.post(`${ROOT}/user/register`,{email:email, displayName:displayName, password:password}).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  logout(){
    this.loggedInSubject.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return this.loggedInSubject.getValue();
  }
}
