import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';

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
  updateDepartment(updateDepartmentModel:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    console.log("Update ward Service : ",updateDepartmentModel);
    return this.http.put<any>(`${this.baseUrl}/Department/update-department`,updateDepartmentModel); 
  }
  deleteDepartment(departmentId:any):Observable<any>{        
    const params = new HttpParams().set("departmentId",departmentId);        
    return this.http.delete<any>(`${this.baseUrl}/Department/remove-department`,{params});
  }
}
