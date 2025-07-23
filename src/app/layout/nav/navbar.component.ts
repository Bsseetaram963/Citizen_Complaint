// app.component.ts
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { MenuItemService } from '../../shared/services/menu-service.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [SharedModule],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() drawer!:MatDrawer
  isLoginForm: any;
  isAuthenticated: boolean;
  userClaim!: any;
  user: any;
  userRole = { role: 'User' }; // Replace with your auth service result
  menuItems: any[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToastrService,
    private menuService : MenuItemService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userClaim = this.authService.userClaims;
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }  

  ngOnInit(): void {
    this.user = this.authService.userClaims();
    const allItems = this.menuService.getMenuItems();
    this.menuItems = allItems.filter(item => item.roles.includes(this.user.role));
    console.log("role : ",this.user.role);
    console.log("menuItems : ",this.menuItems );
 }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.drawer.toggle();
    this.router.navigate(['login']);
    // this.toasterService.openCustomToast('Logged out successfully.');
  }
  closeSidenav() {}
}
