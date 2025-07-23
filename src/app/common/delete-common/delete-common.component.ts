import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { commonPopupComponent } from '../common-popup/common-popup.component';
import { Router } from '@angular/router';
import { WardService } from '../../shared/services/ward.service';
import { DepartmentService } from '../../shared/services/department.service';

@Component({
  selector: 'app-delete-common',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './delete-common.component.html',
  styleUrl: './delete-common.component.css'
})
export class DeleteCommonComponent {
  @Output() parentCompent  = new EventEmitter();
 constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      private matDialogref:MatDialogRef<commonPopupComponent>,
      private wardService: WardService,
      private router:Router,
      private departmentService: DepartmentService
    ){}

    deleteThing(){
     if(this.data.wardId!=null){
      console.log("delte things for ward");
      this.wardService.deleteWard(this.data.wardId).subscribe(
        (res)=>{              
              this.parentCompent.emit();
        },
        (error)=>{
           console.error(error);
        }
       );
     } 
     if(this.data.departmentId != null ){
      this.departmentService.deleteDepartment(this.data.departmentId).subscribe(
        (result)=>{
           this.matDialogref.close(true);
        },
        (error)=>{
          console.error(error)
        }
      );      
     }
   }
   closeDialog(){
    this.matDialogref.close();
   }
}
