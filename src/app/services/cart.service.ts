import { Injectable } from '@angular/core';

@Injectable()
export class CartService{

    constructor() {

    }
    
    public newCart():any{        
        localStorage.clear();
        let dateNow = new Date();
        let cart = {'date': dateNow, 'items':[]};
        localStorage.setItem('cart', JSON.stringify(cart));
        let confirmCart = localStorage.getItem('cart');
        if(confirmCart != null){
            console.log('[New cart] == SUCCESS // ',confirmCart);
            return confirmCart;
        }else{
            console.log('[New cart] == ERROR');
            return false
        }
    }

    public emptyCart(){
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart!=null){
            cart.items = [];
            localStorage.setItem('cart',JSON.stringify(cart));
            console.log('[Empty cart] == SUCCESS // ',cart);
            return true;            
        }else{
            console.log('[Empty cart] == ERROR');
            return false;
        }
    }

    public getCart():any{
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart == null){
            console.log('[Get cart] == NOT FOUND');//Real ws call would be error or not found
            return false;
        }else{
            console.log('[Get cart] == SUCCESS // ',cart);
            return cart;
        }
    }

    public getCartVigencyStatus():any{
        let rs = this.getCart();
        if(rs != false){
            let date = new Date();
            let cartDate = new Date(rs.date);
            let result = date.getTime() - cartDate.getTime();
            if(result > 604800000){//If older than a week then recreate the cart
                return false;
            }else{
                return true; //Cart still valid
            }
        }else{
            return false;
        }
    }

    public addItem(){

    }

    public deleteItem(){
        
    }

    public deleteAllSameItems(){
        
    }
}