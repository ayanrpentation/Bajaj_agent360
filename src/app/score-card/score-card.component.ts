import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Chart from 'chart.js/auto';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";


// import { IgxLinearGaugeComponent } from "igniteui-angular-gauges";
// import { IgxLinearGraphRangeComponent } from "igniteui-angular-gauges";
// import { LinearGraphNeedleShape } from "igniteui-angular-gauges";
import { IndianNumberPipe } from '../indian-number.pipe';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


import * as Highcharts from 'highcharts';
import { PrintService } from '../print.service';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.onePagerYtdDataList_except_total, event.previousIndex, event.currentIndex);
  }

  // this is for sorting func in YTD Care Advisor Report Card
  show_LOB_asc = true as boolean;
  show_topline_lfy_asc = true as boolean;
  show_topline_lytd_asc = true as boolean;
  show_topline_cytd_asc = true as boolean;
  show_topline_growth_asc = true as boolean;
  show_contribution_lfy_asc = true as boolean;
  show_contribution_cytd_asc = true as boolean;
  show_renewal_lytd_asc = true as boolean;
  show_renewal_cytd_asc = true as boolean;
  show_renewal_variance_asc = true as boolean;
  show_loss_lfy_asc = true as boolean;
  show_loss_cytd_asc = true as boolean;
  show_loss_variance_asc = true as boolean;
  show_comission_lfy_asc = true as boolean;
  show_comission_cytd_asc = true as boolean;
  show_comission_variance_asc = true as boolean;


   onePagerYtdDataList_total = [] as any;
   onePagerYtdDataList_except_total_mainCopy = [] as any;
   onePagerYtdDataList_except_total = [] as any;

  // onePagerYtdDataList: any[] = []; // Your data array
  // tableHeaders: string[] = ['LOB', 'LFY', 'LYTD', 'CYTD', 'Growth', 'LFY', 'CYTD', 'LYTD', 'CYTD', 'Variance', 'LFY', 'CYTD', 'Variance', 'LFY', 'CYTD', 'Variance']; // Your second row headers
  // columnToSort: number = -1; // Column index to sort
  // sortDirection: number = 1; // 1 for ascending, -1 for descending

  // // Function to sort the data
  // sortBy(columnIndex: number) {
  //   if (this.columnToSort === columnIndex) {
  //     this.sortDirection = -this.sortDirection; // Reverse sort direction if same column clicked again
  //   } else {
  //     this.columnToSort = columnIndex;
  //     this.sortDirection = 1;
  //   }
  // }

  showPdfTypes = false as any;


  onePagerYtdDataList: any[] = []; // Your data array
  tableHeaders: string[] = ['LOB', 'LFY', 'LYTD', 'CYTD', 'Growth', 'LFY', 'CYTD', 'LYTD', 'CYTD', 'Variance', 'LFY', 'CYTD', 'Variance', 'LFY', 'CYTD', 'Variance']; // Your second row headers
  columnToSort: number = -1; // Column index to sort
  sortDirection: number = 1; // 1 for ascending, -1 for descending

  // Function to sort the data
  sortBy(columnIndex: number) {
    console.log("shortBy Index --> ", columnIndex )
    if (this.columnToSort === columnIndex) {
      this.sortDirection = -this.sortDirection; // Reverse sort direction if same column clicked again
    } else {
      this.columnToSort = columnIndex;
      this.sortDirection = 1;
    }
    this.sortData();
  }

  // Function to sort the data based on selected column index and direction
  // sortData() {
  //   this.onePagerYtdDataList.sort((a, b) => {
  //     const aValue = a[this.tableHeaders[this.columnToSort]];
  //     const bValue = b[this.tableHeaders[this.columnToSort]];

  //     if (typeof aValue === 'string' && typeof bValue === 'string') {
  //       return this.sortDirection * aValue.localeCompare(bValue);
  //     } else {
  //       return this.sortDirection * (aValue - bValue);
  //     }
  //   });
  // }



  // sortData() {
  //   this.onePagerYtdDataList.sort((a, b) => {
  //     const aValue = a[this.tableHeaders[this.columnToSort]];
  //     const bValue = b[this.tableHeaders[this.columnToSort]];
  
  //     if (typeof aValue === 'string' && typeof bValue === 'string') {
  //       return this.sortDirection * aValue.localeCompare(bValue);
  //     } else {
  //       return this.sortDirection * (aValue - bValue);
  //     }
  //   });
  // }


  sortData() {
    this.onePagerYtdDataList.sort((a, b) => {
      const aValue = a[this.tableHeaders[this.columnToSort]];
      const bValue = b[this.tableHeaders[this.columnToSort]];
  
      console.log("aValue:", aValue);
      console.log("bValue:", bValue);
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        console.log("Comparing strings");
        return this.sortDirection * aValue.localeCompare(bValue);
      } else {
        console.log("Comparing numbers");
        return this.sortDirection * (aValue - bValue);
      }
    });
  }

  get sortedData() {
    return [...this.onePagerYtdDataList];
  }

















  icontest = 'fas fa-graduate'

  seachBtnClicked_afterLoad = false
  lobWiseGwp_pie: any;
  channelWiseDegrowContri_pie: any;


  backGround = 'green'

  growthRowIndexes = [2,5,8,11] as any
  growth_noColor_colIndexs = [0,1] as any


  totalChart_rep_status = false as any
  lrVsCaqGraph_status = false as any
  lobPieGraph_status = false as any

  searchImdCode = '' as any;
  imdInfo = [] as any;
  imdsearched = false;
  search = 0;


  styleVar_start = "background: linear-gradient(45deg, "
  styleVar_end = ", white);"



  style_var_comm = "background: linear-gradient(45deg, #00ff168c, white);"
  style_var_loss = "background: linear-gradient(45deg, #00ff168c, white);"
  style_var_cor = "background: linear-gradient(45deg, #00ff168c, white);"


  // style_var_comm = "color: #93a871 !important;padding:1%;"
  // style_var_loss = "color: #93a871 !important;padding:1%;"
  // style_var_cor = "color: #93a871 !important;padding:1%;"

  month_selectedItems = [] as any;
  recommendationList = [] as any;
  scorecardDetails = [] as any;
  scoreConfig = [] as any;
  gwp_scorecardDetails = [] as any;
  gwp_scoreConfig = [] as any;
  nop_scorecardDetails = [] as any;
  nop_scoreConfig = [] as any;
  noprr_scorecardDetails = [] as any;
  noprr_scoreConfig = [] as any;
  sale_scorecardDetails = [] as any;
  sale_scoreConfig = [] as any;
  ptp_scorecardDetails = [] as any;
  ptp_scoreConfig = [] as any;
  dtp_scorecardDetails = [] as any;
  dtp_scoreConfig = [] as any;
  cor_scorecardDetails = [] as any;
  cor_scoreConfig = [] as any;
  campaign_scorecardDetails = [] as any;
  campaign_scoreConfig = [] as any;
  lob_scorecardDetails = [] as any;
  lob_scoreConfig = [] as any;
  onePagerMomDataList = [] as any;
  onePagerMomColList = [] as any;
  // onePagerYtdDataList = [] as any;

  downloadImd = '' as any;
  chart1 = '' as any;
  chart2 = '' as any;
  chart3 = '' as any;
  chart4 = '' as any;
  chart5 = '' as any;
  filter_btn_clicked = 0;
  monthName = '' as any;
  showMonthFlag = false

  ytdFlag = false;



  month_dropdownList = [] as any;

  month_selectedItems_singleselect = ''







  // linearGauge: IgxLinearGaugeComponent;
  shouldAnimate: boolean = false;








  // @ViewChild("linearGauge", { static: true })
    // public linearGauge: IgxLinearGaugeComponent;

    // private shouldAnimate: boolean = false;

    public ngAfterViewInit(): void {

        // this.AnimateToGauge3();
    }





  // constructor(private rest: RestApiService, private notifier: NotifierService, private common: CommonService, private modalService: NgbModal, private ActivatedRoute: ActivatedRoute,private ngxService: NgxUiLoaderService,   public linearGauge: IgxLinearGaugeComponent) { }


  constructor(private rest: RestApiService, private notifier: NotifierService, private common: CommonService, private modalService: NgbModal, private ActivatedRoute: ActivatedRoute,private ngxService: NgxUiLoaderService, private printService: PrintService ) { }

  // async printWebPage() {
  //   try {
  //     await this.printService.printWebPage('https://example.com', 'output.pdf');
  //     console.log('Web page printed successfully!');
  //   } catch (error) {
  //     console.error('Error printing web page:', error);
  //   }
  // }


  searchecMonth = this.formatMonth(this.month_selectedItems_singleselect);
  formatMonth(input:any) {
    console.log("input month--->", input)
    // Split the input by '-'
    const [month, year] = input.split('-');
  
    // Array of month abbreviations
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Get the month abbreviation from the month number
    const monthAbbreviation = months[parseInt(month, 10) - 1];
  
    // Return the formatted string
    return `${monthAbbreviation} ${year}`;
  }

  getCurrentMonthYear() {
    const currentDate = new Date();
    
    const monthVal = `${String(currentDate.getMonth() ).padStart(2, '0')}-${currentDate.getFullYear()}`;
    const monthName = `${currentDate.toLocaleString('default', { month: 'short' }).toUpperCase()} ${currentDate.getFullYear()}`;

    this.month_selectedItems_singleselect = monthVal
    console.log('this.month_selectedItems_singleselect---> ', this.month_selectedItems_singleselect)
    this.searchecMonth = this.formatMonth(this.month_selectedItems_singleselect);

    
  
    return [{ monthVal, monthName }];
  }

  ngOnInit(): void {

    this.getMonthYearList()
    
    // this.month_selectedItems = sessionStorage.getItem('selectedMonthYear');
    // this.month_selectedItems = JSON.parse(this.month_selectedItems);

    this.month_selectedItems =this.getCurrentMonthYear()
    // console.log("this.month_selectedItems", this.month_selectedItems)


    // console.log("month_selectedItems----->>  ", this.month_selectedItems)
    // this.searchImdCode = this.ActivatedRoute.snapshot.params.id;
    this.searchImdCode = this.ActivatedRoute.snapshot.params['id'];
    if(this.searchImdCode == 0){ this.searchImdCode = ''}
    // console.log("this.month_selectedItems",this.month_selectedItems);
    // console.log("this.searchImdCode",this.searchImdCode);
    if(this.searchImdCode != "" && this.searchImdCode != 0){this.seachBtnClicked_afterLoad = true}

    if(this.searchImdCode != '' && this.searchImdCode != null){
      this.getOnePagerdataYTD(this.searchImdCode);
      this.getOnePagerdataMOM(this.searchImdCode);
      this.getImdDetails(this.searchImdCode);
      this.getScoreCardDetails(this.searchImdCode);
      this.getRecommendations(this.searchImdCode);



      // this.getTotalGraph_rep(this.searchImdCode);
      // this.getLRvsCAQGraphs(this.searchImdCode);
      // this.getLobPieGraphs(this.searchImdCode);
    }
    
    
  }

  formation_month_selectedItems(){

    let selectedMonth = [] as any

    // console.log("this.month_selectedItems_singleselect----@@@@@",typeof(this.month_selectedItems_singleselect), this.month_selectedItems_singleselect)

    for(let month of this.month_dropdownList){
      // console.log("month.monthVal----#####",typeof(month.monthVal),month.monthVal)
      
      if(this.month_selectedItems_singleselect == month.monthVal){ 
        selectedMonth.push(month)
        console.log("selectedMonth++++++++++++++",selectedMonth)
        this.month_selectedItems = selectedMonth
      }
    }

    console.log("this.month_selectedItems", this.month_selectedItems)
  }

  clearAllDetails() {
    this.searchImdCode = '';
    this.imdsearched = false;
    this.imdInfo = [];
    this.filter_btn_clicked = 0;
    this.monthName = '';
    // window.location.reload();
  }
  getYtdDetails(imdCode: any){
    this.ytdFlag = true;
    this.getImdDetailsYtd(imdCode);
    this.getScoreCardDetailsYtd(imdCode);
    // this.getGWPScoreDetailsYtd(imdCode);
    // this.getNOPScoreDetailsYtd(imdCode);
    // this.getNOPRRScoreDetailsYtd(imdCode);
    // // this.getSELLScoreDetailsYtd(imdCode,saleType);
    // this.getDTPScoreDetailsYtd(imdCode);
    // this.getPTPScoreDetailsYtd(imdCode);
    // this.getCampaignScoreDetailsYtd(imdCode);
    // this.getLOBScoreDetailsYtd(imdCode);
  }


  getImdDetails(imdCode: any) {
    this.filterCounter();
    this.searchImdCode = imdCode;
    // this.imdsearched = true;
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,
      
    }
    this.rest.getImdDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.imdInfo = res.result;
        this.style_var_comm = "background: linear-gradient(45deg, " + res.result.COMMISSION_RATIO_COLOR + ", white);"
        this.style_var_loss = "background: linear-gradient(45deg, " + res.result.LOSS_RATIO_COLOR + ", white);"
        this.style_var_cor = "background: linear-gradient(45deg, " + res.result.CY_COR_COLOR + ", white);"
        // this.style_var_comm = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.COMMISSION_RATIO_COLOR + " !important"
        // this.style_var_loss = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.LOSS_RATIO_COLOR + " !important"
        // this.style_var_cor = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.CY_COR_COLOR + " !important"

        // this.comparisonColumns = res.columns;

        // return this.zone_dropdownList
        this.imdsearched = true;
      } else {
        this.imdsearched = false;
        this.imdInfo = [];
        this.monthName = '';
      }
    });
  }

  

  getScoreCardDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getScoreCardDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.scorecardDetails = res.result;
        this.scoreConfig = res.scoreConfig


      } else {
      }
    });
  }

  getRecommendations(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getRecommendations(data).subscribe((res: any) => {
      if (res.success) {
        this.recommendationList = res.recommendationList;

      } else {
      }
    });
  }

  getTotalGraph(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getTotalGraph(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res>>>>",res)
        // if (this.chart1) {
        //   this.chart1.clear();
        //   this.chart1.destroy();
        // }
        this.chart1 = new Chart('totalChart', {
          type: 'line', //this denotes tha type of chart
          // shared: true,
          data: {// values on X-Axis
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                data: res.totalData,
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'BANDING: ' + res.bandingData[context[0].dataIndex];
                  }
                }
              }
            },
            scales: {
              x: {
                grid:{
                  display:false,
                },
              },
              y:{
                grid:{
                  display:false,
                },
              }},
            interaction: {
              mode: 'index'
            }

          }

        });
      } else {
      }
    });
  }




  getTotalGraph_rep1(imdCode: any){

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

    Highcharts.chart('totalChart_rep', chartOptions);

    




  }

  getTotalGraph_rep(imdCode: any) {
    // if(imdCode == '' || imdCode == null){return}
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getTotalGraph(data).subscribe((res: any) => {
      if (res.success) {
        this.totalChart_rep_status = true
        let chartStatus1 = Chart.getChart("totalChart_rep"); // <canvas> id
        if (chartStatus1 != undefined) {
          chartStatus1.clear();
          chartStatus1.destroy();
        }
        if (this.chart2) {
          this.chart2.clear();
          this.chart2.destroy();
        }

        console.log("res", res)

        let lineChartData = [
          {
              "type": "line",
              "name": "Total Score",
              // "data": [
              //     0.4,
              //     1.5,
              //     1.4,
              //     1.1,
              //     0.9
              // ],
              "data": res.totalData,
              "color": "rgb(153, 102, 255)"
          }
        ] as any



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
            categories: res.totalLevel,
            labels: {
              style: {
                fontSize: '12px' // Font size for x-axis labels
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
            valueSuffix: '',
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
          
          series: lineChartData,
        };
    
        Highcharts.chart('totalChart_rep', chartOptions);










        // new Chart('totalChart_rep', {
        //   type: 'line', //this denotes tha type of chart
        //   // shared: true,
        //   data: {// values on X-Axis
        //     labels: res.totalLevel,
        //     datasets: [
        //       {
        //         label: "Total Score",
        //         data: res.totalData,
        //         backgroundColor: 'blue',
        //         borderColor: 'blue',
        //       },
        //     ]
        //   },
        //   options: {
        //     aspectRatio: 2,
        //     // responsive: false,
        //     plugins: {
        //       legend: {

        //         display: true,
        //         position: 'top',
        //         align: 'end',
        //         labels: {
        //           boxWidth: 15,
        //           boxHeight: 10,
        //           color: 'black',
        //           font: {
        //             weight: 'normal',
        //           }
        //         },
        //       },
        //       tooltip: {
        //         callbacks: {
        //           afterTitle: function (context) {
        //             console.log("context", context[0].dataIndex);
        //             return 'BANDING: ' + res.bandingData[context[0].dataIndex];
        //           },
                  
        //         }
        //       }
        //     },
        //     scales: {
        //       x: {
        //         grid:{
        //           display:false,
        //         },
        //       },
        //       y:{
        //         grid:{
        //           display:false,
        //         },
        //       }},
        //     interaction: {
        //       mode: 'index'
        //     }

        //   }

        // });




      } else {
      }
    });
  }

  getLRvsCAQGraphs(imdCode: any) {
    // if(imdCode == '' || imdCode == null){return}
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLRvsCAQGraphs(data).subscribe((res: any) => {
      if (res.success) {
        this.lrVsCaqGraph_status = true
        // console.log("res>>>>>",res)

        let chartStatus = Chart.getChart("lrVsCaqGraph"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.clear();
          chartStatus.destroy();
        }
        if (this.chart4) {
          this.chart4.clear();
          this.chart4.destroy();
        }



        let lineChartData = [
          {
              "type": "line",
              "name": "LR",
              // "data": [
              //     0.4,
              //     1.5,
              //     1.4,
              //     1.1,
              //     0.9
              // ],
              "data": res.lrData,
              // "color": "rgb(153, 102, 255)",
              "color": "orange"
          },
          {
            "type": "line",
            "name": "CAQ",
            "data": res.caqData,
            "color": "blue"
          },
          {
            "type": "line",
            "name": "COR",
            "data": res.corData,
            // "color": "grey",
            "color": "rgb(153, 102, 255)",
          }
        ] as any





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
            categories: res.graphLevel,
            labels: {
              style: {
                fontSize: '12px' // Font size for x-axis labels
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
            valueSuffix: '',
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
          
          series: lineChartData,
        };
    
        Highcharts.chart('lrVsCaqGraph', chartOptions);
















        // new Chart('lrVsCaqGraph', {
        //   type: 'line',
        //   data: {
        //     labels: res.graphLevel,
        //     datasets: [
        //       {
        //         label: "LR",
        //         data: res.lrData,
        //         backgroundColor: 'blue',
        //         borderColor: 'blue',
        //         // borderWidth: 1,
        //       },
        //       {
        //         label: "CAQ",
        //         data: res.caqData,
        //         backgroundColor: 'orange',
        //         borderColor: 'orange',
        //         // borderWidth: 1,
        //       },
        //       {
        //         label: "COR",
        //         data: res.corData,
        //         backgroundColor: 'grey',
        //         borderColor: 'grey',
        //         // borderWidth: 1,
        //       },
        //     ]
        //   },
        //   options: {
        //     layout: {
        //       padding: 10,
        //     },
        //     aspectRatio: 1.85,
        //     // responsive: false,
        //     plugins: {
        //       legend: {

        //         display: true,
        //         position: 'top',
        //         align: 'end',
        //         labels: {
        //           boxWidth: 15,
        //           boxHeight: 10,
        //           color: 'black',
        //           font: {
        //             weight: 'normal',
        //           }
        //         },
        //       },
        //       // tooltip: {
        //       //   callbacks: {
        //       //     afterTitle: function (context) {
        //       //       console.log("context", context[0].dataIndex);
        //       //       return 'BANDING: ' + res.bandingData[context[0].dataIndex];
        //       //     }
        //       //   }
        //       // }
        //     },
        //     scales: {
        //       x: {
        //         grid:{
        //           display:false,
        //         },
        //       },
        //       y:{
        //         grid:{
        //           display:false,
        //         },
        //       }},
        //     interaction: {
        //       mode: 'index'
        //     }

        //   }

        // });







      } else {
      }
    });
  }

  getLobPieGraphs(imdCode: any) {
    // if(imdCode == '' || imdCode == null){return}
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLobPieGraphs(data).subscribe((res: any) => {
      if (res.success) {
        this.lobPieGraph_status = true
        // console.log("res>>>>>",res)
        let chartStatus2 = Chart.getChart("lobPieGraph"); // <canvas> id
        if (chartStatus2 != undefined) {
          chartStatus2.clear();
          chartStatus2.destroy();
        }
        if (this.chart5) {
          this.chart5.clear();
          this.chart5.destroy();
        }

        // let chartData = [] as any

        

        new Chart('lobPieGraph', {
          type: 'pie',
          data: {
            labels: res.graphLevel,
            datasets: [
              {
                label: "GWP",
                data: res.GWPData,
                // backgroundColor: 'blue',
                // borderColor: 'blue',
                // borderWidth: 1,
              },

            ]
          },
          options: {
            layout: {
              padding: 10,
            },
            aspectRatio: 3.5,
            // responsive: false,
            plugins: {
              legend: {

                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 15,
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
              // y: {
              //   title: {
              //     color: 'black',
              //     display: true,
              //     text: 'Total IMds',
              //     font: {
              //       weight: 'normal',// Make the legend labels bold

              //     },
              //   },
              // },
            },
            interaction: {
              mode: 'index'
            }

          }

        });

      } else {
      }
    });
  }




  getLobPieGraphs_highchart(imdCode: any) {
    // if(imdCode == '' || imdCode == null){return}
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLobPieGraphs(data).subscribe((res: any) => {
      if (res.success) {


        // let chartData = [
        //   { name: 'LOB 1', y: 40 },
        //   { name: 'LOB 2', y: 30 },
        //   { name: 'LOB 3', y: 25 },
        // ] as any;

        let chartData = [] as any;
        
        for (let i = 0; i < (res.graphLevel).length; i++) {
          chartData.push(
            { "name": res.graphLevel[i], "y": res.GWPData[i] }
          );

          // console.log("chartData----------->>",res.graphLevel[i], "-------->>",res.GWPData[i] )
        } 

        console.log("chartData----------->>",chartData)

        

        const chartOptions: Highcharts.Options = {
          // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
          chart: {
            type: 'pie',
            // width: 760,
            // height: 400,
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
            valueSuffix: ' ₹'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}'
              },
              showInLegend: false
            }
          },

          series:[
            {
              type: "pie",
              
              data: chartData,

              // name: 'Percentage',
              name: 'Amount',
      
              states: {
                hover: {
                  // color: '#BADA55',
                  color: "#87d2ed"
                }
              },
              dataLabels: {
                enabled: true,
                // format: '{point.name}: ({point.percentage:.1f}%) <br>Amount: {point.y} ₹',
                format: '{point.name}:<br>{point.y} ₹<br>{point.percentage:.1f}%',
                style:{
                  fontSize: '13px',
                  // fontWeight: '500'
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


        Highcharts.chart('lobWiseGwp_pie', chartOptions);














        // ----------------nop section--------------------
        let chartData_nop = [] as any;
        
        for (let i = 0; i < (res.graphLevel).length; i++) {
          chartData_nop.push(
            { "name": res.NOPgraphLevel[i], "y": res.NOPData[i] }
          );

          // console.log("chartData----------->>",res.graphLevel[i], "-------->>",res.GWPData[i] )
        } 

        console.log("chartData----------->>",chartData_nop)

        

        const chartOptions_nop: Highcharts.Options = {
          // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
          chart: {
            type: 'pie',
            // width: 760,
            // height: 400,
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
            // valueSuffix: ' ₹'
            valueSuffix: ''
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}'
              },
              showInLegend: false,
              
            }
          },

          series:[
            {
              type: "pie",
              
              data: chartData_nop,

              // name: 'Percentage',
              // name: 'Amount',
              name: 'NOP',
      
              states: {
                hover: {
                  // color: '#BADA55',
                  color: "#87d2ed"
                }
              },
              dataLabels: {
                enabled: true,
                // format: '{point.name}: {point.percentage:.1f}%'
                format: '{point.name}:<br>{point.y} ₹<br>{point.percentage:.1f}%',
                style:{
                  fontSize: '13px',
                  // fontWeight: '500'
                },

              },
              point: {
                events: {
      
                  // click: this.setStateName.bind(this)
                  
                  
                }
              }
            }
          ],
          
        }


        Highcharts.chart('lobWiseNop_pie', chartOptions_nop);

      } else {
      }
    });
  }




  channelWiseDegrowContri(imdCode: any) {
    // if(imdCode == '' || imdCode == null){return}
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLobPieGraphs(data).subscribe((res: any) => {
      if (res.success) {


        let chartData = [
          { name: 'Prime Relationships', y: 10 },
          { name: 'Retail Pos', y: 13 },
          { name: 'Emerging Relatioships', y: 13 },
          { name: 'Retail Channel', y: 14 },
          { name: 'Key Relatioships', y: 16 },
          { name: 'Retail & SME Brokers', y: 17 },
          { name: 'VSO', y: 17 },



          // { name: 'Prime Rel', y: 10 },
          // { name: 'Retail Pos', y: 13 },
          // { name: 'Emerg Rel', y: 13 },
          // { name: 'Retail Channel', y: 14 },
          // { name: 'Key Rel', y: 16 },
          // { name: 'Retail & SME Brokers', y: 17 },
          // { name: 'VSO', y: 17 },




        ] as any;

        // let chartData = [] as any;
        
        // for (let i = 0; i < (res.graphLevel).length; i++) {
        //   chartData.push(
        //     { "name": res.graphLevel[i], "y": res.GWPData[i] }
        //   );
        // } 

        // console.log("chartData----------->>",chartData)        

        const chartOptions: Highcharts.Options = {
          // colors: ['#10487F', '#406D99', '#668AAD', '#85A1BD', '#C1CFDD'],
          colors: ['#00FF00', '#C0C0C0', '#00FFFF', '#FF00FF', '#668AAD', '#10487F', '#FFFF00', '#ffffff'],
          chart: {
            type: 'pie',
            width: 760,
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
                format: '{point.name}: {point.percentage:.1f}%'
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


        Highcharts.chart('channelWiseDegrowContri_pie', chartOptions);

      } else {
      }
    });
  }

  openModalDownload(modal: any, imdCode: any, search: any) {
    this.search = search;

    this.downloadImd = imdCode;
    this.modalService.open(modal, { centered: true, size: 'sm' });

  }

  openModal(modal: any, search: any) {
    this.search = search;
    // this.modalService.open(modal, { centered: true, size: 'lg' });
    // this.modalService.open(modal, { centered: true, size: 'custom-modal' });
    this.modalService.open(modal, { centered: true, size: 'xl' });

  }


  // openModal(modal: any, search: any) {
  //   this.search = search;
  //   this.modalService.open(modal, { centered: true, size: 'lg' }).result.then((result) => {
  //     // Your code to handle modal closing
  //   }, (reason) => {
  //     // Your code to handle modal dismissal
  //   });

  //   // Add CSS styles to set the width of the modal to 80vw
  //   const modalDialog = document.querySelector('.modal-dialog');
  //   if (modalDialog) {
  //     modalDialog.setAttribute('style', 'width: 80vw');
  //   }
  // }

  closeModal() {
    this.modalService.dismissAll();
  }

  goBack(modal: any) {
    if (this.search == 1) {
      this.closeModal();
    } else {
      this.closeModal();
      this.openModal(modal, 1);

    }
  }

  getComma(x: any) {
    const fmt = require('indian-number-format');
    // console.log("fmt.format(x)>>>",fmt.format(x));
    return fmt.format(x)
  }

  getGWPScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getGWPScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.gwp_scorecardDetails = res.result;
        this.gwp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getGWPGraphs(imdCode: any) {

    


    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getGWPGraphs(data).subscribe((res: any) => {
      if (res.success) {


        new Chart('gwpChart1', {
          type: 'line',


          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",

                data: res.totalData,
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'GWP: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }

          }

        });

        new Chart('gwpChart2', {
          type: 'line',

          data: {
            labels: res.gwpLevel,
            datasets: [
              {
                label: "GWP Score",

                data: res.gwpData,
                backgroundColor: 'blue'
              },
              {
                label: "MOM Growth Score",

                data: res.momgrowthData,
                backgroundColor: 'red'
              },
              {
                label: "CMLY Growth Score",

                data: res.cmlyData,
                backgroundColor: 'black'
              },
              {
                label: "Consistency Score",
                data: res.constData,
                backgroundColor: 'limegreen'
              },
              {
                label: "CMLY Growth Absolute Score",

                data: res.cmlyabsData,
                backgroundColor: 'green'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'GWP: ' + res.actual[context[0].dataIndex];
                  }
                }
              },
              legend: {
                title:{
                  display:true,
                  // text: 'LOB',
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
            },
            interaction: {
              mode: 'index'
            }
          }

        });


      } else {
      }
    });
  }

  getNOPScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.nop_scorecardDetails = res.result;
        this.nop_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getNOPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        new Chart('nopChart1', {
          type: 'line',

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",

                data: res.totalData,
                backgroundColor: 'blue'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'NOP: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });

        new Chart('nopChart2', {
          type: 'line',

          data: {
            labels: res.nopLevel,
            datasets: [
              {
                label: "NOP Score",

                data: res.nopData,
                backgroundColor: 'limegreen'
              },
              {
                label: "Renewal Score",

                data: res.renData,
                backgroundColor: 'red'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'NOP: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });


      } else {
      }
    });
  }

  getNOPRRScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPRRScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.noprr_scorecardDetails = res.result;
        this.noprr_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getNOPRRGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPRRGraphs(data).subscribe((res: any) => {
      if (res.success) {

        new Chart('noprrChart1', {
          type: 'line',

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",

                data: res.totalData,
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'Renewal Ratio: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });



      } else {
      }
    });
  }

  getSELLScoreDetails(imdCode: any, saleType: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,
      saleType: saleType

    }
    this.rest.getSELLScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.sale_scorecardDetails = res.result;
        this.sale_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getSELLGraphs(imdCode: any, saleType: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,
      saleType: saleType,

    }
    this.rest.getSELLGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('sellChart1', {
          type: 'line', //this denotes tha type of chart

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                data: res.totalData,
                backgroundColor: 'blue'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return saleType.toUpperCase() + ': ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });



      } else {
      }
    });
  }

  getDTPScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getDTPScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.dtp_scorecardDetails = res.result;
        this.dtp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getDTPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getDTPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        new Chart('dtpChart1', {
          type: 'line',

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                data: res.totalData,
                backgroundColor: 'blue'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'Digital Activeness: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });



      } else {
      }
    });
  }

  getPTPScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getPTPScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.ptp_scorecardDetails = res.result;
        this.ptp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getPTPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getPTPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        new Chart('ptpChart1', {
          type: 'line',
          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                data: res.totalData,
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'Meeting Count: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });



      } else {
      }
    });
  }

  getCampaignScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCampaignScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.campaign_scorecardDetails = res.result;
        this.campaign_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getCampaignGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCampaignGraphs(data).subscribe((res: any) => {
      if (res.success) {
        new Chart('cmpChart1', {
          type: 'line',

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                data: res.totalData,
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'Campaign: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });

        new Chart('cmpChart2', {
          type: 'line',

          data: {
            labels: res.campLevel,
            datasets: [
              {
                label: "LY Campaign Score",
                data: res.lyData,
                backgroundColor: 'limegreen'
              },
              {
                label: "CY Campaign Score",
                data: res.cyData,
                backgroundColor: 'red'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'CY Eligibility Per: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });

      } else {
      }
    });
  }

  getLOBScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLOBScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.lob_scorecardDetails = res.result;
        this.lob_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getLOBGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLOBGraphs(data).subscribe((res: any) => {
      if (res.success) {
        new Chart('lobChart1', {
          type: 'line',

          data: {
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",

                data: res.totalData,
                backgroundColor: 'blue'
              },

            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'LOB: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });



      } else {
      }
    });
  }

  downloadScoreCard() {
    this.ngxService.start();
    const data = {
      imdCode: this.downloadImd,
      monthYear: this.month_selectedItems,
    }
    this.rest.downloadScoreCard(data).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        window.open(this.rest.file_path + '/downloads/' + res.fileName);
        this.notifier.notify('success', res.message);

      } else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);

      }
    });
  }

  downloadScoreCardAll() {
    this.ngxService.start();
    const data = {
      user_agent_id: this.common.getUserAgentId(),
      monthYear: this.month_selectedItems,
    }
    this.rest.downloadScoreCardAll(data).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        window.open(this.rest.file_path + '/downloads/' + res.fileName);
        this.notifier.notify('success', res.message);

      } else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);

      }
    });
  }


  downloadScoreCardPDF(pdfType: any) {

    this.ngxService.start();
    const data = {
      pdfType: pdfType,
      imdCode: this.downloadImd,
      monthYear: this.month_selectedItems,

    }
    this.rest.downloadScoreCardPDF(data).subscribe((res: any) => {
      if (res.success) {
        this.ngxService.stop();
        window.open(this.rest.file_path + '/downloads/' + res.fileName);
        this.notifier.notify('success', res.message);

      } else {
        this.ngxService.stop();
        this.notifier.notify('error', res.message);

      }
    });
  }

  getOnePagerdataMOM(imdCode: any){
    const data = {
      imdCode:imdCode,
      monthYear: this.month_selectedItems,
    }
    this.rest.getOnePagerdataMOM(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res>>>",res)
        this.onePagerMomDataList = res.result;
        // console.log("onePagerMomDataList--->", this.onePagerMomDataList)
        this.onePagerMomColList = res.columns;
        // console.log("onePagerMomDataList---00>>>", this.onePagerMomColList)
      } else {
        // this.notifier.notify('error', res.message);

      }
    });
  }

  filterCounter(){
    this.filter_btn_clicked += 1;
    this.monthName = this.month_selectedItems[0].monthName;
    this.showMonthFlag = true;
  }

  getOnePagerdataYTD(imdCode: any){
    this.onePagerYtdDataList = []
    this.onePagerYtdDataList_except_total = []
    this.onePagerYtdDataList_total = []
    const data = {
      imdCode:imdCode,
      monthYear: this.month_selectedItems,
    }
    this.rest.getOnePagerdataYTD(data).subscribe((res: any) => {
      if (res.success) {
        console.log("getOnePagerdataYTDres>>>",res)
        this.onePagerYtdDataList = res.result;
        // this.onePagerYtdDataList_total = this.onePagerYtdDataList[this.onePagerYtdDataList.length - 1]
        // this.onePagerYtdDataList_except_total_mainCopy = ;

        
        for (let item of this.onePagerYtdDataList) {
          if(item.LOB == 'Total'){
            
            this.onePagerYtdDataList_total.push(item);
          }
          else{
            // this.onePagerYtdDataList_except_total_mainCopy.push(item);
            this.onePagerYtdDataList_except_total.push(item);
          }
        }

        // this.onePagerYtdDataList_except_total_mainCopy = this.onePagerYtdDataList_except_total

        this.orderby_YTD_Care_Advisor_Report_Card('LOB','asc')

        // console.log("onePagerYtdDataList_total>>>",this.onePagerYtdDataList_total)
        // console.log("onePagerYtdDataList_except_total>>>",this.onePagerYtdDataList_except_total)

        this.getTotalGraph_rep(this.searchImdCode);
        this.getLRvsCAQGraphs(this.searchImdCode);
        this.getLobPieGraphs(this.searchImdCode);
        this.getLobPieGraphs_highchart(this.searchImdCode);
        this.channelWiseDegrowContri(this.searchImdCode)
      } else {
        // this.notifier.notify('error', res.message);

      }
    });
  }

  getImdDetailsYtd(imdCode: any) {
    // this.filterCounter();
    // this.searchImdCode = imdCode;
    // this.imdsearched = true;
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,
      
    }
    this.rest.getImdDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.imdInfo = res.result;
        this.style_var_comm = "background: linear-gradient(45deg, " + res.result.COMMISSION_RATIO_COLOR + ", white);"
        this.style_var_loss = "background: linear-gradient(45deg, " + res.result.LOSS_RATIO_COLOR + ", white);"
        this.style_var_cor = "background: linear-gradient(45deg, " + res.result.CY_COR_COLOR + ", white);"
        // this.style_var_comm = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.COMMISSION_RATIO_COLOR + " !important"
        // this.style_var_loss = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.LOSS_RATIO_COLOR + " !important"
        // this.style_var_cor = "display: block; padding-top: 5px; font-weight: bold; padding:1%; color: " + res.result.CY_COR_COLOR + " !important"

        // this.comparisonColumns = res.columns;

        // return this.zone_dropdownList
      } else {
        // this.imdsearched = false;
        // this.imdInfo = [];
        // this.monthName = '';
      }
    });
  }

  getScoreCardDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getScoreCardDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.scorecardDetails = res.result;
        this.scoreConfig = res.scoreConfig


      } else {
      }
    });
  }

  getGWPScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getGWPScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.gwp_scorecardDetails = res.result;
        this.gwp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getNOPScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.nop_scorecardDetails = res.result;
        this.nop_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getNOPRRScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPRRScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.noprr_scorecardDetails = res.result;
        this.noprr_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getSELLScoreDetailsYtd(imdCode: any, saleType: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,
      saleType: saleType
    }
    this.rest.getSELLScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.sale_scorecardDetails = res.result;
        this.sale_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getDTPScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getDTPScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.dtp_scorecardDetails = res.result;
        this.dtp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getPTPScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getPTPScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.ptp_scorecardDetails = res.result;
        this.ptp_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getCampaignScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCampaignScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.campaign_scorecardDetails = res.result;
        this.campaign_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getLOBScoreDetailsYtd(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLOBScoreDetailsYtd(data).subscribe((res: any) => {
      if (res.success) {
        this.lob_scorecardDetails = res.result;
        this.lob_scoreConfig = res.scoreConfig

      } else {
      }
    });
  }

  getMonthYearList(): any {
    
    this.rest.getMonthYearList().subscribe((res: any) => {
      if (res.success) {
        this.month_dropdownList = res.monthYearList
        // return this.zone_dropdownList
      } else {
      }
    });
  }





  orderby_YTD_Care_Advisor_Report_Card(columnName:any, orderType:any){
    // getOnePagerdataYTD
    const data = {
      imdCode:this.searchImdCode,
      monthYear: this.month_selectedItems,
      orderby_colName: columnName,
      orderType: orderType,
    }

    // this.rest.orderby_YTD_Care_Advisor_Report_Card(data).subscribe((res: any) => {
    //   if (res.success) {
        
    //   } else {
    //   }
    // })

    // this.onePagerYtdDataList = this.sortByKey(this.onePagerYtdDataList, columnName, orderType)
    this.onePagerYtdDataList_except_total = this.sortByKey(this.onePagerYtdDataList_except_total, columnName, orderType)

  }

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








  resetYtdCareAdvTabl(){

    // this.onePagerYtdDataList_except_total = this.onePagerYtdDataList_except_total_mainCopy

    this.show_LOB_asc = true as boolean;
    this.show_topline_lfy_asc = true as boolean;
    this.show_topline_lytd_asc = true as boolean;
    this.show_topline_cytd_asc = true as boolean;
    this.show_topline_growth_asc = true as boolean;
    this.show_contribution_lfy_asc = true as boolean;
    this.show_contribution_cytd_asc = true as boolean;
    this.show_renewal_lytd_asc = true as boolean;
    this.show_renewal_cytd_asc = true as boolean;
    this.show_renewal_variance_asc = true as boolean;
    this.show_loss_lfy_asc = true as boolean;
    this.show_loss_cytd_asc = true as boolean;
    this.show_loss_variance_asc = true as boolean;
    this.show_comission_lfy_asc = true as boolean;
    this.show_comission_cytd_asc = true as boolean;
    this.show_comission_variance_asc = true as boolean;

    // console.log("refresh sort", this.onePagerYtdDataList_except_total_mainCopy)
    this.orderby_YTD_Care_Advisor_Report_Card('LOB','asc')
  }




  

}
