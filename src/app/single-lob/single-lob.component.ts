import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import Chart from 'chart.js/auto';
import {  ChartOptions, ChartType } from 'chart.js';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NotifierService } from "angular-notifier";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'chartjs-plugin-datalabels';
import * as Highcharts from 'highcharts'; // Import Highcharts library
import 'chartjs-plugin-datalabels'; // Import data labels plugin
// import { ShowDataLabelsPlugin } from './show-data-labels.plugin'; 
// import { ChartConfiguration, ChartDataSets, PieChartOptions } from 'chart.js';


// import { saveAs } from 'file-saver';
import * as html2canvas from 'html2canvas';
import { CommonService } from '../common.service';
// import { html2canvas } from 'html2canvas';






@Component({
  selector: 'app-single-lob',
  templateUrl: './single-lob.component.html',
  styleUrls: ['./single-lob.component.css']
})
export class SingleLobComponent implements OnInit {
  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;
  
  first_triggerDate = this.common.getTriggerDate().fstTrigDateSlob
  last_triggerDate = this.common.getTriggerDate().lstTrigDateSlob

  
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
  pieChart = '' as any;
  lob_subchannel_wise_Chart= '' as any;
  teamContribution_PieChart = '' as any;


  lobWisePiechart: any;

  // # drill downs
  zh_lobAndLevelwisePC: any;
  Zh_drillDownStat = false as any;
  zh_agentid = '' as any
  zh_name = '' as any;

  ch_lobAndLevelwisePC: any;
  ch_drillDownStat = false as any;
  ch_agentid = '' as any
  ch_name = '' as any;

  rm_lobAndLevelwisePC: any;
  rm_drillDownStat = false as any;
  rm_agentid = '' as any
  rm_name = '' as any;

  



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
  constructor(private rest: RestApiService, private ngxService: NgxUiLoaderService, private notifier: NotifierService, private modalService: NgbModal,private common: CommonService) {
    // this.windowWidth = window.innerWidth;
    console.log("window width--->>", this.windowWidth, typeof(this.windowWidth))
    sessionStorage.setItem("triggerTrackerPage", '3');
   }
  ngOnInit(): void {
    
    this.teamContributionPieChart()
    this.triggerImpact();
    this.getCurrentMonth();
    
    this.getPriorityCountSLob();
    this.getPriorityCount();
    this.countSlob();
    // this.singleChannelGraph();
    this.sLob1yr();

    this.subChannelwisePieChart();
    // this.subChannelwisePieChart_hc();




    this.lobwisePieChart();
    // this.threeMonthsGwpGraph(); //Previous 3 Months GWP
    this.lobandSubChPieChart();
    // this.zh_lobAndLevelwisePieChart()
    

    // console.log("this.designationType>>>",this.designationType)
    // console.log("this.user_agent_id>>>",this.user_agent_id)
    
  }

  // this section is for multi select
  channelDropdownSettings(){
    this.dropdownSettings_d_growing_imd_sub_channel = { idField: 'id',textField: 'channelNewName',allowSearchFilter: true, enableCheckAll: true, itemsShowLimit: 1, selectAllText: 'Select All', };
  }
  onItemSelect(item: any) {
    // console.log(this.selected_d_growing_imd_sub_channel)
  }
  onItemDeSelect(item: any) {
    // console.log(this.selected_d_growing_imd_sub_channel)
  }

  // Method to handle "Select All"
  onSelectAll(items: any) {
    this.selected_d_growing_imd_sub_channel = [...this.dropdownList_d_growing_imd_sub_channel]; // Select all items
    // console.log(this.selected_d_growing_imd_sub_channel)
  }

  // Method to handle "Deselect All"
  onDeSelectAll(items: any) {
    // console.log('All items deselected:', items);
    this.selected_d_growing_imd_sub_channel = []; // Deselect all items
    // console.log(this.selected_d_growing_imd_sub_channel)
  }

  chartClicked(event: any): void {

    // console.log(event)
    // if (event.active.length > 0) {
    //   const clickedIndex = event.active[0]._index;
    //   const clickedDatasetIndex = event.active[0]._datasetIndex;
    //   console.log('Bar clicked:', clickedIndex, clickedDatasetIndex);
    //   // Do something with the clicked index or dataset index
    // }
  }













  getsubChannel(){
    // console.log("manipulate_vinLess1yr", this.vinLess1yr);
    // if (this.designationType == 'NH'){
    //   this.underPerformingGraphZh();
    //   this.underPerformingGraphCh();
    //   this.underPerformingGraphRm();
    //   this.mtdDowntrendGraphZh();
    //   this.mtdDowntrendGraphCh();
    //   this.mtdDowntrendGraphRm();

    // }
    // else if(this.designationType == 'ZH'){
    //   this.empPerformance();
    //   this.underPerformingGraphCh();
    //   this.underPerformingGraphRm();
    //   this.mtdDowntrendGraphRm();
    //   this.underPerformChGraphforZh();
    // }
    // else if(this.designationType == 'CH'){
    //   this.empPerformance();
    //   this.underPerformingGraphRm();
    //   this.underPerformRmGraphforCh();
    // }
    // else if(this.designationType == 'RM'){
    //   this.empPerformance();
    // }
    if (this.designationType == 'NH'){
      this.sLobGraphZh();
      this.sLobGraphCh();
      this.sLobGraphRm();
    }else if(this.designationType == 'ZH'){
      this.sLobGraphCh();
      this.sLobGraphRm();
    } else if(this.designationType == 'CH'){
      this.sLobGraphRm();
    }
    // console.log("this.subChannel>>>>>>",this.subChannel)

    
  }

  

  sLob1yr() {
    
    if (this.designationType == 'NH'){
      this.sLobGraphZh();
      this.sLobGraphCh();
      this.sLobGraphRm();
    }else if(this.designationType == 'ZH'){
      this.sLobGraphCh();
      this.sLobGraphRm();
    } else if(this.designationType == 'CH'){
      this.sLobGraphRm();
    }

    // console.log("manipulate_vinLessGT1yr", this.vinLess1yr)
  }
  

  

  sLobGraphZh(){


    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      subChannel: this.subChannel
    }


    this.rest.sLobGraphZh(data).subscribe((res: any) => {
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
              ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);

            });
          }
        }
        if(this.chart12){
          this.chart12.clear();
          this.chart12.destroy();
      }
        this.chart12 = new Chart('sLobGraphZh', {
          type: 'bar',
          data: {
            labels: res.zhNamesList,
            datasets: [
              {
                label: "Contribution (%)",
                data: res.zhDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius:10,
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
                    return res.zhNamesList[context[0].dataIndex].toString().replaceAll(',', ' ');
                  }
                }
              }
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
                  text: 'Contribution',
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
              this.Zh_drillDownStat = true;
              const clickedIndex = chartElement[0].index;
              const datasetIndex = chartElement[0].datasetIndex;
              const label = this.chart12.data.labels[clickedIndex];
              const value = this.chart12.data.datasets[datasetIndex].data[clickedIndex];
              // console.log('Clicked on bar:', label, 'with value:', value);

              let concatenatedString = label.join(' ');
              this.zh_name = concatenatedString

              // this.zh_name = label

              this.zh_lobAndLevelwisePieChart()
            }
          },
          
          plugins: [this.plugin, topLables, this.legendMarging],

        });
        this.chart.push(this.chart12);
      }
    });
  }

  sLobGraphCh(){
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      subChannel: this.subChannel
    }
    this.rest.sLobGraphCh(data).subscribe((res: any) => {
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
              ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              ctx.font = '12px serif';
              ctx.fillStyle = 'rgb(60, 60, 60';
              ctx.fillText('Circle Head', 30, bottom + 30);
              ctx.fillText('Zonal Head', 30, bottom + 80);
            });
          }
        };
        if(this.chart13){
          this.chart13.clear();
          this.chart13.destroy();
      }
        this.chart13 = new Chart('sLobGraphCh', {
          type: 'bar',
          data: {

            datasets: [
              {
                label: "Contribution (%)",
                data: res.chDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius:10,
              },
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
                  text: 'Contribution',
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
              // this.ch_lobAndLevelwisePieChart()
              this.ch_drillDownStat = true;
              // console.log("chart Elementd--",(chartElement[0]))
              const clickedIndex = chartElement[0].index;
              const datasetIndex = chartElement[0].datasetIndex;clickedIndex

              // console.log("datasetIndex", datasetIndex)

              // console.log('clickedIndex:', clickedIndex,typeof(clickedIndex));

              // console.log("this.chart13.data-->",this.chart13.data.datasets[0])
              const label = this.chart13.data.labels[clickedIndex];
              const value = this.chart13.data.datasets[datasetIndex].data[clickedIndex];
              // console.log('Clicked on bar:', label, 'with value:', value);

              var chnl_list = res.chNamesList
              // console.log("chNamesList--->",chnl_list ,typeof(chnl_list))

              

              let chN = chnl_list[clickedIndex]
              // console.log("chn--:", chN)

              

              let concatenatedString = chN.join(' ');
              this.ch_name = concatenatedString

              

              // this.zh_name = label

              this.ch_lobAndLevelwisePieChart()
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],

        });
      }
      this.chart.push(this.chart13);
    });
  }

  sLobGraphRm(){
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      subChannel: this.subChannel
    }
    this.rest.sLobGraphRm(data).subscribe((res: any) => {
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
              ctx.fillText(datapoint + ' %', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              ctx.font = '12px serif';
              ctx.fillStyle = 'rgb(60, 60, 60';
              ctx.fillText('RM Head', 30, bottom + 35);
              ctx.fillText('Circle Head', 30, bottom + 90);

            });
          }
        };
        if(this.chart14){
          this.chart14.clear();
          this.chart14.destroy();
      }
        this.chart14 = new Chart('sLobGraphRm', {
          type: 'bar',
          data: {
            datasets: [
              {
                label: "Contribution (%)",
                data: res.rmDegrowthPer,
                backgroundColor: 'rgb(0, 102, 204)',
                barThickness: 40,
                borderRadius:10,
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
                labels: res.rmNamesList,
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
              x2: {
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
                beginAtZero: false,
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
                  text: 'Contribution',
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
              // this.ch_lobAndLevelwisePieChart()
              this.rm_drillDownStat = true;
              // console.log("chart Elementd--",(chartElement[0]))
              const clickedIndex = chartElement[0].index;
              const datasetIndex = chartElement[0].datasetIndex;clickedIndex

              // console.log("datasetIndex", datasetIndex)

              // console.log('clickedIndex:', clickedIndex,typeof(clickedIndex));

              // console.log("this.chart13.data-->",this.chart13.data.datasets[0])
              const label = this.chart14.data.labels[clickedIndex];
              const value = this.chart14.data.datasets[datasetIndex].data[clickedIndex];
              // console.log('Clicked on bar:', label, 'with value:', value);

              var chnl_list = res.rmNamesList
              // console.log("chNamesList--->",chnl_list ,typeof(chnl_list))

              

              let chN = chnl_list[clickedIndex]
              // console.log("chn--:", chN)

              

              let concatenatedString = chN.join(' ');
              this.rm_name = concatenatedString

              this.rm_lobAndLevelwisePieChart()
            }
          },
          plugins: [this.plugin, topLables, this.legendMarging],
        });
      }
      this.chart.push(this.chart14);
    });
  }


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
  // chart2Download() {
  //   const a = document.createElement('a');
  //   a.href = this.chart2.toBase64Image();
  //   a.download = 'Underperforming_Zonal_Head.png';
  //   a.click();
  // }

  chart2Download() {
    const a = document.createElement('a');
    a.href = this.chart2.toBase64Image();
    a.download = 'Underperforming_Zonal_Head.png';
    a.click();
  }

  lob_subchannel_wise_ChartDownload() {
    const a = document.createElement('a');
    a.href = this.lob_subchannel_wise_Chart.toBase64Image();
    a.download = 'lob_subchannel_wise_Chart.png';
    a.click();
  }

  // chart2Download() {
  //   const chartContainer = document.getElementById('chart2-container'); // Assuming your chart2 container has this ID
  //   if (!chartContainer) {
  //     console.error('Chart container element not found');
  //     return;
  //   }

  //   try {
  //     html2canvas(chartContainer).then(canvas => {
  //       const imageData = canvas.toDataURL('image/png'); // Get base64 data
  //       const filename = 'Underperforming_Zonal_Head.png';
  //       saveAs(imageData, filename); // Save the image using file-saver
  //     });
  //   } catch (error) {
  //     console.error('Error downloading chart image:', error);
  //   }
  // }

  
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
  


 
  getPriorityCount() {
    this.rest.getPriorityCount().subscribe((res: any) => {
      if (res.success) {
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
  
      }
    });
  }

  getCurrentMonth() {

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

  triggerImpact(){
    this.rest.triggerImpactSlob().subscribe((res: any) => {
      if (res.success) {
        this.triggerImpTable = res.tableJson;
        // console.log("res.tableJson",res.tableJson);
        // console.log("this.triggerImpTable",this.triggerImpTable);
      }
    });
  }
  

  

  threeMonthsGwpGraph(){
    this.rest.threeMonthsGwpGraph().subscribe((res: any) => {
      if (res.success) {
    var topLables = {
      id: 'topLables',
      afterDatasetsDraw: (chart:any, args:any, options:any) => {
        const { ctx, scales: { x, y } } = chart;
        chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
          // console.log("datapoint>>>",datapoint)
          ctx.font = '500 12px sans-serif';
          ctx.fillStyle = 'black';
          ctx.fillText(datapoint+'', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);

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
            label: "Total GWP (Cr)",
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
              text: 'GWP (Cr)',
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

   countSlob(){
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
    this.rest.countSlob(data).subscribe((res: any) => {
      if (res.success) {
      this.countSlobDict  = res.totalCountList;
      this.lobSegList  = res.lobSegRes;
      // console.log("this.countSlobDict>>>>",this.countSlobDict);
      // console.log("this.lobSegList>>>>",this.lobSegList);
      for (var key in this.lobSegList[0]) {
        if (this.lobSegList[0].hasOwnProperty(key)) {
          this.columnsArr.push(key);
          // console.log("this.columnsArr>>",this.columnsArr);
        }
      }
      }
    });
   }

   actImdsDownload(){
    // const data = {
    //   user_agent_id: this.user_agent_id,
    // }
    // this.ngxService.start();
    // this.rest.actImdsDownload(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.ngxService.stop();
    //     let fileName = res.filename
    //     window.open(this.rest.file_path + '/downloads/' + fileName)
    //   }
    //   else {
    //     this.ngxService.stop();
    //     this.notifier.notify('error', res.message);
    //   }
    // }, (err: any) => {
    //   this.ngxService.stop();
    //   this.notifier.notify('error', 'Some Error Occurred');
    // });
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
    // this.subChannelwiseTotal();
    this.lessthan_1yr_mtd_down_name = "";
    // setTimeout(() => {
    //     this.status_lessthan_1yr_mtd_down = false;
    // }, 250);   

  }

  open_lessthan_1yr_mtd_down(){
    console.log("999999")
    
    this.status_lessthan_1yr_mtd_down = true
    // this.subChannelDegrowGraph();

    // setTimeout(() => {
    //   this.status_lessthan_1yr_mtd_down = true
    // }, 250);  
  }


  subChannelwisePieChart_hc(){

    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }
  
    this.rest.subChannelwisePieChart(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("resp data",res.graphLevel, res.contriPer)

        let chartData = [] as any;
        
        for (let i = 0; i < (res.graphLevel).length; i++) {
          chartData.push(
            { "name": res.graphLevel[i], "y": Number(res.contriPer[i]) }
          );
        } 

        console.log("chartData@@@@@----------->>",chartData)        

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
            width: 400,
            height: 250,
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
                style:{
                  fontWeight: '500',
                  fontSize: '10px',
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
                  color: "#87d2ed"
                }
              },
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f}%'
              },
              point: {
                events: {
      
                  // click: this.setStateName.bind(this)
                  
                  
                }
              }
            }
          ],
          
        }


        Highcharts.chart('getStateWiseLOBDistPie_highchart', chartOptions);
  
        
        
      }
      
    
    
    })
  
  
  }


  subChannelwisePieChart(){
    let pieChartRad = this.windowWidth * (5.95/100)
    let legend_fontSize = this.windowWidth * (0.54/100)

    let legend_status = false

    if(this.windowWidth >= 1800){
      legend_status = true
    }


    this.pieChart = '' as any
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }

    this.rest.subChannelwisePieChart(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.graphLevel, res.contriPer)

        this.pieChart = new Chart('subChannelwiseContriPieChart', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [{
              label: 'Contribution in %',
              data: res.contriPer,
              
              backgroundColor: [
                'rgb(255, 99, 132)',    // Red
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                'rgb(0, 255, 255)'       // Cyan
              ],


              // borderColor: [
              //   'rgba(255, 99, 132, 1)',
              //   'rgba(54, 162, 235, 1)',
              //   'rgba(255, 206, 86, 1)',
              //   'rgba(75, 192, 192, 1)',
              //   'rgba(153, 102, 255, 1)',
              //   'rgba(255, 159, 64, 1)'
              // ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 110,
            // radius: pieChartRad,


            plugins: {
              legend: {
                position: 'left',
                // align: 'end',
                // display: true,
                display: legend_status,
                
                labels: {
                  
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                    size: 10
                    // size: legend_fontSize
                  }
                }
              },
              
            },

            scales: {
              // y: {
              //   title: {
              //         color: 'black',
              //         display: false,
              //         text: '',
              //         font: {
              //           weight: 'bold',// Make the legend labels bold
        
              //               },
              //           },
              //   beginAtZero: true,
              //   ticks: {
              //     display:false,
              //   },
              //   grid:{
              //         display:false,
              //       },
              // }
              
            }
          }
        });
        
      }
    
    
    })


  }

  lobwisePieChart(){

    let pieChartRad = this.windowWidth * (5.95/100)
    let legend_fontSize = this.windowWidth * (0.54/100)

    let legend_status = false

    if(this.windowWidth >= 1800){
      legend_status = true
    }


    this.lobWisePiechart = '' as any
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }

    this.rest.singleChannelGraph(data).subscribe((res: any) => {
      if (res.success) {
        console.log("@@@@@@---->",res.lobFullNameList, res.lobPerList)


        

        this.lobWisePiechart = new Chart('lobWisePiechart', {
          type: 'pie',
          data: {
            labels: res.lobFullNameList,
            datasets: [{
              label: 'Contribution in %',
              data: res.lobPerList,              
              backgroundColor: [
                'rgb(255, 99, 132)',    // Red
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                // 'rgb(0, 255, 255)'       // Cyan
              ],
              borderWidth: 1,
              // datalabels:
              
            },

            // {
            //   label: "Motor 2W",
            //   data: res.motor2w,
            //   backgroundColor: 'rgb(54, 162, 235)',
            //   borderRadius:10,
            //   // barThickness: 40,
            // },
            // {
            //   label: "Motor 4W",
            //   data: res.motor4w,
            //   backgroundColor: 'rgb(75, 192, 192)',
            //   borderRadius:10,
            //   // barThickness: 40,
            // },
          ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 110,
            
            plugins: {
              // tooltip: { // Disable hover tooltips
              //     enabled: false
              //   },

              // datalabels: {
              //   anchor: 'center',
              //   formatter: (value, context) => {
              //     const label = res.lobPerList[context.dataIndex];
              //     const data = value.data;
              //     return `${label}: ${data}%`;

              //     // return 'ggg'
              //   },
              //   color: 'black' // Optional, set data label color
              // },

              

              

              
              
              
              legend: {
                position: 'left',
                // align: 'end',
                // display: true,
                display: legend_status,
                labels: {
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                    size: 10
                  }
                }
              },
              
            },

            

            

            // scales: {
            //   y: {
            //     title: {
            //           color: 'black',
            //           display: false,
            //           text: '',
            //           font: {
            //             weight: 'bold',// Make the legend labels bold
        
            //                 },
            //             },
            //     beginAtZero: false,
            //     ticks: {
            //       display:false,
            //     },
            //     grid:{
            //           display:false,
            //         },
            //   }
              
            // }
          },

          // plugins: [this.plugin, topLables],
          
        });

        
        
      }
      // this.chart.push(this.lobWisePiechart);
    
    
    })


  }



  

  generatePieChart(){

    var data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }],

      
    };

    var config = {
      type: 'pie',
      data: data,
    };

  }


  lobandSubChPieChart() {
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
    }

    this.rest.lobandSubChPieChart(data).subscribe((res: any) => {

      var topLables = {} as any

      let barValuePosition_1 = this.windowWidth * (4.86/100)
      let barValuePosition_2 = this.windowWidth * (3/100)
      let barValuePosition_3 = this.windowWidth * (.81/100)
      let barValuePosition_4 = this.windowWidth * (1.08/100)
      let barValuePosition_5 = this.windowWidth * (3/100)
      let barValuePosition_6 = this.windowWidth * (4.86/100)



      if(this.windowWidth<= 1920 && this.windowWidth > 1600){

      }



      if (res.success) {

        // if(this.windowWidth<= 1920 && this.windowWidth > 1600){
        //   topLables = {
        //     id: 'topLables',
        //     afterDatasetsDraw: (chart, args, options) => {
        //       const { ctx, scales: { x, y } } = chart;
  
        //       chart.data.datasets[0].data.forEach((datapoint, index) => {
        //         // console.log("datapoint>>>",datapoint)
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint + '%', x.getPixelForValue(index)-90, chart.getDatasetMeta(0).data[index].y - 10);
        //       });
        //       chart.data.datasets[1].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%' , x.getPixelForValue(index)-55, chart.getDatasetMeta(1).data[index].y - 10);
        //       });
        //       chart.data.datasets[2].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)-15, chart.getDatasetMeta(2).data[index].y - 10);
        //       });
        //       chart.data.datasets[3].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+20, chart.getDatasetMeta(3).data[index].y - 10);
        //       });
        //       chart.data.datasets[4].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+55, chart.getDatasetMeta(4).data[index].y - 10);
        //       });
        //       chart.data.datasets[5].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+90, chart.getDatasetMeta(5).data[index].y - 10);
        //       });
        //       ctx.rect(0, 0, 1000, 1000);
        //     }
        //   };
          
        // }


        // if(this.windowWidth<= 1600 && this.windowWidth > 1280){

        //   topLables = {
        //     id: 'topLables',
        //     afterDatasetsDraw: (chart, args, options) => {
        //       const { ctx, scales: { x, y } } = chart;
  
        //       chart.data.datasets[0].data.forEach((datapoint, index) => {
        //         // console.log("datapoint>>>",datapoint)
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint + '%', x.getPixelForValue(index)-60, chart.getDatasetMeta(0).data[index].y - 10);
        //       });
        //       chart.data.datasets[1].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%' , x.getPixelForValue(index)-36, chart.getDatasetMeta(1).data[index].y - 10);
        //       });
        //       chart.data.datasets[2].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)-10, chart.getDatasetMeta(2).data[index].y - 10);
        //       });
        //       chart.data.datasets[3].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+16, chart.getDatasetMeta(3).data[index].y - 10);
        //       });
        //       chart.data.datasets[4].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+41, chart.getDatasetMeta(4).data[index].y - 10);
        //       });
        //       chart.data.datasets[5].data.forEach((datapoint, index) => {
        //         ctx.font = '500 12px sans-serif';
        //         ctx.fillStyle = 'black';
        //         ctx.textAlign = "center";
        //         ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+64, chart.getDatasetMeta(5).data[index].y - 10);
        //       });
        //       ctx.rect(0, 0, 1000, 1000);
        //     }
        //   };
          
        // }


        topLables = {
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
              ctx.fillText(datapoint + '%', x.getPixelForValue(index)-barValuePosition_1, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint , x.getPixelForValue(index), chart.getDatasetMeta(1).data[index].y + 10);
              ctx.fillText(datapoint+ '%' , x.getPixelForValue(index)-barValuePosition_2, chart.getDatasetMeta(1).data[index].y - 10);
            });
            chart.data.datasets[2].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(2).data[index].y + 10);
              ctx.fillText(datapoint+ '%', x.getPixelForValue(index)-barValuePosition_3, chart.getDatasetMeta(2).data[index].y - 10);
            });
            chart.data.datasets[3].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
              ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+barValuePosition_4, chart.getDatasetMeta(3).data[index].y - 10);
            });
            chart.data.datasets[4].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
              ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+barValuePosition_5, chart.getDatasetMeta(4).data[index].y - 10);
            });
            chart.data.datasets[5].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
              ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+barValuePosition_6, chart.getDatasetMeta(5).data[index].y - 10);
            });
            ctx.rect(0, 0, 1000, 1000);
          }
        };






        if(this.lob_subchannel_wise_Chart){
          this.lob_subchannel_wise_Chart.clear();
          this.lob_subchannel_wise_Chart.destroy();
      }

        this.lob_subchannel_wise_Chart = new Chart('lob_subchannel_wise_Chart', {
          type: 'bar',
          data: {
            labels: res.graphLevel,
            datasets: [
              {
                label: "Motor 2W",
                data: res.motor2w,
                backgroundColor: 'rgb(54, 162, 235)',
                borderRadius:10,
                // barThickness: 40,
                // categoryPercentage: 0.8
              },
              {
                label: "Motor 4W",
                data: res.motor4w,
                backgroundColor: 'rgb(75, 192, 192)',
                borderRadius:10,
                // barThickness: 40,
              },
              {
                label: "Motor CV",
                data: res.motorCv,
                backgroundColor: 'rgb(255, 206, 86)',
                borderRadius:10,
                // barThickness: 40,
              },
              
              {
                label: "Property",
                data: res.property,
                backgroundColor: 'rgb(153, 102, 255)',
                borderRadius:10,
                // barThickness: 40,
              },
              {
                label: "Retail Health",
                data: res.retailHealth,
                backgroundColor: 'rgb(255, 159, 64)',
                borderRadius:10,
                // barThickness: 40,
              },
              {
                label: "Other",
                data: res.Other,
                backgroundColor: 'rgb(152, 3, 252)',
                borderRadius:10,
                // barThickness: 40,
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
              // datalabels: {
              //   align: 'center',
              //   anchor: 'center',
              //   color: 'black',
              //   font: {
              //       weight: 'bold'
              //   }
              // },

              datalabels: { // Configure data labels
                anchor: 'end', // Position at the end of the bar (top)
                align: 'center', // Horizontally align to the center of the bar
                offset: 5, // Add some offset from the bar (optional)
                color: 'black', // Set the label color (optional)
                font: { // Optional, customize font style
                  weight: 'bold',
                  size: 14,
                }
              },
              
              
              legend: {
                title:{
                  display:true,
                  text: 'LOB',
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
                    return res.graphLevel[context[0].dataIndex].toString().replaceAll(',', ' ');
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
        this.chart.push(this.lob_subchannel_wise_Chart);
      }
    });
  }





  zh_lobAndLevelwisePieChart(){
    
    // this.zh_lobAndLevelwisePC = '' as any

    if(this.zh_lobAndLevelwisePC){
      this.zh_lobAndLevelwisePC.clear();
      this.zh_lobAndLevelwisePC.destroy();
    }
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      level: 'zh',
      userName: this.zh_name,
      subChannel: this.subChannel
    }

    this.rest.lobAndLevelwisePieChart(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.graphLevel, res.contriPer)

        this.zh_lobAndLevelwisePC = new Chart('zh_lobAndLevelwisePieChart', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [{
              label: 'Contribution in %',
              data: res.contriPer,
              
              backgroundColor: [
                'rgb(255, 99, 132)',    // Red
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                'rgb(0, 255, 255)'       // Cyan
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 170,


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
              
            },

            scales: {
              // y: {
              //   title: {
              //         color: 'black',
              //         display: false,
              //         text: '',
              //         font: {
              //           weight: 'bold',// Make the legend labels bold
        
              //               },
              //           },
              //   beginAtZero: true,
              //   ticks: {
              //     display:false,
              //   },
              //   grid:{
              //         display:false,
              //       },
              // }
              
            },
            
          }
        });
        
      }
    
    
    })


  }

  vanishZhDrilldown(){
    this.sLobGraphZh()

    // this.zh_lobAndLevelwisePieChart();
    this.Zh_drillDownStat = false;
  }
  vanishChDrilldown(){
    this.sLobGraphCh()

    // this.zh_lobAndLevelwisePieChart();
    this.ch_drillDownStat = false;
  }
  vanishRmDrilldown(){
    this.sLobGraphRm()

    // this.zh_lobAndLevelwisePieChart();
    this.rm_drillDownStat = false;
  }

  ch_lobAndLevelwisePieChart(){
    this.ch_drillDownStat = true;
    
      
    // this.ch_lobAndLevelwisePC = '' as any
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      level: 'ch',
      userName: this.ch_name,
      subChannel: this.subChannel
    }

    this.rest.lobAndLevelwisePieChart(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.graphLevel, res.contriPer)

        

        this.zh_lobAndLevelwisePC = new Chart('ch_lobAndLevelwisePieChart', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [{
              label: 'Contribution in %',
              data: res.contriPer,
              
              backgroundColor: [
                'rgb(255, 99, 132)',    // Red
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                'rgb(0, 255, 255)'       // Cyan
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 170,


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
              
            },

            scales: {
              // y: {
              //   title: {
              //         color: 'black',
              //         display: false,
              //         text: '',
              //         font: {
              //           weight: 'bold',// Make the legend labels bold
        
              //               },
              //           },
              //   beginAtZero: true,
              //   ticks: {
              //     display:false,
              //   },
              //   grid:{
              //         display:false,
              //       },
              // }
              
            },
            
          }
        });
        
      }
    
    
    })


  }

  rm_lobAndLevelwisePieChart(){
    this.rm_drillDownStat = true;
    this.rm_lobAndLevelwisePC = '' as any
    const data = {
      // triggerDate: '2024-02-05',
      triggerDate: this.last_triggerDate,
      user_agent_id: this.user_agent_id, 
      level: 'rm',
      userName: this.rm_name,
      subChannel: this.subChannel
    }

    this.rest.lobAndLevelwisePieChart(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.graphLevel, res.contriPer)

        this.zh_lobAndLevelwisePC = new Chart('rm_lobAndLevelwisePieChart', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [{
              label: 'Contribution in %',
              data: res.contriPer,
              
              backgroundColor: [
                'rgb(255, 99, 132)',    // Red
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                'rgb(0, 255, 255)'       // Cyan
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 170,


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
              
            },

            scales: {
              // y: {
              //   title: {
              //         color: 'black',
              //         display: false,
              //         text: '',
              //         font: {
              //           weight: 'bold',// Make the legend labels bold
        
              //               },
              //           },
              //   beginAtZero: true,
              //   ticks: {
              //     display:false,
              //   },
              //   grid:{
              //         display:false,
              //       },
              // }
              
            },
            
          }
        });
        
      }
    
    
    })


  }





  // downloadChartImage() {
  //   const chartContainer = document.getElementById('chart2-container'); // Assuming your chart2 container has this ID

  //   if (!chartContainer) {
  //     console.error('Chart container element not found');
  //     return;
  //   }

  //   try {
  //     html2canvas(chartContainer).then(canvas => {
  //       const imageData = canvas.toDataURL('image/png'); // Get base64 data
  //       const filename = 'chart2.png';
  //       saveAs(imageData, filename); // Save the image using file-saver
  //     });
  //   } catch (error) {
  //     console.error('Error downloading chart image:', error);
  //   }
  // }







  // levelPieChart(){ // levelPieChart
  //   const data = {
  //     triggerDate: this.last_triggerDate,
  //     userName: this.common.getUserName(),
  //     level: this.designationType,
  //   }

  //   this.rest.levelPieChart(data).subscribe((res: any) => {
  //     if(res.success){

  //     }
  //   });
  // }



  teamContributionPieChart(){

    let pieChartRad = this.windowWidth * (5.95/100)
    let legend_fontSize = this.windowWidth * (0.54/100)

    let legend_status = false

    if(this.windowWidth >= 1800){
      legend_status = true
    }


    this.teamContribution_PieChart = '' as any
    const data = {
      triggerDate: this.last_triggerDate,
      userName: this.common.getUserName(),
      level: this.designationType,
    }

    this.rest.levelPieChart(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.graphLevel, res.contriPer)

        this.teamContribution_PieChart = new Chart('teamContributionPieChart', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [{
              label: 'Contribution in %',
              data: res.contriPer,
              
              backgroundColor: [
                
                'rgb(54, 162, 235)',     // Blue
                'rgb(75, 192, 192)',     // Green
                'rgb(255, 206, 86)',     // Yellow
                'rgb(153, 102, 255)',    // Purple
                'rgb(255, 159, 64)',     // Orange
                'rgb(0, 255, 255)',       // Cyan
                'rgb(255, 99, 132)',    // Red
              ],


              // borderColor: [
              //   'rgba(255, 99, 132, 1)',
              //   'rgba(54, 162, 235, 1)',
              //   'rgba(255, 206, 86, 1)',
              //   'rgba(75, 192, 192, 1)',
              //   'rgba(153, 102, 255, 1)',
              //   'rgba(255, 159, 64, 1)'
              // ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            radius: 110,


            plugins: {
              legend: {
                position: 'left',
                // align: 'end',
                // display: true,
                display: legend_status,
                
                labels: {
                  
                  color: 'black',
                  boxWidth: 10,
                  boxHeight: 10,
                  font: {
                    weight: 'normal',
                    size: 10
                  }
                }
              },
              
            },

            scales: {
              // y: {
              //   title: {
              //         color: 'black',
              //         display: false,
              //         text: '',
              //         font: {
              //           weight: 'bold',// Make the legend labels bold
        
              //               },
              //           },
              //   beginAtZero: true,
              //   ticks: {
              //     display:false,
              //   },
              //   grid:{
              //         display:false,
              //       },
              // }
              
            }
          }
        });
        
      }
    
    
    })


  }

}
