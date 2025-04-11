import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { WardService } from '../../services/ward.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DepartViewUpdateComponent } from '../../common/depart-view-update/depart-view-update.component';
import { WardViewUpdateComponent } from '../../common/ward-view-update/ward-view-update.component';

export interface WardApiResponse{
  wardId:number;
  wardNumber :number;
  wardName :string;
}
export interface WardData{
  values:WardApiResponse[];
}

@Component({
  selector: 'app-wards',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './wards.component.html',
  styleUrl: './wards.component.css'
})
export class WardsComponent implements AfterViewInit, OnInit {
   displayedColumns :string[] = ['wardNumber','wardName','actions'];
   dataSource : MatTableDataSource<WardApiResponse>;
   wardDataForAgGrid?: WardApiResponse[];
   wardData!:any[];
    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    @ViewChild(MatSort) sort: MatSort | null = null;

   constructor(private wardService:WardService,private matDialog:MatDialog){
    this.dataSource = new MatTableDataSource<WardApiResponse>([]);
   }
   ngOnInit(): void {
    this.getAllWardData();
   }
   getAllWardData(){
    this.wardService.getAllWards().subscribe(
      (data: WardData) => {
              this.wardData = data.values;
              this.wardDataForAgGrid = data.values.map(({ wardId, wardNumber, wardName }) => ({
                wardId,
                wardNumber,
                wardName,                
              }));             
              this.dataSource = new MatTableDataSource(this.wardDataForAgGrid);
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
    applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
   
       if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
       }
     }
     view(row: WardApiResponse) {
      const dialogRef = this.matDialog.open(WardViewUpdateComponent,{
        width:'700px',
        height:'600px',
        data: {
          ward:this.wardData.find((ward)=>(ward.wardId == row.wardId)),          
          isUpdateMode:false
        },
      });      
     }
   
     update(row: WardApiResponse) {      
       const dialogRef = this.matDialog.open(WardViewUpdateComponent,{
        width:'800px',
        disableClose:true,
        height:'550px',
        data: {
          ward:this.wardData.find((ward)=>(ward.wardId == row.wardId)),          
          isUpdateMode:true
        }
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result !== undefined && result){
          this.getAllWardData();          
        }
      });
     }
   
     delete(row: WardApiResponse) {
       console.log('Delete clicked for', row);
     }
}
