import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  template: `
    <section>
       <form [formGroup]="registerForm" (submit)="handleSubmit()">
          <label for="email">
            Email
          </label>
          <input id="email" type="text" formControlName="email">
          <label for="displayName">
            Display Name
          </label>
          <input id="displayName" type="text" formControlName="displayName">
          <label for="password">
            Password
          </label>
          <input id="password" type="text" formControlName="password">
        <button type="submit" class="primary">Register</button>
        <br>
        <a [routerLink]="['/login']">

          Already have an account?
</a>
        </form>
  </section>
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl('')
  })

  userService = inject(UserService);
  handleSubmit(){
    this.userService.register(
      this.registerForm.value.email ?? '',
      this.registerForm.value.displayName ?? '',
      this.registerForm.value.password ?? ''
    )
  }
}
