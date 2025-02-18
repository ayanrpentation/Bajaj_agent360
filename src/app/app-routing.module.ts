// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ScoreConfigurationComponent } from './score-configuration/score-configuration.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TriggerTrackerComponent } from './trigger-tracker/trigger-tracker.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { SegmentationComponent } from './segmentation/segmentation.component';
import { PotentialCommonComponent } from './potential-common/potential-common.component';
import { PotentialDifferentComponent } from './potential-different/potential-different.component';
import { AlarmRaisingFactorsSteadyComponent } from './alarm-raising-factors-steady/alarm-raising-factors-steady.component';
import { PerformanceTrackerComponent } from './performance-tracker/performance-tracker.component';
import { NewAgentPerformComponent } from './new-agent-perform/new-agent-perform.component';
import { NewInsightsPageComponent } from './new-insights-page/new-insights-page.component';
import { TestChartComponent } from './test-chart/test-chart.component';
import { OverallPerformance2Component } from './overall-performance2/overall-performance2.component';
import { TryApexComponent } from './try-apex/try-apex.component';

// import { FileUploadNewComponent } from './file-upload-new/file-upload-new.component';
// import { TagicDashboardComponent } from './tagic-dashboard/tagic-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'insights',
        component: DashboardComponent,
      },
      {
        path: 'test',
        component: TestChartComponent,
      },
      {
        path: 'insights_new',
        component: NewInsightsPageComponent,
      },
      {
        path: 'triggerTracker',
        component: TriggerTrackerComponent,
      },

      {
        path: 'configuration',
        component: ScoreConfigurationComponent,
      },
      {
        path: 'upload',
        component: UploadFileComponent,
      },
      {
        path: 'scorecard/:id',
        component: ScoreCardComponent,
      },
      {
        path: 'segmentation',
        component: SegmentationComponent,
      },
      {
        path: 'common_in_potentials',
        component: PotentialCommonComponent,
      },
      {
        path: 'different_in_potentials',
        component: PotentialDifferentComponent,
      },
      // {
      //   path: 'alarmRaisingFactorsForSteady',
      //   component: AlarmRaisingFactorsSteadyComponent,
      // },
      {
        path: 'performance',
        component: PerformanceTrackerComponent,
      },

      {
        path: "OverallPerformance",
        component: OverallPerformance2Component,
      },
      {
        path: 'segmentation_newAgentPerformance',
        component: NewAgentPerformComponent,
      },
      // {
      //   path: 'apex',
      //   component: TryApexComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
