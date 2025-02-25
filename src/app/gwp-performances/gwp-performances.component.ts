import { Component, OnInit,AfterViewInit, ViewChild, Input } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { SideNavStatusService } from '../side-nav-status.service';
// import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts';
import BulletModule from 'highcharts/modules/bullet';
// Initialize the module
BulletModule(Highcharts);




import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';
import { throws } from 'assert';

@Component({
  selector: 'app-gwp-performances',
  templateUrl: './gwp-performances.component.html',
  styleUrls: ['./gwp-performances.component.css']
})
export class GwpPerformancesComponent implements OnInit,AfterViewInit {


  // @Input() chartTitle: string = 'Default Chart';
  // @Input() chartData: { label: string; value: number }[] = [];

  

  onChartEvent(event: string) {
    console.log('Event from Chart:', event);
  }

  

  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });
    // console.log("sideNav_state--> ", this.sideNav_state)
  }
  productivityMatrix_percent_data = [] as any;
  opened_gwp_section = "" as any;
  userAgentId = this.common.getUserAgentId();

  topLine_table_data: any;
  topline_total_data: any;
  topline_mtd_cor: any;
  topline_mtd_lr: any;
  topline_ftm_cor: any;
  topline_ftm_lr: any;



  health_table_data: any;
  health_total_data: any;
  health_mtd_cor: any;
  health_mtd_lr: any;
  health_ftm_cor: any;
  health_ftm_lr: any;



  frh_table_data: any;
  frh_total_data: any;

  frh_mtd_cor: any;
  frh_mtd_lr: any;
  frh_ftm_cor: any;
  frh_ftm_lr: any;



  pvtCar_table_data: any;
  pvtCar_total_data: any;

  pvtcar_mtd_cor: any;
  pvtcar_mtd_lr: any;
  pvtcar_ftm_cor: any;
  pvtcar_ftm_lr: any;



  ropc_table_data: any;
  ropc_total_data: any;

  ropc_mtd_cor: any;
  ropc_mtd_lr: any;
  ropc_ftm_cor: any;
  ropc_ftm_lr: any;




  property_table_data: any;
  property_total_data: any;
  property_mtd_cor: any;
  property_mtd_lr: any;
  property_ftm_cor: any;
  property_ftm_lr: any;






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


  lob_dropdownList = [] as any;
  lob_selectedItems = [] as any;
  lob_dropdownSettings: IDropdownSettings = {} as any

  product_dropdownList = [] as any;
  product_selectedItems = [] as any;
  product_dropdownSettings: IDropdownSettings = {} as any


  ngAfterViewInit(): void {
    // this.crateFrhColChart();
  }
  prepareDataForProductivityMatrix() {
    const colors = [
      'rgb(75, 192, 192)', 'rgb(0, 255, 255)', 'rgb(255, 159, 64)',
      'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
      'rgb(153, 102, 255)', '#89ff9d', '#34ff56', '#ffabab', '#ff7777', '#ff3c3c'
    ];
  
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

        } 


      });
    };
  
    // this.createProductivityMatrixChart_perc();
    

    
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
  openModal(modal: any) {this.modalService.open(modal, { centered: true, size: 'xl' });}
  closeModal() {this.modalService.dismissAll();}
  goBack(modal: any) {this.closeModal();}

  growthBoxColor(value: any): string {
    if (value === 0) {
      return '';
    } else if (value > 0) {
      return 'green';
    } else {
      return 'red'; 
    }
  }








  currenMonthName: any;
  prevMonthName: any;


  // topline -------
  topLine_target = 0 as any;
  topLine_target_per = 100 as any;
  topLine_achv = 0 as any;
  topLine_achv_per = 0 as any;

  topLine_imd_current = 0 as any;
  topLine_imd_prev = 0 as any;
  topLine_centerText = '0%' as any;


  topLine_growDegrow_lm = 0 as any;
  topLine_growDegrow_ly = 0 as any;


  // ftm case ------
  topLine_target_ftm = 0 as any;
  topLine_achv_ftm = 0 as any;
  topLine_achv_per_ftm = 0 as any;
  topLine_centerText_ftm = '0%' as any;

  // topLine_imd_current_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.currentMonth_imdCount || 0 as any;
  // topLine_imd_prev_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.prevMonth_imdCount || 0 as any;

  // topLine_growDegrow_lm_ftm = this.topLine_table_data.retailTotal.contributingImdCountFtm.growthOverLm_percentage || 0 as any;
  // topLine_growDegrow_ly_ftm = this.topLine_table_data.retailTotal.contributingImdCountMtdFtm.growthOverLy_percentage || 0 as any;



  // ytd case ------
  topLine_target_ytd = 0 as any;
  topLine_achv_ytd =  0 as any;
  topLine_achv_per_ytd = 0 as any;
  topLine_centerText_ytd = '0%';

  // topLine_imd_current_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.currentMonth_imdCount || 0 as any;
  // topLine_imd_prev_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.prevMonth_imdCount || 0 as any;

  // topLine_growDegrow_lm_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.growthOverLm_percentage || 0 as any;
  // topLine_growDegrow_ly_ytd = this.topLine_table_data.retailTotal.contributingImdCountMtdYtd.growthOverLy_percentage || 0 as any;




  setUpToplineData(){
    // -------------------- mtd case --------------
    this.currenMonthName = this.topLine_table_data.currentMonth;
    this.prevMonthName = this.topLine_table_data.prevMonth;

    
    this.topLine_target = this.topLine_table_data.retailTotal.ftmAop_and_projection.aop as any;
    this.topLine_achv = this.topLine_table_data.retailTotal.mtd.currentMonth_mtd as any;
    this.topLine_achv_per = this.topLine_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage

    this.topLine_imd_current = this.topLine_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
    this.topLine_imd_prev = this.topLine_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;

    this.topLine_centerText = String(this.topLine_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage) + '%';

    this.topLine_growDegrow_lm = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
    this.topLine_growDegrow_ly = this.topLine_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


    this.topline_mtd_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.topline_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.topline_total_data.profit_loss_old_year.data[0].COR > this.topline_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.topline_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };
    this.topline_mtd_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // bandingData: {
      //   Aplus: [5],
      //   A: [2]
      // },
      series: [
        { name: 'CY', data: [this.topline_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.topline_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.topline_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.topline_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };









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
    this.topline_ftm_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.topline_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.topline_total_data.profit_loss_old_year.data[0].COR > this.topline_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.topline_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };
    this.topline_ftm_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // bandingData: {
      //   Aplus: [5],
      //   A: [2]
      // },
      series: [
        { name: 'CY', data: [this.topline_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.topline_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.topline_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.topline_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };







    // ytd case  --------------
    this.topLine_target_ytd = this.topLine_table_data.retailTotal.ytd.aop as any;
    this.topLine_achv_ytd = this.topLine_table_data.retailTotal.ytd.cy as any;
    if(this.topLine_target_ytd != 0){
      this.topLine_achv_per_ytd = 100 * this.topLine_achv_ytd / this.topLine_target_ytd as any;
    }else{

      this.topLine_achv_per_ytd = 0;
    }
    this.topLine_centerText_ytd = String(this.topLine_table_data.retailTotal.ytd.achd_aop_percentage) + '%';

    // this.topLine_imd_current_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.currentMonth_imdCount as any;
    // this.topLine_imd_prev_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.prevMonth_imdCount as any;

    // this.topLine_growDegrow_lm_ytd = this.topLine_table_data.retailTotal.contributingImdCountYtd.growthOverLm_percentage;
    // this.topLine_growDegrow_ly_ytd = this.topLine_table_data.retailTotal.contributingImdCountMtdYtd.growthOverLy_percentage;
  }







  // Health -------
  // health_target = 377 as any;
  health_target = 0 as any;
  health_target_per = 100 as any;

  health_achv = 0 as any;
  health_achv_per = 0 as any;

  health_imd_current = 0 as any;
  health_imd_prev = 0 as any;

  health_centerText = '0%' as any
  // health_centerText = this.health_achv_per + '%';

  health_growDegrow_lm = 0 as any;
  health_growDegrow_ly = 0 as any;


  // ftm case ------
  health_target_ftm = '' as any;
  health_achv_ftm = '' as any;
  health_achv_per_ftm = '' as any;
  health_centerText_ftm = '0%';

  // ytd case ------
  health_target_ytd = 0 as any;
  health_achv_ytd = 0 as any;
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

    this.health_mtd_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.health_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.health_total_data.profit_loss_old_year.data[0].COR > this.health_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.health_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };
    this.health_mtd_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.health_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.health_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.health_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.health_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };









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

    this.health_ftm_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.health_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.health_total_data.profit_loss_old_year.data[0].COR > this.health_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.health_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };
    this.health_ftm_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.health_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.health_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.health_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.health_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };








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
  }







  // FRH -------
  frh_target = 0 as any;
  frh_target_per = 100 as any;

  frh_achv = 0 as any;
  // frh_achv_per = 73 as any;
  frh_achv_per = 0 as any;

  frh_imd_current = 0 as any;
  frh_imd_prev = 0 as any;

  // frh_centerText = '0%';
  frh_centerText = '0%';
  frh_growDegrow_lm = 0;
  frh_growDegrow_ly = 0;

  // ftm case ------
  frh_target_ftm = '' as any;
  frh_achv_ftm = '' as any;
  frh_achv_per_ftm = '' as any;
  frh_centerText_ftm = '0%';

  // ytd case ------
  frh_target_ytd = '' as any;
  frh_achv_ytd = '' as any;
  frh_achv_per_ytd = '' as any;
  frh_centerText_ytd = '0%';;

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

     
    this.frh_mtd_cor = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.frh_total_data.cor_current_year.data[0]['Overall LR']], type: 'column',  color: this.frh_total_data.cor_old_year.data[0].COR > this.frh_total_data.cor_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.frh_total_data.cor_old_year.data[0]['Overall LR']], type: 'column' , color: '#1f5cc7'},
      ]
    };
    // this.frh_mtd_lr = {
    //   title: 'Loss Ratio',
    //   level_data: [''],
    //   x_axis_name: "",
    //   y_axis_name: "",
    //   height: 210,
    //   series: [
    //     { name: 'CY', data: [this.frh_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: '#1f5cc7' },
    //     { name: 'LY', data: [this.frh_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: this.frh_total_data.profit_loss_old_year.data[0].COR > this.frh_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
    //   ]
    // };










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

    this.frh_ftm_cor = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.frh_total_data.cor_current_year.data[0]['Overall LR']], type: 'column',  color: this.frh_total_data.cor_old_year.data[0].COR > this.frh_total_data.cor_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.frh_total_data.cor_old_year.data[0]['Overall LR']], type: 'column' , color: '#1f5cc7'},
      ]
    };
    // this.frh_mtd_lr = {
    //   title: 'Loss Ratio',
    //   level_data: [''],
    //   x_axis_name: "",
    //   y_axis_name: "",
    //   height: 210,
    //   series: [
    //     { name: 'CY', data: [this.frh_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: '#1f5cc7' },
    //     { name: 'LY', data: [this.frh_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: this.frh_total_data.profit_loss_old_year.data[0].COR > this.frh_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
    //   ]
    // };






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
  }




  // Private Car -------
  pvtcar_target = 0 as any;
  pvtcar_target_per = 100 as any;

  pvtcar_achv = 0 as any;
  // pvtcar_achv_per = 73 as any;
  pvtcar_achv_per = 100 * this.pvtcar_achv / this.pvtcar_target as any;

  

  pvtcar_imd_current = 0;
  pvtcar_imd_prev = 0 as any;

  pvtcar_centerText = '0%'
  // pvtcar_centerText = this.pvtcar_achv_per + '%';

  pvtcar_growDegrow_lm = 0;
  pvtcar_growDegrow_ly = 0;


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

    this.pvtcar_mtd_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.pvtCar_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.pvtCar_total_data.profit_loss_old_year.data[0].COR > this.pvtCar_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.pvtCar_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };

    this.pvtcar_mtd_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.pvtCar_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.pvtCar_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.pvtCar_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.pvtCar_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };









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

    this.pvtcar_ftm_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.pvtCar_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.pvtCar_total_data.profit_loss_old_year.data[0].COR > this.pvtCar_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.pvtCar_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };

    this.pvtcar_ftm_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.pvtCar_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.pvtCar_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.pvtCar_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.pvtCar_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };







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

  }






  // ROPC -------
  ropc_target = 0 as any; // in case of ropc only projection will be used instead of aop as aop is not coming in this table
  ropc_target_per = 100 as any;

  ropc_achv = 0 as any;
  ropc_achv_per = 100 * this.ropc_achv / this.ropc_target as any;
  


  ropc_imd_current = 0 as any;
  ropc_imd_prev = 0 as any;

  // ropc_centerText = this.ropc_achv_per + '%';
  ropc_centerText = "0%"
  ropc_growDegrow_lm = 0;
  ropc_growDegrow_ly = 0;


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
      this.ropc_achv_per = this.ropc_table_data.retailTotal.percentageAchievement.mtd_on_aop_percentage as any;
      this.ropc_imd_current = this.ropc_table_data.retailTotal.contributingImdCountMtd.currentMonth_imdCount as any;
      this.ropc_imd_prev = this.ropc_table_data.retailTotal.contributingImdCountMtd.prevMonth_imdCount as any;
  
      if(this.ropc_target != 0){
        this.ropc_centerText = String(this.ropc_achv_per.toFixed(1)) + '%';
      }else{
        this.ropc_centerText = "0%"
      }
  
      this.ropc_growDegrow_lm = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLm_percentage;
      this.ropc_growDegrow_ly = this.ropc_table_data.retailTotal.contributingImdCountMtd.growthOverLy_percentage;


      this.ropc_mtd_cor = {
        title: 'Loss Ratio',
        level_data: [''],
        x_axis_name: "",
        y_axis_name: "",
        height: 210,
        // bandingData: {
        //   Aplus: [5],
        //   A: [2]
        // },
        series: [
          { name: 'CY', data: [this.ropc_total_data.cor_current_year.data[0]['Overall LR']], type: 'column', color: this.ropc_total_data.cor_old_year.data[0].COR > this.ropc_total_data.cor_current_year.data[0].COR? '#00e272': '#F87171' },
          { name: 'LY', data: [this.ropc_total_data.cor_old_year.data[0]['Overall LR']], type: 'column',  color: '#1f5cc7'},
          
        ]
      };


      // this.ropc_mtd_lr = {
      //   title: 'Loss Ratio',
      //   level_data: [''],
      //   x_axis_name: "",
      //   y_axis_name: "",
      //   height: 210,
      //   // series: [
      //   //   { name: 'LY', data: [5], type: 'column' },
      //   //   { name: 'CY', data: [2], type: 'column' }
      //   // ],
      //   series: [
      //     { name: 'CY', data: [this.ropc_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: '#1f5cc7' },
      //     { name: 'LY', data: [this.ropc_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: this.ropc_total_data.profit_loss_old_year.data[0].COR > this.ropc_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171'},
      //   ]
      // };
    
      










  
  
      // ftm case --------------
      this.ropc_target_ftm = this.ropc_table_data.retailTotal.ftmAop_and_projection.projection as any;
      this.ropc_achv_ftm = this.ropc_table_data.retailTotal.ftm.currentMonth_ftm as any;
      this.ropc_achv_per_ftm = this.ropc_table_data.retailTotal.ftm.ftm_on_aop_percentage;
      this.ropc_centerText_ftm =  String(this.ropc_achv_per_ftm.toFixed(1)) + '%';

      this.ropc_ftm_cor = {
        title: 'Loss Ratio',
        level_data: [''],
        x_axis_name: "",
        y_axis_name: "",
        height: 210,
        // bandingData: {
        //   Aplus: [5],
        //   A: [2]
        // },
        series: [
          { name: 'CY', data: [this.ropc_total_data.cor_current_year.data[0]['Overall LR']], type: 'column', color: this.ropc_total_data.cor_old_year.data[0].COR > this.ropc_total_data.cor_current_year.data[0].COR? '#00e272': '#F87171' },
          { name: 'LY', data: [this.ropc_total_data.cor_old_year.data[0]['Overall LR']], type: 'column',  color: '#1f5cc7'},
          
        ]
      };


      // this.ropc_ftm_lr = {
      //   title: 'Loss Ratio',
      //   level_data: [''],
      //   x_axis_name: "",
      //   y_axis_name: "",
      //   height: 210,
      //   // series: [
      //   //   { name: 'LY', data: [5], type: 'column' },
      //   //   { name: 'CY', data: [2], type: 'column' }
      //   // ],
      //   series: [
      //     { name: 'CY', data: [this.ropc_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: '#1f5cc7' },
      //     { name: 'LY', data: [this.ropc_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: this.ropc_total_data.profit_loss_old_year.data[0].COR > this.ropc_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171'},
      //   ]
      // };



      
      
      
      
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
    }
  }




  // PROPERTY -------
  property_target = 0 as any;
  property_target_per = 100 as any;

  property_achv = 0 as any;
  property_achv_per = 0 as any;

  property_imd_current = 0 as any;
  property_imd_prev = 0 as any;

  // property_centerText = this.property_achv_per + '%';
  property_centerText = "0%"
  property_growDegrow_lm = 0;
  property_growDegrow_ly = 0;


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

    this.property_mtd_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.property_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.property_total_data.profit_loss_old_year.data[0].COR > this.property_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.property_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };

    this.property_mtd_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.property_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.property_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.property_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.property_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };







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

    this.property_ftm_cor = {
      title: 'COR',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      // series: [
      //   { name: 'LY', data: [5], type: 'column' },
      //   { name: 'CY', data: [2], type: 'column' }
      // ],
      series: [
        { name: 'CY', data: [this.property_total_data.profit_loss_current_year.data[0].COR], type: 'column', color: this.property_total_data.profit_loss_old_year.data[0].COR > this.property_total_data.profit_loss_current_year.data[0].COR? '#00e272': '#F87171' },
        { name: 'LY', data: [this.property_total_data.profit_loss_old_year.data[0].COR], type: 'column',  color: '#1f5cc7'},
      ]
    };

    this.property_ftm_lr = {
      title: 'Loss Ratio',
      level_data: [''],
      x_axis_name: "",
      y_axis_name: "",
      height: 210,
      series: [
        { name: 'CY', data: [this.property_total_data.profit_loss_current_year.data[0]['Claim Ratio']], type: 'column',  color: this.property_total_data.profit_loss_old_year.data[0]['Claim Ratio'] > this.property_total_data.profit_loss_current_year.data[0]['Claim Ratio']? '#00e272': '#F87171' },
        { name: 'LY', data: [this.property_total_data.profit_loss_old_year.data[0]['Claim Ratio']], type: 'column' , color: '#1f5cc7'},
      ]
    };






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

  }

  






  constructor(
    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,


    private SideNavStatusService: SideNavStatusService,
    private modalService: NgbModal,
  ) {
    this.executeGWPFunctions();
  }



  ngOnInit(): void {
    this.sideNavStatus();
    this.sideNav_state = true;
    this.setUpValuesInDropDown();
    // this.getChannelList();

    





    this.month_selectedItems = sessionStorage.getItem('selectedMonthYear');
    if (this.month_selectedItems == null){
      this.month_selectedItems = []
    }
    else{
      this.month_selectedItems = JSON.parse(this.month_selectedItems);
    }
    this.setUpValuesInDropDown()
    this.get_all_filter_list();
    // this.get_zone_list();
    // this.get_state_list();
    // this.get_location_list();
    // this.getChannelList();
    // this.get_subChannelList();
    this.getMonthYearList();


  }







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


    this.product_dropdownSettings = {
      singleSelection: false,
      idField: 'PRODUCT',
      textField: 'PRODUCT',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }


    this.lob_dropdownSettings = {
      singleSelection: false,
      idField: 'LOB',
      textField: 'LOB',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
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







  get_all_filter_list(): any {
    const data = {
      userAgentId: this.userAgentId,
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
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


          // console.log("zone_dropdownList--", this.zone_dropdownList);
          // console.log("state_dropdownList--", this.state_dropdownList);
          // console.log("location_dropdownList--", this.location_dropdownList);
          // console.log("imdChannel_dropdownList--", this.imdChannel_dropdownList);


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



  



  getMiddleProgressStyles(value: number) {
    const isNegative = value < 0;
    return {
      '--progress': Math.abs(value), // Use absolute value for progress
      '--progress-color': isNegative ? '#ff4d4f' : '#00e272', // Red for negative, green for positive
      '--background-color': isNegative ? '#ffd6d6' : '#baffdd', // Light red for negative, light green for positive
      // '--rotation-offset': isNegative ? '90deg' : '0deg' // Start at 12 o'clock for negative, 0 for positive
    };
  }





























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
        growthPercentage: subChannel.mtd?.growthPercentage || 0,
        growthPercentage_lmtd: subChannel.mtd?.growthPercentage_lmtd || 0,
        growthPercentage_lymtd: subChannel.mtd?.growthPercentage_lymtd || 0,

      },
      percentageAchievement: { 
        mtd_on_aop_percentage: subChannel.percentageAchievement?.mtd_on_aop_percentage || 0, 
        mtd_on_projection_percentage: subChannel.percentageAchievement?.mtd_on_projection_percentage || 0, 
        mtd_on_aspirational_percentage: subChannel.percentageAchievement?.mtd_on_aspirational_percentage || 0,
        growthPercentage_over_aspirational: subChannel.percentageAchievement?.growthPercentage_over_aspirational || 0,
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
        ftm_on_aspirational_percentage: subChannel.ftm?.ftm_on_aspirational_percentage || 0,
        growthPercentage_over_aspirational: subChannel.ftm?.growthPercentage_over_aspirational || 0,
      },
      ytd: { 
        aop: subChannel.ytd?.aop || 0, 
        aspirational: subChannel.ytd?.aspirational || 0, 
        cy: subChannel.ytd?.cy || 0, 
        ly: subChannel.ytd?.ly || 0, 
        achd_aop_percentage: subChannel.ytd?.achd_aop_percentage || 0, 
        achd_aspirational_percentage: subChannel.ytd?.achd_aspirational_percentage || 0, 
        growth_Percentage: subChannel.ytd?.growth_Percentage || 0,
        growth_Percentage_over_lytd: subChannel.ytd?.growth_Percentage_over_lytd || 0,
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















  storeInSessionStorage(){
    sessionStorage.setItem("lastUpdatedOn", this.topLine_table_data.retailAsOn)
  }


  // async toplinePerformance_data(): Promise<void>  {
  //   await this.nameManipulate()
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'topline',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.toplinePerformance(data).subscribe((res: any) => {
  //     if (res.agent_performance.success) {
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }

  //       // this.topLine_table_data = res;
  //       this.topline_total_data = res
        
  //       this.topLine_table_data = this.transformData(res.agent_performance);
  //       console.log("transformed topLine_table_data------------->",this.topLine_table_data)
  //       this.setUpToplineData();
  //       this.storeInSessionStorage();

        

        
        
  //       // this.health_table_data = res;
  //       // this.imdChannel_dropdownList = res.channelList
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }


  //   });
  // // this.setUpToplineData()
  // }




  async toplinePerformance_data(): Promise<void> {
    await this.nameManipulate();
    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };
  
    return new Promise<void>((resolve, reject) => {
      this.rest.toplinePerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.topline_total_data = res;
            this.topLine_table_data = this.transformData(res.agent_performance);
            // console.log("transformed topLine_table_data------------->", this.topLine_table_data);
            this.setUpToplineData();
            this.storeInSessionStorage();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in topline performance:', error);
          reject(error);
        }
      });
    });
  }




  // async healthPerformance_data(): Promise<void>  {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'health',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.healthPerformance(data).subscribe((res: any) => {
  //     if (res.agent_performance.success) {
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }
  //       this.health_total_data = res;
  //       this.health_table_data = this.transformData(res.agent_performance);
  //       console.log("transformed health_table_data-->", this.health_table_data)
  //       this.setUpHealthData();
  //       // this.health_table_data = res;
  //       // this.imdChannel_dropdownList = res.channelList
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  //   // this.setUpHealthData();

  // }



  async healthPerformance_data(): Promise<void> {
    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };
  
    return new Promise<void>((resolve, reject) => {
      this.rest.healthPerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.health_total_data = res;
            this.health_table_data = this.transformData(res.agent_performance);
            // console.log("transformed health_table_data-->", this.health_table_data);
            this.setUpHealthData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in health performance:', error);
          reject(error);
        }
      });
    });
  }

  


  // async frhPerformance_data(): Promise<void>  {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'frh',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.frhPerformance(data).subscribe((res: any) => {
  //     if (res.agent_performance.success) {
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }
  //       this.frh_total_data = res;
  //       this.frh_table_data = this.transformData(res.agent_performance);
  //       console.log("this.frh table data transformed", this.frh_table_data)
  //       this.setUpFrhData();
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  //   // this.setUpFrhData();
  // }



  async frhPerformance_data(): Promise<void> {
    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };
  
    return new Promise<void>((resolve, reject) => {
      this.rest.frhPerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.frh_total_data = res;
            this.frh_table_data = this.transformData(res.agent_performance);
            // console.log("this.frh table data transformed", this.frh_table_data);
            this.setUpFrhData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in FRH performance:', error);
          reject(error);
        }
      });
    });
  }
  



  // pvtCar_table_data


  // async pvtCarPerformance_data(): Promise<void>  {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'pvtCar',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.pvtcarPerformance(data).subscribe((res: any) => {
  //     if (res.agent_performance.success) {
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }

  //       this.pvtCar_total_data = res;
  //       this.pvtCar_table_data = this.transformData(res.agent_performance);
  //       console.log("transformed pvt car table data ", this.pvtCar_table_data)
  //       this.setUpPvtcarData();
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  //   // this.setUpPvtcarData();
  // }


  async pvtCarPerformance_data(): Promise<void> {
    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };
  
    return new Promise<void>((resolve, reject) => {
      this.rest.pvtcarPerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.pvtCar_total_data = res;
            this.pvtCar_table_data = this.transformData(res.agent_performance);
            // console.log("Transformed Pvt Car table data:", this.pvtCar_table_data);
            this.setUpPvtcarData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in Pvt Car performance:', error);
          reject(error);
        }
      });
    });
  }

  


  // ropc_table_data

  // async ropcPerformance_data(): Promise<void>  {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'ropc',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.ropcPerformance(data).subscribe((res: any) => {
  //     if (res.agent_performance.success) {
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }

  //       this.ropc_total_data = res;
  //       this.ropc_table_data = this.transformData(res.agent_performance);
  //       console.log("transformde this.ropc_table_data--> ", this.ropc_table_data)
  //       this.setUpRopcData();
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  //   // this.setUpRopcData();
  // }

  async ropcPerformance_data(): Promise<void> {
    const data = {
      user_agent_id: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };
  
    return new Promise<void>((resolve, reject) => {
      this.rest.ropcPerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.ropc_total_data = res;
            this.ropc_table_data = this.transformData(res.agent_performance);
            // console.log("Transformed ROPC table data:", this.ropc_table_data);
            this.setUpRopcData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in ROPC performance:', error);
          reject(error);
        }
      });
    });
  }
  



  //
  async propertyPerformance_data(): Promise<void>  {
    

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
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    }
    return new Promise<void>((resolve, reject) => {


      this.rest.propertyPerformance(data).subscribe({
        next: (res: any) => {
          if (res.agent_performance.success) {
            if(res.status == 0){
              window.alert("No Data Availale");
              return resolve();
            }
    
            this.property_total_data = res;
            this.property_table_data = this.transformData(res.agent_performance);
            // console.log("transformed property table data ", this.property_table_data)
            this.setUpPropertyData();
            resolve();
          } else {
            // this.common.openSnackBar('Something went wrong')
            // this.notifier.notify('error', 'Something went wrong')
          }
        },
        error: (error) => {
          console.error('Error in topline performance:', error);
          reject(error);
        }
      });
    })
    // this.setUpPropertyData();
  }

























  resetAll() {
    // this.apiComPlitionCount = 0
    this.month_selectedItems = []
    this.zone_selectedItems = []
    this.state_selectedItems = []
    this.location_selectedItems = []

    this.imdChannel_selectedItems = []
    this.subChannelCodeName_selectedItems = []

    // this.get_zone_list()
    // this.get_state_list()
    // this.get_location_list()
    // this.getChannelList()
    // this.get_subChannelList() // for now this is not required

    this.get_all_filter_list();


    // this.getcomparison();
  }


  opened_gwp_section_temp = "";

  async nameManipulate(){
    this.opened_gwp_section_temp = this.opened_gwp_section;
    this.opened_gwp_section = '';
  }

  setAllData_gwp(){
    this.setUpToplineData();
    this.setUpFrhData();
    this.setUpHealthData();
    this.setUpPvtcarData();
    this.setUpRopcData();
    this.setUpPropertyData();
  }


  async applyFilter_gwp(){

    // await Promise.all([
      
    //   this.toplinePerformance_data(),
    //   this.healthPerformance_data(),
    //   this.frhPerformance_data(),
    //   this.pvtCarPerformance_data(),
    //   this.ropcPerformance_data(),
    //   this.propertyPerformance_data(),
    //   this.setAllData_gwp()
    // ]);




    try {
      // this.nameManipulate(),
      await Promise.all([
        this.toplinePerformance_data(),
        this.healthPerformance_data(),
        this.frhPerformance_data(),
        this.pvtCarPerformance_data(),
        this.ropcPerformance_data(),
        this.propertyPerformance_data(),
      ]);
  
      // Executes only after all functions complete sequentially
      this.opened_gwp_section = this.opened_gwp_section_temp;
      this.opened_gwp_section_temp = '';

      // console.log("opened_gwp_section-->", this.opened_gwp_section)
      // console.log("All performance data loaded in sequence");

      // this.crateFrhColChart();
      // setTimeout(()=>{
      //   this.crateFrhColChart;
      // },10000);
    } catch (error) {
      console.error("Error executing GWP functions:", error);
    }








    // await this.toplinePerformance_data(),
    // await this.healthPerformance_data(),
    // await this.frhPerformance_data(),
    // await this.pvtCarPerformance_data(),
    // await this.ropcPerformance_data(),
    // await this.propertyPerformance_data(),
    // await this.setAllData_gwp()
    
    
    // setTimeout(() => {
    //   this.opened_gwp_section = this.opened_gwp_section_temp;
    //   this.opened_gwp_section_temp = '';
    // }, 8000);

    // this.opened_gwp_section = this.opened_gwp_section_temp;
    // this.opened_gwp_section_temp = '';
  }


  async applyFilter_gwp_firstcall(){

    // await Promise.all([
    //   this.opened_gwp_section = '',
    //   this.toplinePerformance_data(),
    //   this.healthPerformance_data(),
    //   this.frhPerformance_data(),
    //   this.pvtCarPerformance_data(),
    //   this.ropcPerformance_data(),
    //   this.propertyPerformance_data(),
    //   // this.activationPerformance_data(),
    //   // this.recruitmentPerformance_data(),
    //   // this.kaamChalao()
    //   this.setAllData_gwp()
    // ]);


    this.opened_gwp_section = '';
    try {
      await Promise.all([
        this.toplinePerformance_data(),
        this.healthPerformance_data(),
        this.frhPerformance_data(),
        this.pvtCarPerformance_data(),
        this.ropcPerformance_data(),
        this.propertyPerformance_data(),
      ]);
  
      // Executes only after all functions complete sequentially
      this.opened_gwp_section = "mtd" as any;
      this.opened_gwp_section_temp = '';
      // console.log("All performance data loaded in sequence");
      // this.crateFrhColChart();
      setTimeout(()=>{
        this.crateFrhColChart;
      },10000);
    } catch (error) {
      console.error("Error executing GWP functions:", error);
    }


    // await this.toplinePerformance_data();
    // await this.healthPerformance_data();
    // await this.frhPerformance_data();
    // await this.pvtCarPerformance_data();
    // await this.ropcPerformance_data();
    // await this.propertyPerformance_data();
    // await this.setAllData_gwp();



    
    
    // setTimeout(() => {
    //   this.opened_gwp_section = 'mtd';
    //   this.opened_gwp_section_temp = '';
    //   // this.opened_imd_section = 'mtd' as any;
    // }, 8000);

    // this.opened_gwp_section = 'mtd';
    // this.opened_gwp_section_temp = '';
  }












  async  executeGWPFunctions() {
    // console.log("Started")
    // await Promise.all([
    //   this.toplinePerformance_data(),
    //   this.healthPerformance_data(),
    //   this.frhPerformance_data(),
    //   this.pvtCarPerformance_data(),
    //   this.ropcPerformance_data(),
    //   this.propertyPerformance_data(),
    // ]);

    // console.log("End")
    
    
    // // setTimeout(() => {
    // //   // Your function code here
    // //   // console.log("Function executed after 3 seconds");
    // //   this.opened_gwp_section = "mtd" as any;
    // //   // this.opened_imd_section = 'mtd' as any;
    // // }, 8000);
    // this.opened_gwp_section = "mtd" as any;
    try {
      await Promise.all([
        this.toplinePerformance_data(),
        this.healthPerformance_data(),
        this.frhPerformance_data(),
        this.pvtCarPerformance_data(),
        this.ropcPerformance_data(),
        this.propertyPerformance_data(),
      ]);
      
      // Executes only after all functions complete sequentially
      this.opened_gwp_section = "mtd" as any;
      // console.log("All performance data loaded in sequence");
      // this.createProductivityMatrixChart_perc()
      // this.crateFrhColChart();
      setTimeout(()=>{
        this.crateFrhColChart;
      },10000);
    } catch (error) {
      console.error("Error executing GWP functions:", error);
    }
  }









  // createProductivityMatrixChart_perc(){
  //   this.productivityMatrix_percent_data=[
  //     {
  //         "name": "CY Growth in %",
  //         "data": [
  //             11.25
  //         ],
  //         "type": "column",
  //         "color": "rgb(255, 159, 64)"
  //     },
  //     {
  //         "name": "CY COR in %",
  //         "data": [
  //             41.31
  //         ],
  //         "type": "column",
  //         "color": "rgb(255, 206, 86)"
  //     }
  // ]
  //     let categoryList = [];
  //     this.productivityMatrix_percent_data = [
  //       {
  //         name: 'Productivity %',
  //         type: 'column',
  //         color: '#4CAF50',
  //         data: [85, 90, 78, 88, 92, 95],
  //       },
  //       {
  //         name: 'Revenue ₹',
  //         type: 'column',
  //         color: '#FF9800',
  //         data: [120000, 150000, 110000, 135000, 145000, 160000],
  //       }
  //     ];
  //     for(let item of this.productivityMatrix_percent_data){
  //       categoryList.push(item.name)
  //     }
  
  //         const chartOptions_gi: Highcharts.Options = {
  //           chart: {
  //               type: 'column',
  //           },
  //           credits: {
  //               enabled: false,
  //           },
  //           title: {
  //               text: this.productivityMatrix_percent_data[0].name + ' Vs ' + this.productivityMatrix_percent_data[1].name,
  //               align: 'center'
  //           },
  //           subtitle: {
  //               text: '',
  //               align: 'left'
  //           },
  //           xAxis: {
  //               categories: categoryList,
  //               // categories: segmentWiseData_gi.map((segment:any) => segment.name),
  //               // crosshair: true,
  //               accessibility: {
  //                   description: '' // for x axis main categories
  //               },
  //               title: {
  //                 text: ''
  //               },
  //               // visible: false,
  //               labels: {
  //                 enabled: false, // Disable x-axis labels if categories aren't needed
  //               },
  //           },
  //           yAxis: {
  //               // min: 0,
  //               title: {
  //                   text: ''
  //               },
  //               visible: false, // Hide the y-axis
  //               gridLineWidth: 0, // Remove grid lines
  //           },
  //           tooltip: {
  //               valueSuffix: '',
  //               formatter: function () {
  //                 return `<b>${this.series.name}</b>: ${this.y}`;
  //               },
  //           },
  //           plotOptions: {
  //               column: {
  //                   pointPadding: 0.2,
  //                   borderWidth: 0,
  //                   // colors: ['#FF5733', '#FFD700'], // Assign specific colors to each series
  //                   dataLabels: {
  //                       enabled: true,
  //                       formatter: function () {
  //                           // return this.series.name + '' + this.y + ''; // Display value on top of every bar
  
  //                           if(this.series.name.includes('%')){
  //                             return `${this.y} %`;
  //                           }else{
  //                             return `₹ ${this.y}`;
  //                           }
  //                           // return `${this.series.name}<br/>${this.y}`;
  //                       },
  //                       style: {
  //                           fontSize: '12px',
  //                           fontWeight: '400'
  //                       }
  //                   },
  //               }
  //           },
  //           series: this.productivityMatrix_percent_data,
  //         };
          
  
  //         Highcharts.chart('productivityMatrics_perc', chartOptions_gi);
  // }
    







  

  





  crateFrhColChart(){
    // Dummy data for demonstration
    const res = {
      // level_data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      level_data: ['Jan'],
      bandingData: {
        Aplus: [5],
        A: [2],
        // B: [3, 4, 4, 2, 5],
        // C: [7, 1, 2, 5, 3],
        // D: [1, 3, 2, 4, 6],
        // E: [5, 6, 3, 4, 2]
      }
    };

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: res.level_data,
        title: {
          text: 'Agent Vintage',
          style: {
            fontWeight: 'bold',
            fontSize: '13px'
          }
        },
        labels: {
          style: {
            color: 'black',
            fontWeight: 'normal'
          }
        },
        gridLineWidth: 0
      },
      yAxis: {
        title: {
          text: 'Agent Count',
          style: {
            fontWeight: 'bold'
          }
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0
      },
      tooltip: {
        formatter: function () {
          const index = this.point.index;
          // const customTitle = res.level_data[index]?.replaceAll(',', ' ');
          const customTitle = res.level_data[index];
          return `<b>${customTitle}</b><br>${this.series.name}: ${this.y}`;
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px'
            }
          }
        }
      },
      series: [
        { name: 'A+', data: res.bandingData.Aplus, type: 'column' },
        { name: 'A', data: res.bandingData.A, type: 'column' },
        // { name: 'B', data: res.bandingData.B, type: 'column' },
        // { name: 'C', data: res.bandingData.C, type: 'column' },
        // { name: 'D', data: res.bandingData.D, type: 'column' },
        // { name: 'E', data: res.bandingData.E, type: 'column' }
      ],
      credits: {
        enabled: false
      }
    };

    // Render the chart
    Highcharts.chart('agentFlagwiseBanding', chartOptions);

  }










  async downloadPerformanceTable(tableName:any): Promise<void>{
    const data = {
      user_agent_id: this.userAgentId,
      userAgentId: this.userAgentId,
      selected_channel: this.imdChannel_selectedItems,
      selected_subchannel: this.subChannelCodeName_selectedItems,
      selected_zone: this.zone_selectedItems,
      selected_state: this.state_selectedItems,
      selected_location: this.location_selectedItems,
      monthYear: this.month_selectedItems,
      tableFlag: tableName,
      selected_lob: this.lob_selectedItems,
      selected_product: this.product_selectedItems,
    };

    return new Promise<void>((resolve, reject)=>{
      this.rest.downloadPerformanceTable(data).subscribe({
        next: (res: any) => {
          if(res.success){

          const url = this.rest.file_path + "/dashboard_excels/" + res.file;        
          window.open(url, "_blank");

          }
          resolve();
        },
        error: (error) => {
          console.error('Error in downloadPerformanceTable:', error);
          reject(error);
        }
      })
    })

  }











  

}
