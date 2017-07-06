import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: []
})

export class HomeComponent implements OnInit{

    constructor(
        private _title:Title
        ){

    }
    
    ngOnInit(){
        this._title.setTitle('Snuuper App - Home');
        console.log('Shopping Cart Component Loaded Successfully ...');
    }
}

