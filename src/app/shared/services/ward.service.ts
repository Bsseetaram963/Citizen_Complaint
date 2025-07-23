import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

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
      'Content-Type': 'application/json'  
    });
    console.log("Update ward Service : ",updateWardDto);
    return this.http.put<any>(`${this.baseUrl}/Ward/update-ward`,updateWardDto); 
  }
  deleteWard(wardId:any):Observable<any>{  
    const params = new HttpParams().set("wardId",wardId);        
    return this.http.delete<any>(`${this.baseUrl}/Ward/remove-ward`,{params});
  }
}
