import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-pick-position',
  templateUrl: './pick-position.component.html',
  styleUrls: ['./pick-position.component.scss']
})
export class PickPositionComponent implements OnInit {

  position: any;
  marker: any;

  @Input() lat: any;
  @Input() lng: any;

  @Output() cancelPicker: EventEmitter<any> = new EventEmitter();
  @Output() selectPosition: EventEmitter<any> = new EventEmitter();

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    if (this.lat && this.lng) {
      this.position = {coords: { latitude: this.lat, longitude: this.lng }};
      this.createMap();
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = position;
        this.createMap();
      });
    } else {
      this.position = {coords: { latitude: -34.917973197413936, longitude: -56.16765308380127 }}
      this.createMap();
    }
  }

  createMap() {
    var mapProp = {
      center: new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude),
      map: this.map,
      draggable: true
    });
    let that = this;
    google.maps.event.addListener(this.marker, 'dragend', function(event) {
      that.updateGeoLocation(event);
    });
  }

  cancelar() {
    this.cancelPicker.emit(true);
  }

  seleccionar() {
    this.selectPosition.emit(this.position);
    this.cancelPicker.emit(true);
  }

  updateGeoLocation(e) {
    this.position.coords.latitude = e.latLng.lat();
    this.position.coords.longitude = e.latLng.lng();
  }
}
