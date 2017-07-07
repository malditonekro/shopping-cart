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
            return confirmCart;
        }else{
            return false
        }
    }

    public emptyCart(){
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart!=null){
            cart.items = [];
            localStorage.setItem('cart',JSON.stringify(cart));
            return true;            
        }else{
            return false;
        }
    }

    public getCart():any{
        try{
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart == null){//Real ws call would be error or not found
                return false;
            }else{
                return cart;
            }

        }catch(e){
            console.log(e)
            return false;
        }
    }
    public setCart(cart:any):any{
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
        let confirmCart = localStorage.getItem('cart');
        if(confirmCart != null){
            return true;
        }else{
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
        if(cart == false){/* Error when obtaining the existing cart */
            return false;
        }else{            
            let cartItems = cart.items;
            let added=false;
            /** Look for equal added items */
            if(cartItems.length == 0){
                let itemObj = {id:item.id,amount:1, price:item.price}
                itemObj.id = item.id;
                itemObj.price = item.price;
                cartItems.push(itemObj);
                added = true;
            }else{
                for(let i=0; i<cartItems.length; i++){
                    console.log('Loop n° '+i,);
                    if(added==false){
                        let cart_item = cartItems[i];
                        console.log('Item: '+i,cart_item);
                        if(cart_item.id == item.id){
                            cart_item.amount += 1;
                            cartItems[i] = cart_item;
                            added = true;
                        }
                    }
                }
                if(added==false){
                    let itemObj = {id:item.id,amount:1, price:item.price}
                    itemObj.id = item.id;
                    itemObj.price = item.price;
                    cartItems.push(itemObj);
                    added = true;
                }
            }
            cart.items = cartItems;
            let rs = this.setCart(cart);
            if(!rs){
                return false
            }else{
                return added;
            }
        }
    }

    public deleteItem(){
        
    }

    public deleteAllSameItems(){
        
    }
}