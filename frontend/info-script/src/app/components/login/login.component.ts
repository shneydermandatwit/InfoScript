import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `
  <section>
       <form [formGroup]="loginForm" (submit)="handleSubmit()">
          <label for="email">
            Email
          </label>
          <input id="email" type="text" formControlName="email">
          <label for="password">
            Password
          </label>
          <input id="password" type="text" formControlName="password">
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
export class LoginComponent {

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
