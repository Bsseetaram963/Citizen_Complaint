import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../../services/department.service';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { DepartViewUpdateComponent } from '../../common/depart-view-update/depart-view-update.component';
import { DeleteCommonComponent } from '../../common/delete-common/delete-common.component';
import { WardApiResponse } from '../../ward/wards/wards.component';

export interface DepartmentApiResponse {
  departmentId: number;
  departmentName: string;
}
export interface DepartmentData {
  values : DepartmentApiResponse[];
}
@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  imports: [SharedModule],
})
export class DepartmentsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['departmentId', 'departmentName', 'actions'];
  dataSource: MatTableDataSource<DepartmentApiResponse>;
  departmentData!: DepartmentApiResponse[];
  departmentDataForAgGrid?: DepartmentApiResponse[];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private departmentService: DepartmentService,private matDialog:MatDialog) {
    this.dataSource = new MatTableDataSource<DepartmentApiResponse>([]);
  }

  ngOnInit(): void {
    this.getAllDepartment();
  }
  getAllDepartment(){
    this.departmentService.getAllDepartments().subscribe(
      (data: DepartmentData) => {
        this.departmentData = data.values;
        this.departmentDataForAgGrid = data.values.map(({ departmentId, departmentName }) => ({
          departmentId,
          departmentName,
        }));
        console.log("department Data : ",this.departmentData);
        this.dataSource = new MatTableDataSource(this.departmentData);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  view(row: DepartmentApiResponse) {
    console.log("row : ",row);
    const dialogRef = this.matDialog.open(DepartViewUpdateComponent,{
           width:'700px',
           height:'600px',
           data: {
            department:this.departmentData.find((department)=>(department.departmentId == row.departmentId)),          
             isUpdateMode:false
           },
         }); 
  }

  update(row: DepartmentApiResponse) {
      const dialogRef = this.matDialog.open(DepartViewUpdateComponent,{
                        width:'800px',
                        disableClose:true,
                        height:'550px',
                        data: {
                        department:this.departmentData.find((department)=>(department.departmentId == row.departmentId)),          
                          isUpdateMode:true
                        }
                   });
    dialogRef.afterClosed().subscribe(result=>{
      if(result !== undefined && result){
        this.getAllDepartment();          
        dialogRef.close();
      }
    }); 
  }

  delete(row: DepartmentApiResponse) {
        const dialogRef = this.matDialog.open(DeleteCommonComponent,{
        width:"400px",
        data: {departmentId :row.departmentId,btnType:"delete"}       
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.getAllDepartment();
        dialogRef.close();
      })
      console.log('Delete clicked for', row);
    }
}
