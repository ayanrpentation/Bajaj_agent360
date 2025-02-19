import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit, AfterViewInit {

  @Input() chartData: any; // this is mentioned as chatInfo where it is getting called
  // @Output() chartClicked = new EventEmitter<string>();
  @Input() id: string = 'defaultChartId';
  @Input() height: any;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createColumnChart();
  }

  createColumnChart() {
    if (!this.chartData) {
      console.error('No chart data provided!');
      return;
    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        height: this.height,
        // backgroundColor: 'transparent',
        backgroundColor: 'none',
        // events: {
        //   click: () => this.chartClicked.emit('Chart clicked!')
        // }
      },
      title: {
        text: this.chartData.title || ''
      },
      xAxis: {
        categories: this.chartData.level_data,
        title: {
          text: this.chartData.x_axis_name,
          style: {
            fontWeight: 'bold',
            fontSize: '18px'
          }
        },
        labels: {
          style: {
            color: 'black',
            fontWeight: 'normal'
          }
        },
        gridLineWidth: 0
      },
      yAxis: {
        title: {
          text: this.chartData.y_axis_name,
          style: {
            fontWeight: 'bold'
          }
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0
      },
      tooltip: {
        formatter: function () {
          const index = this.point.index;
          // const customTitle = this.series.chart.options.xAxis[0]['categories'][index];
          const customTitle = "";
          return `<b>${customTitle}</b><br>${this.series.name}: ${this.y}%`;
        }
      },
      // plotOptions: {
      //   series: {
      //     dataLabels: {
      //       enabled: true,
      //       style: {
      //         fontSize: '12px',
      //         textOutline: 'none',
      //         // color: '#000000'
      //       }
      //     }
      //   }
      // },
      // tooltip: {
      //   formatter: function () {
      //     const index = this.point.index;
      //     const customTitle = this.series.chart.options.xAxis?.[0]['categories'][index] || "";
      //     return `<b>${customTitle}</b><br>${this.series.name}: ${this.y}%`;
      //   }
      // },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.y}%`; // Adding % suffix
            },
            style: {
              fontSize: '12px',
              textOutline: 'none',
            }
          }
        }
      },
      series: this.chartData.series,
      credits: {
        enabled: false
      }
    };

    // Render the chart
    Highcharts.chart(this.id, chartOptions);
  }
}
