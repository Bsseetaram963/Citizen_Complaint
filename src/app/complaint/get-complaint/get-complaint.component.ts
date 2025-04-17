import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ButtonCellRendererComponent } from './buttonCellRenderer.component';

import {
  AllCommunityModule,
  ColDef,
  GridOptions,
  ModuleRegistry,
} from 'ag-grid-community';
import { ComplaintData } from '../../Models/get-complaint-data';
import { ComplaintService } from '../../services/complaint-service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { AuthService } from '../../services/auth.service';
import { UserClaims } from '../../Models/user-claims';
import { commonPopupComponent } from '../../common/common-popup/common-popup.component';
import { SolveComplaintPopupComponent } from './solve-complaint-popup/solve-complaint-popup.component';

ModuleRegistry.registerModules([AllCommunityModule]);
interface SelectedData {
  message: string;
  btnType: string;
  complaintId: number;
}
@Component({
  selector: 'app-get-complaint',
  standalone: true,
  imports: [AgGridAngular, FormsModule, CommonModule, AgGridModule,SharedModule],
  templateUrl: './get-complaint.component.html',
  providers: [DatePipe],
})

export class GetComplaintComponent implements OnInit {
  rowData!: ComplaintData[];
  user:UserClaims|null = null;
  constructor(private datePipe:DatePipe,private complaintService: ComplaintService,private matDialog:MatDialog,private authService:AuthService) {}

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    context: {
      componentParent: this, 
    },
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  ngOnInit(): void {
    this.user = this.authService.userClaims();
    this.getComplaints();
  }
     getComplaints(){
      this.complaintService.getComplaints().subscribe({
        next: (data: any) => {
          this.rowData = data.values.map((complaint: any) => ({               
            complaintID: complaint.id,     
            complaintNo: complaint.complaintNo,
            userName: complaint.user?.name,
            department: complaint.department?.name,
            ward: complaint.ward?.name,
            employee:complaint.employee?.name,
            seniorEmployee:complaint.employeeL2,
            hod:complaint.employeeL3,
            complaintType:complaint.complaintType?.name,
            assingLevel:complaint.assignEmployeeLevel,
            recomplaintDescription1:complaint.recomplaintDescription1,
            recomplaintDescription2:complaint.recomplaintDescription2,
            recomplaintCount:complaint.recomplaintCount,
            complaintRaised:this.datePipe.transform(complaint.raisedDate, 'dd/MMM/yy'),
            escalateDate:this.datePipe.transform(complaint.escalateAt,'dd/MM/yyyy'),
            completionDate:this.datePipe.transform(complaint.completionDate,'dd/MM/yyyy'),
            address: complaint.address,
            description: complaint.description,
            status: complaint.status ? 'Approved' : 'Pending',
          }));
        },
        error: (err) => {
          console.error('Error fetching complaints', err);
        },
      });
     }
    columnDefs: ColDef[] = [   
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: ButtonCellRendererComponent,
        width:150,       
      },  
      {
        field: 'complaintID',          
        hide: true,           
        suppressNavigable: true
      },    
      { field: 'complaintNo' },
      { field: 'status' },
      { field: 'userName' },   
      { field: 'department', filter: 'agNumberColumnFilter' },
      { field: 'ward' },
      { field: 'address' },
      { field: 'description', filter: 'agNumberColumnFilter' },
    
    ];
  defaultColDef: ColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  };
  // rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
  //   mode: 'multiRow',
  //   headerCheckbox: false,
  // };
  paginationPageSize = 14;
  paginationPageSizeSelector: number[] | boolean = [15, 25, 40, 60];

  onSelectionChanged(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    const complaintNos = selectedRows.map((row: any) => row.complaintNo); 
  }
  onViewClick(complaintNo: string): void { 
    const selectedComplaint = this.rowData.find((complaint)=>complaint.complaintNo == complaintNo)
    this.matDialog.open(ComplaintDetailsComponent,{
      width: '1000px',
      height: '700px',
      // disableClose: true,
      data: selectedComplaint      
    });
  }
  onApproveClick(complaintId: number): void {
    
    const selectedData:SelectedData =  {
      message:"Are you want to approve.",  
      btnType: "Approve",
      complaintId : complaintId
    };
    
    const dialogRef = this.matDialog.open(SolveComplaintPopupComponent,{
      width: '800px',     
      disableClose:true,
      data: selectedData
    })
     debugger;
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {
        this.getComplaints();
      }
    });
  }
}


const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
