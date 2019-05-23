import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';
import { EndpointmanagerService } from 'src/app/services/endpoints/endpointmanager.service';
import { ParameterService } from 'src/app/services/parameter/parameter.service';
import { Parameter } from 'src/app/model/parameter/parameter';

@Component({
  selector: 'app-arrendados',
  templateUrl: './arrendados.component.html',
  styleUrls: ['./arrendados.component.scss']
})
export class ArrendadosComponent implements OnInit {

  map: mapboxgl.Map;
  lat = -34.892953;
  lng = -56.165181;

  constructor(
    private endpoints: EndpointmanagerService,
    private alertService: AlertService,
    private parameterAPI: ParameterService
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
    let url = this.endpoints.getScooterEndpoint() + "/alquilados";
    this.map.on('load', (event) => {
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
      this.alertService.clear();
    });
  }
}