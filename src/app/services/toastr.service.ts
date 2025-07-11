import { Injectable } from '@angular/core';
import { ToasterComponent } from '../common/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private toaster!: ToasterComponent;

  register(toaster: ToasterComponent) {
    this.toaster = toaster;
  }

  show(message: string) {
    this.toaster?.show(message);
  }
}
