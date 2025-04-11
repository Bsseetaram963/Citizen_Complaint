import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = environment.baseUrl;
  headerOption = new HttpHeaders({ 'Content-Type': 'Application/json' });

  constructor(private http: HttpClient) {}
  getAllDepartments() {
    return this.http.get<any>(`${this.baseUrl}/Department/get-all-department`);
  }
  getDepartmentById() {
    return this.http.get<any[]>(
      `${this.baseUrl}/Department/get-department-by-id`
    );
  }
  // addDepartment() {
  //   return this.http.post(`${this.baseUrl}/Department/add-department`);
  // }

  // updateDepartment() {
  //   return this.http.put(`${this.baseUrl}/Department/update-department`);
  // }

  deleteDepartment() {
    return this.http.delete(`${this.baseUrl}/Department/remove-department`);
  }
}
