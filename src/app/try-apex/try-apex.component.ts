import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
// import * as Highcharts from 'highcharts';
// import SolidGaugeModule from 'highcharts/modules/solid-gauge';
// import * as HC_solidgauge from 'highcharts/modules/solid-gauge';
import { ChartComponent, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions,ApexAxisChartSeries, ApexNonAxisChartSeries, ApexTitleSubtitle } from "ng-apexcharts";

// HC_solidgauge(Highcharts); 


// import {
//   ApexNonAxisChartSeries,
// } from "ng-apexcharts";


// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   // series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   plotOptions: ApexPlotOptions;
//   labels: string[];
//   dataLabels: ApexDataLabels;
//   title: ApexTitleSubtitle;
// };

// export type ChartOptions_nonAxis = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   labels: string[];
//   plotOptions: ApexPlotOptions;
// };

@Component({
  selector: 'app-try-apex',
  templateUrl: './try-apex.component.html',
  styleUrls: ['./try-apex.component.css']
})
export class TryApexComponent implements OnInit {

  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

  @ViewChild('container', { static: false }) container!: ElementRef;

  // Highcharts = Highcharts;
  // chartOptions1: Highcharts.Options = {
  //   chart: {
  //     type: 'solidgauge'
  //   },
  //   title: {
  //     text: 'Multi-KPI Solid Gauge',
  //     align: 'center',
  //     style: { fontSize: '18px' }
  //   },
  //   pane: {
  //     startAngle: -90,
  //     endAngle: 90,
  //     background: [
  //       {
  //         outerRadius: '100%',
  //         innerRadius: '90%',
  //         backgroundColor: '#DDD',
  //         borderWidth: 0
  //       },
  //       {
  //         outerRadius: '80%',
  //         innerRadius: '70%',
  //         backgroundColor: '#EEE',
  //         borderWidth: 0
  //       },
  //       {
  //         outerRadius: '60%',
  //         innerRadius: '50%',
  //         backgroundColor: '#DDD',
  //         borderWidth: 0
  //       }
  //     ]
  //   },
  //   yAxis: {
  //     min: 0,
  //     max: 100,
  //     lineWidth: 0,
  //     tickPositions: []
  //   },
  //   series: [
  //     {
  //       type: 'solidgauge',
  //       name: 'KPI 1',
  //       data: [75],
  //       dataLabels: {
  //         format: '<div style="text-align:center"><span style="font-size:18px">{y}%</span></div>'
  //       },
  //       tooltip: { valueSuffix: '%' }
  //     },
  //     {
  //       type: 'solidgauge',
  //       name: 'KPI 2',
  //       data: [55],
  //       dataLabels: {
  //         format: '<div style="text-align:center"><span style="font-size:18px">{y}%</span></div>'
  //       },
  //       tooltip: { valueSuffix: '%' }
  //     },
  //     {
  //       type: 'solidgauge',
  //       name: 'KPI 3',
  //       data: [40],
  //       dataLabels: {
  //         format: '<div style="text-align:center"><span style="font-size:18px">{y}%</span></div>'
  //       },
  //       tooltip: { valueSuffix: '%' }
  //     }
  //   ],
  //   credits: { enabled: false }
  // };





  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    labels: string[];
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle; // ✅ Explicitly adding title
  } = {
    series: [
      {
        name: "Series 1",
        data: [10, 20, 30, 40]
      }
    ],
    chart: {
      type: "bar"
    },

    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
    dataLabels: {
      enabled: true
    },
    title: { // ✅ Adding title property
      text: "My Chart Title",
      align: "center"
    }
  };

  // chartOptions_radial: {
  //   series: ApexNonAxisChartSeries;
  //   chart: ApexChart;
  //   plotOptions: ApexPlotOptions;
  //   labels: string[];
  //   tooltip: any;
  //   // dataLabels: ApexDataLabels;
  //   // title: ApexTitleSubtitle; // ✅ Explicitly adding title
  // } = {
  //   series: [44, 55],
  //   chart: {
  //     height: 350,
  //     type: "radialBar"
  //   },
  //   plotOptions: {
  //     radialBar: {
  //       dataLabels: {
  //         show: false,
  //         name: {
  //           fontSize: "22px"
  //         },
  //         value: {
  //           fontSize: "16px"
  //         },
  //         total: {
  //           show: true,
  //           label: "Total",
  //           formatter: function(w) {
  //             return "55";
  //           }
  //         }
  //       }
  //     }
  //   },
  //   // tooltip: {
  //   //   enabled: true,
  //   //     y: {
  //   //       formatter: function (val:any) {
  //   //         return val.toFixed(0); // ✅ Display exact value, no percentage
  //   //       }
  //   //     }
  //   // },
  //   labels: ["Apples", "Oranges"],
  //   tooltip: {
  //     enabled: true,
  //     y: {
  //       formatter: function (val:any) {
  //         return val.toFixed(0); // ✅ Display exact value, no percentage
  //       }
  //     }
  //   }
  // };





  chartOptions_radial: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    labels: string[];
    tooltip: any;
  } = {
    series: [44, 55],
    chart: {
      height: 350,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          // show: false, // ✅ Hide default percentage data labels
          name: {
            fontSize: "22px"
          },
          value: {
            fontSize: "16px"
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              return (44 + 55).toString(); // ✅ Show total sum
            }
          }
        }
      }
    },
    labels: ["Apples", "Oranges"],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val: any) {
          return val+1 // ✅ Show exact value instead of percentage
        }
      }
    }
  };
  


  

  constructor() { 
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Sales",
    //       data: [10, 20, 30, 40, 50]
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false
    //     }
    //   },
    //   labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    //   dataLabels: {
    //     enabled: true
    //   }
    // };
  }

  ngOnInit(): void {
  }



  // ngAfterViewInit(): void {
  //   const trackColors = Highcharts.getOptions().colors!.map(color =>
  //     Highcharts.color(color).setOpacity(0.3).get()
  //   );


  //   let options = {
  //     chart: {
  //       type: 'solidgauge',
  //       height: '110%'
  //     },
  //     title: {
  //       text: 'Multiple KPI Gauge',
  //       style: {
  //         fontSize: '24px'
  //       }
  //     },
  //     tooltip: {
  //       borderWidth: 0,
  //       backgroundColor: 'none',
  //       shadow: false,
  //       style: {
  //         fontSize: '16px'
  //       },
  //       valueSuffix: '%',
  //       pointFormat: '{series.name}<br>' +
  //         '<span style="font-size: 2em; color: {point.color}; ' +
  //         'font-weight: bold">{point.y}</span>',
  //       positioner: function (labelWidth: any) {
  //         return {
  //           x: (this.chart.chartWidth - labelWidth) / 2,
  //           y: (this.chart.plotHeight / 2) + 15
  //         };
  //       }
  //     },
  //     pane: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       background: [{
  //         outerRadius: '112%',
  //         innerRadius: '88%',
  //         backgroundColor: trackColors[0],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '87%',
  //         innerRadius: '63%',
  //         backgroundColor: trackColors[1],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '62%',
  //         innerRadius: '38%',
  //         backgroundColor: trackColors[2],
  //         borderWidth: 0
  //       }]
  //     },
  //     yAxis: {
  //       min: 0,
  //       max: 100,
  //       lineWidth: 0,
  //       tickPositions: []
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           enabled: false
  //         },
  //         linecap: 'round',
  //         stickyTracking: false,
  //         rounded: true
  //       }
  //     },
  //     series: [{
  //       name: 'Conversion',
  //       data: [{
  //         color: Highcharts.getOptions().colors![0],
  //         radius: '112%',
  //         innerRadius: '88%',
  //         y: 80
  //       }]
  //     }, {
  //       name: 'Engagement',
  //       data: [{
  //         color: Highcharts.getOptions().colors![1],
  //         radius: '87%',
  //         innerRadius: '63%',
  //         y: 65
  //       }]
  //     }, {
  //       name: 'Feedback',
  //       data: [{
  //         color: Highcharts.getOptions().colors![2],
  //         radius: '62%',
  //         innerRadius: '38%',
  //         y: 50
  //       }]
  //     }]
  //   }

  //   Highcharts.chart('container', options );
  // }




  // ngAfterViewInit(): void {
  //   const trackColors = Highcharts.getOptions().colors!.map(color =>
  //     Highcharts.color(color).setOpacity(0.3).get()
  //   );

  //   const options: Highcharts.Options = {
  //     chart: {
  //       type: 'solidgauge',
  //       height: '110%'
  //     },
  //     title: {
  //       text: 'Multiple KPI Gauge',
  //       style: {
  //         fontSize: '24px'
  //       }
  //     },
  //     tooltip: {
  //       borderWidth: 0,
  //       backgroundColor: 'none',
  //       shadow: false,
  //       style: {
  //         fontSize: '16px'
  //       },
  //       valueSuffix: '%',
  //       pointFormat: '{series.name}<br>' +
  //         '<span style="font-size: 2em; color: {point.color}; ' +
  //         'font-weight: bold">{point.y}</span>',
  //       positioner: function (labelWidth: any) {
  //         return {
  //           x: (this.chart.chartWidth - labelWidth) / 2,
  //           y: (this.chart.plotHeight / 2) + 15
  //         };
  //       }
  //     },
  //     pane: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       background: [{
  //         outerRadius: '112%',
  //         innerRadius: '88%',
  //         backgroundColor: trackColors[0],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '87%',
  //         innerRadius: '63%',
  //         backgroundColor: trackColors[1],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '62%',
  //         innerRadius: '38%',
  //         backgroundColor: trackColors[2],
  //         borderWidth: 0
  //       }]
  //     },
  //     yAxis: {
  //       min: 0,
  //       max: 100,
  //       lineWidth: 0,
  //       tickPositions: []
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           enabled: false
  //         },
  //         linecap: 'round',
  //         stickyTracking: false,
  //         rounded: true
  //       }
  //     },
  //     series: [{
  //       name: 'Conversion',
  //       data: [{
  //         color: Highcharts.getOptions().colors![0],
  //         radius: '112%',
  //         innerRadius: '88%',
  //         y: 80
  //       }]
  //     }, {
  //       name: 'Engagement',
  //       data: [{
  //         color: Highcharts.getOptions().colors![1],
  //         radius: '87%',
  //         innerRadius: '63%',
  //         y: 65
  //       }]
  //     }, {
  //       name: 'Feedback',
  //       data: [{
  //         color: Highcharts.getOptions().colors![2],
  //         radius: '62%',
  //         innerRadius: '38%',
  //         y: 50
  //       }]
  //     }]
  //   };

  //   Highcharts.chart(this.container.nativeElement, options);
  // }





  // ngAfterViewInit(): void {
  //   const trackColors = Highcharts.getOptions().colors?.map(color =>
  //     Highcharts.color(color).setOpacity(0.3).get()
  //   ) || [];

  //   const options: Highcharts.Options = {
  //     chart: {
  //       type: 'solidgauge',
  //       height: '410'
  //     },
  //     title: {
  //       text: 'Multiple KPI Gauge',
  //       style: {
  //         fontSize: '24px'
  //       }
  //     },
  //     tooltip: {
  //       borderWidth: 0,
  //       backgroundColor: 'none',
  //       shadow: false,
  //       style: {
  //         fontSize: '16px'
  //       },
  //       valueSuffix: '%',
  //       pointFormat: '{series.name}<br>' +
  //         '<span style="font-size: 2em; color: {point.color}; ' +
  //         'font-weight: bold">{point.y}</span>',
  //       positioner: function (labelWidth: number) {
  //         return {
  //           x: (this.chart.chartWidth - labelWidth) / 2,
  //           y: (this.chart.plotHeight / 2) + 15
  //         };
  //       }
  //     },
  //     pane: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       background: trackColors.length >= 3 ? [{
  //         outerRadius: '112%',
  //         innerRadius: '88%',
  //         backgroundColor: trackColors[0],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '87%',
  //         innerRadius: '63%',
  //         backgroundColor: trackColors[1],
  //         borderWidth: 0
  //       }, {
  //         outerRadius: '62%',
  //         innerRadius: '38%',
  //         backgroundColor: trackColors[2],
  //         borderWidth: 0
  //       }] : []
  //     },
  //     yAxis: {
  //       min: 0,
  //       max: 100,
  //       lineWidth: 0,
  //       tickPositions: []
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           enabled: false
  //         },
  //         linecap: 'round',
  //         stickyTracking: false,
  //         rounded: true
  //       }
  //     },

  //     series: [{
  //       name: 'Conversion',
  //       type: 'solidgauge',
  //       data: [{
  //         color: Highcharts.getOptions().colors![0],
  //         radius: '112%',
  //         innerRadius: '88%',
  //         y: 80
  //       }]
  //     }, {
  //       name: 'Engagement',
  //       type: 'solidgauge',
  //       data: [{
  //         color: Highcharts.getOptions().colors![1],
  //         radius: '87%',
  //         innerRadius: '63%',
  //         y: 65
  //       }]
  //     }, {
  //       name: 'Feedback',
  //       type: 'solidgauge',
  //       data: [{
  //         color: Highcharts.getOptions().colors![2],
  //         radius: '62%',
  //         innerRadius: '38%',
  //         y: 50
  //       }]
  //     }]
      
  //   };

  //   Highcharts.chart(this.container.nativeElement, options);
  // }






  // ngAfterViewInit(): void {
  //   const options: Highcharts.Options = {
  //     chart: {
  //       type: 'solidgauge',
  //       height: '110%'
  //     },
  //     title: {
  //       text: 'Multiple KPI Gauge',
  //       style: {
  //         fontSize: '24px'
  //       }
  //     },
  //     tooltip: {
  //       borderWidth: 0,
  //       backgroundColor: 'none',
  //       shadow: false,
  //       style: {
  //         fontSize: '16px'
  //       },
  //       valueSuffix: '%',
  //       pointFormat: '{series.name}<br>' +
  //         '<span style="font-size: 2em; color: {point.color}; ' +
  //         'font-weight: bold">{point.y}</span>',
  //       positioner: function (labelWidth: number) {
  //         return {
  //           x: (this.chart.chartWidth - labelWidth) / 2,
  //           y: (this.chart.plotHeight / 2) + 15
  //         };
  //       }
  //     },
  //     pane: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       background: []
  //     },
  //     yAxis: {
  //       min: 0,
  //       max: 100,
  //       lineWidth: 0,
  //       tickPositions: []
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           enabled: false
  //         },
  //         linecap: 'round',
  //         stickyTracking: false,
  //         rounded: true
  //       }
  //     },
  //     series: [{
  //       name: 'Conversion',
  //       type: 'solidgauge',
  //       data: [{
  //         color: '#7cb5ec',
  //         radius: '112%',
  //         innerRadius: '88%',
  //         y: 80
  //       }]
  //     }, {
  //       name: 'Engagement',
  //       type: 'solidgauge',
  //       data: [{
  //         color: '#434348',
  //         radius: '87%',
  //         innerRadius: '63%',
  //         y: 65
  //       }]
  //     }, {
  //       name: 'Feedback',
  //       type: 'solidgauge',
  //       data: [{
  //         color: '#90ed7d',
  //         radius: '62%',
  //         innerRadius: '38%',
  //         y: 50
  //       }]
  //     }]
  //   };

  //   Highcharts.chart(this.container.nativeElement, options);
  // }






//   renderIcons() {

//     this.series.forEach(series => {
//         if (!series.icon) {
//             series.icon = this.renderer
//                 .text(
//                     `<i class="fa fa-${series.options.custom.icon}"></i>`,
//                     0,
//                     0,
//                     true
//                 )
//                 .attr({
//                     zIndex: 10
//                 })
//                 .css({
//                     color: series.options.custom.iconColor,
//                     fontSize: '1.5em'
//                 })
//                 .add(this.series[2].group);
//         }
//         series.icon.attr({
//             x: this.chartWidth / 2 - 15,
//             y: this.plotHeight / 2 -
//                 series.points[0].shapeArgs.innerR -
//                 (
//                     series.points[0].shapeArgs.r -
//                     series.points[0].shapeArgs.innerR
//                 ) / 2 +
//                 8
//         });
//     });
// }









  // renderChart(){
  //   const trackColors = Highcharts.getOptions().colors.map(color =>
  //     new Highcharts.Color(color).setOpacity(0.3).get()
  // );
  
  // Highcharts.chart('container', {
  
  //     chart: {
  //         type: 'solidgauge',
  //         height: '110%',
  //         events: {
  //             render: renderIcons
  //         }
  //     },
  
  //     title: {
  //         text: 'Multiple KPI gauge',
  //         style: {
  //             fontSize: '24px'
  //         }
  //     },
  
  //     tooltip: {
  //         borderWidth: 0,
  //         backgroundColor: 'none',
  //         shadow: false,
  //         style: {
  //             fontSize: '16px'
  //         },
  //         valueSuffix: '%',
  //         pointFormat: '{series.name}<br>' +
  //             '<span style="font-size: 2em; color: {point.color}; ' +
  //             'font-weight: bold">{point.y}</span>',
  //         positioner: function (labelWidth) {
  //             return {
  //                 x: (this.chart.chartWidth - labelWidth) / 2,
  //                 y: (this.chart.plotHeight / 2) + 15
  //             };
  //         }
  //     },
  
  //     pane: {
  //         startAngle: 0,
  //         endAngle: 360,
  //         background: [{ // Track for Conversion
  //             outerRadius: '112%',
  //             innerRadius: '88%',
  //             backgroundColor: trackColors[0],
  //             borderWidth: 0
  //         }, { // Track for Engagement
  //             outerRadius: '87%',
  //             innerRadius: '63%',
  //             backgroundColor: trackColors[1],
  //             borderWidth: 0
  //         }, { // Track for Feedback
  //             outerRadius: '62%',
  //             innerRadius: '38%',
  //             backgroundColor: trackColors[2],
  //             borderWidth: 0
  //         }]
  //     },
  
  //     yAxis: {
  //         min: 0,
  //         max: 100,
  //         lineWidth: 0,
  //         tickPositions: []
  //     },
  
  //     plotOptions: {
  //         solidgauge: {
  //             dataLabels: {
  //                 enabled: false
  //             },
  //             linecap: 'round',
  //             stickyTracking: false,
  //             rounded: true
  //         }
  //     },
  
  //     series: [{
  //         name: 'Conversion',
  //         data: [{
  //             // color: Highcharts.getOptions().colors[0],
  //             radius: '112%',
  //             innerRadius: '88%',
  //             y: 80
  //         }],
  //         custom: {
  //             icon: 'filter',
  //             iconColor: '#303030'
  //         }
  //     }, {
  //         name: 'Engagement',
  //         data: [{
  //             // color: Highcharts.getOptions().colors[1],
  //             radius: '87%',
  //             innerRadius: '63%',
  //             y: 65
  //         }],
  //         custom: {
  //             icon: 'comments-o',
  //             iconColor: '#ffffff'
  //         }
  //     }, {
  //         name: 'Feedback',
  //         data: [{
  //             // color: Highcharts.getOptions().colors[2],
  //             radius: '62%',
  //             innerRadius: '38%',
  //             y: 50
  //         }],
  //         custom: {
  //             icon: 'commenting-o',
  //             iconColor: '#303030'
  //         }
  //     }]
  // });
  // }















  // createChart() {
  //   const trackColors = Highcharts.getOptions().colors.map(color =>
  //     new Highcharts.Color(color).setOpacity(0.3).get()
  //   );

  //   Highcharts.chart('container', {

  //     chart: {
  //       type: 'solidgauge',
  //       height: '110%',
  //       // events: {
  //       //   render: this.renderIcons.bind(this) 
  //       // }
  //     },

  //     title: {
  //       text: 'Multiple KPI gauge',
  //       style: {
  //         fontSize: '24px'
  //       }
  //     },

  //     tooltip: {
  //       borderWidth: 0,
  //       backgroundColor: 'none',
  //       shadow: false,
  //       style: {
  //         fontSize: '16px'
  //       },
  //       valueSuffix: '%',
  //       pointFormat: '{series.name}<br>' +
  //         '<span style="font-size: 2em; color: {point.color}; ' +
  //         'font-weight: bold">{point.y}</span>',
  //       positioner: function (labelWidth) {
  //         return {
  //           x: (this.chart.chartWidth - labelWidth) / 2,
  //           y: (this.chart.plotHeight / 2) + 15
  //         };
  //       }
  //     },

  //     pane: {
  //       startAngle: 0,
  //       endAngle: 360,
  //       background: [{ // Track for Conversion
  //         outerRadius: '112%',
  //         innerRadius: '88%',
  //         backgroundColor: trackColors[0],
  //         borderWidth: 0
  //       }, { // Track for Engagement
  //         outerRadius: '87%',
  //         innerRadius: '63%',
  //         backgroundColor: trackColors[1],
  //         borderWidth: 0
  //       }, { // Track for Feedback
  //         outerRadius: '62%',
  //         innerRadius: '38%',
  //         backgroundColor: trackColors[2],
  //         borderWidth: 0
  //       }]
  //     },

  //     yAxis: {
  //       min: 0,
  //       max: 100,
  //       lineWidth: 0,
  //       tickPositions: []
  //     },

  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           enabled: false
  //         },
  //         linecap: 'round',
  //         stickyTracking: false,
  //         rounded: true
  //       }
  //     },

  //     series: [{
  //       name: 'Conversion',
  //       data: [{
  //         // color: Highcharts.getOptions().colors[0],
  //         radius: '112%',
  //         innerRadius: '88%',
  //         y: 80
  //       }],
  //       custom: {
  //         icon: 'filter',
  //         iconColor: '#303030'
  //       }
  //     }, {
  //       name: 'Engagement',
  //       data: [{
  //         // color: Highcharts.getOptions().colors[1],
  //         radius: '87%',
  //         innerRadius: '63%',
  //         y: 65
  //       }],
  //       custom: {
  //         icon: 'comments-o',
  //         iconColor: '#ffffff'
  //       }
  //     }, {
  //       name: 'Feedback',
  //       data: [{
  //         // color: Highcharts.getOptions().colors[2],
  //         radius: '62%',
  //         innerRadius: '38%',
  //         y: 50
  //       }],
  //       custom: {
  //         icon: 'commenting-o',
  //         iconColor: '#303030'
  //       }
  //     }]
  //   });
  // }

  // renderIcons() {
  //   this.chart.series.forEach(series => {
  //     if (!series.icon) {
  //       series.icon = this.chart.renderer
  //         .text(
  //           `<i class="fa fa-${series.options.custom.icon}"></i>`,
  //           0,
  //           0,
  //           true
  //         )
  //         .attr({
  //           zIndex: 10
  //         })
  //         .css({
  //           color: series.options.custom.iconColor,
  //           fontSize: '1.5em'
  //         })
  //         .add(this.chart.series[2].group); 
  //     }
  //     series.icon.attr({
  //       x: this.chart.chartWidth / 2 - 15,
  //       y: this.chart.plotHeight / 2 -
  //         series.points[0].shapeArgs.innerR -
  //         (
  //           series.points[0].shapeArgs.r -
  //           series.points[0].shapeArgs.innerR
  //         ) / 2 +
  //         8
  //     });
  //   });
  // }


}
