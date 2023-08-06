import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarparkDataService {

  baseURL: string = "https://api.data.gov.sg/v1/";

  constructor(private http: HttpClient) { }

  getCarparkData(): Observable<any> {
    let apiURL = this.baseURL + "/transport/carpark-availability";
    return this.http.get(apiURL);
  }  
}
