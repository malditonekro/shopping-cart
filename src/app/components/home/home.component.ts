import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [
        CartService
    ]
})

export class HomeComponent implements OnInit{
    
    private alertStrong:string='';
    private alertMessage:string='';
    private alertType:string='';

    constructor(
        private _title:Title,
        private _cartSrvc:CartService
        ){

    }
    
    ngOnInit(){
        this._title.setTitle('Snuuper App - Home');
    }
    
    emptyCart(){
        let response = this._cartSrvc.emptyCart();
        if(response){
            this._showAlert(
                'Done!',
                'The cart is now empty. Go shopping!',
                'success',
            );
        }else{
            this._showAlert(
                'ERROR!',
                'There has been a problem trying to empty the cart :(',
                'error',
            );
        }
    }

    _showAlert(strong:string, msg:string, type:string){
        this.alertStrong=strong;
        this.alertMessage=msg;
        this.alertType=type;
        setTimeout(() =>{
            this.alertType='';
            this.alertStrong='';
            this.alertMessage='';
        },3000)
    }
}

