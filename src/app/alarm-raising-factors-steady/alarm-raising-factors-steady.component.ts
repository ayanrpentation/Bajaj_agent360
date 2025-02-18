import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-alarm-raising-factors-steady',
  templateUrl: './alarm-raising-factors-steady.component.html',
  styleUrls: ['./alarm-raising-factors-steady.component.css']
})
export class AlarmRaisingFactorsSteadyComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.multi_lob_conversion_duration();
    this.digital_tool_trainings();
    this.cross_sell();

  }

  goToSegmentation(){
    
    sessionStorage.setItem("openedPageName", 'segmentation');
    this.router.navigate(['/segmentation']) 
  
    console.log("clicked agent segmentation")
  }














  multi_lob_conversion_duration(){
    const chartData = {
        x_axis_category_list: [
          'Oct\'23', 'Nov\'23', 'Dec\'23',
            'Jan\'24', 'Feb\'24', 'Mar\'24', 'Apr\'24',
            //  'May\'24', 'Jun\'24', 'Jul\'24', 'Aug\'24'
        ],
        data: [
            {
                // type: 'line',
                name: 'Current',
                data: [1, 1, 1, 1, 1, {
                  y: 2,
                  marker: {
                      symbol: 'url(assets/image/redTriangle.png)',
                      width: 15,   // Custom width in pixels
                      height: 15,  // Custom height in pixels
                      // x: -10,      // Move the image left or right (negative for left)
                      // y: -40       // Move the image up or down (negative for up)
                  },
                  dataLabels: {
                    enabled: true,
                    useHTML: true,   // Allows for HTML formatting
                    formatter: function () {
                        return '<span style="color: black;">6 Months Vintage</span>';  // Custom text
                    },
                    align: 'center', // Align text center
                    verticalAlign: 'bottom', // Position below the point
                    y: -30,            // Adjust to position it below the marker
                  },
                  accessibility: {
                      // description: 'Sunny symbol, this is the warmest point in the ' +
                      //     'chart.',
                      description: '' + ''
                  }
              }, 2, 2]
            },
            {
                // type: 'line',
                name: 'Expected',
                data: [1, 1, 1, 1, 1, 1, 1, 1]
            },
            
        ],
    };

    const colors = [
      // 'rgb(54, 162, 235)',     // Blue
      '#ff9f40',     // Orange
      '#bef264',     // green
    ];

    const seriesData: Highcharts.SeriesOptionsType[] = chartData.data.map((item, index) => ({
        ...item,
        type: 'line',
        color: colors[index]
    }));

    const createChart = () => {
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'line',
                height: '320px',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: chartData.x_axis_category_list,
                labels: {
                    style: {
                        fontSize: '15px' // Font size for x-axis labels
                    }
                }
            },
            yAxis: {
                visible: false, // Hide the y-axis
                gridLineWidth: 0, // Remove grid lines
                title: {
                    text: 'Contribution'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + ''; // Display value on top of every bar
                        },
                        style: {
                            fontSize: '15px'
                        }
                    }
                }
            },
            series: seriesData,
        };

        Highcharts.chart('multi_lob_conversion_duration', chartOptions);
    };

    createChart();
}
















  digital_tool_trainings() {
    const chartData = {
        x_axis_category_list: [
          'Oct\'23', 'Nov\'23', 'Dec\'23',
            'Jan\'24', 'Feb\'24', 'Mar\'24', 'Apr\'24',
            //  'May\'24', 'Jun\'24', 'Jul\'24', 'Aug\'24'
        ],
        data: [
            {
                // type: 'line',
                name: 'Current',
                data: [1, 2, 3, 4, 5, 5, 5, 5]
            },
            {
                // type: 'line',
                name: 'Expected',
                data: [3, 4, 5, 5, 7, 8, 9, 10]
            },
            
        ],
    };

    const colors = [
      // 'rgb(54, 162, 235)',     // Blue
      '#ff9f40',     // Orange
      '#bef264',     // green
    ];

    const seriesData: Highcharts.SeriesOptionsType[] = chartData.data.map((item, index) => ({
        ...item,
        type: 'line',
        color: colors[index]
    }));

    const createChart = () => {
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'line',
                height: '320px',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: chartData.x_axis_category_list,
                labels: {
                    style: {
                        fontSize: '15px' // Font size for x-axis labels
                    }
                }
            },
            yAxis: {
                visible: false, // Hide the y-axis
                gridLineWidth: 0, // Remove grid lines
                title: {
                    text: 'Contribution'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + ''; // Display value on top of every bar
                        },
                        style: {
                            fontSize: '15px'
                        }
                    }
                }
            },
            series: seriesData,
        };

        Highcharts.chart('digital_tool_trainings', chartOptions);
    };

    createChart();
}



















cross_sell(){
  const chartData = {
    x_axis_category_list: [
      'Oct\'23', 'Nov\'23', 'Dec\'23',
        'Jan\'24', 'Feb\'24', 'Mar\'24', 'Apr\'24',
        //  'May\'24', 'Jun\'24', 'Jul\'24', 'Aug\'24'
    ],
    data: [
        {
            // type: 'line',
            name: 'Current',
            data: [1, 1, 1, 1, 1, {
              y: 2,
              marker: {
                  symbol: 'url(assets/image/redTriangle.png)',
                  width: 15,   // Custom width in pixels
                  height: 15,  // Custom height in pixels
                  // x: -10,      // Move the image left or right (negative for left)
                  // y: -40       // Move the image up or down (negative for up)
              },
              dataLabels: {
                enabled: true,
                useHTML: true,   // Allows for HTML formatting
                formatter: function () {
                    return '<span style="color: black;">6 Months Vintage</span>';  // Custom text
                },
                align: 'center', // Align text center
                verticalAlign: 'bottom', // Position below the point
                y: -30,            // Adjust to position it below the marker
              },
              accessibility: {
                  // description: 'Sunny symbol, this is the warmest point in the ' +
                  //     'chart.',
                  description: '' + ''
              }
          }, 2, 2]
        },
        {
            // type: 'line',
            name: 'Expected',
            data: [1, 1, 1, 1, 1, 1, 1, 1]
        },
        
    ],
};

const colors = [
  // 'rgb(54, 162, 235)',     // Blue
  '#ff9f40',     // Orange
  '#bef264',     // green
];

const seriesData: Highcharts.SeriesOptionsType[] = chartData.data.map((item, index) => ({
    ...item,
    type: 'line',
    color: colors[index]
}));

const createChart = () => {
    const chartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
            height: '320px',
        },
        credits: {
            enabled: false,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartData.x_axis_category_list,
            labels: {
                style: {
                    fontSize: '15px' // Font size for x-axis labels
                }
            }
        },
        yAxis: {
            visible: false, // Hide the y-axis
            gridLineWidth: 0, // Remove grid lines
            title: {
                text: 'Contribution'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + ''; // Display value on top of every bar
                    },
                    style: {
                        fontSize: '15px'
                    }
                }
            }
        },
        series: seriesData,
    };

    Highcharts.chart('cross_sell', chartOptions);
};



  createChart();
}


















}
