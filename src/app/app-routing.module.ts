import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarparkListingsComponent } from './components/carpark-listings/carpark-listings.component';
import { CommonModule } from '@angular/common';
import { CarparkCitiesDataResolverService } from './services/carpark-cities-data-resolver.service';

const routes: Routes = [
  { path: '', 
    redirectTo: 'carpark-listings', 
    pathMatch: 'full' 
  },
  { path: 'carpark-listings', 
    component: CarparkListingsComponent,
    resolve: { carparkCityData: CarparkCitiesDataResolverService } 
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
