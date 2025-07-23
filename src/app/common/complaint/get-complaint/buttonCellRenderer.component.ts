import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AuthService } from '../../../shared/services/auth.service';
import { UserClaims } from '../../../shared/interfaces/user-claims';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-button-cell-renderer',
  standalone:true,
  imports: [CommonModule], 
  templateUrl : './buttonCellRenderer.component.html', 
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp,OnInit {
  params: any;
  complaintNo!:string;
  user:UserClaims|null = null;
  constructor(private authService:AuthService){

  }
ngOnInit(): void {
  this.user = this.authService.userClaims();
}
  agInit(params: any): void {
    this.params = params;
  }

  onViewClick() {
    if (this.params.context.componentParent) {
      this.params.context.componentParent.onViewClick(this.params.data.complaintNo);
    } else {
      console.error('componentParent is undefined');
    }
  }

  onApproveClick() {
     if (this.params.context.componentParent) {    
      console.log("params --",this.params.data);
      this.params.context.componentParent.onApproveClick(this.params.data.complaintID);
    } else {
      console.error('componentParent is undefined');
    }
  }
  isEmployee(): boolean {
    return this.user?.role === 'Employee'; // Check if the user is an employee
  }
  refresh(): boolean {
    return false;
  }
}
