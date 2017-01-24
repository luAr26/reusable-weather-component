"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constants_1 = require('../constants/constants');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = 'celsius';
        this.currentLocation = '';
        this.icons = new Skycons();
        this.dataReceived = false;
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather(_this.pos.coords.latitude, _this.pos.coords.longitude);
            _this.getLocationName(_this.pos.coords.latitude, _this.pos.coords.longitude);
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function (lat, long) {
        var _this = this;
        this.service.getCurrentWeather(lat, long)
            .subscribe(function (weather) {
            var current = weather.currently;
            _this.weatherData.temp = current.temperature;
            _this.weatherData.summary = current.summary;
            _this.weatherData.wind = current.windSpeed;
            _this.weatherData.humidity = current.humidity;
            _this.weatherData.icon = current.icon;
            _this.setIcon();
            _this.dataReceived = true;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function (lat, long) {
        var _this = this;
        this.service.getLocationName(lat, long)
            .subscribe(function (location) {
            _this.currentLocation = location.results[2].formatted_address;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.onToggleUnits = function () {
        this.onToggleTemp();
        this.onToggleSpeed();
    };
    WeatherComponent.prototype.onToggleTemp = function () {
        if (this.currentTempUnit === 'celsius') {
            this.currentTempUnit = 'fahrenheit';
        }
        else {
            this.currentTempUnit = 'celsius';
        }
    };
    WeatherComponent.prototype.onToggleSpeed = function () {
        if (this.currentSpeedUnit === 'kph') {
            this.currentSpeedUnit = 'mph';
        }
        else {
            this.currentSpeedUnit = 'kph';
        }
    };
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add('icon', this.weatherData.icon);
        this.icons.play();
    };
    WeatherComponent.prototype.setStyles = function () {
        if (this.weatherData.icon) {
            this.icons.color = constants_1.WEATHER_COLORS[this.weatherData.icon].color;
            return constants_1.WEATHER_COLORS[this.weatherData.icon];
        }
        else {
            this.icons.color = constants_1.WEATHER_COLORS.default.color;
            return constants_1.WEATHER_COLORS.default;
        }
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-weather-widget',
            templateUrl: './weather.component.html',
            styleUrls: ['./weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map