import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WardService {
  private baseUrl = environment.baseUrl;
 
  constructor(private http : HttpClient) { }

  getAllWards(){
    return this.http.get<any>(`${this.baseUrl}/Ward/get-all-ward`);
  }
  UpdateWard(updateWardDto:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Ensure this header is set
    });
    console.log("Update ward Service : ",updateWardDto);
    return this.http.put<any>(`${this.baseUrl}/Ward/update-ward`,updateWardDto); 
  }
}
