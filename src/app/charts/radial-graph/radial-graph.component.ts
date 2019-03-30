import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewContainerRef
} from '@angular/core';

import { chart, ChartObject } from 'highcharts';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-radial-graph',
  templateUrl: './radial-graph.component.html',
  styleUrls: ['./radial-graph.component.scss']
})
export class RadialGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  _graphData: GraphData[];

  @Input() set graphData(value: GraphData[]) {
    const reload = !!(this._graphData);
    this._graphData = value;
    if (reload) {
      this.initialOffset = this.initialOffset ? this.initialOffset : 25;
      this.totalLength = this.graphData
        ? this.graphData.reduce((sum, item) => sum + item.y, 0)
        : 0;
        this.loadChart();
    }
  }

  get graphData() {
    return this._graphData;
  }

  @Input() initialOffset: number;

  public totalLength: number;

  @ViewChild('window') controlWindow: ViewContainerRef;

  /* chart things*/
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() { }

  ngOnInit() {
    this.initialOffset = this.initialOffset ? this.initialOffset : 25;
    this.totalLength = this.graphData
      ? this.graphData.reduce((sum, item) => sum + item.y, 0)
      : 0;
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart() {
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        renderTo: 'container'
      },
      title: {
        verticalAlign: 'middle',
        useHTML: true,
        align: 'center',
        y: -15,
        style: {
          fontSize: '40px'
        },
        text: this.totalLength.toString()
      },
      legend: {
        symbolRadius: 0,
        labelFormatter: function() {
          return `${this.name} (${this.y})`;
        }
      },
      plotOptions: {
        pie: {
          innerSize: '55%',
          dataLabels: {
            enabled: true,
            formatter: function() {
              if (this.y !== 0) {
                return this.y;
              }
            },
            distance: -25,
            style: {
              color: 'black',
              textOutline: 'none',
              fontSize: '15px'
            }
          },
          showInLegend: true,
          point: {
            events: {
              click: function(event) { alert(this.y); return true; }
            }
          }
        }
      },
      yAxis: {
        title: {
          text: 'Orders by status'
        }
      },
      tooltip: {
        formatter: function() {
          return `<b> ${this.point.name} </b>: ${this.y}`;
        }
      },
      series: [
        {
          name: 'Subjects',
          data: this.getData(),
          cursor: 'pointer'
        }
      ],
      credits: {
        enabled: false
      }
    };
    this.chart = chart(this.chartTarget.nativeElement, options);
  }

  selectChartItem() {

  }

  private sumLength(index: number): number {
    if (index > 0 && this.graphData.length > 0) {
      return this.graphData
        .filter((item, i) => i < index)
        .reduce(
          (sum, circle) => sum + this.calculateLengthPercent(circle.y),
          0
        );
    } else {
      return 0;
    }
  }

  calculateCircleOffset(currentIndex: number): number {
    const offset = currentIndex > 0 ? 100 - this.sumLength(currentIndex) : 0;
    return offset + this.initialOffset;
  }

  calculateLengthPercent(itemData: number): number {
    return (itemData / this.totalLength) * 100;
  }

  calculateTitleX(index: number): number {
    return (index + 1) * 10;
  }

  public ngOnDestroy() {
    this.chart.destroy();
  }

  getData() {
    return this.graphData;
  }
}

export class GraphData {
  constructor(public name: string, public y?: number, public color = '', data?: number) { }
}
