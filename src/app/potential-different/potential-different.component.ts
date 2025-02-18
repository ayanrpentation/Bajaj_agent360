import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-potential-different',
  templateUrl: './potential-different.component.html',
  styleUrls: ['./potential-different.component.css']
})
export class PotentialDifferentComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }



  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.diff_claimSettlementRatio();
    this.diff_commissionRate();
    this.diff_snrMngmntMtngInvitations();
    this.diff_queryClosureTat()
    this.diff_digitalToolUsage();
    this.diff_customerProblemRatio()
  }






  goToSegmentation(){
    
    sessionStorage.setItem("openedPageName", 'segmentation');
    this.router.navigate(['/segmentation']) 
  
    console.log("clicked agent segmentation")
  }











  diff_claimSettlementRatio(){


    let chartData = [{ "name": 'Laggard', "y": 78 }, { "name": 'Potential', "y": 90 }] as any

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

    Highcharts.chart('diff_claimSettlementRatio', chartOptions).reflow();;




  }



  diff_commissionRate(){


    let chartData = [{ "name": 'Laggard', "y": 16.21 }, { "name": 'Potential', "y": 21 }] as any

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

    Highcharts.chart('diff_commissionRate', chartOptions).reflow();;




  }




  diff_snrMngmntMtngInvitations(){


    let chartData = [{ "name": 'Laggard', "y": 1 }, { "name": 'Potential', "y": 3 }] as any

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
          name: 'Contribution',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('diff_snrMngmntMtngInvitations', chartOptions).reflow();;




  }



  
  diff_queryClosureTat(){


    let chartData = [{ "name": 'Laggard', "y": 2.4 }, { "name": 'Potential', "y": 1.3 }] as any

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
          name: 'Contribution',
          data: chartData.map((data:any) => ({
            y: data.y,
            color: data.color,
          })),
        },
      ],
    };

    Highcharts.chart('diff_queryClosureTat', chartOptions).reflow();;




  }




  
  diff_digitalToolUsage(){


    let chartData = [{ "name": 'Laggard', "y": 72 }, { "name": 'Potential', "y": 99 }] as any

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

    Highcharts.chart('diff_digitalToolUsage', chartOptions).reflow();;




  }






  diff_customerProblemRatio(){


    let chartData = [{ "name": 'Laggard', "y": 38 }, { "name": 'Potential', "y": 15 }] as any

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

    Highcharts.chart('diff_customerProblemRatio', chartOptions).reflow();;




  }

}
