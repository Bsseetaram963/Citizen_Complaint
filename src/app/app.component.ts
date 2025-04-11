import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './nav/navbar.component';
import { CommonService } from './services/common.service';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NavbarComponent, SharedModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'first-demo';
  isAuthenticated: any;
  constructor(private authService: AuthService) {}
  toggleDrawer(drawer: any) {
    drawer.toggle();
  }
  ngOnInit(): void {
    this.authService.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }
}
