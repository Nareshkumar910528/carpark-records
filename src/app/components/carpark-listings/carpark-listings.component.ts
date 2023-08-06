import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-carpark-listings',
  templateUrl: './carpark-listings.component.html',
  styleUrls: ['./carpark-listings.component.css'],
})

export class CarparkListingsComponent implements OnInit {
  carparkDetails: any = [];
  columnsToBeDisplayed : string[] = ['carpark_number', 'location', 'lots_available', 'total_lots'];
  dataSource = new MatTableDataSource(this.carparkDetails);
  dataSourceWithObjectColumn = new MatSort();

  @ViewChild('carparkPaginator') carparkPaginator: MatPaginator;
  @ViewChild('carparkDataToBeSort') carparkDataToBeSort = new MatSort();

  carparkNumberFilter = new FormControl('');
  carparkLocation = new FormControl('');
  filterValues = {
    carpark_number: '',
    location: '',
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.retrieveCarparkData();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.carparkDetails);
    this.dataSource.paginator = this.carparkPaginator;
    this.dataSource.sort = this.carparkDataToBeSort;
    this.dataSource.filterPredicate = this.createFilter();
    this.carparkNumberFilter.valueChanges.subscribe(
      carpark_number => {
        this.filterValues.carpark_number = carpark_number;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
    this.carparkLocation.valueChanges.subscribe(
      location => {
        this.filterValues.location = location;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
  }

  retrieveCarparkData() {
    this.activatedRoute.data.subscribe((records: any) => {
      records.carparkCityData[0].items[0].carpark_data.splice(30, records.carparkCityData[0].items[0].carpark_data.length);
      let data = records.carparkCityData[0].items[0].carpark_data.filter((data: any) => {
        return data.carpark_info.length === 1;
      });
      let carparkInfo = {      
        infoArray: data.map((info: any) => {
          info.carpark_info[0].lots_available = parseInt(info.carpark_info[0].lots_available);
          info.carpark_info[0].total_lots = parseInt(info.carpark_info[0].total_lots);
          return info.carpark_info[0]; 
        })
      }
      for (let index=0; index<carparkInfo.infoArray.length; index++) {
        carparkInfo.infoArray[index].carpark_number = data[index].carpark_number;
        carparkInfo.infoArray[index].location = records.carparkCityData[1].data[index];
      }
      this.carparkDetails = carparkInfo.infoArray;
      console.log('carparkDetails: ', this.carparkDetails);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.carpark_number.toLowerCase().indexOf(searchTerms.carpark_number) !== -1 
      && data.location.toString().toLowerCase().indexOf(searchTerms.location) !== -1
    }
    return filterFunction;
  }
}