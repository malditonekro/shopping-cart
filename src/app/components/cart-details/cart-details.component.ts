import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css'],
    providers: []
})

export class CartDetailsComponent implements OnInit{

    constructor(
        private _title:Title
        ){

    }
    
    ngOnInit(){
        this._title.setTitle('Snuuper App - Cart Details');
        console.log('Cart Details Component Loaded Successfully ...');
    }
}

