import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { ShopService } from './services/shop.service';
import { CartService } from './services/cart.service';
import { StationService } from './services/station.service';

@Component({
  selector: 'snuuper-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ 
    CartService,
    ShopService,
    StationService
   ]
})

export class AppComponent implements OnInit{

  stations:any;
  private alertStrong:string='';
  private alertMessage:string='';
  private alertType:string='';

  constructor(
    private _cartSrvc:CartService,
    private _shopSrvc:ShopService,
    private _stationSrvc: StationService,
    private _title:Title
    ){}

  ngOnInit(){
    this._title.setTitle('Snuuper App');
    this.getAllStations();
    this.getCartVigencyStatus();
  }

  getAllStations(){
    this._stationSrvc.getAllStations()
      .subscribe(
        data =>{
          if(data.success){
            this.stations = data.data.stations;
          }
        },err => {
          console.log('Error when retrieving all the stations: ',err);
        }
      );
  }

  getCartVigencyStatus(){
        //this._cartSrvc.getCartVigencyStatus();
        let response = this._cartSrvc.getCartVigencyStatus();
        if(!response){
            this.newCart();
        }
    }
  newCart(){
      let response = this._cartSrvc.newCart();
      if(response == false){
          this._showAlert(
              'ERROR!',
              'There has been a problem trying to create the cart :(',
              'error',
          );
      }
  }
  
  _showAlert(strong:string, msg:string, type:string){
        if(this.alertType == ''){
            this.alertStrong=strong;
            this.alertMessage=msg;
            this.alertType=type;
            setTimeout(() =>{
                this.alertType='';
                this.alertStrong='';
                this.alertMessage='';
            },3000)
        }else{
            this.alertStrong=strong;
            this.alertMessage=msg;
            this.alertType=type;
        }
    }

}
