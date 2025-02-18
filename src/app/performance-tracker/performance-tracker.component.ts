import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SideNavStatusService } from '../side-nav-status.service';
import * as Highcharts from 'highcharts';
// import SolidGauge from 'highcharts/modules/solid-gauge';
// SolidGauge(Highcharts); // Initialize the SolidGauge module

// import Bullet from 'highcharts/modules/bullet';
import BulletModule from 'highcharts/modules/bullet';
// Initialize the module
BulletModule(Highcharts);


import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-performance-tracker',
  templateUrl: './performance-tracker.component.html',
  styleUrls: ['./performance-tracker.component.css']
})
export class PerformanceTrackerComponent implements OnInit, AfterViewInit {



  




  userAgentId = this.common.getUserAgentId();
  // imdChannel_dropdownList = [] as any;
  // imdChannel_selectedItems = [] as any;
  // imdChannel_dropdownSettings: IDropdownSettings = {} as any

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




    // this.category_dropdownSettings = {
    //   singleSelection: true,
    //   idField: 'catName',
    //   textField: 'catName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // }
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

    // this.imdChannel_dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'CHANNEL',
    //   textField: 'CHANNEL',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // }

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



  showPrevious = false;
  openedSection = 'gwp' as any;
  gwp_all = false as any;
  imd_all = false as any;


  opened_gwp_section = "" as any;
  opened_imd_section = '' as any;











  


  @ViewChild('topline_chartContainer1', { static: false }) topline_chartContainer1!: ElementRef;
  @ViewChild('topline_chartContainer2', { static: false }) topline_chartContainer2!: ElementRef;
  @ViewChild('topline_chartContainer3', { static: false }) topline_chartContainer3!: ElementRef;

  @ViewChild('health_chartContainer1', { static: false }) health_chartContainer1!: ElementRef;
  @ViewChild('health_chartContainer2', { static: false }) health_chartContainer2!: ElementRef;
  @ViewChild('health_chartContainer3', { static: false }) health_chartContainer3!: ElementRef;

  @ViewChild('frh_chartContainer1', { static: false }) frh_chartContainer1!: ElementRef;
  @ViewChild('frh_chartContainer2', { static: false }) frh_chartContainer2!: ElementRef;
  @ViewChild('frh_chartContainer3', { static: false }) frh_chartContainer3!: ElementRef;

  @ViewChild('pvtcar_chartContainer1', { static: false }) pvtcar_chartContainer1!: ElementRef;
  @ViewChild('pvtcar_chartContainer2', { static: false }) pvtcar_chartContainer2!: ElementRef;
  @ViewChild('pvtcar_chartContainer3', { static: false }) pvtcar_chartContainer3!: ElementRef;

  @ViewChild('ropc_chartContainer1', { static: false }) ropc_chartContainer1!: ElementRef;
  @ViewChild('ropc_chartContainer2', { static: false }) ropc_chartContainer2!: ElementRef;
  @ViewChild('ropc_chartContainer3', { static: false }) ropc_chartContainer3!: ElementRef;

  @ViewChild('property_chartContainer1', { static: false }) property_chartContainer1!: ElementRef;
  @ViewChild('property_chartContainer2', { static: false }) property_chartContainer2!: ElementRef;
  @ViewChild('property_chartContainer3', { static: false }) property_chartContainer3!: ElementRef;

  @ViewChild('activation_chartContainer1', { static: false }) activation_chartContainer1!: ElementRef;
  @ViewChild('activation_chartContainer2', { static: false }) activation_chartContainer2!: ElementRef;
  @ViewChild('activation_chartContainer3', { static: false }) activation_chartContainer3!: ElementRef;

  @ViewChild('recruitment_chartContainer1', { static: false }) recruitment_chartContainer1!: ElementRef;
  @ViewChild('recruitment_chartContainer2', { static: false }) recruitment_chartContainer2!: ElementRef;
  @ViewChild('recruitment_chartContainer3', { static: false }) recruitment_chartContainer3!: ElementRef;






















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












  getMiddleProgressStyles(value: number) {
    const isNegative = value < 0;
    return {
      '--progress': Math.abs(value), // Use absolute value for progress
      '--progress-color': isNegative ? '#ff4d4f' : '#00e272', // Red for negative, green for positive
      '--background-color': isNegative ? '#ffd6d6' : '#baffdd', // Light red for negative, light green for positive
      // '--rotation-offset': isNegative ? '90deg' : '0deg' // Start at 12 o'clock for negative, 0 for positive
    };
  }
  



  // Values for progress bars
  outerProgress = 100; // 75% for outer bar
  middleProgress: number = 50; // 50% for middle bar 
  centerText: string = '37%';  // Center text for the inner progress bar
































  


  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
  panelOpenState6 = false;
  panelOpenState7 = false;
  panelOpenState8 = false;

  // topLine_table_data: any
  topLine_table_data = {
    "monthNameonly": "",
    "retailAsOn": "",
    "currentMonth": "",
    "prevMonth": "",
    "lastYearCurrentMonth": "",
    "lastYearPrevMonth": "",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",
        "ftmAop_and_projection": {
          "aop":0,
          "base": 0,
          "aspirational": 0,
          "growthOnAopPercentage": 0,
          "projection": 0,
        },

        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "growthPercentage": 0,
        },

        "percentageAchievement": {
          "mtd_on_aop_percentage": 0,
          "mtd_on_projection_percentage": 0,
          "mtd_on_aspirational_percentage": 0,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "dar": 0,
          "crr": 0,
        },

        "ftm": {
          "currentMonth_ftm": 0,
          "ftm_on_aop_percentage": 0,
          "ftm_on_projection_percentage": 0,
          "ftm_on_aspirational_percentage": 0,
        },

        "ytd": {
          "aop": 0,
          "aspirational": 0,          
          "cy": 0,
          "ly": 0,
          "achd_aop_percentage": 0,
          "achd_aspirational_percentage": 0,
          "growth_Percentage": 0,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "aop": 0,
          "base": 0,
          "aspirational": 0,
          "growthOnAopPercentage": 0,
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0,
          "mtd_on_projection_percentage": 0,
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "dar": 0,
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0,
          "ftm_on_aop_percentage": 0,
          "ftm_on_projection_percentage": 0,
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0,
          "aspirational": 0,
          "cy": 0,
          "ly": 0,
          "achd_aop_percentage": 0,
          "achd_aspirational_percentage": 0,
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "aop": 0,
          "base": 0,
          "aspirational": 0,
          "growthOnAopPercentage": 0,
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd":0,
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0,
          "mtd_on_projection_percentage": 0,
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "dar": 0,
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0,
          "ftm_on_aop_percentage": 0,
          "ftm_on_projection_percentage": 0,
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0,
          "aspirational": 0,
          "cy": 0,
          "ly": 0,
          "achd_aop_percentage": 0,
          "achd_aspirational_percentage": 0,
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "aop": 0,
          "base": 0,
          "aspirational": 0,
          "growthOnAopPercentage": 0,
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0,
          "mtd_on_projection_percentage": 0,
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "dar": 0,
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0,
          "ftm_on_aop_percentage": 0,
          "ftm_on_projection_percentage": 0,
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0,
          "aspirational": 0,
          "cy": 0,
          "ly": 0,
          "achd_aop_percentage": 0,
          "achd_aspirational_percentage": 0,
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "aop": 0,
          "base": 0,
          "aspirational": 0,
          "growthOnAopPercentage": 0,
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0,
          "mtd_on_projection_percentage": 0,
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "dar": 0,
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0,
          "ftm_on_aop_percentage": 0,
          "ftm_on_projection_percentage": 0,
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0,
          "aspirational": 0,
          "cy": 0,
          "ly": 0,
          "achd_aop_percentage": 0,
          "achd_aspirational_percentage": 0,
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    },

    "retailTotal": {
      "name": "Retail Total",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    }
  } as any;


//   topLine_table_data = {
//     "currentMonth": "Jan'25",
//     "lastYearCurrentMonth": "Jan'24",
//     "lastYearPrevMonth": "Dec'23",
//     "monthNameonly": "Jan",
//     "prevMonth": "Dec'24",
//     "retailAsOn": "06th Jan'25",
//     "retailSubChannels": [
//         {
//             "contributingImdCountMtd": {
//                 "currentMonth_imdCount": 4,
//                 "growthOverLm_percentage": -20.0,
//                 "growthOverLy_percentage": 0.0,
//                 "lastYearCurrentMonth_imdCount": 4,
//                 "prevMonth_imdCount": 5
//             },
//             "ftm": {
//                 "currentMonth_ftm": 20294.03,
//                 "ftm_on_aop_percentage": -0.75,
//                 "ftm_on_aspirational_percentage": 811.36,
//                 "ftm_on_projection_percentage": 0
//             },
//             "ftmAop_and_projection": {
//                 "aop": 5038.35,
//                 "aspirational": 2501.25,
//                 "base": 20294.03,
//                 "growthOnAopPercentage": -75.0,
//                 "projection": 0
//             },
//             "mtd": {
//                 "currentMonth_mtd": 18215.77,
//                 "growthPercentage": 33.0,
//                 "lastYearCurrentMonth_mtd": 13653.89
//             },
//             "name": "GROWTH MARKETS",
//             "percentageAchievement": {
//                 "mtd_on_aop_percentage": 361.54,
//                 "mtd_on_aspirational_percentage": 728.27,
//                 "mtd_on_projection_percentage": 0
//             },
//             "runRateOnMtdAndFtdBook": {
//                 "crr": 811.36,
//                 "dar": 0,
//                 "ftd": -0.75
//             },
//             "ytd": {
//                 "achd_aop_percentage": 0.0,
//                 "achd_aspirational_percentage": 0,
//                 "aop": 88714.08,
//                 "aspirational": 0,
//                 "cy": 0,
//                 "growth_Percentage": -100.0,
//                 "ly": 116621.03
//             }
//         },
//         {
//             "contributingImdCountMtd": {
//                 "currentMonth_imdCount": 5,
//                 "growthOverLm_percentage": 0.0,
//                 "growthOverLy_percentage": 25.0,
//                 "lastYearCurrentMonth_imdCount": 4,
//                 "prevMonth_imdCount": 5
//             },
//             "ftm": {
//                 "currentMonth_ftm": 20854.58,
//                 "ftm_on_aop_percentage": -0.28,
//                 "ftm_on_aspirational_percentage": 833.77,
//                 "ftm_on_projection_percentage": 0
//             },
//             "ftmAop_and_projection": {
//                 "aop": 15002.75,
//                 "aspirational": 2501.25,
//                 "base": 20854.58,
//                 "growthOnAopPercentage": -28.0,
//                 "projection": 0
//             },
//             "mtd": {
//                 "currentMonth_mtd": 24837.32,
//                 "growthPercentage": 59.0,
//                 "lastYearCurrentMonth_mtd": 15637.81
//             },
//             "name": "ENTERPRISE PARTNERS",
//             "percentageAchievement": {
//                 "mtd_on_aop_percentage": 165.55,
//                 "mtd_on_aspirational_percentage": 993.0,
//                 "mtd_on_projection_percentage": 0
//             },
//             "runRateOnMtdAndFtdBook": {
//                 "crr": 833.77,
//                 "dar": 0,
//                 "ftd": -0.28
//             },
//             "ytd": {
//                 "achd_aop_percentage": 0.0,
//                 "achd_aspirational_percentage": 0,
//                 "aop": 97903.04,
//                 "aspirational": 0,
//                 "cy": 0,
//                 "growth_Percentage": -100.0,
//                 "ly": 126256.8
//             }
//         },
//         {
//             "contributingImdCountMtd": {
//                 "currentMonth_imdCount": 0,
//                 "growthOverLm_percentage": -10.0,
//                 "growthOverLy_percentage": 12.0,
//                 "lastYearCurrentMonth_imdCount": 0,
//                 "prevMonth_imdCount": 0
//             },
//             "ftm": {
//                 "currentMonth_ftm": 41148.61,
//                 "ftm_on_aop_percentage": -0.51,
//                 "ftm_on_aspirational_percentage": 822.56,
//                 "ftm_on_projection_percentage": 0
//             },
//             "ftmAop_and_projection": {
//                 "aop": 20041.1,
//                 "aspirational": 5002.5,
//                 "base": 41148.61,
//                 "growthOnAopPercentage": -51.0,
//                 "projection": 0
//             },
//             "mtd": {
//                 "currentMonth_mtd": 43053.09,
//                 "growthPercentage": 47.0,
//                 "lastYearCurrentMonth_mtd": 29291.7
//             },
//             "name": "Retail Total",
//             "percentageAchievement": {
//                 "mtd_on_aop_percentage": 214.82,
//                 "mtd_on_aspirational_percentage": 993.0,
//                 "mtd_on_projection_percentage": 0
//             },
//             "runRateOnMtdAndFtdBook": {
//                 "crr": 822.56,
//                 "dar": 0,
//                 "ftd": -0.51
//             },
//             "ytd": {
//                 "achd_aop_percentage": 0.0,
//                 "achd_aspirational_percentage": 0,
//                 "aop": 186617.12,
//                 "aspirational": 0,
//                 "cy": 0,
//                 "growth_Percentage": -100.0,
//                 "ly": 242877.83
//             }
//         }
//     ],
//     "success": true
// } as any;









  health_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",
        "ftmAop_and_projection": {
          "aop":132.29,
          "base": 105.18,
          "growthOnAopPercentage": 26,
          "projection": 140.05,
        },

        "mtd": {
          "currentMonth_mtd": 68.32,
          "lastYearCurrentMonth_mtd": 50.61,
          "growthPercentage": 35,
        },

        "percentageAchievement": {
          "mtd_on_aop_percentage": 52,
          "mtd_on_projection_percentage": 49,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "dar": 4.92,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 45,
          "ftm_on_aop_percentage": 62,
          "ftm_on_projection_percentage": 58,
        },

        "ytd": {
          "aop": 854.67,
          "aspirational": 894.31,          
          "cy": 25.86,
          "ly": 25.03,
          "achd_aop_percentage": 88,
          "achd_aspirational_percentage": 84,
          "growth_Percentage": 13,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 1031,
          "prevMonth_imdCount": 1010,
          "lastYearCurrentMonth_imdCount": 972,
          "growthOverLm_percentage": 2,
          "growthOverLy_percentage": 6,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "aop": 51.14,
          "base": 41.44,
          "aspirational": 53.47,
          "growthOnAopPercentage": 23,
          "projection": 48.20
        },
        "mtd": {
          "currentMonth_mtd": 18.77,
          "lastYearCurrentMonth_mtd": 18.17,
          "growthPercentage": 3
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 37,
          "mtd_on_projection_percentage": 39,
          "mtd_on_aspirational_percentage": 35
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.45,
          "dar": 2.49,
          "crr": 1.34
        },
        "ftm": {
          "currentMonth_ftm": 23.95,
          "ftm_on_aop_percentage": 47,
          "ftm_on_projection_percentage": 50,
          "ftm_on_aspirational_percentage": 45
        },
        "ytd": {
          "aop": 354.75,
          "aspirational": 370.37,
          "cy": 269.75,
          "ly": 261.30,
          "achd_aop_percentage": 76,
          "achd_aspirational_percentage": 73,
          "growth_Percentage": 3
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 4601,
          "prevMonth_imdCount": 4535,
          "lastYearCurrentMonth_imdCount": 5209,
          "growthOverLm_percentage": 1,
          "growthOverLy_percentage": -12
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "aop": 67.90,
          "base": 60.12,
          "aspirational": 70.60,
          "growthOnAopPercentage": 13,
          "projection": 46.91
        },
        "mtd": {
          "currentMonth_mtd": 19.17,
          "lastYearCurrentMonth_mtd": 27.77,
          "growthPercentage": -31
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 28,
          "mtd_on_projection_percentage": 41,
          "mtd_on_aspirational_percentage": 27
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.28,
          "dar": 3.75,
          "crr": 1.37
        },
        "ftm": {
          "currentMonth_ftm": 26.33,
          "ftm_on_aop_percentage": 39,
          "ftm_on_projection_percentage": 56,
          "ftm_on_aspirational_percentage": 37
        },
        "ytd": {
          "aop": 465.19,
          "aspirational": 480.40,
          "cy": 248.96,
          "ly": 352.41,
          "achd_aop_percentage": 54,
          "achd_aspirational_percentage": 52,
          "growth_Percentage": -29
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2942,
          "prevMonth_imdCount": 2941,
          "lastYearCurrentMonth_imdCount": 3916,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": -25
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "aop": 97.81,
          "base": 83.72,
          "aspirational": 102.81,
          "growthOnAopPercentage": 17,
          "projection": 98.95
        },
        "mtd": {
          "currentMonth_mtd": 22.80,
          "lastYearCurrentMonth_mtd": 30.16,
          "growthPercentage": -24
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 23,
          "mtd_on_projection_percentage": 23,
          "mtd_on_aspirational_percentage": 22
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.64,
          "dar": 5.77,
          "crr": 1.63
        },
        "ftm": {
          "currentMonth_ftm": 32.29,
          "ftm_on_aop_percentage": 33,
          "ftm_on_projection_percentage": 33,
          "ftm_on_aspirational_percentage": 31
        },
        "ytd": {
          "aop": 468.93,
          "aspirational": 498.93,
          "cy": 377.69,
          "ly": 346.02,
          "achd_aop_percentage": 81,
          "achd_aspirational_percentage": 76,
          "growth_Percentage": 9
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 321,
          "prevMonth_imdCount": 331,
          "lastYearCurrentMonth_imdCount": 323,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": -1
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "aop": 25.95,
          "base": 21.62,
          "aspirational": 27.19,
          "growthOnAopPercentage": 20,
          "projection": 25.35
        },
        "mtd": {
          "currentMonth_mtd": 11.53,
          "lastYearCurrentMonth_mtd": 9.63,
          "growthPercentage": 20
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 44,
          "mtd_on_projection_percentage": 45,
          "mtd_on_aspirational_percentage": 42
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.03,
          "dar": 1.11,
          "crr": 0.82
        },
        "ftm": {
          "currentMonth_ftm": 15.41,
          "ftm_on_aop_percentage": 59,
          "ftm_on_projection_percentage": 61,
          "ftm_on_aspirational_percentage": 57
        },
        "ytd": {
          "aop": 171.51,
          "aspirational": 179.69,
          "cy": 158.75,
          "ly": 137.01,
          "achd_aop_percentage": 93,
          "achd_aspirational_percentage": 88,
          "growth_Percentage": 16
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2014,
          "prevMonth_imdCount": 2068,
          "lastYearCurrentMonth_imdCount": 1987,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": 1
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    },

    "retailTotal": {
      "name": "Retail Total",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    }
  } as any;








  frh_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",
        "ftmAop_and_projection": {
          "aop":132.29,
          "base": 105.18,
          "aspirational": 133.15,
          "growthOnAopPercentage": 26,
          "projection": 140.05,
        },

        "mtd": {
          "currentMonth_mtd": 68.32,
          "lastYearCurrentMonth_mtd": 50.61,
          "growthPercentage": 35,
        },

        "percentageAchievement": {
          "mtd_on_aop_percentage": 52,
          "mtd_on_projection_percentage": 49,
          "mtd_on_aspirational_percentage": 51,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "dar": 4.92,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 45,
          "ftm_on_aop_percentage": 62,
          "ftm_on_projection_percentage": 58,
          "ftm_on_aspirational_percentage": 61,
        },

        "ytd": {
          "aop": 854.67,
          "aspirational": 894.31,          
          "cy": 25.86,
          "ly": 25.03,
          "achd_aop_percentage": 88,
          "achd_aspirational_percentage": 84,
          "growth_Percentage": 13,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 1031,
          "prevMonth_imdCount": 1010,
          "lastYearCurrentMonth_imdCount": 972,
          "growthOverLm_percentage": 2,
          "growthOverLy_percentage": 6,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "aop": 51.14,
          "base": 41.44,
          "aspirational": 53.47,
          "growthOnAopPercentage": 23,
          "projection": 48.20
        },
        "mtd": {
          "currentMonth_mtd": 18.77,
          "lastYearCurrentMonth_mtd": 18.17,
          "growthPercentage": 3
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 37,
          "mtd_on_projection_percentage": 39,
          "mtd_on_aspirational_percentage": 35
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.45,
          "dar": 2.49,
          "crr": 1.34
        },
        "ftm": {
          "currentMonth_ftm": 23.95,
          "ftm_on_aop_percentage": 47,
          "ftm_on_projection_percentage": 50,
          "ftm_on_aspirational_percentage": 45
        },
        "ytd": {
          "aop": 354.75,
          "aspirational": 370.37,
          "cy": 269.75,
          "ly": 261.30,
          "achd_aop_percentage": 76,
          "achd_aspirational_percentage": 73,
          "growth_Percentage": 3
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 4601,
          "prevMonth_imdCount": 4535,
          "lastYearCurrentMonth_imdCount": 5209,
          "growthOverLm_percentage": 1,
          "growthOverLy_percentage": -12
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "aop": 67.90,
          "base": 60.12,
          "aspirational": 70.60,
          "growthOnAopPercentage": 13,
          "projection": 46.91
        },
        "mtd": {
          "currentMonth_mtd": 19.17,
          "lastYearCurrentMonth_mtd": 27.77,
          "growthPercentage": -31
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 28,
          "mtd_on_projection_percentage": 41,
          "mtd_on_aspirational_percentage": 27
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.28,
          "dar": 3.75,
          "crr": 1.37
        },
        "ftm": {
          "currentMonth_ftm": 26.33,
          "ftm_on_aop_percentage": 39,
          "ftm_on_projection_percentage": 56,
          "ftm_on_aspirational_percentage": 37
        },
        "ytd": {
          "aop": 465.19,
          "aspirational": 480.40,
          "cy": 248.96,
          "ly": 352.41,
          "achd_aop_percentage": 54,
          "achd_aspirational_percentage": 52,
          "growth_Percentage": -29
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2942,
          "prevMonth_imdCount": 2941,
          "lastYearCurrentMonth_imdCount": 3916,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": -25
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "aop": 97.81,
          "base": 83.72,
          "aspirational": 102.81,
          "growthOnAopPercentage": 17,
          "projection": 98.95
        },
        "mtd": {
          "currentMonth_mtd": 22.80,
          "lastYearCurrentMonth_mtd": 30.16,
          "growthPercentage": -24
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 23,
          "mtd_on_projection_percentage": 23,
          "mtd_on_aspirational_percentage": 22
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.64,
          "dar": 5.77,
          "crr": 1.63
        },
        "ftm": {
          "currentMonth_ftm": 32.29,
          "ftm_on_aop_percentage": 33,
          "ftm_on_projection_percentage": 33,
          "ftm_on_aspirational_percentage": 31
        },
        "ytd": {
          "aop": 468.93,
          "aspirational": 498.93,
          "cy": 377.69,
          "ly": 346.02,
          "achd_aop_percentage": 81,
          "achd_aspirational_percentage": 76,
          "growth_Percentage": 9
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 321,
          "prevMonth_imdCount": 331,
          "lastYearCurrentMonth_imdCount": 323,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": -1
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "aop": 25.95,
          "base": 21.62,
          "aspirational": 27.19,
          "growthOnAopPercentage": 20,
          "projection": 25.35
        },
        "mtd": {
          "currentMonth_mtd": 11.53,
          "lastYearCurrentMonth_mtd": 9.63,
          "growthPercentage": 20
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 44,
          "mtd_on_projection_percentage": 45,
          "mtd_on_aspirational_percentage": 42
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.03,
          "dar": 1.11,
          "crr": 0.82
        },
        "ftm": {
          "currentMonth_ftm": 15.41,
          "ftm_on_aop_percentage": 59,
          "ftm_on_projection_percentage": 61,
          "ftm_on_aspirational_percentage": 57
        },
        "ytd": {
          "aop": 171.51,
          "aspirational": 179.69,
          "cy": 158.75,
          "ly": 137.01,
          "achd_aop_percentage": 93,
          "achd_aspirational_percentage": 88,
          "growth_Percentage": 16
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2014,
          "prevMonth_imdCount": 2068,
          "lastYearCurrentMonth_imdCount": 1987,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": 1
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    },

    "retailTotal": {
      "name": "Retail Total",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    }
  } as any;








  pvtCar_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",
        "ftmAop_and_projection": {
          "aop":132.29,
          "base": 105.18,
          "aspirational": 133.15,
          "growthOnAopPercentage": 26,
          "projection": 140.05,
        },

        "mtd": {
          "currentMonth_mtd": 68.32,
          "lastYearCurrentMonth_mtd": 50.61,
          "growthPercentage": 35,
        },

        "percentageAchievement": {
          "mtd_on_aop_percentage": 52,
          "mtd_on_projection_percentage": 49,
          "mtd_on_aspirational_percentage": 51,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "dar": 4.92,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 45,
          "ftm_on_aop_percentage": 62,
          "ftm_on_projection_percentage": 58,
          "ftm_on_aspirational_percentage": 61,
        },

        "ytd": {
          "aop": 854.67,
          "aspirational": 894.31,          
          "cy": 25.86,
          "ly": 25.03,
          "achd_aop_percentage": 88,
          "achd_aspirational_percentage": 84,
          "growth_Percentage": 13,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 1031,
          "prevMonth_imdCount": 1010,
          "lastYearCurrentMonth_imdCount": 972,
          "growthOverLm_percentage": 2,
          "growthOverLy_percentage": 6,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "aop": 51.14,
          "base": 41.44,
          "aspirational": 53.47,
          "growthOnAopPercentage": 23,
          "projection": 48.20
        },
        "mtd": {
          "currentMonth_mtd": 18.77,
          "lastYearCurrentMonth_mtd": 18.17,
          "growthPercentage": 3
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 37,
          "mtd_on_projection_percentage": 39,
          "mtd_on_aspirational_percentage": 35
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.45,
          "dar": 2.49,
          "crr": 1.34
        },
        "ftm": {
          "currentMonth_ftm": 23.95,
          "ftm_on_aop_percentage": 47,
          "ftm_on_projection_percentage": 50,
          "ftm_on_aspirational_percentage": 45
        },
        "ytd": {
          "aop": 354.75,
          "aspirational": 370.37,
          "cy": 269.75,
          "ly": 261.30,
          "achd_aop_percentage": 76,
          "achd_aspirational_percentage": 73,
          "growth_Percentage": 3
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 4601,
          "prevMonth_imdCount": 4535,
          "lastYearCurrentMonth_imdCount": 5209,
          "growthOverLm_percentage": 1,
          "growthOverLy_percentage": -12
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "aop": 67.90,
          "base": 60.12,
          "aspirational": 70.60,
          "growthOnAopPercentage": 13,
          "projection": 46.91
        },
        "mtd": {
          "currentMonth_mtd": 19.17,
          "lastYearCurrentMonth_mtd": 27.77,
          "growthPercentage": -31
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 28,
          "mtd_on_projection_percentage": 41,
          "mtd_on_aspirational_percentage": 27
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.28,
          "dar": 3.75,
          "crr": 1.37
        },
        "ftm": {
          "currentMonth_ftm": 26.33,
          "ftm_on_aop_percentage": 39,
          "ftm_on_projection_percentage": 56,
          "ftm_on_aspirational_percentage": 37
        },
        "ytd": {
          "aop": 465.19,
          "aspirational": 480.40,
          "cy": 248.96,
          "ly": 352.41,
          "achd_aop_percentage": 54,
          "achd_aspirational_percentage": 52,
          "growth_Percentage": -29
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2942,
          "prevMonth_imdCount": 2941,
          "lastYearCurrentMonth_imdCount": 3916,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": -25
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "aop": 97.81,
          "base": 83.72,
          "aspirational": 102.81,
          "growthOnAopPercentage": 17,
          "projection": 98.95
        },
        "mtd": {
          "currentMonth_mtd": 22.80,
          "lastYearCurrentMonth_mtd": 30.16,
          "growthPercentage": -24
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 23,
          "mtd_on_projection_percentage": 23,
          "mtd_on_aspirational_percentage": 22
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.64,
          "dar": 5.77,
          "crr": 1.63
        },
        "ftm": {
          "currentMonth_ftm": 32.29,
          "ftm_on_aop_percentage": 33,
          "ftm_on_projection_percentage": 33,
          "ftm_on_aspirational_percentage": 31
        },
        "ytd": {
          "aop": 468.93,
          "aspirational": 498.93,
          "cy": 377.69,
          "ly": 346.02,
          "achd_aop_percentage": 81,
          "achd_aspirational_percentage": 76,
          "growth_Percentage": 9
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 321,
          "prevMonth_imdCount": 331,
          "lastYearCurrentMonth_imdCount": 323,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": -1
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "aop": 25.95,
          "base": 21.62,
          "aspirational": 27.19,
          "growthOnAopPercentage": 20,
          "projection": 25.35
        },
        "mtd": {
          "currentMonth_mtd": 11.53,
          "lastYearCurrentMonth_mtd": 9.63,
          "growthPercentage": 20
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 44,
          "mtd_on_projection_percentage": 45,
          "mtd_on_aspirational_percentage": 42
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.03,
          "dar": 1.11,
          "crr": 0.82
        },
        "ftm": {
          "currentMonth_ftm": 15.41,
          "ftm_on_aop_percentage": 59,
          "ftm_on_projection_percentage": 61,
          "ftm_on_aspirational_percentage": 57
        },
        "ytd": {
          "aop": 171.51,
          "aspirational": 179.69,
          "cy": 158.75,
          "ly": 137.01,
          "achd_aop_percentage": 93,
          "achd_aspirational_percentage": 88,
          "growth_Percentage": 16
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2014,
          "prevMonth_imdCount": 2068,
          "lastYearCurrentMonth_imdCount": 1987,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": 1
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    },

    "retailTotal": {
      "name": "Retail Total",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    }
  } as any;





  transformJson_ropc(json1: any) {
    const {
      monthNameonly,
      retailAsOn,
      currentMonth,
      prevMonth,
      lastYearCurrentMonth,
      lastYearPrevMonth,
    } = json1;
  
    const retailSubChannels = json1.retail_sub_channels
      .filter(
        (subChannel:any) =>
          subChannel.name !== "BROKERS" &&
          subChannel.name !== "MULTILINE" &&
          subChannel.name !== "Total"
      )
      .map((subChannel:any) => ({
        ...subChannel,
        mtd: {
          ...subChannel.mtd,
          ach_on_projection_percentage:
            subChannel.ftmAop_and_projection.projection > 0
              ? (subChannel.mtd.currentMonth_mtd /
                  subChannel.ftmAop_and_projection.projection) *
                100
              : 0,
        },
        ftm: {
          ...subChannel.ftm,
          ach_on_projection_percentage:
            subChannel.ftmAop_and_projection.projection > 0
              ? (subChannel.ftm.currentMonth_ftm /
                  subChannel.ftmAop_and_projection.projection) *
                100
              : 0,
        },
      }));
  
    const getRetailSubChannelByName = (name: string) =>
      json1.retail_sub_channels.find((subChannel:any) => subChannel.name === name);
  
    const retailStrategicInitiatives = {
      ...getRetailSubChannelByName("Retail Strategic Initiatives"),
      mtd: {
        ...getRetailSubChannelByName("Retail Strategic Initiatives").mtd,
        ach_on_projection_percentage:
          getRetailSubChannelByName("Retail Strategic Initiatives").ftmAop_and_projection.projection > 0
            ? (getRetailSubChannelByName("Retail Strategic Initiatives").mtd.currentMonth_mtd /
                getRetailSubChannelByName("Retail Strategic Initiatives").ftmAop_and_projection.projection) *
              100
            : 0,
      },
      ftm: {
        ...getRetailSubChannelByName("Retail Strategic Initiatives").ftm,
        ach_on_projection_percentage:
          getRetailSubChannelByName("Retail Strategic Initiatives").ftmAop_and_projection.projection > 0
            ? (getRetailSubChannelByName("Retail Strategic Initiatives").ftm.currentMonth_ftm /
                getRetailSubChannelByName("Retail Strategic Initiatives").ftmAop_and_projection.projection) *
              100
            : 0,
      },
    };
  
    const retailTotal = {
      ...getRetailSubChannelByName("Total"),
      mtd: {
        ...getRetailSubChannelByName("Total").mtd,
        ach_on_projection_percentage:
          getRetailSubChannelByName("Total").ftmAop_and_projection.projection > 0
            ? (getRetailSubChannelByName("Total").mtd.currentMonth_mtd /
                getRetailSubChannelByName("Total").ftmAop_and_projection.projection) *
              100
            : 0,
      },
      ftm: {
        ...getRetailSubChannelByName("Total").ftm,
        ach_on_projection_percentage:
          getRetailSubChannelByName("Total").ftmAop_and_projection.projection > 0
            ? (getRetailSubChannelByName("Total").ftm.currentMonth_ftm /
                getRetailSubChannelByName("Total").ftmAop_and_projection.projection) *
              100
            : 0,
      },
    };
  
    return {
      monthNameonly,
      retailAsOn,
      currentMonth,
      prevMonth,
      lastYearCurrentMonth,
      lastYearPrevMonth,
      retailSubChannels,
      retailStrategicInitiatives,
      retailTotal,
    };
  }


  // ropc_table_data_api:any


  ropc_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",

        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
      "ftmAop_and_projection": {
          "base": 5.08,
          "projection": 6.75,
        },

        "mtd": {
          "currentMonth_mtd": 2.25,
          "lastYearCurrentMonth_mtd": 2.24,
          "growthPercentage": 1,
          "ach_on_projection_percentage": 33,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 3.04,
          "ach_on_projection_percentage": 45,
        },

        "ytd": {
                 
          "cy": 25.86,
          "ly": 25.03,
          "growth_Percentage": 3,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 367,
          "prevMonth_imdCount": 342,
          "lastYearCurrentMonth_imdCount": 427,
          "growthOverLm_percentage": 7,
          "growthOverLy_percentage": -14,
        }
    },

    "retailTotal": {
      "name": "Retail Total",
      "ftmAop_and_projection": {
          "base": 0,
          "projection": 0,
        },

        "mtd": {
          "currentMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "growthPercentage": 0,
          "ach_on_projection_percentage": 0,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 0,
          "crr": 0,
        },

        "ftm": {
          "currentMonth_ftm": 0,
          "ach_on_projection_percentage": 0,
        },

        "ytd": {
                 
          "cy": 0,
          "ly": 0,
          "growth_Percentage": 0,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0,
          "prevMonth_imdCount": 0,
          "lastYearCurrentMonth_imdCount": 0,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0,
        }
    }
  } as any;














  ropc_table_data_server = {
    "currentMonth": "Oct'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",
    "monthNameonly": "Oct",
    "prevMonth": "Sep'24",
    "retailAsOn": "29th Oct'24",
    "retailSubChannels": [
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0.0,
          "growthOverLm_percentage": 0.0,
          "growthOverLy_percentage": 0.0,
          "lastYearCurrentMonth_imdCount": 1,
          "prevMonth_imdCount": 0.0
        },
        "ftm": {
          "currentMonth_ftm": 0.0,
          "ftm_on_aop_percentage": 0.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 0.0,
          "aspirational": 0.0,
          "base": 0.0,
          "growthOnAopPercentage": 0.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 0.0,
          "growthPercentage": 0.0,
          "lastYearCurrentMonth_mtd": 0.0
        },
        "name": "BROKERS",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 0.0,
          "ftd": 0.0
        },
        "ytd": {
          "achd_aop_percentage": 0.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 0.0,
          "aspirational": 0.0,
          "cy": 0.0,
          "growth_Percentage": 0.0,
          "ly": 0.0
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 1142.0,
          "growthOverLm_percentage": 2.42,
          "growthOverLy_percentage": 7.33,
          "lastYearCurrentMonth_imdCount": 1064,
          "prevMonth_imdCount": 1115.0
        },
        "ftm": {
          "currentMonth_ftm": 5.16,
          "ftm_on_aop_percentage": 27.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 18.78,
          "aspirational": 0.0,
          "base": 5.29,
          "growthOnAopPercentage": 255.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 4.49,
          "growthPercentage": -4.0,
          "lastYearCurrentMonth_mtd": 4.69
        },
        "name": "ENTERPRISE PARTNERS",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 24.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 1.0,
          "ftd": 0.15
        },
        "ytd": {
          "achd_aop_percentage": 154.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 18.78,
          "aspirational": 0.0,
          "cy": 28.92,
          "growth_Percentage": 1.0,
          "ly": 28.68
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 6420.0,
          "growthOverLm_percentage": 0.11,
          "growthOverLy_percentage": -7.77,
          "lastYearCurrentMonth_imdCount": 6961,
          "prevMonth_imdCount": 6413.0
        },
        "ftm": {
          "currentMonth_ftm": 5.23,
          "ftm_on_aop_percentage": 29.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 18.11,
          "aspirational": 0.0,
          "base": 6.66,
          "growthOnAopPercentage": 172.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 4.71,
          "growthPercentage": -21.0,
          "lastYearCurrentMonth_mtd": 5.98
        },
        "name": "GROWTH MARKETS",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 26.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 1.0,
          "ftd": 0.2
        },
        "ytd": {
          "achd_aop_percentage": 179.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 18.11,
          "aspirational": 0.0,
          "cy": 32.49,
          "growth_Percentage": -15.0,
          "ly": 38.02
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 3769.0,
          "growthOverLm_percentage": -0.53,
          "growthOverLy_percentage": -21.98,
          "lastYearCurrentMonth_imdCount": 4831,
          "prevMonth_imdCount": 3789.0
        },
        "ftm": {
          "currentMonth_ftm": 2.2,
          "ftm_on_aop_percentage": 29.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 7.46,
          "aspirational": 0.0,
          "base": 2.45,
          "growthOnAopPercentage": 204.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 1.96,
          "growthPercentage": -11.0,
          "lastYearCurrentMonth_mtd": 2.2
        },
        "name": "MOTOR AGENCY",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 26.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 0.0,
          "ftd": 0.06
        },
        "ytd": {
          "achd_aop_percentage": 176.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 7.46,
          "aspirational": 0.0,
          "cy": 13.11,
          "growth_Percentage": -9.0,
          "ly": 14.38
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 3.0,
          "growthOverLm_percentage": 50.0,
          "growthOverLy_percentage": 200.0,
          "lastYearCurrentMonth_imdCount": 1,
          "prevMonth_imdCount": 2.0
        },
        "ftm": {
          "currentMonth_ftm": 0.01,
          "ftm_on_aop_percentage": 0.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 0.0,
          "aspirational": 0.0,
          "base": 0.0,
          "growthOnAopPercentage": 0.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 0.01,
          "growthPercentage": 0.0,
          "lastYearCurrentMonth_mtd": 0.0
        },
        "name": "MULTILINE",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 0.0,
          "ftd": 0.0
        },
        "ytd": {
          "achd_aop_percentage": 0.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 0.0,
          "aspirational": 0.0,
          "cy": 0.01,
          "growth_Percentage": 0.0,
          "ly": 0.0
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 362.0,
          "growthOverLm_percentage": -2.95,
          "growthOverLy_percentage": -0.82,
          "lastYearCurrentMonth_imdCount": 365,
          "prevMonth_imdCount": 373.0
        },
        "ftm": {
          "currentMonth_ftm": 4.16,
          "ftm_on_aop_percentage": 37.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 11.28,
          "aspirational": 0.0,
          "base": 5.1,
          "growthOnAopPercentage": 121.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 3.76,
          "growthPercentage": -17.0,
          "lastYearCurrentMonth_mtd": 4.51
        },
        "name": "RETAIL AND SME BROKERS",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 33.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 0.0,
          "ftd": 0.15
        },
        "ytd": {
          "achd_aop_percentage": 211.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 11.28,
          "aspirational": 0.0,
          "cy": 23.77,
          "growth_Percentage": -14.0,
          "ly": 27.79
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 3136.0,
          "growthOverLm_percentage": -2.03,
          "growthOverLy_percentage": 4.88,
          "lastYearCurrentMonth_imdCount": 2990,
          "prevMonth_imdCount": 3201.0
        },
        "ftm": {
          "currentMonth_ftm": 1.12,
          "ftm_on_aop_percentage": 0.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 0.0,
          "aspirational": 0.0,
          "base": 1.09,
          "growthOnAopPercentage": 0.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 1.03,
          "growthPercentage": 8.0,
          "lastYearCurrentMonth_mtd": 0.95
        },
        "name": "RETAIL STRATEGIC INITIATIVES",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 0.0,
          "dar": 0.0,
          "ftd": 0.05
        },
        "ytd": {
          "achd_aop_percentage": 0.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 0.0,
          "aspirational": 0.0,
          "cy": 6.95,
          "growth_Percentage": 14.0,
          "ly": 6.07
        }
      },
      {
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 14832.0,
          "growthOverLm_percentage": -0.41,
          "growthOverLy_percentage": -8.52,
          "lastYearCurrentMonth_imdCount": 16213,
          "prevMonth_imdCount": 14893.0
        },
        "ftm": {
          "currentMonth_ftm": 17.88,
          "ftm_on_aop_percentage": 32.0,
          "ftm_on_aspirational_percentage": 0.0,
          "ftm_on_projection_percentage": 0.0
        },
        "ftmAop_and_projection": {
          "aop": 55.63,
          "aspirational": 0.0,
          "base": 20.59,
          "growthOnAopPercentage": 170.0,
          "projection": 0.0
        },
        "mtd": {
          "currentMonth_mtd": 15.96,
          "growthPercentage": -13.0,
          "lastYearCurrentMonth_mtd": 18.33
        },
        "name": "Total",
        "percentageAchievement": {
          "mtd_on_aop_percentage": 29.0,
          "mtd_on_aspirational_percentage": 0.0,
          "mtd_on_projection_percentage": 0.0
        },
        "runRateOnMtdAndFtdBook": {
          "crr": 1.0,
          "dar": 2.0,
          "ftd": 0.61
        },
        "ytd": {
          "achd_aop_percentage": 189.0,
          "achd_aspirational_percentage": 0.0,
          "aop": 55.63,
          "aspirational": 0.0,
          "cy": 105.25,
          "growth_Percentage": -8.0,
          "ly": 114.94
        }
      }
    ],
    "success": true
  } as any;





  
  











  property_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",
        "ftmAop_and_projection": {
          "aop":132.29,
          "base": 105.18,
          "aspirational": 133.15,
          "growthOnAopPercentage": 26,
          "projection": 140.05,
        },

        "mtd": {
          "currentMonth_mtd": 68.32,
          "lastYearCurrentMonth_mtd": 50.61,
          "growthPercentage": 35,
        },

        "percentageAchievement": {
          "mtd_on_aop_percentage": 52,
          "mtd_on_projection_percentage": 49,
          "mtd_on_aspirational_percentage": 51,
        },

        "runRateOnMtdAndFtdBook": {
          "ftd": 3.20,
          "dar": 4.92,
          "crr": 4.88,
        },

        "ftm": {
          "currentMonth_ftm": 45,
          "ftm_on_aop_percentage": 62,
          "ftm_on_projection_percentage": 58,
          "ftm_on_aspirational_percentage": 61,
        },

        "ytd": {
          "aop": 854.67,
          "aspirational": 894.31,          
          "cy": 25.86,
          "ly": 25.03,
          "achd_aop_percentage": 88,
          "achd_aspirational_percentage": 84,
          "growth_Percentage": 13,
        },

        "contributingImdCountMtd": {
          "currentMonth_imdCount": 1031,
          "prevMonth_imdCount": 1010,
          "lastYearCurrentMonth_imdCount": 972,
          "growthOverLm_percentage": 2,
          "growthOverLy_percentage": 6,
        }
      },
      {
        "name": "Growth Markets",
        "ftmAop_and_projection": {
          "aop": 51.14,
          "base": 41.44,
          "aspirational": 53.47,
          "growthOnAopPercentage": 23,
          "projection": 48.20
        },
        "mtd": {
          "currentMonth_mtd": 18.77,
          "lastYearCurrentMonth_mtd": 18.17,
          "growthPercentage": 3
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 37,
          "mtd_on_projection_percentage": 39,
          "mtd_on_aspirational_percentage": 35
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.45,
          "dar": 2.49,
          "crr": 1.34
        },
        "ftm": {
          "currentMonth_ftm": 23.95,
          "ftm_on_aop_percentage": 47,
          "ftm_on_projection_percentage": 50,
          "ftm_on_aspirational_percentage": 45
        },
        "ytd": {
          "aop": 354.75,
          "aspirational": 370.37,
          "cy": 269.75,
          "ly": 261.30,
          "achd_aop_percentage": 76,
          "achd_aspirational_percentage": 73,
          "growth_Percentage": 3
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 4601,
          "prevMonth_imdCount": 4535,
          "lastYearCurrentMonth_imdCount": 5209,
          "growthOverLm_percentage": 1,
          "growthOverLy_percentage": -12
        }
      },
      {
        "name": "Motor Agency",
        "ftmAop_and_projection": {
          "aop": 67.90,
          "base": 60.12,
          "aspirational": 70.60,
          "growthOnAopPercentage": 13,
          "projection": 46.91
        },
        "mtd": {
          "currentMonth_mtd": 19.17,
          "lastYearCurrentMonth_mtd": 27.77,
          "growthPercentage": -31
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 28,
          "mtd_on_projection_percentage": 41,
          "mtd_on_aspirational_percentage": 27
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.28,
          "dar": 3.75,
          "crr": 1.37
        },
        "ftm": {
          "currentMonth_ftm": 26.33,
          "ftm_on_aop_percentage": 39,
          "ftm_on_projection_percentage": 56,
          "ftm_on_aspirational_percentage": 37
        },
        "ytd": {
          "aop": 465.19,
          "aspirational": 480.40,
          "cy": 248.96,
          "ly": 352.41,
          "achd_aop_percentage": 54,
          "achd_aspirational_percentage": 52,
          "growth_Percentage": -29
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2942,
          "prevMonth_imdCount": 2941,
          "lastYearCurrentMonth_imdCount": 3916,
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": -25
        }
      },
      {
        "name": "Retail And Sme Brokers",
        "ftmAop_and_projection": {
          "aop": 97.81,
          "base": 83.72,
          "aspirational": 102.81,
          "growthOnAopPercentage": 17,
          "projection": 98.95
        },
        "mtd": {
          "currentMonth_mtd": 22.80,
          "lastYearCurrentMonth_mtd": 30.16,
          "growthPercentage": -24
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 23,
          "mtd_on_projection_percentage": 23,
          "mtd_on_aspirational_percentage": 22
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.64,
          "dar": 5.77,
          "crr": 1.63
        },
        "ftm": {
          "currentMonth_ftm": 32.29,
          "ftm_on_aop_percentage": 33,
          "ftm_on_projection_percentage": 33,
          "ftm_on_aspirational_percentage": 31
        },
        "ytd": {
          "aop": 468.93,
          "aspirational": 498.93,
          "cy": 377.69,
          "ly": 346.02,
          "achd_aop_percentage": 81,
          "achd_aspirational_percentage": 76,
          "growth_Percentage": 9
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 321,
          "prevMonth_imdCount": 331,
          "lastYearCurrentMonth_imdCount": 323,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": -1
        }
      },
      {
        "name": "Health First Agency",
        "ftmAop_and_projection": {
          "aop": 25.95,
          "base": 21.62,
          "aspirational": 27.19,
          "growthOnAopPercentage": 20,
          "projection": 25.35
        },
        "mtd": {
          "currentMonth_mtd": 11.53,
          "lastYearCurrentMonth_mtd": 9.63,
          "growthPercentage": 20
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 44,
          "mtd_on_projection_percentage": 45,
          "mtd_on_aspirational_percentage": 42
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 1.03,
          "dar": 1.11,
          "crr": 0.82
        },
        "ftm": {
          "currentMonth_ftm": 15.41,
          "ftm_on_aop_percentage": 59,
          "ftm_on_projection_percentage": 61,
          "ftm_on_aspirational_percentage": 57
        },
        "ytd": {
          "aop": 171.51,
          "aspirational": 179.69,
          "cy": 158.75,
          "ly": 137.01,
          "achd_aop_percentage": 93,
          "achd_aspirational_percentage": 88,
          "growth_Percentage": 16
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 2014,
          "prevMonth_imdCount": 2068,
          "lastYearCurrentMonth_imdCount": 1987,
          "growthOverLm_percentage": -3,
          "growthOverLy_percentage": 1
        }
      },
      {
        "name": "Digital Agency",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      {
        "name": "Retail Partners",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    },

    "retailTotal": {
      "name": "Retail Total",
        "ftmAop_and_projection": {
          "aop": 0, 
          "base": 0, 
          "aspirational": 0, 
          "growthOnAopPercentage": 0, 
          "projection": 0
        },
        "mtd": {
          "currentMonth_mtd": 0, 
          "lastYearCurrentMonth_mtd": 0, 
          "growthPercentage": 0
        },
        "percentageAchievement": {
          "mtd_on_aop_percentage": 0, 
          "mtd_on_projection_percentage": 0, 
          "mtd_on_aspirational_percentage": 0
        },
        "runRateOnMtdAndFtdBook": {
          "ftd": 0, 
          "dar": 0, 
          "crr": 0
        },
        "ftm": {
          "currentMonth_ftm": 0, 
          "ftm_on_aop_percentage": 0, 
          "ftm_on_projection_percentage": 0, 
          "ftm_on_aspirational_percentage": 0
        },
        "ytd": {
          "aop": 0, 
          "aspirational": 0, 
          "cy": 0, 
          "ly": 0, 
          "achd_aop_percentage": 0, 
          "achd_aspirational_percentage": 0, 
          "growth_Percentage": 0
        },
        "contributingImdCountMtd": {
          "currentMonth_imdCount": 0, 
          "prevMonth_imdCount": 0, 
          "lastYearCurrentMonth_imdCount": 0, 
          "growthOverLm_percentage": 0, 
          "growthOverLy_percentage": 0
        }
    }
  } as any;









  activation_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",


        

        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },


      {
        "name": "Growth Markets",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      {
        "name": "Motor Agency",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      {
        "name": "Retail And Sme Brokers",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      {
        "name": "Health First Agency",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      {
        "name": "Digital Agency",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      {
        "name": "Retail Partners",
        "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
      "mtd": {
          "projection_mtd": 1064,
          "rm_count_mtd": 131,
          "ytd_march_activation_mtd": 1140,
          "ftm_mtd": 849,

          "currentMonth_mtd": 815,
          "prevMonth_mtd": 819,
          "lastYearCurrentMonth_mtd": 790,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 80,
          "on_mtd_percentage": 77,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 3
        },
    },

    "retailTotal": {
      "name": "Retail Total",
      "mtd": {
          "projection_mtd": 0,
          "rm_count_mtd": 0,
          "ytd_march_activation_mtd": 0,
          "ftm_mtd": 0,

          "currentMonth_mtd": 0,
          "prevMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
        },

        "percentageAchievement": {
          "on_ftm_percentage": 0,
          "on_mtd_percentage": 0,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        },
    }
  } as any;












  recruitment_table_data = {
    "monthNameonly": "Oct",
    "retailAsOn": "16th Oct'24",
    "currentMonth": "Oct'24",
    "prevMonth": "Sep'24",
    "lastYearCurrentMonth": "Oct'23",
    "lastYearPrevMonth": "Sep'23",

    "retailSubChannels": [
      {
        "name": "Enterprise Partners",


        

        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },


      {
        "name": "Growth Markets",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      {
        "name": "Motor Agency",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      {
        "name": "Retail And Sme Brokers",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      {
        "name": "Health First Agency",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      {
        "name": "Digital Agency",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      {
        "name": "Retail Partners",
        "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
      },
      
    ],

    "retailStrategicInitiatives": {
      "name": "Retail Strategic Initiatives",
      "mtd": {
          "projection_mtd": 105,
          "currentMonth_mtd": 29,
          "prevMonth_mtd": 21,
          "lastYearCurrentMonth_mtd": 33,
          "achd_percentage": 28,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 28,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 38,
          "growthOverLy_percentage": 12
        },
    },

    "retailTotal": {
      "name": "Retail Total",
      "mtd": {
          "projection_mtd": 0,
          "currentMonth_mtd": 0,
          "prevMonth_mtd": 0,
          "lastYearCurrentMonth_mtd": 0,
          "achd_percentage": 0,
        },

        "percentageAchievement": {
          "growthOverProjection_percentage": 0,
        },

        "percentageGrowth": {
          "growthOverLm_percentage": 0,
          "growthOverLy_percentage": 0
        },
    }
  } as any;




  // recruitment_table_data = {
  //     "monthNameonly": "Oct",
  //     "retailAsOn": "16th Oct'24",
  //     "currentMonth": "Oct'24",
  //     "prevMonth": "Sep'24",
  //     "lastYearCurrentMonth": "Oct'23",
  //     "lastYearPrevMonth": "Sep'23",
  
  //     "retailSubChannels": [
  //       {
  //         "name": "Enterprise Partners",
  //         "ftmAop_and_projection": {
  //           "aop":132.29,
  //           "base": 105.18,
  //           "aspirational": 133.15,
  //           "growthOnAopPercentage": 26,
  //           "projection": 140.05,
  //         },
  
  //         "mtd": {
  //           "currentMonth_mtd": 68.32,
  //           "lastYearCurrentMonth_mtd": 50.61,
  //           "growthPercentage": 35,
  //         },
  
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 52,
  //           "mtd_on_projection_percentage": 49,
  //           "mtd_on_aspirational_percentage": 51,
  //         },
  
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 3.20,
  //           "dar": 4.92,
  //           "crr": 4.88,
  //         },
  
  //         "ftm": {
  //           "currentMonth_ftm": 45,
  //           "ftm_on_aop_percentage": 62,
  //           "ftm_on_projection_percentage": 58,
  //           "ftm_on_aspirational_percentage": 61,
  //         },
  
  //         "ytd": {
  //           "aop": 854.67,
  //           "aspirational": 894.31,          
  //           "cy": 25.86,
  //           "ly": 25.03,
  //           "achd_aop_percentage": 88,
  //           "achd_aspirational_percentage": 84,
  //           "growth_Percentage": 13,
  //         },
  
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 1031,
  //           "prevMonth_imdCount": 1010,
  //           "lastYearCurrentMonth_imdCount": 972,
  //           "growthOverLm_percentage": 2,
  //           "growthOverLy_percentage": 6,
  //         }
  //       },
  //       {
  //         "name": "Growth Markets",
  //         "ftmAop_and_projection": {
  //           "aop": 51.14,
  //           "base": 41.44,
  //           "aspirational": 53.47,
  //           "growthOnAopPercentage": 23,
  //           "projection": 48.20
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 18.77,
  //           "lastYearCurrentMonth_mtd": 18.17,
  //           "growthPercentage": 3
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 37,
  //           "mtd_on_projection_percentage": 39,
  //           "mtd_on_aspirational_percentage": 35
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 1.45,
  //           "dar": 2.49,
  //           "crr": 1.34
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 23.95,
  //           "ftm_on_aop_percentage": 47,
  //           "ftm_on_projection_percentage": 50,
  //           "ftm_on_aspirational_percentage": 45
  //         },
  //         "ytd": {
  //           "aop": 354.75,
  //           "aspirational": 370.37,
  //           "cy": 269.75,
  //           "ly": 261.30,
  //           "achd_aop_percentage": 76,
  //           "achd_aspirational_percentage": 73,
  //           "growth_Percentage": 3
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 4601,
  //           "prevMonth_imdCount": 4535,
  //           "lastYearCurrentMonth_imdCount": 5209,
  //           "growthOverLm_percentage": 1,
  //           "growthOverLy_percentage": -12
  //         }
  //       },
  //       {
  //         "name": "Motor Agency",
  //         "ftmAop_and_projection": {
  //           "aop": 67.90,
  //           "base": 60.12,
  //           "aspirational": 70.60,
  //           "growthOnAopPercentage": 13,
  //           "projection": 46.91
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 19.17,
  //           "lastYearCurrentMonth_mtd": 27.77,
  //           "growthPercentage": -31
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 28,
  //           "mtd_on_projection_percentage": 41,
  //           "mtd_on_aspirational_percentage": 27
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 1.28,
  //           "dar": 3.75,
  //           "crr": 1.37
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 26.33,
  //           "ftm_on_aop_percentage": 39,
  //           "ftm_on_projection_percentage": 56,
  //           "ftm_on_aspirational_percentage": 37
  //         },
  //         "ytd": {
  //           "aop": 465.19,
  //           "aspirational": 480.40,
  //           "cy": 248.96,
  //           "ly": 352.41,
  //           "achd_aop_percentage": 54,
  //           "achd_aspirational_percentage": 52,
  //           "growth_Percentage": -29
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 2942,
  //           "prevMonth_imdCount": 2941,
  //           "lastYearCurrentMonth_imdCount": 3916,
  //           "growthOverLm_percentage": 0,
  //           "growthOverLy_percentage": -25
  //         }
  //       },
  //       {
  //         "name": "Retail And Sme Brokers",
  //         "ftmAop_and_projection": {
  //           "aop": 97.81,
  //           "base": 83.72,
  //           "aspirational": 102.81,
  //           "growthOnAopPercentage": 17,
  //           "projection": 98.95
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 22.80,
  //           "lastYearCurrentMonth_mtd": 30.16,
  //           "growthPercentage": -24
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 23,
  //           "mtd_on_projection_percentage": 23,
  //           "mtd_on_aspirational_percentage": 22
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 1.64,
  //           "dar": 5.77,
  //           "crr": 1.63
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 32.29,
  //           "ftm_on_aop_percentage": 33,
  //           "ftm_on_projection_percentage": 33,
  //           "ftm_on_aspirational_percentage": 31
  //         },
  //         "ytd": {
  //           "aop": 468.93,
  //           "aspirational": 498.93,
  //           "cy": 377.69,
  //           "ly": 346.02,
  //           "achd_aop_percentage": 81,
  //           "achd_aspirational_percentage": 76,
  //           "growth_Percentage": 9
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 321,
  //           "prevMonth_imdCount": 331,
  //           "lastYearCurrentMonth_imdCount": 323,
  //           "growthOverLm_percentage": -3,
  //           "growthOverLy_percentage": -1
  //         }
  //       },
  //       {
  //         "name": "Health First Agency",
  //         "ftmAop_and_projection": {
  //           "aop": 25.95,
  //           "base": 21.62,
  //           "aspirational": 27.19,
  //           "growthOnAopPercentage": 20,
  //           "projection": 25.35
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 11.53,
  //           "lastYearCurrentMonth_mtd": 9.63,
  //           "growthPercentage": 20
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 44,
  //           "mtd_on_projection_percentage": 45,
  //           "mtd_on_aspirational_percentage": 42
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 1.03,
  //           "dar": 1.11,
  //           "crr": 0.82
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 15.41,
  //           "ftm_on_aop_percentage": 59,
  //           "ftm_on_projection_percentage": 61,
  //           "ftm_on_aspirational_percentage": 57
  //         },
  //         "ytd": {
  //           "aop": 171.51,
  //           "aspirational": 179.69,
  //           "cy": 158.75,
  //           "ly": 137.01,
  //           "achd_aop_percentage": 93,
  //           "achd_aspirational_percentage": 88,
  //           "growth_Percentage": 16
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 2014,
  //           "prevMonth_imdCount": 2068,
  //           "lastYearCurrentMonth_imdCount": 1987,
  //           "growthOverLm_percentage": -3,
  //           "growthOverLy_percentage": 1
  //         }
  //       },
  //       {
  //         "name": "Digital Agency",
  //         "ftmAop_and_projection": {
  //           "aop": 0, 
  //           "base": 0, 
  //           "aspirational": 0, 
  //           "growthOnAopPercentage": 0, 
  //           "projection": 0
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 0, 
  //           "lastYearCurrentMonth_mtd": 0, 
  //           "growthPercentage": 0
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 0, 
  //           "mtd_on_projection_percentage": 0, 
  //           "mtd_on_aspirational_percentage": 0
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 0, 
  //           "dar": 0, 
  //           "crr": 0
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 0, 
  //           "ftm_on_aop_percentage": 0, 
  //           "ftm_on_projection_percentage": 0, 
  //           "ftm_on_aspirational_percentage": 0
  //         },
  //         "ytd": {
  //           "aop": 0, 
  //           "aspirational": 0, 
  //           "cy": 0, 
  //           "ly": 0, 
  //           "achd_aop_percentage": 0, 
  //           "achd_aspirational_percentage": 0, 
  //           "growth_Percentage": 0
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 0, 
  //           "prevMonth_imdCount": 0, 
  //           "lastYearCurrentMonth_imdCount": 0, 
  //           "growthOverLm_percentage": 0, 
  //           "growthOverLy_percentage": 0
  //         }
  //       },
  //       {
  //         "name": "Retail Partners",
  //         "ftmAop_and_projection": {
  //           "aop": 0, 
  //           "base": 0, 
  //           "aspirational": 0, 
  //           "growthOnAopPercentage": 0, 
  //           "projection": 0
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 0, 
  //           "lastYearCurrentMonth_mtd": 0, 
  //           "growthPercentage": 0
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 0, 
  //           "mtd_on_projection_percentage": 0, 
  //           "mtd_on_aspirational_percentage": 0
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 0, 
  //           "dar": 0, 
  //           "crr": 0
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 0, 
  //           "ftm_on_aop_percentage": 0, 
  //           "ftm_on_projection_percentage": 0, 
  //           "ftm_on_aspirational_percentage": 0
  //         },
  //         "ytd": {
  //           "aop": 0, 
  //           "aspirational": 0, 
  //           "cy": 0, 
  //           "ly": 0, 
  //           "achd_aop_percentage": 0, 
  //           "achd_aspirational_percentage": 0, 
  //           "growth_Percentage": 0
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 0, 
  //           "prevMonth_imdCount": 0, 
  //           "lastYearCurrentMonth_imdCount": 0, 
  //           "growthOverLm_percentage": 0, 
  //           "growthOverLy_percentage": 0
  //         }
  //       },
        
  //     ],
  
  //     "retailStrategicInitiatives": {
  //       "name": "Retail Strategic Initiatives",
  //         "ftmAop_and_projection": {
  //           "aop": 0, 
  //           "base": 0, 
  //           "aspirational": 0, 
  //           "growthOnAopPercentage": 0, 
  //           "projection": 0
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 0, 
  //           "lastYearCurrentMonth_mtd": 0, 
  //           "growthPercentage": 0
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 0, 
  //           "mtd_on_projection_percentage": 0, 
  //           "mtd_on_aspirational_percentage": 0
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 0, 
  //           "dar": 0, 
  //           "crr": 0
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 0, 
  //           "ftm_on_aop_percentage": 0, 
  //           "ftm_on_projection_percentage": 0, 
  //           "ftm_on_aspirational_percentage": 0
  //         },
  //         "ytd": {
  //           "aop": 0, 
  //           "aspirational": 0, 
  //           "cy": 0, 
  //           "ly": 0, 
  //           "achd_aop_percentage": 0, 
  //           "achd_aspirational_percentage": 0, 
  //           "growth_Percentage": 0
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 0, 
  //           "prevMonth_imdCount": 0, 
  //           "lastYearCurrentMonth_imdCount": 0, 
  //           "growthOverLm_percentage": 0, 
  //           "growthOverLy_percentage": 0
  //         }
  //     },
  
  //     "retailTotal": {
  //       "name": "Retail Total",
  //         "ftmAop_and_projection": {
  //           "aop": 0, 
  //           "base": 0, 
  //           "aspirational": 0, 
  //           "growthOnAopPercentage": 0, 
  //           "projection": 0
  //         },
  //         "mtd": {
  //           "currentMonth_mtd": 0, 
  //           "lastYearCurrentMonth_mtd": 0, 
  //           "growthPercentage": 0
  //         },
  //         "percentageAchievement": {
  //           "mtd_on_aop_percentage": 0, 
  //           "mtd_on_projection_percentage": 0, 
  //           "mtd_on_aspirational_percentage": 0
  //         },
  //         "runRateOnMtdAndFtdBook": {
  //           "ftd": 0, 
  //           "dar": 0, 
  //           "crr": 0
  //         },
  //         "ftm": {
  //           "currentMonth_ftm": 0, 
  //           "ftm_on_aop_percentage": 0, 
  //           "ftm_on_projection_percentage": 0, 
  //           "ftm_on_aspirational_percentage": 0
  //         },
  //         "ytd": {
  //           "aop": 0, 
  //           "aspirational": 0, 
  //           "cy": 0, 
  //           "ly": 0, 
  //           "achd_aop_percentage": 0, 
  //           "achd_aspirational_percentage": 0, 
  //           "growth_Percentage": 0
  //         },
  //         "contributingImdCountMtd": {
  //           "currentMonth_imdCount": 0, 
  //           "prevMonth_imdCount": 0, 
  //           "lastYearCurrentMonth_imdCount": 0, 
  //           "growthOverLm_percentage": 0, 
  //           "growthOverLy_percentage": 0
  //         }
  //     }
  //   } as any;






  






  






  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });

    console.log("sideNav_state--> ", this.sideNav_state)
  }






  // currenMonthName = this.topLine_table_data.currentMonth as any;
  // prevMonthName = this.topLine_table_data.prevMonth as any;

  currenMonthName = '' as any;
  prevMonthName = '' as any;


  set_GWP_circularGaugeData(){
    this.currenMonthName = this.topLine_table_data.currentMonth as any;
    this.prevMonthName = this.topLine_table_data.prevMonth as any;

    if(this.opened_gwp_section == 'mtd'){

      this.topLine_imd_current = this.topLine_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.topLine_imd_prev = this.topLine_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;


      this.health_imd_current = this.health_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.health_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;


      this.frh_imd_current = this.frh_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.frh_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;


      



      
    }
    if(this.opened_gwp_section == 'ftm'){

      this.topLine_imd_current = this.topLine_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.topLine_imd_prev = this.topLine_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;


      this.health_imd_current = this.health_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.health_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;


      this.frh_imd_current = this.frh_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.frh_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;
      
    }
    if(this.opened_gwp_section == 'ytd'){
      
    }
    if(this.opened_gwp_section == 'all'){
      
    }
  }



  setAllData_gwp(){
    this.setUpToplineData();
    this.setUpFrhData();
    this.setUpHealthData();
    this.setUpPvtcarData();
    this.setUpRopcData();
    this.setUpPropertyData();
  }

  setAllData_imd(){
    this.setUpActivationData();
    this.setUpRecruitmentData();
  }





  // topline -------
  // topLine_target = 377 as any;
  topLine_target = this.topLine_table_data.retailTotal.ftmAop_and_projection.aop as any;
  topLine_target_per = 100 as any;

  // topLine_achv = 277 as any;
  topLine_achv = this.topLine_table_data.retailTotal.mtd.currentMonth_mtd as any;
  // topLine_achv_per = this.topLine_table_data.retailTotal.mtd.growthPercentage as any;
  topLine_achv_per = 100 * this.topLine_achv / this.topLine_target as any;


  // topLine_imd_current = '11,198' as any;
  // topLine_imd_prev = '11,152' as any;
  topLine_imd_current = this.topLine_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  topLine_imd_prev = this.topLine_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  // topLine_centerText = this.topLine_achv_per + '%';
  topLine_centerText = String(this.topLine_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage) + '%' as any;


  topLine_growDegrow_lm = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage as any;
  topLine_growDegrow_ly = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage as any;


  // ftm case ------
  topLine_target_ftm = this.topLine_table_data.retailTotal.ftmAop_and_projection.aop as any;
  topLine_achv_ftm = this.topLine_table_data.retailTotal.ftm.currentMonth_ftm as any;
  topLine_achv_per_ftm = 100 * this.topLine_achv_ftm / this.topLine_target_ftm as any;
  topLine_centerText_ftm = String(this.topLine_achv_per_ftm.toFixed(1)) + '%' as any;

  // topLine_imd_current_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.currentMonth_imdCount || 0 as any;
  // topLine_imd_prev_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.prevMonth_imdCount || 0 as any;

  // topLine_growDegrow_lm_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.growthOverLm_percentage || 0 as any;
  // topLine_growDegrow_ly_ftm = this.topLine_table_data.retailTotal.contributingImdCountMtdFtm.growthOverLy_percentage || 0 as any;



  // ytd case ------
  topLine_target_ytd = this.topLine_table_data.retailTotal.ytd.aop as any;
  topLine_achv_ytd =  this.topLine_table_data.retailTotal.ytd.cy as any;
  topLine_achv_per_ytd = 100 * (this.topLine_achv_ytd / this.topLine_target_ytd) as any;
  topLine_centerText_ytd = String(this.topLine_table_data.retailTotal.ytd.achd_aop_percentage) + '%';

  // topLine_imd_current_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.currentMonth_imdCount || 0 as any;
  // topLine_imd_prev_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.prevMonth_imdCount || 0 as any;

  // topLine_growDegrow_lm_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.growthOverLm_percentage || 0 as any;
  // topLine_growDegrow_ly_ytd = this.topLine_table_data.retailTotal.contributingImdCountMtdYtd.growthOverLy_percentage || 0 as any;




  setUpToplineData(){
    this.currenMonthName = this.topLine_table_data.currentMonth;
    this.prevMonthName = this.topLine_table_data.prevMonth;

    
    this.topLine_target = this.topLine_table_data.retailTotal.ftmAop_and_projection.aop as any;
    // this.topLine_target_per = 75 as any;
    this.topLine_achv = this.topLine_table_data.retailTotal.mtd.currentMonth_mtd as any;
    // if(this.topLine_target!=0){

    //   this.topLine_achv_per = 100 * this.topLine_achv / this.topLine_target as any;

    // }else{
    //   this.topLine_achv_per = 0
    // }
    this.topLine_achv_per = this.topLine_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage
    // this.topLine_achv_per = 100 * this.topLine_achv / this.topLine_target as any;

    this.topLine_imd_current = this.topLine_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.topLine_imd_prev = this.topLine_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

    // this.topLine_centerText = '0%';
    // if(this.topLine_target != 0){
      this.topLine_centerText = String(this.topLine_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage) + '%';
    // }
    // console.log("topLine_centerText", this.topLine_centerText )

    this.topLine_growDegrow_lm = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.topLine_growDegrow_ly = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;





    // ftm case --------------
    this.topLine_target_ftm = this.topLine_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.topLine_achv_ftm = this.topLine_table_data.retailTotal.ftm.currentMonth_ftm as any;
    if(this.topLine_target_ftm !=0){
      this.topLine_achv_per_ftm = 100 * this.topLine_achv_ftm / this.topLine_target_ftm as any;
    }else{
      this.topLine_achv_per_ftm = 0
    }
    // this.topLine_achv_per_ftm = this.topLine_table_data.ftm.ftm_on_aop_percentage

    if(this.topLine_target_ftm != 0){
      this.topLine_centerText_ftm = String(this.topLine_achv_per_ftm.toFixed(1)) + '%';
    }else{
      this.topLine_centerText_ftm = "0%";
    }
    // this.topLine_centerText_ftm = String(this.topLine_achv_per_ftm) + "%"

    // this.topLine_imd_current_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.currentMonth_imdCount || 0 as any;
    // this.topLine_imd_prev_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.prevMonth_imdCount || 0  as any;

    // this.topLine_growDegrow_lm_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.growthOverLm_percentage || 0 as any;
    // this.topLine_growDegrow_ly_ftm = this.topLine_table_data.retailTotal.contributingImdCountMtdFtm.growthOverLy_percentage || 0 as any;



    // ytd case  --------------
    this.topLine_target_ytd = this.topLine_table_data.retailTotal.ytd.aop as any;
    this.topLine_achv_ytd = this.topLine_table_data.retailTotal.ytd.cy as any;
    if(this.topLine_target_ytd != 0){
      this.topLine_achv_per_ytd = 100 * this.topLine_achv_ytd / this.topLine_target_ytd as any;
    }else{

      this.topLine_achv_per_ytd = 0;
    }
    // this.topLine_achv_per_ytd = this.topLine_table_data.retailTotal.ytd.achd_aop_percentage
    // if(this.topLine_target_ytd != 0){
    //   this.topLine_centerText_ytd = String(this.topLine_achv_per_ytd.toFixed(1)) + '%';
    // }
    this.topLine_centerText_ytd = String(this.topLine_table_data.retailTotal.ytd.achd_aop_percentage) + '%';

    // this.topLine_imd_current_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.currentMonth_imdCount as any;
    // this.topLine_imd_prev_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.prevMonth_imdCount as any;

    // this.topLine_growDegrow_lm_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.growthOverLm_percentage;
    // this.topLine_growDegrow_ly_ytd = this.topLine_table_data.retailTotal.contributingImdCountMtdYtd.growthOverLy_percentage;






    // console.log("Topline Data For Circle Gauge");

    // console.log("mtd target ", this.topLine_target);
    // console.log("mtd ach ", this.topLine_achv);
    // console.log("mtd ach% ", this.topLine_centerText);


    // console.log("ftm target ", this.topLine_target_ftm);
    // console.log("ftm ach ", this.topLine_achv_ftm);
    // console.log("ftm ach% ", this.topLine_centerText_ftm);


    // console.log("ytd target ", this.topLine_target_ytd);
    // console.log("ytd ach ", this.topLine_achv_ytd);
    // console.log("ytd ach% ", this.topLine_centerText_ytd);


  }






  // Health -------
  // health_target = 377 as any;
  health_target = this.health_table_data.retailTotal.ftmAop_and_projection.aop as any;
  health_target_per = 100 as any;

  // health_achv = 277 as any;
  health_achv = this.health_table_data.retailTotal.mtd.currentMonth_mtd as any;
  // health_achv_per = 73 as any;
  health_achv_per = 100 * this.health_achv / this.health_target as any;

  // health_imd_current = '11,198' as any;
  // health_imd_prev = '11,152' as any;
  health_imd_current = this.health_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  health_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  health_centerText =  String(this.health_table_data.retailTotal.mtd.growthPercentage) + '%' as any
  // health_centerText = this.health_achv_per + '%';

  health_growDegrow_lm = this.health_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
  health_growDegrow_ly = this.health_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


  // ftm case ------
  health_target_ftm = '' as any;
  health_achv_ftm = '' as any;
  health_achv_per_ftm = '' as any;
  health_centerText_ftm = '0%';

  // ytd case ------
  health_target_ytd = this.health_table_data.retailTotal.ytd.aop as any;
  health_achv_ytd = this.health_table_data.retailTotal.ytd.cy as any;
  health_achv_per_ytd = '' as any;
  health_centerText_ytd = '0%';

  setUpHealthData(){
    this.health_target = this.health_table_data.retailTotal.ftmAop_and_projection.aop as any;
    // this.topLine_target_per = 75 as any;
    this.health_achv = this.health_table_data.retailTotal.mtd.currentMonth_mtd as any;
    if(this.health_target!=0){
      this.health_achv_per = 100 * this.health_achv / this.health_target as any;
    }else{
      this.health_achv_per = 0;
    }
    this.health_achv_per = this.health_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage

    this.health_imd_current = this.health_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.health_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;
    // this.health_centerText = String(this.health_achv_per.toFixed(1)) + '%';

    if(this.health_target != 0){
      this.health_centerText = String(this.health_table_data.retailTotal.mtd.growthPercentage) + '%';
    }else{
      this.health_centerText = "0%";
    }
    this.health_centerText = String(this.health_achv_per) + "%";
    // console.log("health_centerText", this.health_centerText )

    this.health_growDegrow_lm = this.health_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.health_growDegrow_ly = this.health_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


    // ftm case --------------
    this.health_target_ftm = this.health_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.health_achv_ftm = this.health_table_data.retailTotal.mtd.currentMonth_mtd as any;
    if(this.health_target_ftm!=0){
      this.health_achv_per_ftm = 100 * this.health_achv_ftm / this.health_target_ftm as any;
    }else{
      this.health_achv_per_ftm = 0
    }

    if(this.health_target_ftm != 0){
      this.health_centerText_ftm = String(this.health_achv_per_ftm.toFixed(1)) + '%';      
    }else{
      this.health_centerText_ftm = '0%'; // when target = 0
    }




    // ytd case  --------------
    this.health_target_ytd = this.health_table_data.retailTotal.ytd.aop as any;
    this.health_achv_ytd = this.health_table_data.retailTotal.ytd.cy as any;

    if(this.health_target_ytd!=0){
      this.health_achv_per_ytd = 100 * this.health_achv_ytd / this.health_target_ytd as any;
    }else{
      this.health_achv_per_ytd = 0;
    }

    // if(this.health_target_ytd != 0){
      // this.health_centerText_ytd = String(this.health_achv_per_ytd.toFixed(1)) + '%';
    // }
    this.health_centerText_ytd = String(this.health_table_data.retailTotal.ytd.achd_aop_percentage) + '%';





    // console.log("Health Data For Circle Gauge");
    
    // console.log("mtd target ", this.health_target);
    // console.log("mtd ach ", this.health_achv);
    // console.log("mtd ach% ", this.health_centerText);


    // console.log("ftm target ", this.health_target_ftm);
    // console.log("ftm ach ", this.health_achv_ftm);
    // console.log("ftm ach% ", this.health_centerText_ftm);


    // console.log("ytd target ", this.health_target_ytd);
    // console.log("ytd ach ", this.health_achv_ytd);
    // console.log("ytd ach% ", this.health_centerText_ytd);
  }







  // FRH -------
  frh_target = this.frh_table_data.retailTotal.ftmAop_and_projection.aop as any;
  frh_target_per = 100 as any;

  frh_achv = this.frh_table_data.retailTotal.mtd.currentMonth_mtd as any;
  // frh_achv_per = 73 as any;
  frh_achv_per = 100 * this.frh_achv / this.frh_target as any;

  frh_imd_current = this.frh_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  frh_imd_prev = this.health_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  // frh_centerText = '0%';
  frh_centerText =  String(this.frh_achv_per.toFixed(1)) + '%';
  frh_growDegrow_lm = this.frh_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
  frh_growDegrow_ly = this.frh_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


  // ftm case ------
  frh_target_ftm = '' as any;
  frh_achv_ftm = '' as any;
  frh_achv_per_ftm = '' as any;
  frh_centerText_ftm = '0%';

  // ytd case ------
  frh_target_ytd = '' as any;
  frh_achv_ytd = '' as any;
  frh_achv_per_ytd = '' as any;
  frh_centerText_ytd = String(this.frh_table_data.retailTotal.ytd.achd_aop_percentage) + '%';;

  setUpFrhData(){
    this.frh_target = this.frh_table_data.retailTotal.ftmAop_and_projection.aop as any;
    // this.topLine_target_per = 75 as any;
    this.frh_achv = this.frh_table_data.retailTotal.mtd.currentMonth_mtd as any;

    if(this.frh_target!=0){
      this.frh_achv_per = 100 * this.frh_achv / this.frh_target as any;
    }else{
      this.frh_achv_per = 0;
    }
    this.frh_imd_current = this.frh_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.frh_imd_prev = this.frh_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;
    if( this.frh_target != 0 ){
      this.frh_centerText = String(this.frh_achv_per.toFixed(1)) + '%';
    }else{
      this.frh_centerText = "0%"
    }
    // console.log("frh_centerText", this.frh_centerText )

    this.frh_growDegrow_lm = this.frh_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.frh_growDegrow_ly = this.frh_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


    // ftm case --------------
    this.frh_target_ftm = this.frh_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.frh_achv_ftm = this.frh_table_data.retailTotal.ftm.currentMonth_ftm as any;

    if(this.frh_target_ftm!=0){
      this.frh_achv_per_ftm = 100 * this.frh_achv_ftm / this.frh_target_ftm as any;
    }else{
      this.frh_achv_per_ftm = 0;
    }

    if(this.frh_target_ftm != 0){
      this.frh_centerText_ftm = String(this.frh_achv_per_ftm.toFixed(1)) + '%';
    }else{
      this.frh_centerText_ftm = "0%";
    }




    // ytd case  --------------
    this.frh_target_ytd = this.frh_table_data.retailTotal.ytd.aop as any;
    this.frh_achv_ytd = this.frh_table_data.retailTotal.ytd.cy as any;

    if(this.frh_achv_per_ytd!=0){
      this.frh_achv_per_ytd = 100 * this.frh_achv_ytd / this.frh_target_ytd as any;
    }else{
      this.frh_achv_per_ytd = 0;
    }
    this.frh_achv_per_ytd = this.frh_table_data.retailTotal.ytd.achd_aop_percentage


    // if(this.frh_target_ytd != 0){
    //   this.frh_centerText_ytd = String(this.frh_achv_per_ytd.toFixed(1)) + '%';
    // }
    this.frh_centerText_ytd = String(this.frh_achv_per_ytd) + '%';






    // console.log("FRH Data For Circle Gauge");
    
    // console.log("mtd target ", this.frh_target);
    // console.log("mtd ach ", this.frh_achv);
    // console.log("mtd ach% ", this.frh_centerText);


    // console.log("ftm target ", this.frh_target_ftm);
    // console.log("ftm ach ", this.frh_achv_ftm);
    // console.log("ftm ach% ", this.frh_centerText_ftm);


    // console.log("ytd target ", this.frh_target_ytd);
    // console.log("ytd ach ", this.frh_achv_ytd);
    // console.log("ytd ach% ", this.frh_centerText_ytd);
  }




  // Private Car -------
  pvtcar_target = this.pvtCar_table_data.retailTotal.ftmAop_and_projection.aop as any;
  pvtcar_target_per = 100 as any;

  pvtcar_achv = this.pvtCar_table_data.retailTotal.mtd.currentMonth_mtd as any;
  // pvtcar_achv_per = 73 as any;
  pvtcar_achv_per = 100 * this.pvtcar_achv / this.pvtcar_target as any;

  

  pvtcar_imd_current = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  pvtcar_imd_prev = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  pvtcar_centerText = '0%'
  // pvtcar_centerText = this.pvtcar_achv_per + '%';

  pvtcar_growDegrow_lm = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
  pvtcar_growDegrow_ly = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


  // ftm case ------
  pvtcar_target_ftm = '' as any;
  pvtcar_achv_ftm = '' as any;
  pvtcar_achv_per_ftm = '' as any;
  pvtcar_centerText_ftm = '0%';

  // ytd case ------
  pvtcar_target_ytd = '' as any;
  pvtcar_achv_ytd = '' as any;
  pvtcar_achv_per_ytd = '' as any;
  pvtcar_centerText_ytd = '0%';

  setUpPvtcarData(){
    this.pvtcar_target = this.pvtCar_table_data.retailTotal.ftmAop_and_projection.aop as any;
    // this.topLine_target_per = 75 as any;
    this.pvtcar_achv = this.pvtCar_table_data.retailTotal.mtd.currentMonth_mtd as any;
    if(this.pvtcar_target != 0){
      this.pvtcar_achv_per = 100 * this.pvtcar_achv / this.pvtcar_target as any;
    }else{
      this.pvtcar_achv_per = 0;
    }

    this.pvtcar_imd_current = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.pvtcar_imd_prev = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

    if(this.pvtcar_target != 0){
      this.pvtcar_centerText = String(this.pvtcar_achv_per.toFixed(1)) + '%';
    }else{
      this.pvtcar_centerText = "0%";
    }

    // console.log("pvtcar_centerText", this.pvtcar_centerText )

    this.pvtcar_growDegrow_lm = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.pvtcar_growDegrow_ly = this.pvtCar_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


    // ftm case --------------
    this.pvtcar_target_ftm = this.pvtCar_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.pvtcar_achv_ftm = this.pvtCar_table_data.retailTotal.mtd.currentMonth_mtd as any;
    if(this.pvtcar_target_ftm ){
      this.pvtcar_achv_per_ftm = 100 * this.pvtcar_achv_ftm / this.pvtcar_target_ftm as any;      
    }else{
      this.pvtcar_achv_per_ftm = 0;
    }
    if(this.pvtcar_target_ftm != 0){
      this.pvtcar_centerText_ftm = String(this.pvtcar_achv_per_ftm.toFixed(1)) + '%';
    }else{
      this.pvtcar_centerText_ftm = "0%"
    }




    // ytd case  --------------
    this.pvtcar_target_ytd = this.pvtCar_table_data.retailTotal.ytd.aop as any;
    this.pvtcar_achv_ytd = this.pvtCar_table_data.retailTotal.ytd.cy as any;
    if(this.pvtcar_target_ytd!=0){
      this.pvtcar_achv_per_ytd = 100 * this.pvtcar_achv_ytd / this.pvtcar_target_ytd as any;
      
    }else{
      this.pvtcar_achv_per_ytd = 0;
    }
    if(this.pvtcar_target_ytd != 0){
      this.pvtcar_centerText_ytd = String(this.pvtcar_achv_per_ytd.toFixed(1)) + '%';
    }else{
      this.pvtcar_centerText_ytd = "0%";
    }






    // console.log("Pvt Car Data For Circle Gauge");
    
    // console.log("mtd target ", this.pvtcar_target);
    // console.log("mtd ach ", this.pvtcar_achv);
    // console.log("mtd ach% ", this.pvtcar_centerText);


    // console.log("ftm target ", this.pvtcar_target_ftm);
    // console.log("ftm ach ", this.pvtcar_achv_ftm);
    // console.log("ftm ach% ", this.pvtcar_centerText_ftm);


    // console.log("ytd target ", this.pvtcar_target_ytd);
    // console.log("ytd ach ", this.pvtcar_achv_ytd);
    // console.log("ytd ach% ", this.pvtcar_centerText_ytd);
  }






  // ROPC -------
  ropc_target = this.ropc_table_data.retailTotal.ftmAop_and_projection.aop as any; // in case of ropc only projection will be used instead of aop as aop is not coming in this table
  ropc_target_per = 100 as any;

  ropc_achv = this.ropc_table_data.retailTotal.mtd.currentMonth_mtd as any;
  ropc_achv_per = 100 * this.ropc_achv / this.ropc_target as any;
  


  ropc_imd_current = this.ropc_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  ropc_imd_prev = this.ropc_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  // ropc_centerText = this.ropc_achv_per + '%';
  ropc_centerText = "0%"
  ropc_growDegrow_lm = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
  ropc_growDegrow_ly = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


  // ftm case ------
  ropc_target_ftm = '' as any;
  ropc_achv_ftm = '' as any;
  ropc_achv_per_ftm = '' as any;
  ropc_centerText_ftm = '0%';

  // ytd case ------
  ropc_target_ytd = '' as any;
  ropc_achv_ytd = '' as any;
  ropc_achv_per_ytd = '' as any;
  ropc_centerText_ytd = '0%';

  setUpRopcData(){

    if (
      this.ropc_table_data &&
      this.ropc_table_data.retailTotal &&
      this.ropc_table_data.retailTotal.percentageAchievement &&
      this.ropc_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage !== undefined
    ){

      this.ropc_target = this.ropc_table_data.retailTotal.ftmAop_and_projection.aop as any; // in case of ropc only projection will be used instead of aop as aop is not coming in this table
      // this.topLine_target_per = 75 as any;
      this.ropc_achv = this.ropc_table_data.retailTotal.mtd.currentMonth_mtd as any;
      // if(this.ropc_target!=0){
      //   this.ropc_achv_per = 100 * this.ropc_achv / this.ropc_target as any;
  
      // }else{
      //   this.ropc_achv_per = 0;
      // }
      this.ropc_achv_per = this.ropc_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage as any;
      this.ropc_imd_current = this.ropc_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.ropc_imd_prev = this.ropc_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;
  
      if(this.ropc_target != 0){
        this.ropc_centerText = String(this.ropc_achv_per.toFixed(1)) + '%';
      }else{
        this.ropc_centerText = "0%"
      }
      // console.log("ropc_centerText", this.ropc_centerText )
  
      this.ropc_growDegrow_lm = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
      this.ropc_growDegrow_ly = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;
  
  
      // ftm case --------------
      this.ropc_target_ftm = this.ropc_table_data.retailTotal.ftmAop_and_projection.projection as any;
      this.ropc_achv_ftm = this.ropc_table_data.retailTotal.ftm.currentMonth_ftm as any;
      // if(this.ropc_target_ftm!=0){
      //   this.ropc_achv_per_ftm = 100 * this.ropc_achv_ftm / this.ropc_target_ftm as any;
        
      // }else{
      //   this.ropc_achv_per_ftm = 0;
      // }
      this.ropc_achv_per_ftm = this.ropc_table_data.retailTotal.ftm.ftm_on_aop_percentage;
      // if(this.ropc_target_ftm != 0){
      //   this.ropc_centerText_ftm = String(this.ropc_achv_per_ftm.toFixed(1)) + '%';
      // }else{
      //   this.ropc_centerText_ftm = "0%"
      // }
      this.ropc_centerText_ftm =  String(this.ropc_achv_per_ftm.toFixed(1)) + '%';
    }




    // ytd case  --------------
    this.ropc_target_ytd = this.ropc_table_data.retailTotal.ytd.cy as any;
    this.ropc_achv_ytd = this.ropc_table_data.retailTotal.ytd.ly as any;
    if(this.ropc_target_ytd!=0){
      this.ropc_achv_per_ytd = 100 * this.ropc_achv_ytd / this.ropc_target_ytd as any;

    }else{
      this.ropc_achv_per_ytd = 0;
    }
    this.ropc_achv_per_ytd = this.ropc_table_data.retailTotal.ytd.achd_aop_percentage;
    // if(this.ropc_target_ytd != 0){
    //   this.ropc_centerText_ytd = String(this.ropc_achv_per_ytd.toFixed(1)) + '%';
    // }
    this.ropc_centerText_ytd = String(this.ropc_achv_per_ytd) + '%';







    // console.log("ROPC Data For Circle Gauge");
    
    // console.log("mtd target ", this.ropc_target);
    // console.log("mtd ach ", this.ropc_achv);
    // console.log("mtd ach% ", this.ropc_centerText);


    // console.log("ftm target ", this.ropc_target_ftm);
    // console.log("ftm ach ", this.ropc_achv_ftm);
    // console.log("ftm ach% ", this.ropc_centerText_ftm);


    // console.log("ytd target ", this.ropc_target_ytd);
    // console.log("ytd ach ", this.ropc_achv_ytd);
    // console.log("ytd ach% ", this.ropc_centerText_ytd);
  }




  // PROPERTY -------
  property_target = this.property_table_data.retailTotal.ftmAop_and_projection.aop as any;
  property_target_per = 100 as any;

  property_achv = this.property_table_data.retailTotal.mtd.currentMonth_mtd as any;
  property_achv_per = 100 * this.property_achv / this.property_target as any;

  property_imd_current = this.property_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
  property_imd_prev = this.property_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

  // property_centerText = this.property_achv_per + '%';
  property_centerText = "0%"
  property_growDegrow_lm = this.property_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
  property_growDegrow_ly = this.property_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


  // ftm case ------
  property_target_ftm = '' as any;
  property_achv_ftm = '' as any;
  property_achv_per_ftm = '' as any;
  property_centerText_ftm = '0%';

  // ytd case ------
  property_target_ytd = '' as any;
  property_achv_ytd = '' as any;
  property_achv_per_ytd = '' as any;
  property_centerText_ytd = '0%';


  setUpPropertyData(){
    this.property_target = this.property_table_data.retailTotal.ftmAop_and_projection.aop as any;
    // this.topLine_target_per = 75 as any;
    this.property_achv = this.property_table_data.retailTotal.mtd.currentMonth_mtd as any;
    if(this.property_target!=0){
      this.property_achv_per = 100 * this.property_achv / this.property_target as any;
      // this.property_achv_per = this.property_table_data.retailTotal. as any;

    }else{
      this.property_achv_per = 0;
    }
    this.property_imd_current = this.property_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.property_imd_prev = this.property_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

    if(this.property_target !=0){
      this.property_centerText = String(this.property_achv_per.toFixed(1)) + '%';
    }else{
      this.property_centerText = "0%"
    }
    // console.log("property_centerText", this.property_centerText )

    this.property_growDegrow_lm = this.property_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.property_growDegrow_ly = this.property_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;



    // ftm case --------------
    this.property_target_ftm = this.property_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.property_achv_ftm = this.property_table_data.retailTotal.ftm.currentMonth_ftm as any;
    // this.property_achv_per_ftm = 100 * this.property_achv_ftm / this.property_target_ftm as any;
    if(this.property_target_ftm!=0){
      this.property_achv_per_ftm = 100 * this.property_achv_ftm / this.property_target_ftm as any;

    }else{
      this.property_achv_per_ftm = 0;
    }
    this.property_achv_per_ftm = this.property_table_data.retailTotal.ftm.ftm_on_aop_percentage
    if(this.property_target_ftm != 0){
      this.property_centerText_ftm = String(this.property_achv_per_ftm.toFixed(1)) + '%';
    }else{
      this.property_centerText_ftm = "0%"
    }
    this.property_centerText_ftm = String(this.property_achv_per_ftm.toFixed(1)) + '%';






    // ytd case  --------------
    this.property_target_ytd = this.property_table_data.retailTotal.ytd.aop as any;
    this.property_achv_ytd = this.property_table_data.retailTotal.ytd.ly as any;
    // this.property_achv_per_ytd = 100 * this.property_achv_ytd / this.property_target_ytd as any;
    if(this.property_target_ytd!=0){
      this.property_achv_per_ytd = 100 * this.property_achv_ytd / this.property_target_ytd as any;

    }else{
      this.property_achv_per_ytd = 0;
    }
    this.property_achv_per_ytd = this.property_table_data.retailTotal.ytd.achd_aop_percentage
    // if(this.property_target_ytd != 0){
    //   this.property_centerText_ytd = String(this.property_achv_per_ytd.toFixed(1)) + '%';
    // }

    this.property_centerText_ytd = String(this.property_achv_per_ytd) + '%';




    // console.log("Property Data For Circle Gauge");
    
    // console.log("mtd target ", this.property_target);
    // console.log("mtd ach ", this.property_achv);
    // console.log("mtd ach% ", this.property_centerText);


    // console.log("ftm target ", this.property_target_ftm);
    // console.log("ftm ach ", this.property_achv_ftm);
    // console.log("ftm ach% ", this.property_centerText_ftm);


    // console.log("ytd target ", this.property_target_ytd);
    // console.log("ytd ach ", this.property_achv_ytd);
    // console.log("ytd ach% ", this.property_centerText_ytd);
  }



  filter_btn_clicked = 0;
  monthName = '';
  showMonthFlag = false

  windowWidth= window.innerWidth as any


  


  
  

  constructor(
    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,


    private SideNavStatusService: SideNavStatusService,
    private modalService: NgbModal,
  ) {
    // // console.log("----->    ----->", this.transformJson_ropc(this.ropc_table_data_server))
    // this.toplinePerformance_data();
    // this.healthPerformance_data();
    // this.frhPerformance_data();
    // this.pvtCarPerformance_data();
    // this.ropcPerformance_data();
    // this.propertyPerformance_data();

    // this.opened_gwp_section = "ytd" as any;
    // this.opened_imd_section = 'ytd' as any;


    this.executeGWPFunctions()
   }


   async  executeGWPFunctions() {
    await Promise.all([
      this.toplinePerformance_data(),
      this.healthPerformance_data(),
      this.frhPerformance_data(),
      this.pvtCarPerformance_data(),
      this.ropcPerformance_data(),
      this.propertyPerformance_data(),
      // this.activationPerformance_data(),
      // this.recruitmentPerformance_data(),
      // this.kaamChalao()
    ]);
    
    
    setTimeout(() => {
      // Your function code here
      // console.log("Function executed after 3 seconds");
      this.opened_gwp_section = "mtd" as any;
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }



  async  executeIMDFunctions() {
    await Promise.all([
      this.activationPerformance_data(),
      this.recruitmentPerformance_data(),
      // this.kaamChalao()
    ]);
    
    setTimeout(() => {
      // Your function code here
      // console.log("Function executed after 3 seconds");
      // this.opened_gwp_section = "mtd" as any;
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }

  ngOnInit(): void {
    // ropc_table_data = this.transformJson_ropc(this.ropc_table_data_server) as any;

    
    this.sideNavStatus();
    this.sideNav_state = true;
    this.setUpValuesInDropDown();
    this.getChannelList();







    this.month_selectedItems = sessionStorage.getItem('selectedMonthYear');
    if (this.month_selectedItems == null){
      this.month_selectedItems = []
    }
    else{
      this.month_selectedItems = JSON.parse(this.month_selectedItems);
    }
    this.setUpValuesInDropDown()
    this.get_zone_list();
    this.get_state_list();
    this.get_location_list();
    this.getChannelList();
    // this.get_subChannelList();
    this.getMonthYearList();


    



    // this.toplinePerformance_data();
    // this.healthPerformance_data();
    // this.frhPerformance_data();
    // this.pvtCarPerformance_data();
    // this.ropcPerformance_data();
    // this.propertyPerformance_data();
    // setTimeout(() => {
    //   // Your function code here
    //   // console.log("Function executed after 3 seconds");
    //   this.opened_gwp_section = "mtd" as any;
    //   this.opened_imd_section = 'mtd' as any;
    // }, 5000);
  }

  ngAfterViewInit(): void {
    // this.toplinePerformance_data();
    // this.healthPerformance_data();
    // this.frhPerformance_data();
    // this.pvtCarPerformance_data();
    // this.ropcPerformance_data();
    // this.propertyPerformance_data();
    
  }


  getMonthYearList(): any {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.getMonthYearList().subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.month_dropdownList = res.monthYearList
        // return this.zone_dropdownList
      } else {
      }
    });
  }



  get_zone_list(): any {
    const data = {
      userAgentId: this.userAgentId
    }
    this.rest.get_zone_list(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
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
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
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
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.location_dropdownList = res.locationList
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
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.imdChannel_dropdownList = res.channelList
      } else {

        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }








  // transformData(data:any) {
  //   const { 
  //     monthNameonly, 
  //     retailAsOn, 
  //     currentMonth, 
  //     prevMonth, 
  //     lastYearCurrentMonth, 
  //     lastYearPrevMonth, 
  //     retail_sub_channels 
  //   } = data;
  
  //   const transformedData = {
  //     monthNameonly,
  //     retailAsOn,
  //     currentMonth,
  //     prevMonth,
  //     lastYearCurrentMonth,
  //     lastYearPrevMonth,
  //     retailSubChannels: [],
  //     retailStrategicInitiatives: {},
  //     retailTotal: {}
  //   };
  
  //   // Transform retail_sub_channels data
  //   transformedData.retailSubChannels = retail_sub_channels.map((subChannel:any) => ({
  //     name: subChannel.name,
  //     ftmAop_and_projection: { 
  //       aop: subChannel.ftmAop_and_projection.aop, 
  //       base: subChannel.ftmAop_and_projection.base, 
  //       aspirational: subChannel.ftmAop_and_projection.aspirational, 
  //       growthOnAopPercentage: subChannel.ftmAop_and_projection.growthOnAopPercentage, 
  //       projection: subChannel.ftmAop_and_projection.projection 
  //     },
  //     mtd: { 
  //       currentMonth_mtd: subChannel.mtd.currentMonth_mtd, 
  //       lastYearCurrentMonth_mtd: subChannel.mtd.lastYearCurrentMonth_mtd, 
  //       growthPercentage: subChannel.mtd.growthPercentage 
  //     },
  //     percentageAchievement: { 
  //       mtd_on_aop_percentage: subChannel.percentageAchievement.mtd_on_aop_percentage, 
  //       mtd_on_projection_percentage: subChannel.percentageAchievement.mtd_on_projection_percentage, 
  //       mtd_on_aspirational_percentage: subChannel.percentageAchievement.mtd_on_aspirational_percentage 
  //     },
  //     runRateOnMtdAndFtdBook: { 
  //       ftd: subChannel.runRateOnMtdAndFtdBook.ftd, 
  //       dar: subChannel.runRateOnMtdAndFtdBook.dar, 
  //       crr: subChannel.runRateOnMtdAndFtdBook.crr 
  //     },
  //     ftm: { 
  //       currentMonth_ftm: subChannel.ftm.currentMonth_ftm, 
  //       ftm_on_aop_percentage: subChannel.ftm.ftm_on_aop_percentage, 
  //       ftm_on_projection_percentage: subChannel.ftm.ftm_on_projection_percentage, 
  //       ftm_on_aspirational_percentage: subChannel.ftm.ftm_on_aspirational_percentage 
  //     },
  //     ytd: { 
  //       aop: subChannel.ytd.aop, 
  //       aspirational: subChannel.ytd.aspirational, 
  //       cy: subChannel.ytd.cy, 
  //       ly: subChannel.ytd.ly, 
  //       achd_aop_percentage: subChannel.ytd.achd_aop_percentage, 
  //       achd_aspirational_percentage: subChannel.ytd.achd_aspirational_percentage, 
  //       growth_Percentage: subChannel.ytd.growth_Percentage 
  //     },
  //     contributingImdCountMtd: { 
  //       currentMonth_imdCount: subChannel.contributingImdCountMtd.currentMonth_imdCount, 
  //       prevMonth_imdCount: subChannel.contributingImdCountMtd.prevMonth_imdCount, 
  //       lastYearCurrentMonth_imdCount: subChannel.contributingImdCountMtd.lastYearCurrentMonth_imdCount, 
  //       growthOverLm_percentage: subChannel.contributingImdCountMtd.growthOverLm_percentage, 
  //       growthOverLy_percentage: subChannel.contributingImdCountMtd.growthOverLy_percentage 
  //     }
  //   }));
  
  //   // Find and extract "Retail Strategic Initiatives" and "Total"
  //   const retailStrategicInitiativesIndex = retail_sub_channels.findIndex((subChannel:any) => subChannel.name === "RETAIL STRATEGIC INITIATIVES");
  //   const totalIndex = retail_sub_channels.findIndex((subChannel:any) => subChannel.name === "Total");
  
  //   if (retailStrategicInitiativesIndex !== -1) {
  //     transformedData.retailStrategicInitiatives = retail_sub_channels[retailStrategicInitiativesIndex];
  //   }
  
  //   if (totalIndex !== -1) {
  //     transformedData.retailTotal = retail_sub_channels[totalIndex];
  //   }
  
  //   return transformedData;
  // }


  // transformData(data:any) {
  //   const { 
  //     monthNameonly, 
  //     retailAsOn, 
  //     currentMonth, 
  //     prevMonth, 
  //     lastYearCurrentMonth, 
  //     lastYearPrevMonth, 
  //     retail_sub_channels 
  //   } = data;
  
  //   const transformedData = {
  //     monthNameonly,
  //     retailAsOn,
  //     currentMonth,
  //     prevMonth,
  //     lastYearCurrentMonth,
  //     lastYearPrevMonth,
  //     retailSubChannels: [],
  //     retailStrategicInitiatives: {},
  //     retailTotal: {}
  //   };
  
  //   // Filter out "Retail Strategic Initiatives" and "Total"
  //   const filteredSubChannels = retail_sub_channels.filter(
  //     (subChannel:any) => subChannel.name !== "RETAIL STRATEGIC INITIATIVES" && 
  //                   subChannel.name !== "Total"
  //   );
  
  //   // Transform filtered sub-channels data
  //   transformedData.retailSubChannels = filteredSubChannels.map((subChannel:any) => ({
  //     name: subChannel.name,
  //     ftmAop_and_projection: { 
  //       aop: subChannel.ftmAop_and_projection.aop, 
  //       base: subChannel.ftmAop_and_projection.base, 
  //       aspirational: subChannel.ftmAop_and_projection.aspirational, 
  //       growthOnAopPercentage: subChannel.ftmAop_and_projection.growthOnAopPercentage, 
  //       projection: subChannel.ftmAop_and_projection.projection 
  //     },
  //     mtd: { 
  //       currentMonth_mtd: subChannel.mtd.currentMonth_mtd, 
  //       lastYearCurrentMonth_mtd: subChannel.mtd.lastYearCurrentMonth_mtd, 
  //       growthPercentage: subChannel.mtd.growthPercentage 
  //     },
  //     percentageAchievement: { 
  //       mtd_on_aop_percentage: subChannel.percentageAchievement.mtd_on_aop_percentage, 
  //       mtd_on_projection_percentage: subChannel.percentageAchievement.mtd_on_projection_percentage, 
  //       mtd_on_aspirational_percentage: subChannel.percentageAchievement.mtd_on_aspirational_percentage 
  //     },
  //     runRateOnMtdAndFtdBook: { 
  //       ftd: subChannel.runRateOnMtdAndFtdBook.ftd, 
  //       dar: subChannel.runRateOnMtdAndFtdBook.dar, 
  //       crr: subChannel.runRateOnMtdAndFtdBook.crr 
  //     },
  //     ftm: { 
  //       currentMonth_ftm: subChannel.ftm.currentMonth_ftm, 
  //       ftm_on_aop_percentage: subChannel.ftm.ftm_on_aop_percentage, 
  //       ftm_on_projection_percentage: subChannel.ftm.ftm_on_projection_percentage, 
  //       ftm_on_aspirational_percentage: subChannel.ftm.ftm_on_aspirational_percentage 
  //     },
  //     ytd: { 
  //       aop: subChannel.ytd.aop, 
  //       aspirational: subChannel.ytd.aspirational, 
  //       cy: subChannel.ytd.cy, 
  //       ly: subChannel.ytd.ly, 
  //       achd_aop_percentage: subChannel.ytd.achd_aop_percentage, 
  //       achd_aspirational_percentage: subChannel.ytd.achd_aspirational_percentage, 
  //       growth_Percentage: subChannel.ytd.growth_Percentage 
  //     },
  //     contributingImdCountMtd: { 
  //       currentMonth_imdCount: subChannel.contributingImdCountMtd.currentMonth_imdCount, 
  //       prevMonth_imdCount: subChannel.contributingImdCountMtd.prevMonth_imdCount, 
  //       lastYearCurrentMonth_imdCount: subChannel.contributingImdCountMtd.lastYearCurrentMonth_imdCount, 
  //       growthOverLm_percentage: subChannel.contributingImdCountMtd.growthOverLm_percentage, 
  //       growthOverLy_percentage: subChannel.contributingImdCountMtd.growthOverLy_percentage 
  //     }
  //   }));
  
  //   // Find and extract "Retail Strategic Initiatives" and "Total"
  //   const retailStrategicInitiativesIndex = retail_sub_channels.findIndex((subChannel:any) => subChannel.name === "RETAIL STRATEGIC INITIATIVES");
  //   const totalIndex = retail_sub_channels.findIndex((subChannel:any) => subChannel.name === "Total");
  
  //   if (retailStrategicInitiativesIndex !== -1) {
  //     transformedData.retailStrategicInitiatives = retail_sub_channels[retailStrategicInitiativesIndex];
  //   }
  
  //   if (totalIndex !== -1) {
  //     transformedData.retailTotal = retail_sub_channels[totalIndex];
  //   }
  
  //   return transformedData;
  // }















  transformData(data: any) {
    const { 
      monthNameonly, 
      retailAsOn, 
      currentMonth, 
      prevMonth, 
      lastYearCurrentMonth, 
      lastYearPrevMonth, 
      retail_sub_channels = [] 
    } = data;
  
    const transformedData = {
      monthNameonly,
      retailAsOn,
      currentMonth,
      prevMonth,
      lastYearCurrentMonth,
      lastYearPrevMonth,
      retailSubChannels: [],
      retailStrategicInitiatives: {}, 
      retailTotal: {}
    };
  
    // Filter out "Retail Strategic Initiatives" and "Total"
    const filteredSubChannels = retail_sub_channels.filter(
      (subChannel: any) => subChannel.name !== "RETAIL STRATEGIC INITIATIVES" && 
                            subChannel.name !== "Total"
    );
  
    // Transform filtered sub-channels data
    transformedData.retailSubChannels = filteredSubChannels.map((subChannel: any) => ({
      name: subChannel.name,
      ftmAop_and_projection: { 
        aop: subChannel.ftmAop_and_projection?.aop || 0, 
        base: subChannel.ftmAop_and_projection?.base || 0, 
        aspirational: subChannel.ftmAop_and_projection?.aspirational || 0, 
        growthOnAopPercentage: subChannel.ftmAop_and_projection?.growthOnAopPercentage || 0, 
        projection: subChannel.ftmAop_and_projection?.projection || 0
      },
      mtd: { 
        currentMonth_mtd: subChannel.mtd?.currentMonth_mtd || 0, 
        lastYearCurrentMonth_mtd: subChannel.mtd?.lastYearCurrentMonth_mtd || 0, 
        growthPercentage: subChannel.mtd?.growthPercentage || 0
      },
      percentageAchievement: { 
        mtd_on_aop_percentage: subChannel.percentageAchievement?.mtd_on_aop_percentage || 0, 
        mtd_on_projection_percentage: subChannel.percentageAchievement?.mtd_on_projection_percentage || 0, 
        mtd_on_aspirational_percentage: subChannel.percentageAchievement?.mtd_on_aspirational_percentage || 0
      },
      runRateOnMtdAndFtdBook: { 
        ftd: subChannel.runRateOnMtdAndFtdBook?.ftd || 0, 
        dar: subChannel.runRateOnMtdAndFtdBook?.dar || 0, 
        crr: subChannel.runRateOnMtdAndFtdBook?.crr || 0
      },
      ftm: { 
        currentMonth_ftm: subChannel.ftm?.currentMonth_ftm || 0, 
        ftm_on_aop_percentage: subChannel.ftm?.ftm_on_aop_percentage || 0, 
        ftm_on_projection_percentage: subChannel.ftm?.ftm_on_projection_percentage || 0, 
        ftm_on_aspirational_percentage: subChannel.ftm?.ftm_on_aspirational_percentage || 0
      },
      ytd: { 
        aop: subChannel.ytd?.aop || 0, 
        aspirational: subChannel.ytd?.aspirational || 0, 
        cy: subChannel.ytd?.cy || 0, 
        ly: subChannel.ytd?.ly || 0, 
        achd_aop_percentage: subChannel.ytd?.achd_aop_percentage || 0, 
        achd_aspirational_percentage: subChannel.ytd?.achd_aspirational_percentage || 0, 
        growth_Percentage: subChannel.ytd?.growth_Percentage || 0
      },
      contributingImdCountMtd: { 
        currentMonth_imdCount: subChannel.contributingImdCountMtd?.currentMonth_imdCount || 0, 
        prevMonth_imdCount: subChannel.contributingImdCountMtd?.prevMonth_imdCount || 0, 
        lastYearCurrentMonth_imdCount: subChannel.contributingImdCountMtd?.lastYearCurrentMonth_imdCount || 0, 
        growthOverLm_percentage: subChannel.contributingImdCountMtd?.growthOverLm_percentage || 0, 
        growthOverLy_percentage: subChannel.contributingImdCountMtd?.growthOverLy_percentage || 0
      }
    }));
  
    // Find and extract "Retail Strategic Initiatives" and "Total" if they exist
    const retailStrategicInitiatives = retail_sub_channels.find(
      (subChannel: any) => subChannel.name === "RETAIL STRATEGIC INITIATIVES"
    );
  
    const total = retail_sub_channels.find(
      (subChannel: any) => subChannel.name === "Total"
    );
  
    transformedData.retailStrategicInitiatives = retailStrategicInitiatives || 'nodata'; 
    transformedData.retailTotal = total || {}; 
  
    return transformedData;
  }




















  
  
  // Example usage:
  // const sampleData = { 
  //   // ... your original data 
  // };
  
  // const transformedData = transformData(sampleData);
  // // console.log(transformedData);





  toplinePerformance_data() {
    this.nameManipulate()
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'topline',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.toplinePerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }

        // this.topLine_table_data = res;
        this.topLine_table_data = this.transformData(res);
        console.log("topLine_table_data------------->",this.topLine_table_data)
        this.setUpToplineData();
        this.storeInSessionStorage()

        

        
        
        // this.health_table_data = res;
        // this.imdChannel_dropdownList = res.channelList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }


    });
  // this.setUpToplineData()
  }

  healthPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'health',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.healthPerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.health_table_data = this.transformData(res);
        console.log("this.health_table_data-->", this.health_table_data)
        this.setUpHealthData();
        // this.health_table_data = res;
        // this.imdChannel_dropdownList = res.channelList
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
    // this.setUpHealthData();

  }

  frhPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'frh',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.frhPerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.frh_table_data = this.transformData(res);
        this.setUpFrhData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
    // this.setUpFrhData();
  }




  // pvtCar_table_data


  pvtCarPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'pvtCar',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.pvtcarPerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.pvtCar_table_data = this.transformData(res);
        this.setUpPvtcarData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
    // this.setUpPvtcarData();
  }

  // ropc_table_data

  ropcPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'ropc',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.ropcPerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.ropc_table_data = this.transformData(res);
        console.log("this.ropc_table_data--> ", this.ropc_table_data)
        this.setUpRopcData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
    // this.setUpRopcData();
  }

  //
  propertyPerformance_data() {
    

    const data = {
      // userAgentId: this.userAgentId,
      // table: 'property',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.propertyPerformance(data).subscribe((res: any) => {
      if (res.success) {
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        this.property_table_data = this.transformData(res);
        this.setUpPropertyData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
    // this.setUpPropertyData();
  }












  transformData_imd(data: any): any {
    const {
      currentMonth,
      lastYearCurrentMonth,
      lastYearPrevMonth,
      monthNameonly,
      prevMonth,
      retailAsOn,
      retail_sub_channels,
      status,
      success,
    } = data;
  
    const transformedData: any = {
      currentMonth,
      lastYearCurrentMonth,
      lastYearPrevMonth,
      monthNameonly,
      prevMonth,
      retailAsOn,
      retailSubChannels: retail_sub_channels.filter(
        (subChannel: any) =>
          subChannel.name !== "RETAIL STRATEGIC INITIATIVES" && subChannel.name !== "Total"
      ),
      // Find and extract "Retail Strategic Initiatives" and "Total" if they exist
      retailStrategicInitiatives:
        retail_sub_channels.find(
          (subChannel: any) => subChannel.name === "RETAIL STRATEGIC INITIATIVES"
        ) || "nodata",
      retailTotal:
        retail_sub_channels.find((subChannel: any) => subChannel.name === "Total") || {},
      status,
      success,
    };
  
    return transformedData;
  }

  // activation recruitment baki ache
  activationPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'activation',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    this.rest.activation(data).subscribe((res: any) => {
      if (res.success) {
        // this.activation_table_data = res;
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        console.log("this.activation_table_data1111---> ", res);
        this.activation_table_data = this.transformData_imd(res);
        console.log("this.activation_table_data---> ", this.activation_table_data);
        this.setUpActivationData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }


  activation_target:any;
  activation_achv:any;
  activation_achv_per:any;
  activation_centerText: any;
  activation_lmtd:any; // 1st box
  activation_lymtd:any; //2nd box

  activation_target_ftm:any;
  activation_achv_ftm: any;
  activation_achv_per_ftm: any;
  activation_centerText_ftm: any;
  activation_lftm:any; // 1st box
  activation_lyftm:any; //2nd box

  activation_target_ytd:any;
  activation_achv_ytd: any;
  activation_achv_per_ytd: any;
  activation_centerText_ytd: any;
  activation_lytd:any; // 1st box





  setUpActivationData(){
    this.activation_target = this.activation_table_data.retailTotal.projection as any;
    this.activation_achv = this.activation_table_data.retailTotal.mtd_count as any;    
    this.activation_achv_per = this.activation_table_data.retailTotal.acheivement_on_mtd as any;
    this.activation_centerText = String(this.activation_achv_per) + '%' as any;
    this.activation_lmtd = this.activation_table_data.retailTotal.growth_over_lmtd as any; // growth_over_mtd
    this.activation_lymtd = this.activation_table_data.retailTotal.growth_over_lymtd as any;

    

    



    // ftm case --------------
    this.activation_target_ftm = this.activation_table_data.retailTotal.projection as any;
    this.activation_achv_ftm = this.activation_table_data.retailTotal.ftm_count as any;
    this.activation_achv_per_ftm = this.activation_table_data.retailTotal.acheivement_on_ftm as any;
    this.activation_centerText_ftm = String(this.activation_achv_per_ftm) + '%' as any;
    this.activation_lftm = this.activation_table_data.retailTotal.growth_over_lftm as any;
    this.activation_lyftm = this.activation_table_data.retailTotal.growth_over_lyftm as any;






    // ytd case  --------------
    this.activation_target_ytd = this.activation_table_data.retailTotal.projection as any;
    this.activation_achv_ytd = this.activation_table_data.retailTotal.ytd_count as any;
    this.activation_achv_per_ytd = this.activation_table_data.retailTotal.acheivement_on_ytd as any;
    this.activation_centerText_ytd = String(this.activation_achv_per_ytd) + '%' as any;
    this.activation_lytd = this.activation_table_data.retailTotal.growth_over_lytd as any;
  }
































  recruitment_target:any;
  recruitment_achv:any;
  recruitment_achv_per:any;
  recruitment_centerText: any;
  recruitment_lmtd:any; // 1st box
  recruitment_lymtd:any; //2nd box

  recruitment_target_ftm:any;
  recruitment_achv_ftm: any;
  recruitment_achv_per_ftm: any;
  recruitment_centerText_ftm: any;
  recruitment_lftm:any; // 1st box
  recruitment_lyftm:any; //2nd box

  recruitment_target_ytd:any;
  recruitment_achv_ytd: any;
  recruitment_achv_per_ytd: any;
  recruitment_centerText_ytd: any;
  recruitment_lytd:any; // 1st box





  setUpRecruitmentData(){
    this.recruitment_target = this.recruitment_table_data.retailTotal.projection as any;
    this.recruitment_achv = this.recruitment_table_data.retailTotal.mtd_count as any;    
    this.recruitment_achv_per = this.recruitment_table_data.retailTotal.acheivement_on_mtd as any;
    this.recruitment_centerText = String(this.recruitment_achv_per) + '%' as any;
    this.recruitment_lmtd = this.recruitment_table_data.retailTotal.growth_over_lmtd as any; // growth_over_mtd
    this.recruitment_lymtd = this.recruitment_table_data.retailTotal.growth_over_lymtd as any;

    

    



    // ftm case --------------
    this.recruitment_target_ftm = this.recruitment_table_data.retailTotal.projection as any;
    this.recruitment_achv_ftm = this.recruitment_table_data.retailTotal.ftm_count as any;
    this.recruitment_achv_per_ftm = this.recruitment_table_data.retailTotal.acheivement_on_ftm as any;
    this.recruitment_centerText_ftm = String(this.recruitment_achv_per_ftm) + '%' as any;
    this.recruitment_lftm = this.recruitment_table_data.retailTotal.growth_over_lftm as any;
    this.recruitment_lyftm = this.recruitment_table_data.retailTotal.growth_over_lyftm as any;






    // ytd case  --------------
    this.recruitment_target_ytd = this.recruitment_table_data.retailTotal.projection as any;
    this.recruitment_achv_ytd = this.recruitment_table_data.retailTotal.ytd_count as any;
    this.recruitment_achv_per_ytd = this.recruitment_table_data.retailTotal.acheivement_on_ytd as any;
    this.recruitment_centerText_ytd = String(this.recruitment_achv_per_ytd) + '%' as any;
    this.recruitment_lytd = this.recruitment_table_data.retailTotal.growth_over_lytd as any;
  }







  recruitmentPerformance_data() {
    const data = {
      // userAgentId: this.userAgentId,
      // table: 'activation',
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
    }
    
    this.rest.recruitment(data).subscribe((res: any) => {
      if (res.success) {
        // this.activation_table_data = res;
        if(res.status == 0){
          window.alert("No Data Availale");
          return
        }
        
        // console.log("this.recruitment_table_data---> ", res);
        this.recruitment_table_data = this.transformData_imd(res);
        console.log("this.recruitment_table_data---> ", this.activation_table_data);
        this.setUpRecruitmentData();
      } else {
        // this.common.openSnackBar('Something went wrong')
        // this.notifier.notify('error', 'Something went wrong')
      }
    });
  }


  kaamChalao(){
    let res1 = {
      'retail_sub_channels': [
        {
          'name': 'DIGITAL AGENCY',
          'projection': 4392,
          'ytd_count': 1117.0,
          'lytd_count': 861.0,
          'ftm_count': 118.0,
          'lftm_count': 130.0,
          'lyftm_count': 108.0,
          'mtd_count': 69.0,
          'lmtd_count': 99.0,
          'lymtd_count': 72.0,
          'acheivement_on_ftm': 2.69,
          'acheivement_on_mtd': 1.57,
          'acheivement_on_ytd': 25.43,
          'growth_over_lmtd': -30.3,
          'growth_over_lymtd': -4.17,
          'growth_over_lftm': -9.23,
          'growth_over_lyftm': 9.26,
          'growth_over_lytd': 29.73,
          'growth_over_projection': -74.57
        },
        {
          'name': 'ENTERPRISE PARTNERS',
          'projection': 4183,
          'ytd_count': 404.0,
          'lytd_count': 867.0,
          'ftm_count': 31.0,
          'lftm_count': 42.0,
          'lyftm_count': 70.0,
          'mtd_count': 21.0,
          'lmtd_count': 40.0,
          'lymtd_count': 56.0,
          'acheivement_on_ftm': 0.74,
          'acheivement_on_mtd': 0.5,
          'acheivement_on_ytd': 9.66,
          'growth_over_lmtd': -47.5,
          'growth_over_lymtd': -62.5,
          'growth_over_lftm': -26.19,
          'growth_over_lyftm': -55.71,
          'growth_over_lytd': -53.4,
          'growth_over_projection': -90.34
        },
        {
          'name': 'GROWTH MARKETS',
          'projection': 3235,
          'ytd_count': 3475.0,
          'lytd_count': 4890.0,
          'ftm_count': 497.0,
          'lftm_count': 442.0,
          'lyftm_count': 406.0,
          'mtd_count': 400.0,
          'lmtd_count': 364.0,
          'lymtd_count': 334.0,
          'acheivement_on_ftm': 15.36,
          'acheivement_on_mtd': 12.36,
          'acheivement_on_ytd': 107.42,
          'growth_over_lmtd': 9.89,
          'growth_over_lymtd': 19.76,
          'growth_over_lftm': 12.44,
          'growth_over_lyftm': 22.41,
          'growth_over_lytd': -28.94,
          'growth_over_projection': 7.42
        },
        {
          'name': 'HEALTH FIRST AGENCY',
          'projection': 3548,
          'ytd_count': 1725.0,
          'lytd_count': 1240.0,
          'ftm_count': 155.0,
          'lftm_count': 186.0,
          'lyftm_count': 143.0,
          'mtd_count': 114.0,
          'lmtd_count': 160.0,
          'lymtd_count': 101.0,
          'acheivement_on_ftm': 4.37,
          'acheivement_on_mtd': 3.21,
          'acheivement_on_ytd': 48.62,
          'growth_over_lmtd': -28.75,
          'growth_over_lymtd': 12.87,
          'growth_over_lftm': -16.67,
          'growth_over_lyftm': 8.39,
          'growth_over_lytd': 39.11,
          'growth_over_projection': -51.38
        },
        {
          'name': 'MOTOR AGENCY',
          'projection': 3563,
          'ytd_count': 1511.0,
          'lytd_count': 2752.0,
          'ftm_count': 104.0,
          'lftm_count': 136.0,
          'lyftm_count': 212.0,
          'mtd_count': 88.0,
          'lmtd_count': 116.0,
          'lymtd_count': 178.0,
          'acheivement_on_ftm': 2.92,
          'acheivement_on_mtd': 2.47,
          'acheivement_on_ytd': 42.41,
          'growth_over_lmtd': -24.14,
          'growth_over_lymtd': -50.56,
          'growth_over_lftm': -23.53,
          'growth_over_lyftm': -50.94,
          'growth_over_lytd': -45.09,
          'growth_over_projection': -57.59
        },
        {
          'name': 'RETAIL AND SME BROKERS',
          'projection': 5481,
          'ytd_count': 114.0,
          'lytd_count': 255.0,
          'ftm_count': 8.0,
          'lftm_count': 12.0,
          'lyftm_count': 29.0,
          'mtd_count': 6.0,
          'lmtd_count': 10.0,
          'lymtd_count': 25.0,
          'acheivement_on_ftm': 0.15,
          'acheivement_on_mtd': 0.11,
          'acheivement_on_ytd': 2.08,
          'growth_over_lmtd': -40.0,
          'growth_over_lymtd': -76.0,
          'growth_over_lftm': -33.33,
          'growth_over_lyftm': -72.41,
          'growth_over_lytd': -55.29,
          'growth_over_projection': -97.92
        },
        {
          'name': 'VARIABLE AGENCY',
          'projection': 6592,
          'ytd_count': 109.0,
          'lytd_count': 0.0,
          'ftm_count': 17.0,
          'lftm_count': 20.0,
          'lyftm_count': 0.0,
          'mtd_count': 14.0,
          'lmtd_count': 16.0,
          'lymtd_count': 0.0,
          'acheivement_on_ftm': 0.26,
          'acheivement_on_mtd': 0.21,
          'acheivement_on_ytd': 1.65,
          'growth_over_lmtd': -12.5,
          'growth_over_lymtd': 22,
          'growth_over_lftm': -15.0,
          'growth_over_lyftm': 44,
          'growth_over_lytd': 66,
          'growth_over_projection': -98.35
        },
        {
          'name': 'Total',
          'projection': 30994,
          'ytd_count': 8455.0,
          'lytd_count': 10865.0,
          'ftm_count': 930.0,
          'lftm_count': 968.0,
          'lyftm_count': 968.0,
          'mtd_count': 712.0,
          'lmtd_count': 805.0,
          'lymtd_count': 766.0,
          'acheivement_on_ftm': 3.0,
          'acheivement_on_mtd': 2.3,
          'acheivement_on_ytd': 27.28,
          'growth_over_lmtd': -11.55,
          'growth_over_lymtd': -7.05,
          'growth_over_lftm': -3.93,
          'growth_over_lyftm': -3.93,
          'growth_over_lytd': -22.18,
          'growth_over_projection': -72.72
        }
      ],
      'success': true,
      'status': 1,
      'monthNameonly': 'Jan',
      'retailAsOn': "27th Jan'25",
      'currentMonth': "Jan'25",
      'prevMonth': "Dec'24",
      'lastYearCurrentMonth': "Jan'24",
      'lastYearPrevMonth': "Dec'23"
    }
    // console.log("this.recruitment_table_data---> ", res);
    this.recruitment_table_data = this.transformData_imd(res1);
    console.log("this.recruitment_table_data---> ", this.recruitment_table_data);
     this.setUpRecruitmentData();
  }




  



  










  



  render_gwp_bullet_charts(){
    this.opened_gwp_section='all'
    this.gwp_all=true; 
    setTimeout(() => {
      this.topline_BulletCharts();
      this.health_BulletCharts();    
      this.frh_BulletCharts();
      this.pvtcar_BulletCharts();
      this.ropc_BulletCharts();
      this.property_BulletCharts();
    }, 100);
    
  }



  render_imd_bullet_charts(){
    this.opened_imd_section='all';
    this.imd_all = true;

    setTimeout(() => {
      this.activation_BulletCharts();
      this.recruitment_BulletCharts();  
    }, 100);
  }



















  openModal(modal: any) {
    // this.search = search;
    this.modalService.open(modal, { centered: true, size: 'xl' });

  }

  // openModalDownload(modal: any, imdCode: any, search:any) {
  //   this.search = search;

  //   this.downloadImd = imdCode;
  //   this.modalService.open(modal, { centered: true, size: 'sm' });

  // }

  closeModal() {
    this.modalService.dismissAll();
  }

  goBack(modal: any) {
    this.closeModal();

    // if (this.search == 1) {
    //   this.closeModal();
    // } else {
    //   this.closeModal();
    //   this.openModal(modal, 1);

    // }
  }
























  // chartMaking(){
  //   const bulletChartOptions1: Highcharts.Options = {
  //     chart: {
  //       type: 'bullet',
  //       inverted: true,
  //       marginLeft: 135,
  //       marginTop: 40, // Adjust as needed
  //     },
  //     title: {
  //       text: '2024 YTD', // Main title
  //     },
  //     xAxis: {
  //       categories: [
  //         '<span class="hc-cat-title">Revenue</span><br/>U.S. $ (1,000s)',
  //       ],
  //       title: {
  //         text: '', // No axis title
  //       },
  //       labels: {
  //         style: {
  //           color: 'black',
  //           fontWeight: 'normal',
  //         },
  //       },
  //       gridLineWidth: 0, // Remove grid lines
  //     },
  //     yAxis: {
  //       plotBands: [
  //         { from: 0, to: 150, color: '#666' },
  //         { from: 150, to: 225, color: '#999' },
  //         { from: 225, to: 9e9, color: '#bbb' },
  //       ],
  //       title: '', // No axis title
  //       labels: {
  //         enabled: false, // Hide labels
  //       },
  //       gridLineWidth: 0, // Remove grid lines
  //     },
  //     tooltip: {
  //       pointFormat: '<b>{point.y}</b> (with target at {point.target})',
  //     },
  //     plotOptions: {
  //       series: {
  //         dataLabels: {
  //           enabled: true,
  //           style: {
  //             fontSize: '12px',
  //           },
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Revenue',
  //         data: [{ y: 275, target: 250 }],
  //         type: 'bullet',
  //         color: '#000', // Adjust color as needed
  //       },
  //     ],
  //     credits: {
  //       enabled: false, // Remove Highcharts branding
  //     },
  //   };
    
  //   // Render the chart
  //   Highcharts.chart('container1', bulletChartOptions1);
    
  //   const bulletChartOptions2: Highcharts.Options = {
  //     chart: {
  //       type: 'bullet',
  //       inverted: true,
  //       marginLeft: 135,
  //     },
  //     xAxis: {
  //       categories: ['<span class="hc-cat-title">Profit</span><br/>%'],
  //       title: '',
  //       labels: {
  //         style: {
  //           color: 'black',
  //           fontWeight: 'normal',
  //         },
  //       },
  //       gridLineWidth: 0, // Remove grid lines
  //     },
  //     yAxis: {
  //       plotBands: [
  //         { from: 0, to: 20, color: '#666' },
  //         { from: 20, to: 25, color: '#999' },
  //         { from: 25, to: 100, color: '#bbb' },
  //       ],
  //       labels: {
  //         format: '{value}%',
  //       },
  //       title: '',
  //     },
  //     tooltip: {
  //       pointFormat: '<b>{point.y}</b> (with target at {point.target})',
  //     },
  //     plotOptions: {
  //       series: {
  //         dataLabels: {
  //           enabled: true,
  //           style: {
  //             fontSize: '12px',
  //           },
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Profit',
  //         data: [{ y: 22, target: 27 }],
  //         type: 'bullet',
  //         color: '#000', // Adjust color as needed
  //       },
  //     ],
  //     credits: {
  //       enabled: false, // Remove Highcharts branding
  //     },
  //   };
    
  //   // Render the chart
  //   Highcharts.chart('container2', bulletChartOptions2);
    
  //   const bulletChartOptions3: Highcharts.Options = {
  //     chart: {
  //       type: 'bullet',
  //       inverted: true,
  //       marginLeft: 135,
  //     },
  //     xAxis: {
  //       categories: [
  //         '<span class="hc-cat-title">New Customers</span><br/>Count',
  //       ],
  //       title: '',
  //       labels: {
  //         style: {
  //           color: 'black',
  //           fontWeight: 'normal',
  //         },
  //       },
  //       gridLineWidth: 0, // Remove grid lines
  //     },
  //     yAxis: {
  //       plotBands: [
  //         { from: 0, to: 1400, color: '#666' },
  //         { from: 1400, to: 2000, color: '#999' },
  //         { from: 2000, to: 9e9, color: '#bbb' },
  //       ],
  //       labels: {
  //         format: '{value}',
  //       },
  //       title: '',
  //     },
  //     tooltip: {
  //       pointFormat: '<b>{point.y}</b> (with target at {point.target})',
  //     },
  //     plotOptions: {
  //       series: {
  //         dataLabels: {
  //           enabled: true,
  //           style: {
  //             fontSize: '12px',
  //           },
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'New Customers',
  //         data: [{ y: 1650, target: 2100 }],
  //         type: 'bullet',
  //         color: '#000', // Adjust color as needed
  //       },
  //     ],
  //     credits: {
  //       enabled: true,
  //     },
  //   };
    
  //   // Render the chart
  //   Highcharts.chart('container3', bulletChartOptions3);
    
  // }





  topline_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.topline_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.topline_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.topline_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }




  health_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.health_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.health_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.health_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }






  frh_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.frh_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.frh_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.frh_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }






  pvtcar_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.pvtcar_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.pvtcar_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.pvtcar_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }






  ropc_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.ropc_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.ropc_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.ropc_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }







  property_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.property_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.property_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.property_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }











  recruitment_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.recruitment_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.recruitment_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.recruitment_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }





  activation_BulletCharts(): void {
    

    // Chart 1: YTD
    Highcharts.chart(this.activation_chartContainer1.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      
      xAxis: {
        categories: ['<span class="hc-cat-title">YTD</span>'],
        // categories: [], // Remove categories
        // labels: { enabled: false }, // Disable labels
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 150, color: '#666' },
          { from: 150, to: 225, color: '#999' },
          { from: 225, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // labels: { enabled: true },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'YTD', data: [{ y: 275, target: 250 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });




    // Chart 2: MTD
    Highcharts.chart(this.activation_chartContainer2.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: ['<span class="hc-cat-title">MTD</span>'],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 20, color: '#666' },
          { from: 20, to: 25, color: '#999' },
          { from: 25, to: 100, color: '#bbb' },
        ],
        labels: { format: '{value}%' },
        // categories: [],
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'MTD', data: [{ y: 22, target: 27 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });





    // Chart 3: FTM
    Highcharts.chart(this.activation_chartContainer3.nativeElement, {
      chart: {
        type: 'bullet',
        inverted: true,
        // marginLeft: 135,
      },
      title: {
        text: '', // Disable the title
      },
      xAxis: {
        categories: [
          '<span class="hc-cat-title">FTM</span>',
        ],
        labels: { style: { color: 'black', fontWeight: 'normal' } },
        gridLineWidth: 0,
      },
      yAxis: {
        plotBands: [
          { from: 0, to: 1400, color: '#666' },
          { from: 1400, to: 2000, color: '#999' },
          { from: 2000, to: 9e9, color: '#bbb' },
        ],
        labels: { format: '{value}' },
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> (with target at {point.target})',
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px' },
          },
        },
      },
      series: [{ name: 'FTM', data: [{ y: 1650, target: 2100 }], type: 'bullet', color: '#000' }],
      credits: { enabled: false },
      legend: {
        enabled: false, // Disable the legend
      },
    });
  }

















  // growthBoxColor(value:any){
  //   if(value == 0){
  //     return '';
  //   }
  //   else if(value > 0){
  //     return 'green';
  //   }
  //   else(value < 0){
  //     return 'red';
  //   }
  // }



  growthBoxColor(value: any): string {
    if (value === 0) {
      return '';
    } else if (value > 0) {
      return 'green';
    } else {
      return 'red'; 
    }
  }

















  resetAll() {
    // this.apiComPlitionCount = 0
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
    // this.get_subChannelList()
    // this.getcomparison();
  }


  opened_gwp_section_temp = "";

  nameManipulate(){
    this.opened_gwp_section_temp = this.opened_gwp_section;
    this.opened_gwp_section = '';
  }


  async applyFilter_gwp(){

    await Promise.all([
      
      this.toplinePerformance_data(),
      this.healthPerformance_data(),
      this.frhPerformance_data(),
      this.pvtCarPerformance_data(),
      this.ropcPerformance_data(),
      this.propertyPerformance_data(),
      // this.activationPerformance_data(),
      // this.recruitmentPerformance_data(),
      // this.kaamChalao()
      this.setAllData_gwp()
    ]);
    
    
    setTimeout(() => {
      this.opened_gwp_section = this.opened_gwp_section_temp;
      this.opened_gwp_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }


  async applyFilter_gwp_firstcall(){

    await Promise.all([
      this.opened_gwp_section = '',
      this.toplinePerformance_data(),
      this.healthPerformance_data(),
      this.frhPerformance_data(),
      this.pvtCarPerformance_data(),
      this.ropcPerformance_data(),
      this.propertyPerformance_data(),
      // this.activationPerformance_data(),
      // this.recruitmentPerformance_data(),
      // this.kaamChalao()
      this.setAllData_gwp()
    ]);
    
    
    setTimeout(() => {
      this.opened_gwp_section = 'mtd';
      this.opened_gwp_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }














  opened_imd_section_temp = "";

  nameManipulate_imd(){
    this.opened_imd_section_temp = this.opened_imd_section;
    this.opened_imd_section = '';
  }


  async applyFilter_imd(){

    await Promise.all([
      this.nameManipulate_imd(),
      this.activationPerformance_data(),
      this.recruitmentPerformance_data(),
      // this.kaamChalao()
      this.setAllData_imd()
    ]);
    
    
    setTimeout(() => {
      this.opened_imd_section = this.opened_imd_section_temp;
      this.opened_imd_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }



  async applyFilter_imd_firstcall(){

    await Promise.all([
      this.opened_imd_section = '',
      this.activationPerformance_data(),
      this.recruitmentPerformance_data(),
      // this.kaamChalao()
      this.setAllData_imd()
    ]);
    
    
    setTimeout(() => {
      this.opened_imd_section = 'mtd';
      this.opened_imd_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 6000);
  }







  storeInSessionStorage(){
    sessionStorage.setItem("lastUpdatedOn", this.topLine_table_data.retailAsOn)
  }





  

  




  

  

}
