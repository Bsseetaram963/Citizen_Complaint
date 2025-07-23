import { ChangeDetectorRef, Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from './layout/nav/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthService } from './shared/services/auth.service';
import { ToastrService } from './shared/services/toastr.service';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NavbarComponent, SharedModule, LoaderComponent, HeaderComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'first-demo';
  isAuthenticated: any;
  showFiller = false;
  @ViewChild('toaster') toaster!: ToasterComponent;
  constructor(private authService: AuthService,
    private cdr: ChangeDetectorRef,private toastrService: ToastrService 
  ) {}

  ngAfterViewInit(): void {
    this.toastrService.register(this.toaster);
  }
  toggleDrawer(drawer: any) {
    drawer.toggle();
  }
  ngOnInit(): void {
    this.authService.authStatus$.subscribe((value) => {
      this.isAuthenticated = value;
      this.cdr.detectChanges();
    });
  }
}
