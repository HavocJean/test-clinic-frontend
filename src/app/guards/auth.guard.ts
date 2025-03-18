import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID); 
  const isBrowser = isPlatformBrowser(platformId); 
  const router = inject(Router);

  if (isBrowser) {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};