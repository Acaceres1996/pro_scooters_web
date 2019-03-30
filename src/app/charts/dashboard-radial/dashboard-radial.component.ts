import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-radial',
  templateUrl: './dashboard-radial.component.html',
  styleUrls: ['./dashboard-radial.component.scss']
})
export class DashboardRadialComponent implements OnInit {

  @Input() title = '';
  _values = [];
  @Input() set values(v) {
    this._values = v;
   }

  get values() {
    return this._values;
  }

  constructor() { }

  ngOnInit() {
  }

  getData() {
    return this.values;
  }

}
