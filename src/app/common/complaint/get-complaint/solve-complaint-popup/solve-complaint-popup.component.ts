import { CommonModule, formatDate } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComplaintService } from '../../../../shared/services/complaint-service';
import { FileWithPreview } from '../../../../shared/interfaces/FilePreview';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-solve-complaint-popup',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './solve-complaint-popup.component.html',
  styleUrl: './solve-complaint-popup.component.css'
})
export class SolveComplaintPopupComponent {
  FileWithPreviews: FileWithPreview[] = [];
    complaintForm: FormGroup;
 constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      private matDialogref:MatDialogRef<SolveComplaintPopupComponent>,
      private complaintService: ComplaintService,
      private router:Router
    ){
      this.complaintForm = new FormGroup({               
        file: new FormControl('', [Validators.required]),
      });
    }

  

 @ViewChild('fileInput') fileInput?: ElementRef;
  onClickFileInputButton(): void {
    this.fileInput?.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files = this.fileInput?.nativeElement.files as FileList; 
    if (files && files.length > 0) {

      Array.from(files).forEach((file: File) => {
        const fileWithPreview: FileWithPreview = {
          file: file,
          preview: null,
        };

        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            fileWithPreview.preview = e.target.result;
            this.FileWithPreviews.push(fileWithPreview);
          };

          reader.readAsDataURL(file); 
        } else {
          this.FileWithPreviews.push(fileWithPreview);
        }
      });
    }
  }
  removeImage(index:number){
    if(index<this.FileWithPreviews.length && index >= 0 ){
      this.FileWithPreviews.splice(index,1);
    }
  }
  solveComplaint(): void {
  
    if (this.complaintForm.valid) {
      const formData = new FormData();
      
      if (this.data && this.data.complaintId != null) {
        formData.append('id', this.data.complaintId);
      } else {
        console.error('complaintId is not defined');
        return; 
      }
  
      this.FileWithPreviews.forEach((fileWithPreview) => {
        formData.append('attachmentList', fileWithPreview.file, fileWithPreview.file.name );
      });
      this.complaintService.approveComplaint(formData).subscribe(
        (res) => {
          this.complaintForm.reset();          
          this.matDialogref.close(true);
        },
        (err) => {
          console.error('Error submitting complaint', err);
        }
      );
    }
  }
  
   closeDialog(){
    this.matDialogref.close();
   }
}
