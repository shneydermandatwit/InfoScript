import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let router = inject(Router);
  if(userService.isLoggedIn()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
