import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getUserName } from '../utils/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private platformId = inject(PLATFORM_ID);

  isLoggedIn = signal(false);
  userName = signal('');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn.set(true);
        this.userName.set(getUserName(token));
      }
      else {
        this.isLoggedIn.set(false);
        this.userName.set('');
      }
    }
  }

  setLoginState(status: boolean): void {
    this.isLoggedIn.set(status);
  }

  clearState(): void {
    this.isLoggedIn.set(false);
    this.userName.set('');
  }
}
