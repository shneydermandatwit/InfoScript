import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav>
      <a [routerLink]="['']">
        <img class="logo" src="https://smb.ibsrv.net/imageresizer/image/blog_images/1200x1200/59846/176287/0044181001582748537.jpg">
      </a>
      <div class="account-options">
           <div>
           <a [routerLink]="['/login']">

            Login
            </a>

          </div>
          <div>
          <a [routerLink]="['']">

            Logout
            </a>

          </div>
          <div>
          <a [routerLink]="['/register']">

          Register
          </a>

        </div>
        
        
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
