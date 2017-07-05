import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StationsComponent } from './components/stations/stations.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stations/:id', component: StationsComponent },
  { path: 'details', component: CartDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}