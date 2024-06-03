import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav>
      <a [routerLink]="['']">
        <img
          class="logo"
          src="https://smb.ibsrv.net/imageresizer/image/blog_images/1200x1200/59846/176287/0044181001582748537.jpg"
        />
      </a>
      <div class="clickable">
          <a [routerLink]="['/upload']"> Upload </a>
      </div>
      <div class="account-options">
        @if(!isLoggedIn){
        <div class="clickable">
          <a [routerLink]="['/login']"> Login </a>
        </div>
        <div class="clickable">
          <a [routerLink]="['/register']"> Register </a>
        </div>
        }@else {
        <div class="clickable">
          <a [routerLink]="['']" (click)="logout()"> Logout </a>
        </div>
        }

       
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userService = inject(UserService);

  isLoggedIn = false;

  constructor() {
    this.userService.loggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.userService.logout();
    console.log('logout clicked');
  }
}
