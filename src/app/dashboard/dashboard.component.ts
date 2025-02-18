import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';
import { Location } from '@angular/common';
// import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
// import Highcharts  from 'highcharts/es-modules/masters/highcharts.src.js';
// import Highcharts from 'highcharts';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';

import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { IndianNumberPipe } from '../indian-number.pipe';
import { SideNavStatusService } from '../side-nav-status.service';
import { error } from 'console';
// import cli from 'node_modules (copy)/@angular/cli/lib/cli';
// import Chart from 'chart.js';


// @NgModule({
//   declarations: [
//     // other components
//     IndianNumberPipe
//   ],
//   // other module properties
// })



HC_map(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  // Store modal references by modal ID
  modalRefs: { [id: string]: NgbModalRef } = {};

  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;

  charts: { [key: string]: Chart } = {};

  bandComparison_table_show = false as boolean;
  showBrandTrend_percent = false ;

  // state_in_indiamap_isClicked = false as boolean;
  // zone_isClicked = false as boolean;


  // loader status
  bandtendTableStatus: boolean = true
  indiaMapStatus:boolean = true;
  lobContributionStatus: boolean = true;
  zonewiseBandingStatus: boolean = true;
  vintagewiseBandingStatus: boolean = true;
  lobwiseBandingStatus: boolean = true;




  // bandTrend_loading_spin = true as boolean;


  getcomparisonData_aplus_ly = [] as any;
  getcomparisonData_a_ly = [] as any;
  getcomparisonData_b_ly = [] as any;
  getcomparisonData_c_ly = [] as any;
  getcomparisonData_d_ly = [] as any;
  getcomparisonData_e_ly = [] as any;
  getcomparisonData_z_ly = [] as any;








  getcomparisonData_aplus = [] as any;
  getcomparisonData_a = [] as any;
  getcomparisonData_b = [] as any;
  getcomparisonData_c = [] as any;
  getcomparisonData_d = [] as any;
  getcomparisonData_e = [] as any;
  getcomparisonData_z = [] as any;
  getcomparisonData_total = [] as any;

  getcomparisonData_aplus_percent = [] as any;
  getcomparisonData_a_percent = [] as any;
  getcomparisonData_b_percent = [] as any;
  getcomparisonData_c_percent = [] as any;
  getcomparisonData_d_percent = [] as any;
  getcomparisonData_e_percent = [] as any;
  getcomparisonData_z_percent = [] as any;

  ytdBandMovementMonthColumns = [] as any;

  allChartLoad_status = false as any; //  getHeroAgents(); getBottomAgents(); this.getcomparison( end of zoneWiseBranding);
  apiComPlitionCount = 0

  urgentActionable_list = [{'SUB_CHANNEL': 'EMERGING RELATIONSHIPS', 'IMD_COUNT': 186, 'REMARKS': 'Low Renewal Ratio'}, {'SUB_CHANNEL': 'RETAIL AND SME BROKERS', 'IMD_COUNT': 11, 'REMARKS': 'Low Renewal Ratio'}, {'SUB_CHANNEL': 'PRIME RELATIONSHIPS', 'IMD_COUNT': 78, 'REMARKS': 'Low Winback'}, {'SUB_CHANNEL': 'KEY RELATIONSHIPS', 'IMD_COUNT': 100, 'REMARKS': 'Low Winback'}, {'SUB_CHANNEL': 'VSO', 'IMD_COUNT': 135, 'REMARKS': 'Low Renewal Ratio'}];


  agentFlagwiseBanding_graph: any
  lob_Wise_Branding_Chart: any

  getStateWiseLOBDistPie_chart: any
  getAgentBackgroundDistBar_chart: any

  lobContribution = "india"


  zoneWiseBranding_Chart: any;

  zoneWiseBranding_Chart_width : any

  zoneWiseBranding_Chart_style : any


  getBandingPie_chart: any;
  zone_branding_pie = '' as any
  state_branding_pie = '' as any

  pieChartFor = 'zone'


  madhyaPradesh: any
  uttarPradesh: any
  karnataka: any
  nagaland:any
  bihar: any
  lakshadweep: any
  andaman: any
  assam: any
  westbengal: any
  puduchery: any
  damananddiu: any
  gujarat: any
  rajasthan: any
  dadranagar: any
  chattrishgar: any
  tamilnadu: any
  chandigar: any
  punjab: any
  hariyana: any
  andhrapradesh: any
  maharashtra: any
  himachal: any
  meghalaya: any
  kerala: any
  telenghana: any
  mizoram: any
  tripura: any
  manipur: any
  arunachal: any
  jharkhand: any
  goa: any
  delhi: any
  orisa: any
  jk: any
  sikkim: any
  uttarakhand: any


  topology = this.common.topology;
  indiaMap : any;


  style_var_comm = "background-color: #f70000 !important;padding:1%;"
  style_var_loss = "background-color: #f70000 !important;padding:1%;"


  recommendationList = [] as any;

  public chart = [] as any;
  // option = {animationEnabled: true,
  //   animatoinDuration: 5000,}

  imdsearched = false;
  search = 0;

  classDict = { 'A+': 'AA', 'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D' }

  searchImdCode = '' as any;
  imdInfo = [] as any;

  agentScoreCard = true;
  comparisonColumns = [] as any;
  // comparisonColumns = ['Buckets', 'Apr 23', 'May 23', 'Jun 23', 'Jul 23', 'Aug 23']
  // comparisonDetails = [{'Buckets': 'A', 'Apr 23':15, 'May 23':99, 'Jun 23':20, 'Jul 23':22, 'Aug 23': 234},{'Buckets': 'B', 'Apr 23':15, 'May 23':99, 'Jun 23':20, 'Jul 23':22, 'Aug 23': 234},{'Buckets': 'C', 'Apr 23':15, 'May 23':99, 'Jun 23':20, 'Jul 23':22, 'Aug 23': 234},{'Buckets': 'D', 'Apr 23':15, 'May 23':99, 'Jun 23':20, 'Jul 23':22, 'Aug 23': 234},{'Buckets': 'E', 'Apr 23':15, 'May 23':99, 'Jun 23':20, 'Jul 23':22, 'Aug 23': 234}]
  comparisonDetails = [] as any;

  heroAgents = [] as any;

  bottomAgents = [] as any;

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



  userAgentId = this.common.getUserAgentId();
  agentType: any = this.common.getUserAgentType();
  rmCode: any = this.common.getUserRmCode();

  loadingStatus = false
  reportStatus = false
  reportCrossStatus = false
  reportStart = '' as any
  reportEnd = '' as any
  reportDuration = '' as any
  callCount = 0
  monthOnMonthFlag = 0;


  // for getting filter result
  channelList = [] as any
  subChannelList = [] as any
  cityList = [] as any
  productList = [] as any
  stateList = [] as any
  zonelList = [] as any
  lobList = [] as any

  monthYearList = [] as any;

  defaultimdchannelFlag = 0
  defaultlocationFlag = 0
  defaultproductCodeFlag = 0
  defaultstateFlag = 0
  defaultsubchannelFlag = 0
  defaultzoneFlag = 0
  defaultlobFlag = 0
  show_monthList = false as any
  downloadImd = '' as any;
  chart1 = '' as any;
  chart2 = '' as any;
  chart3 = '' as any;
  chart4 = '' as any;
  chart5 = '' as any;
  limit = 5;


  filter_btn_clicked = 0;
  monthName = '';
  showMonthFlag = false

  windowWidth= window.innerWidth as any




  bandTrendResponse: any;
  bandTrendResponse_ly: any







  // dropdownList = [] as any;
  // selectedItems = [] as any;
  // dropdownSettings:IDropdownSettings = {} as any

  summary_filteredResult = [] as any
  summary_mainColList = [] as any
  summary_keyColcount = 0 as any


  details_filteredResult = [] as any
  details_mainColList = [] as any
  details_keyColcount = 0 as any

  category_dropdownList = [{ catName: 'Month on Month' }, { catName: 'YTD/MTD/LYTD/LYMTD/CYLMTD' }] as any;
  category_selectedItems = [] as any;

  category_dropdownSettings: IDropdownSettings = {} as any


  

  month_dropdownList = [] as any;
  month_selectedItems = [] as any;
  month_dropdownSettings: IDropdownSettings = {} as any

  // asonmonth = this.month_selectedItems[0].monthName as any;
  showAsonmonth = false

  zone_dropdownList = [] as any;
  zone_selectedItems = [] as any;
  zone_dropdownSettings: IDropdownSettings = {} as any

  state_dropdownList = [] as any;
  state_selectedItems = [] as any;
  state_dropdownSettings: IDropdownSettings = {} as any

  location_dropdownList = [] as any;
  location_selectedItems = [] as any;
  location_dropdownSettings: IDropdownSettings = {} as any

  businessCategory_dropdownList = [] as any;
  businessCategory_selectedItems = [] as any;
  businessCategory_dropdownSettings: IDropdownSettings = {} as any

  productCodeName_dropdownList = [] as any;
  productCodeName_selectedItems = [] as any;
  productCodeName_dropdownSettings: IDropdownSettings = {} as any

  pAccLob_dropdownList = [] as any;
  pAccLob_selectedItems = [] as any;
  pAccLob_dropdownSettings: IDropdownSettings = {} as any

  productCodeNameBS_dropdownList = [] as any;
  productCodeNameBS_selectedItems = [] as any;
  productCodeNameBS_dropdownSettings: IDropdownSettings = {} as any

  imdChannel_dropdownList = [] as any;
  imdChannel_selectedItems = [] as any;
  imdChannel_dropdownSettings: IDropdownSettings = {} as any

  subChannelCodeName_dropdownList = [] as any;
  subChannelCodeName_selectedItems = [] as any;
  subChannelCodeName_dropdownSettings: IDropdownSettings = {} as any

  imdCodeName_dropdownList = [] as any;
  imdCodeName_selectedItems = [] as any;
  imdCodeName_dropdownSettings: IDropdownSettings = {} as any

  subImdCodeName_dropdownList = [] as any;
  subImdCodeName_selectedItems = [] as any;
  subImdCodeName_dropdownSettings: IDropdownSettings = {} as any


  mainChannel_dropdownList = [] as any;
  mainChannel_selectedItems = [] as any;
  mainChannel_dropdownSettings: IDropdownSettings = {} as any

  // subImdChannel_dropdownList = [] as any;
  // subImdChannel_selectedItems = [] as any;
  // subImdChannel_dropdownSettings:IDropdownSettings = {} as any

  netPremiumSlab_dropdownList = [] as any;
  netPremiumSlab_selectedItems = [] as any;
  netPremiumSlab_dropdownSettings: IDropdownSettings = {} as any



  // user rights
  channelRight = this.common.getUser_channelRight()
  cityRight = this.common.getUser_cityRight()
  productRight = this.common.getUser_productRight()
  stateRight = this.common.getUser_stateRight()
  subChannelRight = this.common.getUser_subChannelRight()
  zoneRight = this.common.getUser_zoneRight()
  lobRight = this.common.getUser_lobRight()
  indiaMap_apidata: any;

  brandingPiechart_status= false



  bandTrend_graph_show = false


  mtd_ytd_ftm_data : any;



  






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

  plugInCenterText = {
    id: 'centreText',
    beforeDraw: function (chart:any) {
        if (chart.options.centertext) {
            var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 80).toFixed(2); // was: 114
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = chart.options.centertext, // "75%",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2 - (chart.titleBlock.height - 15);

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }
  }
  
  



  constructor(
    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,
    private location: Location,
    private modalService: NgbModal,
    private elementRef: ElementRef,
    private router: Router,
    private SideNavStatusService: SideNavStatusService,
  ) { 

    
    // this.renderMapChart()
    // this.getcomparison();
    // this.vintage_wise_band_count('', '');
  }


  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });

    console.log("sideNav_state--> ", this.sideNav_state)
  }


  // ngAfterViewInit(): void {
  //   this.agentFlagwiseBanding('','')
  //   this.lobWiseBranding_Chart('', '')
  //   this.getAgentBackgroundDistBar('','')
  //   this.getStateWiseLOBDistPie('', '')
  // }

  ngAfterViewInit() {
    // this.callFilterResult('summary', 0)
    // this.createChart();
    // this.callFilterResult('details', 0)
    // this.agentFlagwiseBanding('','');
    // this.lobWiseBranding_Chart('', '')
    // this.getAgentBackgroundDistBar('','')
    // this.getStateWiseLOBDistPie('', '')
  }





  ngOnInit(): void {
    console.log("window width--->", this.windowWidth)
    this.sideNavStatus();

    this.sideNav_state = true;

    
    
    // this.location.replaceState('/customer loyality/jsljflkj/jjkfjskhd');
    
    this.month_selectedItems = sessionStorage.getItem('selectedMonthYear');
    if (this.month_selectedItems == null){
      this.month_selectedItems = []
    }
    else{
      this.month_selectedItems = JSON.parse(this.month_selectedItems);
      // this.showAsonmonth = true;
    }



    




    this.setUpValuesInDropDown();
    this.zoneWiseBranding_Chart_style_set()



    this.getMtdYtdFtmData()

    // this.getHeroAgents(); //--------
    // this.getBottomAgents(); //--------
    this.getcomparison();
    this.getcomparison_ly();


    this.get_all_filter_list();

    // this.get_zone_list();
    // this.get_state_list();
    // this.get_location_list();
    // this.getChannelList();
    // this.get_subChannelList(); //--------
    this.getMonthYearList();




    this.insights_api_new('', '');
    // this.vintage_wise_band_count('', '');


    // this.blurContentById('zoneWiseBranding_Chart')
    // this.blurContentById('getStateWiseLOBDistPie_highchart')
    // this.blurContentById('agentFlagwiseBanding')
    // this.blurContentById('lob_Wise_Branding_Chart')
    // this.blurContentById('getAgentBackgroundDistBar_chart')



  this.blurContentById('bandComparison')
  this.blurContentById('indiaMap')


  this.blurContentById('zoneWiseBranding_Chart')
  this.blurContentById('getStateWiseLOBDistPie_highchart')
  this.blurContentById('agentFlagwiseBanding')
  this.blurContentById('lob_Wise_Branding_Chart')
  this.blurContentById('getAgentBackgroundDistBar_chart')


    // this.agentFlagwiseBanding('','')
    // this.lobWiseBranding_Chart('', '')
    // this.getAgentBackgroundDistBar('','')
    // this.getStateWiseLOBDistPie('', '')




    // this.firstLoading()




    // this.createChart();
    // this.zoneWiseBranding()


    




    // this.getFilteredResult('summary', 0)
    // this.getFilteredResult('details', 0)

    // this.getAllMenuDropdownList().then(

    // )

    // this.getAllMenuDropdownList()

    this.reportStatus = false

    // this.executeFunctions()
    //   .then(() => {

    //     this.callFilterResult('summary', 0, 1);

    //   })
    //   .catch(error => {
    //     console.error('Error executing functions:', error);
    //   });


    // this.get_zone_list().then(data => this.get_state_list());


  }


  


  zoneWiseBranding_Chart_style_set(){
    let myDiv = document.getElementById("indiaMap_pad") as any;
    // const width = myDiv.offsetWidth;
    console.log("Width of the div:", myDiv);

    
  }

  // loadingFunctions(){
  //   this.setUpValuesInDropDown();
  //   this.zoneWiseBranding_Chart_style_set()

  //   this.getHeroAgents();
  //   this.getBottomAgents();
  //   this.getcomparison();


  //   this.get_zone_list();
  //   this.get_state_list();
  //   this.get_location_list();
  //   this.getChannelList();
  //   this.get_subChannelList();
  //   this.getMonthYearList();
  // }

  // async firstLoading() {
    

  //   await this.loadingFunctions();


  //   this.vanishLoadingScreen()

    
    
  // }


  vanishLoadingScreen(){
    this.allChartLoad_status = true
  }




  clearAllDetails(){
    this.searchImdCode = '';
    this.imdsearched = false;
    this.imdInfo = [];
    // window.location.reload();
  }
  exportChart() {
    this.chart.exportChart({ format: "png" });
  }
  createChart() {
    // let htmlRef = this.elementRef.nativeElement.querySelector(`#MyChart`);

    // var ctx = document.getElementById("MyChart").getContext("2d");
    this.chart = new Chart('gwpChart1', {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {

          }
        },
        interaction: {
          mode: 'index'
        }

      }

    });

    this.chart = new Chart('gwpChart2', {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {

          }
        },
        interaction: {
          mode: 'index'
        }
      }

    });
  }
  createpriorityChart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    console.log("prepare chart");
    this.chart = new Chart(htmlRef, {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        // label: "Priority",
        // labels: this.priorityGraphList,
        datasets: [
          {
            label: "Priority Wise Request Count",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            // data: this.countList,
            backgroundColor: 'green'
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
          // 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {

          }
        },
        interaction: {
          mode: 'index'
        }
      }

    });

    console.log("render chart");

    // this.chart = new Chart("myChart", {
    //   // type: true,
    //   // theme: "light2",
    //   title:{
    //     text: "Simple Line Chart"
    //   },
    //   datasets: [{        
    //     type: "line",
    //         indexLabelFontSize: 16,
    //     dataPoints: [
    //       { y: 450 },
    //       { y: 414},
    //       { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
    //       { y: 460 },
    //       { y: 450 },
    //       { y: 500 },
    //       { y: 480 },
    //       { y: 480 },
    //       { y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
    //       { y: 500 },
    //       { y: 480 },
    //       { y: 510 }
    //     ]
    //   }]
    // });
    // this.chart.render();
  }

  // afterRouting(){

    
  // }


  openModal(modal: any, search: any) {
    this.search = search;
    this.modalService.open(modal, { centered: true, size: 'lg' });

  }

  openModalDownload(modal: any, imdCode: any, search:any) {
    this.search = search;

    this.downloadImd = imdCode;
    this.modalService.open(modal, { centered: true, size: 'sm' });

  }

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

  transformResponse(data: any) {
    const monthNames = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
  
    // Extract months dynamically from keys
    const keys = Object.keys(data.result[0]).filter(key => key.startsWith("GWP"));

    const graphLevel = keys.map(key => {
      const [_, year, month] = key.split("_"); // Split the key
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`; // Convert month number to name
    });
  
    const columns = ["BANDING", ...graphLevel];
  
    // Define the type for lists object
    const lists: { [key: string]: number[] } = {}; // Dynamic keys with array of numbers as values
  
    data.result.forEach((item: any) => {
      const bandingKey = item.Banding === "-" ? "list_Z" : `list_${item.Banding.replace("+", "_plus")}`;
      if (!lists[bandingKey]) lists[bandingKey] = []; // Initialize array if not exists
  
      keys.forEach((key) => {
        lists[bandingKey].push(item[key]);
      });
    });
  
    return {
      columns,
      graphLevel,
      ...lists,
    };
  }


  vintage_wise_band_count(zone:any, state: any){

    // try{

    // }catch(err:any){
    //   console.log(err)
    // }
    let filterflag_exceptMonth = 1
    if(this.imdChannel_selectedItems.length == 0 && this.subChannelCodeName_selectedItems.length == 0 && this.zone_selectedItems.length == 0 && this.state_selectedItems == 0 && this.location_selectedItems == 0){
      filterflag_exceptMonth = 0
    }

    



    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      // year_month: this.convertDateFormat(this.month_selectedItems[0].monthVal),
      state: state,
      zone: zone,
    }

    // console.log("this.month_selectedItems>>>",this.month_selectedItems);
    try{

      this.rest.vintage_wise_band_count(data).subscribe((res: any) => {
  
        if(res.success){
          this.vintagewiseBandingStatus = false;
          this.prepare_vintageWisebandingGraph(res.level_data, res.bandingData)
  
        }else{
          console.log('error in vintage_wise_band_count')
        }
  
  
      });
    }catch(err:any){
      // window.alert(err);
      console.log(err)

    }
  }

  prepare_vintageWisebandingGraph( level_data: any, data: any){

    let levelData = level_data;
    const graphData = data;


    // console.log('levelData-->',levelData );
    // console.log('graphData-->',graphData );

    const chartOptions: Highcharts.Options = {
      chart: {
          type: 'column',
          // height: '60%', // Adjust height to maintain aspect ratio
          // spacingTop: 10, // Padding at the top
          // spacingBottom: 30, // Padding at the bottom
      },
      title: {
          text: '', // Highcharts includes titles by default; leave it empty if not needed
      },
      xAxis: {
          categories: levelData, // Equivalent to `labels` in Chart.js
          title: {
              text: 'Agent Vintage', // X-axis title
              style: {
                  fontWeight: 'bold',
                  fontSize: '13px',
              },
          },
          labels: {
              style: {
                  color: 'black',
                  fontWeight: 'normal',
              },
          },
          gridLineWidth: 0, // Remove grid lines
      },
      yAxis: {
          title: {
              text: 'Agent Count', // Y-axis title
              style: {
                  fontWeight: 'bold',
                  color: 'black',
              },
          },
          labels: {
              enabled: false, // Hide Y-axis ticks
          },
          gridLineWidth: 0, // Remove grid lines
      },
      // legend: {
      //     align: 'right',
      //     verticalAlign: 'top',
      //     layout: 'vertical',
      //     title: {
      //         text: 'Bands',
      //         style: {
      //             color: 'black',
      //             fontWeight: 'normal',
      //             fontSize: '13px',
      //         },
      //     },
      //     itemStyle: {
      //         color: 'black',
      //         fontWeight: 'normal',
      //     },
      // },
      tooltip: {
          formatter: function () {
              const index = this.point.index; // Get the index of the data point
              const customTitle = levelData[index]?.toString().replaceAll(',', ' '); // Fetch corresponding level_data
              return `<b>${customTitle}</b><br>${this.series.name}: ${this.y}`;
          },
      },
      plotOptions: {
          series: {
              // borderRadius: 10, // Bar corner radius
              // maxPointWidth: 35, // Max bar thickness
              dataLabels: {
                  enabled: true,
                  style: {
                      fontSize: '12px',
                  },
              },
          },
      },
      series: [
          {
              name: 'A+',
              data: graphData['A+'],
              // color: '#cdeac0',
              type: 'column',
          },
          {
              name: 'A',
              data: graphData.A,
              // color: '#efe9ae',
              type: 'column',
          },
          {
              name: 'B',
              data: graphData.B,
              // color: '#fec3a6',
              type: 'column',
          },
          {
              name: 'C',
              data: graphData.C,
              // color: '#ffac81',
              type: 'column',
          },
          {
              name: 'D',
              data: graphData.D,
              // color: '#ff928b',
              type: 'column',
          },
          {
            name: 'E',
            data: graphData.E,
            // color: '#ff928b',
            type: 'column',
          },
          // {
          //   name: 'Zero Business',
          //   data: graphData['Zero business'],
          //   // color: '#ff928b',
          //   type: 'column',
          // },
      ],
      credits: {
          enabled: false, // Disable Highcharts watermark
      },
  };
  
  // Render the chart
  Highcharts.chart('agentFlagwiseBanding', chartOptions);










    this.visibleContentById("agentFlagwiseBanding")

  }


  formatMonthYear(input:any) {
    // Split the input into month and year
    const parts = input.split(" ");

    // Check if the input has exactly two parts (month and year)
    if (parts.length !== 2) {
        return input; // Return the input unchanged if it doesn't match the expected format
    }

    const [month, year] = parts;

    // Validate that the month is a valid number (1-12) and year is a valid four-digit number
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (isNaN(monthNumber) || isNaN(yearNumber) || monthNumber < 1 || monthNumber > 12 || year.length !== 4) {
        return input; // Return the input unchanged if validation fails
    }

    // Array of month abbreviations
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
                        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    // Get the month name
    const monthName = monthNames[monthNumber - 1];

    // Return the formatted result
    return `${monthName} ${year}`;
}


  getcomparison_ly(){
    let filterflag_exceptMonth = 1
    if(this.imdChannel_selectedItems.length == 0 && this.subChannelCodeName_selectedItems.length == 0 && this.zone_selectedItems.length == 0 && this.state_selectedItems == 0 && this.location_selectedItems == 0){
      filterflag_exceptMonth = 0
    }

    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      // filterFlag_excptMonth: filterflag_exceptMonth
    }

    this.rest.getcomparison_ly(data).subscribe((res: any) => {
      if(res.success){
        if(res.status == 0){
          window.alert("No Data Available")
          return
        }

        this.getcomparisonData_aplus_ly = res.result['A+'] || [];
        this.getcomparisonData_a_ly = res.result.A || [];
        this.getcomparisonData_b_ly = res.result.B || [];
        this.getcomparisonData_c_ly = res.result.C || [];
        this.getcomparisonData_d_ly = res.result.D || [];
        this.getcomparisonData_e_ly = res.result.E || [];
        this.getcomparisonData_z_ly = res.result.Z || [];

        this.bandTrendResponse_ly = res.result

      }
    })
  }



  getcomparison() {
    this.bandtendTableStatus = true
    this.bandComparison_table_show = false;
    this.getcomparisonData_total = []

    let filterflag_exceptMonth = 1
    if(this.imdChannel_selectedItems.length == 0 && this.subChannelCodeName_selectedItems.length == 0 && this.zone_selectedItems.length == 0 && this.state_selectedItems == 0 && this.location_selectedItems == 0){
      filterflag_exceptMonth = 0
    }




    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      filterFlag_excptMonth: filterflag_exceptMonth
    }

    // console.log("this.month_selectedItems>>>",this.month_selectedItems);
    this.rest.getcomparison(data).subscribe((res: any) => {
      if (res.success) {

        this.bandtendTableStatus = false
        




        // let res = {
        //   "columns": [
        //     "BANDING", 
        //     "APR 2023", 
        //     "MAY 2023", 
        //     "JUN 2023", 
        //     "JUL 2023", 
        //     "AUG 2023", 
        //     "SEP 2023", 
        //     "OCT 2023", 
        //     "NOV 2023", 
        //     "DEC 2023"
        //   ], 
        //   "graphLevel": [
        //     "APR 2023", 
        //     "MAY 2023", 
        //     "JUN 2023", 
        //     "JUL 2023", 
        //     "AUG 2023", 
        //     "SEP 2023", 
        //     "OCT 2023", 
        //     "NOV 2023", 
        //     "DEC 2023"
        //   ], 
        //   "list_A": [
        //     304.0, 
        //     466.0, 
        //     406.0, 
        //     369.0, 
        //     357.0, 
        //     347.0, 
        //     376.0, 
        //     292.0, 
        //     66.0
        //   ], 
        //   "list_A_plus": [
        //     12.0, 
        //     20.0, 
        //     15.0, 
        //     7.0, 
        //     8.0, 
        //     7.0, 
        //     6.0, 
        //     5.0, 
        //     1.0
        //   ], 
        //   "list_B": [
        //     3214.0, 
        //     3440.0, 
        //     3749.0, 
        //     3585.0, 
        //     3633.0, 
        //     3624.0, 
        //     3643.0, 
        //     3473.0, 
        //     1202.0
        //   ], 
        //   "list_C": [
        //     8685.0, 
        //     8178.0, 
        //     9022.0, 
        //     9741.0, 
        //     9817.0, 
        //     10313.0, 
        //     10129.0, 
        //     9932.0, 
        //     7109.0
        //   ], 
        //   "list_D": [
        //     5536.0, 
        //     8478.0, 
        //     10088.0, 
        //     11739.0, 
        //     13580.0, 
        //     15128.0, 
        //     16949.0, 
        //     18690.0, 
        //     24295.0
        //   ], 
        //   "result": [
        //     {
        //       "APR 2023": 12.0, 
        //       "AUG 2023": 8.0, 
        //       "BANDING": "A+", 
        //       "DEC 2023": 1.0, 
        //       "JUL 2023": 7.0, 
        //       "JUN 2023": 15.0, 
        //       "MAY 2023": 20.0, 
        //       "NOV 2023": 5.0, 
        //       "OCT 2023": 6.0, 
        //       "SEP 2023": 7.0
        //     }, 
        //     {
        //       "APR 2023": 304.0, 
        //       "AUG 2023": 357.0, 
        //       "BANDING": "A", 
        //       "DEC 2023": 66.0, 
        //       "JUL 2023": 369.0, 
        //       "JUN 2023": 406.0, 
        //       "MAY 2023": 466.0, 
        //       "NOV 2023": 292.0, 
        //       "OCT 2023": 376.0, 
        //       "SEP 2023": 347.0
        //     }, 
        //     {
        //       "APR 2023": 3214.0, 
        //       "AUG 2023": 3633.0, 
        //       "BANDING": "B", 
        //       "DEC 2023": 1202.0, 
        //       "JUL 2023": 3585.0, 
        //       "JUN 2023": 3749.0, 
        //       "MAY 2023": 3440.0, 
        //       "NOV 2023": 3473.0, 
        //       "OCT 2023": 3643.0, 
        //       "SEP 2023": 3624.0
        //     }, 
        //     {
        //       "APR 2023": 8685.0, 
        //       "AUG 2023": 9817.0, 
        //       "BANDING": "C", 
        //       "DEC 2023": 7109.0, 
        //       "JUL 2023": 9741.0, 
        //       "JUN 2023": 9022.0, 
        //       "MAY 2023": 8178.0, 
        //       "NOV 2023": 9932.0, 
        //       "OCT 2023": 10129.0, 
        //       "SEP 2023": 10313.0
        //     }, 
        //     {
        //       "APR 2023": 5536.0, 
        //       "AUG 2023": 13580.0, 
        //       "BANDING": "D", 
        //       "DEC 2023": 24295.0, 
        //       "JUL 2023": 11739.0, 
        //       "JUN 2023": 10088.0, 
        //       "MAY 2023": 8478.0, 
        //       "NOV 2023": 18690.0, 
        //       "OCT 2023": 16949.0, 
        //       "SEP 2023": 15128.0
        //     }
        //   ], 
        //   "status": 200, 
        //   "success": true
        // } as any;
        

  


        // res = this.transformResponse(res)
        
        this.bandComparison_table_show = true;
        // this.bandTrend_loading_spin = false;

        // console.log("res>>>",res)
        this.ytdBandMovementMonthColumns = res.result.graphLevel

        
        
        // this.comparisonDetails = res.result;
        // this.comparisonColumns = res.columns;

        // Initialize data arrays
        this.getcomparisonData_aplus = res.result['A+'] || [];
        this.getcomparisonData_a = res.result.A || [];
        this.getcomparisonData_b = res.result.B || [];
        this.getcomparisonData_c = res.result.C || [];
        this.getcomparisonData_d = res.result.D || [];
        this.getcomparisonData_e = res.result.E || [];
        this.getcomparisonData_z = res.result.Z || [];



        console.log("getcomparisonData_aplus----> ", this.getcomparisonData_aplus)
        

        // Initialize percentage arrays
        this.getcomparisonData_aplus_percent = [];
        this.getcomparisonData_a_percent = [];
        this.getcomparisonData_b_percent = [];
        this.getcomparisonData_c_percent = [];
        this.getcomparisonData_d_percent = [];
        this.getcomparisonData_e_percent = [];
        this.getcomparisonData_z_percent = [];
        this.getcomparisonData_total = [];

        // Calculate percentages
        for (let i = 0; i < this.getcomparisonData_aplus.length; i++) {
          const total = 
            (this.getcomparisonData_aplus[i] || 0) + 
            (this.getcomparisonData_a[i] || 0) + 
            (this.getcomparisonData_b[i] || 0) + 
            (this.getcomparisonData_c[i] || 0) + 
            (this.getcomparisonData_d[i] || 0) + 
            (this.getcomparisonData_e[i] || 0)  
            // (this.getcomparisonData_z[i] || 0);

          // Avoid division by zero
          const validTotal = total || 1;

          this.getcomparisonData_total.push(total);

          this.getcomparisonData_aplus_percent.push(((this.getcomparisonData_aplus[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_a_percent.push(((this.getcomparisonData_a[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_b_percent.push(((this.getcomparisonData_b[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_c_percent.push(((this.getcomparisonData_c[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_d_percent.push(((this.getcomparisonData_d[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_e_percent.push(((this.getcomparisonData_e[i] / validTotal) * 100).toFixed(1));
          // this.getcomparisonData_z_percent.push(((this.getcomparisonData_z[i] / validTotal) * 100).toFixed(1));
        }







        if (this.chart3) {
          this.chart3.clear();
          this.chart3.destroy();
        }

        
        this.bandTrendResponse = res.result
  


        // this.renderMapChart()
        this.visibleContentById('bandComparison')
        // this.getStatewiseGwp()
        

      } else {
        console.log(" I am in else part");
      }
    });
  }






  // getcomparison() {
  //   this.bandComparison_table_show = false;
  //   this.getcomparisonData_total = []
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
  //       this.bandComparison_table_show = true;
  //       // this.bandTrend_loading_spin = false;

  //       console.log("get comparison res>>>",res)
  //       this.comparisonDetails = res.result;


  //       this.comparisonColumns = res.result.columns;
  //       this.getcomparisonData_aplus = res.result['A+']
  //       this.getcomparisonData_a = res.result.A
  //       this.getcomparisonData_b = res.result.B
  //       this.getcomparisonData_c = res.result.C
  //       this.getcomparisonData_d = res.result.D
  //       this.ytdBandMovementMonthColumns = res.result.graphLevel

  //       console.log("7777777777777comparisonColumns---> ", this.comparisonColumns)




  //       this.getcomparisonData_aplus_percent = []
  //       this.getcomparisonData_a_percent = []
  //       this.getcomparisonData_b_percent = []
  //       this.getcomparisonData_c_percent = []
  //       this.getcomparisonData_d_percent = []

        



        
  //       for (let i = 0; i < this.getcomparisonData_aplus.length; i++) {
  //         // console.log(items[i]);
  //         let total = this.getcomparisonData_aplus[i] + this.getcomparisonData_a[i] + this.getcomparisonData_b[i] + this.getcomparisonData_c[i] + this.getcomparisonData_d[i]

  //         this.getcomparisonData_total.push(total)

  //         this.getcomparisonData_aplus_percent.push((this.getcomparisonData_aplus[i] / total * 100).toFixed(1))
  //         this.getcomparisonData_a_percent.push((this.getcomparisonData_a[i] / total * 100).toFixed(1))
  //         this.getcomparisonData_b_percent.push((this.getcomparisonData_b[i] / total * 100).toFixed(1))
  //         this.getcomparisonData_c_percent.push((this.getcomparisonData_c[i] / total * 100).toFixed(1))
  //         this.getcomparisonData_d_percent.push((this.getcomparisonData_d[i] / total * 100).toFixed(1))
  //       }







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
  //               data: res.result['A+'],
  //               backgroundColor: '#0cc078',
  //               borderColor: '#0cc078',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "A",
  //               data: res.result.A,
  //               backgroundColor: '#79de79',
  //               borderColor: '#79de79',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "B",
  //               data: res.result.B,
  //               backgroundColor: '#ffd366',
  //               borderColor: '#ffd366',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "C",
  //               data: res.result.C,
  //               backgroundColor: '#ff8439',
  //               borderColor: '#ff8439',
  //               borderWidth: 1,
  //               fill: true,
  //             },
  //             {
  //               label: "D",
  //               data: res.result.D,
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
  //           aspectRatio: 2.2,
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

  //       // this.renderMapChart()
  //       this.visibleContentById('bandComparison')
  //       this.getStatewiseGwp()
        

  //     } else {
  //       console.log(" I am in else part");
  //     }
  //   });
  // }




  bandTrendGraphMakingOnly(){

    this.bandTrend_graph_show = true;
    // let levelData = level_data.map((x: any) => this.formatMonthYear(x));

    // const categories = this.bandTrendResponse.graphLevel; // X-axis labels
    const categories = this.formatMonthYear_list(this.bandTrendResponse.graphLevel); // X-axis labels


    const bandData = [
      { label: 'A+', data: this.bandTrendResponse['A+'], color: '#0cc078' },
      { label: 'A', data: this.bandTrendResponse.A, color: '#79de79' },
      { label: 'B', data: this.bandTrendResponse.B, color: '#ffd366' },
      { label: 'C', data: this.bandTrendResponse.C, color: '#ff8439' },
      { label: 'D', data: this.bandTrendResponse.D, color: '#e97282' },
      { label: 'E', data: this.bandTrendResponse.E, color: '#b40000' },
      // { label: 'Zero Business', data: this.bandTrendResponse.Z, color: '#800000' },
    ];

    // Prepare Highcharts series dynamically
    let seriesData = bandData.map((band) => ({
      name: band.label,
      data: band.data,
      color: band.color,
      type: 'line', // Use "area" to fill the chart
      fillOpacity: 0.6,
      marker: {
        enabled: false,
      },
    })) as any;

    // Highcharts configuration
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'line',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Months',
        },
      },
      yAxis: {
        title: {
          text: 'Total Agents',
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        valueSuffix: '',
      },
      plotOptions: {
        area: {
          stacking: 'normal', // Stacked area chart
        },
      },
      series: seriesData,
    };

    // Render the chart
    Highcharts.chart('bandComparison', chartOptions);

    
    
  }








  searchImdDetails(imdCode: any) {
    // this.searchImdCode = imdCode;
    this.getImdDetails(imdCode);
    this.getScoreCardDetails(imdCode);

  }

  getImdDetails(imdCode: any) {
    // this.searchImdCode = imdCode;
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getImdDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.imdInfo = res.result;
        this.style_var_comm = "padding:1%; background-color: " + res.result.COMMISSION_RATIO_COLOR + " !important"
        this.style_var_loss = "padding:1%; background-color: " + res.result.LOSS_RATIO_COLOR + " !important"

        // this.comparisonColumns = res.columns;

        // return this.zone_dropdownList
      } else {
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
  getComma(x:any){
    const fmt = require('indian-number-format');
    // console.log("fmt.format(x)>>>",fmt.format(x));
    return fmt.format(x)
  }

  downloadScoreCard() {
    const data = {
      imdCode: this.downloadImd,
      monthYear: this.month_selectedItems,
    }
    this.rest.downloadScoreCard(data).subscribe((res: any) => {
      if (res.success) {
        window.open(this.rest.file_path + '/downloads/' + res.fileName);
        this.notifier.notify('success', res.message);

      } else {
        this.notifier.notify('error', res.message);

      }
    });
  }
  downloadScoreCardPDF() {
    const data = {
      imdCode: this.downloadImd,
      monthYear: this.month_selectedItems,

    }
    this.rest.downloadScoreCardPDF(data).subscribe((res: any) => {
      if (res.success) {
        window.open(this.rest.file_path + '/downloads/' + res.fileName);
        this.notifier.notify('success', res.message);

      } else {
        this.notifier.notify('error', res.message);

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
            interaction: {
              mode: 'index'
            }

          }

        });


        

        // new Chart('bandingChart', {
        //   type: 'line', //this denotes tha type of chart

        //     // shared: true,


        //   data:{// values on X-Axis
        //     // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        //             //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
        //             labels: res.totalLevel,
        //      datasets: [
        //       // {
        //       //   label: "Total Score",
        //       //   // data: ['467','576', '572', '79', '92',
        //       //   //      '574', '573', '576'],
        //       //       data: res.totalData,
        //       //   backgroundColor: 'blue'
        //       // },
        //       {
        //         label: "Banding",
        //         // data: ['467','576', '572', '79', '92',
        //         //      '574', '573', '576'],
        //             data: res.bandingData,
        //         backgroundColor: 'limegreen'
        //       },
        //       // {
        //       //   label: "Profit",

        //       //   data:[ '542', '542', '536', '327', '17','0.00', '538', '541'],


        //       //   backgroundColor: 'limegreen'
        //       // }  
        //     ]
        //   },
        //   options: {
        //     aspectRatio:2.5,
        //     plugins: {
        //       tooltip:{
        //         // callbacks:{
        //         //   afterTitle: function(context){
        //         //     console.log("context", context[0].dataIndex);
        //         //     return 'GWP: ' + res.actual[context[0].dataIndex];
        //         //   }
        //         // }
        //       }
        //     },
        //     interaction: {
        //       mode: 'index'
        //     }

        //   }

        // });


      } else {
      }
    });
  }

  getTotalGraph_rep(imdCode: any) {
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
        if (this.chart2) {
          this.chart2.clear();
          this.chart2.destroy();
        }
        this.chart2 = new Chart('totalChart_rep', {
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
            interaction: {
              mode: 'index'
            }

          }

        });

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

        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('gwpChart1', {
          type: 'line', //this denotes tha type of chart

          // shared: true,


          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //      '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",

              //   data:[ '542', '542', '536', '327', '17','0.00', '538', '541'],


              //   backgroundColor: 'limegreen'
              // }  
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
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.gwpLevel,
            datasets: [
              {
                label: "GWP Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.gwpData,
                backgroundColor: 'blue'
              },
              {
                label: "MOM Growth Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.momgrowthData,
                backgroundColor: 'red'
              },
              {
                label: "CMLY Growth Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.cmlyData,
                backgroundColor: 'black'
              },
              {
                label: "Consistency Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.constData,
                backgroundColor: 'limegreen'
              },
              {
                label: "CMLY Growth Absolute Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.cmlyabsData,
                backgroundColor: 'green'
              },


              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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


      } else {
      }
    });
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

  getLRvsCAQGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLRvsCAQGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res>>>>>",res)
        if (this.chart4) {
          this.chart4.clear();
          this.chart4.destroy();
        }
        this.chart4 = new Chart('lrVsCaqGraph', {
          type: 'line',          
          data: {
            labels: res.graphLevel,
            datasets: [
              {
                label: "LR",
                data: res.lrData,
                backgroundColor: 'blue',
                borderColor: 'blue',
                // borderWidth: 1,
              },
              {
                label: "CAQ",
                data: res.caqData,
                backgroundColor: 'orange',
                borderColor: 'orange',
                // borderWidth: 1,
              },
              {
                label: "COR",
                data: res.corData,
                backgroundColor: 'grey',
                borderColor: 'grey',
                // borderWidth: 1,
              },
            ]
          },
          options: {
            layout: {
              padding: 10,
            },
            aspectRatio: 1.33,
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

  getLobPieGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getLobPieGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("res>>>>>",res)
        if (this.chart5) {
          this.chart5.clear();
          this.chart5.destroy();
        }
        this.chart5 = new Chart('lobPieGraph', {
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
            aspectRatio: 1.33,
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




  getNOPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('nopChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.nopLevel,
            datasets: [
              {
                label: "NOP Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.nopData,
                backgroundColor: 'limegreen'
              },
              {
                label: "Renewal Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
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

  getNOPRRGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getNOPRRGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('noprrChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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

  getCORGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCORGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('corChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
            ]
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function (context) {
                    console.log("context", context[0].dataIndex);
                    return 'COR: ' + res.actual[context[0].dataIndex];
                  }
                }
              }
            },
            interaction: {
              mode: 'index'
            }
          }

        });

        new Chart('corChart2', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.cyLevel,
            datasets: [
              {
                label: "COR CY Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.cyData,
                backgroundColor: 'limegreen'
              },
              {
                label: "COR CYLY Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.cylyData,
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
                    return 'COR: ' + res.actual[context[0].dataIndex];
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


  getCORScoreDetails(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCORScoreDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.cor_scorecardDetails = res.result;
        this.cor_scoreConfig = res.scoreConfig

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
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('lobChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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
  getCampaignGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getCampaignGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('cmpChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.campLevel,
            datasets: [
              {
                label: "LY Campaign Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.lyData,
                backgroundColor: 'limegreen'
              },
              {
                label: "CY Campaign Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
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
  getPTPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getPTPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('ptpChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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

  getDTPGraphs(imdCode: any) {
    const data = {
      imdCode: imdCode,
      monthYear: this.month_selectedItems,

    }
    this.rest.getDTPGraphs(data).subscribe((res: any) => {
      if (res.success) {
        // this.gwp_scorecardDetails = res.result;
        // this.gwp_scoreConfig = res.scoreConfig
        // "gwpLevel": gwpLevel, "gwpData":gwpData,  "momgrowthData":momgrowthData, "cmlyData":cmlyData, "constData":constData
        new Chart('dtpChart1', {
          type: 'line', //this denotes tha type of chart

          data: {// values on X-Axis
            // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
            //  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
            labels: res.totalLevel,
            datasets: [
              {
                label: "Total Score",
                // data: ['467','576', '572', '79', '92',
                //  '574', '573', '576'],
                data: res.totalData,
                backgroundColor: 'blue'
              },
              // {
              //   label: "Profit",
              //   data: ['542', '542', '536', '327', '17',
              //          '0.00', '538', '541'],
              //   backgroundColor: 'limegreen'
              // }  
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

  getHeroAgents() {
    const data = {
      // userAgentId: this.userAgentId,
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      limit: this.limit,


    }
    this.rest.getHeroAgents(data).subscribe((res: any) => {
      if (res.success) {
        this.heroAgents = res.result;

        // this.apiComPlitionCount += 1

      } else {
        // this.apiComPlitionCount += 1
      }
    });
  }

  getBottomAgents() {
    // console.log("this.month_selectedItems.monthName", this.month_selectedItems.monthName)
    const data = {
      // userAgentId: this.userAgentId
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      limit: this.limit,


    }
    this.rest.getBottomAgents(data).subscribe((res: any) => {
      if (res.success) {
        this.bottomAgents = res.result;
        // this.apiComPlitionCount += 1

      } else {
        // this.apiComPlitionCount += 1
      }
    });
  }
  getMonthYearList(): any {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.getMonthYearList().subscribe((res: any) => {
      if (res.success) {
        this.month_dropdownList = res.monthYearList
        // return this.zone_dropdownList
      } else {
      }
    });
  }
  filterCounter(){
    try{

      this.filter_btn_clicked += 1;
      this.monthName = this.month_selectedItems[0].monthName;
      this.showMonthFlag = true;
    }catch (error:any) {
      console.error(error.message);
    }
  }


  setUpValuesInDropDown() { //multi dropdown settings-------------------
    this.category_dropdownSettings = {
      singleSelection: true,
      idField: 'catName',
      textField: 'catName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
    this.mainChannel_dropdownSettings = {
      singleSelection: false,
      idField: 'MAIN_CHANNEL_FINAL',
      textField: 'MAIN_CHANNEL_FINAL',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.month_dropdownSettings = {
      singleSelection: true,
      idField: 'monthVal',
      textField: 'monthName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.imdCodeName_dropdownSettings = {
      singleSelection: false,
      idField: 'codeImd',
      textField: 'codeImd',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.zone_dropdownSettings = {
      singleSelection: false,
      idField: 'ZONE',
      textField: 'ZONE',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
    this.state_dropdownSettings = {
      singleSelection: false,
      idField: 'STATE',
      textField: 'STATE',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
    this.location_dropdownSettings = {
      singleSelection: false,
      idField: 'LOCATION_DESC',
      textField: 'LOCATION_DESC',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.businessCategory_dropdownSettings = {
      singleSelection: false,
      idField: 'businessCategory',
      textField: 'businessCategory',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.productCodeName_dropdownSettings = {
      singleSelection: false,
      idField: 'PRODUCT_ID',
      textField: 'PRODUCT_ID',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.pAccLob_dropdownSettings = {
      singleSelection: false,
      idField: 'lobName',
      textField: 'lobName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.productCodeNameBS_dropdownSettings = {
      singleSelection: false,
      idField: 'productCodeBS',
      textField: 'productCodeBS',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.imdChannel_dropdownSettings = {
      singleSelection: false,
      idField: 'CHANNEL',
      textField: 'CHANNEL',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.subChannelCodeName_dropdownSettings = {
      singleSelection: false,
      idField: 'SUB_CHANNEL',
      textField: 'SUB_CHANNEL',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.subImdCodeName_dropdownSettings = {
      singleSelection: false,
      idField: 'subImdCode',
      textField: 'subImdCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    // this.subImdChannel_dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'subImdChannel',
    //   textField: 'subImdChannel',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // }

    this.netPremiumSlab_dropdownSettings = {
      singleSelection: false,
      idField: 'premiumSlab',
      textField: 'premiumSlab',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  executeFunctions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loadingStatus = true


      this.get_mainChannel_list()

      this.getMonthYearList()

      this.get_all_filter_list();

      // this.get_zone_list()
      // this.get_state_list()
      // this.get_location_list()


      this.get_businessCategory_list()
      this.get_productCodeName_list()
      this.get_pAccLob_list()
      this.get_productCodeNameBS_list()
      // this.get_imdChannel_list()
      // this.get_subChannelCodeName_list()
      this.get_imdCodeName_list()
      this.get_netPremiumSlab_list()
      this.get_subImdCodeName_list()
      // this.get_subImdChannel_list()

      // Simulate some async behavior for demonstration purposes
      setTimeout(() => {
        resolve();
      }, 3000); // Adjust the delay as needed
    });
  }


  setUpDataForFilter(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.channelRight == 'default' && this.imdChannel_selectedItems.length == 0) {
        this.channelList = this.imdChannel_dropdownList
        this.defaultimdchannelFlag = 1
      }
      else {
        this.channelList = this.imdChannel_selectedItems
        this.defaultimdchannelFlag = 0
      }

      if (this.cityRight == 'default' && this.location_selectedItems.length == 0) {
        this.cityList = this.location_dropdownList
        this.defaultlocationFlag = 1
      }
      else {
        this.cityList = this.location_selectedItems
        this.defaultlocationFlag = 0
      }

      if (this.productRight == 'default' && this.productCodeName_selectedItems.length == 0) {
        this.productList = this.productCodeName_dropdownList
        this.defaultproductCodeFlag = 1
      }
      else {
        this.productList = this.productCodeName_selectedItems
        this.defaultproductCodeFlag = 0
      }

      if (this.stateRight == 'default' && this.state_selectedItems.length == 0) {
        this.stateList = this.state_dropdownList
        this.defaultstateFlag = 1
      }
      else {
        this.stateList = this.state_selectedItems
        this.defaultstateFlag = 0
      }

      if (this.subChannelRight == 'default' && this.subChannelCodeName_selectedItems.length == 0) {
        this.subChannelList = this.subChannelCodeName_dropdownList
        this.defaultsubchannelFlag = 1
      }
      else {
        this.subChannelList = this.subChannelCodeName_selectedItems
        this.defaultsubchannelFlag = 0
      }

      if (this.zoneRight == 'default' && this.zone_selectedItems.length == 0) {
        this.zonelList = this.zone_dropdownList
        this.defaultzoneFlag = 1
      }
      else {
        this.zonelList = this.zone_selectedItems
        this.defaultzoneFlag = 0
      }



      if (this.lobRight == 'default' && this.pAccLob_selectedItems.length == 0) {
        this.lobList = this.pAccLob_dropdownList
        this.defaultlobFlag = 1
      }
      else {
        this.lobList = this.pAccLob_selectedItems
        this.defaultlobFlag = 0
      }
      // Simulate some async behavior for demonstration purposes
      setTimeout(() => {
        resolve();
      }, 20); // Adjust the delay as needed
    });
  }

  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }












  get_all_filter_list(): any {
    const data = {
      userAgentId: this.userAgentId,
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
    }
    this.rest.getallFilters(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Available");
          return
        }else{
          this.zone_dropdownList = res.data.zones;
          this.state_dropdownList = res.data.states;
          this.location_dropdownList = res.data.locations;
          this.imdChannel_dropdownList = res.data.channels;


          console.log("zone_dropdownList--", this.zone_dropdownList);
          console.log("state_dropdownList--", this.state_dropdownList);
          console.log("location_dropdownList--", this.location_dropdownList);
          console.log("imdChannel_dropdownList--", this.imdChannel_dropdownList);


        }
        // this.zone_dropdownList = res.zoneList
        // return this.zone_dropdownList

      } else {
        // return this.zone_dropdownList
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }







  get_zone_list(): any {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_zone_list(data).subscribe((res: any) => {
      if (res.success) {
        this.zone_dropdownList = res.zoneList
        // return this.zone_dropdownList

      } else {
        // return this.zone_dropdownList
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_state_list() {
    const data = {
      selectedZoneList: this.zone_selectedItems,
      userAgentId: this.userAgentId
    }
    this.rest.get_state_list(data).subscribe((res: any) => {
      if (res.success) {
        this.state_dropdownList = res.stateList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_location_list() {
    const data = {
      selectedZoneList: this.zone_selectedItems,
      selectedStateList: this.state_selectedItems,
      userAgentId: this.userAgentId
    }
    this.rest.get_location_list(data).subscribe((res: any) => {
      if (res.success) {
        this.location_dropdownList = res.locationList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_businessCategory_list() {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_businessCategory_list(data).subscribe((res: any) => {
      if (res.success) {
        this.businessCategory_dropdownList = res.businessCategoryList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_productCodeName_list() {
    const data = {
      lobName: this.pAccLob_selectedItems,
      userAgentId: this.userAgentId
    }
    this.rest.get_productCodeName_list(data).subscribe((res: any) => {
      if (res.success) {
        this.productCodeName_dropdownList = res.productCodeList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_pAccLob_list() {
    const data = {
      userAgentId: this.userAgentId
    }

    this.rest.get_pAccLob_list(data).subscribe((res: any) => {
      if (res.success) {
        this.pAccLob_dropdownList = res.lobList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_productCodeNameBS_list() {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_productCodeNameBS_list(data).subscribe((res: any) => {
      if (res.success) {
        this.productCodeNameBS_dropdownList = res.productCodeBSList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_mainChannel_list() {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.getMainChannelList(data).subscribe((res: any) => {
      if (res.success) {
        this.mainChannel_dropdownList = res.mainChannelList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
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

  get_subChannelList() {
    const data = {
      userAgentId: this.userAgentId,
      // mainChannel:this.mainChannel_selectedItems,
      channel: this.imdChannel_selectedItems,


    }
    this.rest.get_subChannelList(data).subscribe((res: any) => {
      if (res.success) {
        this.subChannelCodeName_dropdownList = res.subChannelList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_imdCodeName_list() {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_imdCodeName_list(data).subscribe((res: any) => {
      if (res.success) {
        this.imdCodeName_dropdownList = res.imdCodeList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_netPremiumSlab_list() {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_netPremiumSlab_list(data).subscribe((res: any) => {
      if (res.success) {
        this.netPremiumSlab_dropdownList = res.premiumSlabList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  get_subImdCodeName_list() {
    const data = {
      imdCode: this.imdCodeName_selectedItems,
      userAgentId: this.userAgentId
    }
    this.rest.get_subImdCodeName_list(data).subscribe((res: any) => {
      if (res.success) {
        this.subImdCodeName_dropdownList = res.subImdCodeList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }

  // get_subImdChannel_list() {  
  //   const data = {
  //     imdChannel: this.imdChannel_selectedItems,
  //     userAgentId: this.userAgentId
  //   }  
  //   this.rest.get_subImdChannel_list(data).subscribe((res: any) => {
  //     if (res.success) {        
  //       this.subImdChannel_dropdownList = res.subImdChannelList
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  // }

  callFilterResult(reportType: any, isdownload: any, firstCall: any) {

    this.setUpDataForFilter()
      .then(() => {
        // this.callFilterResult('summary', 0)
        // this.callFilterResult('details', 0)
        if (firstCall == 1) {

          this.getFilteredResult(reportType, isdownload, firstCall)
        }
        if (this.category_selectedItems.length != 0 && this.category_selectedItems[0].catName == 'Month on Month') {

          // monthONmonth selected but month not selected
          if (this.month_selectedItems.length == 0) {
            window.alert('for Month on Month filter you have to chose atleast one month')
          }

          // both monthONmonth and month selected
          else if (this.month_selectedItems.length != 0) {
            this.monthOnMonthFlag = 1;
            this.createMonthOnMonthReport(reportType, isdownload, firstCall)
          }

          // when ytd/mtd is selected (this time monthList will not be visible)
          else {
            // this.monthOnMonthFlag = 0;
            // this.getFilteredResult(reportType, isdownload, firstCall)
          }
        }

        // Nothing is  selected between monthONmonth & ytd/mtd
        else {
          this.monthOnMonthFlag = 0;

          this.getFilteredResult(reportType, isdownload, firstCall)
        }
      })
      .catch(error => {
        console.error('Error executing functions:', error);
      });
    // this.getFilteredResult(reportType, isdownload, this.zonelList, this.stateList, this.cityList, this.channelList, this.subChannelList, this.productList)
  }
  show_Hide_monthYear_list() {
    // let findVal = ''
    console.log(this.category_selectedItems)
    if (this.category_selectedItems.length != 0) {
      for (let val of this.category_selectedItems) {
        if (val.catName == 'Month on Month') {
          console.log('val--------------', val)
          this.show_monthList = true
        }
        else {
          this.show_monthList = false
          this.month_selectedItems = []
        }
      }
    }
    else { this.show_monthList = false }
  }

  createMonthOnMonthReport(reportType: any, isdownload: any, firstCall: any) {

    this.loadingStatus = true
    this.reportStatus = false

    const data = {

      agentType: this.agentType,
      rmCode: this.rmCode,
      firstCall: firstCall,
      userAgentId: this.userAgentId,
      isDownload: isdownload,
      reportType: reportType,
      monthYear: this.month_selectedItems,
      mainChannel: this.mainChannel_selectedItems,
      state: this.stateList,
      zone: this.zonelList,
      locationCode: this.cityList,
      businessCategory: this.businessCategory_selectedItems,
      productCode: this.productList,
      productCodeBS: this.productCodeNameBS_selectedItems,
      lob: this.lobList,
      imdChannel: this.channelList,
      subChannelCodeName: this.subChannelList,
      imdCodeName: this.imdCodeName_selectedItems,
      subImdCodeName: this.subImdCodeName_selectedItems,
      // subImdChannel: this.subImdChannel_selectedItems,
      netPremiumSlab: this.netPremiumSlab_selectedItems,
      defaultimdchannelFlag: this.defaultimdchannelFlag,
      defaultlocationFlag: this.defaultlocationFlag,
      defaultproductCodeFlag: this.defaultproductCodeFlag,
      defaultstateFlag: this.defaultstateFlag,
      defaultsubchannelFlag: this.defaultsubchannelFlag,
      defaultzoneFlag: this.defaultzoneFlag,
      defaultlobFlag: this.defaultlobFlag,

    }


    this.rest.createMonthOnMonthReport(data).subscribe((res: any) => {
      if (res.success) {

        if (reportType == 'summary') {
          this.summary_filteredResult = res.finalData
          this.summary_mainColList = res.finalColumns
          this.summary_keyColcount = res.keyColCount

          this.monthYearList = res.monthYearList;


          // console.log(this.summary_mainColList)
          this.reportStart = res.startTime
          this.reportEnd = res.endTime
          this.reportDuration = res.duration
          // if(firstCall == 1){
          //   this.details_filteredResult = this.summary_filteredResult
          //   this.details_mainColList = this.summary_mainColList
          //   this.details_keyColcount = this.summary_keyColcount
          // }
          if (firstCall != 1) { this.reportStatus = true }
        }
        else {
          this.details_filteredResult = res.finalData
          this.details_mainColList = res.finalColumns
          this.details_keyColcount = res.keyColCount
          this.reportStart = res.startTime
          this.reportEnd = res.endTime
          this.reportDuration = res.duration
          this.monthYearList = res.monthYearList;

          // this.reportStatus = true
          if (firstCall != 1) { this.reportStatus = true }
        }

        if (isdownload == 1) {
          window.open(this.rest.file_path + '/downloads/' + res.fileName)
        }

        this.loadingStatus = false
        // this.notifier.notify('success', res.message)

      } else {
        this.notifier.notify('error', res.message)
        this.loadingStatus = false
      }
    }, (err: any) => {
      console.log(err)
      this.notifier.notify('error', err.error.message);
      this.loadingStatus = false

    });


  }


  getFilteredResult(reportType: any, isdownload: any, firstCall: any) {

    this.loadingStatus = true
    this.reportStatus = false



    const data = {
      agentType: this.agentType,
      rmCode: this.rmCode,
      firstCall: firstCall,
      userAgentId: this.userAgentId,
      isDownload: isdownload,
      reportType: reportType,
      mainChannel: this.mainChannel_selectedItems,
      monthYear: this.month_selectedItems,
      state: this.stateList,
      zone: this.zonelList,
      locationCode: this.cityList,
      businessCategory: this.businessCategory_selectedItems,
      productCode: this.productList,
      productCodeBS: this.productCodeNameBS_selectedItems,
      lob: this.lobList,
      imdChannel: this.channelList,
      subChannelCodeName: this.subChannelList,
      imdCodeName: this.imdCodeName_selectedItems,
      subImdCodeName: this.subImdCodeName_selectedItems,
      // subImdChannel: this.subImdChannel_selectedItems,
      netPremiumSlab: this.netPremiumSlab_selectedItems,
      defaultimdchannelFlag: this.defaultimdchannelFlag,
      defaultlocationFlag: this.defaultlocationFlag,
      defaultproductCodeFlag: this.defaultproductCodeFlag,
      defaultstateFlag: this.defaultstateFlag,
      defaultsubchannelFlag: this.defaultsubchannelFlag,
      defaultzoneFlag: this.defaultzoneFlag,
      defaultlobFlag: this.defaultlobFlag,
    }


    this.rest.getFilteredResult(data).subscribe((res: any) => {
      if (res.success) {

        if (reportType == 'summary') {
          this.summary_filteredResult = res.finalData
          this.summary_mainColList = res.finalColumns
          this.summary_keyColcount = res.keyColCount
          // console.log(this.summary_mainColList)
          this.reportStart = res.startTime
          this.reportEnd = res.endTime
          this.reportDuration = res.duration
          if (firstCall == 1) {
            this.details_filteredResult = this.summary_filteredResult
            this.details_mainColList = this.summary_mainColList
            this.details_keyColcount = this.summary_keyColcount
          }
          if (firstCall != 1) { this.reportStatus = true }



        }
        else {
          this.details_filteredResult = res.finalData
          this.details_mainColList = res.finalColumns
          this.details_keyColcount = res.keyColCount
          this.reportStart = res.startTime
          this.reportEnd = res.endTime
          this.reportDuration = res.duration
          // this.reportStatus = true
          if (firstCall != 1) { this.reportStatus = true }
          // console.log(this.summary_mainColList)
        }

        if (isdownload == 1) {
          window.open(this.rest.file_path + '/downloads/' + res.fileName)
        }

        this.loadingStatus = false
        // this.notifier.notify('success', res.message)

      } else {
        this.notifier.notify('error', res.message)
        this.loadingStatus = false
      }
    }, (err: any) => {
      console.log(err)
      this.notifier.notify('error', err.error.message);
      this.loadingStatus = false

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

  resetAll() {
    this.apiComPlitionCount = 0



    this.month_selectedItems = []
    this.zone_selectedItems = []
    this.state_selectedItems = []
    this.location_selectedItems = []

    this.imdChannel_selectedItems = []
    this.subChannelCodeName_selectedItems = []


    this.get_all_filter_list();

    // this.get_zone_list()
    // this.get_state_list()
    // this.get_location_list()

    // this.getChannelList()
    // this.get_subChannelList()
    this.getcomparison();
    this.getcomparison_ly();




  }
//   indiaMap(){
//     (async () => {

//     const topology = await fetch(
//         'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
//     ).then(response => response.json());

//     // Prepare demo data. The data is joined to map using value of 'hc-key'
//     // property by default. See API docs for 'joinBy' for more info on linking
//     // data and map.
//     const data = [
//         ['in-py', 10], ['in-ld', 11], ['in-wb', 12], ['in-or', 13],
//         ['in-br', 14], ['in-sk', 15], ['in-ct', 16], ['in-tn', 17],
//         ['in-mp', 18], ['in-2984', 19], ['in-ga', 20], ['in-nl', 21],
//         ['in-mn', 22], ['in-ar', 23], ['in-mz', 24], ['in-tr', 25],
//         ['in-3464', 26], ['in-dl', 27], ['in-hr', 28], ['in-ch', 29],
//         ['in-hp', 30], ['in-jk', 31], ['in-kl', 32], ['in-ka', 33],
//         ['in-dn', 34], ['in-mh', 35], ['in-as', 36], ['in-ap', 37],
//         ['in-ml', 38], ['in-pb', 39], ['in-rj', 40], ['in-up', 41],
//         ['in-ut', 42], ['in-jh', 43]
//     ];

//     // Create the chart
//     Highcharts.mapChart('container', {
//         chart: {
//             map: topology
//         },

//         title: {
//             text: 'Highcharts Maps basic demo'
//         },

//         subtitle: {
//             text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/in-all.topo.json">India</a>'
//         },

//         mapNavigation: {
//             enabled: true,
//             buttonOptions: {
//                 verticalAlign: 'bottom'
//             }
//         },

//         colorAxis: {
//             min: 0
//         },

//         series: [{
//             data: data,
//             name: 'Random data',
//             states: {
//                 hover: {
//                     color: '#BADA55'
//                 }
//             },
//             dataLabels: {
//                 enabled: true,
//                 format: '{point.name}'
//             }
//         }]
//     });

// })();
//   }

goToScoreCard(imdCode:any){
  this.router.navigate(['/scorecard',imdCode])
}
storeFilter(){
  // console.log("this.month_selectedItems[0]",this.month_selectedItems[0])
  // sessionStorage.setItem("selectedChannel",this.imdChannel_selectedItems);
  // sessionStorage.setItem("selectedSubChannel", this.subChannelCodeName_selectedItems);
  // sessionStorage.setItem("selectedZone", this.zone_selectedItems);
  // sessionStorage.setItem("selectedState", this.state_selectedItems);
  // sessionStorage.setItem("selectedLocation", this.location_selectedItems);
  // sessionStorage.setItem("selectedMonthYear", this.month_selectedItems);
  sessionStorage.setItem("selectedChannel", JSON.stringify(this.imdChannel_selectedItems));
  sessionStorage.setItem("selectedSubChannel", JSON.stringify(this.subChannelCodeName_selectedItems));
  sessionStorage.setItem("selectedZone", JSON.stringify(this.zone_selectedItems));
  sessionStorage.setItem("selectedState", JSON.stringify(this.state_selectedItems));
  sessionStorage.setItem("selectedLocation", JSON.stringify(this.location_selectedItems));
  sessionStorage.setItem("selectedMonthYear", JSON.stringify(this.month_selectedItems));
  
}













getStateWiseLOBDistPie(zone:any, state: any){

  // this.clearContentById('getStateWiseLOBDistPie_highchart')



  const data = {
    // triggerDate: '2024-02-05',
    user_agent_id: this.userAgentId,
    selected_channel: this.imdChannel_selectedItems,
    selected_subchannel: this.subChannelCodeName_selectedItems,
    selected_zone: this.zone_selectedItems,
    selected_state: this.state_selectedItems,
    selected_location: this.location_selectedItems,
    monthYear: this.month_selectedItems,
    state: this.state_branding_pie,
    zone: zone,
  }

  this.rest.getStateWiseLOBDistPie(data).subscribe((res: any) => {
    if (res.success) {
      console.log("@@@@@@---->",res.level_data, res.imdData.IMD_COUNT)

      
      
      

      let chartData = [] as any;
      
      for (let i = 0; i < (res.level_data).length; i++) {
        chartData.push(
          { "name": res.level_data[i], "y": res.imdData.IMD_COUNT[i] }
        );
      } 

      console.log("chartData pie12345----------->>",chartData)        

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

            // name: 'Entity Count',
            name: 'GWP in Cr',
    
            states: {
              hover: {
                // color: '#BADA55',
                color: "#87d2ed"
              }
            },
            dataLabels: {
              enabled: true,
              distance: 10,
              format: '{point.name}: {point.y}<br>{point.percentage:.1f}%'
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
      this.visibleContentById('getStateWiseLOBDistPie_highchart')

      
      
    }
    
  
  
  })


}


prepareLOB_contribution_piechart(response: any){


  console.log("@@@@@@---->",response)

      let color = [
        'rgb(255, 87, 51)',      // Coral
        'rgb(102, 204, 255)',    // Sky Blue
        'rgb(128, 255, 128)',    // Light Green
        'rgb(255, 223, 128)',    // Peach
        'rgb(178, 102, 255)',    // Lavender
        'rgb(255, 140, 0)',      // Dark Orange
        'rgb(0, 204, 204)',      // Teal
        'rgb(240, 128, 128)',    // Light Coral
        'rgb(135, 206, 250)',    // Light Blue
        'rgb(144, 238, 144)',    // Pale Green
        'rgb(255, 239, 213)',    // Papaya Whip
        'rgb(186, 85, 211)',     // Orchid
        'rgb(255, 165, 79)',     // Sandy Brown
        'rgb(64, 224, 208)',     // Turquoise
        'rgb(255, 105, 180)',    // Hot Pink
        'rgb(70, 130, 180)',     // Steel Blue
        'rgb(124, 252, 0)',      // Lawn Green
        'rgb(255, 228, 181)',    // Moccasin
        'rgb(221, 160, 221)',    // Plum
        'rgb(255, 127, 80)',     // Coral Reef
        'rgb(0, 191, 255)',      // Deep Sky Blue
        'rgb(127, 255, 212)',    // Aquamarine
        'rgb(255, 250, 205)',    // Lemon Chiffon
        'rgb(219, 112, 147)',    // Pale Violet Red
        'rgb(255, 99, 71)',      // Tomato
        'rgb(30, 144, 255)',     // Dodger Blue
        'rgb(152, 251, 152)',    // Pale Green
        'rgb(255, 182, 193)',    // Light Pink
        'rgb(218, 165, 32)',     // Goldenrod
        'rgb(173, 216, 230)'     // Light Cyan
      ]
      
      

      let chartData = [] as any;
      
      for (let i=0; i < (response.level_data).length; i++) {
        chartData.push(
          { "name": response.level_data[i], "y": response.imdData.IMD_COUNT[i] }
        );
      } 

      console.log("chartData pie12345----------->>",chartData)        

      const chartOptions: Highcharts.Options = {
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
            
            data: chartData,

            // name: 'Entity Count',
            name: 'GWP in Cr',
    
            states: {
              hover: {
                // color: '#BADA55',
                color: "#87d2ed"
              }
            },
            dataLabels: {
              enabled: true,
              distance: 10,
              // format: '{point.name}: {point.y}<br>{point.percentage:.1f}%'
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


      Highcharts.chart('getStateWiseLOBDistPie_highchart', chartOptions);
      this.visibleContentById('getStateWiseLOBDistPie_highchart')

}


// getStateWiseLOBDistPie(zone:any, state: any)







// previous
// restructureZonewiseBandingData(response: any, selectedMonth: string): any {
//   try {
//     // Extract the raw banding data and zone list from the response
//     const bandingDataRaw = response[0].bandingData;
//     const zoneList = response[0].zoneList;

//     // Construct the dynamic banding key for the selected month
//     const bandingKey = `Banding_${selectedMonth}`;

//     // Initialize the banding data dictionary with empty arrays
//     const bandingCategories = ["A", "Aplus", "B", "C", "D", "E", "Zero business"];
//     const bandingData: { [key: string]: number[] } = bandingCategories.reduce(
//       (acc, category) => ({ ...acc, [category]: [] }),
//       {}
//     );

//     // Process each zone separately
//     zoneList.forEach((zone: string) => {
//       // Filter data for the current zone
//       const zoneData = bandingDataRaw.filter((entry: any) => entry.Zone === zone);

//       // Calculate totals for each banding category in the current zone
//       const bandTotals: { [key: string]: number } = {};
//       zoneData.forEach((entry: any) => {
//         const band = entry[bandingKey];
//         const value = entry.I_IMD_DESC;
//         if (band) {
//           bandTotals[band] = (bandTotals[band] || 0) + value;
//         }
//       });

//       // Populate the totals into the respective categories
//       bandingCategories.forEach((category) => {
//         if (category === "Zero business") {
//           const zeroBusiness = bandTotals["-"] || 0;
//           bandingData[category].push(zeroBusiness);
//         } else {
//           const originalKey = category === "Aplus" ? "A+" : category;
//           bandingData[category].push(bandTotals[originalKey] || 0);
//         }
//       });
//     });

//     // Construct and return the final response
//     return {
//       bandingData,
//       status: 200,
//       success: true,
//       zoneList,
//     };
//   } catch (error) {
//     console.error("Error processing data:", error);
//     return {
//       bandingData: {},
//       status: 500,
//       success: false,
//       zoneList: [],
//     };
//   }
// }



restructureZonewiseBandingData(response: any, selectedMonth: string): any {
  try {
    // Extracting necessary data
    const bandingDataRaw = response[0]?.bandingData || [];
    const zoneList = response[0]?.zoneList || [];

    // Construct the banding key dynamically
    const bandingKey = `${selectedMonth}_BAND`;

    // Define banding categories
    const bandingCategories = ["A", "Aplus", "B", "C", "D", "E", "Zero business"];

    // Initialize the banding data structure
    const bandingData: { [key: string]: number[] } = {};
    bandingCategories.forEach((category) => {
      bandingData[category] = [];
    });

    // Process each zone separately
    zoneList.forEach((zone: string) => {
      // Filter data for the current zone
      const zoneData = bandingDataRaw.filter((entry: any) => entry.Zone === zone);

      // Compute totals for each category
      const bandTotals: { [key: string]: number } = {};

      zoneData.forEach((entry: any) => {
        const band = entry[bandingKey]; // Band category for this entry
        const value = entry.I_IMD_DESC || 0; // Extracting value (default 0 if missing)

        if (band) {
          bandTotals[band] = (bandTotals[band] || 0) + value;
        }
      });

      // Populate the final banding data object
      bandingCategories.forEach((category) => {
        if (category === "Zero business") {
          bandingData[category].push(bandTotals["-"] || 0);
        } else {
          const originalKey = category === "Aplus" ? "A+" : category;
          bandingData[category].push(bandTotals[originalKey] || 0);
        }
      });
    });

    return {
      bandingData,
      status: 200,
      success: true,
      zoneList,
    };
  } catch (error) {
    console.error("Error processing data:", error);
    return {
      bandingData: {},
      status: 500,
      success: false,
      zoneList: [],
    };
  }
}


// transformData(input: any) {
//   const { bandingData, zoneList } = input[0];

//   const result = {
//     zoneList,
//     bandingData: {}
//   };

//   // Extract unique bands excluding "-"
//   const uniqueBands = Array.from(new Set(bandingData.map((entry:any) => entry["2025-01_BAND"])))
//     .filter(band => band !== "-");

//   // Initialize bandingData object with empty arrays for each band
//   uniqueBands.forEach(band => {
//     result.bandingData[band] = zoneList.map(zone => {
//       const entry = bandingData.find(item => item["2025-01_BAND"] === band && item.Zone === zone);
//       return entry ? entry.I_IMD_DESC : 0; // Default to 0 if not found
//     });
//   });

//   return result;
// }






// {
//   "zoneList":  [
//           "EAST", 
//           "HO", 
//           "NORTH", 
//           "SOUTH", 
//           "WEST"
//         ],
//    "bandingData": {
//    "A+": [data of east, data of ho, data of north, data of south, data of west],
//    "A": [data of east, data of ho, data of north, data of south, data of west],
//    "B": [data of east, data of ho, data of north, data of south, data of west],
//    "C": [data of east, data of ho, data of north, data of south, data of west],
//    "D": [data of east, data of ho, data of north, data of south, data of west],
//    "E": [data of east, data of ho, data of north, data of south, data of west]
//     }
//   }



// this.prepare_zonewiseBandingGraph(res.zone_wise_banding_bar,  String(this.convertDateFormat(noSelectionMonth[0].monthVal)));
// restructureZonewiseBandingData2(data:any){
//   // let zoneList = data[0].zoneList;
//   let step1 = data[0].bandingData;

//   let bandKeyName = Object.keys(data[0].bandingData[0])[0]
  

//   let data_A = []
//   let data_Aplus = []
//   let data_B = []
//   let data_C = []
//   let data_D = []
//   let data_E = []

//   for(let d of step1){
//     if(d[bandKeyName] == "A"){
//       data_A.push(d.I_IMD_DESC)
//     }
//     else if(d[bandKeyName] == "A+"){
//       data_Aplus.push(d.I_IMD_DESC)
//     }
//     else if(d[bandKeyName] == "B"){
//       data_B.push(d.I_IMD_DESC)
//     }
//     else if(d[bandKeyName] == "C"){
//       data_C.push(d.I_IMD_DESC)
//     }
//     else if(d[bandKeyName] == "D"){
//       data_D.push(d.I_IMD_DESC)
//     }
//     else if(d[bandKeyName] == "E"){
//       data_E.push(d.I_IMD_DESC)
//     }    

//   }

//   return { "A": data_A, "B": data_B, "C": data_C, "D": data_D, "E": data_E, "A+": data_Aplus }
// }




restructureZonewiseBandingData2(data: any) {
  console.log("pppppppppppppppppppppppppppppp ", data)
  // Check if data and bandingData are defined
  // if (!data || !data[0] || !data[0].bandingData) {
  //   console.error('Invalid data or bandingData not found');
  //   return {}; // Return an empty object or handle the error accordingly
  // }

  let step1 = data[0].bandingData;

  // Dynamically get the band key name
  let bandKeyName = Object.keys(step1[0])[0]; // This will get the first key dynamically, e.g., "2025-01_BAND"


  

  let data_A = [];
  let data_Aplus = [];
  let data_B = [];
  let data_C = [];
  let data_D = [];
  let data_E = [];

  for (let d of step1) {
    if (d[bandKeyName] === "A") {
      data_A.push(d.I_IMD_DESC);
    } else if (d[bandKeyName] === "A+") {
      data_Aplus.push(d.I_IMD_DESC);
    } else if (d[bandKeyName] === "B") {
      data_B.push(d.I_IMD_DESC);
    } else if (d[bandKeyName] === "C") {
      data_C.push(d.I_IMD_DESC);
    } else if (d[bandKeyName] === "D") {
      data_D.push(d.I_IMD_DESC);
    } else if (d[bandKeyName] === "E") {
      data_E.push(d.I_IMD_DESC);
    }
  }

  return { "A": data_A, "B": data_B, "C": data_C, "D": data_D, "E": data_E, "A+": data_Aplus, zoneList: data.zoneList };
}







prepare_zonewiseBandingGraph(res:any,  selectedMonth: any){


  console.log("incoming----> ", res)

  // console.log("restructureZonewiseBandingData2 ---22222222---222--22-->",this.restructureZonewiseBandingData2(res))
  // res = this.restructureZonewiseBandingData(res, selectedMonth)
  let resp = this.restructureZonewiseBandingData2(res)

  console.log("zoneList---> ", res[0].zoneList)

  // console.log("prepare_zonewiseBandingGraph---> ", res)

      const chartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            // height: '60%', // Adjust as needed
            // spacingTop: 10,
            // spacingBottom: 20,
        },
        title: {
            text: '', // No main title
        },
        xAxis: {
            // categories: ["EAST", "WEST", "NORTH", "SOUTH"], // X-axis labels
            categories: res[0].zoneList,
            title: {
                text: 'ZONE',
                style: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '13px',
                },
            },
            labels: {
                style: {
                    color: 'black',
                    fontWeight: 'normal',
                },
            },
            gridLineWidth: 0, // Remove grid lines
        },
        yAxis: {
            title: {
                text: 'Agent Count',
                style: {
                    color: 'black',
                    fontWeight: 'bold',
                },
            },
            labels: {
                enabled: false, // Hide labels
            },
            gridLineWidth: 0, // Remove grid lines
        },
        // legend: {
        //     align: 'right',
        //     verticalAlign: 'top',
        //     layout: 'vertical',
        //     title: {
        //         text: 'Bands',
        //         style: {
        //             color: 'black',
        //             fontWeight: 'normal',
        //             fontSize: '13px',
        //         },
        //     },
        //     itemStyle: {
        //         color: 'black',
        //         fontWeight: 'normal',
        //     },
        // },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br>${this.series.name}: ${this.y}`;
            },
        },
        plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                },
                },

                point: {
                  events: {
        
                    click: this.customAPIcall.bind(this)
                    
                  }
                },
            },
        },
        series: [
            {
                name: 'A+',
                data: resp["A+"],
                // color: '#0cc078',
                type: 'column',
            },
            {
                name: 'A',
                data: resp.A,
                // color: '#79de79',
                type: 'column',
            },
            {
                name: 'B',
                data: resp.B,
                // color: '#ffd366',
                type: 'column',
            },
            {
                name: 'C',
                data: resp.C,
                // color: '#ff8439',
                type: 'column',
            },
            {
                name: 'D',
                data: resp.D,
                // color: '#e84258',
                type: 'column',
            },
            {
              name: 'E',
              data: resp.E,
              // color: '#e84258',
              type: 'column',
            },
            // {
            //   name: 'Zero Business',
            //   data: res.bandingData['Zero business'],
            //   // color: '#e84258',
            //   type: 'column',
            // },
        ],
        credits: {
            enabled: false, // Remove Highcharts branding
        },
    };


    Highcharts.chart('zoneWiseBranding_Chart', chartOptions);












  this.visibleContentById('zoneWiseBranding_Chart')

  
}



prepareBackgroundWiseAgentCount_columnChart(level_data:any, imdData: any){

  // console.log("prepare levelData ----> ", level_data);
  // console.log("prepare imdCountData ----> ", imdData);

  let prepareImdData = imdData.map((item: any) => item.I_IMD_DESC);


  this.create_BackgroundWiseAgentCount_columnChart(level_data, prepareImdData);


        
}

create_BackgroundWiseAgentCount_columnChart(level_data:any, imdData: any){
        const levelData = level_data; // X-axis categories
        const imdCountData = imdData; // Y-axis values


        console.log("levelData ----> ", levelData);
        console.log("imdCountData ----> ", imdCountData);

        // Combine categories and data into a single array for sorting
        const combinedData = levelData.map((category: any, index:any) => ({
          category,
          value: imdCountData[index],
        }));

        // Sort by value (ascending or descending)
        combinedData.sort((a:any, b:any) => b.value - a.value); // For descending order
        // Use `a.value - b.value` for ascending order

        // Separate sorted data back into categories and values
        const sortedCategories = combinedData.map((item: any) => item.category);
        const sortedValues = combinedData.map((item:any) => item.value);

        // Highcharts Options with sorted data
        const chartOptions: Highcharts.Options = {
          chart: {
            type: 'column', // Column chart type
          },
          title: {
            text: '', // Title for the chart
          },
          credits: {
            enabled: false, // Disable credits (e.g., Highcharts logo)
          },
          xAxis: {
            categories: sortedCategories, // Use sorted categories
            title: {
              text: 'Agent Background',
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black',
              },
            },
            labels: {
              style: {
                color: 'black',
                fontWeight: 'normal',
              },
            },
            gridLineWidth: 0, // Remove gridlines
          },
          yAxis: {
            title: {
              text: 'Agent Count', // Title for Y-axis
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black',
              },
            },
            labels: {
              style: {
                color: 'black',
              },
            },
            gridLineWidth: 1, // Keep gridlines for better readability
          },
          tooltip: {
            shared: true, // Shared tooltip across series
            formatter: function () {
              // return ` ${this.series.name}<br/>IMD Count: ${this.point.y}`;
              const categoryName = this.point.category || this.x; // Access the category
              return `${categoryName}<br/>IMD Count: ${this.point.y}`;
            },
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '12px',
                },
              },
            },
            column: {
              borderRadius: 5, // Round the corners of the columns
              maxPointWidth: 60, // Max width for columns
            },
          },
          legend: {
            enabled: false, // Disable the legend
          },
          series: [
            {
              type: 'column',
              name: 'IMD Count',
              data: sortedValues, // Use sorted data
              // color: '#4CAF50', // Color for the columns
            },
          ],
        };
        
        // Render the chart
        Highcharts.chart('getAgentBackgroundDistBar_chart', chartOptions);

        this.visibleContentById('getAgentBackgroundDistBar_chart')


}




insights_api_new(zone:any, state: any){
  // this.indiaMapStatus = true;
  // this.lobContributionStatus = true;
  // this.zonewiseBandingStatus = true;
  // this.lobwiseBandingStatus = true;

  
  // let yearMonth = '';
  // if(this.month_selectedItems.length != 0 ){
  //   yearMonth = this.convertDateFormat(this.month_selectedItems[0].monthVal)
  // }
  

  const dataValue = {

    user_agent_id: this.userAgentId,
    selected_channel: this.imdChannel_selectedItems,
    selected_subchannel: this.subChannelCodeName_selectedItems,
    selected_zone: this.zone_selectedItems,
    selected_state: this.state_selectedItems,
    selected_location: this.location_selectedItems,
    monthYear: this.month_selectedItems,
    // year_month: this.convertDateFormat(this.month_selectedItems[0].monthVal),
    // year_month: yearMonth,
    state: state,
    zone: zone,

  } as any;

  this.rest.insights_api_new(dataValue).subscribe((res: any) => {
    if (res.success) {

      let res1 = {
        "agent_background_count": [
          {
            "imdData": [
              {
                "AGENT_BACKGROUND": "0",
                "I_IMD_DESC": 432399
              },
              {
                "AGENT_BACKGROUND": "2 Wheeler Dealer",
                "I_IMD_DESC": 2026
              },
              {
                "AGENT_BACKGROUND": "Any Other Job.",
                "I_IMD_DESC": 311
              },
              {
                "AGENT_BACKGROUND": "Automobile Sector,Any Other Job.",
                "I_IMD_DESC": 43
              },
              {
                "AGENT_BACKGROUND": "Automobile Sector,Fresher In Insurance.",
                "I_IMD_DESC": 14
              },
              {
                "AGENT_BACKGROUND": "Automobile Sector.",
                "I_IMD_DESC": 139
              },
              {
                "AGENT_BACKGROUND": "BUISNESS",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "Businessman",
                "I_IMD_DESC": 12266
              },
              {
                "AGENT_BACKGROUND": "Chartered Accountant",
                "I_IMD_DESC": 236
              },
              {
                "AGENT_BACKGROUND": "Composite Agent",
                "I_IMD_DESC": 30953
              },
              {
                "AGENT_BACKGROUND": "Composite License,Life Insurance.",
                "I_IMD_DESC": 3
              },
              {
                "AGENT_BACKGROUND": "Composite License.",
                "I_IMD_DESC": 28
              },
              {
                "AGENT_BACKGROUND": "Direct Selling Agent",
                "I_IMD_DESC": 806
              },
              {
                "AGENT_BACKGROUND": "Fresher In Insurance,Any Other Job.",
                "I_IMD_DESC": 7
              },
              {
                "AGENT_BACKGROUND": "Fresher In Insurance,Own Business,Any Other Job.",
                "I_IMD_DESC": 1
              },
              {
                "AGENT_BACKGROUND": "Fresher In Insurance,Own Business.",
                "I_IMD_DESC": 56
              },
              {
                "AGENT_BACKGROUND": "Fresher In Insurance.",
                "I_IMD_DESC": 163
              },
              {
                "AGENT_BACKGROUND": "Fresher In Insurance.RTO Agent,",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "Fresher in Insurance",
                "I_IMD_DESC": 1386
              },
              {
                "AGENT_BACKGROUND": "General Insurance",
                "I_IMD_DESC": 5284
              },
              {
                "AGENT_BACKGROUND": "General Insurance Agent (PSU)",
                "I_IMD_DESC": 32231
              },
              {
                "AGENT_BACKGROUND": "General Insurance Agent(Private)",
                "I_IMD_DESC": 121302
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Any Other Job.",
                "I_IMD_DESC": 21
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Automobile Sector,Own Business.",
                "I_IMD_DESC": 3
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Automobile Sector.",
                "I_IMD_DESC": 7
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Health Insurance.",
                "I_IMD_DESC": 16
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,Automobile Sector,Fresher In Insurance,Own Business,Any Other Job.",
                "I_IMD_DESC": 8
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,Automobile Sector,Own Business.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,Fresher In Insurance,Own Business,Any Other Job.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,Fresher In Insurance.",
                "I_IMD_DESC": 13
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,Own Business.",
                "I_IMD_DESC": 16
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,RTO Agent,Own Business.",
                "I_IMD_DESC": 9
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance,RTO Agent,Student,Automobile Sector,Fresher In Insurance,Own Business,Any Other Job.",
                "I_IMD_DESC": 48
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Composite License,Life Insurance,Health Insurance.",
                "I_IMD_DESC": 128
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Fresher In Insurance,Any Other Job.",
                "I_IMD_DESC": 3
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Fresher In Insurance,Own Business.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Fresher In Insurance.",
                "I_IMD_DESC": 35
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Health Insurance,Any Other Job.",
                "I_IMD_DESC": 20
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Health Insurance,RTO Agent.",
                "I_IMD_DESC": 11
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Health Insurance.",
                "I_IMD_DESC": 22
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,Fresher In Insurance.",
                "I_IMD_DESC": 16
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,Own Business,Any Other Job.",
                "I_IMD_DESC": 23
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,Own Business.",
                "I_IMD_DESC": 32
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,RTO Agent,Own Business.",
                "I_IMD_DESC": 1
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,RTO Agent.",
                "I_IMD_DESC": 21
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance,Student.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Health Insurance.",
                "I_IMD_DESC": 384
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Own Business.",
                "I_IMD_DESC": 64
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance,Student,Own Business.",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Life Insurance.",
                "I_IMD_DESC": 188
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Own Business.",
                "I_IMD_DESC": 31
              },
              {
                "AGENT_BACKGROUND": "General Insurance,RTO Agent,Automobile Sector,Own Business.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,RTO Agent,Automobile Sector.",
                "I_IMD_DESC": 6
              },
              {
                "AGENT_BACKGROUND": "General Insurance,RTO Agent,Fresher In Insurance,Own Business.",
                "I_IMD_DESC": 53
              },
              {
                "AGENT_BACKGROUND": "General Insurance,RTO Agent.",
                "I_IMD_DESC": 72
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Student,Fresher In Insurance.",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Student,Health Insurance,RTO Agent,Composite License,Fresher In Insurance.Life Insurance,",
                "I_IMD_DESC": 7
              },
              {
                "AGENT_BACKGROUND": "General Insurance,Student.",
                "I_IMD_DESC": 12
              },
              {
                "AGENT_BACKGROUND": "General Insurance.",
                "I_IMD_DESC": 2490
              },
              {
                "AGENT_BACKGROUND": "Health Insurance Agent",
                "I_IMD_DESC": 5247
              },
              {
                "AGENT_BACKGROUND": "Health Insurance,Own Business.",
                "I_IMD_DESC": 39
              },
              {
                "AGENT_BACKGROUND": "Health Insurance.",
                "I_IMD_DESC": 99
              },
              {
                "AGENT_BACKGROUND": "Health Insurance.General Insurance,",
                "I_IMD_DESC": 50
              },
              {
                "AGENT_BACKGROUND": "House Wife",
                "I_IMD_DESC": 4091
              },
              {
                "AGENT_BACKGROUND": "Life Insurance",
                "I_IMD_DESC": 3558
              },
              {
                "AGENT_BACKGROUND": "Life Insurance Agent",
                "I_IMD_DESC": 9904
              },
              {
                "AGENT_BACKGROUND": "Life Insurance,General Insurance,Health Insurance.",
                "I_IMD_DESC": 11
              },
              {
                "AGENT_BACKGROUND": "Life Insurance,Health Insurance.",
                "I_IMD_DESC": 69
              },
              {
                "AGENT_BACKGROUND": "Life Insurance,Own Business.",
                "I_IMD_DESC": 51
              },
              {
                "AGENT_BACKGROUND": "Life Insurance.",
                "I_IMD_DESC": 338
              },
              {
                "AGENT_BACKGROUND": "Life Insurance.General Insurance,",
                "I_IMD_DESC": 22
              },
              {
                "AGENT_BACKGROUND": "Medical Representative",
                "I_IMD_DESC": 38
              },
              {
                "AGENT_BACKGROUND": "Multi-Level Marketer",
                "I_IMD_DESC": 2830
              },
              {
                "AGENT_BACKGROUND": "Mutual Fund Agent",
                "I_IMD_DESC": 63414
              },
              {
                "AGENT_BACKGROUND": "Other",
                "I_IMD_DESC": 16814
              },
              {
                "AGENT_BACKGROUND": "Others",
                "I_IMD_DESC": 15102
              },
              {
                "AGENT_BACKGROUND": "Own Business,Any Other Job.",
                "I_IMD_DESC": 6
              },
              {
                "AGENT_BACKGROUND": "Own Business.",
                "I_IMD_DESC": 513
              },
              {
                "AGENT_BACKGROUND": "Own Business.Fresher In Insurance,",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "Post Office Agent",
                "I_IMD_DESC": 110
              },
              {
                "AGENT_BACKGROUND": "RTO Agent",
                "I_IMD_DESC": 3727
              },
              {
                "AGENT_BACKGROUND": "RTO Agent,Fresher In Insurance.",
                "I_IMD_DESC": 6
              },
              {
                "AGENT_BACKGROUND": "RTO Agent,Own Business.",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "RTO Agent,Student,Fresher In Insurance,Own Business.",
                "I_IMD_DESC": 8
              },
              {
                "AGENT_BACKGROUND": "RTO Agent.",
                "I_IMD_DESC": 100
              },
              {
                "AGENT_BACKGROUND": "Retired Development Officer",
                "I_IMD_DESC": 11
              },
              {
                "AGENT_BACKGROUND": "Retired Person",
                "I_IMD_DESC": 718
              },
              {
                "AGENT_BACKGROUND": "STAR HEALTH",
                "I_IMD_DESC": 2
              },
              {
                "AGENT_BACKGROUND": "Salaried Employee",
                "I_IMD_DESC": 2796
              },
              {
                "AGENT_BACKGROUND": "Shop Owner",
                "I_IMD_DESC": 3148
              },
              {
                "AGENT_BACKGROUND": "Small&Medium Enterprise Owner",
                "I_IMD_DESC": 1178
              },
              {
                "AGENT_BACKGROUND": "Standalone Health Insurance",
                "I_IMD_DESC": 599
              },
              {
                "AGENT_BACKGROUND": "Student",
                "I_IMD_DESC": 1402
              },
              {
                "AGENT_BACKGROUND": "Student,Any Other Job.",
                "I_IMD_DESC": 4
              },
              {
                "AGENT_BACKGROUND": "Student,Fresher In Insurance,Own Business.",
                "I_IMD_DESC": 17
              },
              {
                "AGENT_BACKGROUND": "Student,Fresher In Insurance.",
                "I_IMD_DESC": 25
              },
              {
                "AGENT_BACKGROUND": "Student,Own Business.",
                "I_IMD_DESC": 7
              },
              {
                "AGENT_BACKGROUND": "Student.",
                "I_IMD_DESC": 282
              },
              {
                "AGENT_BACKGROUND": "Teacher/Professor",
                "I_IMD_DESC": 411
              },
              {
                "AGENT_BACKGROUND": "Travel Agent",
                "I_IMD_DESC": 908
              },
              {
                "AGENT_BACKGROUND": "Used Car Dealer",
                "I_IMD_DESC": 1127
              }
            ],
            "level_data": [
              "0",
              "2 Wheeler Dealer",
              "Any Other Job.",
              "Automobile Sector,Any Other Job.",
              "Automobile Sector,Fresher In Insurance.",
              "Automobile Sector.",
              "BUISNESS",
              "Businessman",
              "Chartered Accountant",
              "Composite Agent",
              "Composite License,Life Insurance.",
              "Composite License.",
              "Direct Selling Agent",
              "Fresher In Insurance,Any Other Job.",
              "Fresher In Insurance,Own Business,Any Other Job.",
              "Fresher In Insurance,Own Business.",
              "Fresher In Insurance.",
              "Fresher In Insurance.RTO Agent,",
              "Fresher in Insurance",
              "General Insurance",
              "General Insurance Agent (PSU)",
              "General Insurance Agent(Private)",
              "General Insurance,Any Other Job.",
              "General Insurance,Automobile Sector,Own Business.",
              "General Insurance,Automobile Sector.",
              "General Insurance,Composite License,Health Insurance.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,Automobile Sector,Fresher In Insurance,Own Business,Any Other Job.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,Automobile Sector,Own Business.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,Fresher In Insurance,Own Business,Any Other Job.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,Fresher In Insurance.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,Own Business.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,RTO Agent,Own Business.",
              "General Insurance,Composite License,Life Insurance,Health Insurance,RTO Agent,Student,Automobile Sector,Fresher In Insurance,Own Business,Any Other Job.",
              "General Insurance,Composite License,Life Insurance,Health Insurance.",
              "General Insurance,Fresher In Insurance,Any Other Job.",
              "General Insurance,Fresher In Insurance,Own Business.",
              "General Insurance,Fresher In Insurance.",
              "General Insurance,Health Insurance,Any Other Job.",
              "General Insurance,Health Insurance,RTO Agent.",
              "General Insurance,Health Insurance.",
              "General Insurance,Life Insurance,Health Insurance,Fresher In Insurance.",
              "General Insurance,Life Insurance,Health Insurance,Own Business,Any Other Job.",
              "General Insurance,Life Insurance,Health Insurance,Own Business.",
              "General Insurance,Life Insurance,Health Insurance,RTO Agent,Own Business.",
              "General Insurance,Life Insurance,Health Insurance,RTO Agent.",
              "General Insurance,Life Insurance,Health Insurance,Student.",
              "General Insurance,Life Insurance,Health Insurance.",
              "General Insurance,Life Insurance,Own Business.",
              "General Insurance,Life Insurance,Student,Own Business.",
              "General Insurance,Life Insurance.",
              "General Insurance,Own Business.",
              "General Insurance,RTO Agent,Automobile Sector,Own Business.",
              "General Insurance,RTO Agent,Automobile Sector.",
              "General Insurance,RTO Agent,Fresher In Insurance,Own Business.",
              "General Insurance,RTO Agent.",
              "General Insurance,Student,Fresher In Insurance.",
              "General Insurance,Student,Health Insurance,RTO Agent,Composite License,Fresher In Insurance.Life Insurance,",
              "General Insurance,Student.",
              "General Insurance.",
              "Health Insurance Agent",
              "Health Insurance,Own Business.",
              "Health Insurance.",
              "Health Insurance.General Insurance,",
              "House Wife",
              "Life Insurance",
              "Life Insurance Agent",
              "Life Insurance,General Insurance,Health Insurance.",
              "Life Insurance,Health Insurance.",
              "Life Insurance,Own Business.",
              "Life Insurance.",
              "Life Insurance.General Insurance,",
              "Medical Representative",
              "Multi-Level Marketer",
              "Mutual Fund Agent",
              "Other",
              "Others",
              "Own Business,Any Other Job.",
              "Own Business.",
              "Own Business.Fresher In Insurance,",
              "Post Office Agent",
              "RTO Agent",
              "RTO Agent,Fresher In Insurance.",
              "RTO Agent,Own Business.",
              "RTO Agent,Student,Fresher In Insurance,Own Business.",
              "RTO Agent.",
              "Retired Development Officer",
              "Retired Person",
              "STAR HEALTH",
              "Salaried Employee",
              "Shop Owner",
              "Small&Medium Enterprise Owner",
              "Standalone Health Insurance",
              "Student",
              "Student,Any Other Job.",
              "Student,Fresher In Insurance,Own Business.",
              "Student,Fresher In Insurance.",
              "Student,Own Business.",
              "Student.",
              "Teacher/Professor",
              "Travel Agent",
              "Used Car Dealer"
            ]
          }
        ],
        "lob_wise_banding_count": [
          {
            "bandingData": [
              {
                "Acc_Lob": "-",
                "Banding_2024_10": 1
              },
              {
                "Acc_Lob": "ENGINEERING",
                "Banding_2024_10": 936
              },
              {
                "Acc_Lob": "GROUP HEALTH",
                "Banding_2024_10": 1109
              },
              {
                "Acc_Lob": "HEALTH",
                "Banding_2024_10": 2
              },
              {
                "Acc_Lob": "HOME INSURANCE",
                "Banding_2024_10": 4469
              },
              {
                "Acc_Lob": "LIABILITY",
                "Banding_2024_10": 1508
              },
              {
                "Acc_Lob": "MARINE",
                "Banding_2024_10": 5312
              },
              {
                "Acc_Lob": "MARINE HULL",
                "Banding_2024_10": 3
              },
              {
                "Acc_Lob": "MISC",
                "Banding_2024_10": 344
              },
              {
                "Acc_Lob": "MOTOR 2W",
                "Banding_2024_10": 79911
              },
              {
                "Acc_Lob": "MOTOR 4W",
                "Banding_2024_10": 56027
              },
              {
                "Acc_Lob": "MOTOR CV",
                "Banding_2024_10": 21704
              },
              {
                "Acc_Lob": "MOTOR EW",
                "Banding_2024_10": 37
              },
              {
                "Acc_Lob": "MOTOR OTHER",
                "Banding_2024_10": 3098
              },
              {
                "Acc_Lob": "NON MOTOR EW",
                "Banding_2024_10": 20
              },
              {
                "Acc_Lob": "PERSONAL ACCIDENT",
                "Banding_2024_10": 10848
              },
              {
                "Acc_Lob": "PROPERTY",
                "Banding_2024_10": 6624
              },
              {
                "Acc_Lob": "PROPERTY - MISC",
                "Banding_2024_10": 7433
              },
              {
                "Acc_Lob": "RETAIL HEALTH",
                "Banding_2024_10": 46848
              },
              {
                "Acc_Lob": "RETAIL HEALTH - OTHER",
                "Banding_2024_10": 23
              },
              {
                "Acc_Lob": "RURAL",
                "Banding_2024_10": 75
              },
              {
                "Acc_Lob": "SURETY BOND INSURANCE",
                "Banding_2024_10": 39
              },
              {
                "Acc_Lob": "TRAVEL",
                "Banding_2024_10": 5895
              },
              {
                "Acc_Lob": "WORKMEN COMPENSATION",
                "Banding_2024_10": 4145
              }
            ],
            "level_data": [
              "-",
              "ENGINEERING",
              "GROUP HEALTH",
              "HEALTH",
              "HOME INSURANCE",
              "LIABILITY",
              "MARINE",
              "MARINE HULL",
              "MISC",
              "MOTOR 2W",
              "MOTOR 4W",
              "MOTOR CV",
              "MOTOR EW",
              "MOTOR OTHER",
              "NON MOTOR EW",
              "PERSONAL ACCIDENT",
              "PROPERTY",
              "PROPERTY - MISC",
              "RETAIL HEALTH",
              "RETAIL HEALTH - OTHER",
              "RURAL",
              "SURETY BOND INSURANCE",
              "TRAVEL",
              "WORKMEN COMPENSATION"
            ]
          }
        ],
        "state_wise_gwp_count": [
          {
            "STATE": "ANDAMAN AND NICOBAR ISLANDS",
            "imdCount": 70,
            "mapStatename": "andaman and nicobar islands",
            "totalGwp": "0.09"
          },
          {
            "STATE": "ANDHRA PRADESH",
            "imdCount": 3208,
            "mapStatename": "andhra pradesh",
            "totalGwp": "4.57"
          },
          {
            "STATE": "ASSAM",
            "imdCount": 4319,
            "mapStatename": "assam",
            "totalGwp": "2.5"
          },
          {
            "STATE": "BIHAR",
            "imdCount": 7463,
            "mapStatename": "bihar",
            "totalGwp": "2.9"
          },
          {
            "STATE": "CHANDIGARH",
            "imdCount": 2755,
            "mapStatename": "chandigarh",
            "totalGwp": "2.14"
          },
          {
            "STATE": "CHATTISGARH",
            "imdCount": 2927,
            "mapStatename": "chattisgarh",
            "totalGwp": "2.54"
          },
          {
            "STATE": "DELHI",
            "imdCount": 15889,
            "mapStatename": "delhi",
            "totalGwp": "19.43"
          },
          {
            "STATE": "GOA",
            "imdCount": 10094,
            "mapStatename": "goa",
            "totalGwp": "5.91"
          },
          {
            "STATE": "GUJARAT",
            "imdCount": 51699,
            "mapStatename": "gujarat",
            "totalGwp": "76.93"
          },
          {
            "STATE": "HARYANA",
            "imdCount": 3075,
            "mapStatename": "haryana",
            "totalGwp": "5.87"
          },
          {
            "STATE": "HIMACHAL PRADESH",
            "imdCount": 21,
            "mapStatename": "himachal pradesh",
            "totalGwp": "0.0"
          },
          {
            "STATE": "JAMMU AND KASHMIR",
            "imdCount": 277,
            "mapStatename": "jammu and kashmir",
            "totalGwp": "0.73"
          },
          {
            "STATE": "JHARKHAND",
            "imdCount": 3138,
            "mapStatename": "jharkhand",
            "totalGwp": "2.92"
          },
          {
            "STATE": "KARNATAKA",
            "imdCount": 10738,
            "mapStatename": "karnataka",
            "totalGwp": "6.01"
          },
          {
            "STATE": "KERALA",
            "imdCount": 918,
            "mapStatename": "kerala",
            "totalGwp": "0.39"
          },
          {
            "STATE": "MADHYA PRADESH",
            "imdCount": 7546,
            "mapStatename": "madhya pradesh",
            "totalGwp": "6.42"
          },
          {
            "STATE": "MAHARASHTRA",
            "imdCount": 69116,
            "mapStatename": "maharashtra",
            "totalGwp": "92.7"
          },
          {
            "STATE": "MEGHALAYA",
            "imdCount": 3,
            "mapStatename": "meghalaya",
            "totalGwp": "0.0"
          },
          {
            "STATE": "MIZORAM",
            "imdCount": 17,
            "mapStatename": "mizoram",
            "totalGwp": "0.01"
          },
          {
            "STATE": "ODISHA",
            "imdCount": 1024,
            "mapStatename": "odisha",
            "totalGwp": "0.42"
          },
          {
            "STATE": "ORISSA",
            "imdCount": 5,
            "mapStatename": "orissa",
            "totalGwp": "0.0"
          },
          {
            "STATE": "Orissa",
            "imdCount": 42,
            "mapStatename": "orissa",
            "totalGwp": "0.01"
          },
          {
            "STATE": "PONDICHERRY",
            "imdCount": 55,
            "mapStatename": "pondicherry",
            "totalGwp": "0.04"
          },
          {
            "STATE": "PUNJAB",
            "imdCount": 3827,
            "mapStatename": "punjab",
            "totalGwp": "1.49"
          },
          {
            "STATE": "RAJASTHAN",
            "imdCount": 4833,
            "mapStatename": "rajasthan",
            "totalGwp": "6.56"
          },
          {
            "STATE": "TAMIL NADU",
            "imdCount": 6743,
            "mapStatename": "tamil nadu",
            "totalGwp": "8.34"
          },
          {
            "STATE": "TELANGANA",
            "imdCount": 8311,
            "mapStatename": "telangana",
            "totalGwp": "37.11"
          },
          {
            "STATE": "TRIPURA",
            "imdCount": 73,
            "mapStatename": "tripura",
            "totalGwp": "0.06"
          },
          {
            "STATE": "UTTAR PRADESH",
            "imdCount": 13520,
            "mapStatename": "uttar pradesh",
            "totalGwp": "11.08"
          },
          {
            "STATE": "UTTARAKHAND",
            "imdCount": 1860,
            "mapStatename": "uttarakhand",
            "totalGwp": "0.78"
          },
          {
            "STATE": "WEST BENGAL",
            "imdCount": 22845,
            "mapStatename": "west bengal",
            "totalGwp": "11.59"
          }
        ],
        "state_wise_lob_count": {
          "imdData": {
            "IMD_COUNT": [
              1,
              936,
              1109,
              2,
              4469,
              1508,
              5312,
              3,
              344,
              79911,
              56027,
              21704,
              37,
              3098,
              20,
              10848,
              6624,
              7433,
              46848,
              23,
              75,
              39,
              5895,
              4145
            ]
          },
          "level_data": [
            "-",
            "ENGINEERING",
            "GROUP HEALTH",
            "HEALTH",
            "HOME INSURANCE",
            "LIABILITY",
            "MARINE",
            "MARINE HULL",
            "MISC",
            "MOTOR 2W",
            "MOTOR 4W",
            "MOTOR CV",
            "MOTOR EW",
            "MOTOR OTHER",
            "NON MOTOR EW",
            "PERSONAL ACCIDENT",
            "PROPERTY",
            "PROPERTY - MISC",
            "RETAIL HEALTH",
            "RETAIL HEALTH - OTHER",
            "RURAL",
            "SURETY BOND INSURANCE",
            "TRAVEL",
            "WORKMEN COMPENSATION"
          ]
        },
        "status": 1,
        "success": true,
        "zone_wise_banding_bar": [
          {
            "bandingData": [
              {
                "Banding_2024_10": "-",
                "I_IMD_DESC": 28151,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "A",
                "I_IMD_DESC": 188,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "A+",
                "I_IMD_DESC": 86,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "B",
                "I_IMD_DESC": 388,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "C",
                "I_IMD_DESC": 897,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "D",
                "I_IMD_DESC": 2288,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "E",
                "I_IMD_DESC": 7156,
                "Zone": "EAST"
              },
              {
                "Banding_2024_10": "-",
                "I_IMD_DESC": 1261,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "A",
                "I_IMD_DESC": 11,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "A+",
                "I_IMD_DESC": 10,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "B",
                "I_IMD_DESC": 16,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "C",
                "I_IMD_DESC": 19,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "D",
                "I_IMD_DESC": 67,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "E",
                "I_IMD_DESC": 179,
                "Zone": "HO"
              },
              {
                "Banding_2024_10": "-",
                "I_IMD_DESC": 33720,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "A",
                "I_IMD_DESC": 235,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "A+",
                "I_IMD_DESC": 105,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "B",
                "I_IMD_DESC": 478,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "C",
                "I_IMD_DESC": 1244,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "D",
                "I_IMD_DESC": 2661,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "E",
                "I_IMD_DESC": 7399,
                "Zone": "NORTH"
              },
              {
                "Banding_2024_10": "-",
                "I_IMD_DESC": 22689,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "A",
                "I_IMD_DESC": 118,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "A+",
                "I_IMD_DESC": 57,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "B",
                "I_IMD_DESC": 283,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "C",
                "I_IMD_DESC": 769,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "D",
                "I_IMD_DESC": 1577,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "E",
                "I_IMD_DESC": 4550,
                "Zone": "SOUTH"
              },
              {
                "Banding_2024_10": "-",
                "I_IMD_DESC": 100459,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "A",
                "I_IMD_DESC": 739,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "A+",
                "I_IMD_DESC": 363,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "B",
                "I_IMD_DESC": 1484,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "C",
                "I_IMD_DESC": 4672,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "D",
                "I_IMD_DESC": 9156,
                "Zone": "WEST"
              },
              {
                "Banding_2024_10": "E",
                "I_IMD_DESC": 22936,
                "Zone": "WEST"
              }
            ],
            "zoneList": [
              "EAST",
              "HO",
              "NORTH",
              "SOUTH",
              "WEST"
            ]
          }
        ]
      }


      // for no selected month
      if(this.month_selectedItems.length == 0){
        this.indiaMapStatus = false;
        this.lobContributionStatus = false;
        this.zonewiseBandingStatus = false;
        this.lobwiseBandingStatus = false;

        this.showAsonmonth = false;


        this.month_selectedItems = this.makeSelectedMonthFromZonewiseBrandingGraph_data(res.zone_wise_banding_bar);
        let noSelectionMonth = this.makeSelectedMonthFromZonewiseBrandingGraph_data(res.zone_wise_banding_bar);

        console.log("++++++++++++++++++++++++++++++++++++++++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        this.vintage_wise_band_count(zone, state);

        // this.month_selectedItems = [
        //   {
        //     "monthVal": noSelectionMonth[0].monthVal,

        //   }
        // ]

        console.log("noSelectionMonth--->", noSelectionMonth);
        console.log("type----> ", typeof(noSelectionMonth))


        this.prepareIndiaMap(res.state_wise_gwp_count);
        this.prepareLOB_contribution_piechart(res.state_wise_lob_count);       


        // // checked ok with current data structure -- Previous
        // this.prepare_zonewiseBandingGraph(res.zone_wise_banding_bar,  String(this.convertDateFormat(this.month_selectedItems[0].monthVal)));
        // // issue possible in data 
        // this.prepareLobWiseBranding_columnChart(res.lob_wise_banding_count,  String(this.convertDateFormat(this.month_selectedItems[0].monthVal)));


        // New Code to ensure month passed 
        this.prepare_zonewiseBandingGraph(res.zone_wise_banding_bar,  String(this.convertDateFormat(noSelectionMonth[0].monthVal)));
        this.prepareLobWiseBranding_columnChart(res.lob_wise_banding_count,  String(this.convertDateFormat(noSelectionMonth[0].monthVal)));


        this.prepareBackgroundWiseAgentCount_columnChart(res.agent_background_count[0].level_data, res.agent_background_count[0].imdData)



        




      }

      else{
        this.prepareIndiaMap(res.state_wise_gwp_count);
        this.prepareLOB_contribution_piechart(res.state_wise_lob_count);
        this.showAsonmonth = true;

        console.log("++++++++++++++++++++++++++++++++++++++++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      this.vintage_wise_band_count(zone, state);
        


        // checked ok with current data structure
        this.prepare_zonewiseBandingGraph(res.zone_wise_banding_bar,  String(this.convertDateFormat(this.month_selectedItems[0].monthVal)));

        // issue possible in data 
        this.prepareLobWiseBranding_columnChart(res.lob_wise_banding_count,  String(this.convertDateFormat(this.month_selectedItems[0].monthVal)))

        this.prepareBackgroundWiseAgentCount_columnChart(res.agent_background_count[0].level_data, res.agent_background_count[0].imdData)
      }

      
      




      console.log("---",  String(this.convertDateFormat(this.month_selectedItems[0].monthVal)))



      

    } else {
    }
  });

}


// makeSelectedMonthFromZonewiseBrandingGraph_data(data:any){
//   if (!data.zone_wise_banding_bar || data.zone_wise_banding_bar.length === 0) {
//     return [];
//   }

//   // Extract a sample banding entry to get the month key
//   let sampleEntry = data.zone_wise_banding_bar[0].bandingData[0];

//   // Find the key that starts with 'Banding_'
//   let monthKey = Object.keys(sampleEntry).find(key => key.startsWith("Banding_"));

//   if (!monthKey) return [];

//   // Extract month and year from key using regex
//   let match = monthKey.match(/Banding_(\d{4})_(\d{2})/);

//   if (!match) return [];

//   let year = match[1];
//   let month = match[2];

//   // Format the output
//   return [{
//     monthName: new Date(parseInt(year), parseInt(month) - 1)
//       .toLocaleString('en-US', { month: 'short' }).toUpperCase() + ` ${year}`,
//     monthVal: `${month}-${year}`
//   }];
// }



// makeSelectedMonthFromZonewiseBrandingGraph_data(data: any[]): { monthVal: string; monthName: string }[] {

//   console.log("incoming_data -->> ", data)
//   if (!data || data.length === 0 || !data[0].bandingData) return [];

//   const firstEntry = data[0].bandingData.find((entry: any) => entry["2024-12_BAND"] !== undefined);
//   if (!firstEntry) return [];

//   const key = Object.keys(firstEntry).find(k => k.includes("_BAND"));
//   if (!key) return [];

//   const [year, month] = key.split("-");
//   const monthMap: { [key: string]: string } = {
//     "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06": "JUN",
//     "07": "JUL", "08": "AUG", "09": "SEP", "10": "OCT", "11": "NOV", "12": "DEC"
//   };

//   return [{ monthVal: `${month}-${year}`, monthName: `${monthMap[month]} ${year}` }];
// }

makeSelectedMonthFromZonewiseBrandingGraph_data(data:any[]){
  let step1 = Object.keys(data[0].bandingData[0])[0]
  console.log("keys-----> ", step1)

  return this.extractMonth(step1)
}

extractMonth(key: string): { monthVal: string; monthName: string }[] {
  // if (!key.includes("_BAND")) return [];

  // const [year, month] = key.split("-");

  // const monthMap: { [key: string]: string } = {
  //   "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06": "JUN",
  //   "07": "JUL", "08": "AUG", "09": "SEP", "10": "OCT", "11": "NOV", "12": "DEC"
  // };

  // return [{ monthVal: `${month}-${year}`, monthName: `${monthMap[month]} ${year}` }];



  // if (!key.includes("_BAND")) return [];

  // const [year, month] = key.split("-");

  // const monthMap: { [key: string]: string } = {
  //   "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06": "JUN",
  //   "07": "JUL", "08": "AUG", "09": "SEP", "10": "OCT", "11": "NOV", "12": "DEC"
  // };

  // const numericMonth = parseInt(month, 10).toString(); // Convert to numeric format

  // return [{ monthVal: `${numericMonth}-${year}`, monthName: `${monthMap[month]} ${year}` }];


  if (!key.includes("_BAND")) return [];

  const parts = key.split("-");
  if (parts.length < 2) return [];

  const year = parts[0];
  const month = parts[1].replace("_BAND", "");

  const monthMap: { [key: string]: string } = {
    "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MAY", "06": "JUN",
    "07": "JUL", "08": "AUG", "09": "SEP", "10": "OCT", "11": "NOV", "12": "DEC"
  };

  const numericMonth = parseInt(month, 10).toString(); // Convert to numeric format
  const monthName = monthMap[month] || "UNKNOWN"; // Handle undefined cases

  return [{ monthVal: `${numericMonth}-${year}`, monthName: `${monthName} ${year}` }];

  
}

// Example usage:
// console.log(extractMonth("2025-01_BAND"));
// Output: [{ monthVal: "01-2025", monthName: "JAN 2025" }]


// // Example usage:
// const inputData = [
//   {
//     bandingData: [
//       { "2024-12_BAND": "A", I_IMD_DESC: 218, Zone: "EAST" }
//     ],
//     zoneList: ["EAST", "HO", "NORTH", "SOUTH", "WEST"]
//   }
// ];



prepareIndiaMap(response: any){
  let indiaMap = [] as any
  // console.log('length..........>>>>',response.length)


      this.indiaMap_apidata = response

      let min = this.findMinMaxGwp(this.indiaMap_apidata)
      // console.log('length..........>>>>',min)


      try {
        for(let r of response){
          // let singleStateData = [r.mapStatename, r.totalGwp, r.imdCount ];

          if(r.mapStatename == 'chattisgarh'){
            r.mapStatename = 'chhattisgarh'
          }

          let singleStateData = [r.mapStatename, r.imdCount, r.totalGwp, r.imdCount ];
          indiaMap.push(singleStateData) // indiaMap is the list to store data of every 
        }

      }catch(error){
        console.log("some error in state data")
      }finally{
        console.log("india Map--->", indiaMap)
        this.renderMapChart(indiaMap)
        // this.zoneWiseBranding()
        // this.insights_api_new
      }
}





















// year_month = this.convertDateFormat(this.month_selectedItems[0].monthVal)

convertDateFormat(dateStr: any):any {
  // Split the input string by the dash "-"
  try{

    const [month, year] = dateStr.split("-");
    
    // Return the date in YYYY_MM format
    return `${year}_${month}`;
  }catch(err:any){
    console.log(err);
    return ""
  }
}


getStatewiseGwp(){

  var indiaMap = [] as any

  const dataValue = {
    // stateName: 'MH',

    user_agent_id: this.userAgentId,
    selected_channel: this.imdChannel_selectedItems,
    selected_subchannel: this.subChannelCodeName_selectedItems,
    selected_zone: this.zone_selectedItems,
    selected_state: this.state_selectedItems,
    selected_location: this.location_selectedItems,
    monthYear: this.month_selectedItems,
    year_month: this.convertDateFormat(this.month_selectedItems[0].monthVal),

  } as any;

  this.rest.getStatewiseGwp(dataValue).subscribe((res: any) => {
    if (res.success) {
      // console.log("iiii" , res.result)
      console.log('length..........>>>>',res.result.length)
      this.indiaMap_apidata = res.result

      let min = this.findMinMaxGwp(this.indiaMap_apidata)
      console.log('length..........>>>>',min)


      try {
        for(let r of res.result){
          // let singleStateData = [r.mapStatename, r.totalGwp, r.imdCount ];

          let singleStateData = [r.mapStatename, r.imdCount, r.totalGwp, r.imdCount ];
          indiaMap.push(singleStateData) // indiaMap is the list to store data of every 
        }

      }catch(error){
        console.log("some error in state data")
      }finally{
        console.log("india Map--->", indiaMap)
        this.renderMapChart(indiaMap)
        // this.zoneWiseBranding()
      }

      // for(let r of res.result){

      //   let singleStateData = [r.mapStatename, r.totalGwp, r.imdCount ];
      //   indiaMap.push(singleStateData)

        




      //   console.log("r.mapStatename--->",r.mapStatename)


      //   // try {// Code you want to try (might throw an error)

      //   //   if(r.mapStatename == 'madhya pradesh'){
      //   //     this.madhyaPradesh = r
      //   //     let stateData = ['madhya pradesh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
  
      //   //   }
  
      //   //   if(r.mapStatename == 'uttar pradesh'){
      //   //     this.uttarPradesh = r
      //   //     let stateData = ['uttar pradesh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'karnataka'){
      //   //     this.karnataka = r
      //   //     let stateData = ['karnataka', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'nagaland'){
      //   //     this.nagaland = r
      //   //     let stateData = ['nagaland', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'bihar'){
      //   //     this.bihar = r
      //   //     let stateData = ['bihar', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'lakshadweep'){
      //   //     this.lakshadweep = r
      //   //     let stateData = ['lakshadweep', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'andaman and nicobar'){
      //   //     this.andaman = r
      //   //     let stateData = ['andaman and nicobar', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'assam'){
      //   //     this.assam = r
      //   //     let stateData = ['assam', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
  
      //   //   if(r.mapStatename == 'west bengal'){
      //   //     this.westbengal = r
      //   //     let stateData = ['west bengal', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'puducherry'){
      //   //     this.puduchery = r
      //   //     let stateData = ['puducherry', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'daman and diu'){
      //   //     this.damananddiu = r
      //   //     let stateData = ['daman and diu', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'gujarat'){
      //   //     this.gujarat = r
      //   //     let stateData = ['gujarat', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'rajasthan'){
      //   //     this.rajasthan = r
      //   //     let stateData = ['rajasthan', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'dadara and nagar havelli'){
      //   //     this.dadranagar = r
      //   //     let stateData = ['dadara and nagar havelli', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //   if(r.mapStatename == 'chhattisgarh'){
      //   //     this.chattrishgar = r
      //   //     let stateData = ['chhattisgarh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'tamil nadu'){
      //   //     this.tamilnadu = r
      //   //     let stateData = ['tamil nadu', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'chandigarh'){
      //   //     this.chandigar = r
      //   //     let stateData = ['chandigarh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'punjab'){
      //   //     this.punjab = r
      //   //     let stateData = ['punjab', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'haryana'){
      //   //     this.hariyana = r
      //   //     let stateData = ['haryana', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'andhra pradesh'){
      //   //     this.andhrapradesh = r
      //   //     let stateData = ['andhra pradesh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'maharashtra'){
      //   //     this.maharashtra = r
      //   //     let stateData = ['maharashtra', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'himachal pradesh'){
      //   //     this.himachal = r
      //   //     let stateData = ['himachal pradesh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'meghalaya'){
      //   //     this.meghalaya = r
      //   //     let stateData = ['meghalaya', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'kerala'){
      //   //     this.kerala = r
      //   //     let stateData = ['kerala', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'telangana'){
      //   //     this.telenghana = r
      //   //     let stateData = ['telangana', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'mizoram'){
      //   //     this.mizoram = r
      //   //     let stateData = ['mizoram', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'tripura'){
      //   //     this.tripura = r
      //   //     let stateData = ['tripura', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'manipur'){
      //   //     this.manipur = r
      //   //     let stateData = ['manipur', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'arunanchal pradesh'){
      //   //     this.arunachal = r
      //   //     let stateData = ['arunanchal pradesh', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'jharkhand'){
      //   //     this.jharkhand = r
      //   //     let stateData = ['jharkhand', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'goa'){
      //   //     this.goa = r
      //   //     let stateData = ['goa', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'nct of delhi'){
      //   //     this.delhi = r
      //   //     let stateData = ['nct of delhi', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'odisha'){
      //   //     this.orisa = r
      //   //     let stateData = ['odisha', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'jammu and kashmir'){
      //   //     this.jk = r
      //   //     let stateData = ['jammu and kashmir', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'sikkim'){
      //   //     this.sikkim = r
      //   //     let stateData = ['sikkim', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }
      //   //    if(r.mapStatename == 'uttarakhand'){
      //   //     this.uttarakhand = r
      //   //     let stateData = ['uttarakhand', r.totalGwp, r.imdCount]
      //   //     indiaMap.push(stateData)
      //   //   }

      //   // } catch (error) {
      //   //   // Code to handle the error (optional)
      //   // } finally {
      //   //   // Code to execute always (optional)
      //   //   const IndiaMapData = indiaMap

      //   //   console.log("IndiaMapData", IndiaMapData)
      //   //   this.renderMapChart(IndiaMapData) 
      //   // }
        
        


        




        


      // }

    } else {
    }
  });

}



// for india map
renderMapChart(x: any) {




  console.log("renderMapChart----->", x)
  const topology = this.topology

  const data = x

  // console.log(data)

  // const data = []

  if (this.indiaMap) {
    // this.indiaMap.clear();
    this.indiaMap.destroy();
  }
  

  this.indiaMap = Highcharts.mapChart('indiaMap', {
    chart: {
      map: topology,
      // Edit chart spacing
      // spacingBottom: 15,
      // spacingTop: 10,
      // spacingLeft: 10,
      // spacingRight: 10,

      // Explicitly tell the width and height of a chart
      // width: null,
      // height: 600,

      // events: {
      //   click: function(e) {
      //     console.log("click")
      //     console.log("e-------->", e)
      //   }
      // }
      
    },

    credits: {
      enabled: false,
    },

    title: {
      text: 'Statewise Agent Count and GWP (in Cr)',
      style: {
        fontSize: "18px",
      }
      
    },

    subtitle: {
      text: '',
      
      // text: 'Source map: India with disputed territories'

    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    colorAxis: {
      visible: false,
      // min: 0,
      // max: 100,

      stops: [
        // [0, '#36d0ff'], // low values
        // [0.5, '#0a5491'], //  medium values
        // [1, '#002d70']  //  high values


        // previusly used
        // [0, '#ff5d52'], //  low values
        // [.25, '#ff8d36'],  
        // [.50, '#ffe100'], 
        // [.75, '#b7ff00'], 
        // [1, '#039900']  //  high values

        // [0, "#c02942"],
        // [0.05, "#d3364a"],
        // [0.1, "#e64352"],
        // [0.15, "#f9505a"],
        // [0.2, "#ff5d5e"],
        // [0.25, "#ceff00"],
        // [0.3, "#a2e200"],
        // [0.5, "#75d400"],
        // [0.7, "#48c600"],
        // [0.9, "#1abb00"],
        // [1, "#009e00"]



        // [0, '#7a0202'],
        // [.05, '#b0133b'],
        // [.10, '#d93d64'],
        // [.15, '#ff6459'],
        // [.20, '#fc7951'],
        // [.25, '#fcb251'],
        // [.30, '#fcd33d'],
        // [.35, '#edfc3d'],  
        // [.40, '#befc51'],
        // [.45, '#31e861'],
        // [.50, '#13d446'],
        // [.75, '#1aab40'],
        // [1, '#005c18']




        // [0, '#610139'],
        // [.05, '#b30269'],
        // [.10, '#e81a92'],
        // [.15, '#fc79c6'],
        // [.20, '#d58bfc'],
        // [.25, '#a94bdb'],
        // [.30, '#8c0ad1'],
        // [.35, '#8c0ad1'],
        // [.40, '#8c0ad1'],
        // [.45, '#8c0ad1'],
        // [.50, '#0fd118'],
        // [.75, '#1aab40'],
        // [1, '#005c18']


        [0, '#b03735'],
        [.05, '#db5856'],
        [.10, '#e97e7e'],
        [.15, '#e89daf'],
        [.20, '#f2dacb'],
        [.25, '#FFF081'],
        [.30, '#D0FD7F'],
        [.35, '#8EFA99'],
        [.40, '#68FCBF'],
        [.45, '#18DB8A'],
        [.50, '#0AC2AD'],
        [.75, '#069988'],
        [1, '#069988']


      ]
      
    },
    tooltip: {
      formatter: function() {
        let index = this.point.index;
        let state = this.point.name;
        let gwp = data[index][2] 
        let imdCount = data[index][1]

        function indianNumberFormat(number:any){
          if (isNaN(number)) {
            throw new Error("Invalid number input");
          }
        
          const numberStr = number.toString();
          if (numberStr.indexOf(".") !== numberStr.lastIndexOf(".")) {
            throw new Error("Only one decimal point allowed.");
          }
        
          let parts = numberStr.split(".");
          const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

          return integerPart + decimalPart;
        }

        let showGpw = indianNumberFormat(Math.round((gwp)*100)/100)
        let showIMDcount =indianNumberFormat(imdCount)

        


        // return `<b>${state}</b><br/>
        //         <b>GWP: ${gwp}</b><br/>`;
        return `<div style=" color: #2b2b2b; text-align: left; padding: 5px;">
                <span style="color: #003866;"> <b>State Name: </b> </span> <span>${state}</span><br>

                <span style="font-weight: 500;"> Total GWP : </span> <span>${showGpw} Cr ₹</span> <br>

                <span style="font-weight: 500;"> Agent Count: </span> <span>${showIMDcount}</span></div>`
      }
        
    },
    series:[
      {
        type: "map",
        
        data: data,
        name: 'Random data',

        states: {
          hover: {
            // color: '#BADA55',
            color: "#87d2ed"
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        point: {
          events: {

            click: this.setStateName.bind(this)
            // click: function(event) {
              
            //   // This function will be executed when a point is clicked
            //   const clickedState = this.name; // Access the state name of the clicked point
            //   const clickedStateValue = this.options.value; // data assigned for the states
            //   console.log('option', this.options)
            //   // const ob = this.getLabelConfig()
            //   // const a = this.options.value
            //   console.log("clickedStateValue:", clickedStateValue);
  
            //   // Perform actions based on the clicked state
            //   console.log("Clicked state:", clickedState);
            //   // You can replace this with your desired actions (e.g., display information, navigate to a different view)

              

            // },
            
          }
        }
      }
    ],

    
  });

  this.visibleContentById('indiaMap')
}



setStateName(event: any){
  this.pieChartFor = 'state'
  this.brandingPiechart_status = true

    // this.state_in_indiamap_isClicked = true;
    // this.zone_isClicked = false;
  

     // This function will be executed when a point is clicked
    const clickedState = event.point.name; // Access the state name of the clicked point
    const clickedStateValue = event.point.options.value; // data assigned for the states
    // console.log('option', event.options)
    // const ob = this.getLabelConfig()
    // const a = this.options.value
    console.log("clickedStateValue:", clickedStateValue);

    // Perform actions based on the clicked state
    console.log("Clicked state:", clickedState);
    // You can replace this with your desired actions (e.g., display information, navigate to a different view)


    this.state_branding_pie  = clickedState

    this.zone_selectedItems = []
    this.state_selectedItems = [{STATE: clickedState.toUpperCase()}]

    // this.getBandingPie('', this.state_branding_pie)
    this.getBandingPie_hc('', this.state_branding_pie)

    // this.getStateWiseLOBDistPie('', clickedState)
    this.insights_api_new('', clickedState)
    // this.vintage_wise_band_count('', clickedState);

    this.lobContribution = "state"


    // this.agentFlagwiseBanding('', clickedState);
    // this.lobWiseBranding_Chart('', clickedState);
    // this.getAgentBackgroundDistBar('', clickedState)



    this.blurContentById('getBandingPie_chart_hc')
    this.blurContentById('getStateWiseLOBDistPie_highchart')
    this.blurContentById('agentFlagwiseBanding')
    this.blurContentById('lob_Wise_Branding_Chart')
    this.blurContentById('getAgentBackgroundDistBar_chart')



}


findMinMaxGwp(data:any) {
  // Initialize variables to store max and min values
  let maxGwp = data[0].totalGwp;
  let minGwp = data[0].totalGwp;

  // Iterate through the data list
  for (const item of data) {
    const currentGwp = item.totalGwp;

    // Update maxGwp if currentGwp is greater
    if (currentGwp > maxGwp) {
      maxGwp = currentGwp;
    }

    // Update minGwp if currentGwp is lower
    if (currentGwp < minGwp) {
      minGwp = currentGwp;
    }
  }

  return {
    maxGwp,
    minGwp
  };
}






// renderMapChart() {
//     const states = [
//       "madhya pradesh", "uttar pradesh", "karnataka", "nagaland", "bihar",
//       "lakshadweep", "andaman and nicobar", "assam", "west bengal", "puducherry",
//       "daman and diu", "gujarat", "rajasthan", "dadara and nagar havelli", "chhattisgarh",
//       "tamil nadu", "chandigarh", "punjab", "haryana", "andhra pradesh", "maharashtra",
//       "himachal pradesh", "meghalaya", "kerala", "telangana", "mizoram", "tripura",
//       "manipur", "arunanchal pradesh", "jharkhand", "goa", "nct of delhi", "odisha",
//       "jammu and kashmir", "sikkim", "uttarakhand"
//     ];

//     const data = states.map(state => {
//       // Generate random data for each state (replace with your desired data source)
//       const value1 = Math.floor(Math.random() * 100) + 1; // Random value between 1 and 100
//       const value2 = Math.floor(Math.random() * 1000) + 1; // Random value between 1 and 1000
//       const value3 = Math.random().toFixed(2); // Random decimal value between 0 and 1 (rounded to 2 decimals)
//       return [state, value1, value2, value3];
//     });

//     console.log(data)

//     this.indiaMap = Highcharts.mapChart('indiaMap', {
//       chart: {
//         map: this.topology,
//         height: 600
//       },
//       title: {
//         text: 'Map of India with Random Data'
//       },
//       subtitle: {
//         text: 'Source map: India with disputed territories'
//       },
//       mapNavigation: {
//         enabled: true
//       },
//       colorAxis: {
//         min: 0
//       },

//       series: [{
//         type: 'map',
//         name: 'Random Data',
//       }]
//     })
//   }





zoneWiseBranding() {
  // this.clearContentById('zoneWiseBranding_Chart')
  // this.brandingPiechart_status==false

  const data = {
    // triggerDate: '2024-02-05',

    user_agent_id: this.userAgentId,
    selected_channel: this.imdChannel_selectedItems,
    selected_subchannel: this.subChannelCodeName_selectedItems,
    selected_zone: this.zone_selectedItems,
    selected_state: this.state_selectedItems,
    selected_location: this.location_selectedItems,
    monthYear: this.month_selectedItems,
  }

  // let bar1manipulate_pix = 

  this.rest.getZoneWiseBandingBar(data).subscribe((res: any) => {
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
            ctx.fillText(datapoint + '', x.getPixelForValue(index)-47, chart.getDatasetMeta(0).data[index].y - 10);
          });
          chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            // ctx.fillText(datapoint , x.getPixelForValue(index), chart.getDatasetMeta(1).data[index].y + 10);
            ctx.fillText(datapoint+ '' , x.getPixelForValue(index)-23, chart.getDatasetMeta(1).data[index].y - 10);
          });
          chart.data.datasets[2].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(2).data[index].y + 10);
            ctx.fillText(datapoint+ '', x.getPixelForValue(index)-0, chart.getDatasetMeta(2).data[index].y - 10);
          });
          chart.data.datasets[3].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
            ctx.fillText(datapoint+ '', x.getPixelForValue(index)+23, chart.getDatasetMeta(3).data[index].y - 10);
          });
          chart.data.datasets[4].data.forEach((datapoint:any, index:any) => {
            // console.log("datapoint>>>",datapoint)
            ctx.font = '500 12px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
            ctx.fillText(datapoint+ '', x.getPixelForValue(index)+47, chart.getDatasetMeta(4).data[index].y - 10);
          });
          // chart.data.datasets[5].data.forEach((datapoint, index) => {
          //   // console.log("datapoint>>>",datapoint)
          //   ctx.font = '500 12px sans-serif';
          //   ctx.fillStyle = 'black';
          //   ctx.textAlign = "center";
          //   // ctx.fillText(datapoint, x.getPixelForValue(index), chart.getDatasetMeta(3).data[index].y + 10);
            // ctx.fillText(datapoint+ '%', x.getPixelForValue(index)+90, chart.getDatasetMeta(5).data[index].y - 10);
          // });
          ctx.rect(0, 0, 1000, 1000);
        }
      };
      if(this.zoneWiseBranding_Chart){
        this.zoneWiseBranding_Chart.clear();
        this.zoneWiseBranding_Chart.destroy();
    }

      




      console.log("zonewose banding bar response---> ", res)

      console.log("zonelist ----> res.zoneList")



      const chartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            // height: '60%', // Adjust as needed
            // spacingTop: 10,
            // spacingBottom: 20,
        },
        title: {
            text: '', // No main title
        },
        xAxis: {
            // categories: ["EAST", "WEST", "NORTH", "SOUTH"], // X-axis labels
            categories: res.zoneList,
            title: {
                text: 'ZONE',
                style: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '13px',
                },
            },
            labels: {
                style: {
                    color: 'black',
                    fontWeight: 'normal',
                },
            },
            gridLineWidth: 0, // Remove grid lines
        },
        yAxis: {
            title: {
                text: 'Agent Count',
                style: {
                    color: 'black',
                    fontWeight: 'bold',
                },
            },
            labels: {
                enabled: false, // Hide labels
            },
            gridLineWidth: 0, // Remove grid lines
        },
        // legend: {
        //     align: 'right',
        //     verticalAlign: 'top',
        //     layout: 'vertical',
        //     title: {
        //         text: 'Bands',
        //         style: {
        //             color: 'black',
        //             fontWeight: 'normal',
        //             fontSize: '13px',
        //         },
        //     },
        //     itemStyle: {
        //         color: 'black',
        //         fontWeight: 'normal',
        //     },
        // },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br>${this.series.name}: ${this.y}`;
            },
        },
        plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                },
                },

                point: {
                  events: {
        
                    click: this.customAPIcall.bind(this)
                    
                  }
                },
            },
        },
        series: [
            {
                name: 'A+',
                data: res.bandingData.Aplus,
                // color: '#0cc078',
                type: 'column',
            },
            {
                name: 'A',
                data: res.bandingData.A,
                // color: '#79de79',
                type: 'column',
            },
            {
                name: 'B',
                data: res.bandingData.B,
                // color: '#ffd366',
                type: 'column',
            },
            {
                name: 'C',
                data: res.bandingData.C,
                // color: '#ff8439',
                type: 'column',
            },
            {
                name: 'D',
                data: res.bandingData.D,
                // color: '#e84258',
                type: 'column',
            },
            {
              name: 'E',
              data: res.bandingData.E,
              // color: '#e84258',
              type: 'column',
            },
          //   {
          //     name: 'Zero Business',
          //     data: res.bandingData['Zero business'],
          //     // color: '#e84258',
          //     type: 'column',
          // },
        ],
        credits: {
            enabled: false, // Remove Highcharts branding
        },
    };



    // function customFunction(zone:any) {
      
    //   // Perform your desired operations
    //   this.getBandingPie_hc(zone, '');
    //   this.getStateWiseLOBDistPie(zone, '');
    //   this.agentFlagwiseBanding(zone, '');
    //   this.lobWiseBranding_Chart(zone, '');
    //   this.getAgentBackgroundDistBar(zone, '');
    // }

    
    
    // Render the chart
    Highcharts.chart('zoneWiseBranding_Chart', chartOptions);












      this.visibleContentById('zoneWiseBranding_Chart')

      this.apiComPlitionCount +=1
    }else{
      this.apiComPlitionCount +=1
    }
  });
}






customAPIcall(event: any){

  

  const clickedZone = event.point.category
  console.log("clickedZone  ",clickedZone)

  this.brandingPiechart_status = true
  this.pieChartFor = 'zone'
  this.state_branding_pie = ''

  this.zone_branding_pie = clickedZone
  this.lobContribution = 'zone'

  this.zone_selectedItems = [{ZONE: clickedZone}]
  this.state_selectedItems = []


  this.getBandingPie_hc(clickedZone, '');

  // this.getStateWiseLOBDistPie(clickedZone, '');
  this.insights_api_new(clickedZone, '');
  // this.vintage_wise_band_count('', clickedZone);

  // this.agentFlagwiseBanding(clickedZone, '');
  // this.lobWiseBranding_Chart(clickedZone, '');
  // this.getAgentBackgroundDistBar(clickedZone, '');



  this.blurContentById('getBandingPie_chart_hc')
  this.blurContentById('getStateWiseLOBDistPie_highchart')
  this.blurContentById('agentFlagwiseBanding')
  this.blurContentById('lob_Wise_Branding_Chart')
  this.blurContentById('getAgentBackgroundDistBar_chart')
}





getBandingPie_hc(zone:any, state: any){

  
  
  const data = {
    // triggerDate: '2024-02-05',
    user_agent_id: this.userAgentId,
    selected_channel: this.imdChannel_selectedItems,
    selected_subchannel: this.subChannelCodeName_selectedItems,
    selected_zone: this.zone_selectedItems,
    selected_state: this.state_selectedItems,
    selected_location: this.location_selectedItems,
    monthYear: this.month_selectedItems,
    state: this.state_branding_pie,
    zone: zone,
  }

  this.rest.getBandingPie(data).subscribe((res: any) => {
    if (res.success) {
      console.log("@@@@@@---->",res.bandList, res.bandingPercData)

      
      
      

      let chartData = [] as any;
      
      for (let i = 0; i < (res.bandList).length; i++) {

        let label = res.bandList[i];
        let value = '' as any;

        

        // this is catching % values
        // if(label == 'A+'){ value = res.bandingPercData.Aplus}

        // if(label == 'A'){ value = res.bandingPercData.A}
        // if(label == 'B'){ value = res.bandingPercData.B}
        // if(label == 'C'){ value = res.bandingPercData.C}
        // if(label == 'D'){ value = res.bandingPercData.D}


        // this is catching absolute values
        if(label == 'A+'){ value = res.bandingData.Aplus}

        if(label == 'A'){ value = res.bandingData.A}
        if(label == 'B'){ value = res.bandingData.B}
        if(label == 'C'){ value = res.bandingData.C}
        if(label == 'D'){ value = res.bandingData.D}
        if(label == 'E'){ value = res.bandingData.E}
        // if(label == 'Zero Business'){ value = res.bandingData['Zero business']}


        chartData.push(
          { "name": label, "y": value }
        );
      } 

      console.log("chartData----------->>",chartData)        

      const chartOptions: Highcharts.Options = {
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
          // text: 'LOB Wise GWP' ,
          text: '',
        },
        // subtitle: {
        //   text: 'Source: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
        // },
        tooltip: {
          // valueSuffix: '%'
          valueSuffix: ''
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f}%'
              // format: '{point.name}: {point.y}<br>{point.percentage:.1f}%'
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
              distance: 10,
              // format: '{point.name}: {point.percentage:.1f}%'
              format: '{point.name}: {point.y}<br>{point.percentage:.1f}%'
            },
            point: {
              events: {
    
                // click: this.setStateName.bind(this)
                
                
              }
            }
          }
        ],
        
      }


      Highcharts.chart('getBandingPie_chart_hc', chartOptions);
      this.visibleContentById('getBandingPie_chart_hc')

      
      
    }
    
  
  
  })


}




getBandingPie(zone:any, state: any){


  // if(this.getBandingPie_chart){
  //   this.getBandingPie_chart.clear();
  //   this.getBandingPie_chart.destroy();}


  const data = {
    // triggerDate: '2024-02-05',


    monthYear: this.month_selectedItems,
    state: this.state_branding_pie,
    zone: zone,
  }

  this.rest.getBandingPie(data).subscribe((res: any) => {
    if (res.success) {
      console.log("@@@@@@---->",res.lobFullNameList, res.lobPerList)

      

      
      if(this.getBandingPie_chart){
        this.getBandingPie_chart.clear();
        this.getBandingPie_chart.destroy();}


      

      this.getBandingPie_chart = new Chart('getBandingPie_chart', {
        type: 'pie',
        // type: 'doughnut',
        data: {
          labels: res.bandList,
          // labels: ['Contribution of A+', 'Contribution of A', 'Contribution of B', 'Contribution of C', 'Contribution of D'],
          datasets: [{
            label: 'Contribution in %',
            data: [res.bandingPercData.Aplus, res.bandingPercData.A, res.bandingPercData.B, res.bandingPercData.C, res.bandingPercData.D],              
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
            
          },
        ]
        },
        options: {  
          
                 
          responsive: true,
          maintainAspectRatio: false,

          radius: 190,
          
          
          
          plugins: {         
            
            
            legend: {
              // position: 'left',
              position: 'top',
              align: 'end',
              display: true,
              labels: {
                color: 'black',
                boxWidth: 14,
                boxHeight: 14,
                font: {
                  weight: 'normal',
                  size: 14
                }
              }
            },
            
          },

        },

        // plugins: [this.plugInCenterText],
        
      });

      
      
    }
    this.chart.push(this.getBandingPie_chart);
  
  
  })


}

// asonmonthState(){
//   if
// }


filteBtn(){
  this.brandingPiechart_status = false
  this.lobContribution = 'india'

  // this.showAsonmonth = true;


  this.apiComPlitionCount = 0



  this.blurContentById('bandComparison')
  this.blurContentById('indiaMap')


  this.blurContentById('zoneWiseBranding_Chart')
  this.blurContentById('getStateWiseLOBDistPie_highchart')
  this.blurContentById('agentFlagwiseBanding')
  this.blurContentById('lob_Wise_Branding_Chart')
  this.blurContentById('getAgentBackgroundDistBar_chart')






  this.getMtdYtdFtmData();
  this.getcomparison();
  this.getcomparison_ly();
  // this.getHeroAgents(); 
  // this.getBottomAgents();

  // this.getStatewiseGwp(); // this is called under getcomparison()

  
  this.filterCounter();
  this.clearAllDetails();
  this.storeFilter();
  
  // this.agentFlagwiseBanding('', '')

  // this.getAgentBackgroundDistBar('','')
  // this.lobWiseBranding_Chart('','')

  // this.getStateWiseLOBDistPie()

  // this.getStateWiseLOBDistPie('', '')
  this.insights_api_new('', '')
  // this.vintage_wise_band_count('', '');
}





  agentFlagwiseBanding(  zoneWiseBanding_zone: any, indMapState: any  ) {
    // this.clearContentById('agentFlagwiseBanding')
    const data = {
        user_agent_id: this.userAgentId,
        selected_channel: this.imdChannel_selectedItems,
        selected_subchannel: this.subChannelCodeName_selectedItems,
        selected_zone: this.zone_selectedItems,
        selected_state: this.state_selectedItems,
        selected_location: this.location_selectedItems,
        monthYear: this.month_selectedItems,



        indMapState: indMapState,
        zoneWiseBanding_zone: zoneWiseBanding_zone,
    }

    // let barDataPositionassist_1 = this.windowWidth * (3.784/100)
    // let barDataPositionassist_2 = this.windowWidth * (1.19/100)
    // let barDataPositionassist_3 = 0
    // let barDataPositionassist_4 = this.windowWidth * (3.784/100)
    // let barDataPositionassist_5 = this.windowWidth * (3.784/100)

    let barDataPositionassist_1 = 62
    let barDataPositionassist_2 = 32
    let barDataPositionassist_3 = 0
    let barDataPositionassist_4 = 32
    let barDataPositionassist_5 = 62



    this.rest.getAgentTypeWiseBandingBar(data).subscribe((res: any) => {
      if (res.success) {
        
        // this.chart.push(this.agentFlagwiseBanding_graph);














        const chartOptions: Highcharts.Options = {
          chart: {
              type: 'column',
              // height: '60%', // Adjust height to maintain aspect ratio
              // spacingTop: 10, // Padding at the top
              // spacingBottom: 30, // Padding at the bottom
          },
          title: {
              text: '', // Highcharts includes titles by default; leave it empty if not needed
          },
          xAxis: {
              categories: res.level_data, // Equivalent to `labels` in Chart.js
              title: {
                  text: 'Agent Vintage', // X-axis title
                  style: {
                      fontWeight: 'bold',
                      fontSize: '13px',
                  },
              },
              labels: {
                  style: {
                      color: 'black',
                      fontWeight: 'normal',
                  },
              },
              gridLineWidth: 0, // Remove grid lines
          },
          yAxis: {
              title: {
                  text: 'Agent Count', // Y-axis title
                  style: {
                      fontWeight: 'bold',
                  },
              },
              labels: {
                  enabled: false, // Hide Y-axis ticks
              },
              gridLineWidth: 0, // Remove grid lines
          },
          // legend: {
          //     align: 'right',
          //     verticalAlign: 'top',
          //     layout: 'vertical',
          //     title: {
          //         text: 'Bands',
          //         style: {
          //             color: 'black',
          //             fontWeight: 'normal',
          //             fontSize: '13px',
          //         },
          //     },
          //     itemStyle: {
          //         color: 'black',
          //         fontWeight: 'normal',
          //     },
          // },
          tooltip: {
              formatter: function () {
                  const index = this.point.index; // Get the index of the data point
                  const customTitle = res.level_data[index]?.toString().replaceAll(',', ' '); // Fetch corresponding level_data
                  return `<b>${customTitle}</b><br>${this.series.name}: ${this.y}`;
              },
          },
          plotOptions: {
              series: {
                  // borderRadius: 10, // Bar corner radius
                  // maxPointWidth: 35, // Max bar thickness
                  dataLabels: {
                      enabled: true,
                      style: {
                          fontSize: '12px',
                      },
                  },
              },
          },
          series: [
              {
                  name: 'A+',
                  data: res.bandingData.Aplus,
                  // color: '#cdeac0',
                  type: 'column',
              },
              {
                  name: 'A',
                  data: res.bandingData.A,
                  // color: '#efe9ae',
                  type: 'column',
              },
              {
                  name: 'B',
                  data: res.bandingData.B,
                  // color: '#fec3a6',
                  type: 'column',
              },
              {
                  name: 'C',
                  data: res.bandingData.C,
                  // color: '#ffac81',
                  type: 'column',
              },
              {
                  name: 'D',
                  data: res.bandingData.D,
                  // color: '#ff928b',
                  type: 'column',
              },
              {
                name: 'E',
                data: res.bandingData.E,
                // color: '#ff928b',
                type: 'column',
              },
              // {
              //   name: 'Zero Business',
              //   data: res.bandingData['Zero business'],
              //   // color: '#ff928b',
              //   type: 'column',
              // },
          ],
          credits: {
              enabled: false, // Disable Highcharts watermark
          },
      };
      
      // Render the chart
      Highcharts.chart('agentFlagwiseBanding', chartOptions);










        this.visibleContentById("agentFlagwiseBanding")





        this.apiComPlitionCount +=1
      }
      else{
        this.apiComPlitionCount +=1
      }
    });
  }

  lobWiseBranding_Chart( zoneWiseBanding_zone: any, indMapState: any  ) {
    // this.clearContentById('lob_Wise_Branding_Chart')

    const data = {
        user_agent_id: this.userAgentId,
        selected_channel: this.imdChannel_selectedItems,
        selected_subchannel: this.subChannelCodeName_selectedItems,
        selected_zone: this.zone_selectedItems,
        selected_state: this.state_selectedItems,
        selected_location: this.location_selectedItems,
        monthYear: this.month_selectedItems,



        indMapState: indMapState,
        zoneWiseBanding_zone: zoneWiseBanding_zone,
    }

    let barDataPositionassist_1 = this.windowWidth * (3.784/100)
    let barDataPositionassist_2 = this.windowWidth * (1.19/100)
    let barDataPositionassist_3 = 0
    let barDataPositionassist_4 = this.windowWidth * (3.784/100)
    let barDataPositionassist_5 = this.windowWidth * (3.784/100)



    this.rest.getAllLOBDistBar(data).subscribe((res: any) => {
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
              ctx.fillText(datapoint, x.getPixelForValue(index)-48, chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(datapoint, x.getPixelForValue(index)-barDataPositionassist_1, chart.getDatasetMeta(0).data[index].y - 10);
            });
            chart.data.datasets[1].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              ctx.fillText(datapoint , x.getPixelForValue(index)-24, chart.getDatasetMeta(1).data[index].y - 10);
              // ctx.fillText(datapoint, x.getPixelForValue(index)-barDataPositionassist_2, chart.getDatasetMeta(1).data[index].y - 10);
            });
            chart.data.datasets[2].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              ctx.fillText(datapoint, x.getPixelForValue(index)+0, chart.getDatasetMeta(2).data[index].y - 10);
              // ctx.fillText(datapoint, x.getPixelForValue(index)+barDataPositionassist_3, chart.getDatasetMeta(2).data[index].y - 10);
            });
            chart.data.datasets[3].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              ctx.fillText(datapoint, x.getPixelForValue(index)+24, chart.getDatasetMeta(3).data[index].y - 10);
              // ctx.fillText(datapoint, x.getPixelForValue(index)+barDataPositionassist_4, chart.getDatasetMeta(3).data[index].y - 10);
            });

            chart.data.datasets[4].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 12px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign = "center";
              ctx.fillText(datapoint, x.getPixelForValue(index)+48, chart.getDatasetMeta(4).data[index].y - 10);
              // ctx.fillText(datapoint, x.getPixelForValue(index)+barDataPositionassist_5, chart.getDatasetMeta(4).data[index].y - 10);
            });
            ctx.rect(0, 0, 1000, 1000);
          }
        };
        if(this.lob_Wise_Branding_Chart){
          this.lob_Wise_Branding_Chart.clear();
          this.lob_Wise_Branding_Chart.destroy();
      }
       


        const chartOptions: Highcharts.Options = {
          chart: {
            type: 'column', // Bar chart type
            // height: 'auto', // Auto height
            // width: null, // No specific width
            // margin: [0, 0, 0, 0], // Remove margins
            // marginTop: 0,
            // marginBottom: 0,
            // marginLeft: 0,
            // marginRight: 0
          },
          title: {
            text: '' // No title
          },
          credits: {
            enabled: false // Disable credits (e.g., Highcharts logo)
          },
          xAxis: {
            categories: res.level_data, // X-axis categories (LOB)
            title: {
              text: 'LOB', // Title for X-axis
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black'
              }
            },
            labels: {
              style: {
                color: 'black',
                fontWeight: 'normal'
              }
            },
            gridLineWidth: 0 // Remove gridlines
          },
          yAxis: {
            title: {
              text: 'Agent Count', // Title for Y-axis
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black'
              }
            },
            labels: {
              enabled: false // Hide y-axis labels
            },
            gridLineWidth: 0 // Remove gridlines
          },
          // legend: {
          //   title: {
          //     text: 'Bands', // Title for the legend
          //     style: {
          //       fontWeight: 'normal',
          //       fontSize: '13px',
          //       color: 'black'
          //     }
          //   },
          //   align: 'end', // Align the legend to the end
          //   verticalAlign: 'top', // Position legend on top
          //   layout: 'horizontal',
          //   itemStyle: {
          //     fontWeight: 'normal',
          //     fontSize: '13px',
          //     color: 'black'
          //   }
          // },
          tooltip: {
            shared: true, // Shared tooltip across series
            formatter: function() {
              return res.level_data[this.point.index].toString().replaceAll(',', ' ');
            }
          },
          plotOptions: {
            series: {
              // borderRadius: 10, // Bar corner radius
              // maxPointWidth: 35, // Max bar thickness
              dataLabels: {
                  enabled: true,
                  style: {
                      fontSize: '12px',
                  },
              },
            },
            // bar: {
            //   borderRadius: 10, // Round the corners of the bars
            //   maxBarThickness: 35 // Max thickness of bars
            // }
          },
          series: [
            {
              type: 'column',
              name: 'A+',
              data: res.bandingData.Aplus,
              // color: '#20b0b1' // Color for A+
            },
            {
              type: 'column',
              name: 'A',
              data: res.bandingData.A,
              // color: '#f7f383' // Color for A
            },
            {
              type: 'column',
              name: 'B',
              data: res.bandingData.B,
              // color: '#ad7cb8' // Color for B
            },
            {
              type: 'column',
              name: 'C',
              data: res.bandingData.C,
              // color: '#dd78ae' // Color for C
            },
            {
              type: 'column',
              name: 'D',
              data: res.bandingData.D,
              // color: '#ff928b' // Color for D
            },
            {
              type: 'column',
              name: 'E',
              data: res.bandingData.E,
              // color: '#ff928b' // Color for E
            },
            // {
            //   type: 'column',
            //   name: 'Zero Business',
            //   data: res.bandingData['Zero business'],
            //   // color: '#ff928b' // Color for Zero Business
            // }
          ]
        };
        
        // Render the chart
        Highcharts.chart('lob_Wise_Branding_Chart', chartOptions);







        this.visibleContentById("lob_Wise_Branding_Chart")

        this.apiComPlitionCount +=1
      }
      else{
        this.apiComPlitionCount +=1
      }
    });
  }




  restructure_lobwise__BandingData(response: any, selectedMonth: string): any {
    try {
      // Extract the raw banding data and level data from the response
      const bandingDataRaw = response[0].bandingData;
      const levelData = response[0].level_data;
  
      // Define the categories for banding
      const bandingCategories = ["A", "Aplus", "B", "C", "D", "E", "Zero business"];
      const bandingData: { [key: string]: number[] } = bandingCategories.reduce(
        (acc, category) => ({ ...acc, [category]: [] }),
        {}
      );
  
      // Dynamically construct the banding key for the selected month
      const bandingKey = `Banding_${selectedMonth}`;
  
      // Iterate over level data (e.g., "Others", "Motor", etc.)
      levelData.forEach((level: string) => {
        // Filter banding data for the current level
        const filteredData = bandingDataRaw.filter((item: any) => item.Acc_Lob === level);
  
        // Aggregate data for each banding category
        const categoryTotals: { [key: string]: number } = {};
        filteredData.forEach((item: any) => {
          const band = item[bandingKey];
          if (band || band === 0) {
            categoryTotals[band] = (categoryTotals[band] || 0) + band;
          }
        });
  
        // Populate banding totals into the result structure
        bandingCategories.forEach((category) => {
          if (category === "Zero business") {
            bandingData[category].push(categoryTotals["-"] || 0);
          } else {
            bandingData[category].push(categoryTotals[category] || 0);
          }
        });
      });
  
      // Construct and return the final structured response
      return {
        bandingData,
        level_data: levelData,
        status: 200,
        success: true,
      };
    } catch (error) {
      console.error("Error processing banding data:", error);
      return {
        bandingData: {},
        level_data: [],
        status: 500,
        success: false,
      };
    }
  }

  prepareLobWiseBranding_columnChart(res: any,  selectedMonth: string){

    // res = this.restructure_lobwise__BandingData(res,  selectedMonth)

    console.log("prepareLobWiseBranding_columnChart-----> ", res)

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column', // Bar chart type
        // height: 'auto', // Auto height
        // width: null, // No specific width
        // margin: [0, 0, 0, 0], // Remove margins
        // marginTop: 0,
        // marginBottom: 0,
        // marginLeft: 0,
        // marginRight: 0
      },
      title: {
        text: '' // No title
      },
      credits: {
        enabled: false // Disable credits (e.g., Highcharts logo)
      },
      xAxis: {
        categories: res.level_data, // X-axis categories (LOB)
        // categories: ['a+', 'a', 'b', 'c', 'd'], // X-axis categories (LOB)
        title: {
          text: 'LOB', // Title for X-axis
          style: {
            fontWeight: 'bold',
            fontSize: '13px',
            color: 'black'
          }
        },
        labels: {
          style: {
            color: 'black',
            fontWeight: 'normal'
          }
        },
        gridLineWidth: 0 // Remove gridlines
      },
      yAxis: {
        title: {
          text: 'Agent Count', // Title for Y-axis
          style: {
            fontWeight: 'bold',
            fontSize: '13px',
            color: 'black'
          }
        },
        labels: {
          enabled: false // Hide y-axis labels
        },
        gridLineWidth: 0 // Remove gridlines
      },
      // legend: {
      //   title: {
      //     text: 'Bands', // Title for the legend
      //     style: {
      //       fontWeight: 'normal',
      //       fontSize: '13px',
      //       color: 'black'
      //     }
      //   },
      //   align: 'end', // Align the legend to the end
      //   verticalAlign: 'top', // Position legend on top
      //   layout: 'horizontal',
      //   itemStyle: {
      //     fontWeight: 'normal',
      //     fontSize: '13px',
      //     color: 'black'
      //   }
      // },
      tooltip: {
        shared: true, // Shared tooltip across series
        // formatter: function() {
        //   return res.level_data[this.point.index].toString().replaceAll(',', ' ');
        // }
      },
      plotOptions: {
        series: {
          // borderRadius: 10, // Bar corner radius
          // maxPointWidth: 35, // Max bar thickness
          dataLabels: {
              enabled: true,
              style: {
                  fontSize: '12px',
              },
          },
        },
        // bar: {
        //   borderRadius: 10, // Round the corners of the bars
        //   maxBarThickness: 35 // Max thickness of bars
        // }
      },
      series: [
        {
          type: 'column',
          name: 'A+',
          data: res.bandingData['A+'],
          // color: '#20b0b1' // Color for A+
        },
        {
          type: 'column',
          name: 'A',
          data: res.bandingData.A,
          // color: '#f7f383' // Color for A
        },
        {
          type: 'column',
          name: 'B',
          data: res.bandingData.B,
          // color: '#ad7cb8' // Color for B
        },
        // {
        //   type: 'column',
        //   name: 'C',
        //   data: res.bandingData.C,
        //   // color: '#dd78ae' // Color for C
        // },
        // {
        //   type: 'column',
        //   name: 'D',
        //   data: res.bandingData.D,
        //   // color: '#ff928b' // Color for D
        // },
        // {
        //   type: 'column',
        //   name: 'E',
        //   data: res.bandingData.E,
        //   // color: '#ff928b' // Color for E
        // },
        // {
        //   type: 'column',
        //   name: 'Zero Business',
        //   data: res.bandingData['Zero business'],
        //   // color: '#ff928b' // Color for Zero Business
        // }
      ]
    };
























    














    
    // Render the chart
    Highcharts.chart('lob_Wise_Branding_Chart', chartOptions);







    this.visibleContentById("lob_Wise_Branding_Chart")
  }




  indianNumberFormat(number:any) {
    
    if (isNaN(number)) {
      throw new Error("Invalid number input");
    }
  
    const numberStr = number.toString();
    if (numberStr.indexOf(".") !== numberStr.lastIndexOf(".")) {
      throw new Error("Only one decimal point allowed.");
    }
  
    let parts = numberStr.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";
  
    return integerPart + decimalPart;
  }




  // chart.js
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
  //       console.log("@@@@@@---->",res.lobFullNameList, res.lobPerList)
  
        
        
  //       if(this.getStateWiseLOBDistPie_chart){
  //         this.getStateWiseLOBDistPie_chart.clear();
  //         this.getStateWiseLOBDistPie_chart.destroy();}
  
  
        
  
  //       this.getStateWiseLOBDistPie_chart = new Chart('getStateWiseLOBDistPie', {
  //         type: 'pie',
  //         // type: 'doughnut',
  //         data: {
  //           labels: res.level_data,
  //           // labels: ['Contribution of A+', 'Contribution of A', 'Contribution of B', 'Contribution of C', 'Contribution of D'],
  //           datasets: [{
  //             label: 'Contribution in %',
  //             data: res.imdData.IMD_COUNT,              
              // backgroundColor: [
              //   'rgb(255, 99, 132)',    // Red
              //   'rgb(54, 162, 235)',     // Blue
              //   'rgb(75, 192, 192)',     // Green
              //   'rgb(255, 206, 86)',     // Yellow
              //   'rgb(153, 102, 255)',    // Purple
              //   'rgb(255, 159, 64)',     // Orange
              //   'rgb(0, 255, 255)'       // Cyan
              // ],
  //             borderWidth: 1,
  //             // datalabels:
              
  //           },
  
  //           // {
  //           //   label: "Motor 2W",
  //           //   data: res.motor2w,
  //           //   backgroundColor: 'rgb(54, 162, 235)',
  //           //   borderRadius:10,
  //           //   // barThickness: 40,
  //           // },
  //           // {
  //           //   label: "Motor 4W",
  //           //   data: res.motor4w,
  //           //   backgroundColor: 'rgb(75, 192, 192)',
  //           //   borderRadius:10,
  //           //   // barThickness: 40,
  //           // },
  //         ]
  //         },
  //         options: {  
            
                   
  //           responsive: true,
  //           maintainAspectRatio: false,
  
  //           radius: 190,
            
            
            
  //           plugins: {         
              
              
  //             legend: {
  //               // position: 'left',
  //               position: 'top',
  //               align: 'end',
  //               display: true,
  //               labels: {
  //                 color: 'black',
  //                 boxWidth: 14,
  //                 boxHeight: 14,
  //                 font: {
  //                   weight: 'normal',
  //                   size: 14
  //                 }
  //               }
  //             },
              
  //           },
  
            
  
            
  
  //           // scales: {
  //           //   y: {
  //           //     title: {
  //           //           color: 'black',
  //           //           display: false,
  //           //           text: '',
  //           //           font: {
  //           //             weight: 'bold',// Make the legend labels bold
        
  //           //                 },
  //           //             },
  //           //     beginAtZero: false,
  //           //     ticks: {
  //           //       display:false,
  //           //     },
  //           //     grid:{
  //           //           display:false,
  //           //         },
  //           //   }
              
  //           // }
  //         },
  
  //         // plugins: [this.plugInCenterText],
          
  //       });
  
        
        
  //     }
  //     this.chart.push(this.getStateWiseLOBDistPie_chart);
    
    
  //   })
  
  
  // }










  





  getAgentBackgroundDistBar( zoneWiseBanding_zone: any, indMapState: any  ){

    // this.clearContentById('getAgentBackgroundDistBar_chart')


    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,



      indMapState: indMapState,
      zoneWiseBanding_zone: zoneWiseBanding_zone,
    }


    this.rest.getAgentBackgroundDistBar(data).subscribe((res: any) => {
      if (res.success) {
        
        // console.log("res.zhNamesList >>>>",res.zhNamesList )
        // console.log("res.zhDegrowthPer >>>>",res.zhDegrowthPer )
        var topLables = {
          id: 'topLables',
          afterDatasetsDraw: (chart:any, args:any, options:any) => {
            const { ctx, scales: { x, y } } = chart;
            chart.data.datasets[0].data.forEach((datapoint:any, index:any) => {
              // console.log("datapoint>>>",datapoint)
              ctx.font = '500 9px sans-serif';
              ctx.fillStyle = 'black';
              ctx.textAlign= 'center';
              ctx.fillText(datapoint + '', x.getPixelForValue(index), chart.getDatasetMeta(0).data[index].y - 10);
              // ctx.fillText(Math.round(datapoint * 100) / 100 + ' %', x.getPixelForValue(index) - 20, chart.getDatasetMeta(0).data[index].y - 10);

            });
          }
        }
        if(this.getAgentBackgroundDistBar_chart){
          this.getAgentBackgroundDistBar_chart.clear();
          this.getAgentBackgroundDistBar_chart.destroy();
      }
        



        const levelData = res.level_data; // X-axis categories
        const imdCountData = res.imdData.IMD_COUNT; // Y-axis values

        // Combine categories and data into a single array for sorting
        const combinedData = levelData.map((category: any, index:any) => ({
          category,
          value: imdCountData[index],
        }));

        // Sort by value (ascending or descending)
        combinedData.sort((a:any, b:any) => b.value - a.value); // For descending order
        // Use `a.value - b.value` for ascending order

        // Separate sorted data back into categories and values
        const sortedCategories = combinedData.map((item: any) => item.category);
        const sortedValues = combinedData.map((item:any) => item.value);

        // Highcharts Options with sorted data
        const chartOptions: Highcharts.Options = {
          chart: {
            type: 'column', // Column chart type
          },
          title: {
            text: '', // Title for the chart
          },
          credits: {
            enabled: false, // Disable credits (e.g., Highcharts logo)
          },
          xAxis: {
            categories: sortedCategories, // Use sorted categories
            title: {
              text: 'Agent Background',
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black',
              },
            },
            labels: {
              style: {
                color: 'black',
                fontWeight: 'normal',
              },
            },
            gridLineWidth: 0, // Remove gridlines
          },
          yAxis: {
            title: {
              text: 'IMD Count', // Title for Y-axis
              style: {
                fontWeight: 'bold',
                fontSize: '13px',
                color: 'black',
              },
            },
            labels: {
              style: {
                color: 'black',
              },
            },
            gridLineWidth: 1, // Keep gridlines for better readability
          },
          tooltip: {
            shared: true, // Shared tooltip across series
            formatter: function () {
              return `IMD Count: ${this.point.y}`;
            },
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '12px',
                },
              },
            },
            column: {
              borderRadius: 5, // Round the corners of the columns
              maxPointWidth: 60, // Max width for columns
            },
          },
          series: [
            {
              type: 'column',
              name: 'IMD Count',
              data: sortedValues, // Use sorted data
              color: '#4CAF50', // Color for the columns
            },
          ],
        };
        
        // Render the chart
        Highcharts.chart('getAgentBackgroundDistBar_chart', chartOptions);




        this.visibleContentById('getAgentBackgroundDistBar_chart')
      }
    });
  }


  backToIndiaLOBcontri(){
    if(this.pieChartFor == 'state'){
      this.state_branding_pie = ''
      
      // this.getStateWiseLOBDistPie('', ''); 
      this.lobContribution='india'
    }
  }







  backBtn_BandingDistribution(){
    this.zone_selectedItems = sessionStorage.getItem('selectedZone'); 
    this.zone_selectedItems = JSON.parse(this.zone_selectedItems);

    this.state_selectedItems = sessionStorage.getItem('selectedState');
    this.state_selectedItems = JSON.parse(this.state_selectedItems);

    
    this.brandingPiechart_status = false;
    this.lobContribution = 'india';


    this.blurContentById('zoneWiseBranding_Chart')
    this.blurContentById('getStateWiseLOBDistPie_highchart')
    this.blurContentById('agentFlagwiseBanding')
    this.blurContentById('lob_Wise_Branding_Chart')
    this.blurContentById('getAgentBackgroundDistBar_chart')


    // this.state_in_indiamap_isClicked = false;
    // this.zone_isClicked = false;


    // sessionStorage.setItem("selectedChannel", JSON.stringify(this.imdChannel_selectedItems));
    // sessionStorage.setItem("selectedSubChannel", JSON.stringify(this.subChannelCodeName_selectedItems));
    // sessionStorage.setItem("selectedZone", JSON.stringify(this.zone_selectedItems));
    // sessionStorage.setItem("selectedState", JSON.stringify(this.state_selectedItems));
    // sessionStorage.setItem("selectedLocation", JSON.stringify(this.location_selectedItems));
    // sessionStorage.setItem("selectedMonthYear", JSON.stringify(this.month_selectedItems));
 



    // this.zoneWiseBranding(); 
    this.backToIndiaLOBcontri();

    // this.agentFlagwiseBanding('', '')

    // this.getStateWiseLOBDistPie('', '')
    this.insights_api_new('', '');
    // this.vintage_wise_band_count('', '');

    // this.getAgentBackgroundDistBar('','')
    // this.lobWiseBranding_Chart('','')

    



  }











  



  // clearContentById(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.innerHTML = 'loading...';
  //   }
  // }
  // blurContentById(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //       element.style.opacity = '0.2';
  //   }
  // }

  // blurContentById(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //       // Apply blur and reduced opacity
  //       element.style.position = 'relative';
  //       element.style.opacity = '0.2';

  //       // Create spinner container
  //       const spinnerContainer = document.createElement('div');
  //       spinnerContainer.style.position = 'absolute';
  //       spinnerContainer.style.top = '50%';
  //       spinnerContainer.style.left = '50%';
  //       spinnerContainer.style.transform = 'translate(-50%, -50%)';
  //       spinnerContainer.style.zIndex = '1000';
  //       spinnerContainer.style.pointerEvents = 'none';

  //       // Create spinner element
  //       const spinner = document.createElement('div');
  //       spinner.style.width = '40px';
  //       spinner.style.height = '40px';
  //       spinner.style.border = '4px solid #ccc';
  //       spinner.style.borderTop = '4px solid #3498db';
  //       spinner.style.borderRadius = '50%';
  //       spinner.style.animation = 'spin 1s linear infinite';

  //       // Append spinner to spinnerContainer
  //       spinnerContainer.appendChild(spinner);
  //       // Append spinnerContainer to the element
  //       element.appendChild(spinnerContainer);

  //       // CSS animation (add it to your global styles or dynamically create)
  //       const style = document.createElement('style');
  //       style.type = 'text/css';
  //       style.innerHTML = `
  //           @keyframes spin {
  //               0% { transform: rotate(0deg); }
  //               100% { transform: rotate(360deg); }
  //           }
  //       `;
  //       document.head.appendChild(style);
  //   }
  // }




  blurContentById(id: string) {
    const element = document.getElementById(id);
    if (element) {
        // Apply blur and reduced opacity to the main element
        element.style.position = 'relative';
        element.style.opacity = '0.2';

        // Create spinner container
        const spinnerContainer = document.createElement('div');
        spinnerContainer.style.position = 'absolute';
        spinnerContainer.style.top = '50%';
        spinnerContainer.style.left = '50%';
        spinnerContainer.style.transform = 'translate(-50%, -50%)';
        spinnerContainer.style.zIndex = '1000';
        spinnerContainer.style.pointerEvents = 'none';
        spinnerContainer.style.opacity = '1'; // Ensure spinner remains fully visible

        // Create Bootstrap spinner
        spinnerContainer.innerHTML = `
            <div class="spinner-border text-primary" role="status" style="opacity: 1;">
                <span class="sr-only">Loading...</span>
            </div>
        `;

        // Append spinnerContainer to the element
        element.appendChild(spinnerContainer);
    }
  }





  visibleContentById(id: string) {
    const element = document.getElementById(id);
    if (element) {
        element.style.opacity = '1';
    }
  }

  // clearContentById(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //       if (element instanceof HTMLCanvasElement) {
  //           const context = element.getContext('2d');
  //           if (context) {
  //               context.clearRect(0, 0, element.width, element.height);
  //           }
  //       } else {
  //           element.innerHTML = 'loading...';
  //       }
  //   }
  // }

  
  // clearCanvas(canvasId: string) {
  //   const chart = this.charts[canvasId];
  //   if (chart) {
  //     chart.destroy(); // Destroy the chart instance
  //     delete this.charts[canvasId]; // Remove the reference from the map
  //   }

  //   const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  //   const context = canvas.getContext('2d');
  //   if (context) {
  //     context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  //   }
  // }











   // Open modal and store reference by ID
   openModal1(modalId: string, content: any) {
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
  closeModal1(modalId: string) {
    if (this.modalRefs[modalId]) {
      this.modalRefs[modalId].close(); // Close the specific modal
      delete this.modalRefs[modalId]; // Clean up the reference
    } else {
      console.warn(`No modal found with ID: ${modalId}`);
    }
  }









  getMtdYtdFtmData(){
    let filterflag_exceptMonth = 1
    if(this.imdChannel_selectedItems.length == 0 && this.subChannelCodeName_selectedItems.length == 0 && this.zone_selectedItems.length == 0 && this.state_selectedItems == 0 && this.location_selectedItems == 0){
      filterflag_exceptMonth = 0
    }

    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      filterFlag_excptMonth: filterflag_exceptMonth
    }



    this.rest.getMtdYtdFtmData(data).subscribe((res: any) => {
      if(res.success){

        if (res.data?.length) {
          this.mtd_ytd_ftm_data = res.data
        }
      } else{

      }
    })


  }










  // formatNumber(inputString:any) {
  //   try {
  //     // Remove spaces and '%' sign
  //     const sanitizedString = inputString.replace(/\s+|%/g, '');
  
  //     // Convert to number
  //     const number = parseFloat(sanitizedString);
  
  //     // Check if it's a valid number
  //     if (isNaN(number)) {
  //       throw new Error("Invalid input: not a valid number");
  //     }
  
  //     // Round to 2 decimal places
  //     const roundedNumber = Math.round(number * 100) / 100;
  
  //     return roundedNumber;
  //   } catch (error:any) {
  //     console.error(error.message);
  //     return null;
  //   }
  // }




  formatNumber(inputString: any) {
    try {
      // Remove spaces and '%' sign
      const sanitizedString = inputString.replace(/\s+|%/g, '');
      
      // Convert to number
      const number = parseFloat(sanitizedString);
      
      // Check if it's a valid number
      if (isNaN(number)) {
        throw new Error("Invalid input: not a valid number");
      }
      
      // Remove decimal if the value is an integer
      const roundedNumber = (number % 1 === 0) ? Math.round(number) : Math.round(number * 100) / 100;
      
      // Format number in Indian numbering system (comma separated)
      const formattedNumber = this.formatIndianNumber(roundedNumber);
      
      // return formattedNumber;
      return roundedNumber;
      
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  
  // Helper method to format number in Indian numbering system
  formatIndianNumber(number: number): string {
    // Handle negative numbers
    const isNegative = number < 0;
    const absoluteNumber = Math.abs(number);
    
    // Format the number with commas in Indian format
    let numString = absoluteNumber.toString();
    const parts = numString.split('.');  // Separate whole and fractional part if any
    let integerPart = parts[0];
    let decimalPart = parts[1] ? '.' + parts[1] : '';
    
    // Apply the Indian numbering system formatting
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    
    // Combine integer part and decimal part
    const result = formattedIntegerPart + decimalPart;
    
    // Return the result, including handling for negative numbers
    return isNegative ? '-' + result : result;
  }

















  compareWithLeft(index: number, current: number | null | undefined, left: number | null | undefined): string {
    if (current == null) current = 0;
    if (left == null) left = 0;

    if(index == 0){
      return ''
    }
  
    if (current > left) {
      return 'green';
    } else if (current < left) {
      return 'red';
    }else if (current == left) {
    return 'lightBlue';
  }
    return '';
  }







  formatMonthYear_list(categories: string[]): string[] {
    const monthMap: { [key: string]: string } = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    
    return categories.map(item => {
        let [month, year] = item.split(' ');
        return `${monthMap[month]} ${year}`;
    });
}


  cyly_bandName = ''

  extractMonthsOnly(dates:any) {
    return dates.map((date:any) => date.split(" ")[0]);
  }

  cylyGraphMakingOnly(cylyBandName:any){
    this.cyly_bandName = cylyBandName;

    // this.bandTrend_graph_show = true;


    // let levelData = level_data.map((x: any) => this.formatMonthYear(x));

    const categories = this.extractMonthsOnly(this.formatMonthYear_list(this.bandTrendResponse_ly.graphLevel)); // X-axis labels
    console.log("cyly --    ",categories)


    const bandData = [
      { label: 'CY', data: this.bandTrendResponse[cylyBandName], color: '#0cc078' },
      { label: 'LY', data: this.bandTrendResponse_ly[cylyBandName], color: '#800000' }

      // { label: 'LY', data: this.bandTrendResponse.A, color: '#800000' },
      // { label: 'B', data: this.bandTrendResponse.B, color: '#ffd366' },
      // { label: 'C', data: this.bandTrendResponse.C, color: '#ff8439' },
      // { label: 'D', data: this.bandTrendResponse.D, color: '#e97282' },
      // { label: 'E', data: this.bandTrendResponse.E, color: '#b40000' },
      // { label: 'Zero Business', data: this.bandTrendResponse.Z, color: '#800000' },
    ];

    // Prepare Highcharts series dynamically
    let seriesData = bandData.map((band) => ({
      name: band.label,
      data: band.data,
      color: band.color,
      type: 'line', // Use "area" to fill the chart
      fillOpacity: 0.6,
      marker: {
        enabled: false,
      },
    })) as any;



    console.log("cy ly seriesData --> ", seriesData);
    console.log("cy ly x axis category --> ", categories);

    // Highcharts configuration
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'line',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Months',
        },
      },
      yAxis: {
        title: {
          text: 'Total Agents',
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        valueSuffix: '',
      },
      plotOptions: {
        area: {
          stacking: 'normal', // Stacked area chart
        },
      },
      series: seriesData,
    };

    // Render the chart
    Highcharts.chart('cylyComparison', chartOptions);

    
    
  }



  download_band_trend_table_total(){

    const data = {
      userAgentId: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems
    }

    // console.log("this.month_selectedItems>>>",this.month_selectedItems);
    this.rest.download_band_trend_table_total(data).subscribe((res: any) => {
      if (res.success) {

        const url = this.rest.file_path + "/band_trend_tables/" + res.file;
        // console.log(url)
          window.open(url, "_blank");




        // if(res.status == 0){
        //   window.alert("No Data Available");
        // }else{

        //   // write whatever logic you want to write
        //   // const url = "http://10.4.2.134:5000/static/band_trend_tables/PENVA_06-02-2025.csv";
          

        // }
      }
    })

  }








  
  

}

