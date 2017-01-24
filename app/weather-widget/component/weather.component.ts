import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import {WEATHER_COLORS} from '../constants/constants';

declare var Skycons: any;

@Component({
  moduleId: module.id,
  selector: 'app-weather-widget',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
  pos: Position;
  weatherData = new Weather(null, null, null, null, null);
  currentSpeedUnit = "kph";
  currentTempUnit = 'celsius';
  currentLocation = '';
  icons = new Skycons();
  dataReceived = false;

  constructor(private service: WeatherService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.service.getCurrentLocation()
      .subscribe(position => {
        this.pos = position;
        this.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude);
        this.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude);
      }, err => console.error(err));
  }

  getCurrentWeather(lat: number, long: number) {
    this.service.getCurrentWeather(lat, long)
      .subscribe(weather => {
        const current = weather.currently;
        this.weatherData.temp = current.temperature;
        this.weatherData.summary = current.summary;
        this.weatherData.wind = current.windSpeed;
        this.weatherData.humidity = current.humidity;
        this.weatherData.icon = current.icon;
        this.setIcon();
        this.dataReceived = true;
      }, err => console.error(err));
  }

  getLocationName(lat: number, long: number) {
    this.service.getLocationName(lat, long)
      .subscribe(location => {
        this.currentLocation = location.results[2].formatted_address;  
      }, err => console.error(err));
  }

  onToggleUnits() {
    this.onToggleTemp();
    this.onToggleSpeed();
  }

  onToggleTemp() {
    if (this.currentTempUnit === 'celsius') {
      this.currentTempUnit = 'fahrenheit';
    } else {
      this.currentTempUnit = 'celsius';
    }
  }

  onToggleSpeed() {
    if (this.currentSpeedUnit === 'kph') {
      this.currentSpeedUnit = 'mph'
    } else {
      this.currentSpeedUnit = 'kph';
    }
  }

  setIcon() {
    this.icons.add('icon', this.weatherData.icon);
    this.icons.play();
  }

  setStyles(): Object {
    if(this.weatherData.icon) {
      this.icons.color = WEATHER_COLORS[this.weatherData.icon].color;
      return WEATHER_COLORS[this.weatherData.icon];
    } else {
      this.icons.color = WEATHER_COLORS.default.color;
      return WEATHER_COLORS.default;
    }
  }
}