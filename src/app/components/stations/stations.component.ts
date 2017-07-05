import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
//Services
import { ShopService } from '../../services/shop.service';

@Component({
    selector: 'stations-component',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.css'],
    providers: [ ShopService ]
})

export class StationsComponent implements OnInit{
    
    category:string;
    stationItems:any;

    constructor(    
        private _shopSrvc: ShopService,
        private _actRt: ActivatedRoute,
        private _lctn: Location
        ){

    }
    
    ngOnInit(){
        console.log('Stations Component Loaded Successfully ...');
        this._actRt.params
            .subscribe( params => this.getStation(params['id']) );
    }

    getAllStations(){

    }
    getStation(station:number){
        console.log('Loading catalog '+station+'...');
        this._shopSrvc.getStation(station)
            .subscribe(
                data => {                    
                    if(data != false){
                        this.category = data.station.charAt(0).toUpperCase() + data.station.slice(1);
                        this.stationItems = data.items;
                    }
                }, err => {
                    console.log('Error: ', err);
                } 
            );
    }
}

