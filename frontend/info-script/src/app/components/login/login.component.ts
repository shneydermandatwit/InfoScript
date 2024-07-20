import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `
  <section>
       <form [formGroup]="loginForm" (submit)="handleSubmit()">
        <h1> InfoScript Login </h1>
          <label for="email">
            Email
          </label>
          <input id="email" type="text" formControlName="email">
          <label for="password">
            Password
          </label>
          <input id="password" type="password" formControlName="password">
        <button type="submit" class="primary">Login</button>
        <br>

        <a [routerLink]="['/register']">

          Don't have an account?
</a>
        </form>
        
  </section>
    
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  router = inject(Router);

  ngOnInit(): void {
      if(this.userService.isLoggedIn()){
        this.router.navigate(['transcripts'])
      }
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  userService:UserService = inject(UserService);

  handleSubmit(){
    this.userService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? ''
    )
  }

}
