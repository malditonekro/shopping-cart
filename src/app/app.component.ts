import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { ShopService } from './services/shop.service';
import { StationService } from './services/station.service';

@Component({
  selector: 'snuuper-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ 
    ShopService,
    StationService
   ]
})

export class AppComponent implements OnInit{

  stations:any;
  constructor(
    private _title:Title, 
    private _shopSrvc:ShopService,
    private _stationSrvc: StationService
    ){}

  ngOnInit(){
    this._title.setTitle('Snuuper App');
    this.getAllStations();
    console.log('Application Component Loaded Successfully ...');
  }

  getAllStations(){
    this._stationSrvc.getAllStations()
      .subscribe(
        data =>{
          if(data.success){
            this.stations = data.data.stations;
          }
          console.log(this.stations);
        },err => {
          console.log('Error when retrieving all the stations: ',err);
        }
      );
  }

}
