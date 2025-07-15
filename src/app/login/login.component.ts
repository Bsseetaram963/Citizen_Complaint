import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { messageResponse } from '../Models/response';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  tokenObject: any;
  isLoginForm: any;
  response!: messageResponse;
  constructor(    
    private logInSignUpService: LoginService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });

    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    console.log(" login inti");
    this.authService.authStatus.next(false);
    localStorage.clear();
    this.signInForm.reset();
    this.signUpForm.reset();
    this.logInSignUpService.loginForm.subscribe((value) => {
      this.isLoginForm = value;
    });
  }

  toggleForm() {
    this.logInSignUpService.loginForm.next(!this.isLoginForm);
    this.logInSignUpService.loginForm.subscribe((value) => {
      this.isLoginForm = value;
    });
  }
  isTouched(): boolean {
    return (
      this.signInForm.controls['email'].touched &&
      this.signInForm.controls['password'].touched
    );
  }
  async signIn() {
    if (this.signInForm.invalid || !this.isTouched()) {
      return;
    }
    var isValid: boolean = false;

    this.logInSignUpService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        this.tokenObject = res;
        if (this.tokenObject != null && this.tokenObject != '') {
          isValid = true;
          localStorage.setItem('token', this.tokenObject);
        }
        if (isValid) {
          this.signInForm.reset();
          this.authService.authStatus.next(true);
          this.router.navigate(['dashboard']);          
          this.toastrService.show('Logged out successfully.');
        } else {
          console.log('Invalid credentials');
        }
      },
      error: (err) => {
        let errorMessage = JSON.parse(err.error);
         this.toastrService.show(errorMessage.Message);
        this.router.navigate(['login']);
      },
    });
  }
  async signUp() {
    this.logInSignUpService.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
        this.signInForm.reset();
        this.toastrService.show(res.message);
      },
      error: (err) => {
        this.router.navigate(['login']);
        // this.toastrService.openCustomToast(err.error?.Message);
      },
    });
  }
}
