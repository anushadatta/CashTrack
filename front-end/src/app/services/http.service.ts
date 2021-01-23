import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { OPENCAGEDATA_KEY, APIXU_KEY } from '../common/variable';
// import types
import {
  ApiResponseType, SiteUserDetail, ApiDeleteResponse,
  ApiUpdatedResponse, UserDetail, ResyncDeviceDetail,
  SiteDetail, EnergyAssetDetail, ApiInsertedResponse, ForecastDataCountRes
} from '../types/common.type';
import {
  UserDetailsRes, UserInfoRes,
  SiteDetailsRes, EnergyAssetDetailsRes
} from '../types/settings.type';
import { CustomizedChartResponse } from '../types/customized-chart.type';
import { ForecastResponse } from '../types/forecast.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private endPoint = env.endPoint + '/api';
  private resyncAPIEndPoint = env.reportGenerationEndPoint;

  constructor(private http: HttpClient) { }

  // convert string response to json
  parseResponse(response: any) {
    if (typeof response == 'string') {
      return JSON.parse(response);
    } else {
      return response;
    }
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// Other APIs //////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  /**
   * get IP address
   */
  funGetIpAddress(): Observable<any> {
    return this.http.get('https://jsonip.com');
  }

  /**
   * @function funGetWeatherData()
   * this function gets weather data from lati long
   * @param lati latitude
   * @param long longitude
   * @returns {Observable} observable of response os API
   */
  funGetWeatherData(lati: number, long: number): Observable<any> {
    const url = `https://api.apixu.com/v1/current.json?key=${APIXU_KEY}&q=${lati},${long}`;
    return this.http.get(url);
  }

  /**
   * @function funGetWeatherForecast()
   * this function gets weather forecast from lati long
   * @param lati latitude
   * @param long longitude
   * @returns {Observable} observable of response os API
   */
  funGetWeatherForecast(lati: number, long: number): Observable<any> {
    const url = `https://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}&q=${lati},${long}&days=7`;
    return this.http.get(url);
  }

  /**
   * @function funGetLocation()
   * this function gets location based on site address
   * @param address address of site
   * @returns {Observable} observable of response os API
   */
  funGetLocation(address: string): Observable<any> {
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGEDATA_KEY}&q=${address}&pretty=1&no_annotations=1`;
    return this.http.get(url);
  }

  /**
   * @function funGetSiteTime()
   * this function gets site time from location
   * @param location location
   * @returns {Observable} observable of response of API
   */
  funGetSiteTime(lat: number, long: number): Observable<any> {
    const location = lat + ',' + long;
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGEDATA_KEY}&pretty=1&q=${location}`;
    return this.http.get(url);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// Login APIs ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  /**
   * @function funLogin()
   * calls login API of backend
   * @param {string} username
   * @param {string} password
   * @returns {Observable} observable of response of API
   */
  funLogin(username: string, password: string): Observable<ApiResponseType<any>> {
    let data = { username, password };
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funRequestDemoAccount()
   * calls login API of backend
   * @param {string} username
   * @param {string} password
   * @returns {Observable} observable of response of API
   */
  funRequestDemoAccount(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/requestDemoAccount', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funLastLogin()
   * calls lastLogin API of backend
   * @param {object} data
   * @returns {Observable} observable of response of API
   */
  funLastLogin(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/lastLogin', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funLastLogout()
   * calls lastLogout API of backend
   * @param {object} data
   * @returns {Observable} observable of response of API
   */
  funLastLogout(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/lastLogout', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funForgotPassword()
   * calls forgotPassword API of backend
   * @param {string} username
   * @param {string} email
   * @returns {Observable} observable of response of API
   */
  funForgotPassword(email: string): Observable<ApiResponseType<any>> {
    let data = { email: email };
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/forgotPassword', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funCheckResetUrl()
   * calls checkResetUrl API of backend
   * @param {string} resetPassword
   * @returns {Observable} observable of response of API
   */
  funCheckResetUrl(resetPassword: string): Observable<ApiResponseType<any>> {
    let data = { reseturl: resetPassword };
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/checkResetUrl', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funResetPassword()
   * calls resetPassword API of backend
   * @param data object of user message
   * @returns {Observable} observable of response of API
   */
  funResetPassword(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/resetPassword', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funContactUs()
   * this function send mail
   * @param data object of user message
   * @returns {Observable} observable of response of API
   */
  funContactUs(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/contactUs', data)
      .pipe(map(this.parseResponse));
  }

  // clientInfo
  /**
   * @function funSaveClientInfo()
   * calls saveClientInfo API of backend
   * @param data object of user message
   * @returns {Observable} observable of response of API
   */
  funSaveClientInfo(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/saveClientInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetSiteUser()
   * calls getSiteUserList API of backend
   * @param {number} user_id
   * @returns {Observable} observable of response of API
   */
  funGetSiteUser(data): Observable<ApiResponseType<any>> {
    // let data = { user_id: user_id, site_id: site_id };
    return this.http.post<ApiResponseType<any>>(this.endPoint + '/login/getSiteUserList', data)
      .pipe(map(this.parseResponse));
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// Landing APIs ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  funGetCustomerDetail(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getCustomerDetail', data)
      .pipe(map(this.parseResponse));
  }

  funGetSiteListLanding(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getSiteList', data)
      .pipe(map(this.parseResponse));
  }

  funGetAssetNameList(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getAssetNameList', data)
      .pipe(map(this.parseResponse));
  }

  funGetTilesData(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getTilesData', data)
      .pipe(map(this.parseResponse));
  }

  funGetEnergyBreakdownData(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getEnergyBreakdownData', data)
      .pipe(map(this.parseResponse));
  }

  funGetPortfolioData(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getPortfolioData', data)
      .pipe(map(this.parseResponse));
  }

  funDownloadCsv(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/downloadCsv', data)
      .pipe(map(this.parseResponse));
  }

  funGetAlarmActivatedStatus(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getAlarmActivatedStatus', data)
      .pipe(map(this.parseResponse));
  }



  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// Dashboard APIs ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  /**
   * @function funGetUserList()
   * calls getUserList API of backend
   * @param {undefined}
   * @returns {Observable} observable of response of API
   */
  // funGetUserList(): Observable<ApiResponseType<any>> {
  //   return this.http.post<ApiResponseType<any>>
  //     (this.endPoint + '/dashboard/getUserList', {})
  //     .pipe(map(this.parseResponse));
  // }

  funGetUserList(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>
      (this.endPoint + '/landing/getUserList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetSiteList()
   * calls getSiteList API of backend
   * @param {any} user_id
   * @returns {Observable} observable of response of API
   */
  funGetSiteList(user_id): Observable<ApiResponseType<SiteDetail[]>> {
    let data = (user_id === '') ? {} : { user_id: user_id };
    return this.http.post<ApiResponseType<SiteDetail[]>>(
      this.endPoint + '/dashboard/getSiteList', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewSitePortfolio()
   * calls getNewSitePortfolio API of backend
   * @param data object of user message
   * @returns {Observable} observable of response of API
   */
  funGetNewSitePortfolio(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getNewSitePortfolio', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPortfolioGrid()
   * calls getPortfolioGrid API of backend
   * @param data object of user message
   * @returns {Observable} observable of response of API
   */
  funGetPortfolioGrid(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPortfolioGrid', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetSiteUserList()
   * calls getSiteUserList API of backend
   * @param {number} user_id
   * @returns {Observable} observable of response of API
   */
  funGetSiteUserList(data): Observable<ApiResponseType<any>> {
    // let data = { user_id: user_id, site_id: site_id };
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getSiteUserList', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetDeviceList()
   * calls getDeviceList API of backend
   * @param {object} data
   * @returns {Observable} observable of response of API
   */
  funGetDeviceList(data): Observable<ApiResponseType<any>> {
    // let data = { user_id: user_id, site_id: site_id };
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getDeviceList', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetUserDetail()
   * calls getUserDetail API of backend
   * @param {object} data
   * @returns {Observable} observable of response of API
   */
  funGetUserDetail(data: any): Observable<ApiResponseType<UserDetail[]>> {
    return this.http.post<ApiResponseType<UserDetail[]>>(
      this.endPoint + '/dashboard/getUserDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function getSiteDetail()
   * calls getUserDetail API of backend
   * @param {object} data
   * @returns {Observable} observable of response of API
   */
  funGetSiteDetail(data: any): Observable<ApiResponseType<SiteDetail[]>> {
    return this.http.post<ApiResponseType<SiteDetail[]>>(
      this.endPoint + '/dashboard/getSiteDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAssetDetail()
   * calls getAssetDetail API of backend
   * @param {number} data params
   * @returns {Observable} observable of response of API
   */
  funGetAssetDetail(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getAssetDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetDeviceDetailData()
   * calls getDeviceDetailData API of backend
   * @param {number} data params for date device data
   * @returns {Observable} observable of response of API
   */
  funGetDeviceDetailData(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getDeviceDetailData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPhaseData()
   * calls getPhaseData API of backend
   * @param data params for date selection
   */
  funGetPhaseData(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPhaseData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPhaseDataFiveMin()
   * calls getPhaseDataFiveMin API of backend
   * @param data params for date selection
   */
  funGetPhaseDataFiveMin(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPhaseDataFiveMin', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetBatteryValue()
   * calls getBatteryValue API of backend
   * @param data params for date selection
   */
  funGetBatteryValue(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getBatteryValue', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetBatteryTempValue()
   * calls getBatteryTempValue API of backend
   * @param data params for date selection
   */
  funGetBatteryTempValue(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getBatteryTempValue', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetBatteryDataFiveMin()
   * calls getBatteryDataFiveMin API of backend
   * @param data params for date selection
   */
  funGetBatteryDataFiveMin(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getBatteryDataFiveMin', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLatestValueFromRawTable()
   * calls getLatestValueFromRawTable API of backend
   * @param data params for date selection
   */
  funGetLatestValueFromRawTable(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLatestValueFromRawTable', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetTotalLoadEnergyData()
   * calls getTotalLoadEnergyData API of backend
   * @param data params for date selection
   */
  funGetTotalLoadEnergyData(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getTotalLoadEnergyData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetYieldData()
   * calls getYieldData API of backend
   * @param data params for date selection
   * @returns {Observable} observable of response of API
   */
  funGetYieldData(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getYieldData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funEnergyBreakDownData()
   * calls energyBreakDownData API of backend
   * @param data params for api
   * @returns {Observable} observable of response of API
   */
  funEnergyBreakDownData(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/energyBreakDownData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funForecastChartData()
   * calls forecastChartData API of backend
   * @param data params for api
   * @returns {Observable} observable of response of API
   */
  funForecastChartData(data: any): Observable<ApiResponseType<ForecastResponse>> {
    return this.http.post<ApiResponseType<ForecastResponse>>(
      this.endPoint + '/dashboard/forecastChartData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funForecastDataCount()
   * calls forecastDataCount API of backend
   * @param data params for api
   * @returns {Observable} observable of response of API
   */
  funForecastDataCount(data: any): Observable<ApiResponseType<ForecastDataCountRes>> {
    return this.http.post<ApiResponseType<ForecastDataCountRes>>(
      this.endPoint + '/dashboard/forecastDataCount', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetForecastEnergySum()
   * calls getForecastEnergySum API of backend
   * @param data params for api
   * @returns {Observable} observable of response of API
   */
  funGetForecastEnergySum(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getForecastEnergySum', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetEnergyDataForDashboard()
   * calls getEnergyDataForDashboard API of backend
   * @param {number} data params for day
   * @returns {Observable} observable of response of API
   */
  funGetEnergyDataForDashboard(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getEnergyDataForDashboard', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetEnergyDataForDetailDashboard()
   * calls getEnergyDataForDetailDashboard API of backend
   * @param {number} data params for day
   * @returns {Observable} observable of response of API
   */
  funGetEnergyDataForDetailDashboard(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getEnergyDataForDetailDashboard', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLifetimeAssetData()
   * calls getLifetimeAssetData API of backend
   * @param {number} user_id
   * @param {number} site_id
   * @param {string} device_name
   * @param {string} performance_type
   * @returns {Observable} observable of response of API
   */
  funGetLifetimeAssetData(data): Observable<ApiResponseType<any>> {
    // let data = { user_id: user_id, site_id: site_id, device_name: device_name, performance_type: performance_type };
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLifetimeAssetData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPeakData()
   * call getPeakData API of backend
   * @param data
   */
  funGetPeakData(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPeakData', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetCo2Emission()
   * calls getCo2Emission API of backend
   * @param {number} data params
   * @returns {Observable} observable of response of API
   */
  funGetCo2Emission(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getCo2Emission', data)
      .pipe(map(this.parseResponse));
  }

  /** 
   * @function funGetCsvFromDate()
   * calls getCsvFromDate API of backend
   * @param {number} data params
   * @returns {Observable} observable of response of API
   */
  funGetCsvFromDate(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getCsvFromDate', data)
      .pipe(map(this.parseResponse));
  }

  /** 
   * @function funGetCompiledCsv()
   * calls getCompiledCsv API of backend
   * @param {number} data params
   * @returns {Observable} observable of response of API
   */
  funGetCompiledCsv(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getCompiledCsv', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPRAndFuelSaved()
   * calls performance ratio / fuel saved API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetPRAndFuelSaved(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPRAndFuelSaved', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPrForSite()
   * calls performance ratio API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetPrForSite(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPrForSite', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetWeatherCorrectedPr()
   * calls getWeatherCorrectedPr API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetWeatherCorrectedPr(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getWeatherCorrectedPr', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAlarmStatus()
   * calls getAlarmStatus API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetAlarmStatus(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getAlarmStatus', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLandingPageData()
   * calls getAlarmStatus API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetLandingPageData(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLandingPageData', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetSpecifiedYieldData()
   * calls getSpecifiedYieldData API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetSpecifiedYieldData(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getSpecifiedYieldData', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetPerformanceCompPrData()
   * calls getPerformanceCompPrData API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetPerformanceCompPrData(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getPerformanceCompPrData', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetInvAnalMPPTStringData()
   * calls getInvAnalMPPTStringData API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetInvAnalMPPTStringData(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getInvAnalMPPTStringData', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funInvAnalACPowerChart()
   * calls invAnalACPowerChart API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funInvAnalACPowerChart(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/invAnalACPowerChart', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funInvAnalVoltageChart()
   * calls invAnalVoltageChart API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funInvAnalVoltageChart(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/invAnalVoltageChart', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funInvAnalCurrentChart()
   * calls invAnalCurrentChart API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funInvAnalCurrentChart(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/invAnalCurrentChart', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funInvAnalIVCharacteristicsChart()
   * calls invAnalIVCharacteristicsChart API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funInvAnalIVCharacteristicsChart(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/invAnalIVCharacteristicsChart', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetTickets()
   * calls getTickets API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetTickets(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getTickets', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddTickets()
   * calls addTickets API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funAddTickets(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/addTickets', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateTickets()
   * calls updateTickets API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funUpdateTickets(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/updateTickets', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateMultipleTickets()
   * calls ticketOperations API of backend 
   * @param param 
   */
  funUpdateMultipleTickets(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/ticketOperations', param
    ).pipe(map(this.parseResponse))
  }

  /**
   * @function funDeleteTickets()
   * calls deleteTickets API for backend
   * @param {object} param param
   * @returns {Observable} 
   */
  funDeleteTickets(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/deleteTicket', param
    ).pipe(map(this.parseResponse))
  }

  /**
   * @function funGetValidInvAnalysisRegister()
   * calls updateTickets API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetValidInvAnalysisRegister(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getValidInvAnalysisRegister', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetTicketsHistory()
   * calls getTicketsHistory API of backed
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetTicketsHistory(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getTicketsHistory', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAssetList()
   * calls getAssetList API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetAssetList(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getAssetList', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetTeamList()
   * calls getTeamList API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetTeamList(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getTeamList', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddTeam()
   * calls addTeam API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funAddTeam(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/addTeam', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateTeam()
   * calls updateTeam API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funUpdateTeam(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/updateTeam', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteTeam()
   * calls deleteTeam API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funDeleteTeam(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/deleteTeam', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddTeamRole()
   * calls getTeamRole API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetTeamRole(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getTeamRole', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddTeamRole()
   * calls addTeamRole API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funAddTeamRole(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/addTeamRole', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funRemoveTeamRole()
   * calls removeTeamRole API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funRemoveTeamRole(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/removeTeamRole', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetMaintenance()
   * calls getMaintenance API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetMaintenance(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getMaintenance', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddMaintenance()
   * calls addMaintenance API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funAddMaintenance(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/addMaintenance', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddMultipleMaintenance()
   * calls addMultipleMaintenance API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funAddMultipleMaintenance(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/addMultipleMaintenance', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funRemoveMaintenance()
   * calls removeMaintenance API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funRemoveMaintenance(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/removeMaintenance', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetWeatherApi()
   * calls getWeatherApi API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetWeatherApi(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getWeatherInfo', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLoadAsset()
   * calls getLoadAsset API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetLoadAsset(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLoadAsset', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLoadMaintenance()
   * calls getLoadMaintenance API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetLoadMaintenance(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLoadMaintenance', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLoadImage()
   * calls getLoadImage API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetLoadImage(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getLoadImage', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUploadLoadImage()
   * calls uploadLoadImage API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funUploadLoadImage(param: any): Observable<ApiResponseType<ApiInsertedResponse>> {
    return this.http.post<ApiResponseType<ApiInsertedResponse>>(
      this.endPoint + '/dashboard/uploadLoadImage', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUploadDocumentFile()
   * calls uploadLoadImage API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funUploadDocumentFile(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/uploadDocumentFile', data)
      .pipe(map(this.parseResponse));
  }

   /**
   * @function funGetDocumentFiles()
   * calls funGetDocumentFiles API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetDocumentFiles(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getDocumentFiles', data)
      .pipe(map(this.parseResponse));
  }

   /**
   * @function funDeleteDocumentFile()
   * calls deleteDocumentFile API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funDeleteDocumentFile(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/deleteDocumentFile', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetGridImportExport()
   * calls getGridImportExport API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetGridImportExport(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getGridImportExport', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetCustomizedChartData()
   * calls getCustomizedChartData API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetCustomizedChartData(param): Observable<ApiResponseType<CustomizedChartResponse>> {
    return this.http.post<ApiResponseType<CustomizedChartResponse>>(
      this.endPoint + '/dashboard/getCustomizedChartData', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetMpptHeatMap()
   * calls getMpptHeatMap API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetMpptHeatMap(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getMpptHeatMap', param)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAlarmDetails()
   * calls getAlarmDetails API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetAlarmDetails(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getAlarmDetails', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetDemoUserAccessInfo()
   * calls getDemoUserAccessInfo API of backend
   * @param {object} param param
   * @returns {Observable} observable of response of API
   */
  funGetDemoUserAccessInfo(param): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/dashboard/getDemoUserAccessInfo', param)
      .pipe(map(this.parseResponse));
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// Settings APIs ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  /**
   * @function funGetNewAllUserDetail()
   * calls getNewAllUserDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewAllUserDetail(data: any): Observable<ApiResponseType<UserDetailsRes>> {
    return this.http.post<ApiResponseType<UserDetailsRes>>(
      this.endPoint + '/settings/getNewAllUserDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewUserInfo()
   * calls getNewUserInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewUserInfo(data: any): Observable<ApiResponseType<UserInfoRes>> {
    return this.http.post<ApiResponseType<UserInfoRes>>(
      this.endPoint + '/settings/getNewUserInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewSiteUserInfo()
   * calls getNewSiteUserInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewSiteUserInfo(data: any): Observable<ApiResponseType<SiteUserDetail[]>> {
    return this.http.post<ApiResponseType<SiteUserDetail[]>>(
      this.endPoint + '/settings/getNewSiteUserInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddNewSiteUser()
   * calls addNewSiteUser API of backend
   * @returns {Observable} observable of response of API
   */
  funAddNewSiteUser(data: any): Observable<ApiResponseType<string>> {
    return this.http.post<ApiResponseType<string>>(
      this.endPoint + '/settings/addNewSiteUser', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteNewSiteUser()
   * calls deleteNewSiteUser API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteNewSiteUser(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteNewSiteUser', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewSiteUserInfo()
   * calls updateNewSiteUserInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewSiteUserInfo(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewSiteUserInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddNewUser()
   * calls addNewUser API of backend
   * @returns {Observable} observable of response of API
   */
  funAddNewUser(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/addNewUser', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteNewUser()
   * calls deleteNewUser API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteNewUser(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteNewUser', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewUserInfo()
   * calls updateNewUserInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewUserInfo(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewUserInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewUserInfoWithImg()
   * calls updateNewUserInfoImg API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewUserInfoWithImg(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewUserInfoImg', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewAllSiteDetail()
   * calls getNewAllSiteDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewAllSiteDetail(data: any): Observable<ApiResponseType<SiteDetailsRes>> {
    return this.http.post<ApiResponseType<SiteDetailsRes>>(
      this.endPoint + '/settings/getNewAllSiteDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewSiteInfo()
   * calls getNewSiteInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewSiteInfo(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getNewSiteInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddNewSite()
   * calls addNewSite API of backend
   * @returns {Observable} observable of response of API
   */
  funAddNewSite(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/addNewSite', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteNewSite()
   * calls deleteNewSite API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteNewSite(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteNewSite', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewSiteInfo()
   * calls updateNewSiteInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewSiteInfo(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewSiteInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewAllResyncDeviceDetail()
   * calls getNewAllResyncDeviceDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewAllResyncDeviceDetail(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getNewAllResyncDeviceDetail', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewResyncDeviceDetail()
   * calls getNewResyncDeviceDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewResyncDeviceDetail(data: any): Observable<ApiResponseType<ResyncDeviceDetail[]>> {
    return this.http.post<ApiResponseType<ResyncDeviceDetail[]>>(
      this.endPoint + '/settings/getNewResyncDeviceDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddNewResyncDeviceDetail()
   * calls addNewResyncDeviceDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funAddNewResyncDeviceDetail(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/addNewResyncDeviceDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteNewResyncDevice()
   * calls deleteNewResyncDevice API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteNewResyncDevice(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteNewResyncDevice', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewResyncDeviceInfo()
   * calls updateNewResyncDeviceInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewResyncDeviceInfo(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewResyncDeviceInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewAllAssetDetail()
   * calls getNewAllAssetDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewAllAssetDetail(data: any): Observable<ApiResponseType<EnergyAssetDetailsRes>> {
    return this.http.post<ApiResponseType<EnergyAssetDetailsRes>>(
      this.endPoint + '/settings/getNewAllAssetDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewAssetDetail()
   * calls getNewAssetDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewAssetDetail(data: any): Observable<ApiResponseType<EnergyAssetDetail[]>> {
    return this.http.post<ApiResponseType<EnergyAssetDetail[]>>(
      this.endPoint + '/settings/getNewAssetDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funAddNewEnergyAsset()
   * calls addNewEnergyAsset API of backend
   * @returns {Observable} observable of response of API
   */
  funAddNewEnergyAsset(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/addNewEnergyAsset', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funDeleteNewEnergyAsset()
   * calls deleteNewEnergyAsset API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteNewEnergyAsset(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteNewEnergyAsset', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewAssetInfo()
   * calls updateNewAssetInfo API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewAssetInfo(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewAssetInfo', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewUserList()
   * calls getNewUserList API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewUserList(): Observable<ApiResponseType<UserDetail[]>> {
    return this.http.post<ApiResponseType<UserDetail[]>>(
      this.endPoint + '/settings/getNewUserList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetNewSiteList()
   * calls getNewSiteList API of backend
   * @returns {Observable} observable of response of API
   */
  funGetNewSiteList(): Observable<ApiResponseType<SiteDetail[]>> {
    return this.http.post<ApiResponseType<SiteDetail[]>>(
      this.endPoint + '/settings/getNewSiteList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateNewPassword()
   * calls updateNewPassword API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateNewPassword(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateNewPassword', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateUserStatus()
   * calls updateUserStatus API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateUserStatus(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateUserStatus', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateSiteUserStatus()
   * calls updateSiteUserStatus API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateSiteUserStatus(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateSiteUserStatus', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateSiteStatus()
   * calls updateSiteStatus API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateSiteStatus(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateSiteStatus', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funUpdateEnergyAssetStatus()
   * calls updateEnergyAssetStatus API of backend
   * @returns {Observable} observable of response of API
   */
  funUpdateEnergyAssetStatus(data: any): Observable<ApiResponseType<ApiUpdatedResponse>> {
    return this.http.post<ApiResponseType<ApiUpdatedResponse>>(
      this.endPoint + '/settings/updateEnergyAssetStatus', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAllAlerts()
   * calls getAllAlerts API of backend
   * @returns {Observable} observable of response of API
   */
  funGetAllAlerts(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getAllAlerts', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAlertDetail()
   * calls getAlertDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funGetAlertDetail(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getAlertDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funSaveAlertDetail()
   * calls saveAlertDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funSaveAlertDetail(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/saveAlertDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funSaveAlertStatusDetail()
   * calls saveAlertStatusDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funSaveAlertStatusDetail(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/saveAlertStatusDetail', data)
      .pipe(map(this.parseResponse));
  }

    /**
   * @function funDeleteAlertDetail()
   * calls deleteAlertDetail API of backend
   * @returns {Observable} observable of response of API
   */
  funDeleteAlertDetail(data: any): Observable<ApiResponseType<ApiDeleteResponse>> {
    return this.http.post<ApiResponseType<ApiDeleteResponse>>(
      this.endPoint + '/settings/deleteAlertDetail', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetResyncDevice()
   * calls getResyncDevice API of backend
   * @returns {Observable} observable of response of API
   */
  funGetResyncDevice(siteId): Observable<ApiResponseType<string[]>> {
    let data = { site_id: siteId };
    return this.http.post<ApiResponseType<string[]>>(
      this.endPoint + '/settings/getResyncDevice', data)
      .pipe(map(this.parseResponse));
  }


  /**
   * @function funGetProtocolList()
   * calls getProtocolList API of backend
   * @param {undefined}
   * @returns {Observable} observable of response of API
   */
  funGetProtocolList(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getProtocolList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetInterfaceList()
   * calls getInterfaceList API of backend
   * @param {undefined}
   * @returns {Observable} observable of response of API
   */
  funGetInterfaceList(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getInterfaceList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAssetTypeList()
   * calls getAssetTypeList API of backend
   * @param {undefined}
   * @returns {Observable} observable of response of API
   */
  funGetAssetTypeList(): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getAssetTypeList', {})
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetLastAssetTypeRecord()
   * calls getLastAssetTypeRecord API of backend
   * @param {undefined}
   * @returns {Observable} observable of response of API
   */
  funGetLastAssetTypeRecord(data): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getLastAssetTypeRecord', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funConfirmPassword()
   * calls confirmPassword API of backend
   * @param {string} username
   * @param {string} password
   * @returns {Observable} observable of response of API
   */
  funConfirmPassword(username: string, password: string): Observable<ApiResponseType<any>> {
    let data = { username: username, password: password };
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/confirmPassword', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetAccessRight()
   * this function gets Energy Asset Details
   * @param {object} data params
   * @returns {Observable} observable of response of API
   */
  funGetAccessRight(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/getAccessRights', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funRemoveAccessRight()
   * this function gets Energy Asset Details
   * @param {object} data params
   * @returns {Observable} observable of response of API
   */
  funRemoveAccessRight(data: any): Observable<ApiResponseType<any>> {
    return this.http.post<ApiResponseType<any>>(
      this.endPoint + '/settings/removeAccessRights', data)
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGetSiteImage()
   * this function gets Site Image List
   * @param {object} data params
   * @returns {Observable} observable of response of API
   */
  funGetSiteImage(data: any): Observable<ApiResponseType<string[]>> {
    return this.http.post<ApiResponseType<string[]>>(
      this.endPoint + '/settings/getSiteImage', data)
      .pipe(map(this.parseResponse));
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// Resync APIs /////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  /**
   * @function funGetResyncToken()
   * this is used to get token for resync APIs
   * @param username 
   * @param password 
   */
  funGetResyncToken(username: string, password: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/authenticate/', { headers: header })
      .pipe(map(this.parseResponse));
  }

  /**
   * @function funGenerateCustomizedReport()
   * calls custom report API
   * @param {object} data params
   * @returns {Observable} observable of response of API
   */
  funGenerateCustomizedReport(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + param, { headers: header });
  }

  /**
   * @function funGetHeatChartData()
   * this function get data for heat chart
   * @returns {Observable} observable of response of API
   */
  funGetHeatChartData(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/mppt_heatmap_data/' + param, { headers: header });
  }

  /**
   * @function funGetSolarOverviewData()
   * this function get data for solar overview
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetSolarOverviewData(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/monthly_table_info/' + param, { headers: header });
  }

  /**
   * @function funGetDGOverviewData()
   * this function get data for dg overview
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetDGOverviewData(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/dg_monthly_table_info/' + param, { headers: header });
  }

  /**
   * @function funGetPerformanceRatio()
   * calls performance ratio API
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetPerformanceRatio(param: string): Observable<any> {
    return this.http.get(this.resyncAPIEndPoint + '/pr_ratio/' + param);
  }

  /**
   * @function funGetFuelSaved()
   * calls performance ratio API
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetFuelSaved(param: string): Observable<any> {
    return this.http.get(this.resyncAPIEndPoint + '/fuel_saved/' + param);
  }

  /**
   * @function funGetSolarOverviewData()
   * this function gets data for solar overview
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetMonthlyReportGen(url: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    // return this.http.get(url, { headers: header, responseType: 'blob' });
    return this.http.get(url, { headers: header });
  }

  /**
   * @function funGetAvailableSiteReport()
   * this function gets available site report
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetAvailableSiteReport(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/available_site_report/' + param, { headers: header });
  }

  /**
   * @function funGetAvailableAggregatedReport()
   * this function gets available aggregated report
   * @param {string} param param
   * @returns {Observable} observable of response of API
   */
  funGetAvailableAggregatedReport(param: string, token: string, api_key: string): Observable<any> {

    let header = new HttpHeaders({
      'X-Session-Token': token,
      'X-User-APIKey': api_key
    });

    return this.http.get(this.resyncAPIEndPoint + '/available_aggregated_report/' + param, { headers: header });
  }

  funPostError() {
    const param = { error: "Test Error"};
    return this.http.post("https://resyncdev.com/api/settings/logErrors", param);
  }
}
