import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { RegisterService } from 'src/app/services/register/register.service';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-arrendados',
  templateUrl: './arrendados.component.html',
  styleUrls: ['./arrendados.component.scss']
})
export class ArrendadosComponent implements OnInit {

  Scooters: any = [];
  map: mapboxgl.Map;
  lat = -34.892953;
  lng = -56.165181;


  constructor(
    private registerAPI: RegisterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhY2VyZXMiLCJhIjoiY2p2cXU1ODhwMDR3ejN5cW9uejhyeW5uMSJ9.O4BNMFtGRcv-CPOeiT_A8w';
    this.registerAPI.getDisponibles().subscribe((data: {}) => {
      this.Scooters = data;
      console.log(data);
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
    this.initializeMap();
  }

  initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    } else {
      this.alertService.add(AlertType.error, "No se puede obtener geolocalización. Mostrando coordenadas por defecto.");
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      minZoom: 12,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl(
      {
        fitBoundsOptions: { maxZoom: 15 },
        showUserLocation: true
      }
    ));
    let url = 'https://api.urudin.tk/scooter/alquilados';
    this.map.on('load', (event) => {

      /* Dinamico */
      setInterval(
        () => {
          this.map.getSource('drone').setData(url);
        }
      );

      this.map.addSource('drone', { type: 'geojson', data: url });
      this.map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
          "icon-image": "bicycle-15",
          "text-field": "{id}-{numeroserial}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });
    });

  }
}
