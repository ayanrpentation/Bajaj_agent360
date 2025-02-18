import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy,} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import {CommonService} from '../common.service';
import { RestApiService } from '../rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from "angular-notifier";
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SideNavStatusService } from '../side-nav-status.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })
  
  
  
  export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

    showFiller = false;
    navOpen = true;

    showtopRightOptn= false;

    openedPageName = '' as any
    currentDate: any

    month_dropdownList = [] as any;
    month_selectedItems = [] as any;
    month_selectedItems_downloadScoreCardAll = [] as any
    month_dropdownSettings:IDropdownSettings = {} as any

    
    lastUpdatedOn =  sessionStorage.getItem("lastUpdatedOn") || '' as any;
    // lastUpdatedOn = '' as any






    segmentation_pageName = '' as any;

  

    
    clickedLink = '' as any
    // currentLink = '' as any
    menuColor = ''
    autosize = true
    current_date = '' as any
    lastLoginTime = this.common.getUserLogInTime();

    // userName : any;
    // userAgentId :any;

    userName = this.common.getUserName();
    userAgentId = this.common.getUserAgentId();
  
    constructor(private datePipe: DatePipe, private route: ActivatedRoute,private router: Router, private common: CommonService, private modalService: NgbModal, private rest:RestApiService, private notifier:NotifierService, private ngxService: NgxUiLoaderService, private SideNavStatusService: SideNavStatusService) {
      const currentDate = new Date();
      this.current_date = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    }
  
    ngOnInit(): void {


      this.openedPageName = sessionStorage.getItem("openedPageName")
      this.getCurrentDateFormatted();
      // this.currentLink = String(window.location.href)
      // console.log(this.currentLink)
      // this.login();
      this.getMonthYearList();
      // if(sessionStorage.getItem("userDetails")==null || sessionStorage.getItem("userDetails")==undefined){
      //   this.logout()
      //   // this.router.navigate(['/login']);
      // }
      // this.menuColor = 'rgb(123, 191, 255)'


      setTimeout(() => {
        this.lastUpdatedOn =  sessionStorage.getItem("lastUpdatedOn") || '' as any; 
      }, 3000);
      

      
    }
    ngAfterViewInit() {
      this.lastUpdatedOn =  sessionStorage.getItem("lastUpdatedOn") || '' as any;      
    }

    ngOnDestroy(): void {
      sessionStorage.setItem("openedPageName", 'noFilter');
    }



    setState(value: boolean): void {
      this.SideNavStatusService.setState(value);
    }


  getCurrentDateFormatted() {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      const currentDate = new Date();
      const day = currentDate.getDate();
      const monthIndex = currentDate.getMonth();
      const year = currentDate.getFullYear();
  
      const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  
      this.currentDate =  formattedDate;
  }



  downloadScoreCardAll() {
    this.month_selectedItems_downloadScoreCardAll = sessionStorage.getItem('selectedMonthYear');
    this.month_selectedItems_downloadScoreCardAll = JSON.parse(this.month_selectedItems_downloadScoreCardAll);
    this.ngxService.start();
    const data = {
      user_agent_id: this.common.getUserAgentId(),
      monthYear: this.month_selectedItems_downloadScoreCardAll,
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




    generatescoreMonth(){
      const data = {
        monthYear: this.month_selectedItems,
      }
      this.rest.generatescore(data).subscribe((res: any) => {
        if (res.success) {        
          this.notifier.notify('success', res.message);
          this.month_selectedItems = [];
          
        } else {
          this.notifier.notify('error', res.message);

        }
      });
    }
    getMonthYearList():any {  
      const data = {
        userAgentId: this.userAgentId
      }  
      this.rest.getMonthYearList().subscribe((res: any) => {
        if (res.success) {        
          this.month_dropdownList = res.monthYearList
          this.month_dropdownSettings = {
            singleSelection: true,
            idField: 'monthVal',
            textField: 'monthName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
          }
          // return this.zone_dropdownList
        } else {
        }
      });
    }
    openModal(modal:any){
      this.modalService.open(modal, {centered: true, size: 'md'});
  
    }
  
    closeModal(){
      this.modalService.dismissAll();
      this.month_selectedItems=[];

    }
  
    logout(){
      
      // sessionStorage.removeItem("userDetails");
      // sessionStorage.removeItem("userRights");

      // sessionStorage.removeItem("selectedChannel");
      // sessionStorage.removeItem("selectedSubChannel");
      // sessionStorage.removeItem("selectedZone");
      // sessionStorage.removeItem("selectedState");
      // sessionStorage.removeItem("selectedLocation");
      // sessionStorage.removeItem("selectedMonthYear");
      
      // localStorage.removeItem('userDetails');
      // localStorage.removeItem('user');



      // Clear all Session Storage
      sessionStorage.clear();

      // Clear all Local Storage
      localStorage.clear();

      this.router.navigate(['/']);
    }
    

  //   login(): any {
  //     // if (this.username.trim() === '') {
  //     //     this.showToaster('error', 'Please enter the username');
  //     //     return false;
  //     // }
  //     // if (this.password.trim() === '') {
  //     //     this.showToaster('error', 'Please enter the password');
  //     //     return false;
  //     // }
  //     const data = {
  //         username: 'anish.chopra@bajajallianz.co.in',
  //         passKey: 'Acgm@5555',
  //         // isRenewal: this.isRenewal,
  //     };
  //     const date = new Date();
  //     const time = date.getTime();
  //     // this.ngxService.start();
  //     this.rest.login(data).subscribe((res: any) => {
  //         // this.ngxService.stop();
  //         if (res.success) {
  //             if (res.userDetails == null) {
  //                 // this.showToaster('error', 'User not found.');
  //             } else {
  //                 sessionStorage.setItem("userDetails", JSON.stringify(res.userDetails));
  //                 // sessionStorage.setItem("userRights", JSON.stringify(res.userRights));


  //                 this.userName = this.common.getUserName();
  //                 this.userAgentId = this.common.getUserAgentId();

  //                 console.log("go to dashboard")
               
                  


  //                 this.router.navigate(['/dashboard']);
  //             }
  //         } else {
  //             // this.showToaster('error', 'Login Failed');
  //         }
  //     }, (err: any) => {
  //     });
  // }
  

  login(): any {
    // if (this.username.trim() === '') {
    //     this.showToaster('error', 'Please enter the username');
    //     return false;
    // }
    // if (this.password.trim() === '') {
    //     this.showToaster('error', 'Please enter the password');
    //     return false;
    // }
    const data = {
        username: 'anishc',
        passKey: 'Acgm@5555',
        // isRenewal: this.isRenewal,
    };
    const date = new Date();
    const time = date.getTime();
    // this.router.navigate(['/dashboard']);

    // this.ngxService.start();
    this.rest.login(data).subscribe((res: any) => {
        // this.ngxService.stop();


        if (res.success) {
            if (res.userDetails == null) {
                // this.showToaster('error', 'User not found.');
            } else {
                sessionStorage.setItem("userDetails", JSON.stringify(res.userDetails));
                // sessionStorage.setItem("userRights", JSON.stringify(res.userRights));
             
                
                console.log("go to dashboard")
                this.userName = this.common.getUserName();
                  this.userAgentId = this.common.getUserAgentId();

                this.router.navigate(['/insights']);
            }
        } else {
            // this.showToaster('error', 'Login Failed');
        }
    }, (err: any) => {
    });
}
goToInsights(){
  this.segmentation_pageName = ''
  this.openedPageName = 'agentInsight'
  sessionStorage.setItem("openedPageName", 'agentInsight');
  this.router.navigate(['/insights'])
}


goToSegmentation(){
  this.openedPageName = 'segmentation'
  sessionStorage.setItem("openedPageName", 'segmentation');
  this.router.navigate(['/segmentation'])


}

goToSegmentation_new(){
  // if(this.segmentation_pageName != ''){

  //   this.openedPageName = this.segmentation_pageName
  //   sessionStorage.setItem("openedPageName", this.segmentation_pageName);
  //   this.router.navigate(['/' + this.segmentation_pageName])
  // }

  this.openedPageName = 'segmentation_newAgentPerformance'
  sessionStorage.setItem("openedPageName", 'segmentation_newAgentPerformance');
  this.router.navigate(['/segmentation_newAgentPerformance'])
}

goToSegmentation_exist_new(){
  if(this.segmentation_pageName != ''){

    this.openedPageName = this.segmentation_pageName
    sessionStorage.setItem("openedPageName", this.segmentation_pageName);
    this.router.navigate(['/' + this.segmentation_pageName])
  }



  // console.log("clicked agent segmentation")

}



goToScoreCard(){
  this.segmentation_pageName = ''
  this.openedPageName = 'scorecard'
  sessionStorage.setItem("openedPageName", 'scorecard');
  this.router.navigate(['/scorecard',0])
}
goToTriggerTracker(){
  this.segmentation_pageName = ''
  this.openedPageName = 'triggerTracker'
  sessionStorage.setItem("openedPageName", 'triggerTracker');
  this.router.navigate(['/triggerTracker'])
}


goToPerformance(){
  this.segmentation_pageName = ''
  this.openedPageName = 'performance'
  sessionStorage.setItem("openedPageName", 'performance');
  this.router.navigate(['/performance'])
}

goTo_overallPerformance(){
  this.segmentation_pageName = ''
  this.openedPageName = 'OverallPerformance'
  sessionStorage.setItem("openedPageName", 'OverallPerformance');
  this.router.navigate(['/OverallPerformance'])
}


goToUpload(){
  this.segmentation_pageName = ''
  this.openedPageName = 'upload'
  sessionStorage.setItem("openedPageName", 'upload');
  this.router.navigate(['/upload']);

}
goToConfiguration(){
  this.segmentation_pageName = ''
  this.openedPageName = 'scoreConfig'
  sessionStorage.setItem("openedPageName", 'scoreConfig');
  this.router.navigate(['/configuration']);

}
// goToDashboard(){
  
//   this.router.navigate(['/insights']);

// }


sidenavTogle(){
  this.navOpen = !this.navOpen;
  sessionStorage.setItem("navOpen", String(this.navOpen));

  this.setState(this.navOpen)

}








}