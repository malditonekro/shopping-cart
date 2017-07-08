import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
//Services
import { StationService } from '../../services/station.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'stations-component',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.css'],
    providers: [ 
        StationService,
        CartService
    ]
})

export class StationsComponent implements OnInit{
    
    category:string;
    stationItems:any;
    private alertStrong:string='';
    private alertMessage:string='';
    private alertType:string='';

    constructor(
        private _actRt: ActivatedRoute,
        private _cartSrvc: CartService,
        private _lctn: Location,
        private _stationSrvc: StationService,
        private _title:Title
        ){

    }
    
    ngOnInit(){
        this._actRt.params
            .subscribe( params => this.getStation(params['id']) );        
    }

    getStation(station:number){
        this._stationSrvc.getStation(station)
            .subscribe(
                data => {                    
                    if(data != false){
                        this.category = data.station.charAt(0).toUpperCase() + data.station.slice(1);
                        this.stationItems = data.items;
                        this._title.setTitle('Snuuper App - '+this.category+' Station');
                    }
                }, err => {
                    console.log('Error: ', err);
                } 
            );
    }
    addToCart(item:any){
        let rs = this._cartSrvc.addItem(item);
        if(rs){
            this._showAlert(
                'DONE!',
                item.name+' added to the cart.',
                'success',
            );
        }else{
            this._showAlert(
                'ERROR!',
                'There has been a problem adding the item to the cart :(',
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

