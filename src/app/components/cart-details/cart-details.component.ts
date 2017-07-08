import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
//Services
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';

@Component({
    selector: 'cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css'],
    providers: [
        CartService,
        ShopService
    ]
})

export class CartDetailsComponent implements OnInit{

    private alertStrong:string='';
    private alertMessage:string='';
    private alertType:string='';
    showData:boolean=false;
    cart:any;
    cartItems:any;
    totalCost:number=0;
    constructor(
        private _title:Title,
        private _cartSrvc:CartService,
        private _shopSrvc:ShopService
        ){

    }
    
    ngOnInit(){
        this._title.setTitle('Snuuper App - Cart Details');
        this.getCart();
    }
    
    getCart(){
        let cart = this._cartSrvc.getCart();
        if( cart != false ){
            this.cart = cart;
            this.cartItems = cart.items;
            for(let cartItem of this.cartItems){
                this.totalCost += (cartItem.amount * cartItem.price );
            }
            this.showData = true;
        }else{
            this._showAlert(
                'ERROR!',
                'There has been a problem trying to get the cart :(',
                'error',
            );
        }
    }
    refreshData(cart:any){
        if( cart != false ){
            this.cart = cart;
            this.cartItems = cart.items;
            if(this.cartItems.length > 0){
                for(let cartItem of this.cartItems){
                    this.totalCost += (cartItem.amount * cartItem.price );
                }
                this.showData = true;
            }else{
                this.showData = false;
                this.totalCost = 0;
            }
        }else{
            this._showAlert(
                'ERROR!',
                'There has been a problem trying to get the cart :(',
                'error',
            );
        }
    }
    delete(item:any, all:boolean){
        let cart = this._cartSrvc.deleteItem(item,all);
        if(cart == false){
            this._showAlert(
                'ERROR!',
                'There has been a problem when removing the item :(',
                'error',
            );
        }else{
            this.showData=false;//Quick refresh fix, because i didn't implement a data grid
            this.totalCost = 0;
            this.refreshData(cart);
        }
    }

    emptyCart(){
        let response = this._cartSrvc.emptyCart();
        if(response){
            this.showData = false;
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

    pay(){
        this._shopSrvc.buyItems({})
            .subscribe(
                data => {
                    if(data == false){
                        this._showAlert(
                            'DONE!',
                            "Enjoy your acquired items :) Thanks for choosing us.",
                            'success',
                        );
                    }else{
                        this._showAlert(
                            'ERROR!',
                            "We couldn't process your payment :(",
                            'error',
                        );
                    }
                },err=> {
                    console.log('Payment error',err);
                    this._showAlert(
                            'DONE!',
                            "Enjoy your acquired items :) Thanks for choosing us.",
                            'success',
                        );
                }
            );
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

