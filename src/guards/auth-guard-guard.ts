import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isLoggedIn =
    localStorage.getItem('auth') === 'true';

  const role =
    localStorage.getItem('role');

  if (
    isLoggedIn &&
    role === 'admin'
  ) {

    return true;
  }

  router.navigate(['/']);

  return false;
};
