import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintTypeService } from '../services/complaint-type.service';
import { DepartmentService } from '../services/department.service';
import { DepartmentData } from '../department/departments/departments.component';
import { DepartmentApiResponse } from '../common/ward-view-update/ward-view-update.component';

export interface ComplaintTypeModel {
  Id:number,
  name :string,
  escalationTimeL1:number,
  escalationTimeL2:number,
  escalationTimeL3:number
}
export interface DepartmentModel {
  departmentId: number;
  departmentName: string;
}
export interface DepartmentDataModel {
  values : DepartmentApiResponse[];
}
@Component({
  selector: 'app-complaint-type',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './complaint-type.component.html',
  styleUrl: './complaint-type.component.css'
})

export class ComplaintTypeComponent implements OnInit{
   displayedColumns :string[] = ['name','escalationTimeL1','escalationTimeL2','escalationTimeL3','actions'];
   dataSource : MatTableDataSource<ComplaintTypeModel>;
   complaintTypes !: ComplaintTypeModel[];
   allDepartment!: DepartmentModel[];
    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    @ViewChild(MatSort) sort: MatSort | null = null;

   constructor(private complaintTypeService :ComplaintTypeService,private departmentService: DepartmentService,private matDialog:MatDialog){
    this.dataSource = new MatTableDataSource<ComplaintTypeModel>([]);
   }
   ngOnInit(): void {
      this.getAllDepartment();
   }
   getAllDepartment(){
      this.departmentService.getAllDepartments().subscribe(
        (data: DepartmentDataModel) => {
          this.allDepartment = data.values.map(({ departmentId, departmentName }) => ({
            departmentId,
            departmentName,
          }));
          console.log("All Department : ",this.allDepartment)         
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

   getAllComplaintType(departmentId :number| undefined){    
    this.complaintTypeService.getAllComplaintType(departmentId).subscribe(
      (data: any) => {
              console.log("ComplaintType Data : ",data);              
              this.complaintTypes = data.values              
              this.dataSource = new MatTableDataSource(this.complaintTypes);
            },
            (error) => {
              console.error('Error:', error);
            }
     ); 
   }
   ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
   }
   applyFilter(value: string): void {
     var searchDepatment = this.allDepartment.find(item=>item.departmentName.toUpperCase()===value.toUpperCase());  
     console.log(searchDepatment);
     searchDepatment!=undefined && searchDepatment.departmentId!=0 &&  this.getAllComplaintType(searchDepatment?.departmentId);
  }
    // applyFilter(event: Event) {
    //    const filterValue = (event.target as HTMLInputElement).value;
    //    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    //    if (this.dataSource.paginator) {
    //      this.dataSource.paginator.firstPage();
    //    }
    //  }
     view(row: ComplaintTypeModel) {
      // const dialogRef = this.matDialog.open(WardViewUpdateComponent,{
      //   width:'700px',
      //   height:'600px',
      //   data: {
      //     ward:this.wardData.find((ward)=>(ward.wardId == row.wardId)),          
      //     isUpdateMode:false
      //   },
      // });      
     }
   
     update(row: ComplaintTypeModel) {      
      //  const dialogRef = this.matDialog.open(WardViewUpdateComponent,{
      //   width:'800px',
      //   disableClose:true,
      //   height:'550px',
      //   data: {
      //     ward:this.wardData.find((ward)=>(ward.wardId == row.wardId)),          
      //     isUpdateMode:true
      //   }
      // });
      // dialogRef.afterClosed().subscribe(result=>{
      //   if(result !== undefined && result){
      //     this.getAllWardData();          
      //   }
      // });
     }
   
     deleteWard(row: ComplaintTypeModel) {
      // console.log("row for delte :",row);
      // const dialogRef = this.matDialog.open(DeleteCommonComponent,{
      //   width:"400px",
      //   data: {wardId :row.wardId,btnType:"delete"}       
      // });
      // dialogRef.componentInstance.parentCompent.subscribe(() => {
      //   this.getAllWardData(); 
      //   dialogRef.close();
      // });
      //  console.log('Delete clicked for', row);
     }
}
