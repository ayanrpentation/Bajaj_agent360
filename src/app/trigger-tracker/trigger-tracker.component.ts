import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import Chart from 'chart.js/auto';
import {  ChartOptions, ChartType } from 'chart.js';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { NotifierService } from "angular-notifier";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-trigger-tracker',
  templateUrl: './trigger-tracker.component.html',
  styleUrls: ['./trigger-tracker.component.css']
})

export class TriggerTrackerComponent implements OnInit {


  vinLess1yr = 1 as any;

  constructor(private rest: RestApiService, private ngxService: NgxUiLoaderService, private notifier: NotifierService, private modalService: NgbModal) {
    // if(sessionStorage.getItem("triggerTrackerPage") != ){
    //   this.vinLess1yr = sessionStorage.getItem("triggerTrackerPage");
    // }



    this.vinLess1yr = (sessionStorage.getItem("triggerTrackerPage"));
    
    
   }
  ngOnInit(): void { 
    // if(this.vinLess1yr == '1'){ this.vinLess1yr = 1}
    // if(this.vinLess1yr == '2'){ this.vinLess1yr = 2}
    // if(this.vinLess1yr == '3'){ this.vinLess1yr = 3}


    // console.log("this.vinLess1yr======>>", typeof(this.vinLess1yr))
   }

  
  
}