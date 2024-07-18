import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';

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
          <input id="password" type="password" formControlName="password">
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
export class RegisterComponent implements OnInit {
router = inject(Router);

  ngOnInit(): void {
      if(this.userService.isLoggedIn()){
        this.router.navigate(['transcripts'])
      }
  }

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
