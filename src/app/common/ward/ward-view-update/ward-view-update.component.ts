import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WardService } from '../../../shared/services/ward.service';
import { DepartmentService } from '../../../shared/services/department.service';
export interface DepartmentApiResponse {
  departmentId: number;
  departmentName: string;
}
export interface DepartmentData {
  values : DepartmentApiResponse[];
}
@Component({
  selector: 'app-ward-view-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ward-view-update.component.html',
  styleUrl: './ward-view-update.component.css'
})
export class WardViewUpdateComponent implements OnInit {   
   departmentData?: string[];
   depInWard! : any[];
   depShowForUpdate!:any[];
   departments!:any[];
   UpdateWardForm : FormGroup;
   originalDepData!:DepartmentApiResponse[];
   constructor(@Inject(MAT_DIALOG_DATA) public data:any,
   private matDialogRef : MatDialogRef<WardViewUpdateComponent>,
   private departmentService:DepartmentService,
   private wardService : WardService
  )
   {
    this.UpdateWardForm = new FormGroup({
          wardNumber : new FormControl('',[Validators.required]),
          wardName : new FormControl('',[Validators.required]),
    });
   }
   @ViewChild('availableDepartment') availableDepartment!: CdkDropList<any>;   
   ngOnInit(): void {
    this.UpdateWardForm.patchValue({
      wardNumber : this.data.ward.wardNumber,
      wardName : this.data.ward.wardName
      });
      console.log("departmentIds : ",this.data.ward.departmentIds);
     this.depInWard = this.data.ward.departmentIds.map((department: { id: number, name: string }) => department.name);
     console.log(" this.depInWard : ",this.depInWard)
     this.departmentService.getAllDepartments().subscribe(
      (data: DepartmentData) => {
        this.originalDepData = data.values.map(({ departmentId, departmentName }) => ({
          departmentId,
          departmentName,
        }));
        
        this.departmentData = this.originalDepData
          ?.map(department => department.departmentName) 
          .filter(departmentName => !this.depInWard.includes(departmentName));
        
        console.log("Filtered Department Data:", this.departmentData); 
        console.log("Original data : ", this.originalDepData)
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
   closeDialog(){
    console.log(this.data.ward.wardNumber);
    console.log(this.data.ward.wardName);
    this.matDialogRef.close();
   }
   UpdateWard(){   
    const departmentIds = this.availableDepartment.data.map((departmentName:string) => {      
      const department = this.originalDepData.find(dep => dep.departmentName === departmentName);          
      return department ? department.departmentId : null;
    });

     if(this.UpdateWardForm.valid){
        const formData = new FormData();
        formData.append('wardId',this.data.ward.wardId);
        formData.append('wardNumber',this.data.ward.wardNumber);
        formData.append('wardName',this.data.ward.wardName);
        departmentIds.forEach((value: number) => {
          formData.append('departmentIds', value.toString());  
        });    
               
     this.wardService.UpdateWard(formData).subscribe(
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
}
