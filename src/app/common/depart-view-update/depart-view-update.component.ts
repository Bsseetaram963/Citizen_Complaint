import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WardViewUpdateComponent } from '../ward-view-update/ward-view-update.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { WardService } from '../../services/ward.service';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


export interface wardApiResponse{
  wardId:number;
  wardNumber :number;
  wardName :string;
}
export interface WardData{
  values:wardApiResponse[];
}

@Component({
  selector: 'app-depart-view-update',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './depart-view-update.component.html',
  styleUrl: './depart-view-update.component.css'
})
export class DepartViewUpdateComponent {
   wardData?: string[];
   wardInDep! : any[];
   wardShowForUpdate!:any[];
   wards!:any[];
   UpdateDepartmentForm : FormGroup;
   originalWardData!:wardApiResponse[];
   constructor(@Inject(MAT_DIALOG_DATA) public data:any,
   private matDialogRef : MatDialogRef<WardViewUpdateComponent>,
   private departmentService:DepartmentService,
   private wardService : WardService
  )  
   {
    this.UpdateDepartmentForm = new FormGroup({
          departmentId : new FormControl('',[Validators.required]),
          departmentName : new FormControl('',[Validators.required]),
    });
   }
   @ViewChild('availableDepartment') availableDepartment!: CdkDropList<any>;   
   ngOnInit(): void {
    console.log("PATCHVALUE : =  ",this.data);
    this.UpdateDepartmentForm.patchValue({      
      departmentId : this.data.department.departmentId,
      departmentName : this.data.department.departmentName
      });
      console.log("wardInDep : ",this.data.department,this.data);
     this.wardInDep = this.data.department.wardIds.map((ward: { id: number, wardNumber:number, name: string }) => ward.name);
     this.wardService.getAllWards().subscribe(
      (data: WardData) => {
        this.originalWardData = data.values.map(({ wardId,wardNumber, wardName }) => ({
          wardId,
          wardNumber,
          wardName,
        }));
        
        this.wardData = this.originalWardData
          ?.map(ward => ward.wardName) 
          .filter(wardName => !this.wardInDep.includes(wardName));
        
        console.log("Filtered Department Data:", this.wardData); 
        console.log("Original data : ", this.originalWardData)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
   }
 
   drop(event: CdkDragDrop<string[]>) {
     if (event.previousContainer === event.container) {

       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     } else {
       transferArrayItem(
         event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex,
       );
     }
     console.log('available drag-and-drop', this.availableDepartment);
   }
  
   updateWard(){   
    const wardIds = this.availableDepartment.data.map((wardName:string) => {      
      const ward = this.originalWardData.find(dep => dep.wardName === wardName);          
      return ward ? ward.wardId : null;
    });

     if(this.UpdateDepartmentForm.valid){
        const formData = new FormData();
        formData.append('departmentId',this.data.department.departmentId);
        formData.append('departmentName',this.data.department.departmentName);
        wardIds.forEach((value: number) => {
          formData.append('wardIds', value.toString());  
        });    
               
     this.departmentService.updateDepartment(formData).subscribe(
      (res)=>{      
        this.matDialogRef.close(true);  
      },
      (error)=>{
        console.error("Update call error : ",error);
      }
     );
   }
   else{
    console.log("form invalid");
   }
  }

  closeDialog(){
    this.matDialogRef.close();
   }
}
