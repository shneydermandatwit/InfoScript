import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="applyForm" >
          <label for="email">
            Email
          </label>
          <input id="email" type="text" formControlName="email">
          <label for="password">
            Last Name
          </label>
          <input id="password" type="text" formControlName="password">
        <button type="submit" class="primary">Apply Now</button>
        </form>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

}
