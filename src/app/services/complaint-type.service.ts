import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintTypeService {
  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getAllComplaintType(departmentId:number|undefined){
    const params = new HttpParams().set("departmentId",departmentId || 0)
     return this.http.get<any>(`${this.baseURL}/ComplaintType/get-all-complaint-type`,{params})
  }
}
