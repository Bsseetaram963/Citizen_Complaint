import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);     
  const isAuthenticated = authService.isAuthenticated();   
  if(!isAuthenticated){
    localStorage.setItem('returnUrl',state.url);
    router.navigate(['/login']);
    return false;
  }
  const userClaim = authService.userClaims();
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  
  if(allowedRoles && !allowedRoles.includes(userClaim?.role || '')){
     router.navigate(['/unauthorized']);
     return false;
  }
  return true;
};
