# Angular 2 starter project with Bootstrap 4

In the app/weather-widget folder create a constants folder.

In the constants folder create a constants.ts file with the following content:

    export const FORECAST_KEY = 'YOUR_KEY';
    export const FORECAST_ROOT = 'https://api.darksky.net/forecast/';
    export const GOOGLE_KEY = 'YOUR_KEY';
    export const GOOGLE_ROOT = 'https://maps.googleapis.com/maps/api/geocode/json';
    export const WEATHER_COLORS = {
      'default': {
        'background-color': '#00bcd4',
        'color': '#fff'
      },
      'clear-day': {
        'background-color': '#22a7f0',
        'color': '#fff'
      },
      'clear-night': {
        'background-color': '#2c3e60',
        'color': '#fff'
      },
      'rain': {
        'background-color': '#5c97bf',
        'color': '#000'
      },
      'snow': {
        'background-color': '#fff',
        'color': '#000'
      },
      'sleet': {
        'background-color': '#e4f1fe',
        'color': '#000'
      },
      'wind': {
        'background-color': '#81cfe0',
        'color': '#000'
      },
      'fog': {
        'background-color': '#67809f',
        'color': '#fff'
      },
      'cloudy': {
        'background-color': '#bdc3c7',
        'color': '#000'
      },
      'partly-cloudy-day': {
        'background-color': '#d2d7d3',
        'color': '#000'
      },
      'partly-cloudy-night': {
        'background-color': '#34495e',
        'color': '#fff'
      }
    }
