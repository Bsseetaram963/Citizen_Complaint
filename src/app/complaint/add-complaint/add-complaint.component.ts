import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgModel,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ComplaintService } from '../../services/complaint-service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../services/toastr.service';
import { Route, Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { FileWithPreview } from '../../Models/FilePreview';
@Component({
  selector: 'add-complaint',
  templateUrl: './add-complaint.component.html',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./add-complaint.component.css'],
})
export class AddComplaintComponent implements OnInit {
  complaintForm: FormGroup;
  wards: any[] = [];
  departments: any[] = [];
  complaintTypes: any[] = [];
  FileWithPreviews: FileWithPreview[] = [];

  
  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.complaintForm = new FormGroup({
      wardId: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required]),
      complaintTypeId: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      address: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.complaintService.getWards().subscribe(
      (data) => {
        this.wards = data.values;
      },
      (err) => {
        console.error('Error occurred while fetching wards:', err);
      }
    );
  }
  
  
  onWardChange(event: any) {
    this.departments =
    this.wards.find((x) => x.wardId == event.value)?.departmentIds ||
    [];
  }
  
  onDepartmentChange(department: any) {
    this.complaintService
    .getComplaintTypes(department.value)
    .subscribe((data) => {
      this.complaintTypes = data.values;
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
  submitComplaint(): void {
    if (this.complaintForm.valid) {
      const formData = new FormData();
      formData.append('wardId', this.complaintForm.value.wardId);
      formData.append('departmentId', this.complaintForm.value.departmentId);
      formData.append(
        'complaintTypeId',
        this.complaintForm.value.complaintTypeId
      );
      formData.append('description', this.complaintForm.value.description);
      formData.append('address', this.complaintForm.value.address);

      this.FileWithPreviews.forEach((fileWithPreview) => {
        formData.append(
          'attachmentList',
          fileWithPreview.file,
          fileWithPreview.file.name
        );
      });

      this.complaintService.submitComplaint(formData).subscribe(
        (res) => {     
          this.complaintForm.reset();
          this.router.navigate(['addComplaint']);
        },
        (err) => {
          console.error('Error submitting complaint', err);
        }
      );
    }
  }
}
