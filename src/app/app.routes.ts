import { Routes } from '@angular/router';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: '',     
    loadComponent:()=> import('./auth/login/login.component').then(m=>m.LoginComponent), 
  },
  {
    path:'login',
    loadComponent:()=> import('./auth/login/login.component').then(m=>m.LoginComponent)
  },
  {  
    path: 'dashboard',
    canActivate:[authGuard],
    loadComponent:()=> import('./dashboard/dashboard.component').then(m=>m.DashboardComponent)
  },
  {  
    path: 'addComplaint',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/complaint/add-complaint/add-complaint.component').then(m=>m.AddComplaintComponent)
  },
  {
    path: 'complaints',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/complaint/get-complaint/get-complaint.component').then(m=>m.GetComplaintComponent)
  },
  {
    path: 'departments',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/department/departments/departments.component').then(m=>m.DepartmentsComponent)
  },  
    {
    path: 'fill-complaint',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/complaint/add-complaint/add-complaint.component').then(m=>m.AddComplaintComponent)
  },
  {
    path: 'complaint-details/:complaintNo',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/complaint/get-complaint/complaint-details/complaint-details.component').then(m=>m.ComplaintDetailsComponent)
  },
  {
    path: 'wards',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/ward/wards/wards.component').then(m=>m.WardsComponent)
  },
  {
    path: 'complaintType',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/complaint-type/complaint-type.component').then(m=>m.ComplaintTypeComponent)
  },
  {
    path: 'profile',
    canActivate:[authGuard],
    loadComponent:()=> import('./common/profile/profile.component').then(m=>m.ProfileComponent)
  },
];

export class AppRoutingModule {}
