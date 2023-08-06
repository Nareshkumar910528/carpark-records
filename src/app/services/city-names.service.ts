import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityNamesService {

  baseURL: string = "https://countriesnow.space/api/v0.1/countries/cities/q?";

  constructor(private http: HttpClient) { }

  getCityNames(): Observable<any> {
    let apiURL = this.baseURL + "country=Singapore";
    return this.http.get(apiURL);
  }
}
