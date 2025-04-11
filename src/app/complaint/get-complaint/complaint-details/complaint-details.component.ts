import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../services/auth.service';
import { UserClaims } from '../../../Models/user-claims';

@Component({
  selector: 'app-complaint-details',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.css',
})
export class ComplaintDetailsComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ComplaintDetailsComponent>,
    ) {
    console.log(this.data);
  }
  

  close(){
    this.dialogRef.close();
  }
}
  