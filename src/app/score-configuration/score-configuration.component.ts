import { Component, OnInit } from '@angular/core';
import { AfterViewInit} from '@angular/core';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { RestApiService } from '../rest-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../common.service';
import { Location } from '@angular/common';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-score-configuration',
  templateUrl: './score-configuration.component.html',
  styleUrls: ['./score-configuration.component.css']
})
export class ScoreConfigurationComponent implements OnInit {

  month_selectedItems = [] as any;

  disableGenScore = false;

  confType = "Between";
  confVal = '';
  confUpperRange = null;
  confLowerRange = 0;
  confScore = 0;

  deleteconfid = -1;
  editconfid = -1;

  editScore = 0;
  old_maxScoreConfig = [] as any;
  old_totalScore = 0;

  new_maxScoreConfig = [] as any;
  new_totalScore = 0;

  just_joined_maxScoreConfig = [] as any;
  just_joined_totalScore = 0;

  



  agentScoreCard = true;

  mt_head_dropdownList = [] as any;
  mt_head_selectedItems = [] as any;
  mt_head_dropdownSettings:IDropdownSettings = {} as any

  bifurcation_dropdownList = [] as any;
  bifurcation_selectedItems = [] as any;
  bifurcation_dropdownSettings:IDropdownSettings = {} as any

  agent_type_dropdownList = [{'agent_type': 'old', 'showtext': 'Old Agent' },{'agent_type': 'new', 'showtext': 'New Agent' },{'agent_type': 'just_joined', 'showtext': 'Just Joined Agent' },{'agent_type': 'all', 'showtext': 'All Agent' }] 
  agent_type_selectedItems = [] as any;
  agent_type_dropdownSettings:IDropdownSettings = {} as any


  scoreConfigList = [] as any;

  constructor(    private rest: RestApiService,
    private notifier: NotifierService,
    private common: CommonService,
    private modalService: NgbModal) {

      // this.getMonthYearList()
    
      this.month_selectedItems = sessionStorage.getItem('selectedMonthYear');
      this.month_selectedItems = JSON.parse(this.month_selectedItems);
      // this.month_selectedItems_singleselect = this.month_selectedItems.monthVal;
      // console.log("this.month_selectedItems", this.month_selectedItems)

     }

  ngOnInit(): void {
    this.getMetricsHead();
    this.getBifurcationList();
    this.getScoreConfig();
    this.getHeadWiseMaxScore('old');
    this.getHeadWiseMaxScore('new');

    this.getHeadWiseMaxScore('just_joined');


    this.mt_head_dropdownSettings = {
      singleSelection: true,
      idField: 'head',
      textField: 'head',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.bifurcation_dropdownSettings = {
      singleSelection: true,
      idField: 'bifurcation',
      textField: 'bifurcation',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.agent_type_dropdownSettings = {
      singleSelection: true,
      idField: 'agent_type',
      textField: 'showtext',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }


  }
  getHeadWiseMaxScore(agent_type:any){
    const data = {
      agent_type: agent_type
    }
    this.rest.getHeadWiseMaxScore(data).subscribe((res: any) => {
      if (res.success) {     
        if (agent_type == 'old'){

          this.old_maxScoreConfig = res.maxScoreConfig;
          this.old_totalScore = res.totalScore
        }   else if (agent_type == 'new'){

          this.new_maxScoreConfig = res.maxScoreConfig;
          this.new_totalScore = res.totalScore
        }  else  {

          this.just_joined_maxScoreConfig = res.maxScoreConfig;
          this.just_joined_totalScore = res.totalScore
        }  
        
      } else {
      }
    });
  }

  editConfiguration(){
    
  }
  generateScore(){
    this.disableGenScore = true;
    this.notifier.notify('success', 'please check the refreshed score 15-20 minutes later')

    // const dateString = "10-2024";
    const dateString = this.month_selectedItems[0].monthVal;

    // Split the string by the '-' character
    const [month, year] = dateString.split('-');

    // Convert the values to numbers
    const numericMonth = parseInt(month, 10);
    const numericYear = parseInt(year, 10);

    const data = {
      // monthYear: this.month_selectedItems,
      month: numericMonth,
      year: numericYear,
    }
    this.rest.generatescore(data).subscribe((res: any) => {

      if (res.success) {        
        this.notifier.notify('success', res.message);
        // this.month_selectedItems = [];
        // this.disableGenScore = false;

        
      } else {
        this.notifier.notify('error', res.message);
        // this.disableGenScore = false;


      }
      this.disableGenScore = false;

    });
  }
  generateScoreYTD(){

    // const dateString = "10-2024";
    const dateString = this.month_selectedItems[0].monthVal;

    // Split the string by the '-' character
    const [month, year] = dateString.split('-');

    // Convert the values to numbers
    const numericMonth = parseInt(month, 10);
    const numericYear = parseInt(year, 10);


    this.disableGenScore = true;
    this.notifier.notify('success', 'please check the refreshed score 15-20 minutes later')
    const data = {
      // monthYear: this.month_selectedItems,
      month: numericMonth,
      year: numericYear,
    }
    this.rest.generateScoreYTD(data).subscribe((res: any) => {

      if (res.success) {        
        this.notifier.notify('success', res.message);
        // this.month_selectedItems = [];
        // this.disableGenScore = false;

        
      } else {
        this.notifier.notify('error', res.message);
        // this.disableGenScore = false;


      }
      this.disableGenScore = false;

    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  openDeleteModal(modal:any, id:any){
    this.deleteconfid = id;
    this.modalService.open(modal, {centered: true, size: 'sm'});

  }

  openEditSection(id:any){
    this.editconfid = id;
    this.editScore = 1;

  }

  cancelEdit(){
    this.editScore = 0;
    this.getScoreConfig();
  }

  saveEdit(id:any, score:any, metric_id:any,agent_type:any){
    const data = {
      editId:id,
      score:score,
      metric_id: metric_id,
      agent_type:agent_type
    }
    this.rest.saveConfiguration(data).subscribe((res: any) => {
      if (res.success) {        
        // this.bifurcation_dropdownList = res.bifurcationList;
        this.notifier.notify('success', res.message);
        // this.modalService.dismissAll();
        this.getScoreConfig();
    // this.getHeadWiseMaxScore();
    this.getHeadWiseMaxScore('old');
    this.getHeadWiseMaxScore('new');

    this.getHeadWiseMaxScore('just_joined');

        this.editconfid = -1;
        this.editScore = 0;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  deleteConfiguration(){

    
    const data = {
      conf_id: this.deleteconfid
    }
    this.rest.deleteConfiguration(data).subscribe((res: any) => {
      if (res.success) {        
        // this.bifurcation_dropdownList = res.bifurcationList;
        this.notifier.notify('success', res.message);
        this.modalService.dismissAll();
        this.getScoreConfig();
    this.getHeadWiseMaxScore('old');
    this.getHeadWiseMaxScore('new');

    this.getHeadWiseMaxScore('just_joined');

        this.deleteconfid = -1;
        
      } else {
      }
    });
  }

  getMetricsHead(){
    this.rest.getMetricsHead().subscribe((res: any) => {
      if (res.success) {        
        this.mt_head_dropdownList = res.metricHeadList;
        
      } else {
      }
    });
  }

  getBifurcationList(){
    const data = {
      head: this.mt_head_selectedItems
    }
    this.rest.getBifurcationList(data).subscribe((res: any) => {
      if (res.success) {        
        this.bifurcation_dropdownList = res.bifurcationList;
        
      } else {
      }
    });
  }

  addConfiguration(){

    if (this.mt_head_selectedItems.length != 0 && this.bifurcation_selectedItems.length != 0 && this.agent_type_selectedItems.length != 0){
      const data = {
        confType : this.confType,
        confVal : this.confVal,
        confUpperRange : this.confUpperRange,
        confLowerRange : this.confLowerRange,
        confScore : this.confScore,
  
        head: this.mt_head_selectedItems,
        bifurcation: this.bifurcation_selectedItems,
        agent_type : this.agent_type_selectedItems,
  
      }  
      this.rest.addConfiguration(data).subscribe((res: any) => {
        if (res.success) {        
          this.notifier.notify('success', res.message);
    this.getScoreConfig();
    this.getHeadWiseMaxScore('old');
    this.getHeadWiseMaxScore('new');

    this.getHeadWiseMaxScore('just_joined');


          // return this.zone_dropdownList
        } else {
          this.notifier.notify('error', res.message);

        }
      });
    }else{
      alert('Please Select Metric Head and Bifurcation before addding configuration');
    }

    
    
  }
  getScoreConfig(){

    

    const data = {
      head : this.mt_head_selectedItems,
      bifurcation : this.bifurcation_selectedItems,
      agent_type: this.agent_type_selectedItems
     
    }  
    this.rest.getScoreConfig(data).subscribe((res: any) => {
      if (res.success) {        
        this.scoreConfigList = res.scoreConfigList
        // return this.zone_dropdownList
      } else {
      }
    });

  }
  resetAll(){

  }

}
