import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-toaster',
  imports: [SharedModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent {
  message = '';
  isVisible = false;
  private timeout: any;

  constructor(private ngZone: NgZone) {}

  show(message: string) {
    this.ngZone.run(() => {
      this.message = message;
      this.isVisible = true;
      console.log("Toast Component called show method ", message, this.isVisible);

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        console.log("called setTimeout");
        this.isVisible = false;
      }, 3000); // 3 seconds
    });
  }
}
