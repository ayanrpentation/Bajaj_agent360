import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-potential-common',
  templateUrl: './potential-common.component.html',
  styleUrls: ['./potential-common.component.css']
})
export class PotentialCommonComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.common_profitability();
    this.avgMeetingAndTrainingPerMonth();
    this.common_retention();
    this.common_crossSell();
  }






  goToSegmentation(){
    
    sessionStorage.setItem("openedPageName", 'segmentation');
    this.router.navigate(['/segmentation']) 
  
    console.log("clicked agent segmentation")
  }











  common_profitability(){


    let chartData = [{ "name": 'Identified', "y": 62 }, { "name": 'Similar', "y": 65 }] as any

    let colors = [
          // 'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          '#bef264',
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        height: '280px'
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '', // You can add title here
      },
      xAxis: {
        categories: chartData.map((data:any) => data.name), // X-axis labels
        labels: {
          // enabled: false, // Hide x-axis labels
          enabled: true, // Hide x-axis labels
          style: {
            fontSize: '15px'
          }
        },
      },
      yAxis: {
        visible: false, // Hide the y-axis
        gridLineWidth: 0, // Remove grid lines

        title: {
          text: 'Percentage', // Y-axis title
        },
        // labels: {
        //   enabled: false, // Hide x-axis labels
        //   // enabled: true, // Hide x-axis labels
        // },
      },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + '%'; // Display value on top of every bar
            },
            style: {
              fontSize: '15px'
            }
          },
        },
      },
      legend: {
        enabled: false, // Disable legend
      },
      series: [
        
        {
          
          type: 'column',
          name: 'Contribution',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('common_profitability', chartOptions).reflow();;




  }



  avgMeetingAndTrainingPerMonth(){


    let chartData = [{ "name": 'Identified', "y": 12 }, { "name": 'Similar', "y": 14 }] as any

    let colors = [
          // 'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          '#bef264',
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        height: '280px'
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '', // You can add title here
      },
      xAxis: {
        categories: chartData.map((data:any) => data.name), // X-axis labels
        labels: {
          // enabled: false, // Hide x-axis labels
          enabled: true, // Hide x-axis labels
          style: {
            fontSize: '15px'
          }
        },
      },
      yAxis: {
        visible: false, // Hide the y-axis
        gridLineWidth: 0, // Remove grid lines

        title: {
          text: '', // Y-axis title
        },
        // labels: {
        //   enabled: false, // Hide x-axis labels
        //   // enabled: true, // Hide x-axis labels
        // },
      },
      tooltip: {
        valueSuffix: '',
      },
      plotOptions: {
        
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + ''; // Display value on top of every bar
            },
            style: {
              fontSize: '15px'
            }
          },
        },
      },
      legend: {
        enabled: false, // Disable legend
      },
      series: [
        
        {
          
          type: 'column',
          name: 'Count',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('avgMeetingAndTrainingPerMonth', chartOptions).reflow();;




  }




  common_retention(){


    let chartData = [{ "name": 'Identified', "y": 54 }, { "name": 'Similar', "y": 58 }] as any

    let colors = [
          // 'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          '#bef264',
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        height: '280px'
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '', // You can add title here
      },
      xAxis: {
        categories: chartData.map((data:any) => data.name), // X-axis labels
        labels: {
          // enabled: false, // Hide x-axis labels
          enabled: true, // Hide x-axis labels
          style: {
            fontSize: '15px'
          }
        },
      },
      yAxis: {
        visible: false, // Hide the y-axis
        gridLineWidth: 0, // Remove grid lines

        title: {
          text: 'Percentage', // Y-axis title
        },
        // labels: {
        //   enabled: false, // Hide x-axis labels
        //   // enabled: true, // Hide x-axis labels
        // },
      },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + '%'; // Display value on top of every bar
            },
            style: {
              fontSize: '15px'
            }
          },
        },
      },
      legend: {
        enabled: false, // Disable legend
      },
      series: [
        
        {
          
          type: 'column',
          name: 'Contribution',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('common_retention', chartOptions).reflow();;




  }





  common_crossSell(){


    let chartData = [{ "name": 'Identified', "y": 1.2 }, { "name": 'Similar', "y": 1.4 }] as any

    let colors = [
          // 'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          '#bef264',
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        height: '280px'
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '', // You can add title here
      },
      xAxis: {
        categories: chartData.map((data:any) => data.name), // X-axis labels
        labels: {
          // enabled: false, // Hide x-axis labels
          enabled: true, // Hide x-axis labels
          style: {
            fontSize: '15px'
          }
        },
      },
      yAxis: {
        visible: false, // Hide the y-axis
        gridLineWidth: 0, // Remove grid lines

        title: {
          text: 'Percentage', // Y-axis title
        },
        // labels: {
        //   enabled: false, // Hide x-axis labels
        //   // enabled: true, // Hide x-axis labels
        // },
      },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        
        column: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + '%'; // Display value on top of every bar
            },
            style: {
              fontSize: '15px'
            }
          },
        },
      },
      legend: {
        enabled: false, // Disable legend
      },
      series: [
        
        {
          
          type: 'column',
          name: 'Contribution',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('common_crossSell', chartOptions).reflow();;




  }







}
