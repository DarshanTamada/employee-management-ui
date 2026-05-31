import { describe, expect, it, vi } from 'vitest';
import { getUserName, getUserRole, getUserEmail } from './auth.utils';

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({
    name: 'darshan',
      role: 'Admin',
        email: 'darshan@example.com'
  })
}));


describe('Auth Utils', () => {

  it('should return user name', () => {

    expect(getUserName('dummy-token')).toBe('darshan');
  });

  it('should return user role', () => {
    expect(getUserRole('dummy-token')).toBe('Admin');
  });

  it('should return user email', () => {
    expect(getUserEmail('dummy-token')).toBe('darshan@example.com');
  });
});
