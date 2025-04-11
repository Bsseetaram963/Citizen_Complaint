import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComplaintService } from '../../services/complaint-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-popup',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './common-popup.component.html',
  styleUrl: './common-popup.component.css'
})
export class commonPopupComponent{
    constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      private matDialogref:MatDialogRef<commonPopupComponent>,
      private complaintService: ComplaintService,
      private router:Router
    ){}

   approveComplaint(){
     this.complaintService.approveComplaint(this.data.complaintId).subscribe(
      (res)=>{
             this.router.navigate(["complaints"]);
      }
     );
     
   }
   closeDialog(){
    this.matDialogref.close();
   }
}
