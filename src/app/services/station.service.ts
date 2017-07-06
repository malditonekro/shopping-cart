import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StationService{

    constructor(private http: Http) {
         
    }

    public getAllStations():Observable<any>{        
        let url:string='/app/services/raw/catalog.json';
        let stations:string[]=['Videogames', 'Electronics', 'Movies'];
        /** 
         * "Station's catalog reader"
         * Returns all the available stations
         */
        return this.http.get(url)
                        .map(
                            res => {
                                let data = res.json();
                                if(data.success){
                                    return data;
                                }else{
                                    return false;
                                }
                            }
                        );
    }

    public getStation(station:number): Observable<any> {
        let url:string='/app/services/raw/';
        let stn = station.toString();
        switch(stn){
            case '1':{ url += 'videogames.json'; console.log('video');
                break;
            }
            case '2':{ url += 'electronics.json'; console.log('elec');
                break;
            }
            case '3':{ url += 'movies.json'; console.log('movies');
                break;
            }
        }
        return this.http.get(url)
                        .map(
                            res => {
                                let data = res.json();
                                if(data.success){
                                    return data;
                                }else{
                                    return false;
                                }
                            }, err => {
                                console.log('Error', err);
                            }
                        );

     }
}