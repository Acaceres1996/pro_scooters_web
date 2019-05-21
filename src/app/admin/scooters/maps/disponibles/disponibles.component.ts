import { Component, OnInit } from '@angular/core';
import { AlertType } from 'src/app/alert/alert.enum';
import * as mapboxgl from 'mapbox-gl';
import { AlertService } from 'src/app/alert/alert.service';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.component.html',
  styleUrls: ['./disponibles.component.scss']
})
export class DisponiblesComponent implements OnInit {

  Scooters: any = [];
  map: mapboxgl.Map;
  lat = -34.892953;
  lng = -56.165181;

  constructor(
    private registerAPI: RegisterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhY2VyZXMiLCJhIjoiY2p2cXU1ODhwMDR3ejN5cW9uejhyeW5uMSJ9.O4BNMFtGRcv-CPOeiT_A8w';
    this.registerAPI.getDisponibles().subscribe((data: {}) => {
      this.Scooters = data;
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
    this.map.on('load', (event) => {
      for (let i = 0; i < this.Scooters.length; i++) {
        let markerHeight = 40, markerRadius = 10, linearOffset = 25;
        let popupOffsets = {
          'top': [10, 10],
          'top-left': [0, 0],
          'top-right': [0, 0],
          'bottom': [0, -markerHeight],
          'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'left': [markerRadius, (markerHeight - markerRadius) * -1],
          'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        };
        let popup = new mapboxgl.Popup(
          {
            offset: popupOffsets,
            className: 'mapbox_popup',
            maxWidth: '100px'
          })
          .setLngLat([this.Scooters[i].longitud, this.Scooters[i].latitud])
          .setHTML("<p>Scooter <strong>" + this.Scooters[i].scooter.numeroserial + "</strong></p><p>" + this.Scooters[i].bateria + "%</p>")
          .setMaxWidth("100px")
          .addTo(this.map);
        let marker = new mapboxgl.Marker().setLngLat([this.Scooters[i].longitud, this.Scooters[i].latitud]).setPopup(popup).addTo(this.map);
        console.log(marker);
      }
    });
  }
}
