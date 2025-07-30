import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { messageResponse } from '../../shared/interfaces/response';
import { LoginService } from '../../shared/services/login.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../enviroment/enviroment';

interface CredentialResponse {
  credential: string;
  select_by: string;
  clientId: string;
}

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
    //   window.google.accounts.id.initialize({
    //   client_id: '529116575556-qjbcvjr5hamcik1883fv22r9h6r6ulgi.apps.googleusercontent.com',
    //   callback: this.handleCredentialResponse.bind(this)
    // });

    // window.google.accounts.id.renderButton(
    //   document.getElementById('google-btn'),      
    //   { theme: 'outline', size: 'large' }
    // );

    // window.google.accounts.id.prompt();
  };
  

//  handleCredentialResponse(response: CredentialResponse) {
//      const token = response.credential; 
 
//      fetch(`${environment.baseUrl}/auth/google-login`, {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json'
//        },
//        body: JSON.stringify({ idToken: token })
//      })
//     .then(res => res.json()) // Parse JSON from the response
//     .then(data => {
//        console.log("this token ===================== : ", data); 
//         var isValid: boolean = false;
//         this.tokenObject = data; 
//         if (this.tokenObject != null && this.tokenObject != '') {
//           isValid = true;
//           localStorage.setItem('token', this.tokenObject);       
//         }      
//         if (isValid) {      
//           this.authService.authStatus.next(true);
//           this.router.navigate(['dashboard']);
//           // this.toastrService.success('Logged in successfully.');
//         } else {
//           // this.toastrService.error('Login failed. Invalid credentials.');
//         }
//       })
//       .catch(error => {     
//          this.router.navigate(['login']);    
//          console.log("error=====") 
//       });
//   }   
 
//  signOut(): void {
//    this.user = null;
//    window.google.accounts.id.disableAutoSelect();
//  }

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
      return;1
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
