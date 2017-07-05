import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css'],
    providers: []
})

export class CartDetailsComponent implements OnInit{

    constructor(){

    }
    
    ngOnInit(){
        console.log('Cart Details Component Loaded Successfully ...');
    }
}

