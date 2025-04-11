import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isNavDrawer = new BehaviorSubject<boolean>(true);
  isNavDrawer$ = this.isNavDrawer.asObservable();

  constructor() {}

  setDrawerState(state: boolean) {
    this.isNavDrawer.next(state);
  }
}
