import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { ShopService } from './services/shop.service';

@Component({
  selector: 'snuuper-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ShopService ]
})

export class AppComponent implements OnInit{

  stations:any;
  constructor(
    private _title:Title, 
    private _shopSrvc:ShopService
    ){}

  ngOnInit(){
    this._title.setTitle('Snuuper App');
    this.getAllStations();
    console.log('Application Component Loaded Successfully ...');
  }

  getAllStations(){
    this._shopSrvc.getAllStations()
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
