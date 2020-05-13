import { DbService } from './../db.service';
import { Weather } from './../../models/weather.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherList: Array<Weather> = [];

  constructor(private dbService: DbService) { 
  }

  ngOnInit(): void {
    //this.dbService.deleteTable()

    this.dbService.getAll().then((weathers: Array<Weather>) => {
      
      weathers.forEach((weather) => {
        this.weatherList = [...this.weatherList, weather];
      })
      if (this.weatherList.length == 0) {
        this.initWeatherList()
      }
    })
  }

  onUpdateWeather(newWeather: Weather) {
    this.dbService
      .update(newWeather.id, newWeather)
      .then(() => {
        let id = newWeather.id
        let index = this.weatherList.findIndex((weather) => weather.id === id);
        this.weatherList[index] = newWeather;
      });
  }

  onDeleteWeather(delWeather: Weather) {
    this.dbService
      .update(delWeather.id, delWeather)
      .then(() => {
        let id = delWeather.id
        let index = this.weatherList.findIndex((weather) => weather.id === id);
        this.weatherList[index] = delWeather;
      });
  }

  initWeatherList() {
    for (let i=0; i < 9; i++) {
      let newWeather = new Weather();
      this.dbService
        .add(newWeather)
        .then((id) => {
          newWeather.id = id;
          this.addToWeatherList(newWeather);
        });
    } 
  }

  addToWeatherList(weather: Weather) {
    this.weatherList = [...this.weatherList, weather];
  }

}
