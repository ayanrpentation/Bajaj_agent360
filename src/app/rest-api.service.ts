import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class RestApiService {
  // API_ROOT = 'https://ias-pent.bajajallianz.com/itpmoapi';
  // file_path = 'https://ias-pent.bajajallianz.com/itpmoapi/static';

  // API_ROOT = 'http://127.0.0.1:5000';  //suman
  // file_path = 'http://127.0.0.1:5000/static';

  // API_ROOT = 'http://172.20.1.24:5011';
  // file_path = 'http://172.20.1.24:5011/static';

  // API_ROOT = 'http://192.168.1.17:5000'; // ayan or any other using sumans backend in office
  // file_path = 'http://192.168.1.17:5000/static';


  // API_ROOT = 'http://192.168.1.15:5000'; // rishu  backend in office
  // file_path = 'http://192.168.1.15:5000/static';


  API_ROOT = 'http://localhost:5000'; 
  file_path = 'http://localhost:5000/static';



  // bagic 360 server  -- use this while giving to rishav
  // API_ROOT = 'http://10.4.2.134:5000'; 
  // file_path = 'http://10.4.2.134:5000/static';









  // API_ROOT = 'https://oneplatform.pentationanalytics.com/agent';
  // file_path = 'https://oneplatform.pentationanalytics.com/agent/static';


  // API_ROOT = 'http://13.200.24.255:5000'; //aws----------------------current latest aug7 2024
  // file_path = 'http://13.200.24.255:5000/static';
  

  

  constructor(private http: HttpClient) {
  }

 
  

  login(data: any): any {
    return this.http.post(this.API_ROOT + '/app/login', JSON.stringify(data), httpOptions);
  }
  getHeadWiseMaxScore(data:any){
    return this.http.post(this.API_ROOT + '/app/getHeadWiseMaxScore' , JSON.stringify(data), httpOptions);

  }
  vintage_wise_band_count(data:any){
    return this.http.post(this.API_ROOT + '/app/vintage_wise_band_count' , JSON.stringify(data), httpOptions);

  }

  getcomparison(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getcomparison', JSON.stringify(data), httpOptions);
  }
  getcomparison_ly(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getcomparison_ly', JSON.stringify(data), httpOptions);
  }


  download_band_trend_table_total(data:any){
    return this.http.post(this.API_ROOT + '/app/download_band_trend_table_total', JSON.stringify(data), httpOptions);
  }

  getImdDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getImdDetails', JSON.stringify(data), httpOptions);
  }
  getScoreCardDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getScoreCardDetails', JSON.stringify(data), httpOptions);
  }

  downloadScoreCard(data: any): any {
    return this.http.post(this.API_ROOT + '/app/downloadScoreCard', JSON.stringify(data), httpOptions);
  }

  downloadScoreCardAll(data: any): any {
    return this.http.post(this.API_ROOT + '/app/downloadScoreCardAll', JSON.stringify(data), httpOptions);
  }

  downloadScoreCardPDF(data: any): any {
    return this.http.post(this.API_ROOT + '/app/downloadScoreCardPDF', JSON.stringify(data), httpOptions);
  }

  getHeroAgents(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getHeroAgents', JSON.stringify(data), httpOptions);
  }

  getBottomAgents(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getBottomAgents', JSON.stringify(data), httpOptions);
  }
  getTotalGraph(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getTotalScoreGraph', JSON.stringify(data), httpOptions);
  }

  getGWPGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getGWPGraphs', JSON.stringify(data), httpOptions);
  }
  getLRvsCAQGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getLRvsCAQGraphs', JSON.stringify(data), httpOptions);
  }
  getLobPieGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getLobPieGraphs', JSON.stringify(data), httpOptions);
  }

  getGWPScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getGWPScoreDetails', JSON.stringify(data), httpOptions);
  }
  getNOPGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getNOPGraphs', JSON.stringify(data), httpOptions);
  }
  getNOPScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getNOPScoreDetails', JSON.stringify(data), httpOptions);
  }
  getNOPRRGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getNOPRRGraphs', JSON.stringify(data), httpOptions);
  }
  getNOPRRScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getNOPRRScoreDetails', JSON.stringify(data), httpOptions);
  }
  getSELLGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getSELLGraphs', JSON.stringify(data), httpOptions);
  }
  getSELLScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getSELLScoreDetails', JSON.stringify(data), httpOptions);
  }
  getCORGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getCORGraphs', JSON.stringify(data), httpOptions);
  }
  getCORScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getCORScoreDetails', JSON.stringify(data), httpOptions);
  }
  getLOBGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getLOBGraphs', JSON.stringify(data), httpOptions);
  }
  getLOBScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getLOBScoreDetails', JSON.stringify(data), httpOptions);
  }
  getCampaignGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getCampaignGraphs', JSON.stringify(data), httpOptions);
  }
  getCampaignScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getCampaignScoreDetails', JSON.stringify(data), httpOptions);
  }
  getPTPGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getPTPGraphs', JSON.stringify(data), httpOptions);
  }
  getPTPScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getPTPScoreDetails', JSON.stringify(data), httpOptions);
  }

  getDTPGraphs(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getDTPGraphs', JSON.stringify(data), httpOptions);
  }
  getDTPScoreDetails(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getDTPScoreDetails', JSON.stringify(data), httpOptions);
  }

  generatescore(data: any): any {
    return this.http.post(this.API_ROOT + '/app/generatescore', JSON.stringify(data), httpOptions);
  }

  getRecommendations(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getRecommendations', JSON.stringify(data), httpOptions);
  }



  insights_api_new(data: any): any {
    return this.http.post(this.API_ROOT + '/app/insights_api_new', JSON.stringify(data), httpOptions);
  }

  getallFilters(data:any): any {
    return this.http.post(this.API_ROOT + '/filters/getFilters', JSON.stringify(data), httpOptions);
  }

  

  getScoreCardDetailsYtd(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getScoreCardDetailsYtd', JSON.stringify(data), httpOptions);
  }


  generateScoreYTD(data: any): any {
    return this.http.post(this.API_ROOT + '/app/generateScoreYTD', JSON.stringify(data), httpOptions);
  }

  getAgentTypeWiseBandingBar(data: any): any { //done
    return this.http.post(this.API_ROOT + '/app/getAgentTypeWiseBandingBar', JSON.stringify(data), httpOptions);
  }
  getAllLOBDistBar(data: any): any { //done
    return this.http.post(this.API_ROOT + '/app/getAllLOBDistBar', JSON.stringify(data), httpOptions);
  }
  getAgentBackgroundDistBar(data: any): any {
    return this.http.post(this.API_ROOT + '/app/getAgentBackgroundDistBar', JSON.stringify(data), httpOptions);
  }
  getStateWiseLOBDistPie(data: any): any { //done is it pie chart?? response change needed
    return this.http.post(this.API_ROOT + '/app/getStateWiseLOBDistPie', JSON.stringify(data), httpOptions);
  }

  
  


  checkusername(data: any): any {
    return this.http.post(this.API_ROOT + '/report/checkusername', JSON.stringify(data), httpOptions);
  }
  get_zone_list(data: any) {
    return this.http.post(this.API_ROOT + '/access/getZoneList', JSON.stringify(data), httpOptions);
  }
  get_state_list(data: any) {
    return this.http.post(this.API_ROOT + '/access/getStateList', JSON.stringify(data), httpOptions);
  }
  get_location_list(data: any) {
    return this.http.post(this.API_ROOT + '/access/getLocationList', JSON.stringify(data), httpOptions);
  }
  getChannelList(data: any) {
    return this.http.post(this.API_ROOT + '/access/getChannelList', JSON.stringify(data), httpOptions);
  }
  get_subChannelList(data: any) {
    return this.http.post(this.API_ROOT + '/access/get_subChannelList', JSON.stringify(data), httpOptions);
  }
  get_businessCategory_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getBusinessCategoryList', JSON.stringify(data), httpOptions);
  }
  get_productCodeName_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getProductCodeList', JSON.stringify(data), httpOptions);
  }
  get_pAccLob_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getLOBList', JSON.stringify(data), httpOptions);
  }
  get_productCodeNameBS_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getProductCodeBSList', JSON.stringify(data), httpOptions);
  }
  getMainChannelList(data: any): any {
    return this.http.post(this.API_ROOT + '/report/getMainChannelList', JSON.stringify(data), httpOptions);
  }
  
  get_subChannelCodeName_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getSubChannelList', JSON.stringify(data), httpOptions);
  }
  get_imdCodeName_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getImdCodeList', JSON.stringify(data), httpOptions);
  }
  get_subImdCodeName_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getSubImdCodeList', JSON.stringify(data), httpOptions);
  }
  get_netPremiumSlab_list(data: any) {
    return this.http.post(this.API_ROOT + '/report/getPremiumSlabList', JSON.stringify(data), httpOptions);
  }
  get_subImdChannel_list(data: any): any {
    return this.http.post(this.API_ROOT + '/report/getSubImdChannelList', JSON.stringify(data), httpOptions);
  }
  getFilteredResult(data: any): any {
    return this.http.post(this.API_ROOT + '/report/createSummaryReport', JSON.stringify(data), httpOptions);
  }
  createMonthOnMonthReport(data: any): any {
    return this.http.post(this.API_ROOT + '/report/createMonthOnMonthReport', JSON.stringify(data), httpOptions);
  }

  getMonthYearList(): any {
    return this.http.get(this.API_ROOT + '/app/getMonthYearList',  httpOptions);
  }


// --------------Dashboard Tracker -------------------------

getMtdYtdFtmData(data: any): any {
  return this.http.post(this.API_ROOT + '/app/getMtdYtdFtmData',  JSON.stringify(data), httpOptions);
}

subChannelwisePieChart(data: any): any {
  return this.http.post(this.API_ROOT + '/tracker/subChannelwisePieChart', JSON.stringify(data), httpOptions);
}
  triggerPerformance(data: any): any {
    return this.http.post(this.API_ROOT + '/tracker/triggerPerformance',  JSON.stringify(data), httpOptions);
  }
  subChannelDegrowGraph(data: any): any {
    return this.http.post(this.API_ROOT + '/tracker/subChannelDegrowGraph', JSON.stringify(data), httpOptions);
  }
  underPerformingGraphZh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/underPerformingGraphZh',JSON.stringify(data), httpOptions);
  }
  underPerformingGraphCh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/underPerformingGraphCh',JSON.stringify(data),httpOptions);
  }
  underPerformingGraphRm(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/underPerformingGraphRm',JSON.stringify(data),httpOptions);
  }
  mtdDowntrendGraphZh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphZh',JSON.stringify(data),httpOptions);
  }
  mtdDowntrendGraphCh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphCh',JSON.stringify(data),  httpOptions);
  }
  mtdDowntrendGraphRm(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphRm',JSON.stringify(data),  httpOptions);
  }
  getPriorityCount(): any {
    return this.http.get(this.API_ROOT + '/tracker/getPriorityCount',  httpOptions);
  }
  getPriorityCountSLob(): any {
    return this.http.get(this.API_ROOT + '/tracker/getPriorityCountSLob',  httpOptions);
  }
  priority3MonthExcel(): any {
    return this.http.get(this.API_ROOT + '/tracker/priority3MonthExcel',  httpOptions);
  }
  priority2MonthExcel(): any {
    return this.http.get(this.API_ROOT + '/tracker/priority2MonthExcel',  httpOptions);
  }
  priority1MonthExcel(): any {
    return this.http.get(this.API_ROOT + '/tracker/priority1MonthExcel',  httpOptions);
  }
  download3MonthImdSlob(): any {
    return this.http.get(this.API_ROOT + '/tracker/download3MonthImdSlob',  httpOptions);
  }
  download2MonthImdSlob(): any {
    return this.http.get(this.API_ROOT + '/tracker/download2MonthImdSlob',  httpOptions);
  }
  download1MonthImdSlob(): any {
    return this.http.get(this.API_ROOT + '/tracker/download1MonthImdSlob',  httpOptions);
  }
  // triggerImpact(): any {
  //   return this.http.get(this.API_ROOT + '/tracker/triggerImpact',  httpOptions);
  // }

  triggerImpactSlob(): any {
    return this.http.get(this.API_ROOT + '/tracker/triggerImpactSlob',  httpOptions);
  }
  lobandSubChPieChart(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/lobandSubChPieChart',JSON.stringify(data),  httpOptions);
  }
  lobAndLevelwisePieChart(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/lobAndLevelwisePieChart',JSON.stringify(data),  httpOptions);
  }
  // triggerImpactPrev(): any {
  //   return this.http.get(this.API_ROOT + '/tracker/triggerImpactPrev',  httpOptions);
  // }
  // triggerImpactPrevBefore(): any {
  //   return this.http.get(this.API_ROOT + '/tracker/triggerImpactPrevBefore',  httpOptions);
  // }
  empPerformance(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/empPerformance',JSON.stringify(data),  httpOptions);
  }
  singleChannelGraph(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/singleChannelGraph', JSON.stringify(data),  httpOptions);
  }


  sLobGraphZh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/sLobGraphZh',JSON.stringify(data) ,  httpOptions);
  }


  sLobGraphCh(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/sLobGraphCh',JSON.stringify(data),  httpOptions);
  }
  sLobGraphRm(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/sLobGraphRm',JSON.stringify(data),  httpOptions);
  }
  countSlob(data: any): any {
    return this.http.post(this.API_ROOT + '/tracker/countSlob', JSON.stringify(data),  httpOptions);
  }  
  triggerPerformanceGraph(data: any): any {
    return this.http.post(this.API_ROOT + '/tracker/triggerPerformanceGraph', JSON.stringify(data), httpOptions);
  }  
  actImdsDownload(data:any): any {
    return this.http.post(this.API_ROOT + '/tracker/actImdsDownload',JSON.stringify(data),  httpOptions);
  }  
  // threeMonthsGwpGraph(){
  //   return this.http.get(this.API_ROOT + '/tracker/threeMonthsGwpGraph',  httpOptions);
  // }
  subChannelwiseTotal(data : any){
    return this.http.post(this.API_ROOT + '/tracker/subChannelwiseTotal',JSON.stringify(data),  httpOptions);
  }




  // -------greater than 1 year api------//
  subChannelDegrowGraphGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/subChannelDegrowGraphGt1',JSON.stringify(data),  httpOptions);
  }
  underPerformGraphZhGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/underPerformGraphZhGt1',JSON.stringify(data),  httpOptions);
  }
  underPerformGraphChGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/underPerformGraphChGt1',JSON.stringify(data),  httpOptions);
  }
  underPerformGraphRmGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/underPerformGraphRmGt1',JSON.stringify(data),  httpOptions);
  }
  mtdDowntrendGraphZhGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphZhGt1',JSON.stringify(data),  httpOptions);
  }
  mtdDowntrendGraphChGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphChGt1',JSON.stringify(data),  httpOptions);
  }
  mtdDowntrendGraphRmGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphRmGt1',JSON.stringify(data),  httpOptions);
  }
  m3tdDowntrendGraphRmGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/mtdDowntrendGraphRmGt1',JSON.stringify(data),  httpOptions);
  }
  singleChannelGraph_2(): any {
    return this.http.get(this.API_ROOT + '/tracker/singleChannelGraph',  httpOptions);
  }
  getPriorityCountGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/getPriorityCountGt1',  httpOptions);
  }
  p1For3MntXcelGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/p1For3MntXcelGt1',  httpOptions);
  }
  p2For2MntXcelGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/p2For2MntXcelGt1',  httpOptions);
  }
  p3For1MntXcelGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/p3For1MntXcelGt1',  httpOptions);
  }
  triggerImpactGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/triggerImpactGt1',  httpOptions);
  }
  trigPerformGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/trigPerformGt1',JSON.stringify(data),  httpOptions);
  }
  threeMonthsGwpGraphGt1(): any {
    return this.http.get(this.API_ROOT + '/tracker/threeMonthsGwpGraphGt1',  httpOptions);
  }
  actImdsDownloadGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/actImdsDownloadGt1',JSON.stringify(data),  httpOptions);
  }
  subChannelwiseTotalGt1(data : any){
    return this.http.post(this.API_ROOT + '/tracker/subChannelwiseTotalGt1',JSON.stringify(data),  httpOptions);
  }
  // getTriggerDate(){
  //   return this.http.get(this.API_ROOT + '/tracker/getTriggerDate' );
  // }
  
  
  levelPieChart(data : any){
    return this.http.post(this.API_ROOT + '/tracker/levelPieChart',JSON.stringify(data),  httpOptions);
  }


  // ------------------------------------//







  // toplinePerformance(data : any){
  //   return this.http.post(this.API_ROOT + '/dashboard/toplinePerformance',JSON.stringify(data),  httpOptions);
  // }
  // healthPerformance(data : any){
  //   return this.http.post(this.API_ROOT + '/dashboard/healthDashboard',JSON.stringify(data),  httpOptions);
  // }




  toplinePerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/topline_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }
  healthPerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/health_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }


  propertyPerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/property_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }

  // propertyPerformance(data: any) {
  //   const url = `${this.API_ROOT}/dashboard/property_overall_agent_performance`;
  //   return this.http.post(url, data, httpOptions).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error in propertyPerformance:', error.message);
  //       return throwError(() => new Error('Failed to fetch property performance'));
  //     })
  //   );
  // }


  ropcPerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/ropc_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }
  pvtcarPerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/pvtcar_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }
  frhPerformance(data : any){
    return this.http.post(this.API_ROOT + '/dashboard/frh_overall_agent_performance',JSON.stringify(data),  httpOptions);
  }



  activation(data : any){
    return this.http.post(this.API_ROOT + '/dashboard_imd_performance/activation',JSON.stringify(data),  httpOptions);
  }
  recruitment(data : any){
    return this.http.post(this.API_ROOT + '/dashboard_imd_performance/recruitment',JSON.stringify(data),  httpOptions);
  }



















  // 
  // triggerImpact_gt_1
  // triggerImpact_lt_1






  // tracker new section ------------------------------done by rishu---------------------------------------------
  getTriggerDate(){
    return this.http.get(this.API_ROOT + '/tracker_new/getTriggerDate' );
  }
  // threeMonthsGwpGraph(){            // to show full unfiltered data
  //   return this.http.get(this.API_ROOT + '/tracker_new/previous_3_month_gwp',  httpOptions);
  // }



  // agent_degrowth_priority_wise(){
  //   return this.http.get(this.API_ROOT + '/tracker_new/agent_degrowth_priority_wise',  httpOptions);
  // }



  triggerImpactAll(): any {
    return this.http.get(this.API_ROOT + '/tracker_new/triggerImpact',  httpOptions);
  }




  // ----------------------------------tracker new less than 1 section api calls ------------------------
  triggerImpact(): any {
    return this.http.get(this.API_ROOT + '/tracker_new/triggerImpact_lt_1',  httpOptions);
  }
  threeMonthsGwpGraph(){
    return this.http.get(this.API_ROOT + '/tracker_new/previous_3_month_gwp_lt_1',  httpOptions);
  }

  agent_degrowth_priority_wise(){
    return this.http.get(this.API_ROOT + '/tracker_new/agent_degrowth_priority_wise_lt_1',  httpOptions);
  }


  getAgentsLtGt1yr(){
    return this.http.get(this.API_ROOT + '/tracker_new/getAgentsLtGt1yr',  httpOptions);
  }

  degrowingAgentZonal(data : any){
    return this.http.post(this.API_ROOT + '/tracker_new/degrowingAgentZonal',JSON.stringify(data),  httpOptions);
  }

  mtdDowntrend(data : any){
    return this.http.post(this.API_ROOT + '/tracker_new/mtdDowntrend',JSON.stringify(data),  httpOptions);
  }





  // ----------------------------------tracker new greater than 1 section api calls ------------------------

  triggerImpact_gt1(): any {
    return this.http.get(this.API_ROOT + '/tracker_new/triggerImpact_gt_1',  httpOptions);
  }

  threeMonthsGwpGraph_gt1(){
    return this.http.get(this.API_ROOT + '/tracker_new/previous_3_month_gwp_gt_1',  httpOptions);
  }

  agent_degrowth_priority_wise_gt1(){
    return this.http.get(this.API_ROOT + '/tracker_new/agent_degrowth_priority_wise_gt_1',  httpOptions);
  }




















  // ----------------------------------tracker new single lob section api calls ------------------------
  singleLob(){
    return this.http.get(this.API_ROOT + '/tracker_new/singleLob',  httpOptions);
  }

























  // --------------score configuration -------------------------
  getMetricsHead():any{
    return this.http.get(this.API_ROOT + '/config/getMetricsHead',  httpOptions);
  }
  addConfiguration(data:any): any {
    return this.http.post(this.API_ROOT + '/config/addConfiguration',JSON.stringify(data),  httpOptions);
  }
  getBifurcationList(data:any): any{
    return this.http.post(this.API_ROOT + '/config/getBifurcationList',JSON.stringify(data),  httpOptions);
  }

  getScoreConfig(data:any): any{
    return this.http.post(this.API_ROOT + '/config/getScoreConfig',JSON.stringify(data),  httpOptions);
  }

  deleteConfiguration(data:any): any{
    return this.http.post(this.API_ROOT + '/config/deleteConfiguration',JSON.stringify(data),  httpOptions);
  }

  saveConfiguration(data:any): any{
    return this.http.post(this.API_ROOT + '/config/saveConfiguration',JSON.stringify(data),  httpOptions);

  }
  uploadFile(data:any){
    return this.http.post(this.API_ROOT + '/app/uploadFile',data);
  }

  getFileTypeList(){
    return this.http.get(this.API_ROOT + '/app/getFileTypeList' );
  }

  getZoneWiseBandingBar(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getZoneWiseBandingBar' ,JSON.stringify(data),  httpOptions);
  }
  getBandingPie(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getBandingPie' ,JSON.stringify(data),  httpOptions);
  }

  getUploadedFileList(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getUploadedFileList',JSON.stringify(data),  httpOptions);
  }
  
  deleteFile(data:any): any{
    return this.http.post(this.API_ROOT + '/app/deleteFile',JSON.stringify(data),  httpOptions);
  }

  getStatewiseGwp(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getStatewiseGwp',JSON.stringify(data),  httpOptions);
  }


  getOnePagerdataMOM(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getOnePagerdataMOM',JSON.stringify(data),  httpOptions);
  }
  getOnePagerdataYTD(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getOnePagerdataYTD',JSON.stringify(data),  httpOptions);
  }
  // orderby_YTD_Care_Advisor_Report_Card(data:any): any{
  //   return this.http.post(this.API_ROOT + '/app/orderby_YTD_Care_Advisor_Report_Card',JSON.stringify(data),  httpOptions);
  // }



  getImdDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getImdDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getLOBScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getLOBScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getCampaignScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getCampaignScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getPTPScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getPTPScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getDTPScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getDTPScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getSELLScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getSELLScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getNOPRRScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getNOPRRScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getNOPScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getNOPScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }

  getGWPScoreDetailsYtd(data:any): any{
    return this.http.post(this.API_ROOT + '/app/getGWPScoreDetailsYtd',JSON.stringify(data),  httpOptions);
  }






  get_agents_lt_gt_1yr(){
    return this.http.get(this.API_ROOT + '/tracker_new/subChannelDegrowGraphGt1');
  }















  segmentationBlueprint = '/segmentation'

  get_segment_overview(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_segment_overview',JSON.stringify(data),  httpOptions);
  }

  get_segment_overview_new(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_segment_overview_new',JSON.stringify(data),  httpOptions);
  }

  
  get_segment_variable_comparison(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_segment_variable_comparison',JSON.stringify(data),  httpOptions);
  }
  
  
  get_segment_digital_friendlieness_trend(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_segment_digital_friendlieness_trend',JSON.stringify(data),  httpOptions);
  }
  
  
  get_average_meetings_ytd(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_average_meetings_ytd',JSON.stringify(data),  httpOptions);
  }
  
  
  get_zonal_headwise_segment_contribution(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_zonal_headwise_segment_contribution',JSON.stringify(data),  httpOptions);
  }
  
  
  get_segmentwise_zonal_head(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/get_segmentwise_zonal_head',JSON.stringify(data),  httpOptions);
  }
  
  
  hiring_status(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/hiring_status',JSON.stringify(data),  httpOptions);
  }


  question_answer(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/question_answer',JSON.stringify(data),  httpOptions);
  }



  check_segmentation_agents(data:any): any{
    return this.http.post(this.API_ROOT + this.segmentationBlueprint + '/check_segmentation_agents',JSON.stringify(data),  httpOptions);
  }


  
  segment_overview_updated(): any{
    return this.http.get(this.API_ROOT + this.segmentationBlueprint + '/segment_overview_updated');
  }
  segment_overview_updated_non_gi(): any{
    return this.http.get(this.API_ROOT + this.segmentationBlueprint + '/segment_overview_updated_non_gi');
  }

  // getTriggerDate(){
  //   return this.http.get(this.API_ROOT + '/tracker/getTriggerDate' );
  // }



  
}