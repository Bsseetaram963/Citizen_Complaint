import { Component } from '@angular/core';
import { AddComplaintComponent } from '../complaint/add-complaint/add-complaint.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,AddComplaintComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
