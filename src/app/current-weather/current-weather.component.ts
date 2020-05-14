import { Weather } from './../../models/weather.model';
import { WeatherService } from './../weather.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  isOnline: boolean = false;
  @Input() weather: Weather;
  @Output() updateWeather = new EventEmitter();
  @Output() deleteWeather = new EventEmitter();

  sunnyImg = '../../assets/sunny.gif';
  rainyImg = '../../assets/rainy.gif';
  cloudyImg = '../../assets/cloudy.gif';
  clearImg = '../../assets/clear.gif';
  snowImg = '../../assets/snow.gif';

  editImg = '../../assets/edit.svg';
  deleteImg = '../../assets/delete.svg';

  constructor(
    private weatherService: WeatherService
  ) { 
    
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.weather.isEmpty && this.isOnline) {
        this.search();
      }
    }, 30000);

    if (this.weather.location != null) {
      this.city = this.weather.location;
      this.setBackground();
    }
  }

  toCelcius(kelvin) {
    return (kelvin - 273.15).toFixed();
  } 

  search() {
    this.weatherService.getCurrentWeather(this.city).subscribe((response) => {
      console.log('res: ' + response);
      if (response == 'O') {
        if (!this.isOnline) {
          window.alert('The browser is currently offline.');
        }
        this.setIsOnline(false);
      }
      else {
        this.res = response;
        this.weather.location = this.res.name;
        this.weather.desc = this.res.weather[0].description;
        this.weather.temp = this.toCelcius(this.res.main.temp);
        this.weather.feelsLike = this.toCelcius(this.res.main.feels_like);
        this.weather.isEmpty = false;
        this.setBackground();
        this.updateWeather.emit(this.weather);
        this.setIsOnline(true);
      }
    })
  }

  setBackground() {
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
      this.bgImg = this.snowImg;
    }
    else {
      this.bgImg = this.clearImg;
    }
  }

  edit() {
    this.searchBar = true;
    this.weather.isEmpty = true;
  }

  delete() {
    let id = this.weather.id;
    this.weather = new Weather();
    this.weather.id = id;
    this.deleteWeather.emit(this.weather);
    this.city = null;
  }

  add() {
    this.searchBar = true;
  }

  cancel() {
    if (this.weather.location == null) {
      this.searchBar = false;
    }
    else {
      this.weather.isEmpty = false;
      this.city = this.weather.location;
    }
  }

  setIsOnline(bool: boolean) {
    this.isOnline = bool;
  }

}
