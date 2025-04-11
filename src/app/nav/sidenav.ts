import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav | undefined;

  // Method to set the sidenav reference
  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  // Method to toggle the sidenav (opens/closes it)
  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  // Method to close the sidenav
  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
