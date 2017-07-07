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
    public setCart(cart:any):any{
        localStorage.setItem('cart', JSON.stringify(cart));
        let confirmCart = localStorage.getItem('cart');
        if(confirmCart != null){
            console.log('[New cart] == SUCCESS // ',confirmCart);
            return true;
        }else{
            console.log('[New cart] == ERROR');
            return false
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

    public addItem(item:any){
        let cart = this.getCart();
        if(cart == false){
            console.log('false', cart);
            return false;
        }else{            
            let cartItems = cart.items;
            let itemObj = {id:item.id,amount:1, price:item.price}
            let added=false;
            console.log('In', cartItems);
            /** Look for equal added items */
            if(cartItems.length == 0){
                itemObj.id = item.id;
                itemObj.price = item.price;
                console.log('Added obj', itemObj);
                cartItems.push(itemObj);
                console.log('Added', cartItems);
                added = true;
            }else{                
                //for(let cart_item of cartItems){
                for(let i=0; i<cartItems.length; i++){
                    if(!added){
                        let cart_item = cartItems[i];
                        if(cart_item.id == item.id){
                            cart_item.amount += 1;
                            console.log('Increased', cart_item);
                            cartItems[i] = cart_item;
                            added = true;
                        }else{
                            itemObj.id = item.id;
                            itemObj.price = item.price;
                            console.log('Added obj', itemObj);
                            cartItems.push(itemObj);
                            console.log('Added', cartItems);
                            added = true;
                        }
                    }
                }
                cart.items = cartItems;
                console.log('Cart', cartItems.items);
                let rs = this.setCart(cart);
                if(!rs){
                    return false
                }
            }
            return added;
        }
    }

    public deleteItem(){
        
    }

    public deleteAllSameItems(){
        
    }
}