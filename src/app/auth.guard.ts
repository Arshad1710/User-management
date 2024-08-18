import { inject } from '@angular/core';
import { CanActivateFn,  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
const router = inject(Router);
const expectedRole = route.data['role'] as string;
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
if (user && user.role === expectedRole) {
  if (state.url === '/login') {
    router.navigate(['home']); 
    return false;
  }
  return true;
} else {
  router.navigate(['login']);
  return false;
}
}

