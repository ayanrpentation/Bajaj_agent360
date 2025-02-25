import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { SideNavStatusService } from '../side-nav-status.service';
import * as Highcharts from 'highcharts';
import BulletModule from 'highcharts/modules/bullet';
// Initialize the module
BulletModule(Highcharts);


import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';




@Component({
  selector: 'app-imd-performances',
  templateUrl: './imd-performances.component.html',
  styleUrls: ['./imd-performances.component.css']
})
export class ImdPerformancesComponent implements OnInit {

  opened_imd_section = "" as any;
  sideNav_state = true as any;
  sideNavStatus(){
    this.SideNavStatusService.state$.subscribe((value: any) => {
      this.sideNav_state = value;
    });
    // console.log("sideNav_state--> ", this.sideNav_state)
  }

  userAgentId = this.common.getUserAgentId();

  activation_table_data: any;
  activation_total_data: any;
  recruitment_table_data: any;
  recruitment_total_data: any;
  



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


  async  executeIMDFunctions() {
    await Promise.all([
      this.activationPerformance_data(),
      this.recruitmentPerformance_data(), // uncomment it
      // this.kaamChalao()
    ]);
    
    setTimeout(() => {
      // Your function code here
      // console.log("Function executed after 3 seconds");
      this.opened_imd_section = 'mtd' as any;
    }, 7000);
  }





  constructor(
    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,
    private SideNavStatusService: SideNavStatusService,
    private modalService: NgbModal,
  ) { 
    this.executeIMDFunctions();
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
    // this.get_zone_list();
    // this.get_state_list();
    // this.get_location_list();
    // this.getChannelList();
    // this.get_subChannelList();


    this.get_all_filter_list();
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
  // async activationPerformance_data(): Promise<void> {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'activation',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
  //   this.rest.activation(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // this.activation_table_data = res;
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }
  //       // console.log("this.activation_table_data1111---> ", res);
  //       this.activation_table_data = this.transformData_imd(res);
  //       console.log("transformed this.activation_table_data---> ", this.activation_table_data);
  //       this.setUpActivationData();
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  // }


  async activationPerformance_data(): Promise<void> {
    await this.nameManipulate_imd(); 

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
      this.rest.activation(data).subscribe({
        next: (res: any) => {
          if (res.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.activation_total_data = res;
            this.activation_table_data = this.transformData_imd(res);
            // console.log("transformed this.activation_table_data--->", this.activation_table_data);
            this.setUpActivationData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in activation performance:', error);
          reject(error);
        }
      });
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







  // async recruitmentPerformance_data() {
  //   const data = {
  //     // userAgentId: this.userAgentId,
  //     // table: 'activation',
  //     user_agent_id: this.userAgentId,
  //     selected_channel: this.imdChannel_selectedItems,
  //     selected_subchannel: this.subChannelCodeName_selectedItems,
  //     selected_zone: this.zone_selectedItems,
  //     selected_state: this.state_selectedItems,
  //     selected_location: this.location_selectedItems,
  //     monthYear: this.month_selectedItems,
  //   }
    
  //   this.rest.recruitment(data).subscribe((res: any) => {
  //     if (res.success) {
  //       // this.activation_table_data = res;
  //       if(res.status == 0){
  //         window.alert("No Data Availale");
  //         return
  //       }
        
  //       // console.log("this.recruitment_table_data---> ", res);
  //       this.recruitment_table_data = this.transformData_imd(res);
  //       console.log(" transformed this.recruitment_table_data---> ", this.activation_table_data);
  //       this.setUpRecruitmentData();
  //     } else {
  //       // this.common.openSnackBar('Something went wrong')
  //       // this.notifier.notify('error', 'Something went wrong')
  //     }
  //   });
  // }

  async recruitmentPerformance_data(): Promise<void> {
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
      this.rest.recruitment(data).subscribe({
        next: (res: any) => {
          if (res.success) {
            if (res.status === 0) {
              window.alert("No Data Available");
              return resolve();
            }
            this.recruitment_total_data = res;
            this.recruitment_table_data = this.transformData_imd(res);
            // console.log("transformed this.recruitment_table_data--->", this.recruitment_table_data);
            this.setUpRecruitmentData();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error in recruitment performance:', error);
          reject(error);
        }
      });
    });
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

    this.get_all_filter_list();
    // this.get_subChannelList()
    // this.getcomparison();
  }











  opened_imd_section_temp = "";

  async nameManipulate_imd(){
    this.opened_imd_section_temp = this.opened_imd_section;
    this.opened_imd_section = '';
  }

  async setAllData_imd(){
    this.setUpActivationData();
    this.setUpRecruitmentData();
  }



  async applyFilter_imd(){

    await Promise.all([
       this.nameManipulate_imd(),
       this.activationPerformance_data(),
       this.recruitmentPerformance_data(), // uncomment it
      // this.kaamChalao()
       this.setAllData_imd()
    ]);
    
    
    setTimeout(() => {
      this.opened_imd_section = this.opened_imd_section_temp;
      this.opened_imd_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 7000);
  }



  async applyFilter_imd_firstcall(){

    await Promise.all([
      this.opened_imd_section = '',
      this.activationPerformance_data(),
      this.recruitmentPerformance_data(), // uncomment it
      // this.kaamChalao()
      this.setAllData_imd()
    ]);
    
    
    setTimeout(() => {
      this.opened_imd_section = 'mtd';
      this.opened_imd_section_temp = '';
      // this.opened_imd_section = 'mtd' as any;
    }, 7000);
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
