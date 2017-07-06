import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
//Services
import { StationService } from '../../services/station.service';

@Component({
    selector: 'stations-component',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.css'],
    providers: [ StationService ]
})

export class StationsComponent implements OnInit{
    
    category:string;
    stationItems:any;

    constructor(
        private _title:Title,
        private _stationSrvc: StationService,
        private _actRt: ActivatedRoute,
        private _lctn: Location
        ){

    }
    
    ngOnInit(){
        console.log('Stations Component Loaded Successfully ...');
        this._actRt.params
            .subscribe( params => this.getStation(params['id']) );        
    }

    getStation(station:number){
        console.log('Loading catalog '+station+'...');
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
}

