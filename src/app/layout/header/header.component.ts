import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit, TemplateRef } from '@angular/core';
import { _asThemeImpl } from 'ag-grid-community';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{
    @Input() drawer! : MatDrawer
    title = 'first-demo';
    cr_route:string = "" ;
    isAuthenticated: any;
    currentMenuName: string = 'Dashboard'; // default
    routeTitleMap:{[key:string]:string} = {
      '/dashboard': 'Dashboard',
      '/fill-complaint': 'Fill Complaint',
      '/complaints': 'Complaints',
      '/departments': 'Departments',
      '/search': 'Search',
      '/login': 'Login',
      '/addComplaint': 'Add Complaint',
      '/wards': 'Wards',
      '/complaintType': 'Complaint Type',
      '/profile':'Profile'
    };

    constructor(private authService: AuthService,private router:Router) {}
    toggleDrawer() {
      this.drawer.toggle();
    }
    ngOnInit(): void {
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Remove query params/fragments
        const urlPath = event.urlAfterRedirects.split('?')[0].split('#')[0];

        // Match exact or start of path (for dynamic routes)
        const matchedPath = Object.keys(this.routeTitleMap).find(path =>
          urlPath.startsWith(path)
        );

        this.currentMenuName = this.routeTitleMap[matchedPath || ''] || 'Citizen Complaint';
      });
      this.cr_route = this.router.url;
      console.log("current route : ",this.cr_route);
      this.authService.authStatus.subscribe((value) => {
        this.isAuthenticated = value;
      });
    }
}
