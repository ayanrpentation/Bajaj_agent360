import {Component, OnInit, ViewChild} from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import {CommonService} from '../common.service';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NotifierService} from "angular-notifier";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    showPassword = false;
    username = '';
    password = '';

    page = 1;
    isRenewal = 1 as any;
    // isEmployeeMaster = false as any; 

    constructor(private router: Router, private rest: RestApiService,
                private common: CommonService, private ngxService: NgxUiLoaderService,
                private notifier: NotifierService) {
    }

    ngOnInit(): void {
        // this.common.islogIn();
        if(sessionStorage.getItem("userDetails")!=null || sessionStorage.getItem("userDetails")!=undefined){
            // this.logout()
            this.router.navigate(['/insights']);
        }
        
    }

    // toggleRights(){
    //     if (this.isRenewal == true){
    //         this.isEmployeeMaster == false
    //     }
    //     else if (this.isEmployeeMaster == true){
    //         this.isRenewal == false
    //     }
    // }

    checkUserName(): any {
        if (this.username.trim() === '') {
            this.showToaster('error', 'Please enter the username');
            return false;
        }
        
        const data = {
            username: this.username,
            
            // isRenewal: this.isRenewal,
        };
        
        this.rest.checkusername(data).subscribe((res: any) => {
            // this.ngxService.stop();
            console.log("res>>>>",res)
            console.log(res.success)
            if (res.success) {
            console.log(res.success)

                this.page = 2;
                
            } else {
                this.showToaster('error', 'Invalid User Name');
            }
        }, (err: any) => {
        });
    }


    login(): any {
        if (this.username.trim() === '') {
            this.showToaster('error', 'Please enter the username');
            return false;
        }
        if (this.password.trim() === '') {
            this.showToaster('error', 'Please enter the password');
            return false;
        }
        const data = {
            username: this.username,
            passKey: this.password,
            // isRenewal: this.isRenewal,
        };
        const date = new Date();
        const time = date.getTime();
        // this.router.navigate(['/insights']);

        // this.ngxService.start();
        this.rest.login(data).subscribe((res: any) => {
            // this.ngxService.stop();


            if (res.success) {
                if (res.userDetails == null) {
                    this.showToaster('error', 'User not found.');
                } else {


                    this.getTriggerDate();

                    

                    sessionStorage.setItem("userDetails", JSON.stringify(res.userDetails));
                    // sessionStorage.setItem("userRights", JSON.stringify(res.userRights));
                    sessionStorage.setItem("triggerTrackerPage", '1');


                    let lastMonth = this.getLastMonth()
                    sessionStorage.setItem("selectedMonthYear", JSON.stringify(lastMonth));

                    






                    sessionStorage.setItem("projectName", 'Agent');
                    sessionStorage.setItem("projectName_plural", 'Agents');

                    // sessionStorage.setItem("projectName", 'Entity');
                    // sessionStorage.setItem("projectName_plural", 'Entities');




                    // sessionStorage.setItem("openedPageName", 'agentInsight');
                    sessionStorage.setItem("openedPageName", 'performance');
                    
                    // console.log("go to insights")

                    // this.router.navigate(['/insights']);
                    // this.router.navigate(['/performance']); 
                    this.router.navigate(['/OverallPerformance']);


                    
                }
            } else {
                this.showToaster('error', 'Login Failed');
            }
        }, (err: any) => {
        });
    }

    showToaster(type: string, message: string, flag: number = 1) {
        if (flag === 1) {
            this.notifier.notify(type, message);
            setTimeout(() => {
                this.notifier.hideAll();
            }, 5000);
        } else {
            this.notifier.notify(type, message);
        }
    }



    getTriggerDate(){ // get_agents_lt_gt_1yr getTriggerDate

        // this.rest.get_agents_lt_gt_1yr().subscribe((res: any) => {
        this.rest.getTriggerDate().subscribe((res: any) => {

            if(res.success){
                console.log("++++++++++=============",res.dateDict);

                let triggerDateObj = res.dateDict;

                sessionStorage.setItem("triggerDateObj", JSON.stringify(triggerDateObj));

            }

        });

    }


    // getLastMonth() {
    //     const today = new Date();
    //     const month = today.getMonth(); // 0 (January) to 11 (December)
    //     const year = today.getFullYear();
      
    //     // Handle January as a special case
    //     // if (month === 0) {
    //     //   return [{ monthVal: "12-2023", monthName: "DEC 2023" }];
    //     // }
      
    //     // this section is for  --> this month / current running month ------------------------------------------------------
    //     const lastMonth = month;
    //     const lastMonthVal = (lastMonth + 1).toString().padStart(2, "0"); // Add leading zero if needed
    //     const lastMonthName = new Date(year, lastMonth).toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + year;
        
        
        

    //     // this section is for  --> // last month (month before this month) --------------------------------------------------
    //     // const lastMonth = month - 1;
    //     // const lastMonthVal = (lastMonth + 1).toString().padStart(2, "0"); // Add leading zero if needed
    //     // const lastMonthName = new Date(year, lastMonth).toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + year;
        
        


    //     return [{ monthVal: `${lastMonthVal}-${year}`, monthName: lastMonthName }];


    //   }



      getLastMonth() {
        const today = new Date();
        const currentMonth = today.getMonth(); // 0 (January) to 11 (December)
        const currentYear = today.getFullYear();
    
        // Handle January as a special case for the last month
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // 11 (December) if currentMonth is January
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
        // Current running month
        const currentMonthVal = (currentMonth + 1).toString().padStart(2, "0"); // Add leading zero
        const currentMonthName = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + currentYear;
    
        // Last month
        const lastMonthVal = (lastMonth + 1).toString().padStart(2, "0"); // Add leading zero
        const lastMonthName = new Date(lastMonthYear, lastMonth).toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + lastMonthYear;
    
        // return [
        //     { monthVal: `${lastMonthVal}-${lastMonthYear}`, monthName: lastMonthName },
        //     { monthVal: `${currentMonthVal}-${currentYear}`, monthName: currentMonthName },
        // ];
        return [];
    }
    
      
      
      
   
}
