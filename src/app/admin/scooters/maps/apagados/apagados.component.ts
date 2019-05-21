import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { RegisterService } from 'src/app/services/register/register.service';
import { AlertService } from 'src/app/alert/alert.service';
import { ParameterService } from 'src/app/services/parameter/parameter.service';
import { AlertType } from 'src/app/alert/alert.enum';
import { Parameter } from 'src/app/model/parameter/parameter';

@Component({
  selector: 'app-apagados',
  templateUrl: './apagados.component.html',
  styleUrls: ['./apagados.component.scss']
})
export class ApagadosComponent implements OnInit {

  Scooters: any = [];
  map: mapboxgl.Map;
  lat = -34.892953;
  lng = -56.165181;

  constructor(
    private registerAPI: RegisterService,
    private alertService: AlertService,
    private parameterAPI : ParameterService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.parameterAPI.getByKey("mapbox_access_token").subscribe((data: Parameter) => {
      console.log(data);
      mapboxgl.accessToken = data.valor;
      this.initializeMap();
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
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
