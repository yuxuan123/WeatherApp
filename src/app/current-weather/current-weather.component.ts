import { Weather } from './../../models/weather.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherService } from './../weather.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  res;
  city: string;
  searchBar: boolean = false;
  bgImg: string;
  @Input() weather: Weather;

  sunnyImg = '../../assets/sunny.gif';
  rainyImg = '../../assets/rainy.gif';
  cloudyImg = '../../assets/cloudy.gif';
  clearImg = '../../assets/clear.gif';
  snowImg = '../../assets/snow.gif';

  constructor(
    private weatherService: WeatherService
  ) { 
    
  }

  ngOnInit() {
    this.weather = new Weather();
  }

  toCelcius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  } 

  search() {
    console.log(this.city);
    this.weatherService.getCurrentWeather(this.city).subscribe((response) => {
      console.log(response);
      if (response != null) {
        this.res = response;
        console.log(this.res);
        this.weather.location = this.res.name;
        this.weather.desc = this.res.weather[0].description;
        this.weather.temp = this.toCelcius(this.res.main.temp);
        this.weather.feelsLike = this.toCelcius(this.res.main.feels_like);
        this.weather.isEmpty = false;

        if (this.weather.desc.includes('rain')) {
          this.bgImg = this.rainyImg;
        }
        else if (this.weather.desc.includes('cloud')) {
          this.bgImg = this.cloudyImg;
        }
        else if (this.weather.desc.includes('sun')) {
          this.bgImg = this.sunnyImg;
        }
        else if (this.weather.desc.includes('clear')) {
          this.bgImg = this.clearImg;
        }
        else if (this.weather.desc.includes('snow')) {
          this.bgImg = this.clearImg;
        }
        else {
          this.bgImg = this.clearImg;
        }
      }
    })
  }

  edit() {
    this.weather.isEmpty = true;
  }

  add() {
    this.searchBar = true;
  }

  cancel() {
    if (this.res == null) {
      this.searchBar = false;
    }
    else {
      this.weather.isEmpty = false;
    }
  }

}
