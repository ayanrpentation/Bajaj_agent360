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
  selector: 'app-new-insights-page',
  templateUrl: './new-insights-page.component.html',
  styleUrls: ['./new-insights-page.component.css']
})
export class NewInsightsPageComponent implements OnInit {

  // Store modal references by modal ID
  modalRefs: { [id: string]: NgbModalRef } = {};

  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;

  charts: { [key: string]: Chart } = {};

  bandComparison_table_show = false as boolean;
  showBrandTrend_percent = false ;

  // state_in_indiamap_isClicked = false as boolean;
  // zone_isClicked = false as boolean;




  // bandTrend_loading_spin = true as boolean;










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
  }


  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });

    console.log("sideNav_state--> ", this.sideNav_state)
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
    }

    this.setUpValuesInDropDown();
    this.zoneWiseBranding_Chart_style_set()



    this.getMtdYtdFtmData()

    this.getHeroAgents();
    this.getBottomAgents();
    this.getcomparison();


    this.get_zone_list();
    this.get_state_list();
    this.get_location_list();
    this.getChannelList();
    this.get_subChannelList();
    this.getMonthYearList();


    this.agentFlagwiseBanding('','')
    this.lobWiseBranding_Chart('', '')
    this.getAgentBackgroundDistBar('','')
    this.getStateWiseLOBDistPie('', '')




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


  ngAfterViewInit() {
    // this.callFilterResult('summary', 0)
    // this.createChart();
    // this.callFilterResult('details', 0)
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

  getcomparison() {
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
        this.bandComparison_table_show = true;
        // this.bandTrend_loading_spin = false;

        // console.log("res>>>",res)
        this.ytdBandMovementMonthColumns = res.graphLevel
        
        this.comparisonDetails = res.result;
        this.comparisonColumns = res.columns;

        // this.getcomparisonData_aplus = res.list_A_plus
        // this.getcomparisonData_a = res.list_A
        // this.getcomparisonData_b = res.list_B
        // this.getcomparisonData_c = res.list_C
        // this.getcomparisonData_d = res.list_D
        // this.getcomparisonData_e = res.list_E
        // this.getcomparisonData_z = res.list_Z



        // this.getcomparisonData_aplus_percent = []
        // this.getcomparisonData_a_percent = []
        // this.getcomparisonData_b_percent = []
        // this.getcomparisonData_c_percent = []
        // this.getcomparisonData_d_percent = []
        // this.getcomparisonData_e_percent = []
        // this.getcomparisonData_z_percent = []

        



        
        // for (let i = 0; i < this.getcomparisonData_aplus.length; i++) {
        //   // console.log(items[i]);
        //   let total = this.getcomparisonData_aplus[i] + this.getcomparisonData_a[i] + this.getcomparisonData_b[i] + this.getcomparisonData_c[i] + this.getcomparisonData_d[i] + this.getcomparisonData_e[i] + this.getcomparisonData_z[i]

        //   this.getcomparisonData_total.push(total)

        //   this.getcomparisonData_aplus_percent.push((this.getcomparisonData_aplus[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_a_percent.push((this.getcomparisonData_a[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_b_percent.push((this.getcomparisonData_b[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_c_percent.push((this.getcomparisonData_c[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_d_percent.push((this.getcomparisonData_d[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_e_percent.push((this.getcomparisonData_e[i] / total * 100).toFixed(1))
        //   this.getcomparisonData_z_percent.push((this.getcomparisonData_z[i] / total * 100).toFixed(1))
        // }




















        // Initialize data arrays
        this.getcomparisonData_aplus = res.list_A_plus || [];
        this.getcomparisonData_a = res.list_A || [];
        this.getcomparisonData_b = res.list_B || [];
        this.getcomparisonData_c = res.list_C || [];
        this.getcomparisonData_d = res.list_D || [];
        this.getcomparisonData_e = res.list_E || [];
        this.getcomparisonData_z = res.list_Z || [];

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
            (this.getcomparisonData_e[i] || 0) + 
            (this.getcomparisonData_z[i] || 0);

          // Avoid division by zero
          const validTotal = total || 1;

          this.getcomparisonData_total.push(total);

          this.getcomparisonData_aplus_percent.push(((this.getcomparisonData_aplus[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_a_percent.push(((this.getcomparisonData_a[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_b_percent.push(((this.getcomparisonData_b[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_c_percent.push(((this.getcomparisonData_c[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_d_percent.push(((this.getcomparisonData_d[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_e_percent.push(((this.getcomparisonData_e[i] / validTotal) * 100).toFixed(1));
          this.getcomparisonData_z_percent.push(((this.getcomparisonData_z[i] / validTotal) * 100).toFixed(1));
        }







        if (this.chart3) {
          this.chart3.clear();
          this.chart3.destroy();
        }





        // this.chart3 = new Chart('bandComparison', {
        //   type: 'line', //this denotes tha type of chart
        //   // shared: true,
        //   data: {// values on X-Axis
        //     labels: res.graphLevel,
        //     datasets: [
        //       {
        //         label: "A+",
        //         data: res.list_A_plus,
        //         backgroundColor: '#0cc078',
        //         borderColor: '#0cc078',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "A",
        //         data: res.list_A,
        //         backgroundColor: '#79de79',
        //         borderColor: '#79de79',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "B",
        //         data: res.list_B,
        //         backgroundColor: '#ffd366',
        //         borderColor: '#ffd366',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "C",
        //         data: res.list_C,
        //         backgroundColor: '#ff8439',
        //         borderColor: '#ff8439',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "D",
        //         data: res.list_D,
        //         backgroundColor: '#e97282',
        //         borderColor: '#e97282',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "E",
        //         data: res.list_E,
        //         backgroundColor: '#b40000',
        //         borderColor: '#b40000',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //       {
        //         label: "Zero Business",
        //         data: res.list_E,
        //         backgroundColor: '#800000',
        //         borderColor: '#800000',
        //         borderWidth: 1,
        //         fill: true,
        //       },
        //     ]
        //   },
        //   options: {
        //     layout: {
        //       padding: 10,
        //     },
        //     aspectRatio: 2.2,
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
        //       y: {
        //         stacked: true,
        //         ticks: {
        //           display: false
        //         },
        //         grid: {
        //           display: false
        //         },
        //         title: {
        //           color: 'black',
        //           display: true,
        //           text: 'Total IMds',
        //           font: {
        //             weight: 'normal',// Make the legend labels bold

        //           },
        //         },
        //       },
        //       x: {
        //         grid: {
        //           display: false
        //         },
        //       }
        //     },
        //     interaction: {
        //       mode: 'index'
        //     }

        //   }

        // });









        
          this.bandTrendResponse = res



          // const categories = res.graphLevel; // X-axis labels
          // const bandData = [
          //   { label: 'A+', data: res.list_A_plus, color: '#0cc078' },
          //   { label: 'A', data: res.list_A, color: '#79de79' },
          //   { label: 'B', data: res.list_B, color: '#ffd366' },
          //   { label: 'C', data: res.list_C, color: '#ff8439' },
          //   { label: 'D', data: res.list_D, color: '#e97282' },
          //   { label: 'E', data: res.list_E, color: '#b40000' },
          //   { label: 'Zero Business', data: res.list_Z, color: '#800000' },
          // ];

          // // Prepare Highcharts series dynamically
          // let seriesData = bandData.map((band) => ({
          //   name: band.label,
          //   data: band.data,
          //   color: band.color,
          //   type: 'line', // Use "area" to fill the chart
          //   fillOpacity: 0.6,
          //   marker: {
          //     enabled: false,
          //   },
          // })) as any;

          // // Highcharts configuration
          // const chartOptions: Highcharts.Options = {
          //   chart: {
          //     type: 'line',
          //   },
          //   credits: {
          //     enabled: false,
          //   },
          //   title: {
          //     text: '',
          //   },
          //   xAxis: {
          //     categories: categories,
          //     title: {
          //       text: 'Months',
          //     },
          //   },
          //   yAxis: {
          //     title: {
          //       text: 'Total IMDs',
          //     },
          //     min: 0,
          //   },
          //   tooltip: {
          //     shared: true,
          //     valueSuffix: '',
          //   },
          //   plotOptions: {
          //     area: {
          //       stacking: 'normal', // Stacked area chart
          //     },
          //   },
          //   series: seriesData,
          // };

          // // Render the chart
          // Highcharts.chart('bandComparison', chartOptions);
  


        // this.renderMapChart()
        this.visibleContentById('bandComparison')
        this.getStatewiseGwp()
        

      } else {
        console.log(" I am in else part");
      }
    });
  }




  bandTrendGraphMakingOnly(){

    this.bandTrend_graph_show = true;

    const categories = this.bandTrendResponse.graphLevel; // X-axis labels
    const bandData = [
      { label: 'A+', data: this.bandTrendResponse.list_A_plus, color: '#0cc078' },
      { label: 'A', data: this.bandTrendResponse.list_A, color: '#79de79' },
      { label: 'B', data: this.bandTrendResponse.list_B, color: '#ffd366' },
      { label: 'C', data: this.bandTrendResponse.list_C, color: '#ff8439' },
      { label: 'D', data: this.bandTrendResponse.list_D, color: '#e97282' },
      { label: 'E', data: this.bandTrendResponse.list_E, color: '#b40000' },
      { label: 'Zero Business', data: this.bandTrendResponse.list_Z, color: '#800000' },
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
          text: 'Total IMDs',
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
    this.filter_btn_clicked += 1;
    this.monthName = this.month_selectedItems[0].monthName;
    this.showMonthFlag = true;
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
      this.get_zone_list()
      this.get_state_list()
      this.get_location_list()
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

    this.get_zone_list()
    this.get_state_list()
    this.get_location_list()

    this.getChannelList()
    this.get_subChannelList()
    this.getcomparison();




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



// year_month = this.convertDateFormat(this.month_selectedItems[0].monthVal)

convertDateFormat(dateStr: any) {
  // Split the input string by the dash "-"
  const [month, year] = dateStr.split("-");
  
  // Return the date in YYYY_MM format
  return `${year}_${month}`;
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
        this.zoneWiseBranding()
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
      text: 'Statewise Agent Count and GWP (in Lacs)',
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

                <span style="font-weight: 500;"> Total GWP : </span> <span>${showGpw} L ₹</span> <br>

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

    this.getStateWiseLOBDistPie('', clickedState)
    this.lobContribution = "state"


    this.agentFlagwiseBanding('', clickedState);
    this.lobWiseBranding_Chart('', clickedState);
    this.getAgentBackgroundDistBar('', clickedState)



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

      // this.zoneWiseBranding_Chart = new Chart('zoneWiseBranding_Chart', {
      //   type: 'bar',
      //   data: {
      //     labels: ["EAST", "WEST", "NORTH", "SOUTH"],
      //     datasets: [
      //       {
      //         label: "A+ Count",
      //         data: res.bandingData.Aplus,
      //         backgroundColor: '#0cc078',
      //         borderRadius: 10,
      //         // barThickness: 40,
      //         // categoryPercentage: 0.8
      //       },
      //       {
      //         label: "A Count",
      //         data: res.bandingData.A,
      //         backgroundColor: '#79de79',
      //         borderRadius: 10,
      //         // barThickness: 40,
      //       },
      //       {
      //         label: "B Count",
      //         data: res.bandingData.B,
      //         backgroundColor: '#ffd366',
      //         borderRadius:10,
      //         // barThickness: 40,
      //       },
            
      //       {
      //         label: "C Count",
      //         data: res.bandingData.C,
      //         backgroundColor: '#ff8439',
      //         borderRadius:10,
      //         // barThickness: 40,
      //       },
      //       {
      //         label: "D Count",
      //         data: res.bandingData.D,
      //         backgroundColor: '#e84258',
      //         borderRadius:10,
      //         // barThickness: 40,
      //       },
      //       // {
      //       //   label: "Other",
      //       //   data: res.Other,
      //       //   backgroundColor: 'rgb(152, 3, 252)',
      //       //   borderRadius:10,
      //       //   // barThickness: 40,
      //       // },
      //     ]
      //   },
      //   options: {
      //     layout: {
            
      //       padding: {
      //         top: 10,
      //         bottom:20,
      //       },
      //     },
          
      //     aspectRatio: 1.2,
      //     // responsive: true,
      //     // maintainAspectRatio: false,
          
      //     plugins: {
      //       // datalabels: {
      //       //   align: 'center',
      //       //   anchor: 'center',
      //       //   color: 'black',
      //       //   font: {
      //       //       weight: 'bold'
      //       //   }
      //       // },
            

      //       // datalabels: { // Configure data labels
      //       //   anchor: 'end', // Position at the end of the bar (top)
      //       //   align: 'center', // Horizontally align to the center of the bar
      //       //   offset: 5, // Add some offset from the bar (optional)
      //       //   color: 'black', // Set the label color (optional)
      //       //   font: { // Optional, customize font style
      //       //     weight: 'bold',
      //       //     size: 14,
      //       //   }
      //       // },
            
            
      //       legend: {
      //         title:{
      //           display:true,
      //           text: 'Bands',
      //           // color:'rgb(0, 69, 116)',
      //           color:'rgb(0, 0, 0)',
      //           font:{
      //             weight:'normal',
      //             size: 13,
      //           },
      //         },
      //         position: 'top',
      //         align: 'end',
      //         display: true,
      //         labels: {
      //           color: 'black',
      //           boxWidth: 10,
      //           boxHeight: 10,
      //           font: {
      //             weight: 'normal',
      //           },
      //         },
      //       },
      //       // tooltip: {
      //       //   callbacks: {
      //       //     title: function (context) {
      //       //       // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
      //       //       return res.graphLevel[context[0].dataIndex].toString().replaceAll(',', ' ');
      //       //     }
      //       //   }
      //       // }
      //     },
      //     scales: {
      //       x: {
      //         // stacked: true,
      //         title: {
      //           text: 'ZONE',
      //           color: 'black',
      //           display: true,

      //           font: {
      //             weight: 'bold',
      //             size: 13,
      //           },
      //         },
      //         ticks: {
      //           color: 'black',
      //           display: true,
      //           font: {
      //             weight: 'normal',
      //           },
      //         },
      //         beginAtZero: false,
      //         grid:{
      //           display:false,
      //         },
      //       },
      //       y: {
      //         // stacked: true,
      //         title: {
      //           color: 'black',
      //           display: true,
      //           text: 'Entity Count',
      //           font: {
      //             weight: 'bold',// Make the legend labels bold

      //           },
      //         },
      //         ticks: {
      //           display: false,
      //         },
      //         grid:{
      //           display:false,
      //         },
      //       }
      //     },
      //     interaction: {
      //       mode: 'index'
      //     },
      //     onClick: (event, chartElement) => {
      //       // this.Zh_drillDownStat = true;
      //       const clickedData = chartElement as any
      //       const clickedIndex = chartElement[0].index;
      //       // const datasetIndex = chartElement[0].datasetIndex;
      //       // const label = this.chart12.data.labels[clickedIndex];
      //       // const value = this.chart12.data.datasets[datasetIndex].data[clickedIndex];
      //       console.log('chartElement:---------->>>>', clickedIndex);
      //       let zone = ''
      //       if(clickedIndex == 0){zone = 'EAST'}
      //       if(clickedIndex == 1){zone = 'WEST'}
      //       if(clickedIndex == 2){zone = 'NORTH'}
      //       if(clickedIndex == 3){zone = 'SOUTH'}
      //       this.brandingPiechart_status = true
      //       this.pieChartFor = 'zone'
      //       this.state_branding_pie = ''

      //       this.zone_branding_pie = zone
      //       this.lobContribution = 'zone'

      //       this.zone_selectedItems = [{ZONE: zone}]
      //       this.state_selectedItems = []

      //       // this.getBandingPie(zone, '')
      //       this.getBandingPie_hc(zone, '')

      //       this.getStateWiseLOBDistPie(zone, '')



      //       this.agentFlagwiseBanding(zone, '');
      //       this.lobWiseBranding_Chart(zone, '');
      //       this.getAgentBackgroundDistBar(zone, '')


      //       this.blurContentById('getBandingPie_chart_hc')
      //       this.blurContentById('getStateWiseLOBDistPie_highchart')
      //       this.blurContentById('agentFlagwiseBanding')
      //       this.blurContentById('lob_Wise_Branding_Chart')
      //       this.blurContentById('getAgentBackgroundDistBar_chart')

            
      //     }
      //   },
      //   plugins: [this.plugin, topLables, this.legendMarging],

      // });
      // this.chart.push(this.zoneWiseBranding_Chart);



















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
            {
              name: 'Zero Business',
              data: res.bandingData['Zero business'],
              // color: '#e84258',
              type: 'column',
          },
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
  this.getStateWiseLOBDistPie(clickedZone, '');
  this.agentFlagwiseBanding(clickedZone, '');
  this.lobWiseBranding_Chart(clickedZone, '');
  this.getAgentBackgroundDistBar(clickedZone, '');



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
        if(label == 'Zero Business'){ value = res.bandingData['Zero business']}


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


filteBtn(){
  this.brandingPiechart_status = false
  this.lobContribution = 'india'


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
  this.getHeroAgents(); 
  this.getBottomAgents();

  // this.getStatewiseGwp(); // this is called under getcomparison()

  
  this.filterCounter();
  this.clearAllDetails();
  this.storeFilter();
  
  this.agentFlagwiseBanding('', '')
  this.getAgentBackgroundDistBar('','')
  this.lobWiseBranding_Chart('','')

  // this.getStateWiseLOBDistPie()
  this.getStateWiseLOBDistPie('', '')
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
                  text: 'Vintage', // X-axis title
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
              {
                name: 'Zero Business',
                data: res.bandingData['Zero business'],
                // color: '#ff928b',
                type: 'column',
              },
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
        // this.lob_Wise_Branding_Chart = new Chart('lob_Wise_Branding_Chart', {
        //   type: 'bar',
        //   data: {
        //     labels: res.level_data,
        //     datasets: [
        //       {
        //         label: "A+",
        //         data: res.bandingData.Aplus,
        //         // backgroundColor: '#20b0b1',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
        //       },
        //       {
        //         label: "A",
        //         data: res.bandingData.A,
        //         // backgroundColor: '#f7f383',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
        //       },
        //       {
        //         label: "B",
        //         data: res.bandingData.B,
        //         // backgroundColor: '#ad7cb8',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
        //       },
        //       {
        //         label: "C",
        //         data: res.bandingData.C,
        //         // backgroundColor: '#dd78ae',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
                
        //       },
        //       {
        //         label: "D",
        //         data: res.bandingData.D,
        //         // backgroundColor: '#ff928b',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
                
        //       },
        //       {
        //         label: "E",
        //         data: res.bandingData.E,
        //         // backgroundColor: '#ff928b',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
                
        //       },
        //       {
        //         label: "Zero Business",
        //         data: res.bandingData['Zero business'],
        //         // backgroundColor: '#ff928b',
        //         borderRadius:10,
        //         // barThickness: 30,
        //         maxBarThickness:35,
                
        //       },
        //     ]
        //   },
        //   options: {
        //     layout: {
        //       padding: {
        //         top: 10,
        //         bottom:30,
        //       },
        //     },
        //     aspectRatio: 1.2,
        //     // responsive: true,
        //     // maintainAspectRatio: false,
            

        //     plugins: {
        //       legend: {
        //         title:{
        //           display:true,
        //           text: 'Bands',
        //           color:'rgb(0, 0, 0)',
        //           font:{
        //             weight:'normal',
        //             size: 13,
        //           },
        //         },
        //         position: 'top',
        //         align: 'end',
        //         display: true,
        //         labels: {
        //           color: 'black',
        //           boxWidth: 10,
        //           boxHeight: 10,
        //           font: {
        //             weight: 'normal',
        //           },
        //         },
        //       },
        //       tooltip: {
        //         callbacks: {
        //           title: function (context) {
        //             // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
        //             return res.level_data[context[0].dataIndex].toString().replaceAll(',', ' ');
        //           }
        //         }
        //       }
        //     },
        //     scales: {
        //       x: {
        //         // stacked: true,
        //         title: {
        //           text: 'LOB',
        //           color: 'black',
        //           display: true,

        //           font: {
        //             weight: 'bold',
        //             size: 13,
        //           },
        //         },
        //         ticks: {
        //           color: 'black',
        //           display: true,
        //           font: {
        //             weight: 'normal',
        //           },
        //         },
        //         beginAtZero: false,
        //         grid:{
        //           display:false,
        //         },
        //       },
        //       y: {
        //         // stacked: true,
        //         // beginAtZero: true,
        //         title: {
        //           color: 'black',
        //           display: true,
        //           text: 'Entity Count',
        //           font: {
        //             weight: 'bold',// Make the legend labels bold

        //           },
        //         },
        //         ticks: {
        //           display: false,
        //         },
        //         grid:{
        //           display:false,
        //         },
        //       }
        //     },
        //     interaction: {
        //       mode: 'index'
        //     }
        //   },
        //   // plugins: [this.plugin, topLables, this.legendMarging],
        //   plugins: [this.plugin,  this.legendMarging, topLables],

        // });
        // this.chart.push(this.lob_Wise_Branding_Chart);








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
            {
              type: 'column',
              name: 'Zero Business',
              data: res.bandingData['Zero business'],
              // color: '#ff928b' // Color for Zero Business
            }
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

              name: 'Entity Count',
      
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
        // this.getAgentBackgroundDistBar_chart = new Chart('getAgentBackgroundDistBar_chart', {
        //   type: 'bar',
        //   data: {
        //     labels: res.level_data,
        //     datasets: [
        //       {
        //         label: "Entity Count",
        //         data: res.imdData.IMD_COUNT,
        //         backgroundColor: '#8a66b0',
        //         // barThickness: 10,
        //         borderRadius:10,
        //       },
        //       // {
        //       //   label: "MTD GWP",
        //       //   data: res.CurrentMonthList,
        //       //   backgroundColor: 'rgb(54, 162, 235)'
        //       // }
        //     ]
        //   },
        //   options: {
        //     layout: {
        //       padding: {
        //         top: 10,
        //       },
        //     },
        //     aspectRatio: 1.2,
        //     plugins: {
        //       legend: {
        //         position: 'top',
        //         align: 'end',
        //         display: true,
        //         labels: {
        //           color: 'black',
        //           boxWidth: 10,
        //           boxHeight: 10,
        //           font: {
        //             weight: 'normal',
        //           }
        //         }
        //       },
        //       tooltip: {
        //         callbacks: {
        //           title: function (context) {
        //             // console.log("context>>", res.subChannelList[context[0].dataIndex].toString().replaceAll(',',''));
        //             return res.level_data[context[0].dataIndex].toString().replaceAll(',', ' ');
        //           }
        //         }
        //       }
        //     },
        //     scales: {
        //       x: {
        //         title: {
        //           text: 'Agent Background',
        //           color: 'black',
        //           display: false,

        //           font: {
        //             weight: 'bold',
        //             size: 13,
        //           },
        //         },
        //         ticks: {
        //           color: 'black',
        //           display: true,
        //           font: {
        //             weight: 'normal',
        //             size: 12,
        //           },
        //         },
        //         grid:{
        //           display:false,
        //         },
        //       },
        //       y: {
        //         title: {
        //           color: 'black',
        //           display: true,
        //           text: 'Entity Count',
        //           font: {
        //             weight: 'bold',// Make the legend labels bold

        //           },
        //         },
        //         ticks: {
        //           color: 'black',
        //           display: false,
        //           font: {
        //             weight: 'normal',
        //           },
        //         },
        //         grid:{
        //           display:false,
        //         },
        //       }
        //     },
        //     interaction: {
        //       mode: 'index'
        //     },
        //     // onClick: (event, chartElement) => {
        //     //   this.Zh_drillDownStat = true;
        //     //   const clickedIndex = chartElement[0].index;
        //     //   const datasetIndex = chartElement[0].datasetIndex;
        //     //   const label = this.chart12.data.labels[clickedIndex];
        //     //   const value = this.chart12.data.datasets[datasetIndex].data[clickedIndex];
        //     //   // console.log('Clicked on bar:', label, 'with value:', value);

        //     //   let concatenatedString = label.join(' ');
        //     //   this.zh_name = concatenatedString

        //     //   // this.zh_name = label

        //     //   this.zh_lobAndLevelwisePieChart()
        //     // }
        //   },
          
        //   plugins: [this.plugin, topLables, this.legendMarging],

        // });
        // this.chart.push(this.getAgentBackgroundDistBar_chart);







        // const chartOptions: Highcharts.Options = {
        //   chart: {
        //     type: 'column', // Column chart type
        //     // height: 'auto', // Auto height
        //     // width: null, // No specific width
        //     // margin: [0, 0, 0, 0], // Remove margins
        //     // marginTop: 0,
        //     // marginBottom: 0,
        //     // marginLeft: 0,
        //     // marginRight: 0
        //   },
        //   title: {
        //     text: '', // Title for the chart
        //   },
        //   credits: {
        //     enabled: false // Disable credits (e.g., Highcharts logo)
        //   },
        //   xAxis: {
        //     categories: res.level_data, // X-axis categories (based on level_data)
        //     title: {
        //       text: 'Category', // Title for X-axis
        //       style: {
        //         fontWeight: 'bold',
        //         fontSize: '13px',
        //         color: 'black'
        //       }
        //     },
        //     labels: {
        //       style: {
        //         color: 'black',
        //         fontWeight: 'normal'
        //       }
        //     },
        //     gridLineWidth: 0 // Remove gridlines
        //   },
        //   yAxis: {
        //     title: {
        //       text: 'IMD Count', // Title for Y-axis
        //       style: {
        //         fontWeight: 'bold',
        //         fontSize: '13px',
        //         color: 'black'
        //       }
        //     },
        //     labels: {
        //       style: {
        //         color: 'black'
        //       }
        //     },
        //     gridLineWidth: 1 // Keep gridlines for better readability
        //   },
        //   // legend: {
        //   //   title: {
        //   //     text: 'IMD Count', // Title for the legend
        //   //     style: {
        //   //       fontWeight: 'normal',
        //   //       fontSize: '13px',
        //   //       color: 'black'
        //   //     }
        //   //   },
        //   //   align: 'end', // Align the legend to the end
        //   //   verticalAlign: 'top', // Position legend on top
        //   //   layout: 'horizontal',
        //   //   itemStyle: {
        //   //     fontWeight: 'normal',
        //   //     fontSize: '13px',
        //   //     color: 'black'
        //   //   }
        //   // },
        //   tooltip: {
        //     shared: true, // Shared tooltip across series
        //     formatter: function() {
        //       return `IMD Count: ${this.point.y}`;
        //     }
        //   },
        //   plotOptions: {
        //     series: {
        //       // borderRadius: 10, // Bar corner radius
        //       // maxPointWidth: 35, // Max bar thickness
        //       dataLabels: {
        //           enabled: true,
        //           style: {
        //               fontSize: '12px',
        //           },
        //       },
        //     },
        //     column: {
        //       borderRadius: 5, // Round the corners of the columns
        //       maxPointWidth: 60, // Max width for columns
        //     }
        //   },
        //   series: [
        //     {
        //       type: 'column',
        //       name: 'IMD Count',
        //       data: res.imdData.IMD_COUNT, // Data for the IMD_COUNT
        //       color: '#4CAF50' // Color for the columns
        //     }
        //   ]
        // };




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
 



    this.zoneWiseBranding(); 
    this.backToIndiaLOBcontri();

    this.agentFlagwiseBanding('', '')
    this.getStateWiseLOBDistPie('', '')
    this.getAgentBackgroundDistBar('','')
    this.lobWiseBranding_Chart('','')

    



  }











  



  // clearContentById(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.innerHTML = 'loading...';
  //   }
  // }
  blurContentById(id: string) {
    const element = document.getElementById(id);
    if (element) {
        element.style.opacity = '0.2';
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
        this.mtd_ytd_ftm_data = res.data
      } else{

      }
    })


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









  
  


}
