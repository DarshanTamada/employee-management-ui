import { jwtDecode } from 'jwt-decode';

export function getDecodedToken(token: string): any {

  try {
    return jwtDecode(token);
  }
  catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function getUserRole(token: string): string {
  const decoded: any = jwtDecode(token);
  return decoded?.role || 'No Role';
}

export function getUserName(token: string): string {
  const decoded: any = jwtDecode(token);
  return decoded?.name || decoded?.unique_name || 'No Name';
}

export function getUserEmail(token: string): string {
  const decoded: any = jwtDecode(token);
  return decoded?.email || decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || 'No Email';
}
