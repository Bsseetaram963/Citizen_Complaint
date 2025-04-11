import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserClaims } from '../Models/user-claims';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();
  private userClaim: any;

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    try {
      const decodedToken: any = jwtDecode(token);
      this.userClaim = decodedToken;
      const expirationDate = decodedToken?.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      return expirationDate > currentTime;
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
  }

  userClaims(): UserClaims | null {
    // Check if userClaim exists
    if (!this.userClaim) {
      return null;
    }

    // Return an object with the properties that match the UserClaims interface
    const user: UserClaims = {
      email:
        this.userClaim[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      id: Number(this.userClaim['Id']),
      role: this.userClaim['LoginType'], 
    };

    return user;
  }
}
