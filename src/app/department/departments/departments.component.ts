import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../../services/department.service';
import { SharedModule } from '../../shared/shared.module';

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
  departmentData?: DepartmentApiResponse[];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private departmentService: DepartmentService) {
    this.dataSource = new MatTableDataSource<DepartmentApiResponse>([]);
  }

  ngOnInit(): void {
    this.getDepartment();
  }
  getDepartment(){
    this.departmentService.getAllDepartments().subscribe(
      (data: DepartmentData) => {
        this.departmentData = data.values.map(({ departmentId, departmentName }) => ({
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
    console.log('View clicked for', row);
  }

  update(row: DepartmentApiResponse) {
    console.log('Update clicked for', row);
  }

  delete(row: DepartmentApiResponse) {
    console.log('Delete clicked for', row);
  }
}
