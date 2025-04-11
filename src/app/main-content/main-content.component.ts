import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  user = {
    company: '',
    submissionDate: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
  };

  states = [{ abbrev: 'NY' }, { abbrev: 'CA' }, { abbrev: 'TX' }];

  constructor(private fb: FormBuilder) {}

  closeSidenav() {}
  toggleSidenav() {}
  onSubmit() {}
}
