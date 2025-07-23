import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ButtonCellRendererComponent } from '../common/complaint/get-complaint/buttonCellRenderer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ButtonCellRendererComponent,
    CdkDropListGroup, CdkDropList, CdkDrag
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ButtonCellRendererComponent,
    CdkDropListGroup, CdkDropList, CdkDrag
  ],
})
export class SharedModule {}
