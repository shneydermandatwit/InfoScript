import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
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
          src="InfoScriptLogo.png"
        />
      </a>
      <div class="name">
        InfoScript
        </div>
      
      <div class="account-options">
        <div class="clickable">
          <a> About </a>
          </div>
        @if(!isLoggedIn){
          
        <div class="clickable">
          <a [routerLink]="['/login']"> Login </a>
        </div>
        <div class="clickable">
          <a [routerLink]="['/register']"> Register </a>
        </div>
        }@else {
          <div class="clickable">
          <a [routerLink]="['/upload']"> Upload </a>
      </div>
      <div class="clickable">
          <a [routerLink]="['/transcripts']"> Transcripts </a>
      </div>
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
