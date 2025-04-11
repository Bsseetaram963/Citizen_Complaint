import { Component, inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info') {
    let panelClass = '';

    switch (type) {
      case 'success':
        panelClass = 'snack-bar-success';
        break;
      case 'error':
        panelClass = 'snack-bar-error';
        break;
      case 'info':
        panelClass = 'snack-bar-info';
        break;
    }

    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 900,
      panelClass: [panelClass], 
    });
  }
}
