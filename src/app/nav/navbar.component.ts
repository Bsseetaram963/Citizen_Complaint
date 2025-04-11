// app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from '../services/toastr.service';
import { SharedModule } from '../shared/shared.module';
import { UserClaims } from '../Models/user-claims';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [SharedModule],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isLoginForm: any;
  isAuthenticated: boolean;
  userClaim!: any;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToastrService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userClaim = this.authService.userClaims;
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }
  ngOnInit(): void {
    this.user = this.authService.userClaims();
  }
  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['login']);
    this.toasterService.openSnackBar('Logged out successfully.');
  }
  closeSidenav() {}
}
