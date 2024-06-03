import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$:Observable<boolean> = this.loggedInSubject.asObservable();
  httpClient = inject(HttpClient);
  constructor() { 
  }

  login(email:string, password:string){
    console.log("login: ",email,password)
    this.httpClient.post("https://ratemywit-gbxs.onrender.com/user/login",{email:email, password:password}).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.loggedInSubject.next(true);
        localStorage.setItem('token',response.token)
        console.log(localStorage.getItem('token'))
      },
      error: (error) => {
        console.error('Login failed', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  register(email:string, password:string){
    console.log("register: ",email,password)
  }

  logout(){
    this.loggedInSubject.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return this.loggedInSubject.getValue();
  }
}
