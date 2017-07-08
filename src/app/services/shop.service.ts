import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ShopService{

    public cart:any;

    constructor(
        private http: Http
    ){}

    /**
     * Simulated WS call to end the shopping process
     */
    buyItems(params:any):Observable<any>{
        let service = '/PayWS';

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //try{
            return this.http.post(
                'https://snuuper.s3.amazonaws.com' + service+'/createPurchase/', 
                JSON.stringify({ params:params, token:'tokenDummy123' }),
                { headers: headers })
                .map( 
                    res => {
                        let data = res.json(); /** Assuming a response like { status:'OK || NOK', code: 0, message: '', data: { ... } } */
                        if( data.status == 'OK'){
                            return data.data;
                        }else{
                            return false
                        }
                    }
                );
        /*}catch(e){
            console.log('Error when buying items',e);
            return false;
        }*/
    }

}