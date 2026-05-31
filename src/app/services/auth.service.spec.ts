import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should create auth service', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if no token', () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalsy();
  });
});
