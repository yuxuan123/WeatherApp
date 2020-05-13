import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import * as moment from 'moment';

const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.status == '404') {
        errorMessage = 'Invalid city name. Please try again.';
      }
      else if (error.status == '400') {
        errorMessage = 'Please enter a city name.';
      }
      else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}