import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css'],
    providers: [
        CartService
    ]
})

export class CartDetailsComponent implements OnInit{

    private alertStrong:string='';
    private alertMessage:string='';
    private alertType:string='';

    constructor(
        private _title:Title,
        private _cartSrvc:CartService
        ){

    }
    
    ngOnInit(){
        this._title.setTitle('Snuuper App - Cart Details');
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
        if(this.alertType == ''){
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
}

