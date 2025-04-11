// src/app/services/complaint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.baseUrl;
  getWards(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ward/get-all-ward`); // Replace with your actual API endpoint
  }

  getComplaintTypes(departmentId: number): Observable<any> {
    const params = new HttpParams().set('departmentId', departmentId.toString());
    return this.http.get(`${this.baseUrl}/complaintType/get-all-complaint-type`, { params });
  }
  submitComplaint(addComplaintData : any) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/Complaint/add-complaint`,addComplaintData)
  } 
  getComplaints(){
    return this.http.get(`${this.baseUrl}/Complaint/get-all-complaints`);
  }
  approveComplaint(solveComplaint:any) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/Complaint/solve-complaint`,solveComplaint);
  }
} 
