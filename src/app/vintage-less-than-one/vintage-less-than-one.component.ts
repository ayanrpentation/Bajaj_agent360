import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import Chart from 'chart.js/auto';
import {  ChartOptions, ChartType } from 'chart.js';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NotifierService } from "angular-notifier";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from '../common.service';

@Component({
  selector: 'app-vintage-less-than-one',
  templateUrl: './vintage-less-than-one.component.html',
  styleUrls: ['./vintage-less-than-one.component.css']
})
export class VintageLessThanOneComponent implements OnInit {

  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;


  first_triggerDate = this.common.getTriggerDate().fstTrigDatelt1
  last_triggerDate = this.common.getTriggerDate().lstTrigDatelt1


  triggerImpact_table_chart : any;

  actionable_highlightData = [] as any;

  dropdownList_d_growing_imd_sub_channel = [] as any;
  selected_d_growing_imd_sub_channel = [] as any;
  dropdownSettings_d_growing_imd_sub_channel:IDropdownSettings = {};
  lessthan_1yr_mtd_down_name = "" as any
  status_lessthan_1yr_mtd_down = false as any


  columnList = [] as any;
  tableData = [] as any;
  totalCountList = {"clyMtd": "","degrowingImds": 0,"mtd": "","overallImds": 0} as any ;
  subChannelGraph = [] as any;
  subChannelList = [] as any;
  CurrentMonthList = [] as any;
  PrevMonthList = [] as any;
  p1 = '' as any;
  p2 = '' as any;
  p3 = '' as any;
  curMonth = '' as any;
  prevMonth = '' as any;
  beforeprevMonth = '' as any;
  public chart = [] as any;
  chart1 = '' as any;
  chart2 = '' as any;
  chart3 = '' as any;
  chart4 = '' as any;
  chart5 = '' as any;
  chart6 = '' as any;
  chart7 = '' as any;
  chart8 = '' as any;
  chart9 = '' as any;
  chart10 = '' as any;
  chart11 = '' as any;
  chart12 = '' as any;
  chart13 = '' as any;
  chart14 = '' as any;
  triggerImpTable = [] as any;
  triggerImpTablePrev = [] as any;
  gwpImpact = '' as any;
  allData = sessionStorage.getItem('userDetails') as any;
  designationType = JSON.parse(this.allData).designation;
  user_agent_id = JSON.parse(this.allData).user_agent_id;
  empPerformTable = [] as any;
  empPerformcolList = [] as any;
  p1Slob = '' as any;
  p2Slob = '' as any;
  p3Slob = '' as any;
  countSlobDict = {'overall': 0, 'slobImd': 0};
  lobSegList = '' as any;
  columnsArr = [] as any;
  chart15 = ''  as any;
  chart16 = ''  as any;
  chart17 = ''  as any;
  subChannel = 'all';


  windowWidth= window.innerWidth as any



  plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart:any, args:any, options:any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      // ctx.fillStyle = options.color || '#ffffff';
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
  
  legendMarging = {
    id: 'legendMarging',
    beforeInit: (chart:any, legend:any, options:any) => {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return this.height += 10;
      }
    }
  };
  constructor(private rest: RestApiService, private ngxService: NgxUiLoaderService, private notifier: NotifierService, private modalService: NgbModal, private common: CommonService) {
    sessionStorage.setItem("triggerTrackerPage", '1');
   }
  ngOnInit(): void {
    // this.triggerImpact();             // previous APIs
    // this.getPriorityCount();         // previous APIs
    // this.getCurrentMonth();         // previous APIs
    // this.triggerPerformance();     // previous APIs
    // this.vinLT1yr();              // previous APIs



    this.callTogether();         // APIs written by Rishabh and Rishu

    

    console.log("this.designationType>>>",this.designationType)
    console.log("this.user_agent_id>>>",this.user_agent_id)
    
  }





  // this section is for multi select
  channelDropdownSettings(){
    this.dropdownSettings_d_growing_imd_sub_channel = { idField: 'id',textField: 'channelNewName',allowSearchFilter: true, enableCheckAll: true, itemsShowLimit: 1, selectAllText: 'Select All', };
  }
  onItemSelect(item: any) {
    console.log(this.selected_d_growing_imd_sub_channel)
  }
  onItemDeSelect(item: any) {
    console.log(this.selected_d_growing_imd_sub_channel)
  }

  // Method to handle "Select All"
  onSelectAll(items: any) {
    this.selected_d_growing_imd_sub_channel = [...this.dropdownList_d_growing_imd_sub_channel]; // Select all items
    console.log(this.selected_d_growing_imd_sub_channel)
  }

  // Method to handle "Deselect All"
  onDeSelectAll(items: any) {
    // console.log('All items deselected:', items);
    this.selected_d_growing_imd_sub_channel = []; // Deselect all items
    console.log(this.selected_d_growing_imd_sub_channel)
  }

  chartClicked(event: any): void {

    console.log(event)
    // if (event.active.length > 0) {
    //   const clickedIndex = event.active[0]._index;
    //   const clickedDatasetIndex = event.active[0]._datasetIndex;
    //   console.log('Bar clicked:', clickedIndex, clickedDatasetIndex);
    //   // Do something with the clicked index or dataset index
    // }
  }
  













  getsubChannel(){
    // console.log("manipulate_vinLess1yr", this.vinLess1yr);
    if (this.designationType == 'NH'){
      this.underPerformingGraphZh();
      this.underPerformingGraphCh();
      this.underPerformingGraphRm();
      this.mtdDowntrendGraphZh();
      this.mtdDowntrendGraphCh();
      this.mtdDowntrendGraphRm();

    }
    else if(this.designationType == 'ZH'){
      this.empPerformance();
      this.underPerformingGraphCh();
      this.underPerformingGraphRm();
      this.mtdDowntrendGraphRm();
      this.underPerformChGraphforZh();
    }
    else if(this.designationType == 'CH'){
      this.empPerformance();
      this.underPerformingGraphRm();
      this.underPerformRmGraphforCh();
    }
    else if(this.designationType == 'RM'){
      this.empPerformance();
    }
    console.log("this.subChannel>>>>>>",this.subChannel)
  }

   vinLT1yr() {
    // console.log("manipulate_vinLess1yr", this.vinLess1yr);
    
    this.subChannelwiseTotal();
    if (this.designationType == 'NH'){
      // this.subChannelDegrowGraph();
      this.underPerformingGraphZh();
      this.underPerformingGraphCh();
      this.underPerformingGraphRm();
      this.mtdDowntrendGraphZh();
      this.mtdDowntrendGraphCh();
      this.mtdDowntrendGraphRm();

    }
    else if(this.designationType == 'ZH'){
      this.empPerformance();
      this.underPerformingGraphCh();
      this.underPerformingGraphRm();
      this.mtdDowntrendGraphRm();
      this.underPerformChGraphforZh();
    }
    else if(this.designationType == 'CH'){
      this.empPerformance();
      this.underPerformingGraphRm();
      this.underPerformRmGraphforCh();
    }
    else if(this.designationType == 'RM'){
      this.empPerformance();
    }
  }
  vinGT1yr() {

  }
  // sLob1yr() {
  //   this.getPriorityCountSLob();
  //   this.countSlob();
  //   // this.singleChannelGraph();
  //   if (this.designationType == 'NH'){
  //     this.sLobGraphZh();
  //     this.sLobGraphCh();
  //     this.sLobGraphRm();
  //   }else if(this.designationType == 'ZH'){
  //     this.sLobGraphCh();
  //     this.sLobGraphRm();
  //   } else if(this.designationType == 'CH'){
  //     this.sLobGraphRm();
  //   }

  //   // console.log("manipulate_vinLessGT1yr", this.vinLess1yr)
  // }
  

  subChannelDegrowGraph() {

    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      labelname: this.lessthan_1yr_mtd_down_name,

    }


    this.rest.subChannelDegrowGraph(data).subscribe((res: any) => {
      if (res.success) {
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              // ctx.fillText(Math.round(datapoint * 100) / 100 + '', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
              ctx.fillText(datapoint+ ' L', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
      
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.textAlign= 'center';
              ctx.fillStyle = 'black';
              ctx.fillText(datapoint + ' L', x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
  
        if(this.chart1){
          this.chart1.clear();
          this.chart1.destroy();
      }
        this.chart1 = new Chart('mtdDowngrw', {
          type: 'bar', //this denotes tha type of chart
          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            // labels: res.totalLevel,
            // labels: this.subChannelList.wrap(),
            labels: res.subChannelList,
            datasets: [
              {
                label: "CYLY MTD GWP (L)",
                // data: ['542', '542', '536', '327', '17',
                //        '0.00', '538', '541'],
                data: res.PrevMonthList,
                // backgroundColor: 'limegreen'
                backgroundColor: 'rgb(0, 102, 204)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:35,
                maxBarThickness: 40,
                borderRadius:10,
              },
              {
                label: "MTD GWP (L)",
                // data: ['467','576', '572', '79', '92',
                //      '574', '573', '576'],
                // data: res.totalData,
                data: res.CurrentMonthList,
                // backgroundColor: 'blue'
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:35,
                maxBarThickness: 40,
                borderRadius:10,

              }
            ]
          },
          options: {
            // layout: {
            //   padding: {
            //     top: 10,
            //   },
            // },
            responsive: false,
            // aspectRatio: 2.5,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                align: 'end',                
                labels: {
                  // usePointStyle: true,
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',// Make the legend labels bold  
                  }
                }
              },
              tooltip: {
                callbacks: {
                  // afterTitle: function (context) {
                  //   // console.log("context", context[0].dataIndex);
                  //   console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replace(',',''));

                  //   return res.subChannelList[context[0].dataIndex].toString().replace(',',' ');
                  //   // return context[0].dataIndex +' L';
                  // }

                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.subChannelList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  },
                }
              },
            },
            scales: {
              x: {
                title: {
                  text: 'Sub Channel',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'normal',// Make the legend labels bold
                  },
                },
                grid:{
                  display:false,
                },
                // autoSkip: true,
                // autoSkip: true,
                // maxRotation: 0, // Set the maximum rotation angle (in degrees)
                // minRotation: 0,
                // maxTicksLimit: 10,
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP',
                  font: {
                    weight: 'bold',// Make the legend labels bold

                  },
                },
                ticks:{
                  font:{
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            },

          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
        this.chart.push(this.chart1);
      }
    });
  }
  underPerformingGraphZh() {
    const data ={
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate

    }

    this.rest.underPerformingGraphZh(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.zhNamesList >>>>",res.zhNamesList )
        // console.log("res.zhDegrowthPer >>>>",res.zhDegrowthPer )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + '%', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
          }
        }
        
        
        if(this.chart2){
          // console.log("this.chart2>>>",this.chart2);
          this.chart2.clear();
          this.chart2.destroy();
      }
       

        this.chart2 = new Chart('underPerZh', {
          type: 'bar',
          data: {
            labels: res.zhNamesList,
            datasets: [
              {
                label: "Contribution (%)",
                data: res.zhDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius: 10,
              },
              // {
              //   label: "MTD GWP",
              //   data: res.CurrentMonthList,
              //   backgroundColor: 'rgb(54, 162, 235)'
              // }
            ],
            
          },
          options: {
            // onClick: (event, elements) => {
            //   if (elements.length) { 
            //     const clickedElement = elements[0];             
            //     const datasetIndex = clickedElement.datasetIndex;             
            //     const index = clickedElement.index; 
            //     const drillDownData = [5, 10, 15];
            //     this.chart.data.datasets[0].data = drillDownData;             
            //     this.chart.update();
            //     // const label = this.chart.data.res.zhNamesList[index];             
            //     const value = this.chart.data.res.zhDegrowthPer[datasetIndex].data[index];

            //     console.log("Clicked Element:", clickedElement);             
            //     // console.log("Label:", label);             
            //     console.log("Value:", value);
            //   }},
          
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxHeight: 10,
                  boxWidth:10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    return res.zhNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  },
                }
              },
            },
            scales: {
              x: {
                title: {
                  text: 'Zonal Head',
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                  
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },

                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'Contribution (%)',
                  font: {
                    weight: 'bold',// Make the legend labels bold
                  },
                },
                ticks:{
                  display: false,
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],
        });
        
        this.chart.push(this.chart2);
      }
    });
    // const points = this.chart2.getElementsAtEventForMode('click','nearest',{intersect:true},true);
    // if (points.lenght){
    //   console.log("points>>>>",points);
    // }
  }

 

  underPerformingGraphCh() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate
    }
    this.rest.underPerformingGraphCh(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.chNamesList >>>>",res.chNamesList )
        // console.log("res.chDegrowthPer >>>>",res.chDegrowthPer )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, chartArea: { width, height, left, right, top, bottom }, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + '%', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
              ctx.font = '12px serif';
              ctx.fillStyle = 'rgb(60, 60, 60';
              ctx.fillText('Circle Head', 30, bottom + 20);
              ctx.fillText('Zonal Head', 30, bottom + 77);
            });
          }
        };
        // var legendMarging = {
        //   id : 'legendMarging',
        //   beforeInit:(chart, legend, options)=>{
        //     const fitValue = chart.legend.fit;
        //     chart.legend.fit = function fit(){
        //       fitValue.bind(chart.legend)();
        //       return this.height += 10;
        //     }
        //   }
        // };
        if(this.chart3){
          this.chart3.clear();
          this.chart3.destroy();
      }
        this.chart3 = new Chart('underPerCh', {
          type: 'bar',
          data: {

            datasets: [
              {
                label: "Contribution (%)",
                data: res.chDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius: 10,
              },
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
                left:10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.chNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                labels: res.chNamesList,
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              },
              x2: {
                labels: res.zhNamesList,
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                title: {
                  text: 'Circle Head',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },

                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'Contribution (%)',
                  font: {
                    weight: 'bold',// Make the legend labels bold
                  },
                },
                ticks: {
                  display: false,
                  font: {
                    weight: 'normal',
                  },

                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart3);
    });
  }

  underPerformingGraphRm() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate
    }
    this.rest.underPerformingGraphRm(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.rmNamesList >>>>",res.rmNamesList );
        // console.log("res.rmDegrowthPer >>>>",res.rmDegrowthPer );
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, chartArea: { width, height, left, right, top, bottom }, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + '%', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
              ctx.font = '12px serif';
              ctx.fillStyle = 'rgb(60, 60, 60';
              ctx.fillText('RM Head', 30, bottom + 20);
              ctx.fillText('Circle Head', 30, bottom + 77);

            });
          }
        };
        if(this.chart4){
          this.chart4.clear();
          this.chart4.destroy();
      }
        this.chart4 = new Chart('underPerRm', {
          type: 'bar',
          data: {
            datasets: [
              {
                label: "Contribution (%)",
                data: res.rmDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius: 10,
              },
              // {
              //   label: "MTD GWP",
              //   data: res.CurrentMonthList,
              //   backgroundColor: 'rgb(54, 162, 235)'
              // }
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
                left:10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.rmNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                offset:true,
                labels: res.rmNamesList,
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                
                grid:{
                  display:false,
                },

              },
              x2: {
                beginAtZero: true,
                offset:true,
                labels: res.chNamesList,
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                title: {
                  text: 'Relationship Manager',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
              },
              // x3: {
              //   labels: res.zhNamesList,
              //   border:{
              //     display: false,
              //   },
              //   grid:{
              //     display:false,
              //   },
              //   ticks: {
              //     color: 'black',
              //     display: true,
              //     font: {
              //       weight: 'bold',
              //     },

              //   },
              // },
              y: {
                beginAtZero: true,
                title: {
                  color: 'black',
                  display: true,
                  text: 'Contribution (%)',
                  font: {
                    weight: 'bold',// Make the legend labels bold

                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                  padding:10,
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],
        });
      }
      this.chart.push(this.chart4);
    });
  }

  mtdDowntrendGraphZh() {
    const data = {
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate
    }
    this.rest.mtdDowntrendGraphZh(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.zhNameList >>>>",res.zhNameList )
        // console.log("res.PrevMonthList >>>>",res.PrevMonthList )
        // console.log("res.CurrentMonthList >>>>",res.CurrentMonthList )

        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + ' L', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + ' L', x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
        if(this.chart5){
          this.chart5.clear();
          this.chart5.destroy();
      }
        this.chart5 = new Chart('mtdDwnGraphZh', {
          // type: 'clustered column chart',
          type: 'bar',
          data: {
            labels: res.zhNameList,
            datasets: [
              {
                label: "CYLY MTD GWP (L)",
                data: res.PrevMonthList,
                backgroundColor: 'rgb(0, 102, 204)',
                // backgroundColor: 'rgb(0, 69, 116)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // barPercentage: 0.9,
                // categoryPercentage: 1,
              },
              {
                label: "MTD GWP (L)",
                data: res.CurrentMonthList,
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // barPercentage: 0.9,
                // categoryPercentage: 1,
              }
            ]
          },
          
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.zhNameList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                
                title: {
                  text: 'MTD Downtrend Zonal Head',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },

                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP (L)',
                  font: {
                    weight: 'bold',

                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },

                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],
        });
      }
      this.chart.push(this.chart5);
    });
  }

  mtdDowntrendGraphCh() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.mtdDowntrendGraphCh(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.chNameList >>>>",res.chNameList )
        // console.log("res.PrevMonthList >>>>",res.PrevMonthList )
        // console.log("res.CurrentMonthList >>>>",res.CurrentMonthList )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint  + ' L', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint  + ' L', x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
        if(this.chart6){
          this.chart6.clear();
          this.chart6.destroy();
      }
        this.chart6 = new Chart('mtdDwnGraphCh', {
          type: 'bar',
          data: {
            labels: res.chNameList,
            datasets: [
              {
                label: "CYLY MTD GWP",
                data: res.PrevMonthList,
                backgroundColor: 'rgb(0, 102, 204)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // barPercentage: 1.0,
                // categoryPercentage: 0.25
              },
              {
                label: "MTD GWP",
                data: res.CurrentMonthList,
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // barPercentage: 1.0,
                // categoryPercentage: 0.25
              }
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.chNameList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  text: 'MTD Downtrend Circle Head',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP (L)',
                  font: {
                    weight: 'bold',

                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart6);
    });
  }

  underPerformChGraphforZh() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.mtdDowntrendGraphCh(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.chNameList >>>>",res.chNameList )
        // console.log("res.PrevMonthList >>>>",res.PrevMonthList )
        // console.log("res.CurrentMonthList >>>>",res.CurrentMonthList )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + " L", x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + " L", x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
        if(this.chart8){
          this.chart8.clear();
          this.chart8.destroy();
      }
        this.chart8 = new Chart('underPerformChGraphforZh', {
          type: 'bar',
          data: {
            labels: res.chNameList,
            datasets: [
              {
                label: "CYLY MTD GWP (L)",
                data: res.PrevMonthList,
                backgroundColor: 'rgb(0, 102, 204)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // categoryPercentage: 0.35
              },
              {
                label: "MTD GWP (L)",
                data: res.CurrentMonthList,
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius: 10,
                // categoryPercentage: 0.35,
                
              }
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.chNameList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  text: 'MTD Downtrend Circle Head',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP (L)',
                  font: {
                    weight: 'bold',

                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart8);
    });
  }

  mtdDowntrendGraphRm() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.mtdDowntrendGraphRm(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.rmNameList >>>>",res.rmNameList )
        // console.log("res.PrevMonthList >>>>",res.PrevMonthList )
        // console.log("res.CurrentMonthList >>>>",res.CurrentMonthList )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + " L", x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + ' L', x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
        if(this.chart7){
          this.chart7.clear();
          this.chart7.destroy();
      }
        this.chart7 = new Chart('mtdDwnGraphRm', {
          type: 'bar', //this denotes tha type of chart        
          data: {// values on X-Axis
            labels: res.rmNameList,
            datasets: [
              {
                label: "CYLY MTD GWP (L)",
                data: res.PrevMonthList,
                backgroundColor: 'rgb(0, 102, 204)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius:10,
                // barPercentage:0.8,
                // categoryPercentage: 0.7
              },
              {
                label: "MTD GWP (L)",
                data: res.CurrentMonthList,
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness:40,
                maxBarThickness: 50,
                borderRadius:10,
                // barPercentage:0.6,
                // categoryPercentage: 0.7
              }
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.rmNameList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  text: 'MTD Downtrend Relationship Manager',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP (L)',
                  font: {
                    weight: 'bold',
                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart7);
    });
  }

  underPerformRmGraphforCh() {
    const data = {
      user_agent_id: this.user_agent_id,
      subChannel : this.subChannel,
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.mtdDowntrendGraphRm(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res.rmNameList >>>>",res.rmNameList )
        // console.log("res.PrevMonthList >>>>",res.PrevMonthList )
        // console.log("res.CurrentMonthList >>>>",res.CurrentMonthList )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + " L", x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + " L", x.getPixelForValue(index) + 20, chart.getDatasetMeta(1).data[index].y - 10);
            });
          }
        };
        if(this.chart9){
          this.chart9.clear();
          this.chart9.destroy();
      }
        this.chart9 = new Chart('underPerformRmGraphforCh', {
          type: 'bar', //this denotes tha type of chart        
          data: {// values on X-Axis
            labels: res.rmNameList,
            datasets: [
              {
                label: "CYLY MTD GWP (L)",
                data: res.PrevMonthList,
                backgroundColor: 'rgb(0, 102, 204)',
                borderWidth:2,
                borderColor: 'white',
                barThickness: 40,
                maxBarThickness: 40,
                borderRadius:10,
                barPercentage:0.8,
                categoryPercentage: 0.2,
              },
              {
                label: "MTD GWP (L)",
                data: res.CurrentMonthList,
                // backgroundColor: 'rgba(93, 157, 221, 0.493)',
                backgroundColor: 'rgb(192, 80, 77)',
                borderWidth:2,
                borderColor: 'white',
                barThickness: 40,
                maxBarThickness: 40,
                borderRadius:10,
                barPercentage:0.8,
                categoryPercentage: 0.2,
              }
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            aspectRatio: 2.5,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.rmNameList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  text: 'MTD Downtrend Relationship Manager',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'GWP (L)',
                  font: {
                    weight: 'bold',
                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart9);
    });
  }

  // singleChannelGraph() {
  //   const data = {
  //     // triggerDate: '2024-02-05',
  //     triggerDate: this.last_triggerDate,
  //   }
  //   this.rest.singleChannelGraph(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // console.log("res.subChList >>>>",res.subChList )
  //       // console.log("res.subPerList >>>>",res.subPerList )
  //       var topLables = {
  //         id: 'topLables',
  //         afterDatasetsDraw: (chart, args, options) => {
  //           const { ctx, scales: { x, y } } = chart;
  //           chart.data.datasets[0].data.forEach((datapoint, index) => {
  //             // console.log("datapoint>>>",datapoint)
  //             ctx.font = '500 12px sans-serif';
  //             ctx.fillStyle = 'black';
  //             ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);

  //           });
  //         }
  //       }
  //       if(this.chart10){
  //         this.chart10.clear();
  //         this.chart10.destroy();
  //     }
  //       this.chart10 = new Chart('subChannelImd', {
  //         type: 'bar',
  //         data: {
  //           labels: res.subChList,
  //           datasets: [
  //             {
  //               label: "Contribution(%) of Subchannel",
  //               data: res.subPerList,
  //               backgroundColor: 'rgb(0, 102, 204)',
  //               barThickness: 40,
  //               borderRadius:10,
  //             },
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: {
  //               top: 10,
  //             },
  //           },
  //           aspectRatio: 2.5,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 10,
  //                 boxHeight: 10,
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               callbacks: {
  //                 title: function (context) {
  //                   // console.log("context>>", res.subChList[context[0].dataIndex].toString().replaceAll(',',''));
  //                   return res.subChList[context[0].dataIndex].toString().replaceAll(',', ' ');
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               title: {
  //                 text: 'Sub Channel',
  //                 color: 'black',
  //                 display: true,

  //                 font: {
  //                   weight: 'bold',
  //                   size: 13,
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },

  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             },
  //             y: {
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Contribution(%)',
  //                 font: {
  //                   weight: 'bold',// Make the legend labels bold

  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: false,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }
  //         },
  //         plugins: [this.plugin, topLables, this.legendMarging],
  //       });
  //       if(this.chart11){
  //         this.chart11.clear();
  //         this.chart11.destroy();
  //     }
        
  //       this.chart11 = new Chart('singlelobPerGraph', {
  //         type: 'bar',
  //         data: {
  //           labels: res.lobList,
  //           datasets: [
  //             {
  //               label: "Contribution(%) of LOB",
  //               data: res.lobPerList,
  //               backgroundColor: 'rgb(0, 102, 204)',
  //               barThickness: 40,
  //               borderRadius:10,
  //             },
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: {
  //               top: 10,
  //             },
  //           },
  //           aspectRatio: 2.5,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 10,
  //                 boxHeight: 10,
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               callbacks: {
  //                 title: function (context) {
  //                   return res.lobList[context[0].dataIndex].toString().replaceAll(',', ' ');
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               title: {
  //                 text: 'LOB',
  //                 color: 'black',
  //                 display: true,

  //                 font: {
  //                   weight: 'bold',
  //                   size: 13,
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             },
  //             y: {
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Contribution(%)',
  //                 font: {
  //                   weight: 'bold',
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: false,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }
  //         },
  //         plugins: [this.plugin, topLables, this.legendMarging],
  //       });

  //       this.chart.push(this.chart11);
  //       this.chart.push(this.chart10);
  //     }
  //   });
  // }

  

  // sLobGraphZh(){

  //   const data = {
  //     triggerDate: '2024-02-05',
  //     user_agent_id: this.user_agent_id, 
  //   }

  //   this.rest.sLobGraphZh(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // console.log("res.zhNamesList >>>>",res.zhNamesList )
  //       // console.log("res.zhDegrowthPer >>>>",res.zhDegrowthPer )
  //       var topLables = {
  //         id: 'topLables',
  //         afterDatasetsDraw: (chart, args, options) => {
  //           const { ctx, scales: { x, y } } = chart;
  //           chart.data.datasets[0].data.forEach((datapoint, index) => {
  //             // console.log("datapoint>>>",datapoint)
  //             ctx.font = '500 12px sans-serif';
  //             ctx.fillStyle = 'black';
  //             ctx.textAlign= 'center';
  //             ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
  //             // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);

  //           });
  //         }
  //       }
  //       if(this.chart12){
  //         this.chart12.clear();
  //         this.chart12.destroy();
  //     }
  //       this.chart12 = new Chart('sLobGraphZh', {
  //         type: 'bar',
  //         data: {
  //           labels: res.zhNamesList,
  //           datasets: [
  //             {
  //               label: "Contribution (%)",
  //               data: res.zhDegrowthPer,
  //               backgroundColor: 'rgb(0, 102, 204)',
  //               barThickness: 40,
  //               borderRadius:10,
  //             },
  //             // {
  //             //   label: "MTD GWP",
  //             //   data: res.CurrentMonthList,
  //             //   backgroundColor: 'rgb(54, 162, 235)'
  //             // }
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: {
  //               top: 10,
  //             },
  //           },
  //           aspectRatio: 2.5,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 10,
  //                 boxHeight: 10,
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               callbacks: {
  //                 title: function (context) {
  //                   // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
  //                   return res.zhNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               title: {
  //                 text: 'Zonal Head',
  //                 color: 'black',
  //                 display: true,

  //                 font: {
  //                   weight: 'bold',
  //                   size: 13,
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             },
  //             y: {
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Contribution',
  //                 font: {
  //                   weight: 'bold',// Make the legend labels bold

  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: false,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }
  //         },
  //         plugins: [this.plugin, topLables, this.legendMarging],

  //       });
  //       this.chart.push(this.chart12);
  //     }
  //   });
  // }
  // sLobGraphCh(){
  //   const data = {
  //     user_agent_id: this.user_agent_id,
  //   }
  //   this.rest.sLobGraphCh(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // console.log("res.chNamesList >>>>",res.chNamesList )
  //       // console.log("res.chDegrowthPer >>>>",res.chDegrowthPer )
  //       var topLables = {
  //         id: 'topLables',
  //         afterDatasetsDraw: (chart, args, options) => {
  //           const { ctx, chartArea: { width, height, left, right, top, bottom }, scales: { x, y } } = chart;
  //           chart.data.datasets[0].data.forEach((datapoint, index) => {
  //             // console.log("datapoint>>>",datapoint)
  //             ctx.font = '500 12px sans-serif';
  //             ctx.fillStyle = 'black';
  //             ctx.textAlign= 'center';
  //             ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
  //             ctx.font = '12px serif';
  //             ctx.fillStyle = 'rgb(60, 60, 60';
  //             ctx.fillText('Circle Head', 30, bottom + 30);
  //             ctx.fillText('Zonal Head', 30, bottom + 80);
  //           });
  //         }
  //       };
  //       if(this.chart13){
  //         this.chart13.clear();
  //         this.chart13.destroy();
  //     }
  //       this.chart13 = new Chart('sLobGraphCh', {
  //         type: 'bar',
  //         data: {

  //           datasets: [
  //             {
  //               label: "Contribution (%)",
  //               data: res.chDegrowthPer,
  //               backgroundColor: 'rgb(0, 102, 204)',
  //               barThickness: 40,
  //               borderRadius:10,
  //             },
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: {
  //               top: 10,
  //             },
  //           },
  //           aspectRatio: 2.5,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 10,
  //                 boxHeight: 10,
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               callbacks: {
  //                 title: function (context) {
  //                   return res.chNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               labels: res.chNamesList,
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
                
  //             },
  //             x2: {
  //               labels: res.zhNamesList,
  //               border: {
  //                 display: false,
  //               },
  //               grid: {
  //                 display: false,
  //               },
  //               title: {
  //                 text: 'Circle Head',
  //                 color: 'black',
  //                 display: true,

  //                 font: {
  //                   weight: 'bold',
  //                   size: 13,
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },

  //               },
  //             },
  //             y: {
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Contribution',
  //                 font: {
  //                   weight: 'bold',// Make the legend labels bold
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: false,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }
  //         },
  //         plugins: [this.plugin, topLables, this.legendMarging],

  //       });
  //     }
  //     this.chart.push(this.chart13);
  //   });
  // }
  // sLobGraphRm(){
  //   const data = {
  //     user_agent_id: this.user_agent_id,
  //   }
  //   this.rest.sLobGraphRm(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // console.log("res.rmNamesList >>>>",res.rmNamesList );
  //       // console.log("res.rmDegrowthPer >>>>",res.rmDegrowthPer );
  //       var topLables = {
  //         id: 'topLables',
  //         afterDatasetsDraw: (chart, args, options) => {
  //           const { ctx, chartArea: { width, height, left, right, top, bottom }, scales: { x, y } } = chart;
  //           chart.data.datasets[0].data.forEach((datapoint, index) => {
  //             // console.log("datapoint>>>",datapoint)
  //             ctx.font = '500 12px sans-serif';
  //             ctx.fillStyle = 'black';
  //             ctx.textAlign= 'center';
  //             ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
  //             ctx.font = '12px serif';
  //             ctx.fillStyle = 'rgb(60, 60, 60';
  //             ctx.fillText('RM Head', 30, bottom + 35);
  //             ctx.fillText('Circle Head', 30, bottom + 90);

  //           });
  //         }
  //       };
  //       if(this.chart14){
  //         this.chart14.clear();
  //         this.chart14.destroy();
  //     }
  //       this.chart14 = new Chart('sLobGraphRm', {
  //         type: 'bar',
  //         data: {
  //           datasets: [
  //             {
  //               label: "Contribution (%)",
  //               data: res.rmDegrowthPer,
  //               backgroundColor: 'rgb(0, 102, 204)',
  //               barThickness: 40,
  //               borderRadius:10,
  //             },
  //             // {
  //             //   label: "MTD GWP",
  //             //   data: res.CurrentMonthList,
  //             //   backgroundColor: 'rgb(54, 162, 235)'
  //             // }
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: {
  //               top: 10,
  //             },
  //           },
  //           aspectRatio: 2.5,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 10,
  //                 boxHeight: 10,
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               callbacks: {
  //                 title: function (context) {
  //                   // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
  //                   return res.rmNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               labels: res.rmNamesList,
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               beginAtZero: false,
  //               grid:{
  //                 display:false,
  //               },

  //             },
  //             x2: {
  //               labels: res.chNamesList,
  //               border: {
  //                 display: false,
  //               },
  //               grid: {
  //                 display: false,
  //               },
  //               title: {
  //                 text: 'Relationship Manager',
  //                 color: 'black',
  //                 display: true,

  //                 font: {
  //                   weight: 'bold',
  //                   size: 13,
  //                 },
  //               },
  //               beginAtZero: false,
  //               ticks: {
  //                 color: 'black',
  //                 display: true,
  //                 font: {
  //                   weight: 'normal',
  //                 },

  //               },
  //             },
  //             y: {
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Contribution',
  //                 font: {
  //                   weight: 'bold',// Make the legend labels bold
  //                 },
  //               },
  //               ticks: {
  //                 color: 'black',
  //                 display: false,
  //                 font: {
  //                   weight: 'normal',
  //                 },
  //               },
  //               grid:{
  //                 display:false,
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }
  //         },
  //         plugins: [this.plugin, topLables, this.legendMarging],
  //       });
  //     }
  //     this.chart.push(this.chart14);
  //   });
  // }


  chart1Download() {
    // this.chart.exportChart({ format: "png" });
    // console.log("this.chart1>>@@>>",this.chart1)
    // console.log("this.chart>>",this.chart)
    const a = document.createElement('a');
    a.href = this.chart1.toBase64Image();
    // console.log("this.chart1.toBase64Image()>>>>",this.chart1.toBase64Image());
    a.download = 'Sub_Channel_Wise_Downtrend.png';
    a.click();
  }
  chart2Download() {
    const a = document.createElement('a');
    a.href = this.chart2.toBase64Image();
    a.download = 'Underperforming_Zonal_Head.png';
    a.click();
  }
  chart3Download() {
    const a = document.createElement('a');
    a.href = this.chart3.toBase64Image();
    a.download = 'Underperforming_Circle_Head.png';
    a.click();
  }
  chart4Download() {
    const a = document.createElement('a');
    a.href = this.chart4.toBase64Image();
    a.download = 'Underperforming_Relationship_Manager.png';
    a.click();
  }
  chart5Download() {
    const a = document.createElement('a');
    a.href = this.chart5.toBase64Image();
    a.download = 'MTD_Downtrend_Zonal_Head_Analysis.png';
    a.click();
  }
  chart6Download() {
    const a = document.createElement('a');
    a.href = this.chart6.toBase64Image();
    a.download = 'MTD_Downtrend_Circle_Head_Analysis.png';
    a.click();
  }
  chart7Download() {
    const a = document.createElement('a');
    a.href = this.chart7.toBase64Image();
    a.download = 'MTD_Downtrend_Relationship_Manager_Analysis.png';
    a.click();
  }
  
  chart8Download() {
    const a = document.createElement('a');
    a.href = this.chart8.toBase64Image();
    a.download = 'MTD_Downtrend_Circle_Head_Analysis.png';
    a.click();
    console.log("a.href>>>>",a.href)
  }
  chart9Download() {
    const a = document.createElement('a');
    a.href = this.chart9.toBase64Image();
    a.download = 'MTD_Downtrend_Relationship_Manager_Analysis.png';
    a.click();
  }
  chart10Download(){
    const a = document.createElement('a');
    a.href = this.chart10.toBase64Image();
    a.download = 'Single_Lob_Subchannel_wise_Segmentation.png';
    a.click();
  }
  chart11Download(){
    const a = document.createElement('a');
    a.href = this.chart11.toBase64Image();
    a.download = 'Single_Lob_Subchannel_wise_Segmentation.png';
    a.click();
  }
  chart12Download(){
    const a = document.createElement('a');
    a.href = this.chart12.toBase64Image();
    a.download = 'Single_Lob_Zonal_Head.png';
    a.click();
  }
  chart13Download(){
    const a = document.createElement('a');
    a.href = this.chart13.toBase64Image();
    a.download = 'Single_Lob_Circle_Head.png';
    a.click();
  }
  chart14Download(){
    const a = document.createElement('a');
    a.href = this.chart14.toBase64Image();
    a.download = 'Single_Lob_Relationship_Manager.png';
    a.click();
  }
  chart15Download(){
    const a = document.createElement('a');
    a.href = this.chart15.toBase64Image();
    a.download = 'Agents_Performance_Bucketwise.png';
    a.click();
  }
  chart16Download(){
    const a = document.createElement('a');
    a.href = this.chart16.toBase64Image();
    a.download = 'GWP_Previous_3_months.png';
    a.click();
  }
  chart17Download(){
    const a = document.createElement('a');
    a.href = this.chart17.toBase64Image();
    a.download = 'Sub_Channel_wise_Total_Imd.png';
    a.click();
  }


 
  getPriorityCount() {
    this.rest.getPriorityCount().subscribe((res: any) => {
      if (res.success) {
        // console.log("res.pone",res.pone)
        // console.log("res.ptwo",res.ptwo)
        // console.log("res.pthree",res.pthree)
        this.p1 = res.pone;
        this.p2 = res.ptwo;
        this.p3 = res.pthree;
        this.subChannelList = res.subChannelList;
        // console.log("this.subChannelList>>>>",this.subChannelList);
      }
    });
  }
  getPriorityCountSLob() {
    this.rest.getPriorityCountSLob().subscribe((res: any) => {
      if (res.success) {
        this.p1Slob = res.poneSlob;
        this.p2Slob = res.ptwoSlob;
        this.p3Slob = res.pthreeSlob;
        // console.log("this.p1Slob",this.p1Slob)
        // console.log("this.p2Slob",this.p2Slob)
        // console.log("this.p3Slob",this.p3Slob)
  
      }
    });
  }

  getCurrentMonth() {
    // const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // this.curMonth = month[new Date().getMonth()].toString() + '-' + new Date().getFullYear().toString().substr(-2);
    // console.log("curdate>>>>",this.curMonth)
    // this.prevMonth = month[new Date().getMonth() - 1].toString() + '-' + new Date().getFullYear().toString().substr(-2);
    // console.log("prevMonth>>>>",this.prevMonth)
    // console.log("prevMonth>>>>",this.prevMonth)

    const month = [{id:1,name:"Jan"}, {id:2,name:"Feb"}, {id:3,name:"Mar"}, {id:4,name:"Apr"}, {id:5,name:"May"}, {id:6,name:"Jun"}, {id:7,name:"Jul"}, {id:8,name:"Aug"}, {id:9,name:"Sep"},{id:10,name: "Oct"}, {id:11,name:"Nov"}, {id:12,name:"Dec"}];


    var id = new Date().getMonth();
    // console.log("id before cur >>>>",id);
    this.curMonth = month[id].name + '-' + new Date().getFullYear().toString().substr(-2);
    // console.log("curMonth>>>>",this.curMonth)
    if (id == 0){
      this.prevMonth = month[id+12-1].name + '-' + (new Date().getFullYear()-1).toString().substr(-2);
    }
    else{
      this.prevMonth = month[id - 1].name + '-' + new Date().getFullYear().toString().substr(-2);
    }
    // console.log("prevMonth>>>>",this.prevMonth);

    if (id == 0|| id == 1){
      this.beforeprevMonth = month[id+12 - 2].name + '-' + (new Date().getFullYear()-1).toString().substr(-2);
    }else{
      this.beforeprevMonth = month[id - 2].name + '-' + new Date().getFullYear().toString().substr(-2);
    }
    // console.log("beforeprevMonth>>>>",this.beforeprevMonth);
  }
  downloadThreeMonthImds() {
    this.ngxService.start();
    this.rest.priority3MonthExcel().subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', 'Some Error Occurred');
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
  }
  downloadTwoMonthImds() {
    this.ngxService.start();
    this.rest.priority2MonthExcel().subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', 'Some Error Occurred');
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
  }
  downloadOneMonthImds() {
    this.rest.priority1MonthExcel().subscribe((res: any) => {
      this.ngxService.start();
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', 'Some Error Occurred');
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
  }

  // triggerImpact(){
  //   this.rest.triggerImpact().subscribe((res: any) => {
  //     if (res.success) {
  //       this.triggerImpTable = res.tableJson;
  //       // console.log("res.tableJson",res.tableJson);
  //       // console.log("this.triggerImpTable",this.triggerImpTable);
  //     }
  //   });
  // }
  // triggerImpactPrev(){
  //   this.rest.triggerImpactPrev().subscribe((res: any) => {
  //     if (res.success) {
  //       this.triggerImpTablePrev = res.triggerImpTablePrev;
  //       // console.log("res.triggerImpTablePrev",res.triggerImpTablePrev);
  //     }
  //   });
  // }

  // triggerImpactPrevBefore(){
  //   this.rest.triggerImpactPrevBefore().subscribe((res: any) => {
  //     if (res.success) {
  //       this.triggerImpactPrevBefore = res.triggerImpTablePrev;
  //       // console.log("res.triggerImpTablePrev",res.triggerImpTablePrev);
  //     }
  //   });
  // }

  triggerPerformance() {
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.triggerPerformance(data).subscribe((res: any) => {
      if (res.success) {
        this.columnList = res.columnList;
        this.tableData = res.table;
        this.gwpImpact = res.gwpImpact;
        this.totalCountList = res.totalCountList;

        // console.log("this.columnList >>>>",this.columnList );
        // console.log("this.tableData >>>>",this.tableData );
        // console.log("this.gwpImpact >>>>",this.gwpImpact );
        // console.log("this.totalCountList >>>>",this.totalCountList );

      }
    });
  }





  triggerPerformanceGraph() {
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }

    let barDataPositionassist_1 = this.windowWidth * (3.784/100)
    let barDataPositionassist_2 = this.windowWidth * (1.19/100)
    let barDataPositionassist_3 = this.windowWidth * (1.19/100)
    let barDataPositionassist_4 = this.windowWidth * (3.784/100)



    this.rest.triggerPerformanceGraph(data).subscribe((res: any) => {
      if (res.success) {
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.textBaseline = "middle";
              // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y + 10);
              // ctx.align = 'justyfy'
              // ctx.fillText(datapoint, x.getPixelForValue(index)-70, chart.getDatasetMeta(0).data[index].y - 10);
              ctx.fillText(datapoint, x.getPixelForValue(index)-barDataPositionassist_1, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint , x.getPixelForValue(index)-22, chart.getDatasetMeta(1).data[index].y - 10);
              ctx.fillText(datapoint, x.getPixelForValue(index)-barDataPositionassist_2, chart.getDatasetMeta(1).data[index].y - 10);
            });
            chart.data.datasets[2].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index)+22, chart.getDatasetMeta(2).data[index].y - 10);
              ctx.fillText(datapoint, x.getPixelForValue(index)+barDataPositionassist_3, chart.getDatasetMeta(2).data[index].y - 10);
            });
            chart.data.datasets[3].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index)+70, chart.getDatasetMeta(3).data[index].y - 10);
              ctx.fillText(datapoint, x.getPixelForValue(index)+barDataPositionassist_4, chart.getDatasetMeta(3).data[index].y - 10);
            });
            ctx.rect(0, 0, 1000, 1000);
          }
        };
        if(this.chart15){
          this.chart15.clear();
          this.chart15.destroy();
      }
        this.chart15 = new Chart('triggerPerformanceGraph', {
          type: 'bar',
          data: {
            labels: res.columnList,
            datasets: [
              {
                label: "1 to 3",
                data: res.one2three,
                backgroundColor: 'rgb(0, 102, 204)',
                borderRadius:10,
                // maxBarThickness: 35,
                
                // barThickness: 35,
                // categoryPercentage:0.5,
              },
              {
                label: "4 to 6",
                data: res.four2Six,
                backgroundColor: 'rgb(241, 170, 103)',
                borderRadius:10,
                // maxBarThickness: 35,
                // barThickness: 35,
                // categoryPercentage:0.5,
              },
              {
                label: "7 to 9",
                data: res.sev2Nine,
                backgroundColor: 'rgb(255, 192, 203)',
                borderRadius:10,
                // maxBarThickness: 35
                // barThickness: 35,
                // categoryPercentage:0.5,
              },
              {
                label: "10 to 12",
                data: res.ten2Twel,
                backgroundColor: 'rgb(54, 163, 222)',
                borderRadius:10,
                // maxBarThickness: 35
                // barThickness: 35,
                // categoryPercentage:0.5,
                
              },
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
                bottom:30,
              },
            },
            // aspectRatio: 2.5,
            responsive: false,
            // maintainAspectRatio: false,
            plugins: {
              legend: {
                title:{
                  display:true,
                  text: 'Vintage Bucket',
                  color:'rgb(0, 69, 116)',
                  font:{
                    weight:'normal',
                    size: 13,
                  },
                },
                position: 'top',
                align: 'end',
                display: true,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                  },
                },
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
                    return res.columnList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                // stacked: true,
                title: {
                  text: 'Sub Channel',
                  color: 'black',
                  display: true,

                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                },
                beginAtZero: false,
                grid:{
                  display:false,
                },
              },
              y: {
                // stacked: true,
                // beginAtZero: true,
                title: {
                  color: 'black',
                  display: true,
                  text: 'Contribution (%)',
                  font: {
                    weight: 'bold',// Make the legend labels bold

                  },
                },
                ticks: {
                  display: false,
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
        this.chart.push(this.chart15);
      }
    });
  }

  threeMonthsGwpGraph(){
    this.rest.threeMonthsGwpGraph().subscribe((res: any) => {
      if (res.success) {
        console.log("res>>>",res)
    var topLables = {
      id: 'topLables',
      afterDatasetsDraw: (chart:any, args:any, options:any) => {
        const { ctx, scales: { x, y } } = chart;
        chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
          // console.log("datapoint>>>",datapoint)
          ctx.font = '500 12px sans-serif';
          ctx.fillStyle = 'black';
          ctx.fillText(datapoint+' L', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);

        });
      }
    }
    if(this.chart16){
      this.chart16.clear();
      this.chart16.destroy();
  }
    this.chart16 = new Chart('threeMonthsGwpGraph', {
      type: 'line',
      // type: 'bar',
      data: {
        labels: res.columnList,
        datasets: [
          {
            label: "Total GWP (L)",
            data: res.gpw3month,
            backgroundColor: 'rgb(250, 0, 0)',
            borderColor:'rgb(250, 0, 0)',
            borderWidth: 1,
            
          },
          
        ]
      },
      options: {
        // layout: {
        //   padding: {
        //     top: 10,
        //     right:10,
        //     left:10,
        //   },
        // },
        // aspectRatio: 2.5,
        // maintainAspectRatio:false,
        responsive: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              color: 'black',
              font: {
                weight: 'normal',
              }
            },
          },
          // tooltip: {
          //   callbacks: {
          //     title: function (context) {
          //       return res.columnList[context[0].dataIndex].toString().replaceAll(',', ' ');
          //     }
          //   }
          // }
        },
        scales: {
          x: {
            offset:true,
            title: {
              text: 'Month',
              color: 'black',
              display: true,
              font: {
                weight: 'normal',
                size: 13,
              },
            },
            ticks: {
              color: 'black',
              display: true,
              font: {
                weight: 'normal',
              },
              padding:10,
            },
            grid:{
              display:false,
            },
            beginAtZero: true,
            
          },
          y: {
            title: {
              color: 'black',
              display: true,
              text: 'GWP',
              font: {
                weight: 'normal',// Make the legend labels bold

              },
            },
            ticks: {
              color: 'black',
              display: false,
              font: {
                weight: 'normal',
              },

            },
            grid:{
              display:false,
            },
            beginAtZero: true,
            // suggestedMin: 10,
          }
        },
        interaction: {
          mode: 'index'
        }
      },
      plugins: [this.plugin, topLables, this.legendMarging],

    });
    this.chart.push(this.chart16);
  }
});
  }




  agent_degrowth_priority_wise(){
    this.rest.agent_degrowth_priority_wise().subscribe((res: any) => {
      if (res.success) {
        this.actionable_highlightData = res.data
        
      }else{
        console.log("error in actionable highlights")
      }
    });
  }






  empPerformance(){
    const data = {
      user_agent_id: this.user_agent_id,
    }
    this.rest.empPerformance(data).subscribe((res: any) => {
      if (res.success) {
        this.empPerformTable = res.empPerformTable;
        this.empPerformcolList = res.columnList;
        // console.log("res.empPerformTable",res.empPerformTable);
      }
    });
  }

  download3MonthImdSlob(){
    this.ngxService.start();
    this.rest.download3MonthImdSlob().subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
  }
  download2MonthImdSlob(){ 
    this.ngxService.start();
    this.rest.download2MonthImdSlob().subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
   }
  download1MonthImdSlob(){ 
    this.ngxService.start();
    this.rest.download1MonthImdSlob().subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
   }

  //  countSlob(){
  //   const data = {
  //     triggerDate: '2024-02-05',
  //   }
  //   this.rest.countSlob(data).subscribe((res: any) => {
  //     if (res.success) {
  //     this.countSlobDict  = res.totalCountList;
  //     this.lobSegList  = res.lobSegRes;
  //     // console.log("this.countSlobDict>>>>",this.countSlobDict);
  //     // console.log("this.lobSegList>>>>",this.lobSegList);
  //     for (var key in this.lobSegList[0]) {
  //       if (this.lobSegList[0].hasOwnProperty(key)) {
  //         this.columnsArr.push(key);
  //         // console.log("this.columnsArr>>",this.columnsArr);
  //       }
  //     }
  //     }
  //   });
  //  }

   actImdsDownload(){
    const data = {
      user_agent_id: this.user_agent_id,
    }
    this.ngxService.start();
    this.rest.actImdsDownload(data).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        let fileName = res.filename
        window.open(this.rest.file_path + '/downloads/' + fileName)
      }
      else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.ngxService.stop();
      this.notifier.notify('error', 'Some Error Occurred');
    });
   }

   subChannelwiseTotal(){

    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }

    this.rest.subChannelwiseTotal(data).subscribe((res: any) => {
      if (res.success) {
        this.dropdownList_d_growing_imd_sub_channel = res.columnList1

        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = 'center'
              ctx.fillText(datapoint+"%", x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
            });
          }
        }
        if(this.chart17){
          this.chart17.clear();
          this.chart17.destroy();
      }
        this.chart17 = new Chart('subChannelwiseTotal', {
          type: 'bar',
          data: {
            labels: res.columnList,
            datasets: [
              {
                label: "Contribution (%)",
                data: res.subChCntTotal,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness:35,
                maxBarThickness: 40,
                borderRadius:10,

                // barPercentage: 0.5,
                // categoryPercentage: 0.9,
              },
            ]
          },
          options: {
            layout: {
              padding: {
                top: 10,
              },
            },
            // aspectRatio: 2.5,
            responsive: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 10,
                  color: 'black',
                  font: {
                    weight: 'normal',
                  }
                }
              },
              tooltip: {
                callbacks: {
                  title: function (context) {
                    return res.columnList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  text: 'Sub channel',
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'bold',
                    size: 13,
                  },
                },
                ticks: {
                  color: 'black',
                  display: true,
                  font: {
                    weight: 'normal',
                  },
                  // stepSize: 10,
                  autoSkip:false,
                  maxTicksLimit:7,
                },
                grid:{
                  display:false,
                },
                
              },
              y: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'Degrowing Contribution (%)',
                  font: {
                    weight: 'bold',// Make the legend labels bold

                  },
                },
                ticks: {
                  color: 'black',
                  display: false,
                  font: {
                    weight: 'normal',
                  },
                },
                grid:{
                  display:false,
                },
              }
            },
            interaction: {
              mode: 'index'
            },

            onClick: (event, chartElement) => {
              // console.log(chartElement.length)
              if (chartElement.length > 0) {

                const clickedIndex = chartElement[0].index;
                const datasetIndex = chartElement[0].datasetIndex;
                const label = this.chart17.data.labels[clickedIndex];
                const value = this.chart17.data.datasets[datasetIndex].data[clickedIndex];
                console.log('Clicked on bar:', label, 'with value:', value);
                // Handle click action here
                let concatenatedString = label.join(' ');
                this.lessthan_1yr_mtd_down_name = concatenatedString
                console.log(this.lessthan_1yr_mtd_down_name,typeof(this.lessthan_1yr_mtd_down_name))
                // this.openModal_lessthan_1yr_mtd_down(lessthan_1yr_mtd_down, concatenatedString)
                // this.status_lessthan_1yr_mtd_down = true
                // this.subChannelDegrowGraph();
                this.open_lessthan_1yr_mtd_down()
              }
              else{
                this.lessthan_1yr_mtd_down_name = ""
              }
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
        this.chart.push(this.chart17);
      }
    });
   }





  openModal_lessthan_1yr_mtd_down(lessthan_1yr_mtd_down: any): void {

    // const modalRef = this.modalService.open(lessthan_1yr_mtd_down, { centered: true });
    // let modalRef: any

    // if(this.lessthan_1yr_mtd_down_name != ""){
    //     this.modalService.open(lessthan_1yr_mtd_down, {centered: true});
    // }
    setTimeout(() => {
      if(this.lessthan_1yr_mtd_down_name != ""){
          
          this.modalService.open(lessthan_1yr_mtd_down, {centered: true});
      }
    }, 250);

    // modalRef.result.then((result) => {
    //   // Modal closed with a result
    //   this.lessthan_1yr_mtd_down_name = "";
    // }, (reason) => {
    //     // Modal dismissed
    //     this.lessthan_1yr_mtd_down_name = "";
    // });
    
  }
  closeModal_lessthan_1yr_mtd_down(){
    this.lessthan_1yr_mtd_down_name = ""
    this.modalService.dismissAll();
    this.status_lessthan_1yr_mtd_down = false
  }

  close_lessthan_1yr_mtd_down(){
    this.status_lessthan_1yr_mtd_down = false;
    this.subChannelwiseTotal();
    this.lessthan_1yr_mtd_down_name = "";
    // setTimeout(() => {
    //     this.status_lessthan_1yr_mtd_down = false;
    // }, 250);   

  }

  open_lessthan_1yr_mtd_down(){
    console.log("999999")
    
    this.status_lessthan_1yr_mtd_down = true
    this.subChannelDegrowGraph();

    // setTimeout(() => {
    //   this.status_lessthan_1yr_mtd_down = true
    // }, 250);  
  }









  triggerImpact(){
    this.rest.triggerImpact().subscribe((res: any) => {
      if (res.success) {
        this.triggerImpTable = res.tableJson; // this is for making table format
        // console.log("res.tableJson",res.tableJson);
        // console.log("this.triggerImpTable",this.triggerImpTable);


        let triggerDateList = [] as any;
        let growPercent_list = [] as any;
        let highlighted_list = [] as any;
        let stillDegrow_list = [] as any;

        for(let r of res.tableJson){

          triggerDateList.push(r.TRIGGER_DATE)
          growPercent_list.push(r.growPer)
          highlighted_list.push(r.highlighted)
          stillDegrow_list.push(r.stillDegrow)
          
        }

        console.log("triggerDateList--->>", triggerDateList)
        console.log("growPercent_list--->>", growPercent_list)
        console.log("highlighted_list--->>", highlighted_list)
        console.log("stillDegrow_list--->>", stillDegrow_list)




        if (this.triggerImpact_table_chart) {
          this.triggerImpact_table_chart.clear();
          this.triggerImpact_table_chart.destroy();
        }





        this.triggerImpact_table_chart = new Chart('triggerImpact_table_chart', {

          
          type: 'line', //this denotes tha type of chart
          // shared: true,
          data: {// values on X-Axis
            labels: triggerDateList.reverse(),
            datasets: [
              {
                label: "Growing Entity Contribution (%)",
                data: growPercent_list.reverse(),
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: '#000000',
                borderWidth: 1,
                fill: true,
              },
              {
                label: "Highlighted",
                data: highlighted_list.reverse(),
                backgroundColor: '#79de79',
                borderColor: '#000000',
                borderWidth: 1,
                fill: true,
              },
              {
                label: "Still Degrowing",
                data: stillDegrow_list.reverse(),
                backgroundColor: 'rgb(255, 185, 94)',
                borderColor: '#000000',
                borderWidth: 1,
                fill: true,
              },
              // {
              //   label: "C",
              //   data: res.list_C,
              //   backgroundColor: '#ff8439',
              //   borderColor: '#ff8439',
              //   borderWidth: 1,
              //   fill: true,
              // },
              // {
              //   label: "D",
              //   data: res.list_D,
              //   backgroundColor: '#e84258',
              //   borderColor: '#e84258',
              //   borderWidth: 1,
              //   fill: true,
              // },
            ]
          },
          options: {
            layout: {
              padding: 10,
            },
            aspectRatio: 4.2,
            // responsive: false,
            plugins: {
              legend: {

                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 10,
                  color: 'black',
                  font: {
                    weight: 'normal',
                  }
                },
              },
              // tooltip: {
              //   callbacks: {
              //     afterTitle: function (context) {
              //       console.log("context", context[0].dataIndex);
              //       return 'BANDING: ' + res.bandingData[context[0].dataIndex];
              //     }
              //   }
              // }
            },
            scales: {
              y: {
                stacked: true,
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                title: {
                  color: 'black',
                  display: true,
                  text: '',
                  font: {
                    weight: 'normal',// Make the legend labels bold

                  },
                },
              },
              x: {
                grid: {
                  display: false
                },
                title: {
                  color: 'black',
                  display: true,
                  text: 'Trigger Dates',
                  font: {
                    size: 12,
                    weight: 'bold',// Make the legend labels bold

                  },
                },
              }
            },
            interaction: {
              mode: 'index'
            }

          }

        });

      }else {
        console.log(" I am in else part");
      }
    });
  }


  // getcomparison() {
  //   const data = {
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }

  //   // console.log("this.month_selectedItems>>>",this.month_selectedItems);
  //   this.rest.getcomparison(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // console.log("res>>>",res)
  //       this.comparisonDetails = res.result;
  //       this.comparisonColumns = res.columns;

  //       if (this.chart3) {
  //         this.chart3.clear();
  //         this.chart3.destroy();
  //       }
  //       this.chart3 = new Chart('bandComparison', {
  //         type: 'line', //this denotes tha type of chart
  //         // shared: true,
  //         data: {// values on X-Axis
  //           labels: res.graphLevel,
  //           datasets: [
  //             {
  //               label: "A+",
  //               data: res.list_A_plus,
  //               backgroundColor: '#0cc078',
  //               borderColor: '#0cc078',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "A",
  //               data: res.list_A,
  //               backgroundColor: '#79de79',
  //               borderColor: '#79de79',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "B",
  //               data: res.list_B,
  //               backgroundColor: '#ffd366',
  //               borderColor: '#ffd366',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "C",
  //               data: res.list_C,
  //               backgroundColor: '#ff8439',
  //               borderColor: '#ff8439',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "D",
  //               data: res.list_D,
  //               backgroundColor: '#e84258',
  //               borderColor: '#e84258',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //           ]
  //         },
  //         options: {
  //           layout: {
  //             padding: 10,
  //           },
  //           aspectRatio: 3.5,
  //           // responsive: false,
  //           plugins: {
  //             legend: {

  //               display: true,
  //               position: 'top',
  //               align: 'end',
  //               labels: {
  //                 boxWidth: 15,
  //                 boxHeight: 10,
  //                 color: 'black',
  //                 font: {
  //                   weight: 'normal',
  //                 }
  //               },
  //             },
  //             // tooltip: {
  //             //   callbacks: {
  //             //     afterTitle: function (context) {
  //             //       console.log("context", context[0].dataIndex);
  //             //       return 'BANDING: ' + res.bandingData[context[0].dataIndex];
  //             //     }
  //             //   }
  //             // }
  //           },
  //           scales: {
  //             y: {
  //               stacked: true,
  //               ticks: {
  //                 display: false
  //               },
  //               grid: {
  //                 display: false
  //               },
  //               title: {
  //                 color: 'black',
  //                 display: true,
  //                 text: 'Total IMds',
  //                 font: {
  //                   weight: 'normal',// Make the legend labels bold

  //                 },
  //               },
  //             },
  //             x: {
  //               grid: {
  //                 display: false
  //               },
  //             }
  //           },
  //           interaction: {
  //             mode: 'index'
  //           }

  //         }

  //       });

        
        

  //     } else {
  //       console.log(" I am in else part");
  //     }
  //   });
  // }



















  // new work done with Rishu and Rshabh --- API written by Rishabh -----------------------------
  overAllAgents = '' as any;
  degrowingAgents = '' as any;
  cylmtd = '' as any;
  mtd = '' as any;

  getAgentsLtGt1yr() {

    this.rest.getAgentsLtGt1yr().subscribe((res: any) => {
      if(res.success){

        this.overAllAgents = res.count_of_agents_lt_1;
        this.degrowingAgents = res.count_of_agents_lt_1_degrowing;
        this.cylmtd = res.prev_month_lt_1_mtd;
        this.mtd = res.current_month_lt_1_mtd;




        // making of Degrowing Entity Contribution Chart
        this.prepareDegrowingEntityContribution(res.agents_lt_1_degrow_contribution)
 

      }else{

      }
    });
      
  }

  prepareDegrowingEntityContribution(res: any){
    // if (res.success) {
      this.dropdownList_d_growing_imd_sub_channel = res.columnList1

      var topLables = {
        id: 'topLables',
        afterDatasetsDraw: (chart:any, args:any, options:any) => {
          const { ctx, scales: { x, y } } = chart;
          chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center'
            ctx.fillText(datapoint+"%", x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
          });
        }
      }
      if(this.chart17){
        this.chart17.clear();
        this.chart17.destroy();
    }
      this.chart17 = new Chart('subChannelwiseTotal', {
        type: 'bar',
        data: {
          labels: res.columnList,
          datasets: [
            {
              label: "Contribution (%)",
              data: res.subChCntTotal,
              backgroundColor: 'rgb(0, 102, 204)',
              barThickness:35,
              maxBarThickness: 40,
              borderRadius:10,

              // barPercentage: 0.5,
              // categoryPercentage: 0.9,
            },
          ]
        },
        options: {
          layout: {
            padding: {
              top: 10,
            },
          },
          // aspectRatio: 2.5,
          responsive: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                color: 'black',
                font: {
                  weight: 'normal',
                }
              }
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  return res.columnList[context[0].dataIndex].toString().replaceAll(',', ' ');
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                text: 'Sub channel',
                color: 'black',
                display: true,
                font: {
                  weight: 'bold',
                  size: 13,
                },
              },
              ticks: {
                color: 'black',
                display: true,
                font: {
                  weight: 'normal',
                },
                // stepSize: 10,
                autoSkip:false,
                maxTicksLimit:7,
              },
              grid:{
                display:false,
              },
              
            },
            y: {
              title: {
                color: 'black',
                display: true,
                text: 'Degrowing Contribution (%)',
                font: {
                  weight: 'bold',// Make the legend labels bold

                },
              },
              ticks: {
                color: 'black',
                display: false,
                font: {
                  weight: 'normal',
                },
              },
              grid:{
                display:false,
              },
            }
          },
          interaction: {
            mode: 'index'
          },

          onClick: (event, chartElement) => {
            // console.log(chartElement.length)
            if (chartElement.length > 0) {

              const clickedIndex = chartElement[0].index;
              const datasetIndex = chartElement[0].datasetIndex;
              const label = this.chart17.data.labels[clickedIndex];
              const value = this.chart17.data.datasets[datasetIndex].data[clickedIndex];
              console.log('Clicked on bar:', label, 'with value:', value);
              // Handle click action here
              let concatenatedString = label.join(' ');
              this.lessthan_1yr_mtd_down_name = concatenatedString
              console.log(this.lessthan_1yr_mtd_down_name,typeof(this.lessthan_1yr_mtd_down_name))
              // this.openModal_lessthan_1yr_mtd_down(lessthan_1yr_mtd_down, concatenatedString)
              // this.status_lessthan_1yr_mtd_down = true
              // this.subChannelDegrowGraph();
              this.open_lessthan_1yr_mtd_down()
            }
            else{
              this.lessthan_1yr_mtd_down_name = ""
            }
          }
        },
        plugins: [this.plugin, topLables, this.legendMarging],

      });
      this.chart.push(this.chart17);
    // }
  }




  degrowingAgentZonal() {
    const data = {
      channel: 'GROWTH MARKETS'
    }

    this.rest.degrowingAgentZonal(data).subscribe((res: any) => {
      if(res.success){

        let res1 = {
          "data_gt_1": [
            {
              "data": "Amitoz Singh",
              "value": 4
            },
            {
              "data": "Daxesh Panchal",
              "value": 1118
            },
            {
              "data": "Deepak Pachauri",
              "value": 521
            },
            {
              "data": "HO",
              "value": 5
            },
            {
              "data": "Harisankar Mohapatra",
              "value": 860
            },
            {
              "data": "Priyank Singh",
              "value": 422
            },
            {
              "data": "Puneet Kumar Jain",
              "value": 758
            },
            {
              "data": "Rajesh Shah",
              "value": 2
            },
            {
              "data": "Shruty Sinha",
              "value": 4
            },
            {
              "data": "Srinivas Bodhukam",
              "value": 450
            },
            {
              "data": "TBI_Mumbai",
              "value": 2
            },
            {
              "data": "Varun Patni",
              "value": 384
            },
            {
              "data": "Vijay Hinduja",
              "value": 836
            },
            {
              "data": "Vipul Mistry",
              "value": 1
            }
          ],
          "data_lt_1": [
            {
              "data": "Daxesh Panchal",
              "value": 164
            },
            {
              "data": "Deepak Pachauri",
              "value": 88
            },
            {
              "data": "HO",
              "value": 1
            },
            {
              "data": "Harisankar Mohapatra",
              "value": 278
            },
            {
              "data": "Priyank Singh",
              "value": 47
            },
            {
              "data": "Puneet Kumar Jain",
              "value": 115
            },
            {
              "data": "Rajesh Shah",
              "value": 2
            },
            {
              "data": "Santosh Mishra",
              "value": 1
            },
            {
              "data": "Srinivas Bodhukam",
              "value": 63
            },
            {
              "data": "TBA-ZH-MUM&GOA",
              "value": 1
            },
            {
              "data": "Varun Patni",
              "value": 137
            },
            {
              "data": "Vijay Hinduja",
              "value": 135
            }
          ],
          "success": true,
          "x_categories_gt_1": [
            "Arindom Sarkar",
            "Sudhir Nijhawan",
            "Jitendra Hodawadekar",
            "Narayana B",
            "HO",
            "Sharan Ethiraj",
            "Himanshu Parmanand Chanchlani",
            "Surender Singh",
            "-",
            "TBA-North",
            "Ashok Kumar Mor",
            "Mudit Verma",
            "Xavier Attkumar Jeyaseela Dasan",
            "Ronaldo Fernandes",
            "Jiteshkumar Patel",
            "Vipul Mistry",
            "Santosh Mishra",
            "Surya P S S",
            "Deepak Pachauri",
            "Vijay Hinduja",
            "Daxesh Panchal",
            "Harisankar Mohapatra",
            "Puneet Kumar Jain",
            "Srinivas Bodhukam",
            "Priyank Singh",
            "Varun Patni",
            "Sreejith Chandran",
            "Navjot Singh",
            "TBA Amit Mohanty",
            "Himanshu Modi",
            "Pravin Bhausaheb Magar",
            "TBA-ZH-MUM&GOA",
            "TBA-ZH-EAST",
            "Amit Mohanty",
            "Rajesh Shah",
            "TBI_Mumbai",
            "Amitoz Singh",
            "Rajarshi Roy",
            "Tanaz Patrawala",
            "Ravisankar R",
            "Ansh Arora",
            "Rajesh Bhupendrabhai Shah",
            "Shruty Sinha"
          ],
          "x_categories_lt_1": [
            "Arindom Sarkar",
            "Sudhir Nijhawan",
            "Jitendra Hodawadekar",
            "Narayana B",
            "HO",
            "Sharan Ethiraj",
            "Himanshu Parmanand Chanchlani",
            "Surender Singh",
            "-",
            "TBA-North",
            "Ashok Kumar Mor",
            "Mudit Verma",
            "Xavier Attkumar Jeyaseela Dasan",
            "Ronaldo Fernandes",
            "Jiteshkumar Patel",
            "Vipul Mistry",
            "Santosh Mishra",
            "Surya P S S",
            "Deepak Pachauri",
            "Vijay Hinduja",
            "Daxesh Panchal",
            "Harisankar Mohapatra",
            "Puneet Kumar Jain",
            "Srinivas Bodhukam",
            "Priyank Singh",
            "Varun Patni",
            "Sreejith Chandran",
            "Navjot Singh",
            "TBA Amit Mohanty",
            "Himanshu Modi",
            "Pravin Bhausaheb Magar",
            "TBA-ZH-MUM&GOA",
            "TBA-ZH-EAST",
            "Amit Mohanty",
            "Rajesh Shah",
            "TBI_Mumbai",
            "Amitoz Singh",
            "Rajarshi Roy",
            "Tanaz Patrawala",
            "Ravisankar R",
            "Ansh Arora",
            "Rajesh Bhupendrabhai Shah",
            "Shruty Sinha"
          ]
        }
        this.prepareDegrowingAgentZonalwiseGraph(res1);
      }else{

      }
    });
      
  }


  splitStringsBySpaces(inputArray: any) {
    return inputArray.map((item: any) => item.split(" "));
  }



  prepareDegrowingAgentZonalwiseGraph(res: any){
    if (res.success) {

      const dataList = res.data_gt_1.map((item:any)=>{
        return item.value
      });

      const x_axis_cat_List = res.data_gt_1.map((item:any)=>{
        return item.data
      });

      console.log("dataList", dataList)
      console.log("x_axis_cat_List", x_axis_cat_List)


      // console.log("res.zhNamesList >>>>",res.zhNamesList )
      // console.log("res.zhDegrowthPer >>>>",res.zhDegrowthPer )
      var topLables = {
        id: 'topLables',
        afterDatasetsDraw: (chart:any, args:any, options:any) => {
          const { ctx, scales: { x, y } } = chart;
          chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign= 'center';
            ctx.fillText(datapoint + '%', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
            // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);
          });
        }
      }
      
      
      if(this.chart2){
        // console.log("this.chart2>>>",this.chart2);
        this.chart2.clear();
        this.chart2.destroy();
    }
     

      this.chart2 = new Chart('underPerZh', {
        type: 'bar',
        data: {
          // labels: res.zhNamesList,
          // labels: this.splitStringsBySpaces(res.x_categories_lt_1),
          labels: this.splitStringsBySpaces(x_axis_cat_List),
          datasets: [
            {
              label: "Contribution (%)",
              // data: res.zhDegrowthPer,
              data: dataList,
              backgroundColor: 'rgb(0, 102, 204)',
              barThickness: 40,
              borderRadius: 10,
            },
            // {
            //   label: "MTD GWP",
            //   data: res.CurrentMonthList,
            //   backgroundColor: 'rgb(54, 162, 235)'
            // }
          ],
          
        },
        options: {
          // onClick: (event, elements) => {
          //   if (elements.length) { 
          //     const clickedElement = elements[0];             
          //     const datasetIndex = clickedElement.datasetIndex;             
          //     const index = clickedElement.index; 
          //     const drillDownData = [5, 10, 15];
          //     this.chart.data.datasets[0].data = drillDownData;             
          //     this.chart.update();
          //     // const label = this.chart.data.res.zhNamesList[index];             
          //     const value = this.chart.data.res.zhDegrowthPer[datasetIndex].data[index];

          //     console.log("Clicked Element:", clickedElement);             
          //     // console.log("Label:", label);             
          //     console.log("Value:", value);
          //   }},
        
          layout: {
            padding: {
              top: 10,
            },
          },
          aspectRatio: 2.5,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              display: true,
              labels: {
                color: 'black',
                boxHeight: 10,
                boxWidth:10,
                font: {
                  weight: 'normal',
                }
              }
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  // return res.zhNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  return x_axis_cat_List[context[0].dataIndex].toString().replaceAll(',', ' ');
                },
              }
            },
          },
          scales: {
            x: {
              title: {
                text: 'Zonal Head',
                color: 'black',
                display: true,
                font: {
                  weight: 'bold',
                  size: 13,
                },
                
              },
              ticks: {
                color: 'black',
                display: true,
                font: {
                  weight: 'normal',
                },

              },
              grid:{
                display:false,
              },
            },
            y: {
              title: {
                color: 'black',
                display: true,
                text: 'Contribution (%)',
                font: {
                  weight: 'bold',// Make the legend labels bold
                },
              },
              ticks:{
                display: false,
              },
              grid:{
                display:false,
              },
            }
          },
          interaction: {
            mode: 'index'
          }
        },
        plugins: [this.plugin, topLables, this.legendMarging],
      });
      
      this.chart.push(this.chart2);
    }
  }




  mtdDowntrend() {
    const data= {
      channel: 'GROWTH MARKETS'
    }

    this.rest.mtdDowntrend(data).subscribe((res: any) => {
      if(res.success){

      }else{

      }
    });
      
  }




  callTogether(){
    // this.triggerPerformanceGraph();

      // rishabh APIs
      this.getAgentsLtGt1yr();
      this.degrowingAgentZonal();
      this.mtdDowntrend();


      // rishu APIs
      this.triggerImpact();
      this.threeMonthsGwpGraph();
      this.agent_degrowth_priority_wise();
  }







































}
