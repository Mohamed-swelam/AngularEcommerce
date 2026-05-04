import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const childGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn =
    localStorage.getItem('auth') === 'true';

  if (
    isLoggedIn
  ) {

    return true;
  }

  router.navigate(['/login']);

  return false;
};
