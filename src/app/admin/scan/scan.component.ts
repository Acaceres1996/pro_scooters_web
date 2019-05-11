import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan/scan.service';
import { Scan } from '../../model/scan/scan';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  Scans: any = [];
  private s : Scan;

  constructor(
    public scanAPI:ScanService
  ) { }

  ngOnInit() {
    this.loadScans();
  }

  loadScans() {
    return this.scanAPI.getScans().subscribe((data: {}) => {
      this.Scans = data;
    })
  }

}
