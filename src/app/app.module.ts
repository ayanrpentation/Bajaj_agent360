// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { NgxUiLoaderModule } from "ngx-ui-loader";
// import {NotifierModule, NotifierOptions} from 'angular-notifier';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';




// import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TriggerTrackerComponent } from './trigger-tracker/trigger-tracker.component';
// import { ScoreConfigurationComponent } from './score-configuration/score-configuration.component';
// import { UploadFileComponent } from './upload-file/upload-file.component';
// import { ScoreCardComponent } from './score-card/score-card.component';
// import { SegmentationComponent } from './segmentation/segmentation.component';




// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     LoginComponent,
//     DashboardComponent,
//     TriggerTrackerComponent,
//     ScoreConfigurationComponent,
//     UploadFileComponent,
//     ScoreCardComponent,
//     SegmentationComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     NgxUiLoaderModule,
//     NotifierModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatIconModule,
    

//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }















import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from 'ng-material-multilevel-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkAccordionModule} from '@angular/cdk/accordion';
// import {FooterComponent} from "../../src/app/footer/footer.component";
// import { IntercepterService } from './intercepter.service';

// import { FilterPipe } from './filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScoreConfigurationComponent } from './score-configuration/score-configuration.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TriggerTrackerComponent } from './trigger-tracker/trigger-tracker.component';
import { VintageLessThanOneComponent } from './vintage-less-than-one/vintage-less-than-one.component';
import { VintageGreaterThanOneComponent } from './vintage-greater-than-one/vintage-greater-than-one.component';
import { SingleLobComponent } from './single-lob/single-lob.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { SegmentationComponent } from './segmentation/segmentation.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { NgApexchartsModule } from "ng-apexcharts";




// import { IgxLinearGaugeModule } from "igniteui-angular-gauges";

// import { IgxButtonModule } from "igniteui-angular";

import { LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';

// import { HighchartsChartModule } from 'highcharts-angular';


// import { HighchartsChartModule } from 'highcharts-angular';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IndianNumberPipe } from './indian-number.pipe';
import { PotentialCommonComponent } from './potential-common/potential-common.component';
import { PotentialDifferentComponent } from './potential-different/potential-different.component';
import { AlarmRaisingFactorsSteadyComponent } from './alarm-raising-factors-steady/alarm-raising-factors-steady.component';
import { PerformanceTrackerComponent } from './performance-tracker/performance-tracker.component';
import { NewAgentPerformComponent } from './new-agent-perform/new-agent-perform.component';
import { NewInsightsPageComponent } from './new-insights-page/new-insights-page.component';
import { TestChartComponent } from './test-chart/test-chart.component';
import { OverallPerformance2Component } from './overall-performance2/overall-performance2.component';
import { GwpPerformancesComponent } from './gwp-performances/gwp-performances.component';
import { ImdPerformancesComponent } from './imd-performances/imd-performances.component';
import { TryApexComponent } from './try-apex/try-apex.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
// import { CircleGaugeComponent } from './circle-gauge/circle-gauge.component';







const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ScoreConfigurationComponent,
    UploadFileComponent,
    TriggerTrackerComponent,
    VintageLessThanOneComponent,
    VintageGreaterThanOneComponent,
    SingleLobComponent,
    SegmentationComponent,
    ScoreCardComponent,
    IndianNumberPipe,
    PotentialCommonComponent,
    PotentialDifferentComponent,
    AlarmRaisingFactorsSteadyComponent,
    PerformanceTrackerComponent,
    NewAgentPerformComponent,
    NewInsightsPageComponent,
    TestChartComponent,
    OverallPerformance2Component,
    GwpPerformancesComponent,
    ImdPerformancesComponent,
    TryApexComponent,
    ColumnChartComponent,
    // CircleGaugeComponent,
  
    
  ],
  imports: [
    
    // CanvasJSAngularChartsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule,
    MatMenuModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    DragDropModule,
    MatRadioModule,
    NgxUiLoaderModule,
    MatSnackBarModule,
    MatSelectModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    NgMultiSelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    NgMaterialMultilevelMenuModule,
    MatProgressSpinnerModule,
    Ng2GoogleChartsModule,
    LinearGaugeModule,
    MatProgressBarModule,
    NgApexchartsModule,
    // HighchartsChartModule,
    // IgxLinearGaugeModule,
    // CanvasJSAngularChartsModule
    
    // NgCircleProgressModule.forRoot({
    //   // set defaults here
    //   radius: 100,
    //   outerStrokeWidth: 16,
    //   innerStrokeWidth: 8,
    //   outerStrokeColor: "#78C000",
    //   innerStrokeColor: "#C7E596",
    //   animationDuration: 300,
      
    // })
  ],
  providers: [DatePipe, {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'},
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: IntercepterService,
    //   multi: true
    // }, 
    MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
