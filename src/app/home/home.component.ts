import { Weather } from './../../models/weather.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherList: Array<Weather> = new Array(9);

  constructor() { 
    for (let i=0; i < 9; i++) {
      this.weatherList[i] = new Weather;
    }
  }

  ngOnInit(): void {
  
  }

}
