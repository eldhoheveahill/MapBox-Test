import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

//import{MapboxDirections} from '@mapbox/mapbox-gl-directions';

// ... (your other imports)


const routeCoordinates: number[][] = [
  [-73.985130, 40.748817], // Example coordinates for location 1
  [-73.980752, 40.742451],
  [-73.970752, 40.732451], // Example coordinates for location 2
  // Add more coordinates for additional locations
];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map!: mapboxgl.Map;

  ngOnInit() {
    (mapboxgl as any).accessToken = "pk.eyJ1IjoiYXJ2aW5kcDA5IiwiYSI6ImNsbzg0ZGk2YzBjOHIycW9la2pkOWpxNzgifQ.niGIq75jSXqP1AP_OQsdNg" // Set the access token globally

    this.initializeMap();
  }

  private initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // container id specified in the HTML
      style: 'mapbox://styles/mapbox/streets-v11', // map style
      center: [-73.980752, 40.742451], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });



    this.map.on('load', () => {
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': routeCoordinates
          }
        }
      });

      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });
  }
}
