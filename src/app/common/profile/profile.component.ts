import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import moment from 'moment'; 
import { provideMomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDDD MMMM YYYY',
  },
};
export interface User{
  id : number,
  name: string
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule,NgOptimizedImage],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  readonly date = new FormControl(moment());

  users: User[] =[{id: 0, name: 'Sarah'}, {id: 1, name: 'Amy'}, {id: 2, name: 'Rachel'}, {id: 3, name: 'Jessica'}, {id: 4, name: 'Poornima'}]
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
