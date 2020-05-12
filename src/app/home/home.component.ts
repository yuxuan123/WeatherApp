import { Weather } from './../../models/weather.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherList = new Array<Weather>(9);

  constructor() { }

  ngOnInit(): void {
  }

}
