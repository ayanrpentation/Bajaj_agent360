// import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { AnyNaptrRecord } from 'dns';
import * as Highcharts from 'highcharts';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-new-agent-perform',
  templateUrl: './new-agent-perform.component.html',
  styleUrls: ['./new-agent-perform.component.css']
})
export class NewAgentPerformComponent implements OnInit {

  projectName = sessionStorage.getItem('projectName') as any;
  projectName_plural = sessionStorage.getItem('projectName_plural') as any;

  // @ViewChild('target-element') scrollElement!: ElementRef ;

  // @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  // @ViewChild('scrollToElement') scrollToElement!: ElementRef;


  // @ViewChild('targetDiv') targetDiv!: ElementRef;





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
  // vintageYearOptions = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] as any;

  vintageYearOptions = [ 0, 1, 2] as any;


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





  segmentOverviewTableData = {
    'quarters': ['Q3', 'Q2'],

    'bestPerformers': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    },


    'goodPerformers': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    },



    'potentialPerformers': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    },




    'alarming': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    },




    'concerning': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    },





    'laggardAgents': {
      'segmentHighlights': 'High GWP and NOP Growth with experienced agents',
      'noOfAgents': 3789,
      'avgVintageInYears': 5.27,
      'revenuePerPolicy': 4808.27,
      'percentContriToRevenue': 49.79,
      'avgNoOfUniqueProductsSold': 10,
      'topAgentBackground': 'General Insurance Agent(Private)',
      'topSubchannel': 'EMERGING RELATIONSHIPS',

      'gwpGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgGwpNumbers': {
        'Q3': 1,
        'Q2': -7,
      },

      'nopGrowthInPercent': {
        'Q3': 1,
        'Q2': -7,
      },

      'avgNopNumbers': {
        'Q3': 1,
        'Q2': -7,
      },
    }
  } as any;


  segmentOverviewTable_2_Data = [
    {
      "Agent_Age_Group": "45-60",
      "Agent_Gender": "Female",
      "Agent_Vintage": 5,
      "CY_COR": 95.207923,
      "CY_Last_3_months_GWP(Cr)": 23.9134492,
      "CY_Productivity(Lakhs)": 3.0658268205128207,
      "CY_vs_LY_Last_3_months__growth": 0.060958,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": 0.17614879487333335,
      "LY_COR": 98.679538,
      "LY_Last_3_months_GWP(Cr)": 22.5394886,
      "LY_Productivity(Lakhs)": 2.8896780256410257,
      "Marital_Status": "Married",
      "No_of_Agents": 260,
      "No_of_Meets": 7,
      "Segment_Highlights": "Mid-Senior level agents with good numbers and decent growth",
      "Segments": "Good Perfomers"
    },
    {
      "Agent_Age_Group": "60-75",
      "Agent_Gender": "Male",
      "Agent_Vintage": 19,
      "CY_COR": 87.136257,
      "CY_Last_3_months_GWP(Cr)": 17.0087238,
      "CY_Productivity(Lakhs)": 3.03185807486631,
      "CY_vs_LY_Last_3_months__growth": 0.00214,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": 0.006475650623333333,
      "LY_COR": 88.82631,
      "LY_Last_3_months_GWP(Cr)": 16.9723954,
      "LY_Productivity(Lakhs)": 3.0253824242424243,
      "Marital_Status": "Married",
      "No_of_Agents": 187,
      "No_of_Meets": 8,
      "Segment_Highlights": "Senior-most agents with steady numbers across all metrics",
      "Segments": "Steady Perfomers"
    },
    {
      "Agent_Age_Group": "45-60",
      "Agent_Gender": "Male",
      "Agent_Vintage": 14,
      "CY_COR": 108.114541,
      "CY_Last_3_months_GWP(Cr)": 71.487955,
      "CY_Productivity(Lakhs)": 2.7327199923547396,
      "CY_vs_LY_Last_3_months__growth": 0.052368,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": 0.13598574923666668,
      "LY_COR": 74.069186,
      "LY_Last_3_months_GWP(Cr)": 67.9305678,
      "LY_Productivity(Lakhs)": 2.5967342431192657,
      "Marital_Status": "Married",
      "No_of_Agents": 872,
      "No_of_Meets": 7,
      "Segment_Highlights": "Top agents with high experience and best numbers for all key metrics",
      "Segments": "Top Performers"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Gender": "Male",
      "Agent_Vintage": 5,
      "CY_COR": 109.825394,
      "CY_Last_3_months_GWP(Cr)": 44.1952459,
      "CY_Productivity(Lakhs)": 2.2320831262626264,
      "CY_vs_LY_Last_3_months__growth": -0.151789,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": -0.39943461111,
      "LY_COR": 102.358106,
      "LY_Last_3_months_GWP(Cr)": 52.1040512,
      "LY_Productivity(Lakhs)": 2.631517737373737,
      "Marital_Status": "Married ",
      "No_of_Agents": 660,
      "No_of_Meets": 6,
      "Segment_Highlights": "Degrowing Mid-Senior Agents",
      "Segments": "Degrowing Agents"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Gender": "Female",
      "Agent_Vintage": 4,
      "CY_COR": 82.540163,
      "CY_Last_3_months_GWP(Cr)": 15.7022098,
      "CY_Productivity(Lakhs)": 2.136355074829932,
      "CY_vs_LY_Last_3_months__growth": -0.065649,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": -0.15010472109,
      "LY_COR": 86.329796,
      "LY_Last_3_months_GWP(Cr)": 16.8054795,
      "LY_Productivity(Lakhs)": 2.286459795918367,
      "Marital_Status": "Married",
      "No_of_Agents": 245,
      "No_of_Meets": 5,
      "Segment_Highlights": "Lowest COR but degrowing",
      "Segments": "Good Profitablity "
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Gender": "Male",
      "Agent_Vintage": 4,
      "CY_COR": 95.473053,
      "CY_Last_3_months_GWP(Cr)": 12.6583788,
      "CY_Productivity(Lakhs)": 1.8670175221238938,
      "CY_vs_LY_Last_3_months__growth": 0.061625,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": 0.10837632743333332,
      "LY_COR": 108.167699,
      "LY_Last_3_months_GWP(Cr)": 11.9235873,
      "LY_Productivity(Lakhs)": 1.7586411946902654,
      "Marital_Status": "Single",
      "No_of_Agents": 226,
      "No_of_Meets": 5,
      "Segment_Highlights": "Below average agents but showing good growth",
      "Segments": "Below Average"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Gender": "Female",
      "Agent_Vintage": 5,
      "CY_COR": 152.305278,
      "CY_Last_3_months_GWP(Cr)": 3.9776638,
      "CY_Productivity(Lakhs)": 1.8415110185185182,
      "CY_vs_LY_Last_3_months__growth": 0.104292,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": 0.17391699074,
      "LY_COR": 76.33,
      "LY_Last_3_months_GWP(Cr)": 3.6020031,
      "LY_Productivity(Lakhs)": 1.6675940277777779,
      "Marital_Status": "Married",
      "No_of_Agents": 72,
      "No_of_Meets": 4,
      "Segment_Highlights": "Least profitable agents with low contribution to revenue",
      "Segments": "Least Profitable "
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Gender": "Male",
      "Agent_Vintage": 4,
      "CY_COR": 100.393052,
      "CY_Last_3_months_GWP(Cr)": 4.0667799,
      "CY_Productivity(Lakhs)": 0.8802553896103897,
      "CY_vs_LY_Last_3_months__growth": -0.379237,
      "CY_vs_LY_Productivity_Growth_(INR)((Lakhs)": -0.53776625541,
      "LY_COR": 89.743896,
      "LY_Last_3_months_GWP(Cr)": 6.55126,
      "LY_Productivity(Lakhs)": 1.418021645021645,
      "Marital_Status": "Married",
      "No_of_Agents": 154,
      "No_of_Meets": 6,
      "Segment_Highlights": "Agents showing degrowth and poor performance",
      "Segments": "Poor Performers"
    }
  ] as any

  segmentOverviewTable_3_Data = [
    {
      "Agent_Age_Group": "45-60",
      "Agent_Background": "Composite",
      "Agent_Gender": "Female",
      "Agent_Vintage": 5,
      "CY_COR": 99.500732,
      "CY_Last_3_months_GWP": 299025647.0,
      "CY_Productivity": 114306.43998470948,
      "CY_vs_LY_Last_3_months__growth": 1.50031846599432,
      "CY_vs_LY_growth_in_Productivity": -1714.9606269113283,
      "LY_COR": 84.447871,
      "LY_Last_3_months_GWP": 303511984,
      "LY_Productivity": 116021.4006116208,
      "Marital_Status": "Married ",
      "No_of_Agents": 872,
      "No_of_Meets": 5.807095,
      "Segment_Highlights": "Agents that contribute the highest to the total GWP ",
      "Segments": "Highest Contributers"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Background": "Business",
      "Agent_Gender": "Male",
      "Agent_Vintage": 3,
      "CY_COR": 96.669039,
      "CY_Last_3_months_GWP": 283996441.581,
      "CY_Productivity": 143432.54625303028,
      "CY_vs_LY_Last_3_months__growth": -2.83180329169941,
      "CY_vs_LY_growth_in_Productivity": 4061.7275661616004,
      "LY_COR": 94.791968,
      "LY_Last_3_months_GWP": 275954221,
      "LY_Productivity": 139370.81868686868,
      "Marital_Status": "Married ",
      "No_of_Agents": 660,
      "No_of_Meets": 7.405034,
      "Segment_Highlights": "Agents with good performance in terms of GWP and productivity",
      "Segments": "Good Performers"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Background": "CI",
      "Agent_Gender": "Male",
      "Agent_Vintage": 5,
      "CY_COR": 76.221864,
      "CY_Last_3_months_GWP": 208114459.0,
      "CY_Productivity": 266813.408974359,
      "CY_vs_LY_Last_3_months__growth": -11.2132136864166,
      "CY_vs_LY_growth_in_Productivity": 29918.357692307705,
      "LY_COR": 115.776731,
      "LY_Last_3_months_GWP": 184778140,
      "LY_Productivity": 236895.05128205128,
      "Marital_Status": "Married ",
      "No_of_Agents": 260,
      "No_of_Meets": 6.072639,
      "Segment_Highlights": "Agents that have grown in terms of productivity who could grow further",
      "Segments": "Potential Performers"
    },
    {
      "Agent_Age_Group": "45-60",
      "Agent_Background": "MFA",
      "Agent_Gender": "Female",
      "Agent_Vintage": 5,
      "CY_COR": 105.261735,
      "CY_Last_3_months_GWP": 205347526.0,
      "CY_Productivity": 366038.3707664884,
      "CY_vs_LY_Last_3_months__growth": 4.94502475768809,
      "CY_vs_LY_growth_in_Productivity": -18100.68805704097,
      "LY_COR": 117.339432,
      "LY_Last_3_months_GWP": 215502012,
      "LY_Productivity": 384139.0588235294,
      "Marital_Status": "Married ",
      "No_of_Agents": 187,
      "No_of_Meets": 5.580442,
      "Segment_Highlights": "Agents that are degrowing in terms of productivity",
      "Segments": "Degrowing agents"
    },
    {
      "Agent_Age_Group": "18-30",
      "Agent_Background": "MFA",
      "Agent_Gender": "Male",
      "Agent_Vintage": 3,
      "CY_COR": 78.592092,
      "CY_Last_3_months_GWP": 166703180.0,
      "CY_Productivity": 226807.0476190476,
      "CY_vs_LY_Last_3_months__growth": 0.999205893972748,
      "CY_vs_LY_growth_in_Productivity": -2266.2693877551355,
      "LY_COR": 86.662353,
      "LY_Last_3_months_GWP": 168368888,
      "LY_Productivity": 229073.31700680274,
      "Marital_Status": "Single",
      "No_of_Agents": 245,
      "No_of_Meets": 5.352941,
      "Segment_Highlights": "Younger agents with steady performance",
      "Segments": "Steady Performers"
    },
    {
      "Agent_Age_Group": "45-60",
      "Agent_Background": "MFA",
      "Agent_Gender": "Male",
      "Agent_Vintage": 5,
      "CY_COR": 78.796408,
      "CY_Last_3_months_GWP": 106601681.0,
      "CY_Productivity": 157229.6179941003,
      "CY_vs_LY_Last_3_months__growth": 7.53315700528212,
      "CY_vs_LY_growth_in_Productivity": -11844.353982300905,
      "LY_COR": 73.798732,
      "LY_Last_3_months_GWP": 114632153,
      "LY_Productivity": 169073.9719764012,
      "Marital_Status": "Married ",
      "No_of_Agents": 226,
      "No_of_Meets": 7.197183,
      "Segment_Highlights": "Mid-Senior Agents below average numbers ",
      "Segments": "Below-Par Performers"
    },
    {
      "Agent_Age_Group": "45-60",
      "Agent_Background": "CI",
      "Agent_Gender": "Male",
      "Agent_Vintage": 16,
      "CY_COR": 90.354786,
      "CY_Last_3_months_GWP": 88324800.0,
      "CY_Productivity": 191179.22077922078,
      "CY_vs_LY_Last_3_months__growth": 3.78045350796152,
      "CY_vs_LY_growth_in_Productivity": -7227.441558441555,
      "LY_COR": 143.418504,
      "LY_Last_3_months_GWP": 91663878,
      "LY_Productivity": 198406.66233766233,
      "Marital_Status": "Married ",
      "No_of_Agents": 154,
      "No_of_Meets": 5.316239,
      "Segment_Highlights": "Seniormost agents with noticeable growth in gwp and productivity",
      "Segments": "Growing Agents"
    },
    {
      "Agent_Age_Group": "30-45",
      "Agent_Background": "MFA",
      "Agent_Gender": "Male",
      "Agent_Vintage": 4,
      "CY_COR": 84.805176,
      "CY_Last_3_months_GWP": 55930417.0,
      "CY_Productivity": 258937.11574074076,
      "CY_vs_LY_Last_3_months__growth": -14.249734630085,
      "CY_vs_LY_growth_in_Productivity": 36897.85185185188,
      "LY_COR": 105.890235,
      "LY_Last_3_months_GWP": 47960481,
      "LY_Productivity": 222039.26388888888,
      "Marital_Status": "Married ",
      "No_of_Agents": 72,
      "No_of_Meets": 4.470588,
      "Segment_Highlights": "Agents with very low contribution to total GWP, but are showing good growth in productivity",
      "Segments": "Poor Performers"
    }
  ] as any

  







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

  constructor(private rest: RestApiService, private scroller: ViewportScroller, private elementRef: ElementRef, private modalService: NgbModal, private route: Router,) { 
    
    // this.openModal('laggardDetails_similar_char', document.getElementById("laggardDetails_similar_char"))

    this.selectedMonthYear = JSON.parse(this.selectedMonthYear);
    this.selectedChannel = JSON.parse(this.selectedChannel);
    this.selectedSubChannel = JSON.parse(this.selectedSubChannel);
    this.selectedLocation = JSON.parse(this.selectedLocation);
    this.selectedState = JSON.parse(this.selectedState);
    this.selectedZone = JSON.parse(this.selectedZone);


  }

  ngOnInit(): void {
    console.log("welcome agent segmentation")
    this.selectedSegment_pie = ''




    // this.get_segment_overview();
    // this.get_segment_overview2();
    // this.agentSegmentWiseVarComparison()
    // this.digitalFriendlinessTrend_line()
    // this.averageMeetingsWithAgentsYTD_groupColumn()
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




  




  scrollToTop(): void {
    
    const timeoutDelay = 1000;
    setTimeout(() => {
      const targetDiv = document.getElementById('targetDiv');
      console.log("target", targetDiv)
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.gwpLifeCycle_inYears_line()
      }else {
        console.error("Target div not found or null.");
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
        width: 400,
        // width: 315,
        // width: pieWidth,
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
        width: 410,
        // width: pieWidth,
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



  // get_segment_overview3(){
  //   const data = {
  //     userName: this.userName,
  //     userAgentId: this.userAgentId,
  //     userDesignation: this.userDesignation,
  //     selectedMonthYear: this.selectedMonthYear,  // it will have single value
  //     selectedChannel: this.selectedChannel,
  //     selectedSubChannel: this.selectedSubChannel,
  //     selectedLocation: this.selectedLocation,
  //     selectedState: this.selectedZone,
  //     selectedZone: this.selectedZone,
  //   };


  //   this.rest.get_segment_overview3(data).subscribe((res: any) => {
  //     if(res.success){
  //       this.segmentOverviewTable_3_Data = res.data
  //     }
  //   });
  // }






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

        let chartData = res.data

        // let chartData = [{ "name": 'Steady Performers', "y": 45 }, { "name": 'Potential Business Drivers', "y": 70 }, { "name": 'Low Quality of Business', "y": 82 }, { "name": 'Alarming', "y": 25 }, { "name": 'Laggard', "y": 22 }] as any

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
    
        for( let i = 0; i < chartData.length; i++){
    
          chartData[i]['color'] = colors[i]
    
        }
    
        // let chartData = [
        //   { name: 'Steady Performers', y: 45, color: 'rgb(75, 192, 192)' },
        //   { name: 'Potential Business Drivers', y: 70, color: 'rgb(0, 255, 255)' },
        //   { name: 'Low Quality of Business', y: 82, color: 'rgb(255, 159, 64)' },
        //   { name: 'Alarming', y: 25, color: 'rgb(255, 206, 86)' },
        //   { name: 'Laggard', y: 22, color: 'rgb(255, 99, 132)' },
        // ] as any;
    
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
    
        Highcharts.chart('agentSegmentWiseVarComparison', chartOptions);

      }
    });


    




  }







  

  newAgent_LM_contribution(data: any){

    // let chartData = [{ "name": 'Target', "y": 550 }, { "name": 'Achievement', "y": 150 }] as any
    let chartData = data as any;

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

      let chartData = res.data

    //   const chartData = {
    //     x_axis_category_list: [
    //         'LY',
    //         'CY',
    //         'CY Q1',
    //         'CY Q2',
    //         'CY Q3',
    //         'CY Q4'
    //     ],
    //     data: [
    //         {
    //             // type: 'line',
    //             name: 'Steady Performers',
    //             data: [
    //                 70,
    //                 82,
    //                 76,
    //                 85,
    //                 84,
    //                 82
    //             ]
    //         },
    //         {
    //             // type: 'line',
    //             name: 'Potential Business Drivers',
    //             data: [
    //                 65,
    //                 70,
    //                 72,
    //                 76,
    //                 68,
    //                 65
    //             ]
    //         },
    //         {
    //             // type: 'line',
    //             name: 'Low Quality of Business',
    //             data: [
    //                 49,
    //                 41,
    //                 45,
    //                 47,
    //                 36,
    //                 34
    //             ]
    //         },
    //         {
    //             // type: 'line',
    //             name: 'Alarming',
    //             data: [
    //                 30,
    //                 26,
    //                 19,
    //                 30,
    //                 29,
    //                 25
    //             ]
    //         },
    //         {
    //             // type: 'line',
    //             name: 'Laggard',
    //             data: [
    //                 25,
    //                 21,
    //                 19,
    //                 24,
    //                 22,
    //                 18
    //             ]
    //         },
    //     ],
    // };

      const colors = [
          'rgb(75, 192, 192)',     // Green
          'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          'rgb(255, 206, 86)',     // Yellow
          'rgb(255, 99, 132)',    // Red
          'rgb(54, 162, 235)',     // Blue
          'rgb(153, 102, 255)',    // Purple
          '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
      ];

      const seriesData: Highcharts.SeriesOptionsType[] = chartData.data.map((item: any, index: any) => ({
          ...item,
          type: 'line',
          color: colors[index]
      }));

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
                      text: 'Percentage'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true,
                          formatter: function () {
                              return this.y + '%'; // Display value on top of every bar
                          },
                          style: {
                              fontSize: '15px'
                          }
                      }
                  }
              },
              series: seriesData,
          };

          Highcharts.chart('digitalFriendlinessTrend_line', chartOptions);
      };

      createChart();

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

    console.log("------seriesData------>> ", seriesData)


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
  
        let givenData = res.data
      //   let givenData = {
      //     x_axis_categories: ['Sales Review', 'Trainings', 'Support Meetings'],
      //     data: [
      //         {
      //             name: 'Steady Performers',
      //             data: [12, 5, 19]
      //         },
      //         {
      //             name: 'Potential Business Drivers',
      //             data: [12, 3, 16]
      //         },
      //         {
      //             name: 'Low Quality of Business',
      //             data: [12, 1, 8]
      //         },
      //         {
      //             name: 'Alarming',
      //             data: [12, 2, 19]
      //         },
      //         {
      //             name: 'Laggard',
      //             data: [15, 6, 22]
      //         },
      //     ]
      // };
  
      let segmentWiseData = givenData.data as any;
  
      let colors = [
          'rgb(75, 192, 192)',     // Green
          'rgb(0, 255, 255)',       // Cyan
          'rgb(255, 159, 64)',     // Orange
          'rgb(255, 206, 86)',     // Yellow
          'rgb(255, 99, 132)',    // Red
      ];
  
      let chartData = [] as any;
  
      try {
          // Code that may throw an exception
          for (let segment = 0; segment < segmentWiseData.length; segment++) {
              var singleSeriesData = {
                  'name': segmentWiseData[segment].name,
                  'type': 'column',
                  'color': colors[segment] // Assign color to the entire series
              } as any;
  
              var single_dataObj_list = [] as any;
  
              for (let dataPerSegment = 0; dataPerSegment < segmentWiseData[segment].data.length; dataPerSegment++) {
                  var element = {
                      'y': segmentWiseData[segment].data[dataPerSegment]
                  } as any;
                  single_dataObj_list.push(element);
              }
  
              singleSeriesData['data'] = single_dataObj_list;
              chartData.push(singleSeriesData);
          }
      } catch (error) {
          // Code to handle the exception
      } finally {
          // Code that will always execute, regardless of whether there was an exception
  
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
                  valueSuffix: ''
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
              series: chartData,
          };
  
          Highcharts.chart('averageMeetingsWithAgentsYTD_groupColumn', chartOptions);
      }



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
  
        let givenData = res.data

        // let givenData = {
        //   x_axis_categories: ['Vaibhavi', 'Prakrati', 'Ikramul', 'Farhatul'],
        //   data:[
        //             {
                        
        //                 name: 'Steady Performers',
        //                 data: [14,9,33,4]
        //             },
        //             {
                        
        //                 name: 'Potential Business Drivers',
        //                 data: [59,40,21,54]
        //             },
        //             {
                        
        //                 name: 'Low Quality of Business',
        //                 data: [6,12,11,13]
        //             },
        //             {
                        
        //                 name: 'Alarming',
        //                 data: [10,23,23,6]
        //             },
        //             {
                        
        //               name: 'Laggard',
        //               data: [11,16,12,23]
        //             },
        //         ]
        // }
    
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
    this.hiring_status_newEmp_4Graphs()
        
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




















}
