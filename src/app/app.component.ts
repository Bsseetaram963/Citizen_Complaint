import { ChangeDetectorRef, Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './nav/navbar.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from "./header/header.component";
import { ToasterComponent } from "./common/toaster/toaster.component";
import { ToastrService } from './services/toastr.service';
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
