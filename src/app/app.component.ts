import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snuuper-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(){
    console.log('Application Component Loaded Successfully ...');
  }


}
