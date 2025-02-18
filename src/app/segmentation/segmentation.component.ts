import { ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AnyNaptrRecord } from 'dns';
import * as Highcharts from 'highcharts';

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { SideNavStatusService } from '../side-nav-status.service';




@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.css']
})
export class SegmentationComponent implements OnInit, AfterViewInit {
  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;

  // @ViewChild('target-element') scrollElement!: ElementRef ;

  // @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  // @ViewChild('scrollToElement') scrollToElement!: ElementRef;


  // @ViewChild('targetDiv') targetDiv!: ElementRef;


  colors = [
    "#F9F5FF", // Light Lavender Mist
    "#FFF8E1", // Pale Lemon Cream
    "#E8F5E9", // Soft Mint Green
    "#E3F2FD", // Powder Blue
    "#FFF3E0", // Light Peach Cream
    "#F1F8E9", // Gentle Lime Haze
    "#FFFDE7", // Soft Butter Yellow
    "#FCE4EC", // Blush Pink
    "#F8E6E6", // Warm Rose Fog
    "#EBF5FF"  // Light Ice Blue
  ];






  Highcharts = Highcharts;
  chartDataList = [
    {
      title: 'Chart 1',
      data: [
        { name: 'Category A', y: 55 },
        { name: 'Category B', y: 25 },
        { name: 'Category C', y: 20 }
      ]
    },
    {
      title: 'Chart 2',
      data: [
        { name: 'Category X', y: 40 },
        { name: 'Category Y', y: 35 },
        { name: 'Category Z', y: 25 }
      ]
    }
  ] as any;


  dataSets = [
    [
      { name: 'Category A', y: 55 },
      { name: 'Category B', y: 25 },
      { name: 'Category C', y: 20 }
    ],
    [
      { name: 'Category X', y: 40 },
      { name: 'Category Y', y: 35 },
      { name: 'Category Z', y: 25 }
    ]
  ];


  ngAfterViewInit(): void {
    // Initialize charts after the view has been rendered
    // this.chartDataList.forEach((chart:any, index: any) => {
    //   this.createChart(`container-${index}`, chart);
    // });

    this.callGIChartMaker();

    // this.loop_top3lob_contri_chart_data();
  }



  callGIChartMaker(){
    setTimeout(() => {
      this.loop_top3lob_contri_chart_data();
    }, 0);
  }

  callNonGIChartMaker(){
    setTimeout(() => {
      this.loop_top3lob_contri_chart_data_nongi();
    }, 0);
  }


  createChart(containerId: string, chartData: any): void {
    Highcharts.chart(containerId, {
      chart: {
        type: 'pie'
      },
      title: {
        text: chartData.title
      },
      series: [
        {
          type: 'pie',
          data: chartData.data
        }
      ]
    });
  }


  // createTOP3lobContri_piechart(){


  //   this.chartDataList = [
  //     {
  //       title: 'Chart 1',
  //       data: [
  //         { name: 'Category A', y: 55 },
  //         { name: 'Category B', y: 25 },
  //         { name: 'Category C', y: 20 }
  //       ]
  //     },
  //     {
  //       title: 'Chart 2',
  //       data: [
  //         { name: 'Category X', y: 40 },
  //         { name: 'Category Y', y: 35 },
  //         { name: 'Category Z', y: 25 }
  //       ]
  //     }
  //   ];

  // }














  scrollToTopBtn = this.elementRef.nativeElement.querySelector('#scrollToTopBtn');
  targetDiv = document.getElementById('targetDiv') as any;




  userDetails = sessionStorage.getItem('userDetails') as any;
  userName = JSON.parse(this.userDetails).name as any;
  userAgentId = JSON.parse(this.userDetails).user_agent_id as any;
  userDesignation = JSON.parse(this.userDetails).designation as any;

  selectedMonthYear = sessionStorage.getItem('selectedMonthYear') as any;
  selectedChannel = sessionStorage.getItem('selectedChannel') as any;
  selectedSubChannel = sessionStorage.getItem('selectedSubChannel') as any;
  selectedLocation = sessionStorage.getItem('selectedLocation') as any;
  selectedState = sessionStorage.getItem('selectedState') as any;
  selectedZone = sessionStorage.getItem('selectedZone') as any;



  vintageYear_selected = '' as any;
  vintageYearOptions = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] as any;


  payloadDataStructure = {
    userName: "Pentation Analytics",
    userAgentId: 1500,
    userDesignation: "NH",
    selectedMonthYear: [{"monthVal":"12-2023","monthName":"DEC 2023"}],  // it will have single value
    selectedChannel: [{"CHANNEL":"Multiline"},{"CHANNEL":"POS"}],
    selectedSubChannel: [{SUB_CHANNEL: "EMERGING RELATIONSHIPS"}, {SUB_CHANNEL: "PRIME RELATIONSHIPS"}],
    selectedLocation: [{LOCATION_DESC: "HO"}, {LOCATION_DESC: "WEST DELHI"}, {LOCATION_DESC: "MOTINAGAR(HUB)"}],
    selectedState: [{"STATE":"NCT OF DELHI"},{"STATE":"HARYANA"}],
    selectedZone: [{"ZONE":"HO"},{"ZONE":"NORTH"}],
  }





  segmentOverviewTableData = {} as any;


  segmentOverview_agentCountDetails_TableData = [] as any;


  segmentOverviewTable_2_Data = [] as any

  segmentOverviewTable_3_Data = [] as any





  updatedSegmentOverviewTable_gi = {
      "Bees": {
        "row_1": "Bees", 
        "row_10": {
          "%_lob": "14.34%", 
          "data": 722655127.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "7.51%", 
          "data": 378443599.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "1.12%", 
          "data": 56674325.0, 
          "name": "MOTOR 4W"
        }, 
        "row_2": "Let's take a look at how the Bees team performed this year:", 
        "row_2_desc": "Most productive GI agents", 
        "row_3": [
          {
            "data": " 127397.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "1259674.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "11.25%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "41.31%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Bees Cluster?", 
        "row_6": {
          "data": 96.15, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 91.83, 
          "name": "gender_%", 
          "statement": "of agents are Female"
        }, 
        "row_8": {
          "data": 84.86, 
          "name": "age_%", 
          "statement": "of agents aged 45-60"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Caterpillars": {
        "row_1": "Caterpillars", 
        "row_10": {
          "%_lob": "1.26%", 
          "data": 63332932.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "1.24%", 
          "data": 62434107.0, 
          "name": "MOTOR CV"
        }, 
        "row_12": {
          "%_lob": "0.68%", 
          "data": 34205549.0, 
          "name": "MOTOR 2W"
        }, 
        "row_2": "Let's take a look at how the Caterpillars team performed this year:", 
        "row_2_desc": "Agents that are growing and have the potential to improve and perform better", 
        "row_3": [
          {
            "data": " 112214.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "714639.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "18.63%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "46.06%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Caterpillars Cluster?", 
        "row_6": {
          "data": 100.0, 
          "name": "marriage_%", 
          "statement": "of agents are Single"
        }, 
        "row_7": {
          "data": 76.0, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 100.0, 
          "name": "age_%", 
          "statement": "of agents aged 18-30"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Dolphins": {
        "row_1": "Dolphins", 
        "row_10": {
          "%_lob": "12.53%", 
          "data": 631479282.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "7.24%", 
          "data": 364534593.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "1.84%", 
          "data": 92827385.0, 
          "name": "MOTOR 4W"
        }, 
        "row_2": "Let's take a look at how the Dolphins team performed this year:", 
        "row_2_desc": "Individuals with Good performance across key metrics", 
        "row_3": [
          {
            "data": "-14426.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "644853.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "-2.19%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "79.16%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Dolphins Cluster?", 
        "row_6": {
          "data": 94.9, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 100.0, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 97.65, 
          "name": "age_%", 
          "statement": "of agents aged 45-60"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Eagles": {
        "row_1": "Eagles", 
        "row_10": {
          "%_lob": "12.3%", 
          "data": 619814008.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "9.52%", 
          "data": 479767892.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "2.62%", 
          "data": 132137643.0, 
          "name": "MOTOR CV"
        }, 
        "row_2": "Let's take a look at how the Eagles team performed this year:", 
        "row_2_desc": "Agents with highest contribution to revenue", 
        "row_3": [
          {
            "data": "-48860.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "630581.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "-7.19%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "48.23%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Eagles Cluster?", 
        "row_6": {
          "data": 83.76, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 94.33, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 91.1, 
          "name": "age_%", 
          "statement": "of agents aged 30-45"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Elephants": {
        "row_1": "Elephants", 
        "row_10": {
          "%_lob": "3.27%", 
          "data": 164511304.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "3.14%", 
          "data": 157951553.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "0.51%", 
          "data": 25894194.0, 
          "name": "MOTOR 4W"
        }, 
        "row_2": "Let's take a look at how the Elephants team performed this year:", 
        "row_2_desc": "Agents with steady performance metrics over a long period of time", 
        "row_3": [
          {
            "data": " 28954.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "474921.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "6.49%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "60.59%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Elephants Cluster?", 
        "row_6": {
          "data": 87.76, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 100.0, 
          "name": "gender_%", 
          "statement": "of agents are Female"
        }, 
        "row_8": {
          "data": 95.34, 
          "name": "age_%", 
          "statement": "of agents aged 30-45"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Kittens": {
        "row_1": "Kittens", 
        "row_10": {
          "%_lob": "5.46%", 
          "data": 275114082.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "1.59%", 
          "data": 80113890.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "0.76%", 
          "data": 38088356.0, 
          "name": "MARINE"
        }, 
        "row_2": "Let's take a look at how the Kittens team performed this year:", 
        "row_2_desc": "Agents displaying high growth '%' in overall GWP and Productivity", 
        "row_3": [
          {
            "data": " 198853.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "808621.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "32.61%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "63.02%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Kittens Cluster?", 
        "row_6": {
          "data": 95.28, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 98.28, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 85.84, 
          "name": "age_%", 
          "statement": "of agents aged 60-75"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Moles": {
        "row_1": "Moles", 
        "row_10": {
          "%_lob": "1.4%", 
          "data": 70576542.0, 
          "name": "MOTOR 2W"
        }, 
        "row_11": {
          "%_lob": "1.25%", 
          "data": 62781159.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_12": {
          "%_lob": "0.92%", 
          "data": 46398589.0, 
          "name": "MOTOR CV"
        }, 
        "row_2": "Let's take a look at how the Moles team performed this year:", 
        "row_2_desc": "Agents displaying significant degrowth over time", 
        "row_3": [
          {
            "data": "-45276.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "379336.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "-10.66%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "33.93%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Moles Cluster?", 
        "row_6": {
          "data": 81.6, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 100.0, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 100.0, 
          "name": "age_%", 
          "statement": "of agents aged 30-45"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }, 
      "Sloths": {
        "row_1": "Sloths", 
        "row_10": {
          "%_lob": "0.33%", 
          "data": 16687120.0, 
          "name": "RETAIL HEALTH"
        }, 
        "row_11": {
          "%_lob": "0.31%", 
          "data": 15422684.0, 
          "name": "MOTOR 2W"
        }, 
        "row_12": {
          "%_lob": "0.06%", 
          "data": 3041633.0, 
          "name": "MOTOR 4W"
        }, 
        "row_2": "Let's take a look at how the Sloths team performed this year:", 
        "row_2_desc": "Agents with the lowest contribution to overall revenue", 
        "row_3": [
          {
            "data": "-42108.0", 
            "name": "Productivity Growth/Degrowth in Rs"
          }, 
          {
            "data": "177351.0", 
            "name": "CY Productivity in Rs"
          }, 
          {
            "data": "-19.19%", 
            "name": "CY Growth in %"
          }, 
          {
            "data": "49.28%", 
            "name": "CY COR in %"
          }
        ], 
        "row_5": "What\u2019s Unique About the Sloths Cluster?", 
        "row_6": {
          "data": 93.68, 
          "name": "marriage_%", 
          "statement": "of agents are Married"
        }, 
        "row_7": {
          "data": 100.0, 
          "name": "gender_%", 
          "statement": "of agents are Male"
        }, 
        "row_8": {
          "data": 100.0, 
          "name": "age_%", 
          "statement": "of agents aged 45-60"
        }, 
        "row_9": "Top 3 LOBs and their Contribution %"
      }
  }   as any
    
  
  








updatedSegmentOverviewTable_nongi = {
    "Bees": {
      "row_1": "Bees", 
      "row_10": {
        "%_lob": "6.26%", 
        "data": 227347143.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_11": {
        "%_lob": "0.39%", 
        "data": 14255233.0, 
        "name": "MOTOR 2W"
      }, 
      "row_12": {
        "%_lob": "0.14%", 
        "data": 5075803.0, 
        "name": "MOTOR 4W"
      }, 
      "row_2": "Let's take a look at how the Bees team performed this year:", 
      "row_2_desc": "Most productive GI agents", 
      "row_3": [
        {
          "data": "5098.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "807151.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "0.64%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "60.94%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Bees Cluster?", 
      "row_6": {
        "data": 92.86, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 100.0, 
        "name": "gender_%", 
        "statement": "of agents are Female"
      }, 
      "row_8": {
        "data": 89.29, 
        "name": "age_%", 
        "statement": "of agents aged 45-60"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Caterpillars": {
      "row_1": "Caterpillars", 
      "row_10": {
        "%_lob": "5.53%", 
        "data": 200991345.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_11": {
        "%_lob": "1.05%", 
        "data": 38221867.0, 
        "name": "MOTOR 2W"
      }, 
      "row_12": {
        "%_lob": "0.25%", 
        "data": 9190474.0, 
        "name": "PERSONAL ACCIDENT"
      }, 
      "row_2": "Let's take a look at how the Caterpillars team performed this year:", 
      "row_2_desc": "Agents that are growing and have the potential to improve and perform better", 
      "row_3": [
        {
          "data": "9809.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "460106.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "2.18%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "50.84%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Caterpillars Cluster?", 
      "row_6": {
        "data": 99.57, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 96.15, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 77.78, 
        "name": "age_%", 
        "statement": "of agents aged 45-60"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Dolphins": {
      "row_1": "Dolphins", 
      "row_10": {
        "%_lob": "11.19%", 
        "data": 406854184.0, 
        "name": "MOTOR 2W"
      }, 
      "row_11": {
        "%_lob": "8.03%", 
        "data": 291692205.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_12": {
        "%_lob": "2.16%", 
        "data": 78577094.0, 
        "name": "MOTOR 4W"
      }, 
      "row_2": "Let's take a look at how the Dolphins team performed this year:", 
      "row_2_desc": "Individuals with Good performance across key metrics", 
      "row_3": [
        {
          "data": "-23064.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "449721.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "-4.88%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "50.0%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Dolphins Cluster?", 
      "row_6": {
        "data": 96.51, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 94.23, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 87.98, 
        "name": "age_%", 
        "statement": "of agents aged 30-45"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Eagles": {
      "row_1": "Eagles", 
      "row_10": {
        "%_lob": "19.15%", 
        "data": 695806118.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_11": {
        "%_lob": "4.15%", 
        "data": 150787821.0, 
        "name": "MOTOR 2W"
      }, 
      "row_12": {
        "%_lob": "1.16%", 
        "data": 42015854.0, 
        "name": "MOTOR 4W"
      }, 
      "row_2": "Let's take a look at how the Eagles team performed this year:", 
      "row_2_desc": "Agents with highest contribution to revenue", 
      "row_3": [
        {
          "data": "43979.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "738710.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "6.33%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "64.35%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Eagles Cluster?", 
      "row_6": {
        "data": 98.75, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 90.04, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 67.08, 
        "name": "age_%", 
        "statement": "of agents aged 45-60"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Elephants": {
      "row_1": "Elephants", 
      "row_10": {
        "%_lob": "6.93%", 
        "data": 251857527.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_11": {
        "%_lob": "2.81%", 
        "data": 102299830.0, 
        "name": "MOTOR 2W"
      }, 
      "row_12": {
        "%_lob": "0.5%", 
        "data": 18072474.0, 
        "name": "MARINE"
      }, 
      "row_2": "Let's take a look at how the Elephants team performed this year:", 
      "row_2_desc": "Agents with steady performance metrics over a long period of time", 
      "row_3": [
        {
          "data": "-15568.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "644657.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "-2.36%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "62.85%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Elephants Cluster?", 
      "row_6": {
        "data": 99.62, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 100.0, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 92.86, 
        "name": "age_%", 
        "statement": "of agents aged 45-60"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Moles": {
      "row_1": "Moles", 
      "row_10": {
        "%_lob": "9.0%", 
        "data": 326988916.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_11": {
        "%_lob": "5.07%", 
        "data": 184338258.0, 
        "name": "MOTOR 2W"
      }, 
      "row_12": {
        "%_lob": "0.72%", 
        "data": 26292603.0, 
        "name": "MOTOR 4W"
      }, 
      "row_2": "Let's take a look at how the Moles team performed this year:", 
      "row_2_desc": "Agents displaying significant degrowth over time", 
      "row_3": [
        {
          "data": "-47211.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "626138.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "-7.01%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "84.26%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Moles Cluster?", 
      "row_6": {
        "data": 94.95, 
        "name": "marriage_%", 
        "statement": "of agents are Married"
      }, 
      "row_7": {
        "data": 100.0, 
        "name": "gender_%", 
        "statement": "of agents are Female"
      }, 
      "row_8": {
        "data": 66.16, 
        "name": "age_%", 
        "statement": "of agents aged 30-45"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Pig": {
      "row_1": "Pig", 
      "row_10": {
        "%_lob": "6.56%", 
        "data": 238353522.0, 
        "name": "MOTOR 2W"
      }, 
      "row_11": {
        "%_lob": "1.24%", 
        "data": 45057035.0, 
        "name": "MOTOR 4W"
      }, 
      "row_12": {
        "%_lob": "1.04%", 
        "data": 37634354.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_2": "Let's take a look at how the Pig team performed this year:", 
      "row_2_desc": "Agents with below average performance across key metrics", 
      "row_3": [
        {
          "data": "-14906.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "505641.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "-2.86%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "34.2%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Pig Cluster?", 
      "row_6": {
        "data": 87.25, 
        "name": "marriage_%", 
        "statement": "of agents are Single"
      }, 
      "row_7": {
        "data": 83.22, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 59.4, 
        "name": "age_%", 
        "statement": "of agents aged 18-30"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }, 
    "Sloths": {
      "row_1": "Sloths", 
      "row_10": {
        "%_lob": "1.32%", 
        "data": 47939100.0, 
        "name": "MOTOR 2W"
      }, 
      "row_11": {
        "%_lob": "0.63%", 
        "data": 22924122.0, 
        "name": "RETAIL HEALTH"
      }, 
      "row_12": {
        "%_lob": "0.17%", 
        "data": 6161599.0, 
        "name": "MOTOR 4W"
      }, 
      "row_2": "Let's take a look at how the Sloths team performed this year:", 
      "row_2_desc": "Agents with the lowest contribution to overall revenue", 
      "row_3": [
        {
          "data": "-21810.0", 
          "name": "Productivity Growth/Degrowth in Rs"
        }, 
        {
          "data": "209119.0", 
          "name": "CY Productivity in Rs"
        }, 
        {
          "data": "-9.44%", 
          "name": "CY Growth in %"
        }, 
        {
          "data": "33.54%", 
          "name": "CY COR in %"
        }
      ], 
      "row_5": "What\u2019s Unique About the Sloths Cluster?", 
      "row_6": {
        "data": 77.71, 
        "name": "marriage_%", 
        "statement": "of agents are Single"
      }, 
      "row_7": {
        "data": 95.78, 
        "name": "gender_%", 
        "statement": "of agents are Male"
      }, 
      "row_8": {
        "data": 78.92, 
        "name": "age_%", 
        "statement": "of agents aged 30-45"
      }, 
      "row_9": "Top 3 LOBs and their Contribution %"
    }
} as any



// selected_segmentType_overview = '' as any;
selected_segmentType_overview = 'gi' as any;
selected_segment_overview = '' as any;
overview_segmentList = [] as any;

  







  pieChartData = {
    'Steady Performers' : [{ "name": 'Vaibhavi', "y": '30' }, { "name": 'Prakrati', "y": '15' }, { "name": 'Ikramul', "y": '45' }, { "name": 'Farhatul', "y": '10' }],
    'Alarming' : [{ "name": 'Vaibhavi', "y": '20' }, { "name": 'Prakrati', "y": '38' }, { "name": 'Ikramul', "y": '29' }, { "name": 'Farhatul', "y": '13' }],
    'Low Quality of Business' : [{ "name": 'Vaibhavi', "y": '15' }, { "name": 'Prakrati', "y": '27' }, { "name": 'Ikramul', "y": '18' }, { "name": 'Farhatul', "y": '40' }],
    'Potential Business Drivers' : [{ "name": 'Vaibhavi', "y": '35' }, { "name": 'Prakrati', "y": '20' }, { "name": 'Ikramul', "y": '8' }, { "name": 'Farhatul', "y": '37' }],
    'Laggard' : [{ "name": 'Vaibhavi', "y": '19' }, { "name": 'Prakrati', "y": '23' }, { "name": 'Ikramul', "y": '13' }, { "name": 'Farhatul', "y": '45' }],
  }



  selectedSegment_pie = '' as any;


  personalDetailsArrow = 'close'

  segmentation_search_staatus = false;


  gender_selected = '' as any;
  maritalStatus_selected = '' as any;
  prevExp_selected= '' as any;
  prevExpYr_selected = '' as any;
  areaExperience_selected = '' as any;
  lob_selected = '' as any;
  workingType_selected = '' as any;
  incomeBucket_selected = '' as any;

  ageGroup_selected = '' as any;
  state_selected = '' as any;
  state_list = ['UTTAR PRADESH', 'HARYANA', 'UTTARAKHAND', 'DELHI',
  'RAJASTHAN', 'JAMMU AND KASHMIR', 'PUNJAB', 'CHANDIGARH',
  'TAMIL NADU', 'KARNATAKA', 'ANDHRA PRADESH', 'GOA', 'TELANGANA',
  'MUMBAI', 'REST OF MAHARASHTRA', 'GUJARAT 2', 'GUJARAT 1',
  'JHARKHAND', 'WEST BENGAL', 'ASSAM', 'BIHAR', 'CHATTISGARH',
  'KERALA', 'MADHYA PRADESH', 'ODISHA']


  subChnnel_selected = '' as any;
  backgroundBucket_selected = '' as any;
  backgroundBucket_list = ['Composite', 'GI', 'Business', 'LI', 'MFA', 'Shop Owner', 'Student', '2 Wheeler Dealer', 'Health', 'CI', 'Service', 'RTO AGENT', 'Used Car Dealer', 'HouseWife', 'Post Office', 'NEW', 'MLM', 'Automobile Sector', 'DSA', 'Travel Agent', 'CA', 'Teacher', 'Retired', 'Transfer - GI', 'MR', 'Transfer GI', 'HEALTH', 'STUDENT']
  // backgroundBucket_list = ['General Insurance', '']


  lagardDetailsStatus = false as boolean;
  // Store modal references by modal ID
  modalRefs: { [id: string]: NgbModalRef } = {};
  @ViewChild('laggardDetails') laggardDetails!: TemplateRef<any>; // Reference the modal content

  constructor(private rest: RestApiService, private scroller: ViewportScroller, private elementRef: ElementRef, private modalService: NgbModal, private route: Router, private SideNavStatusService: SideNavStatusService,) { 
    
    // this.openModal('laggardDetails_similar_char', document.getElementById("laggardDetails_similar_char"))

    this.selectedMonthYear = JSON.parse(this.selectedMonthYear);
    this.selectedChannel = JSON.parse(this.selectedChannel);
    this.selectedSubChannel = JSON.parse(this.selectedSubChannel);
    this.selectedLocation = JSON.parse(this.selectedLocation);
    this.selectedState = JSON.parse(this.selectedState);
    this.selectedZone = JSON.parse(this.selectedZone);


    
    
    
    
    this.segment_overview_updated_gi();
    this.segment_overview_updated_non_gi();
    

  }


  // xyz(){
  //   this.selectionOfSegmentType();

    
  // }

  async executeFunctions() {
    await this.selectionOfSegmentType(); // Waits for this function to complete
    this.prepareGraph();                 // Then calls this function
  }
  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });

    // console.log("sideNav_state--> ", this.sideNav_state)
  }





  
  imdChannel_dropdownList = [] as any;
  imdChannel_selectedItems = [] as any;
  imdChannel_dropdownSettings: IDropdownSettings = {} as any


  setUpValuesInDropDown() { //multi dropdown settings-------------------
    this.imdChannel_dropdownSettings = {
      singleSelection: false,
      idField: 'CHANNEL',
      textField: 'CHANNEL',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }
  
  ngOnInit(): void {
    // console.log("welcome agent segmentation");
    this.selectedSegment_pie = '';

    this.sideNavStatus();

    this.sideNav_state = true;
    this.setUpValuesInDropDown();
    this.getChannelList();
    
    
    




    // this.get_segment_overview();
    // this.get_segment_overview2();


    // this.selectionOfSegmentType();
    // this.prepareGraph();


    this.executeFunctions();

    // this.createTOP3lobContri_piechart()
    // this.loop_top3lob_contri_chart_data();



    // this.selected_segment_overview = this.overview_segmentList[0];
    // this.prepareGraph()






    this.agentSegmentWiseVarComparison();
    this.digitalFriendlinessTrend_line();
    this.averageMeetingsWithAgentsYTD_groupColumn();

    // this.zonalHeadWise_AgentSegmentContributionYTD_groupColumn()




    // this.AgentSegmentWise_zh_ytd_contri_pieChart(this.selectedSegment_pie)



    // this.hiring_status_newEmp_4Graphs()


    // this.newAgent_LM_contri_pieChart();
    // this.newAgent_MTD_contri_pieChart();


    // this.newAgent_LM_contribution()
    // this.newAgent_MTD_contribution()








    // this.openModal('laggardDetails', this.laggardDetails);








    


    // const clickButton = this.elementRef.nativeElement.querySelector('#scrollToTopBtn');
    // const targetDiv = document.getElementById('targetDiv') as any;

    // clickButton.addEventListener('click', () => {
    // targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // });




    // setTimeout(() => {
    //   const clickButton = this.elementRef.nativeElement.querySelector('#scrollToTopBtn');
    //   const targetDiv = document.getElementById('targetDiv') as any;

    //   clickButton.addEventListener('click', () => {
    //     targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   });
    // });
    
  }





  getChannelList() {
    const data = {
      userAgentId: this.userAgentId,
    }
    this.rest.getChannelList(data).subscribe((res: any) => {
      if (res.success) {
        this.imdChannel_dropdownList = res.channelList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }




  




  scrollToTop(): void {
    
    const timeoutDelay = 1000;
    setTimeout(() => {
      const targetDiv = document.getElementById('targetDiv');
      // console.log("target", targetDiv)
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.gwpLifeCycle_inYears_line()
      }else {
        // console.error("Target div not found or null.");
      }
    }, timeoutDelay);
  }
  

  // scrollToDiv() {
  //   const targetElement = this.targetDiv.nativeElement;
  //   targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }



  // openSnackBar() {
  //   // first func call

  //   setTimeout(() => {
  //       // 2nd func call
  //   }, 600000);
  // }

  backBtnClicked(){
    this.segmentation_search_staatus = false
    this.gender_selected = ''
    this.maritalStatus_selected = ''
    this.ageGroup_selected = ''
    this.state_selected = ''
    this.subChnnel_selected = ''
    this.backgroundBucket_selected = ''
    this.prevExp_selected = ''
    this.prevExpYr_selected = ''
    this.areaExperience_selected = ''
    this.lob_selected = ''
    this.workingType_selected = ''
    this.incomeBucket_selected = ''

  }



  openPersonalData(){
    this.personalDetailsArrow = 'open'
  }

  closePersonalData(){
    this.personalDetailsArrow = 'close'
  }



  // getStateWiseLOBDistPie(zone:any, state: any){

  
  
  //   const data = {
  //     // triggerDate: '2024-02-05',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //     state: this.state_branding_pie,
  //     zone: zone,
  //   }
  
  //   this.rest.getStateWiseLOBDistPie(data).subscribe((res: any) => {
  //     if (res.success) {
  //       console.log("@@@@@@---->",res.level_data, res.imdData.IMD_COUNT)
  
        
        
        

  //       let chartData = [] as any;
        
  //       for (let i = 0; i < (res.level_data).length; i++) {
  //         chartData.push(
  //           { "name": res.level_data[i], "y": res.imdData.IMD_COUNT[i] }
  //         );
  //       } 

  //       console.log("chartData----------->>",chartData)        

  //       const chartOptions: Highcharts.Options = {
  //         // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
  //         // colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
  //         colors: [
  //           'rgb(255, 99, 132)',    // Red
  //           'rgb(54, 162, 235)',     // Blue
  //           'rgb(75, 192, 192)',     // Green
  //           'rgb(255, 206, 86)',     // Yellow
  //           'rgb(153, 102, 255)',    // Purple
  //           'rgb(255, 159, 64)',     // Orange
  //           'rgb(0, 255, 255)'       // Cyan
  //         ],
  //         chart: {
  //           type: 'pie',
  //           width: 600,
  //           height: 450,
  //           // style:{
  //           //   width: 400,
  //           //   height:400,
  //           // }
  //         },
  //         credits: {
  //           enabled: false,
  //         },
  //         title: {
  //           // text: 'LOB Wise GWP' ,
  //           text: '',
  //         },
  //         // subtitle: {
  //         //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
  //         // },
  //         tooltip: {
  //           valueSuffix: ''
  //         },
  //         plotOptions: {
  //           pie: {
  //             allowPointSelect: true,
  //             cursor: 'pointer',
  //             dataLabels: {
  //               enabled: true,
  //               format: '{point.name}: {point.percentage:.1f}%'
  //             },
  //             showInLegend: false
  //           }
  //         },

  //         series:[
  //           {
  //             type: "pie",
              
  //             data: chartData,

  //             name: 'IMD Count',
      
  //             states: {
  //               hover: {
  //                 // color: '#BADA55',
  //                 color: "#87d2ed"
  //               }
  //             },
  //             dataLabels: {
  //               enabled: true,
  //               format: '{point.name}: {point.percentage:.1f}%'
  //             },
  //             point: {
  //               events: {
      
  //                 // click: this.setStateName.bind(this)
                  
                  
  //               }
  //             }
  //           }
  //         ],
          
  //       }


  //       Highcharts.chart('getStateWiseLOBDistPie_highchart', chartOptions);
  
        
        
  //     }
      
    
    
  //   })
  
  
  // }


  
  AgentSegmentWise_zh_ytd_contri_pieChart(selected: any){
    // let chartData = [] as any

    // if(this.selectedSegment_pie == ''){selected = '1'}

    
    // if(selected == '1'){
    //   chartData = [{ "name": 'Vaibhavi', "y": 30 }, { "name": 'Prakrati', "y": 15 }, { "name": 'Ikramul', "y": 45 }, { "name": 'Farhatul', "y": 10 }]
    // }
    // if(selected == '2'){
    //   chartData = [{ "name": 'Vaibhavi', "y": 20 }, { "name": 'Prakrati', "y": 38 }, { "name": 'Ikramul', "y": 29 }, { "name": 'Farhatul', "y": 13 }]
    // }

    // if(selected == 3){
    //   chartData = [{ "name": 'Vaibhavi', "y": 15 }, { "name": 'Prakrati', "y": 27 }, { "name": 'Ikramul', "y": 18 }, { "name": 'Farhatul', "y": 40 }]
    // }
    // if(selected == 4){
    //   chartData = [{ "name": 'Vaibhavi', "y": 35 }, { "name": 'Prakrati', "y": 20 }, { "name": 'Ikramul', "y": 8 }, { "name": 'Farhatul', "y": 37 }]
    // }
    // if(selected == 5){
    //   chartData = [{ "name": 'Vaibhavi', "y": 19 }, { "name": 'Prakrati', "y": 23 }, { "name": 'Ikramul', "y": 13 }, { "name": 'Farhatul', "y": 45 }]
    // }









    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };
  
  
    this.rest.get_segmentwise_zonal_head(data).subscribe((res: any) => {
      if(res.success){
  
        let chartData = res.data


        const chartOptions: Highcharts.Options = {
          // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
          // colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
          colors: [
            'rgb(255, 99, 132)',    // Red
            'rgb(54, 162, 235)',     // Blue
            'rgb(75, 192, 192)',     // Green
            'rgb(255, 206, 86)',     // Yellow
            'rgb(153, 102, 255)',    // Purple
            'rgb(255, 159, 64)',     // Orange
            'rgb(0, 255, 255)'       // Cyan
          ],
          chart: {
            type: 'pie',
            width: 600,
            height: 450,
            // style:{
            //   width: 400,
            //   height:400,
            // }
          },
          credits: {
            enabled: false,
          },
          title: {
            // text: 'LOB Wise GWP' ,
            text: '',
          },
          // subtitle: {
          //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
          // },
          tooltip: {
            valueSuffix: '%'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f}%',
                style: {
                  fontSize: '15px'
                }
              },
              showInLegend: false
            }
          },
    
          series:[
            {
              type: "pie",
              
              data: chartData,
    
              name: 'IMD Count',
      
              states: {
                hover: {
                  // color: '#BADA55',
                  color: "#87d2ed",
    
                  
                  
    
                }
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f}%',
                style: {
                  fontSize: '15px',
                  fontWeight: '500'
                }
    
              },
              point: {
                events: {
      
                  // click: this.setStateName.bind(this)
                  
                  
                }
              }
            }
          ],
          
        }
    
    
        Highcharts.chart('agentSegmentWiseZonalHeadYTDContri', chartOptions);



      }else{

      }
    });






    



    
  }

  // scrollToTarget() {
  //   // const element = document.getElementById(targetId);
  //   // if (element) {
  //   //   this.scroller.scrollToAnchor(targetId);
  //   // } else {
  //   //   console.error("Target element not found");
  //   // }
  //   // var document: Document;

  //   let targetId = 'target-element'
  //   // document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' })
  //   // this.scroller.scrollToAnchor(targetId);


  //   this.scrollToElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  // }





  newAgent_LM_contri_pieChart(data: any){
    // let chartData = [{ "name": 'Steady Performers', "y": 25 }, { "name": 'Potential Business Drivers', "y": 16 }, { "name": 'Low Quality of Business', "y": 20 }, { "name": 'Alarming', "y": 50 }, { "name": 'Laggard', "y": 75 }] as any

    let chartData = data

    let pieWidth = 315
    if(window.innerWidth > 1370){
      pieWidth = 400
    }
    
    const chartOptions: Highcharts.Options = {
      // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
      // colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
      colors: [
        'rgb(75, 192, 192)',     // Green
        'rgb(0, 255, 255)',       // Cyan
        'rgb(255, 159, 64)',     // Orange
        'rgb(255, 206, 86)',     // Yellow
        'rgb(255, 99, 132)',    // Red
        'rgb(54, 162, 235)',     // Blue
        'rgb(153, 102, 255)',    // Purple
      ],
      chart: {
        type: 'pie',
        spacing: [0, 0, 0, -20],
        // width: 400,
        // width: 315,
        width: pieWidth,
        // height: 300,
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: 'LOB Wise GWP' ,
        text: '',
      },
      // subtitle: {
      //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      // },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: -10,
            format: '{point.name}: {point.percentage:.1f}%'
          },
          showInLegend: false,
        }
      },

      series:[
        {
          type: "pie",
          
          data: chartData,

          name: 'Contribution',
  
          states: {
            hover: {
              // color: '#BADA55',
              color: "#87d2ed",

              
              

            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%',
            style: {
              fontSize: '10px',
              fontWeight: 'bold',
            }

          },
          point: {
            events: {
  
              // click: this.setStateName.bind(this)
              
              
            }
          }
        }
      ],
      
    }


    Highcharts.chart('newAgentLmContri', chartOptions);
  }






  newAgent_MTD_contri_pieChart(data: any){
    // let chartData = [{ "name": 'Steady Performers', "y": 7 }, { "name": 'Potential Business Drivers', "y": 13 }, { "name": 'Low Quality of Business', "y": 20 }, { "name": 'Alarming', "y": 33 }, { "name": 'Laggard', "y": 27 }] as any

    let chartData = data

    let pieWidth = 325
    if(window.innerWidth > 1370){
      pieWidth = 410
    }
    
    const chartOptions: Highcharts.Options = {
      // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
      // colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
      colors: [
        'rgb(75, 192, 192)',     // Green
        'rgb(0, 255, 255)',       // Cyan
        'rgb(255, 159, 64)',     // Orange
        'rgb(255, 206, 86)',     // Yellow
        'rgb(255, 99, 132)',    // Red
        'rgb(54, 162, 235)',     // Blue
        'rgb(153, 102, 255)',    // Purple

        // '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
      ],
      chart: {
        type: 'pie',
        // width: 410,
        width: pieWidth,
        // height: 300,
        
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: 'LOB Wise GWP' ,
        text: '',
      },
      // subtitle: {
      //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      // },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: -10,
            format: '{point.name}: {point.percentage:.1f}%',
            style: {
              fontSize: '10px'
            }
            
          },
          showInLegend: false
        }
      },

      series:[
        {
          type: "pie",
          
          data: chartData,

          name: 'Contribution',
  
          states: {
            hover: {
              // color: '#BADA55',
              color: "#87d2ed",

              
              

            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%',
            style: {
              fontSize: '10px',
              fontWeight: 'bold'
            }

          },
          point: {
            events: {
  
              // click: this.setStateName.bind(this)
              
              
            }
          }
        }
      ],
      
    }


    Highcharts.chart('newAgentMtdContri', chartOptions);
  }




  get_segment_overview(){
    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };


    this.rest.get_segment_overview(data).subscribe((res: any) => {
      if(res.success){
        this.segmentOverviewTableData = res.data
      }
    });
  }



  get_segment_overview2(){
    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };


    this.rest.get_segment_overview_new(data).subscribe((res: any) => {
      if(res.success){
        this.segmentOverviewTable_2_Data = res.data1
        this.segmentOverviewTable_3_Data = res.data2
      }
    });
  }



  segment_overview_updated_gi(){
    // const data = {
    //   userName: this.userName,
    //   userAgentId: this.userAgentId,
    //   userDesignation: this.userDesignation,
    //   selectedMonthYear: this.selectedMonthYear,  // it will have single value
    //   selectedChannel: this.selectedChannel,
    //   selectedSubChannel: this.selectedSubChannel,
    //   selectedLocation: this.selectedLocation,
    //   selectedState: this.selectedZone,
    //   selectedZone: this.selectedZone,
    // };


    this.rest.segment_overview_updated().subscribe((res: any) => {
      if(res.success){
        this.updatedSegmentOverviewTable_gi = res.data1
        
      }
    });
  }



  segment_overview_updated_non_gi(){
    // const data = {
    //   userName: this.userName,
    //   userAgentId: this.userAgentId,
    //   userDesignation: this.userDesignation,
    //   selectedMonthYear: this.selectedMonthYear,  // it will have single value
    //   selectedChannel: this.selectedChannel,
    //   selectedSubChannel: this.selectedSubChannel,
    //   selectedLocation: this.selectedLocation,
    //   selectedState: this.selectedZone,
    //   selectedZone: this.selectedZone,
    // };


    this.rest.segment_overview_updated_non_gi().subscribe((res: any) => {
      if(res.success){
        this.updatedSegmentOverviewTable_nongi = res.data1
      }
    });
  }






  agentSegmentWiseVarComparison(){


    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };


    this.rest.get_segment_variable_comparison(data).subscribe((res: any) => {
      if(res.success){

        let chartData_gi = res.data1
        let chartData_nongi = res.data2

        // let chartData_gi = [{ "name": 'Steady Performers', "y": 45 }, { "name": 'Potential Business Drivers', "y": 70 }, { "name": 'Low Quality of Business', "y": 82 }, { "name": 'Alarming', "y": 25 }, { "name": 'Laggard', "y": 22 }] as any

        let colors = [
              'rgb(75, 192, 192)',     // Green
              'rgb(0, 255, 255)',       // Cyan
              'rgb(255, 159, 64)',     // Orange
              'rgb(255, 206, 86)',     // Yellow
              'rgb(255, 99, 132)',    // Red
              'rgb(54, 162, 235)',     // Blue
              'rgb(153, 102, 255)',    // Purple
      
              '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
        ]
    
        for( let i = 0; i < chartData_gi.length; i++){
    
          chartData_gi[i]['color'] = colors[i]
    
        }

        
    
        const chartOptions_gi: Highcharts.Options = {
          chart: {
            type: 'column',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: 'GI', // You can add title here
          },
          xAxis: {
            categories: chartData_gi.map((data:any) => data.name), // X-axis labels
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
              data: chartData_gi.map((data:any) => ({
                y: data.y,
                color: data.color,
              })),
            },
          ],
        };
    
        Highcharts.chart('agentSegmentWiseVarComparison', chartOptions_gi);








        for( let i = 0; i < chartData_nongi.length; i++){
    
          chartData_nongi[i]['color'] = colors[i]
    
        }

        const chartOptions_nongi: Highcharts.Options = {
          chart: {
            type: 'column',
          },
          credits: {
            enabled: false,
          },
          title: {
            text: 'Non - GI', // You can add title here
          },
          xAxis: {
            categories: chartData_nongi.map((data:any) => data.name), // X-axis labels
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
              data: chartData_nongi.map((data:any) => ({
                y: data.y,
                color: data.color,
              })),
            },
          ],
        };
    
        Highcharts.chart('agentSegmentWiseVarComparison_nongi', chartOptions_nongi);

      }
    });


    




  }







  

  newAgent_LM_contribution(data: any){

    // let chartData = [{ "name": 'Target', "y": 550 }, { "name": 'Achievement', "y": 150 }] as any
    let chartData = data

    let colors = [
          'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
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

    Highcharts.chart('newAgent_LM_contribution', chartOptions);




  }



  
  newAgent_MTD_contribution(data: any){


    // let chartData = [{ "name": 'Target', "y": 420 }, { "name": 'Achievement', "y": 490 }] as any
    let chartData =  data

    let colors = [
          'rgb(0, 255, 255)',       // Cyan
          // 'rgb(255, 159, 64)',     // Orange
          '#70ff86'
    ]

    for( let i = 0; i < chartData.length; i++){

      chartData[i]['color'] = colors[i]

    }


    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '', // You can add title here
      },
      xAxis: {
        categories: chartData.map((data: any) => data.name), // X-axis labels
        labels: {
          // enabled: false, // Hide x-axis labels
          enabled: true, // Hide x-axis labels
          style: {
            fontSize: '15px',
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

    Highcharts.chart('newAgent_MTD_contribution', chartOptions);




  }










  
  // digitalFriendlinessTrend_line(){

  //   const chartData = {
  //     x_axis_category_list: [
  //       'LY',
  //       'CY',
  //       'CY Q1',
  //       'CY Q2',
  //       'CY Q3',
  //       'CY Q4'
  //     ],
  //     data: [
  //       {
  //         // type: 'line',
  //         name: 'Steady Performers',
  //         data: [
  //           70,
  //           82,
  //           76,
  //           85,
  //           84,
  //           82
  //         ]
  //       },
  //       {
  //         // type: 'line',
  //         name: 'Potential Business Drivers',
  //         data: [
  //           65,
  //           70,
  //           72,
  //           76,
  //           68,
  //           65
  //         ]
  //       },
  //       {
  //         // type: 'line',
  //         name: 'Low Quality of Business',
  //         data: [
  //           49,
  //           41,
  //           45,
  //           47,
  //           36,
  //           34
  //         ]
  //       },
  //       {
  //         // type: 'line',
  //         name: 'Alarming',
  //         data: [
  //           30,
  //           26,
  //           19,
  //           30,
  //           29,
  //           25
  //         ]
  //       },
  //       {
  //         // type: 'line',
  //         name: 'Laggard',
  //         data: [
  //           25,
  //           21,
  //           19,
  //           24,
  //           22,
  //           18
  //         ]
  //       },
  //     ],
      
  //   }



  //   const colors = [
  //     'rgb(75, 192, 192)',     // Green
  //     'rgb(0, 255, 255)',       // Cyan
  //     'rgb(255, 159, 64)',     // Orange
  //     'rgb(255, 206, 86)',     // Yellow
  //     'rgb(255, 99, 132)',    // Red
  //     'rgb(54, 162, 235)',     // Blue
  //     'rgb(153, 102, 255)',    // Purple

  //     '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
  //   ]

  //   let seriesData = chartData.data as any;


  //   try {
  //     // Code that may throw an exception
      

  //     for(let i = 0; i<seriesData.length; i++){
  //         seriesData[i]['type'] = 'line'
  //         seriesData[i]['color'] = colors[i]
  //     }

  //   } catch (error) {
  //     // Code to handle the exception
  //   } finally {
  //     // Code that will always execute, regardless of whether there was an exception

  //     let x_axis_category_list = chartData.x_axis_category_list as any

  //   const chartOptions: Highcharts.Options = {
  //     chart: {
  //       type: 'line',
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     title: {
  //       text: ''
  //     },
  //     subtitle: {
  //       text: ''
  //     },
  //     xAxis: {
  //       categories: x_axis_category_list,
  //       labels: {
  //         style: {
  //           fontSize: '15px' // Font size for x-axis labels
  //         }
  //       }
  //     },
  //     yAxis: {
  //       visible: false, // Hide the y-axis
  //       gridLineWidth: 0, // Remove grid lines
  //       title: {
  //         text: 'Percentage'
  //       }
  //     },
  //     plotOptions: {
  //       line: {
  //         dataLabels: {
  //           enabled: true,
  //           formatter: function () {
  //             return this.y + '%'; // Display value on top of every bar
  //           },
  //           style: {
  //             fontSize: '15px'
  //           }
  //         },
          
  //         // enableMouseTracking: false
  //       }
  //     },
      
  //     series: seriesData,
  //   };

  //   Highcharts.chart('digitalFriendlinessTrend_line', chartOptions);
  //   }


    

    




  // }

//   digitalFriendlinessTrend_line(){

//     const chartData = {
//       x_axis_category_list: [
//         'LY',
//         'CY',
//         'CY Q1',
//         'CY Q2',
//         'CY Q3',
//         'CY Q4'
//       ],
//       data: [
//         {
//           // type: 'line',
//           name: 'Steady Performers',
//           data: [
//             70,
//             82,
//             76,
//             85,
//             84,
//             82
//           ]
//         },
//         {
//           // type: 'line',
//           name: 'Potential Business Drivers',
//           data: [
//             65,
//             70,
//             72,
//             76,
//             68,
//             65
//           ]
//         },
//         {
//           // type: 'line',
//           name: 'Low Quality of Business',
//           data: [
//             49,
//             41,
//             45,
//             47,
//             36,
//             34
//           ]
//         },
//         {
//           // type: 'line',
//           name: 'Alarming',
//           data: [
//             30,
//             26,
//             19,
//             30,
//             29,
//             25
//           ]
//         },
//         {
//           // type: 'line',
//           name: 'Laggard',
//           data: [
//             25,
//             21,
//             19,
//             24,
//             22,
//             18
//           ]
//         },
//       ],
//     };

//     const colors = [
//       'rgb(75, 192, 192)',     // Green
//       'rgb(0, 255, 255)',       // Cyan
//       'rgb(255, 159, 64)',     // Orange
//       'rgb(255, 206, 86)',     // Yellow
//       'rgb(255, 99, 132)',    // Red
//       'rgb(54, 162, 235)',     // Blue
//       'rgb(153, 102, 255)',    // Purple
//       '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
//     ];

//     let seriesData = chartData.data as any;

//     // let x_axis_category_list = chartData.x_axis_category_list as any;

//     try {
//       // Code that may throw an exception

//       for(let i = 0; i<chartData.data.length; i++){
//           seriesData[i]['type'] = 'line';
//           seriesData[i]['color'] = colors[i];
//       }

//     } catch (error) {
//       // Code to handle the exception
//     } finally {
//       // Code that will always execute, regardless of whether there was an exception

//       const chartOptions: Highcharts.Options = {
//         chart: {
//           type: 'line',
//         },
//         credits: {
//           enabled: false,
//         },
//         title: {
//           text: ''
//         },
//         subtitle: {
//           text: ''
//         },
//         xAxis: {
//           categories: chartData.x_axis_category_list,
//           labels: {
//             style: {
//               fontSize: '15px' // Font size for x-axis labels
//             }
//           }
//         },
//         yAxis: {
//           visible: false, // Hide the y-axis
//           gridLineWidth: 0, // Remove grid lines
//           title: {
//             text: 'Percentage'
//           }
//         },
//         plotOptions: {
//           line: {
//             dataLabels: {
//               enabled: true,
//               formatter: function () {
//                 return this.y + '%'; // Display value on top of every bar
//               },
//               style: {
//                 fontSize: '15px'
//               }
//             }
//           }
//         },
//         series: seriesData,
//       };

//       Highcharts.chart('digitalFriendlinessTrend_line', chartOptions);
//     }
// }



//   digitalFriendlinessTrend_line() {
//   const chartData = {
//       x_axis_category_list: [
//           'LY',
//           'CY',
//           'CY Q1',
//           'CY Q2',
//           'CY Q3',
//           'CY Q4'
//       ],
//       data: [
//           {
//               // type: 'line',
//               name: 'Steady Performers',
//               data: [
//                   70,
//                   82,
//                   76,
//                   85,
//                   84,
//                   82
//               ]
//           },
//           {
//               // type: 'line',
//               name: 'Potential Business Drivers',
//               data: [
//                   65,
//                   70,
//                   72,
//                   76,
//                   68,
//                   65
//               ]
//           },
//           {
//               // type: 'line',
//               name: 'Low Quality of Business',
//               data: [
//                   49,
//                   41,
//                   45,
//                   47,
//                   36,
//                   34
//               ]
//           },
//           {
//               // type: 'line',
//               name: 'Alarming',
//               data: [
//                   30,
//                   26,
//                   19,
//                   30,
//                   29,
//                   25
//               ]
//           },
//           {
//               // type: 'line',
//               name: 'Laggard',
//               data: [
//                   25,
//                   21,
//                   19,
//                   24,
//                   22,
//                   18
//               ]
//           },
//       ],
//   };

//   const colors = [
//       'rgb(75, 192, 192)',     // Green
//       'rgb(0, 255, 255)',       // Cyan
//       'rgb(255, 159, 64)',     // Orange
//       'rgb(255, 206, 86)',     // Yellow
//       'rgb(255, 99, 132)',    // Red
//       'rgb(54, 162, 235)',     // Blue
//       'rgb(153, 102, 255)',    // Purple
//       '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
//   ];

//   let seriesData = chartData.data as any;

//   for (let i = 0; i < chartData.data.length; i++) {
//       seriesData[i]['type'] = 'line';
//       seriesData[i]['color'] = colors[i];
//   }

//   const createChart = () => {
//       const chartOptions: Highcharts.Options = {
//           chart: {
//               type: 'line',
//           },
//           credits: {
//               enabled: false,
//           },
//           title: {
//               text: ''
//           },
//           subtitle: {
//               text: ''
//           },
//           xAxis: {
//               categories: chartData.x_axis_category_list,
//               labels: {
//                   style: {
//                       fontSize: '15px' // Font size for x-axis labels
//                   }
//               }
//           },
//           yAxis: {
//               visible: false, // Hide the y-axis
//               gridLineWidth: 0, // Remove grid lines
//               title: {
//                   text: 'Percentage'
//               }
//           },
//           plotOptions: {
//               line: {
//                   dataLabels: {
//                       enabled: true,
//                       formatter: function () {
//                           return this.y + '%'; // Display value on top of every bar
//                       },
//                       style: {
//                           fontSize: '15px'
//                       }
//                   }
//               }
//           },
//           series: seriesData,
//       };

//       Highcharts.chart('digitalFriendlinessTrend_line', chartOptions);
//   };

//   createChart();
// }




// import * as Highcharts from 'highcharts';

digitalFriendlinessTrend_line() {

  // get_segment_digital_friendlieness_trend

  const data = {
    userName: this.userName,
    userAgentId: this.userAgentId,
    userDesignation: this.userDesignation,
    selectedMonthYear: this.selectedMonthYear,  // it will have single value
    selectedChannel: this.selectedChannel,
    selectedSubChannel: this.selectedSubChannel,
    selectedLocation: this.selectedLocation,
    selectedState: this.selectedZone,
    selectedZone: this.selectedZone,
  };
  


  this.rest.get_segment_digital_friendlieness_trend(data).subscribe((res: any) => {
    if(res.success){


      

      let x_axis_category_list = res.x_axis_category_list   
      let chartData_gi = res.data1
      let chartData_nongi = res.data2




      const colors = [
        'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
        'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
        'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ];
    
    const colorPalette = (index: number) => colors[index % colors.length];
    
    const seriesData_gi: Highcharts.SeriesOptionsType[] = chartData_gi.map((item: any, index: any) => ({
        name: item.name,
        data: [item.data],
        type: 'column',
        color: colorPalette(index),
    }));
    
    const seriesData_nongi: Highcharts.SeriesOptionsType[] = chartData_nongi.map((item: any, index: any) => ({
        name: item.name,
        data: [item.data],
        type: 'column',
        color: colorPalette(index),
    }));

    // console.log('seriesData_gi----> ', seriesData_gi)
    // console.log('seriesData_nongi----> ', seriesData_nongi)
    
    const createLineChart = (containerId: string, titleText: string, seriesData: Highcharts.SeriesOptionsType[]) => {
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'column',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: titleText,
            },
            xAxis: {
                categories: x_axis_category_list,
                labels: {
                  enabled: false,
                  style: {
                      fontSize: '15px',
                  },
                },
                
            },
            yAxis: {
                visible: false,
                gridLineWidth: 0,
                title: {
                    text: 'Percentage',
                },
            },
            // plotOptions: {
            //     line: {
            //         dataLabels: {
            //             enabled: true,
            //             formatter: function () {
            //                 return Highcharts.numberFormat(this.y, 2) + '%';
            //             },
            //             style: {
            //                 fontSize: '15px',
            //             },
            //         },
            //     },
            // },
            // plotOptions: {
            //                 line: {
            //                     dataLabels: {
            //                         enabled: true,
            //                         formatter: function () {
            //                             return this.y + '%'; // Display value on top of every bar
            //                         },
            //                         style: {
            //                             fontSize: '15px'
            //                         }
            //                     }
            //                 }
            //             },


            tooltip: {
              valueSuffix: '',
              formatter: function () {
                return `<b>${this.series.name}</b>: ${this.y}%`;
              },
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'; // Display value on top of every bar
                        },
                        style: {
                            fontSize: '15px'
                        }
                    },
                }
            },
            series: seriesData,
        };
    
        Highcharts.chart(containerId, chartOptions);
    };
    
    createLineChart('digitalFriendlinessTrend_line', 'GI', seriesData_gi);
    createLineChart('digitalFriendlinessTrend_line_nongi', 'Non-GI', seriesData_nongi);
    











    //   const colors = [
    //       'rgb(75, 192, 192)',     // Green
    //       'rgb(0, 255, 255)',       // Cyan
    //       'rgb(255, 159, 64)',     // Orange
    //       'rgb(255, 206, 86)',     // Yellow
    //       'rgb(255, 99, 132)',    // Red
    //       'rgb(54, 162, 235)',     // Blue
    //       'rgb(153, 102, 255)',    // Purple
    //       '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    //   ];

    //   const seriesData_gi: Highcharts.SeriesOptionsType[] = chartData_gi.data.map((item: any, index: any) => ({
    //       ...item,
    //       data: [item.data],
    //       type: 'line',
    //       color: colors[index]
    //   }));

    //   const createChart = () => {
    //       const chartOptions: Highcharts.Options = {
    //           chart: {
    //               type: 'line',
    //           },
    //           credits: {
    //               enabled: false,
    //           },
    //           title: {
    //               text: 'GI'
    //           },
    //           subtitle: {
    //               text: ''
    //           },
    //           xAxis: {
    //               categories: x_axis_category_list,
    //               labels: {
    //                   style: {
    //                       fontSize: '15px' // Font size for x-axis labels
    //                   }
    //               }
    //           },
    //           yAxis: {
    //               visible: false, // Hide the y-axis
    //               gridLineWidth: 0, // Remove grid lines
    //               title: {
    //                   text: 'Percentage'
    //               }
    //           },
    //           plotOptions: {
    //               line: {
    //                   dataLabels: {
    //                       enabled: true,
    //                       formatter: function () {
    //                           return this.y + '%'; // Display value on top of every bar
    //                       },
    //                       style: {
    //                           fontSize: '15px'
    //                       }
    //                   }
    //               }
    //           },
    //           series: seriesData_gi,
    //       };

    //       Highcharts.chart('digitalFriendlinessTrend_line', chartOptions);
    //   };

    //   createChart();







    //   const seriesData_nongi: Highcharts.SeriesOptionsType[] = chartData_nongi.data.map((item: any, index: any) => ({
    //     ...item,
    //     data: [item.data],
    //     type: 'line',
    //     color: colors[index]
    // }));

    // const createChart_nongi = () => {
    //     const chartOptions: Highcharts.Options = {
    //         chart: {
    //             type: 'line',
    //         },
    //         credits: {
    //             enabled: false,
    //         },
    //         title: {
    //             text: 'Non - GI'
    //         },
    //         subtitle: {
    //             text: ''
    //         },
    //         xAxis: {
    //             categories: x_axis_category_list,
    //             labels: {
    //                 style: {
    //                     fontSize: '15px' // Font size for x-axis labels
    //                 }
    //             }
    //         },
    //         yAxis: {
    //             visible: false, // Hide the y-axis
    //             gridLineWidth: 0, // Remove grid lines
    //             title: {
    //                 text: 'Percentage'
    //             }
    //         },
    //         plotOptions: {
    //             line: {
    //                 dataLabels: {
    //                     enabled: true,
    //                     formatter: function () {
    //                         return this.y + '%'; // Display value on top of every bar
    //                     },
    //                     style: {
    //                         fontSize: '15px'
    //                     }
    //                 }
    //             }
    //         },
    //         series: seriesData_nongi,
    //     };

    //     Highcharts.chart('digitalFriendlinessTrend_line_nongi', chartOptions);
    // };

    // createChart_nongi();

    }
  });


    
}





  gwpLifeCycle_inYears_line(){

    let chartData = {
      x_axis_category_list: [
        'Up to 1 Year',
        '2 to 5 Years',
        '6 to 8 Years',
        '8 to 10 Years',
        'Above 10 Years',
      ],
      data: [
        {
          type: 'line',
          name: 'GWP',
          data: [
            0.4,
            1.5,
            1.4,
            1.1,
            0.9,
          ]
        },
        
      ],
      
    }



    let colors = [
      // 'rgb(75, 192, 192)',     // Green
      // 'rgb(0, 255, 255)',       // Cyan
      // 'rgb(255, 159, 64)',     // Orange
      // 'rgb(255, 206, 86)',     // Yellow
      // 'rgb(255, 99, 132)',    // Red
      // 'rgb(54, 162, 235)',     // Blue
      'rgb(153, 102, 255)',    // Purple

      // '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ]
    let seriesData = chartData.data as any;

    for(let i = 0; i<seriesData.length; i++){
        seriesData[i]['type'] = 'line'
        seriesData[i]['color'] = colors[i]
    }

    // console.log("------seriesData------>> ", seriesData)


    let x_axis_category_list = chartData.x_axis_category_list as any

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'line',
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
        categories: x_axis_category_list,
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
          text: 'Percentage'
        }
      },
      tooltip: {
        valueSuffix: 'Lacs',
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + ''; // Display value on top of every bar
            },
            style: {
              fontSize: '15px' // Font size for x-axis labels
            }
          },
          
          // enableMouseTracking: false
        }
      },
      
      series: seriesData,
    };

    Highcharts.chart('gwpLifeCycle_inYears_line', chartOptions);

    




  }






  // averageMeetingsWithAgentsYTD_groupColumn(){

  //   let givenData = {
  //     x_axis_categories: ['Sales Review', 'Trainings', 'Support Meetings'],
  //     data:[
  //               {
                    
  //                   name: 'Steady Performers',
  //                   data: [12,5,19]
  //               },
  //               {
                    
  //                   name: 'Potential Business Drivers',
  //                   data: [12,3,16]
  //               },
  //               {
                    
  //                   name: 'Low Quality of Business',
  //                   data: [12,1,8]
  //               },
  //               {
                    
  //                   name: 'Alarming',
  //                   data: [12,2,19]
  //               },
  //               {
                    
  //                 name: 'Laggard',
  //                 data: [15,6,22]
  //               },
  //           ]
  //   }

  //   let segmentWiseData = givenData.data  as any


  //   let colors = [
  //     'rgb(75, 192, 192)',     // Green
  //     'rgb(0, 255, 255)',       // Cyan
  //     'rgb(255, 159, 64)',     // Orange
  //     'rgb(255, 206, 86)',     // Yellow
  //     'rgb(255, 99, 132)',    // Red
  //   ]


  //   let chartData = [] as any



  //   try {
  //     // Code that may throw an exception
  //     for (let segment = 0; segment < segmentWiseData.length; segment++) {
  //       var singleSeriesData = {
  //           'name': segmentWiseData[segment].name,
  //           'type': 'column',
  //           'color': colors[segment] // Assign color to the entire series
  //       } as any;
    
  //       var single_dataObj_list = [] as any;
    
  //       for (let dataPerSegment = 0; dataPerSegment < segmentWiseData[segment].data.length; dataPerSegment++) {
  //           var element = {
  //               'y': segmentWiseData[segment].data[dataPerSegment]
  //           } as any;
  //           single_dataObj_list.push(element);
  //       }
    
  //       singleSeriesData['data'] = single_dataObj_list;
  //       chartData.push(singleSeriesData);
  //     }



  //   } catch (error) {
  //     // Code to handle the exception
  //   } finally {
  //     // Code that will always execute, regardless of whether there was an exception




  //   const chartOptions: Highcharts.Options = {
  //     chart: {
  //         type: 'column',
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     title: {
  //         text: '',
  //         align: 'left'
  //     },
  //     subtitle: {
  //         text: '',
  //         align: 'left'
  //     },
  //     xAxis: {
  //         categories: givenData.x_axis_categories,
  //         crosshair: true,
  //         accessibility: {
  //             description: '' // for x axis main categories
  //         }
  //     },
  //     yAxis: {
  //         min: 0,
  //         title: {
  //             text: ''
  //         },
  //         visible: false, // Hide the y-axis
  //         gridLineWidth: 0, // Remove grid lines
  //     },
  //     tooltip: {
  //         valueSuffix: ''
  //     },
  //     plotOptions: {
  //         column: {
  //             pointPadding: 0.2,
  //             borderWidth: 0,
  //             // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
  //             dataLabels: {
  //               enabled: true,
  //               formatter: function () {
  //                 return this.y + ''; // Display value on top of every bar
  //               },
  //               style: { 
  //                 fontSize: '15px'
  //               }
  //             },
  //         }
  //     },

  //     series: chartData,
  //   };

  //   Highcharts.chart('averageMeetingsWithAgentsYTD_groupColumn', chartOptions);

  //   }


    

  //   // console.log("chartData -- averageMeetingsWithAgentsYTD_groupColumn", chartData)


    
  // }


  averageMeetingsWithAgentsYTD_groupColumn() {

    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };
  
  
    this.rest.get_average_meetings_ytd(data).subscribe((res: any) => {
      if(res.success){
        
        // for GI
        // let givenData = res

        // let givenData = {
        //   "data1": [
        //     {
        //       "data": [
        //         3215
        //       ], 
        //       "name": "Eagles"
        //     }, 
        //     {
        //       "data": [
        //         3192
        //       ], 
        //       "name": "Dolphins"
        //     }, 
        //     {
        //       "data": [
        //         911
        //       ], 
        //       "name": "Bees"
        //     }, 
        //     {
        //       "data": [
        //         397
        //       ], 
        //       "name": "Kittens"
        //     }, 
        //     {
        //       "data": [
        //         523
        //       ], 
        //       "name": "Elephants"
        //     }, 
        //     {
        //       "data": [
        //         450
        //       ], 
        //       "name": "Moles"
        //     }, 
        //     {
        //       "data": [
        //         135
        //       ], 
        //       "name": "Caterpillars"
        //     }, 
        //     {
        //       "data": [
        //         110
        //       ], 
        //       "name": "Sloths"
        //     }
        //   ], 
        //   "data2": [
        //     {
        //       "data": [
        //         1635
        //       ], 
        //       "name": "Eagles"
        //     }, 
        //     {
        //       "data": [
        //         2403
        //       ], 
        //       "name": "Dolphins"
        //     }, 
        //     {
        //       "data": [
        //         1230
        //       ], 
        //       "name": "Moles"
        //     }, 
        //     {
        //       "data": [
        //         1053
        //       ], 
        //       "name": "Elephants"
        //     }, 
        //     {
        //       "data": [
        //         494
        //       ], 
        //       "name": "Pig"
        //     }, 
        //     {
        //       "data": [
        //         35
        //       ], 
        //       "name": "Bees"
        //     }, 
        //     {
        //       "data": [
        //         208
        //       ], 
        //       "name": "Caterpillars"
        //     }, 
        //     {
        //       "data": [
        //         175
        //       ], 
        //       "name": "Sloths"
        //     }
        //   ], 
        //   "success": true, 
        //   "x_axis_categories1": [
        //     "Eagles", 
        //     "Dolphins", 
        //     "Bees", 
        //     "Kittens", 
        //     "Elephants", 
        //     "Moles", 
        //     "Caterpillars", 
        //     "Sloths"
        //   ], 
        //   "x_axis_categories2": [
        //     "Eagles", 
        //     "Dolphins", 
        //     "Moles", 
        //     "Elephants", 
        //     "Pig", 
        //     "Bees", 
        //     "Caterpillars", 
        //     "Sloths"
        //   ]
        // }
        





  
      let segmentWiseData_gi = res.data1 as any;
      let segmentWiseData_nongi = res.data2 as any;
  
      // let colors = [
      //     'rgb(75, 192, 192)',     // Green
      //     'rgb(0, 255, 255)',       // Cyan
      //     'rgb(255, 159, 64)',     // Orange
      //     'rgb(255, 206, 86)',     // Yellow
      //     'rgb(255, 99, 132)',    // Red
      // ];
      const colors = [
        'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
        'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
        'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
      ];

      let chartData_gi: Highcharts.SeriesColumnOptions[] = segmentWiseData_gi.map((segment:any, index:any) => ({
        name: segment.name,
        type: 'column',
        color: colors[index],
        // y: segment.data,
        // data: segment.data.map((value:any) => ({ y: value })), // Associate y-values correctly
        data: segment.data,
      }));

      let chartData_nongi: Highcharts.SeriesColumnOptions[] = segmentWiseData_nongi.map((segment:any, index:any) => ({
        name: segment.name,
        type: 'column',
        color: colors[index],
        // y: segment.data,
        // data: segment.data.map((value:any) => ({ y: value })), // Associate y-values correctly
        data: segment.data
      }));


      // console.log("----chartData_gi---> ", chartData_gi)
      // console.log("----chartData_nongi---> ", chartData_nongi)
  
      // try {



      // } catch (error) {
      //     // Code to handle the exception
      // } finally {
          



          const chartOptions_gi: Highcharts.Options = {
            chart: {
                type: 'column',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: 'GI',
                align: 'center'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: {
                categories: res.x_axis_category_list_1,
                // categories: segmentWiseData_gi.map((segment:any) => segment.name),
                // crosshair: true,
                accessibility: {
                    description: '' // for x axis main categories
                },
                title: {
                  text: ''
                },
                // visible: false,
                labels: {
                  enabled: false, // Disable x-axis labels if categories aren't needed
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'GI'
                },
                visible: false, // Hide the y-axis
                gridLineWidth: 0, // Remove grid lines
            },
            tooltip: {
                valueSuffix: '',
                formatter: function () {
                  return `<b>${this.series.name}</b>: ${this.y}`;
                },
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + ''; // Display value on top of every bar
                        },
                        style: {
                            fontSize: '15px'
                        }
                    },
                }
            },
            series: chartData_gi,
          };
          
  
          Highcharts.chart('averageMeetingsWithAgentsYTD_groupColumn', chartOptions_gi);









          // non gi section starts here

          const chartOptions_nongi: Highcharts.Options = {
            chart: {
                type: 'column',
            },
            credits: {
                enabled: false,
            },
            title: {
                text: 'Non - GI',
                align: 'center'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: {
                categories: res.x_axis_category_list_1,
                // categories: segmentWiseData_nongi.map((segment:any) => segment.name),
                // crosshair: true,
                accessibility: {
                    description: '' // for x axis main categories
                },
                title: {
                  text: ''
                },
                // visible: false,
                labels: {
                  enabled: false, // Disable x-axis labels if categories aren't needed
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Non GI'
                },
                visible: false, // Hide the y-axis
                gridLineWidth: 0, // Remove grid lines
            },
            tooltip: {
                valueSuffix: '',
                formatter: function () {
                  return `<b>${this.series.name}</b>: ${this.y}`;
                },
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + ''; // Display value on top of every bar
                        },
                        style: {
                            fontSize: '15px'
                        }
                    },
                }
            },
            series: chartData_nongi,
        };

        Highcharts.chart('averageMeetingsWithAgentsYTD_groupColumn_nonGI', chartOptions_nongi);


      // }



      }else{

      }
    });
  




    
  }








  zonalHeadWise_AgentSegmentContributionYTD_groupColumn(){

    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };
  
  
    this.rest.get_zonal_headwise_segment_contribution(data).subscribe((res: any) => {
      if(res.success){
  
        // let givenData = res.data

        let givenData = {
          x_axis_categories: ['Vaibhavi', 'Prakrati', 'Ikramul', 'Farhatul'],
          data:[
                    {
                        
                        name: 'Steady Performers',
                        data: [14,9,33,4]
                    },
                    {
                        
                        name: 'Potential Business Drivers',
                        data: [59,40,21,54]
                    },
                    {
                        
                        name: 'Low Quality of Business',
                        data: [6,12,11,13]
                    },
                    {
                        
                        name: 'Alarming',
                        data: [10,23,23,6]
                    },
                    {
                        
                      name: 'Laggard',
                      data: [11,16,12,23]
                    },
                ]
        }
    
        let segmentWiseData = givenData.data  as any
    
    
        let colors = [
          'rgb(75, 192, 192)',     // Green
          'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          'rgb(255, 206, 86)',     // Yellow
          'rgb(255, 99, 132)',    // Red
        ]
    
    
        let chartData = [] as any
    
        for (let segment = 0; segment < segmentWiseData.length; segment++) { // segment is index for segments
          var singleSeriesData = {
              'name': segmentWiseData[segment].name,
              'type': 'column',
              'color': colors[segment] // Assign color to the entire series
          } as any;
      
          var single_dataObj_list = [] as any;
      
          for (let dataPerSegment = 0; dataPerSegment < segmentWiseData[segment].data.length; dataPerSegment++) { // dataPerSegment is index for dataPerSegment
              var element = {
                  'y': segmentWiseData[segment].data[dataPerSegment]
              } as any;
              single_dataObj_list.push(element);
          }
      
          singleSeriesData['data'] = single_dataObj_list;
          chartData.push(singleSeriesData);
      }
    
        // console.log("chartData -- zonalHeadWise_AgentSegmentContributionYTD_groupColumn", chartData)
    
    
        
    
    
        const chartOptions: Highcharts.Options = {
          chart: {
              type: 'column',
          },
          credits: {
            enabled: false,
          },
          title: {
              text: '',
              align: 'left'
          },
          subtitle: {
              text: '',
              align: 'left'
          },
          xAxis: {
              categories: givenData.x_axis_categories,
              crosshair: true,
              accessibility: {
                  description: '' // for x axis main categories
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: ''
              },
              visible: false, // Hide the y-axis
              gridLineWidth: 0, // Remove grid lines
          },
          tooltip: {
              valueSuffix: '%'
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0,
                  // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                  dataLabels: {
                    enabled: true,
                    formatter: function () {
                      return this.y + '%'; // Display value on top of every bar
                    },
                    style: { 
                      fontSize: '15px'
                    }
                  },
              }
          },
    
          series: chartData,
        };
    
        Highcharts.chart('zonalHeadWise_AgentSegmentContributionYTD_groupColumn', chartOptions);



      }else{

      }
    });





    
  }














































laggard_checkPotential_SimilarAgents_vs_IdentifiedAgents() {

  const colors = [
    'rgb(54, 162, 235)',  // Blue for Identical Agents Performance
    'rgb(255, 159, 64)',  // Orange for Identified- Current Performance
    '#84cc16'   // Green for Identified - Expected Performance
  ];

  const chartData = {
      x_axis_category_list: [
          'Jan\'24', 'Feb\'24', 'Mar\'24', 'Apr\'24', 'May\'24', 'Jun\'24', 'Jul\'24', 'Aug\'24'
      ],
      data: [
          {
              name: 'Identical Agents Performance',
              data: [35, 32, 36, 37, 38, 39, 42, 41]
          },
          {
              name: 'Identified- Current & Expected Performance',
              // data: [22, 21, 23, 20, 28, 29, 31, 34] // Combined data for current and expected performance
              data: [
                { y: 22, marker: { fillColor: colors[1] }, performanceType: 'Current' },  // Orange for current performance
                { y: 21, marker: { fillColor: colors[1] }, performanceType: 'Current' },
                { y: 23, marker: { fillColor: colors[1] }, performanceType: 'Current' },
                { y: 20, marker: { fillColor: colors[1] }, performanceType: 'Current' },
                { y: 28, marker: { fillColor: colors[2] }, performanceType: 'Expected' },  // Green for expected performance
                { y: 29, marker: { fillColor: colors[2] }, performanceType: 'Expected' },
                { y: 31, marker: { fillColor: colors[2] }, performanceType: 'Expected' },
                { y: 34, marker: { fillColor: colors[2] }, performanceType: 'Expected' }
              ],
          }
      ]
  };

  

  const seriesData: Highcharts.SeriesOptionsType[] = [
      {
          name: 'Identified- Current & Expected Performance',
          data: chartData.data[1].data,
          type: 'line',
          lineWidth: 4,
          zoneAxis: 'x', // Define which axis zones will apply to
          zones: [
              {
                  value: 3, // Up to 4th index is current performance (solid line)
                  color: colors[1], // Orange for current
                  dashStyle: 'Solid', // Solid line for current performance
                  
              },
              {
                  color: colors[2], // Green for expected
                  dashStyle: 'Dot',  // Dotted line for expected performance
              }
          ],          

          marker: {
              enabled: true,
              symbol: 'circle',
              radius: 5, // Marker size
              // fillColor: colors[1], // Orange for current performance markers
              lineColor: '#FFFFFF',
              lineWidth: 2,
            //   fillColor: function () {
            //     // Use dynamic logic to assign color based on the point index
            //     const pointIndex = this.x; // Get the point index
            //     if (pointIndex < 4) { // Change according to your logic (first 4 points for 'Current Performance')
            //         return colors[1]; // Orange for current performance
            //     } else {
            //         return colors[2]; // Green for expected performance
            //     }
            // }
          },
          
      },
      {
          name: 'Identical Agents Performance',
          data: chartData.data[0].data,
          color: colors[0], // Blue for Identical Agents Performance
          type: 'line',
          lineWidth: 4,
          marker: {
              enabled: true,
              symbol: 'circle',
              radius: 5,
              fillColor: colors[0]
          }
      }
  ];

  const createChart = () => {
      const chartOptions: Highcharts.Options = {
          chart: {
              type: 'line',
          },
          credits: {
              enabled: false,
          },
          title: {
              text: ''
          },
          xAxis: {
              categories: chartData.x_axis_category_list,
              labels: {
                  // enabled:false,
                  style: {
                      fontSize: '15px'
                  }
              },
              plotLines: [{
                  color: '#4840d6',
                  width: 2,
                  value: 3, // Line dividing current from expected (where forecast starts) - for perpendicular dotted straight line
                  dashStyle: 'Dash',
                  zIndex: 2,
                  label: {
                      text: 'Expected Start',
                      rotation: 0,
                      y: 20,
                      style: {
                          color: '#333333'
                      }
                  }
              }]
          },
          yAxis: {
              visible: false,
              gridLineWidth: 0,
              title: {
                  text: 'Contribution'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true,
                      formatter: function () {
                          return this.y + ''; // Display value on top of each point
                      },
                      style: {
                          fontSize: '15px'
                      }
                  }
              }
          },
          legend: {
            enabled: false, // Disable the legend
          },
          series: seriesData,
      };

      Highcharts.chart('laggard_checkPotential_SimilarAgents_vs_IdentifiedAgents', chartOptions);
  };

  createChart();
}































  showLagardDetails(){
    this.lagardDetailsStatus = true
  }

  goBack(modal: any) {
    // if (this.search == 1) {
    //   this.closeModal();
    // } else {
    //   this.closeModal();
    //   this.openModal(modal, 1);

    // }
    this.closeModal(modal);
  }


  // openModal(modal: any) {
  //   // this.search = search;
  //   // this.modalService.open(modal, { centered: true, size: 'lg' });
  //   // this.modalService.open(modal, { centered: true, size: 'custom-modal' });
  //   this.modalService.open(modal, { centered: true, size: 'xl' });

  // }
  // closeModal(modal:any) {
  //   // this.modalService.dismissAll();
  //   this.modalService.dismissAll(modal);
  // }









  // Open modal and store reference by ID
  openModal(modalId: string, content: any) {
    const modalRef = this.modalService.open(content, { centered: true, size: 'xl' });
    this.modalRefs[modalId] = modalRef;
  }

  openCustomSizeModal(modalId: string, modalContent: any) {
    const modalRef = this.modalService.open(modalContent, {
      centered: true, // Optional: Center the modal
      windowClass: 'custom-modal-class' // Add custom class
    });
    this.modalRefs[modalId] = modalRef;
  }

  // Delete modal by ID
  closeModal(modalId: string) {
    if (this.modalRefs[modalId]) {
      this.modalRefs[modalId].close(); // Close the specific modal
      delete this.modalRefs[modalId]; // Clean up the reference
    } else {
      console.warn(`No modal found with ID: ${modalId}`);
    }
  }








  goTo_potentialCommonPage(){
    this.modalService.dismissAll();
    this.route.navigate(['/common_in_potentials'])
  }

  goTo_potentialDifferentPage(){
    // window.alert("this page is under construction!")
    this.modalService.dismissAll();
    this.route.navigate(['/different_in_potentials'])
  }

  goTo_alarmRaisingFactorsForSteady(){
    // window.alert("this page is under construction!")
    this.modalService.dismissAll();
    this.route.navigate(['/alarmRaisingFactorsForSteady'])

  }



















  getRowClass_for_color(index: number){
    switch(index) {
      case 0: return 'deep-green';
      case 1: return 'green';
      case 2: return 'light-green';
      case 3: return 'yello';
      case 4: return 'light-orange';
      case 5: return 'orange';
      case 6: return 'light-red';
      case 7: return 'red';
      default: return 'white';
    }
  }







































  // api calls

  hiring_status_newEmp_4Graphs(){
    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,
      selectedMonthYear: this.selectedMonthYear,  // it will have single value
      selectedChannel: this.selectedChannel,
      selectedSubChannel: this.selectedSubChannel,
      selectedLocation: this.selectedLocation,
      selectedState: this.selectedZone,
      selectedZone: this.selectedZone,
    };


    this.rest.hiring_status(data).subscribe((res: any) => {
      if(res.success){

        this.newAgent_LM_contribution(res.lastMonth)
        this.newAgent_MTD_contribution(res.mtd)




        this.newAgent_LM_contri_pieChart(res.lastMonthContri);
        this.newAgent_MTD_contri_pieChart(res.mtdContri);


        
      }else{
        window.alert("Error Occurred")
      }
    });
  }









  searchBtnClicked(){
    
    this.segmentation_search_staatus = true;
    
    this.scrollToTop()
    this.question_answer()
        
  }



  question_answer(){
    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,

      selectedGender: this.gender_selected,
      selectedMaritalStatus: this.maritalStatus_selected,
      selectedAgeGroup: this.ageGroup_selected,
      selectedState: this.state_selected,
      // selectedSubChannel: this.subChnnel_selected,
      selectedBackgroundBucket: this.backgroundBucket_selected,
      selectedVintageYear: this.vintageYear_selected

      // selectedMonthYear: this.selectedMonthYear,  // it will have single value
      // selectedChannel: this.selectedChannel,
      // selectedSubChannel: this.selectedSubChannel,
      // selectedLocation: this.selectedLocation,
      // selectedState: this.selectedZone,
      // selectedZone: this.selectedZone,
    };


    this.rest.question_answer(data).subscribe((res: any) => {
      if(res.success){

        

        
      }else{
        // window.alert("Error Occurred")
      }
    });
  }











  get_segment_overview_agentCountDetails(tableType: any, segment: any){
    const data = {
      userName: this.userName,
      userAgentId: this.userAgentId,
      userDesignation: this.userDesignation,


      segmentOverviewTableType: tableType,
      segment: segment,
    };


    this.rest.check_segmentation_agents(data).subscribe((res: any) => {
      if(res.success){
        this.segmentOverview_agentCountDetails_TableData = res.data
      }
    });
  }













  selectionOfSegmentType(){
    this.selected_segment_overview = '';

    if(this.selected_segmentType_overview == 'gi'){
      
      this.overview_segmentList = []

      for (let key in this.updatedSegmentOverviewTable_gi) {
        this.overview_segmentList.push(key)
      }
    }
    if(this.selected_segmentType_overview == 'nongi'){
      this.overview_segmentList = []

      for (let key in this.updatedSegmentOverviewTable_nongi) {
        this.overview_segmentList.push(key)
      }
    }

    this.selected_segment_overview = this.overview_segmentList[0];

    
  }






  prepareGraph(){

    this.prepare_whatsUniquePiechart_data();
    this.prepareDataForProductivityMatrix();
    this.prepare_top3_lob_contribution_data();

  }




  productivityMatrix_amt_data = [] as any;
  productivityMatrix_amt_data_xAxis_category = [] as any;

  productivityMatrix_percent_data = [] as any;
  productivityMatrix_percent_data_xAxis_category = [] as any;

  

  prepareDataForProductivityMatrix() {
    const colors = [
      'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
      'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
      'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ];
  
    this.productivityMatrix_amt_data = [];
    this.productivityMatrix_percent_data = []
  
    // Function to process data and add colors
    const processData = (dataSource: any[]) => {
      dataSource.forEach((item, index) => {

        if(item.name.includes('%')){

          this.productivityMatrix_percent_data.push({
            name: item.name,
            data: [this.formatNumber(item.data)],
            type: "column",
            color: colors[index % colors.length] // Assign colors cyclically
          });

        } else{

          this.productivityMatrix_amt_data.push({
            name: item.name,
            data: [this.formatNumber(item.data)],
            type: "column",
            color: colors[index % colors.length] // Assign colors cyclically
          });

        }


      });
    };
  
    if (this.selected_segmentType_overview === 'gi') {
      processData(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_3);
    }
  
    if (this.selected_segmentType_overview === 'nongi') {
      processData(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_3);
    }
  
    // console.log("productivityMatrix_amt_data -----> ", this.productivityMatrix_amt_data);


    this.createProductivityMatrixChart();
    this.createProductivityMatrixChart_perc();
    

    
  }

  prepare_whatsUniquePiechart_data(){
    const colors = [
      'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
      'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
      'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ];
    let chartData = [] as any

    if(this.selected_segmentType_overview === 'gi'){

      chartData = [
        {
            "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_6.statement),
            "y": this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_6.data
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_7.statement),
          "y": this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_7.data
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_8.statement),
          "y": this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_8.data
        },
        
      ]
    }
    if(this.selected_segmentType_overview === 'nongi'){

      chartData = [
        {
            "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.statement),
            "y": this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.data
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.statement),
          "y": this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.data
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.statement),
          "y": this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_6.data
        },
        
      ]
    }

    // console.log("data--pie---> ", chartData)

    this.create_whatsUniquePiechart(chartData, colors)

  }

  create_whatsUniquePiechart(data: any, color: any){

    const chartOptions: Highcharts.Options = {
      // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
      // colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
      colors: color,
      chart: {
        type: 'pie',
        // width: 600,
        // height: 450,
        // style:{
        //   width: 400,
        //   height:400,
        // }
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "What's unique about " + this.selected_segment_overview + " Segment",
        // text: '',
      },
      // subtitle: {
      //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      // },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          },
          showInLegend: false
        }
      },

      series:[
        {
          type: "pie",
          
          data: data,

          name: 'Percentage',
  
          states: {
            hover: {
              // color: '#BADA55',
              color: "#87d2ed"
            }
          },
          dataLabels: {
            enabled: true,
            distance: 10,
            // format: '{point.name}: {point.y}<br>{point.percentage:.1f}%',
            format: '{point.y}% {point.name}<br>Contribution in Pie: {point.percentage:.1f}%',
            style: {
              fontSize: '12px',
              fontWeight: '400'
            }
          },
          point: {
            events: {
  
              // click: this.setStateName.bind(this)
              
              
            }
          }
        }
      ],
      
    }


    Highcharts.chart('whatsUniquePiechart', chartOptions);

  }


  createProductivityMatrixChart(){
    let categoryList = []
    for(let item of this.productivityMatrix_amt_data){
      categoryList.push(item.name)
    }

        const chartOptions_gi: Highcharts.Options = {
          chart: {
              type: 'column',
          },
          credits: {
              enabled: false,
          },
          title: {
              text: 'Productivity Matrix',
              align: 'center'
          },
          subtitle: {
              text: '',
              align: 'left'
          },
          xAxis: {
              categories: categoryList,
              // categories: segmentWiseData_gi.map((segment:any) => segment.name),
              // crosshair: true,
              accessibility: {
                  description: '' // for x axis main categories
              },
              title: {
                text: ''
              },
              // visible: false,
              labels: {
                enabled: false, // Disable x-axis labels if categories aren't needed
              },
          },
          yAxis: {
              // min: 0,
              title: {
                  text: ''
              },
              visible: false, // Hide the y-axis
              gridLineWidth: 0, // Remove grid lines
          },
          tooltip: {
              valueSuffix: '',
              formatter: function () {
                return `<b>${this.series.name}</b>: ${this.y}`;
              },
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0,
                  // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                  dataLabels: {
                      enabled: true,
                      formatter: function () {
                          // return this.series.name + '' + this.y + ''; // Display value on top of every bar

                          if(this.series.name.includes('%')){
                            return `${this.y} %`;
                          }else{
                            return `₹ ${this.y}`;
                          }
                          // return `${this.series.name}<br/>${this.y}`;
                      },
                      style: {
                          fontSize: '12px',
                          fontWeight: '400'
                      }
                  },
              }
          },
          series: this.productivityMatrix_amt_data,
        };
        

        Highcharts.chart('productivityMatrics_amount', chartOptions_gi);
  }














  createProductivityMatrixChart_perc(){
    let categoryList = []
    for(let item of this.productivityMatrix_percent_data){
      categoryList.push(item.name)
    }

        const chartOptions_gi: Highcharts.Options = {
          chart: {
              type: 'column',
          },
          credits: {
              enabled: false,
          },
          title: {
              text: this.productivityMatrix_percent_data[0].name + ' Vs ' + this.productivityMatrix_percent_data[1].name,
              align: 'center'
          },
          subtitle: {
              text: '',
              align: 'left'
          },
          xAxis: {
              categories: categoryList,
              // categories: segmentWiseData_gi.map((segment:any) => segment.name),
              // crosshair: true,
              accessibility: {
                  description: '' // for x axis main categories
              },
              title: {
                text: ''
              },
              // visible: false,
              labels: {
                enabled: false, // Disable x-axis labels if categories aren't needed
              },
          },
          yAxis: {
              // min: 0,
              title: {
                  text: ''
              },
              visible: false, // Hide the y-axis
              gridLineWidth: 0, // Remove grid lines
          },
          tooltip: {
              valueSuffix: '',
              formatter: function () {
                return `<b>${this.series.name}</b>: ${this.y}`;
              },
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0,
                  // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                  dataLabels: {
                      enabled: true,
                      formatter: function () {
                          // return this.series.name + '' + this.y + ''; // Display value on top of every bar

                          if(this.series.name.includes('%')){
                            return `${this.y} %`;
                          }else{
                            return `₹ ${this.y}`;
                          }
                          // return `${this.series.name}<br/>${this.y}`;
                      },
                      style: {
                          fontSize: '12px',
                          fontWeight: '400'
                      }
                  },
              }
          },
          series: this.productivityMatrix_percent_data,
        };
        

        Highcharts.chart('productivityMatrics_perc', chartOptions_gi);
  }
  




















  prepare_top3_lob_contribution_data(){
    const colors = [
      'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
      'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
      'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ];
    let chartData = [] as any

    if(this.selected_segmentType_overview === 'gi'){

      chartData = [
        {
            "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10.name),
            "data": [this.formatToLakh(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10.data)],
            "color": colors[0],
            "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
            "type": "column",
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_11.name),
          "data": [this.formatToLakh(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_11.data)],
          "color": colors[1],
          "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
          "type": "column",
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_12.name),
          "data": [this.formatToLakh(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_12.data)],
          "color": colors[2],
          "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
          "type": "column",
        },
        
      ]
    }
    if(this.selected_segmentType_overview === 'nongi'){

      chartData = [
        {
            "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_10.name),
            "data": [this.formatToLakh(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_10.data)],
            "color": colors[0],
            "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_11.name),
          "data": [this.formatToLakh(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_11.data)],
          "color": colors[1],
          "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
        },
        {
          "name": this.toCamelCase_keep_space(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_12.name),
          "data": [this.formatToLakh(this.updatedSegmentOverviewTable_nongi[this.selected_segment_overview].row_12.data)],
          "color": colors[2],
          "percent_data": this.formatNumber(this.updatedSegmentOverviewTable_gi[this.selected_segment_overview].row_10['%_lob']),
        },
        
      ]
    }

    // console.log("data--top3---> ", chartData)

    this.create_top3_lob_contribution_chart(chartData, colors)

  }




  create_top3_lob_contribution_chart(data: any, color: any){

    let categoryList = []
    for(let item of data){
      categoryList.push(item.name)
    }

        const chartOptions_gi: Highcharts.Options = {
          chart: {
              type: 'column',
          },
          credits: {
              enabled: false,
          },
          title: {
              // text: this.productivityMatrix_percent_data[0].name + ' Vs ' + this.productivityMatrix_percent_data[1].name,
              text: 'Top 3 LOB Contributions',
              align: 'center'
          },
          subtitle: {
              text: '',
              align: 'left'
          },
          xAxis: {
              categories: categoryList,
              // categories: segmentWiseData_gi.map((segment:any) => segment.name),
              // crosshair: true,
              accessibility: {
                  description: '' // for x axis main categories
              },
              title: {
                text: ''
              },
              // visible: false,
              labels: {
                enabled: false, // Disable x-axis labels if categories aren't needed
              },
          },
          yAxis: {
              // min: 0,
              title: {
                  text: ''
              },
              visible: false, // Hide the y-axis
              gridLineWidth: 0, // Remove grid lines
          },
          tooltip: {
              valueSuffix: '',
              formatter: function () {
                return `<b>${this.series.name}</b>: ₹ ${this.y} L`;
              },
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0,
                  // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
                  dataLabels: {
                      enabled: true,
                      formatter: function () {
                          // return this.series.name + '' + this.y + ''; // Display value on top of every bar

                          if(this.series.name.includes('%')){
                            return `${this.y} %`;
                          }else{
                            return `₹ ${this.y} L`;
                          }
                          // return `${this.series.name}<br/>${this.y}`;
                      },
                      style: {
                          fontSize: '12px',
                          fontWeight: '400'
                      }
                  },
              }
          },
          series: data,
        };
        

        Highcharts.chart('top3_lob_contribution_chart', chartOptions_gi);


    // Highcharts.chart('top3_lob_contribution_chart', chartOptions);

  }









  loop_top3lob_contri_chart_data(){
    let all_piechartData = [];
    //   this.updatedSegmentOverviewTable_gi
    // ]

    for(let item in this.updatedSegmentOverviewTable_gi){
      let piechartDataObj = { 
        segmentName: item,
        chartData:[
                    {
                    name: this.updatedSegmentOverviewTable_gi[item].row_10.name,
                    y: this.updatedSegmentOverviewTable_gi[item].row_10.data,
                    lob_perc: this.updatedSegmentOverviewTable_gi[item].row_10['%_lob']
                    },
                    {
                      name: this.updatedSegmentOverviewTable_gi[item].row_11.name,
                      y: this.updatedSegmentOverviewTable_gi[item].row_11.data,
                      lob_perc: this.updatedSegmentOverviewTable_gi[item].row_11['%_lob']
                    },
                    {
                      name: this.updatedSegmentOverviewTable_gi[item].row_12.name,
                      y: this.updatedSegmentOverviewTable_gi[item].row_12.data,
                      lob_perc: this.updatedSegmentOverviewTable_gi[item].row_12['%_lob']
                    },
                  ]
        }



        // all_piechartData.push(piechartDataObj)
        this.top3lobContribution_piechart(item, piechartDataObj.chartData)
    }
  }





  loop_top3lob_contri_chart_data_nongi(){
    let all_piechartData = [];
    //   this.updatedSegmentOverviewTable_gi
    // ]

    for(let item in this.updatedSegmentOverviewTable_nongi){
      let piechartDataObj = { 
        segmentName: item,
        chartData:[
                    {
                    name: this.updatedSegmentOverviewTable_nongi[item].row_10.name,
                    y: this.updatedSegmentOverviewTable_nongi[item].row_10.data,
                    lob_perc: this.updatedSegmentOverviewTable_nongi[item].row_10['%_lob']
                    },
                    {
                      name: this.updatedSegmentOverviewTable_nongi[item].row_11.name,
                      y: this.updatedSegmentOverviewTable_nongi[item].row_11.data,
                      lob_perc: this.updatedSegmentOverviewTable_nongi[item].row_11['%_lob']
                    },
                    {
                      name: this.updatedSegmentOverviewTable_nongi[item].row_12.name,
                      y: this.updatedSegmentOverviewTable_nongi[item].row_12.data,
                      lob_perc: this.updatedSegmentOverviewTable_nongi[item].row_12['%_lob']
                    },
                  ]
        }



        // all_piechartData.push(piechartDataObj)
        this.top3lobContribution_piechart(item, piechartDataObj.chartData)
    }
  }








  top3lobContribution_piechart(segmentName: any, data: any){

    console.log("chart--data --->> ", segmentName,'---data--> ', data)

    let categoryList = []
    for(let item of data){
      categoryList.push(item.name)
    }

    console.log("categoryList==>> ", categoryList)



    const chartOp: Highcharts.Options = {
      colors: [
        'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
        'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
        'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
      ],
      chart: {
        type: 'pie',
        height: 400,
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: 'LOB Wise GWP' ,
        text: '',
      },
      // subtitle: {
      //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      // },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        pie: {
          size: '70%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f}%'
          },
          showInLegend: false
        }
      },

      series:[
        {
          type: "pie",
          
          data: data,

          name: 'Contribution',
  
          states: {
            hover: {
              // color: '#BADA55',
              color: "#87d2ed"
            }
          },
          dataLabels: {
            enabled: true,
            distance: 10,
            format: '{point.name}:<br>{point.percentage:.1f}%'
          },
          point: {
            events: {
  
              // click: this.setStateName.bind(this)
              
              
            }
          }
        }
      ],
      
    }
    
    
    let containerName = 'topLobContri_' + segmentName

    console.log( "containerName ---> ", containerName)
    

    Highcharts.chart(containerName, chartOp);

  }



  




















  formatNumber(inputString:any) {
    try {
      // Remove spaces and '%' sign
      const sanitizedString = inputString.replace(/\s+|%/g, '');
  
      // Convert to number
      const number = parseFloat(sanitizedString);
  
      // Check if it's a valid number
      if (isNaN(number)) {
        throw new Error("Invalid input: not a valid number");
      }
  
      // Round to 2 decimal places
      const roundedNumber = Math.round(number * 100) / 100;
  
      return roundedNumber;
    } catch (error:any) {
      console.error(error.message);
      return null;
    }
  }





































  // table sorting

  sortByKey(data: any, keyName: string, order: string) {
    return data.sort((a:any, b:any) => {
        let aValue = a[keyName];
        let bValue = b[keyName];
        
        if (order === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else if (order === 'desc') {
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        } else {
            throw new Error('Invalid order specified. Please use "ascending" or "descending".');
        }
    });
  }





















  toCamelCase(input: any) {
    const prepositions = ["of", "in", "on", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "from", "up", "down", "over", "under"];
    
    return input
      .toLowerCase()
      .split(' ')
      .map((word: any, index: any) => {
        if (index === 0 || !prepositions.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join('');
  }

  toCamelCase_keep_space(input: any) {
    const prepositions = ["of", "in", "on", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "from", "up", "down", "over", "under"];
    
    return input
      .toLowerCase()
      .split(' ')
      .map((word: any, index: any) => {
        if (index === 0 || !prepositions.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  }









  formatToLakh(input: any) {
    try {
      // Convert input to a number if it is in string format
      const number = parseFloat(input);
  
      // Check if it's a valid number
      if (isNaN(number)) {
        throw new Error("Invalid input: not a valid number");
      }
  
      // Convert to lakhs and round to 2 decimal places
      const inLakhs = Math.round((number / 100000) * 100) / 100;
  
      return inLakhs;
    } catch (error:any) {
      console.error(error.message);
      return null;
    }
  }


















}
