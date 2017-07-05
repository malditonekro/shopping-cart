import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//Components
import { HomeComponent } from './components/home/home.component';
import { StationsComponent } from './components/stations/stations.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
//Services

@NgModule({
  declarations: [
    AppComponent,
    CartDetailsComponent,
    HomeComponent,
    StationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
