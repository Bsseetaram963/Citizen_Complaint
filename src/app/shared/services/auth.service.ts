import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserClaims } from '../interfaces/user-claims';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();
  private userClaim: any; 
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    // console.log("Token  ====== ",token)
    try {
      const decodedToken: any = jwtDecode(token);
      this.userClaim = decodedToken;
      const expirationDate = decodedToken?.exp * 1000;
      const currentTime = Date.now();
      // console.log("IsAuthenticated called try block");
      return expirationDate > currentTime;
      
    } catch (error) {
      // console.log("IsAuthenticated called catch block");
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

  googleLogin(idToken: string) {
  return this.http.post(`${this.baseUrl}/auth/google-login`, {
    idToken: idToken
  });
}

}
