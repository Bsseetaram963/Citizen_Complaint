import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddComplaintComponent } from './complaint/add-complaint/add-complaint.component';
import { GetComplaintComponent } from './complaint/get-complaint/get-complaint.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentsComponent } from './department/departments/departments.component';
import { ComplaintDetailsComponent } from './complaint/get-complaint/complaint-details/complaint-details.component';
import { WardsComponent } from './ward/wards/wards.component';
import { ComplaintTypeComponent } from './complaint-type/complaint-type.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fill-complaint', component: AddComplaintComponent },
  { path: 'complaints', component: GetComplaintComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'search', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addComplaint', component: AddComplaintComponent },
  { path: 'complaints', component: GetComplaintComponent },
  { path:'complaint-details/:complaintNo',component:ComplaintDetailsComponent,},
  { path:'wards',component:WardsComponent,},
  { path:'complaintType',component:ComplaintTypeComponent},
  { path:'profile',component:ProfileComponent}
];

export class AppRoutingModule {}
