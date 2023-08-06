import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CityNamesService } from './city-names.service';
import { CarparkDataService } from './carpark-data.service';

@Injectable({
  providedIn: 'root'
})
export class CarparkCitiesDataResolverService {

  constructor(private carparkDataService: CarparkDataService, private cityNamesService: CityNamesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('calling getCarparkData() & getCityNames() by using forkJoin operator in resolver --> ', route);
    return forkJoin([
      this.carparkDataService.getCarparkData(),
      this.cityNamesService.getCityNames().pipe(
        catchError(error => {
        console.log('resolve method return error as follow --> ', error);
        return of('No data available at the moment');
      }))
    ]);
  }
}
