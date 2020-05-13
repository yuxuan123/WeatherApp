import { DbService } from './../db.service';
import { Weather } from './../../models/weather.model';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherList: Array<Weather> = [];
  weatherFromDb: Array<Weather> = [];

  constructor(private dbService: DbService) { 
  }

  ngOnInit(): void {
    //this.dbService.deleteTable()

    this.dbService.getAll().then((weathers: Array<Weather>) => {
      
      weathers.forEach((weather) => {
        this.weatherList = [...this.weatherList, weather];
        console.log(weather)
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
    console.log('deleted : ' + delWeather.location)
    this.dbService
      .update(delWeather.id, delWeather)
      .then(() => {
        let id = delWeather.id
        let index = this.weatherList.findIndex((weather) => weather.id === id);
        this.weatherList[index] = delWeather;
      });

    this.dbService.getAll().then((weathers: Array<Weather>) => {
    
      weathers.forEach((weather) => {
        console.log(weather)
      })
    })
  }

  initWeatherList() {
    for (let i=0; i < 9; i++) {
      let newWeather = new Weather();
      this.dbService
        .add(newWeather)
        .then((id) => {
          console.log('id:' + id)
          newWeather.id = id;
          this.addToWeatherList(newWeather);
        });
    } 
  }

  addToWeatherList(weather: Weather) {
    this.weatherList = [...this.weatherList, weather];
  }

}
