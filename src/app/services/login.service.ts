import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApplicationConfig, inject, Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { SignInFormData } from '../Models/sign-in-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { signUpFormData } from '../Models/sign-up-data';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginForm = new BehaviorSubject<Boolean>(true);
  loginForm$ = this.loginForm.asObservable();
  constructor(private http: HttpClient) {}

  changeLoginFormSubject() {
    this.loginForm.next(!this.loginForm);
  }
  private baseUrl = environment.baseUrl;
  headerOption = new HttpHeaders({ 'Content-Type': 'Application/json' });

  signIn(signInFormData: SignInFormData): Observable<any> {
    let url: string;
    const { role, ...dataWithoutUserRole } = signInFormData;
    if (role.toLocaleLowerCase() === 'user') {
      url = `${this.baseUrl}/Auth/user-login/`;
    } else if (role.toLocaleLowerCase() === 'employee') {
      url = `${this.baseUrl}/Auth/employee-login/`;
    } else {
      url = `${this.baseUrl}/Auth/admin-login/`;
    }
    return this.http.post<any>(url, dataWithoutUserRole, {
      responseType: 'text' as 'json',
    });
  }
  signUp(signUpFormData: signUpFormData): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/Auth/user-registration`,
      signUpFormData
    );
  }
}
