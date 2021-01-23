import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlarmStatusComponent } from './components/alarm-status/alarm-status.component';
import { CsvSelectionForLandingComponent } from './components/csv-selection-for-landing/csv-selection-for-landing.component';
import { SubSink } from 'subsink';
import {
  DISABLED, WORKING, DEAD, loadAssetId,
  consumptionList, pageNameMapping,
  demoUserBlurElements, landingPageSkipAssetList,
  monthListForPortfolio
} from 'src/app/common/variable';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LandingService } from './landing.service';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription, Subject } from 'rxjs';
import { SiteInfo } from 'src/app/types/common.type';
// import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { MessageService } from 'src/app/services/message.service';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from 'src/app/services/logging.service';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('singleSelected') private singleSelected: MatSelect;
  allSelected: boolean = true;
  pageName = 'siteLandingPage';

  locations = [];
  lat: number;
  lng: number;

  map;
  zoom = 3;
  setZoomBound = false;
  fitBound = false;
  styles = [
    {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }]
    }
  ];

  // barChart: Chart;
  // donutChart: Chart;

  where_performance: string[];

  maxStartDate: Date;
  minEndDate: Date;
  maxEndDate: Date;

  user_id: number;
  username: string;
  customer_name: string;
  site_url: string;
  site_img: string;
  location: string;
  country: string;
  description: string;
  contact_info: string;

  barChartSelection = 'month';
  donutChartSelection = 'month';

  gaUserPrefix: string;
  user_type: UserType;

  showDetails = false;

  startDate: Date;
  endDate: Date;

  // timeZone: string;

  sitesList = [];
  sList = [];

  gridValue = {};

  assetCapacity = {};
  displayAssetCapacity = [];

  portfolioSubscription: Subscription;
  gridSubscription: Subscription;

  siteList: SiteInfo[] = [];
  // mapPortfolioData = [];

  portfolioTableData = [];

  alarmBtnTooltip = {};

  // green - Online
  // red - Alarm
  // gray - Inactive
  visibleSiteList: Array<boolean> = [];
  selectedSiteList = {};

  portfolioBtn = 'today';

  conUnitLabel = 'kWh';
  genUnitLabel = 'kWh';

  portfolioSortIndex = '';
  isPortfolioAscOrder = true;

  selectAllAssets: boolean;
  selectAllSites: boolean;
  assetList = [];
  assetListPortfolio = [];
  selectedAssetList = {};

  portfolioCheckbox = {};

  noOfSites: number;
  totalSolarGen: string;
  totalSolarGenUnit: string;
  totalConsumption: string;
  totalConsumptionUnit: string;
  co2Savings: string;
  co2SavingsUnit: string;

  generationColSpan = 1;

  // selectedSite;

  // from variable.ts
  DEAD = DEAD;
  // NOTWORKING = NOTWORKING;
  DISABLED = DISABLED;
  WORKING = WORKING;

  countryList = [];

  monthList: any[] = [];
  portfolioSelectedMonth: number;

  showCustomerProfile = true;
  showPortfolioTable = true;

  timeout;

  subSink: SubSink;

  barChartData = new Subject();
  donutChartData = new Subject();

  showLoadingSpinner = true;

  demoUserAccessControl = {};
  blurElementNm = demoUserBlurElements[this.pageName];
  selectedSitesShow: any = [];

  displayedColumns: string[] =
  ['alarm', 'siteName', 'city', 'pr', 'specific_yield', 'solar_gen', 'dg_gen', 'grid_export', 'grid_import',
  'battery_gen', 'load_consum', 'solar_capacity', 'dg_capacity', 'battery_capacity'];

  portFolioDetail: PortFolioTableType[] = [];

  portFolioDataSource: MatTableDataSource<PortFolioTableType> = new MatTableDataSource(this.portFolioDetail);

  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
    private cookie: CookieService,
    private router: Router,
    // private loader: Ng4LoadingSpinnerService,
    private dialog: MatDialog,
    // private msg: MessageService,
    private landingService: LandingService,
    private globalService: GlobalService,
    // private googleAnalyticsService: GoogleAnalyticsService,
    private msg: MessageService,
    private logger: NGXLogger,
  ) {
    this.user_type = (<UserType>'user');

    // get user access for demo user
    globalService.funDemoUserAccessControl(this.user_type, this.pageName)
      .then(accessInfo => this.demoUserAccessControl = accessInfo);
    // console.log(this.demoUserAccessControl);
    // http.funGetDemoUserAccessInfo({ page_name: this.pageName }).subscribe(console.log);
  }

  ngOnInit() {
    this.subSink = new SubSink();
    // this.msg.enableSelectSite(1);
    // this.loader.show();

    // refresh after 5 min
    this.timeout = setTimeout(() => this.ngOnInit(), (1000 * 60 * 5));

    this.selectAllAssets = true;
    this.selectAllSites = true;

    this.user_id = parseInt('11');

    // v-flow user
    if (this.user_id == 108) {
      this.where_performance = ['DC-Power-BMS1'];
    } else {
      this.where_performance = ['AC-Power', 'ac-power'];
    }

    // create prefix for google analytics from user type
    if (this.user_type == UserType.admin) {
      this.gaUserPrefix = 'AU';
    } else if (this.user_type == UserType.user) {
      this.gaUserPrefix = 'CU';
    } else if (this.user_type == UserType.site) {
      this.gaUserPrefix = 'SU';
    }

    this.minEndDate = new Date();
    this.maxStartDate = new Date();
    this.maxEndDate = new Date();

    this.startDate = new Date();
    this.endDate = new Date();

    this.funGetLandingPageData();

    // center of map
    this.lat = 34.741612;
    this.lng = -16.78711;

    this.monthList = [];

    let today = moment();
    today = today.subtract(5, 'month');

    for (let i = 0; i < 6; i++) {
      this.monthList.push({
        month_no: today.format('M'),
        month_str: today.format('MMMM'),
        year: today.format('YYYY')
      });

      today = today.add(1, 'month');
    }

    this.alarmBtnTooltip[WORKING] = 'Online';
    this.alarmBtnTooltip[DEAD] = 'Alarm';
    this.alarmBtnTooltip[DISABLED] = 'Inactive';

    this.subSink.sink = this.msg.isSidebarWidthChanged$.subscribe(() => {
      this.donutChartData.next('resize-chart');
      this.barChartData.next('resize-chart');
    });

    this.showLoadingSpinner = true;

    // delete from alert_configuration where user_id='11' and site_id='13'and alert_type='exp_energy_alert' and alert_category='pre-set-solar'

    // this.http.funGetAllAlerts({}).subscribe(console.log);
    // const param = {
    //   user_id: '11',
    //   site_id: '13',
    //   alert_category: 'pre-set-solar',
    //   alert_type: 'exp_energy_alert'
    // };
    // this.http.funDeleteAlertDetail(param).subscribe(console.log);
  }

  /**
   * @function funCollapseCustomerProfile()
   * collapse / expand customer profile
   */
  funCollapseCustomerProfile() {
    this.showCustomerProfile = !this.showCustomerProfile;
  }

  /**
   * @function funCollapsePortfolioTable()
   * collapse / expand customer profile
   */
  funCollapsePortfolioTable() {
    this.showPortfolioTable = !this.showPortfolioTable;
  }

  // initialize all http queries
  funGetLandingPageData() {

    this.funGetCustomerDetail();
    this.funGetSiteList();
    this.funGetAssetNameList();
    this.funGetTilesData();
    // this.funGetChartData();

    // this.funGetEnergyBreakdownData();
    // this.funGetPortfolioData();
  }

  funGetCustomerDetail() {
    const params = {
      user_id: this.user_id
    };

    this.subSink.sink = this.http.funGetCustomerDetail(params)
      .subscribe(res => {
        const customerInfo = res.data;

        if (res.success) {
          this.customer_name = customerInfo.customer_name;
          this.username = customerInfo.username;
          this.location = customerInfo.location;
          this.country = customerInfo.country;
          this.description = customerInfo.description;
          this.site_img = 'https://resyncdev.com/api/images/' + customerInfo.site_image;
        }
      });
  }

  funGetSiteList() {

    const params = {
      user_id: this.user_id
    };

    this.subSink.sink = this.http.funGetSiteListLanding(params)
      .subscribe(res => {
        this.sitesList = res.data;

        this.noOfSites = this.sitesList.length;

        for (const site of this.sitesList) {

          // map location list
          this.locations.push({
            site_id: site['site_id'],
            lat: parseFloat(site['lat']),
            lng: parseFloat(site['long']),
            site_info: '<strong>site name:</strong> ' + site['sitename'] + '<br />' +
              '<strong>project_info:</strong> ' + site['project_info'] + '<br />' +
              '<strong>commissioned_date:</strong> ' + site['commissioned_date']
          });

          // check all site check boxes
          this.selectedSitesShow.push(site.site_id);
          this.selectedSiteList[site.site_id] = true;
        }

        this.setZoomBound = true;
        this.fitBound = true;

        if (this.assetList.length > 0) {
          this.funGetPortfolioData();
          this.funGetEnergyBreakdownData();
          // this.funGetChartData();
        }

      });
  }

  funGetAssetNameList() {
    const params = {
      user_id: this.user_id
    };

    this.subSink.sink = this.http.funGetAssetNameList(params)
      .subscribe(res => {
        if (res.success) {
          // this.assetList = res.data;

          this.assetList = [];
          this.assetListPortfolio = [];

          for (const assetName of res.data) {

            if (landingPageSkipAssetList.includes(assetName)) continue;

            this.assetList.push(assetName);

            // for portfolio table asset checkbox list
            if (assetName == 'Grid') {
              this.portfolioCheckbox['Grid Import'] = false;
              this.portfolioCheckbox['Grid Export'] = false;

              this.assetListPortfolio.push('Grid Import');
              this.assetListPortfolio.push('Grid Export');
            } else {
              this.assetListPortfolio.push(assetName);
            }

            // check solar checkbox on load
            if (assetName == 'Solar') {
              this.portfolioCheckbox[assetName] = true;
            } else if (assetName != 'Grid') {
              this.portfolioCheckbox[assetName] = false;
            }

            this.selectedAssetList[assetName] = true;
          }

          if (this.sitesList.length > 0) {
            this.funGetPortfolioData();
            this.funGetEnergyBreakdownData();
            // this.funGetChartData();
          }
        }
      });
  }

  funGetTilesData() {
    const params = {
      user_id: this.user_id
    };

    this.subSink.sink = this.http.funGetTilesData(params)
      .subscribe(res => {
        const tilesData = res.data;

        if (res.success) {

          let totalEnergyGeneration = 0;

          if (tilesData.total_generation > 1000) { // convert to mega watt
            totalEnergyGeneration = parseFloat((tilesData.total_generation / 1000).toFixed(2));
            this.totalSolarGenUnit = ' MWh';
          } else {
            this.totalSolarGen = tilesData.total_generation.toFixed(0);
            this.totalSolarGenUnit = ' kWh';
          }

          this.totalSolarGen = Math.round(totalEnergyGeneration) + '';

          let emission = '';

          let co2emission = tilesData.co2_saved;

          if (tilesData.total_generation > 1000) { // convert to kilo gram
            emission = ((tilesData.total_generation * co2emission) / 1000).toFixed(2);
            emission = Math.round(parseFloat(emission)) + '';
            this.co2SavingsUnit = ' Mg';
          } else {
            emission = (tilesData.total_generation * co2emission).toFixed(0);
            emission = Math.round(parseFloat(emission)) + '';
            this.co2SavingsUnit = ' kg';
          }

          // set co2 savings
          this.co2Savings = emission;

          let totalConsumption = parseFloat(tilesData['total_consumption']);

          if (totalConsumption > 1000) { // convert to mega watt
            this.totalConsumption = (totalConsumption / 1000).toFixed(0);
            this.totalConsumption = Math.round(parseFloat(this.totalConsumption)) + '';
            this.totalConsumptionUnit = ' MWh';
          } else {
            this.totalConsumption = totalConsumption.toFixed(0);
            this.totalConsumption = Math.round(parseFloat(this.totalConsumption)) + '';
            this.totalConsumptionUnit = ' kWh';
          }

        }
      });
  }

  funGetEnergyBreakdownData(chartType = -1) {

    // this.funGetChartData();

    // performance for resolution tables
    let chart_date_selection;

    if (chartType == 1) {
      chart_date_selection = this.donutChartSelection;
    } else {
      chart_date_selection = this.barChartSelection;
    }

    let siteList = [];
    for (const site_id in this.selectedSiteList) {
      if (this.selectedSiteList[site_id]) {
        siteList.push(site_id);
      }
    }

    const params = {
      user_id: this.user_id,
      site_id_list: siteList.join(','),
      chart_date_selection
    };

    this.subSink.sink = this.http.funGetEnergyBreakdownData(params)
      .subscribe(res => {
        if (res.success) {

          // res.data['13']['Lift'] = [];
          // res.data['13']['Light'] = [];
          // res.data['13']['Plug'] = [];

          // console.log(res.data['13']);

          const breakDownData = res.data;
          const today = moment();

          // console.log({ breakDownData });

          let dateArray: string[] = [];
          let selectionValue = this.barChartSelection;

          // if (chartType == 1) {
          //   selectionValue = this.donutChartSelection;
          // } else {
          //   selectionValue = this.barChartSelection;
          // }

          // create date list
          if (selectionValue == 'week') {
            // this.barChart.tickFormat = '%d %a';
            dateArray = this.landingService.fun1WeekDateRange(today);
          }
          else if (selectionValue == 'month') {
            // this.barChart.tickFormat = '%d';
            dateArray = this.landingService.fun1MonthDateRange(today);
          }
          else if (selectionValue == '6_month') {
            // this.barChart.tickFormat = '%b-%y';
            dateArray = this.landingService.fun6MonthDateRange(today);
          }
          else if (selectionValue == 'year') {
            // this.barChart.tickFormat = '%b';
            dateArray = this.landingService.fun1YearDateRange(today);
          } else {
            // this.barChart.tickFormat = '%d';
            dateArray = this.landingService.fun1MonthDateRange(today);
          }

          /*
          [
            { "time": "2020-05-01T00:00:00.000Z", "asset_name": "Solar", "energy": 8621.439999999999 },
            { "time": "2020-05-01T00:00:00.000Z", "asset_name": "Grid", "energy": 13722.379999999997 },
            { "time": "2020-05-02T00:00:00.000Z", "asset_name": "Solar", "energy": 10655.940000000002 },
            { "time": "2020-05-02T00:00:00.000Z", "asset_name": "Grid", "energy": 14094.02 },
          ]
          */

          const chartData = this.landingService.formatBreakDownDataForChart(breakDownData);

          // console.log('chartData');
          // console.log(chartData);

          // this.funCreateBarChart(chartData, dateArray);
          if (chartType == 0) {

            this.funCreateBarChart(chartData, dateArray);
          } else if (chartType == 1) {

            this.funCreateDonutChart(chartData);
          } else {

            this.funCreateBarChart(chartData, dateArray);
            this.funCreateDonutChart(chartData);
          }

          this.showLoadingSpinner = false;
        }
      });
  }

  funGetPortfolioData(month = -1) {

    // update portfolio data
    // this.funGetDataForPortfolio();

    let _date = moment();
    _date.set({ hours: 0, minutes: 0, seconds: 0 });

    // if (month != -1 && this.portfolioBtn == 'month') {
    //   const selectedMonth = this.monthList.find(_month => _month.month_no == month + '');
    //   console.log(selectedMonth);

    //   if (selectedMonth) {
    //     this.portfolioSelectedMonth = selectedMonth.month_no;
    //     _date.set({ months: month - 1, year: selectedMonth.year });
    //   }

    // } else {
    //   this.portfolioSelectedMonth = -1;
    // }

    // update _date object if month is selected
    if (month != -1 && this.portfolioBtn == 'month') {

      const selectedMonth = this.monthList.find(_month => _month.month_no == month + '');

      _date.set({ months: parseInt(selectedMonth.month_no) - 1, year: selectedMonth.year });
      console.log(_date.format());
    }

    this.portfolioSelectedMonth = _date.month();

    // get month str
    // const selectedMonth =  this.monthList.find(_month => _month.month_no == this.portfolioSelectedMonth + '');

    const selectedMonth = monthListForPortfolio[this.portfolioSelectedMonth];

    const params = {
      user_id: this.user_id,
      date_month: selectedMonth,
      // date_year: '2020',
      date_year: _date.year(),
      // date_selection: 'month',
      date_selection: this.portfolioBtn,
      asset_type_list: this.assetList.toString()
    };

    this.subSink.sink = this.http.funGetPortfolioData(params)
      .subscribe(res => {

        this.portfolioTableData = [];
        this.visibleSiteList = [];

        if (res.success) {

          // set table data
          for (const tableData of res.data.tableData) {
            let tableObj: any = {};

            const site = this.sitesList.find(site => site.site_id == tableData.site_id);

            if (site) {
              tableObj = { ...tableData };
              tableObj.sitename = site.sitename;
              tableObj.site_location = site.site_location;
              tableObj.commissioned_date = site.commissioned_date;

              this.portfolioTableData.push(tableObj);
              this.visibleSiteList.push(true);

              // create capacity object
              this.displayAssetCapacity = [];

              // asset capacity
              for (const key in this.portfolioCheckbox) {
                // skip grid for capacity
                if (key.includes('Grid')) continue;
                const element = this.portfolioCheckbox[key];
                if (element) {
                  this.displayAssetCapacity.push(key);
                }
              }

            }
          }

          // create capacity object
          this.assetCapacity = res.data.capacity;

          // set capacity data
          // for (const tableData of res.data.capacity) {
          // }

          // sort portfolio table based on sitename
          this.portfolioTableData.sort(
            (a, b) => this.globalService.funSortStringObjectArray(a, b, 'sitename'));
        }

        // call gridImportExport API
        this.funCreateGridAPIParams(_date);

      });

  }

  funCreateGridAPIParams(_date: moment.Moment) {

    let incrementBy = '';

    switch (this.portfolioBtn) {
      case 'today':
      case 'yesterday':
        incrementBy = 'hours';
        break;

      case 'week':
      case 'month':
        incrementBy = 'days';
        break;
    }

    let assetList = [];
    for (const key in this.portfolioCheckbox) {
      if (this.portfolioCheckbox[key]) {
        assetList.push(key);
      }
    }

    // add consumption asset if grid is selected
    if (assetList.includes('Grid')) {
      assetList = [...consumptionList, ...assetList];
    }

    // generate date range
    let dateRange = this.landingService.funGetPortfolioDateRange(_date, this.portfolioBtn);

    let param = {
      user_id: this.user_id,
      date_range: dateRange.toString(),
      asset_list: assetList.toString(),
      asset_id_list: loadAssetId.totalLoad.toString(),
      incrementBy
    };

    this.funGetGridImportExport(param);

  }

  /**
 * @function funPortfolioCheckboxEvent()
 * portfolio checkbox checked
 */
  funPortfolioCheckboxEvent(assetName: string) {

    const isSelected = this.portfolioCheckbox[assetName] ? ' selected' : ' deselected';
    // this.googleAnalyticsService.eventEmitter(
    //   this.gaUserPrefix + '-PORTFOLIO-SITES',
    //   pageNameMapping[this.pageName],
    //   'Energy-Asset-Check-box-' + (assetName + isSelected)
    // );

    this.displayAssetCapacity = [];

    // asset capacity
    for (const key in this.portfolioCheckbox) {
      // skip grid for capacity
      if (key.includes('Grid')) continue;
      const element = this.portfolioCheckbox[key];
      if (element) {
        this.displayAssetCapacity.push(key);
      }
    }

    if (assetName.includes('Grid')) {

      this.generationColSpan = 1;

      if (this.portfolioCheckbox['Grid Import']) {
        this.generationColSpan++;
      }

      if (this.portfolioCheckbox['Grid Export']) {
        this.generationColSpan++;
      }

      // } else {
      //   this.funGetDataForPortfolio(this.portfolioSelectedMonth);
    }
  }

  /**
   * hide portfolio table row
   */
  funHideSiteRow() {

    let siteList = [];
    for (const key in this.selectedSiteList) {
      if (this.selectedSiteList[key]) {
        siteList.push(key);
      }
    }

    // get count of all sites
    let originalSitesCount = Object.keys(this.selectedSiteList);

    // if site is removed from selection
    if (originalSitesCount.length > siteList.length) {

      originalSitesCount.forEach(site => {

        // hide removed sites
        if (!siteList.includes(site)) {

          let index = this.portfolioTableData.findIndex(_site => _site.site_id == site);

          this.visibleSiteList[index] = false;
        }
      });

    } else {

      // this.loader.hide();
      // this.showLoadingSpinner = false;

      for (var i = 0; i < this.visibleSiteList.length; i++) {
        this.visibleSiteList[i] = true;
      }

    }
  }

  /**
   * get landing page data
   */
  // async funGetLandingPageData() {

  //   try {

  //     let param = {
  //       user_id: this.user_id,
  //       performance_type: this.where_performance.toString(),
  //       date: moment().format('YYYY-MM-DD HH:mm:ss')
  //     };

  //     let res = await this.http.funGetLandingPageData(param).toPromise();

  //     if (res.success) {

  //       const landingPageData = res.data;

  //       let user_detail: UserDetail[] = landingPageData['user_detail'];

  //       // user detail
  //       if (user_detail && user_detail.length > 0) {

  //         this.showDetails = true;

  //         // // replace resync image with sembcorp image
  //         // if (user_detail[0].site_image.includes('resynctech_1548490429401.png')) {
  //         //   this.site_img = env.endPoint + '/api/images/sembcorp_1556609889750.png';
  //         //   this.site_url = 'http://www.sembcorppower.com/';
  //         // } else {
  //         this.site_img = env.endPoint + '/api/images/' + user_detail[0].site_image;
  //         this.site_url = 'http://' + user_detail[0].site_url;
  //         // }

  //         this.location = user_detail[0].location;
  //         this.country = user_detail[0].country;
  //         this.description = user_detail[0].description;
  //         this.contact_info = user_detail[0].contact_info;

  //         this.username = user_detail[0]['username'];
  //         this.customer_name = user_detail[0]['customer_name'];
  //       }

  //       let asset_list = landingPageData['asset_list'];

  //       // asset list
  //       if (asset_list.length > 0) {

  //         this.assetList = [];
  //         this.assetListPortfolio = [];

  //         for (const asset of asset_list) {

  //           // remove consumption assets
  //           if (!consumptionList.includes(asset.asset_type)) {

  //             // remove Irradiance and Plant
  //             if (!(asset.asset_type == 'Irradiance' || asset.asset_type == 'Plant')) {

  //               this.assetList.push(asset.asset_type);

  //               // for portfolio table
  //               if (asset.asset_type == 'Grid') {
  //                 this.portfolioCheckbox['Grid Import'] = false;
  //                 this.portfolioCheckbox['Grid Export'] = false;

  //                 this.assetListPortfolio.push('Grid Import');
  //                 this.assetListPortfolio.push('Grid Export');
  //               } else {
  //                 this.assetListPortfolio.push(asset.asset_type);
  //               }

  //               if (asset.asset_type == 'Solar') {
  //                 this.portfolioCheckbox[asset.asset_type] = true;
  //               } else if (asset.asset_type != 'Grid') {
  //                 this.portfolioCheckbox[asset.asset_type] = false;
  //               }
  //               this.selectedAssetList[asset.asset_type] = true;
  //             }
  //           }
  //         }
  //       }

  //       this.sitesList = landingPageData['site_list'];
  //       this.sList = landingPageData['site_list'];

  //       // sort array alphabetically
  //       this.sitesList.sort((site1, site2) => {
  //         if (site1.sitename < site2.sitename) { return -1; }
  //         if (site1.sitename > site2.sitename) { return 1; }
  //         return 0;
  //       });

  //       for (const site of this.sitesList) {
  //         // check all site check boxes
  //         this.selectedSiteList[site.site_id] = true;
  //       }

  //       // create chart
  //       this.funGetChartData();

  //       // calculate overview data
  //       const overviewData = this.landingService.funGetOverviewData(landingPageData);

  //       this.noOfSites = this.sitesList.length;
  //       this.totalSolarGenUnit = overviewData.totalSolarGenUnit;
  //       this.totalSolarGen = overviewData.totalSolarGen;
  //       this.co2SavingsUnit = overviewData.co2SavingsUnit;
  //       this.co2Savings = overviewData.co2Savings;
  //       this.totalConsumptionUnit = overviewData.totalConsumptionUnit;
  //       this.totalConsumption = overviewData.totalConsumption;
  //     }

  //     // get portfolio data
  //     this.funGetDataForPortfolio();

  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // /**
  //  * @function funGetDataForPortfolio()
  //  * get portfolio table data
  //  */
  // funGetDataForPortfolio(month = -1) {

  //   let _date = moment();
  //   _date.set({ hours: 0, minutes: 0, seconds: 0 });

  //   if (month != -1 && this.portfolioBtn == 'month') {
  //     const selectedMonth = this.monthList.find(_month => _month.month_no == month + '');

  //     if (selectedMonth) {
  //       this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-PORTFOLIO-SITES', pageNameMapping[this.pageName], 'Date-Button-' + selectedMonth.month_str);

  //       this.portfolioSelectedMonth = selectedMonth.month_no;
  //       _date.set({ months: month - 1, year: selectedMonth.year });
  //     }
  //   } else {
  //     this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-PORTFOLIO-SITES', pageNameMapping[this.pageName], 'Date-Button-' + this.portfolioBtn);

  //     this.portfolioSelectedMonth = -1;
  //   }

  //   // skip if check box was unchecked
  //   // if (!isChecked) return;

  //   // if (month != -1) {
  //   //   this.portfolioSelectedMonth = month;
  //   //   _date.set({ months: month - 1 });
  //   // } else {
  //   //   this.portfolioSelectedMonth = -1;
  //   // }

  //   // generate date range
  //   let dateRange = this.landingService.funGetPortfolioDateRange(_date, this.portfolioBtn);

  //   let assetList = [];
  //   for (const key in this.portfolioCheckbox) {
  //     if (this.portfolioCheckbox[key]) {
  //       assetList.push(key);
  //     }
  //   }

  //   // add consumption asset if grid is selected
  //   if (assetList.includes('Grid')) {
  //     assetList = [...consumptionList, ...assetList];
  //   }

  //   let incrementBy;
  //   switch (this.portfolioBtn) {
  //     case 'today':
  //     case 'yesterday':
  //       incrementBy = 'hours';
  //       break;

  //     case 'week':
  //     case 'month':
  //       incrementBy = 'days';
  //       break;
  //   }

  //   let param = {
  //     user_id: this.user_id,
  //     date_range: dateRange.toString(),
  //     asset_list: assetList.toString(),
  //     asset_id_list: '',
  //     incrementBy
  //   };

  //   // cancel previous request
  //   if (this.portfolioSubscription) {
  //     this.portfolioSubscription.unsubscribe();
  //   }

  //   // const mapPortfolioData = await this.mapViewService.getPortfolioData(param).toPromise();

  //   // green - Online
  //   // red - Alarm
  //   // gray - Inactive
  //   this.portfolioSubscription = this.landingService.getPortfolioData(param)
  //     .subscribe(mapPortfolioData => {

  //       try {

  //         this.siteList = mapPortfolioData['filteredData'];
  //         this.assetCapacity = mapPortfolioData['assetCapacity'];

  //         param.asset_id_list = loadAssetId.totalLoad.toString();

  //         // get grid data if grid asset is available in site
  //         if (Object.keys(this.portfolioCheckbox).includes('Grid Import')) {
  //           this.funGetGridImportExport(param);
  //         }

  //         if (this.locations.length < 1) this.locations = mapPortfolioData['locations'];

  //         if (this.siteList.length > 0) {

  //           // default site selection
  //           // this.timeZone = this.siteList[0].gmt_offset;

  //           // list for dashboard selection
  //           this.countryList = this.siteList.map(site => site.country)
  //           this.countryList = this.countryList.filter(
  //             (value, index) => this.countryList.indexOf(value) === index
  //           );

  //           this.setZoomBound = true;
  //           this.fitBound = true;

  //         } else {
  //           // for map
  //           this.fitBound = false;
  //         }

  //         this.displayAssetCapacity = [];

  //         // asset capacity
  //         for (const key in this.portfolioCheckbox) {
  //           // skip grid for capacity
  //           if (key.includes('Grid')) continue;
  //           const element = this.portfolioCheckbox[key];
  //           if (element) {
  //             this.displayAssetCapacity.push(key);
  //           }
  //         }

  //         // make all sites visible
  //         for (let i = 0; i < this.siteList.length; i++) {
  //           this.visibleSiteList.push(true);
  //         }

  //       } catch (e) {
  //         console.log(e);
  //       }
  //     });

  //   this.subSink.sink = this.portfolioSubscription;
  // }

  /**
   * get grid import and export
   */
  funGetGridImportExport(param) {

    if (this.gridSubscription) {
      this.gridSubscription.unsubscribe();
    }

    // get grid import and export
    this.gridSubscription = this.http.funGetPortfolioGrid(param)
      .subscribe(res => {

        if (res.success) {

          const gridData = res.data;

          // this.siteList.forEach((site, index) => {
          // for (const site of this.siteList) {

          for (let i = 0; i < this.portfolioTableData.length; i++) {
            const site = this.portfolioTableData[i];

            // && gridData[site.site_id]['consumption'].length > 0
            if (gridData[site.site_id]) {

              let genData = gridData[site.site_id]['generation'];
              let conData = gridData[site.site_id]['consumption'];

              let calculatedGridData = this.globalService.funCalculateGrid(genData, conData);
              let gridImport = 0, gridExport = 0;

              // calculate grid import and export
              for (const grid of calculatedGridData) {
                if (grid.energy >= 0) {
                  gridImport += grid.energy;
                } else {
                  gridExport += grid.energy;
                }
              }

              if (gridImport > 1000 || gridImport == 0) {
                this.portfolioTableData[i]['grid_import'] = (gridImport / 1000).toFixed(2) + ' MWh';
              } else {
                this.portfolioTableData[i]['grid_import'] = gridImport.toFixed(2) + ' kWh';
              }

              if (gridExport > 1000 || gridExport == 0) {
                this.portfolioTableData[i]['grid_export'] = (gridExport / 1000).toFixed(2) + ' MWh';
              } else {
                this.portfolioTableData[i]['grid_export'] = gridExport.toFixed(2) + ' kWh';
              }
            }
            // else {

            //   this.portfolioTableData[index]['grid_import'] = '0 MWh';
            //   this.portfolioTableData[index]['grid_export'] = '0 MWh';
            // }
          }
        }
      });

    this.subSink.sink = this.gridSubscription;
  }

  /**
   * @function funPortfolioCheckboxEvent()
   * portfolio checkbox checked
   */
  // funPortfolioCheckboxEvent(assetName) {

  //   const isSelected = this.portfolioCheckbox[assetName] ? ' selected' : ' deselected';
  //   this.googleAnalyticsService.eventEmitter(
  //     this.gaUserPrefix + '-PORTFOLIO-SITES',
  //     pageNameMapping[this.pageName],
  //     'Energy-Asset-Check-box-' + (assetName + isSelected)
  //   );

  //   this.displayAssetCapacity = [];

  //   // asset capacity
  //   for (const key in this.portfolioCheckbox) {
  //     // skip grid for capacity
  //     if (key.includes('Grid')) continue;
  //     const element = this.portfolioCheckbox[key];
  //     if (element) {
  //       this.displayAssetCapacity.push(key);
  //     }
  //   }

  //   if (assetName.includes('Grid')) {

  //     this.generationColSpan = 1;

  //     if (this.portfolioCheckbox['Grid Import']) {
  //       this.generationColSpan++;
  //     }

  //     if (this.portfolioCheckbox['Grid Export']) {
  //       this.generationColSpan++;
  //     }

  //   } else {
  //     this.funGetDataForPortfolio(this.portfolioSelectedMonth);
  //   }
  // }

  /**
   * hides unselected sites from portfolio table
   */
  // funHideSiteRow() {

  //   let siteList = [];
  //   for (const key in this.selectedSiteList) {
  //     if (this.selectedSiteList[key]) {
  //       siteList.push(key);
  //     }
  //   }

  //   // get count of all sites
  //   let originalSitesCount = Object.keys(this.selectedSiteList);

  //   // if site is removed from selection
  //   if (originalSitesCount.length > siteList.length) {

  //     originalSitesCount.forEach(site => {

  //       // hide removed sites
  //       if (!siteList.includes(site)) {

  //         let index = this.siteList.findIndex(_site => _site.site_id == site);

  //         this.visibleSiteList[index] = false;
  //       }
  //     });

  //   } else {

  //     // this.loader.hide();
  //     this.showLoadingSpinner = false;

  //     for (var i = 0; i < this.visibleSiteList.length; i++) {
  //       this.visibleSiteList[i] = true;
  //     }

  //   }
  // }

  /**
   * sort portfolio table
   */
  funSortPortfolioTable(columnName) {

    // update asc order
    if (this.portfolioSortIndex == columnName) {
      this.isPortfolioAscOrder = !this.isPortfolioAscOrder;
    } else {
      this.isPortfolioAscOrder = true;
    }

    this.siteList.sort((site1, site2) => {
      if (this.isPortfolioAscOrder) { // asc
        if (site1[columnName] < site2[columnName]) return -1;
        if (site1[columnName] > site2[columnName]) return 1;
      } else { // desc
        if (site1[columnName] < site2[columnName]) return 1;
        if (site1[columnName] > site2[columnName]) return -1;
      }
      return 0;
    });

    this.portfolioSortIndex = columnName;
  }

  /**
   * @function funMarkerClicked()
   * this function navigates to dashboard of clicked site
   * @param {number} site_id selected site id
   */
  funMarkerClicked(site_id) {

    let navigationPath = this.user_type;

    // if userType is demo user then redirect to user
    if (this.user_type == UserType.demo_user) {
      navigationPath = UserType.user;
    }

    // if userType is demo site then redirect to site
    if (this.user_type == UserType.demo_site) {
      navigationPath = UserType.site;
    }

    this.cookie.set(CookieKeys.site_id, site_id + '');
    // store site.id in local storage
    this.localStorage.setItem(CookieKeys.site_id, site_id);

    // this.msg.enableSelectSite(0);
    this.router.navigate(['/dashboard/' + navigationPath]);
  }

  /**
   * @function funMarkerHover()
   * this function shows site info on hover event
   * @param {object} map map object
   * @param {object} infoWindow info window object
   */
  funMarkerHover(map, infoWindow) {
    if (map.lastOpen != null) {
      map.lastOpen.close();
    }

    map.lastOpen = infoWindow;
    infoWindow.open();
  }

  /**
   * @function funSiteClicked()
   * this function redirects to user dashboard
   * @param site_id site_id
   */
  funSiteClicked(site_id) {

    let navigationPath = this.user_type;

    // if userType is demo user then redirect to user
    if (this.user_type == UserType.demo_user) {
      navigationPath = UserType.user;
    }

    // if userType is demo site then redirect to site
    if (this.user_type == UserType.demo_site) {
      navigationPath = UserType.site;
    }

    this.cookie.set(CookieKeys.site_id, site_id + '');
    // store site.id in local storage
    this.localStorage.setItem(CookieKeys.site_id, site_id);

    // this.msg.enableSelectSite(0);
    this.router.navigate(['/dashboard/' + navigationPath]);
  }

  /**
   * @function funGetChartData()
   * this function gets chart data
   */
  // funGetChartData(chartType = -1) {

  //   let selectionType = '';

  //   switch (this.barChartSelection) {
  //     case 'week':
  //       selectionType = '1 Week';
  //       break;
  //     case 'month':
  //       selectionType = '1 Month';
  //       break;
  //     case '6_month':
  //       selectionType = '6 Months';
  //       break;
  //     case 'year':
  //       selectionType = '1 Year';
  //       break;
  //   }

  //   if (chartType == 0) {
  //     this.googleAnalyticsService.eventEmitter(
  //       this.gaUserPrefix + '-ENERGY-BREAKDOWN(bar-chart)',
  //       pageNameMapping[this.pageName],
  //       'Chart-Range-Changed ' + selectionType
  //     );
  //   }

  //   if (chartType == 1) {
  //     this.googleAnalyticsService.eventEmitter(
  //       this.gaUserPrefix + '-ENERGY-BREAKDOWN(pie-chart)',
  //       pageNameMapping[this.pageName],
  //       'Chart-Range-Changed ' + selectionType
  //     );
  //   }

  //   let assetList = [];
  //   for (const key in this.selectedAssetList) {
  //     if (this.selectedAssetList[key]) {
  //       assetList.push(key);
  //     }
  //   }

  //   let siteList = [];
  //   for (const key in this.selectedSiteList) {
  //     if (this.selectedSiteList[key]) {
  //       siteList.push(key);
  //     }
  //   }

  //   // performance for resolution tables
  //   let selectionValue;

  //   if (chartType == 1) {
  //     selectionValue = this.donutChartSelection;
  //   } else {
  //     selectionValue = this.barChartSelection;
  //   }

  //   // switch (selectionValue) {

  //   //   case 'week':
  //   //     dateCount = 1;
  //   //     typeOfData = 'week';
  //   //     break;

  //   //   case 'month':
  //   //     dateCount = 4;
  //   //     typeOfData = 'week';
  //   //     break;

  //   //   case '6_month':
  //   //     dateCount = 6;
  //   //     typeOfData = 'month';
  //   //     break;

  //   //   case 'year':
  //   //     dateCount = 12;
  //   //     typeOfData = 'month';
  //   //     break;
  //   // }

  //   let today = moment();

  //   const [start_date, end_date] = this.landingService.funCreateDateRange(
  //     today.format('YYYY-MM-DD HH:mm:ss'), selectionValue);

  //   let increment_by;
  //   let increment_amount;

  //   if (selectionValue == 'month' || selectionValue == 'week') {
  //     increment_by = 'days';
  //     increment_amount = 1;
  //   } else if (selectionValue == '6_month' || selectionValue == 'year') {
  //     increment_by = 'months';
  //     increment_amount = 1;
  //   }

  //   // add consumption asset if grid is selected
  //   if (assetList.includes('Grid')) {
  //     assetList = [...consumptionList, ...assetList];
  //   }

  //   let param = {
  //     user_id: this.user_id,
  //     site_id_list: siteList.toString(),
  //     asset_list: assetList.toString(),
  //     load_asset_id: loadAssetId.load_asset_id.toString(),
  //     performance_type: this.where_performance.toString(),
  //     start_date,
  //     end_date,
  //     increment_by,
  //     increment_amount
  //   };

  //   if (assetList.length > 0) {
  //     this.subSink.sink = this.http.funEnergyBreakDownData(param)
  //       .subscribe(res => {

  //         console.log('old API');
  //         console.log(res)
  //         return;

  //         if (res.success) {

  //           const breakDown = res.data;

  //           // this.loader.hide();
  //           // this.showLoadingSpinner = false;

  //           let chartData = [],
  //             dateArray = [],
  //             generationDataBySite = {},
  //             gridDataBySite = {};

  //           // calculate chart data based on site(s)
  //           for (const site_id in breakDown) {

  //             let generationData = [];
  //             let consumptionData = [];

  //             // loop based on asset
  //             for (const asset in breakDown[site_id]) {
  //               const energyData = breakDown[site_id][asset];

  //               energyData.forEach(element => {
  //                 // add asset name
  //                 element.asset_name = asset;
  //                 // convert time to utc for 6 month
  //                 if (selectionValue == '6_month') {
  //                   let time = moment.utc(element.time);
  //                   time.set({ date: 1 });
  //                   element.time = time.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  //                 }
  //               });

  //               // distinguish generation data and consumption data
  //               if (generationList.includes(asset)) {
  //                 generationData = [...generationData, ...energyData];
  //               }

  //               if (consumptionList.includes(asset)) {
  //                 consumptionData = [...consumptionData, ...energyData];
  //               }
  //             }

  //             generationDataBySite[site_id] = generationData;

  //             // calculate grid data
  //             gridDataBySite[site_id] = this.globalService.funCalculateGrid(generationData, consumptionData);
  //           }

  //           // create date list
  //           if (selectionValue == 'week') {
  //             // this.barChart.tickFormat = '%d %a';
  //             dateArray = this.landingService.fun1WeekDateRange(today);
  //           }
  //           else if (selectionValue == 'month') {
  //             // this.barChart.tickFormat = '%d';
  //             dateArray = this.landingService.fun1MonthDateRange(today);
  //           }
  //           else if (selectionValue == '6_month') {
  //             // this.barChart.tickFormat = '%b-%y';
  //             dateArray = this.landingService.fun6MonthDateRange(today);
  //           }
  //           else if (selectionValue == 'year') {
  //             // this.barChart.tickFormat = '%b';
  //             dateArray = this.landingService.fun1YearDateRange(today);
  //           } else {
  //             // this.barChart.tickFormat = '%d';
  //             dateArray = this.landingService.fun1MonthDateRange(today);
  //           }

  //           // sum data based on sites
  //           chartData = this.landingService.funCreateFormatedDataForChart(
  //             dateArray, generationDataBySite, gridDataBySite);

  //           if (chartType == 0) {

  //             this.funCreateBarChart(chartData, dateArray);
  //           } else if (chartType == 1) {

  //             this.funCreateDonutChart(chartData);
  //           } else {

  //             this.funCreateBarChart(chartData, dateArray);
  //             this.funCreateDonutChart(chartData);
  //           }
  //         }
  //       });

  //   }
  // }

  /**
   * @function funCreateBarChart()
   * this function creates bar chart
   */
  funCreateBarChart(chartData, dateArray) {
    // calculate data for generation bar chart generation
    let bar_data = this.landingService.funBarChartData(chartData, dateArray);
    // console.log('chartData');
    // console.log(JSON.stringify(chartData));

    switch (this.barChartSelection) {
      case 'week':
        bar_data['chartAxisFormat'] = 'DD ddd';
        break;

      case 'month':
        bar_data['chartAxisFormat'] = 'DD';
        break;

      case '6_month':
        bar_data['chartAxisFormat'] = 'MMM-YY';
        break;

      case 'year':
        bar_data['chartAxisFormat'] = 'MMM';
        break;
    }

    // console.log('bar_data');
    // console.log(JSON.stringify(bar_data));
    this.barChartData.next(bar_data);
  }

  /**
   * @function funCreateDonutChart()
   * this function creates donut chart
   */
  funCreateDonutChart(chartData) {

    // calculate data for generation donut chart
    let donut_data = this.landingService.funDonutChartData(chartData);

    let convertToMw = false;

    for (const data of donut_data) {

      if (!convertToMw && data.energy > 10000) {
        convertToMw = true;
      }

      // convert negative value to zero
      if (data.energy < 0) {
        data.energy = 0;
      }
    }

    if (convertToMw) {
      for (const data of donut_data) {
        data.energy = data.energy / 1000;
      }
    }

    this.donutChartData.next({ data: donut_data, convertToMw });
  }

  /**
   * @function funAlarmStatus()
   * this function displays dialog of alarm status
   */
  funAlarmStatus(user_id: string, site_id: string, status: string) {

    if (status == DEAD) {

      let data = {
        user_id: user_id,
        site_id: site_id,
        status: status
      };

      this.dialog.open(AlarmStatusComponent, { width: '900px', data: data });
    }
  }

  funCalcPRBySiteId(dataList, devList) {

    let finalResult = {};

    for (const value of dataList) {
      let device = devList.filter(deviceInfo => deviceInfo.resync_dev_mac_id == value.device_mac);

      if (device.length > 0) {
        if (!finalResult[device[0].site_id]) {
          finalResult[device[0].site_id] = 0;
        }

        finalResult[device[0].site_id] += parseFloat(value['average'] || 0);
      }
    }

    return finalResult;
  }

  /**
   * @function siteSelectAll()
   * this function selects or deselects all energy asset
   */
  siteSelectAll() {
    this.allSelected = !this.allSelected;

    if (this.allSelected) {
      this.singleSelected.options.forEach( (item ) => item.select());
      for (const key in this.selectedSiteList) {
        this.selectedSiteList[key] = this.allSelected;
      }
    } else {
      this.singleSelected.options.forEach( (item ) => item.deselect());
      for (const key in this.selectedSiteList) {
        this.selectedSiteList[key] = this.allSelected;
      }
    }

    // for (const key in this.selectedSiteList) {
    //   this.selectedSiteList[key] = this.selectAllSites;
    // }

    // this.googleAnalyticsService.eventEmitter(
    //   this.gaUserPrefix + '-SITE-NAME',
    //   pageNameMapping[this.pageName],
    //   'All-Sites-' + (this.allSelected ? '1' : '0')
    // );

    // update chart
    // this.funGetChartData();
    this.funGetEnergyBreakdownData();

    this.funHideSiteRow();
  }

  /**
   * @function onSiteSelect()
   * this function selects or deselects all energy asset
   */
  onSiteSelect(siteName: string, isSelected: boolean) {
    
    let falseSite = true;
    for (const key in this.selectedSiteList) {
      if (!this.selectedSiteList[key]) {
        falseSite = false;
      }
    }

    // this.googleAnalyticsService.eventEmitter(
    //   this.gaUserPrefix + '-SITE-NAME',
    //   pageNameMapping[this.pageName],
    //   siteName + '-' + (isSelected ? '1' : '0')
    // );

    this.selectAllSites = falseSite;
    this.allSelected = falseSite;

    // update chart
    // this.funGetChartData();
    this.funGetEnergyBreakdownData();

    this.funHideSiteRow();
  }

  /**
   * @function assetSelectAll()
   * this function selects or deselects all energy asset
   */
  assetSelectAll() {
    for (const key in this.selectedAssetList) {
      // if select all in asset is true then select all asset
      this.selectedAssetList[key] = this.selectAllAssets;
    }

    // this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-ENERGY-ASSET', pageNameMapping[this.pageName], 'All-Energy-Asset-' + (this.selectAllAssets ? '1' : '0'));

    // update chart
    // this.funGetChartData();
    this.funGetEnergyBreakdownData();
  }

  /**
   * @function assetSelected()
   * this function is called when energy asset is when selected
   */
  assetSelected(assetName: string, isSelected: boolean) {

    let falseAsset = true;
    for (const key in this.selectedAssetList) {
      if (!this.selectedAssetList[key]) {
        falseAsset = false;
      }
    }
    this.selectAllAssets = falseAsset;

    // this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-ENERGY-ASSET', pageNameMapping[this.pageName], assetName + '-' + (isSelected ? '1' : '0'));

    // update chart
    // this.funGetChartData();
    this.funGetEnergyBreakdownData();
  }

  /**
   * @function funGetCsvFile()
   * this function opens CSV download dialog
   */
  funGetCsvFile() {

    // this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-ENERGY-BREAKDOWN', pageNameMapping[this.pageName], 'CSV-Download');

    let assetList = [];
    for (const key in this.selectedAssetList) {
      if (this.selectedAssetList[key]) {
        assetList.push(key);
      }
    }

    let siteList = [];
    for (const key in this.selectedSiteList) {
      if (this.selectedSiteList[key]) {
        siteList.push(key);
      }
    }

    let data = {
      user_id: this.user_id,
      siteIdList: siteList.toString(),
      assetList: assetList.toString(),
      performance_type: this.where_performance.toString(),
      // timezone: this.timeZone,
      siteList: JSON.stringify(this.sList),
      customer_name: this.customer_name,
      gaUserPrefix: this.gaUserPrefix,
      userType: this.user_type,
      demoUserAccessControl: this.demoUserAccessControl
    };

    // open dialog for csv download
    this.dialog.open(CsvSelectionForLandingComponent, { width: '800px', data });
  }

  /**
   * @function funMapReady()
   * this function is called when map is ready
   * @param {object} event map
   */
  funMapReady(event) {
    this.map = event;
  }

  /**
   * @function funZoomChanged()
   * this function is called when zoom level is changed on map view
   */
  funZoomChanged() {

    if (this.setZoomBound && this.map.getZoom() > 6) {
      this.setZoomBound = false;
      this.map.setZoom(6);
    }
  }

  funTicketClicked() {
    this.router.navigate(['/dashboard/tickets/']);
  }

  ngOnDestroy() {

    // clear refresh
    clearTimeout(this.timeout);
    this.subSink.unsubscribe();
  }
}


interface PortFolioTableType {
  alarm: string, 
  siteName: string, 
  city: string, 
  pr: string, 
  specific_yield: string, 
  solar_gen: string, 
  dg_gen: string, 
  grid_import: string, 
  grid_export: string,
  battery_gen: string, 
  load_consum: string, 
  solar_capacity: string, 
  dg_capacity: string, 
  battery_capacity: string,
  status?: string,
}