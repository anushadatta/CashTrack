import { Component, OnInit, Inject, Injectable } from '@angular/core';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpService } from 'src/app/services/http.service';
import { NativeDateAdapter, DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import saveAs from 'file-saver';
// import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { StringKeyValuePair, ResyncDeviceDetail } from 'src/app/types/common.type';
import { pageNameMapping, demoUserBlurElements } from 'src/app/common/variable';

// This class is used to change date format of date picker
@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

  format(date: Date, _displayFormat: Object): string {
    return moment(date).format('DD MMM YYYY');
  }
}

@Component({
  selector: 'app-csv-selection-for-landing',
  templateUrl: './csv-selection-for-landing.component.html',
  styleUrls: ['./csv-selection-for-landing.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
  ]
})
export class CsvSelectionForLandingComponent implements OnInit {

  pageName = 'siteLandingPage';
  gaUserPrefix: string;

  endDate: Date;
  startDate: Date;

  minStartDate: Date;
  maxStartDate: Date;
  minEndDate: Date;
  maxEndDate: Date;

  timeZone: string;

  where_performance = ['AC-Power', 'ac-power', 'Irradiance'];
  enableButton = true;

  isResolutionSelected = false;

  siteList: Array<any>;
  user_id;
  siteIdList;
  assetList;
  customer_name;

  resolution;
  resolutionList: StringKeyValuePair[];

  isDataAvailable = true;

  showLoadingSpinner = false

  demoUserAccessControl = {};
  blurElementNm = demoUserBlurElements[this.pageName];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpService,
    private dialogRef: MatDialogRef<CsvSelectionForLandingComponent>,
    // private googleAnalyticsService: GoogleAnalyticsService
  ) {

    this.blurElementNm = demoUserBlurElements[this.pageName];

    this.demoUserAccessControl = this.data.demoUserAccessControl;
  }

  ngOnInit() {
    this.siteList = JSON.parse(this.data['siteList']);
    this.where_performance = this.data['performance_type'].split(',');
    this.user_id = this.data['user_id'];
    this.siteIdList = this.data['siteIdList'].split(',');
    this.assetList = this.data['assetList'].split(',');

    this.gaUserPrefix = this.data.gaUserPrefix;

    // this.where_performance.push('PR');
    this.where_performance.push('Irradiance');

    this.assetList.push('Plant');
    this.assetList.push('Irradiance');

    this.timeZone = this.data['timezone'];
    this.customer_name = this.data['customer_name'];

    this.resolutionList = [
      { key: '1_day', value: '1 Day' },
      { key: '1_month', value: '1 Month' }
    ];

    // set current date for date selection limit
    this.minEndDate = new Date();
    this.maxStartDate = new Date();
    this.maxEndDate = new Date();

    this.endDate = new Date();
    this.startDate = new Date();
  }

  /**
   * returns condition to allow demo user to access certain element
   */
  funAllowElementAccess(elementKey: string, elementType: string): boolean {
    const sectionName = this.blurElementNm[elementKey];

    return this.demoUserAccessControl[sectionName] &&
      this.demoUserAccessControl[sectionName][elementType];
  }

  /**
   * get image name of disabled section for demo user
   */
  funGetBlurImgName(elementKey: string) {
    return this.pageName + '-' + this.blurElementNm[elementKey] + '.png';
  }

  funDateSelected() {
    this.minEndDate = this.startDate;
  }

  /**
   * @function resolutionSelected()
   * this function is called when resolution is selected
   */
  resolutionSelected() {
    this.enableButton = false;
    this.isResolutionSelected = false;
  }

  /**
   * @function funGetCsvFile()
   * this function creates csv file from json data
   */
  funGetCsvFile() {
    // disable event
    if (this.funAllowElementAccess('downloadCsv', 'disable')) return;

    this.isDataAvailable = true;

    if (this.resolution) {

      // this.loader.show();
      this.showLoadingSpinner = true;

      this.startDate.setSeconds(0);
      this.startDate.setMinutes(0);
      this.startDate.setHours(0);
      this.endDate.setSeconds(0);
      this.endDate.setMinutes(0);
      this.endDate.setHours(0);

      let queryStartDate = this.funConvertToUtc(this.startDate);
      let queryEndDate = this.funConvertToUtc(this.endDate);

      // google analysis event
      const dateRange = moment.utc(queryStartDate).format('YYYY-MM-DD') + ' to ' + moment.utc(queryEndDate).format('YYYY-MM-DD');
      const selectedCsvType = this.resolutionList.find(resolution => resolution == this.resolution);

      // if (selectedCsvType) {
      //   this.googleAnalyticsService.eventEmitter(this.gaUserPrefix + '-DOWNLOAD-CSV-FILE',
      //     pageNameMapping[this.pageName], dateRange, selectedCsvType.value);
      // }

      // create temporary variable so endDate stays uncached
      let endDate = new Date(queryEndDate);
      endDate.setDate(endDate.getDate() + 1);

      let startDate;
      let strEndDate;

      let mStartDate = moment(queryStartDate);
      let mEndDate = moment(endDate);

      if (this.resolution == '1_month') {

        mStartDate.set({ date: 1 });
        mEndDate.set({ date: 1 });

        mEndDate.add(1, 'months');
        mStartDate.subtract(1, 'days');
      }

      startDate = mStartDate.format('YYYY-MM-DD HH:mm:ss');
      strEndDate = mEndDate.format('YYYY-MM-DD HH:mm:ss');

      let param = {
        user_id: this.user_id,
        siteIdList: this.siteIdList.toString(),
        assetList: this.assetList.toString(),
        start_date: startDate,
        end_date: strEndDate,
        resolution_type: this.resolution,
        performance_type: this.where_performance.toString()
      };

      let today = new Date();

      this.http.funDownloadCsv(param).subscribe(data => {

        this.showLoadingSpinner = false;

        if (data.success) {

          let csv_data = this.funJsonToCsv(data.data);
          let blob = new Blob([csv_data], { type: 'text/json' });

          // save csv file
          saveAs(blob, 'RESYNC_' + this.customer_name + '_' + moment(today).format('YYYY-MM-DD') + '.csv');
        }
      });

      // this.http.funGetCompiledCsv(param)
      //   .subscribe(res => {

      //     if (res.success) {

      //       const csvData = res.data;
      //       let generationData = [];

      //       // console.log({ csvData });

      //       for (const genData of csvData['generation']) {

      //         let curr_device_mac = genData['device_mac'];
      //         for (const asset_id in genData['asset']) {
      //           let index = csvData['resolution_detail'].findIndex(assetList => assetList.asset_id == asset_id);

      //           if (index >= 0) {
      //             for (const asset_record of genData['asset'][asset_id]) {
      //               asset_record['asset_name'] = csvData['resolution_detail'][index]['asset_name'];
      //               asset_record['register_name'] = csvData['resolution_detail'][index]['register_name'];
      //               asset_record['device_mac'] = curr_device_mac;
      //               generationData.push(asset_record);
      //             }
      //           }
      //         }
      //       }

      //       // console.log('generationData');
      //       // console.log(JSON.stringify(generationData));

      //       if (csvData['assetDetail'].length > 0 && generationData.length > 0 && csvData['resyncDevList'].length > 0) {

      //         let pData = this.funCalculateData(generationData, this.where_performance, csvData['resyncDevList']);

      //         // console.log('pData');
      //         // console.log(JSON.stringify(pData));

      //         console.log('this.funProcessCsvData');
      //         console.log(csvData, generationData, pData, csvData['resyncDevList']);

      //         let processedData = this.funProcessCsvData(csvData, generationData, pData, csvData['resyncDevList']);

      //         processedData.forEach(data => {
      //           data.time = this.funConvertToLocal(data.time);
      //         });

      //         // console.log('processedData');
      //         // console.log(JSON.stringify(processedData));

      //         let csv_data = this.funJsonToCsv(processedData);

      //         console.log('csv_data');
      //         console.log(JSON.stringify(csv_data));

      //         let blob = new Blob([csv_data], { type: 'text/json' });

      //         // save csv file
      //         saveAs(blob, 'RESYNC_' + this.customer_name + '_' + moment(today).format('YYYY-MM-DD') + '.csv');

      //         // this.loader.hide();
      //         this.showLoadingSpinner = false;

      //         this.funCloseDialog();

      //       } else {
      //         // this.loader.hide();
      //         this.showLoadingSpinner = false;

      //         this.isDataAvailable = false;
      //       }
      //     }
      //   });

    } else {
      this.isResolutionSelected = true;
    }
  }

  /**
   * @function funProcessCsvData()
   * this function processes csv data
   */
  // funProcessCsvData(siteData: Array<any>, generationData: Array<any>, gData, register_device_list: Array<ResyncDeviceDetail>) {

  //   // create device_mac : site_id mapping object
  //   const device_mac_map = {};
  //   for (const r_device of register_device_list) {
  //     device_mac_map[r_device.device_mac] = r_device.site_id;
  //   }

  //   // let generationData = siteData['generation'];
  //   let assetDetailData = siteData['assetDetail'];

  //   let capacity = {};

  //   var skipAsset = ['Plant', 'Irradiance'];

  //   // var resync_dev_id_for_site = {};

  //   // create unique list
  //   const unique = (value, index, self) => self.indexOf(value) === index;

  //   // assetDetailData.forEach(asset => {
  //   //   // const site_id = device_mac_map[assetDetailData.device_mac];
  //   //   if (!resync_dev_id_for_site[asset.site_id]) {
  //   //     resync_dev_id_for_site[asset.site_id] = []
  //   //   }
  //   //   resync_dev_id_for_site[asset.site_id].push(asset.resync_dev_id);
  //   // });

  //   // console.log({ resync_dev_id_for_site, assetDetailData });

  //   // for (const id in resync_dev_id_for_site) {
  //   //   resync_dev_id_for_site[id] = resync_dev_id_for_site[id].filter(unique);
  //   // }

  //   // create capacity list
  //   assetDetailData.forEach(asset => {

  //     const site_id = device_mac_map[asset.device_mac];

  //     if (!skipAsset.includes(asset.asset_type)) {

  //       // if (!skipAsset.includes(asset.asset_type) &&
  //       //   (resync_dev_id_for_site[asset.site_id] &&
  //       //     asset.resync_dev_id == resync_dev_id_for_site[asset.site_id][0])) {
  //       // site_id : {}

  //       if (!capacity[site_id]) {
  //         capacity[site_id] = {};
  //       }

  //       if (!capacity[site_id][asset.asset_type]) {

  //         // site_id : { solar: {} }
  //         capacity[site_id][asset.asset_type] = {};

  //         if (asset['Pac']) {
  //           // site_id : { solar: { pac: value } }
  //           capacity[site_id][asset.asset_type]['pac'] = parseFloat(asset['Pac']);
  //         } else {
  //           capacity[site_id][asset.asset_type]['pac'] = 'NA';
  //         }

  //         if (asset['Pdc']) {
  //           // site_id : { solar: { pac: value, pdc: value } }
  //           capacity[site_id][asset.asset_type]['pdc'] = parseFloat(asset['Pdc']);
  //         } else {
  //           capacity[site_id][asset.asset_type]['pdc'] = 'NA';
  //         }

  //       } else {

  //         // if asset['Pac'] != undefined and pac != NA
  //         if (asset['Pac'] && capacity[site_id][asset.asset_type]['pac'] != 'NA') {
  //           capacity[site_id][asset.asset_type]['pac'] = parseFloat(capacity[site_id][asset.asset_type]['pac'])
  //             + parseFloat(asset['Pac']);
  //         }

  //         // if asset['Pdc'] != undefined and pdc != NA
  //         if (asset['Pdc'] && capacity[site_id][asset.asset_type]['pdc'] != 'NA') {
  //           capacity[site_id][asset.asset_type]['pdc'] = parseFloat(capacity[site_id][asset.asset_type]['pdc'])
  //             + parseFloat(asset['Pdc']);
  //         }

  //       }
  //     }
  //   });

  //   // console.log({ capacity });

  //   let uniqueTimeList = [];

  //   var timeList = generationData.map(gen => gen.time);
  //   uniqueTimeList = timeList.filter(unique);

  //   // set date to 1 for all data points
  //   // if (this.resolution == '1_month') {

  //   // for (let index = 0; index < uniqueTimeList.length; index++) {
  //   //   const time = uniqueTimeList[index];

  //   //   let d = new Date(time);
  //   //   //d.setDate(1);

  //   //   uniqueTimeList[index] = d.toISOString();
  //   // }
  //   // }

  //   uniqueTimeList = uniqueTimeList.filter(unique);

  //   // add site name to generation data
  //   let csvList = [];

  //   console.log(uniqueTimeList);

  //   for (const sId in gData) {
  //     uniqueTimeList.forEach(_time => {

  //       let csvData = {};

  //       csvData['time'] = _time;
  //       let sIndex = this.siteList.findIndex(site => site.site_id == sId);
  //       csvData['sitename'] = this.siteList[sIndex].sitename;
  //       for (const asset in gData[sId]) {

  //         gData[sId][asset].forEach(e => {
  //           if (e.time == _time && asset != 'PR') {

  //             // Capacity Data
  //             if (e.asset_name == "Solar") {
  //               if (capacity[sId][e.asset_name]['pdc'] != 'NA') {
  //                 csvData[e.asset_name + ' Capacity (kWp)'] = capacity[sId][e.asset_name]['pdc'];
  //               } else {
  //                 csvData[e.asset_name + ' Capacity (kWp)'] = capacity[sId][e.asset_name]['pac'];
  //               }
  //             } else if (e.asset_name == 'Diesel Generator') {
  //               csvData[e.asset_name + ' Capacity (kWp)'] = capacity[sId][e.asset_name]['pac'];
  //             }
  //           }
  //         });
  //       }

  //       for (const asset in gData[sId]) {

  //         gData[sId][asset].forEach(e => {

  //           // exclude PR
  //           if (e.time == _time && asset != 'PR') {

  //             // Generation Data
  //             if (e.asset_name == "Solar") {
  //               if (!csvData[e.asset_name + ' Energy (kWh)']) {
  //                 csvData[e.asset_name + ' Energy (kWh)'] = 0;
  //               }
  //               csvData[e.asset_name + ' Energy (kWh)'] += parseFloat(parseFloat(e.energy).toFixed(2));
  //             } else if (e.asset_name == 'Diesel Generator') {
  //               if (!csvData[e.asset_name + ' Energy (kWh)']) {
  //                 csvData[e.asset_name + ' Energy (kWh)'] = 0;
  //               }
  //               csvData[e.asset_name + ' Energy (kWh)'] += parseFloat(parseFloat(e.energy).toFixed(2));
  //             } else if (e.asset_name == 'Irradiance') {
  //               if (!csvData[e.asset_name + ' (Wh/m2)']) {
  //                 csvData[e.asset_name + ' (Wh/m2)'] = 0;
  //               }
  //               csvData[e.asset_name + ' (Wh/m2)'] += parseFloat(parseFloat(e.energy).toFixed(2));
  //             }
  //           }
  //         });
  //       }

  //       // Calculate PR
  //       if (csvData['Solar Energy (kWh)'] && csvData['Irradiance (Wh/m2)'] && csvData['Solar Capacity (kWp)']) {
  //         let pr = (csvData['Solar Energy (kWh)'] / ((csvData['Irradiance (Wh/m2)'] / 1000) * csvData['Solar Capacity (kWp)']) * 100);
  //         csvData['PR%'] = pr;
  //       }

  //       // console.log({ csvData });
  //       csvList.push(csvData);
  //     });
  //   }

  //   return csvList;
  // }

  /**
   * @function funCalculateData()
   *  this function separates data by site_id and deviceType
   */
  // funCalculateData(rawData, registerList, deviceMacList) {

  //   let listByRegisterName = {};

  //   registerList.forEach(regName => {

  //     let listByRegName = rawData.filter(device => device.register_name == regName);
  //     listByRegisterName[regName] = listByRegName;
  //   });

  //   // separate list by site_id
  //   let site_resync_dev_map = {};
  //   deviceMacList.forEach(dMac => {
  //     if (!site_resync_dev_map[dMac['site_id']]) {
  //       site_resync_dev_map[dMac['site_id']] = []
  //     }
  //     site_resync_dev_map[dMac['site_id']].push(dMac['device_mac']);
  //   });

  //   let listByDeviceMac = {};

  //   for (const site_resync in site_resync_dev_map) {

  //     for (const regName in listByRegisterName) {

  //       // register name and device mac are required
  //       let holder = listByRegisterName[regName].filter(regList => site_resync_dev_map[site_resync].includes(regList.device_mac));

  //       if (!listByDeviceMac[site_resync]) {
  //         listByDeviceMac[site_resync] = {};
  //       }
  //       listByDeviceMac[site_resync][regName] = holder;
  //     }
  //     // }
  //   }

  //   return listByDeviceMac;
  // }

  /**
   * @function funJsonToCsv()
   * this function creates csv data from json
   */
  funJsonToCsv(data) {

    // DO NOT remove key or csv will not be created
    var replacer = (key, value) => value === null ? '' : value;

    var fields = ['time', 'sitename', 'Solar Capacity (kWp)', 'Diesel Generator Capacity (kWp)', 'Solar Energy (kWh)', 'Diesel Generator Energy (kWh)', 'Irradiance (Wh/m2)', 'PR%'];

    // convert json to csv format
    var csv = data.map(function (row) {
      return fields.map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer);
      }).join(',');
    });

    // add title to csv
    csv.unshift(fields.join(','));

    return csv.join('\r\n');
  }

  /**
   * @function funCloseDialog()
   * this function closes dialog
   */
  funCloseDialog() {
    this.dialogRef.close();
  }

  /**
   * @function funConvertToUtc()
   * convert date object to UTC date object
   * @param {Date} date date object
   */
  funConvertToUtc(date: Date) {
    var a = moment.tz(this.funFormatDate(date), this.timeZone);
    var strTime = a.utc().format('YYYY-MM-DD HH:mm:ss');
    return strTime;
  }

  /**
   * @function funFormatDate()
   * this function takes date object
   * and convert it into string format
   * @param {Date} date date object
   * @returns {string} formated string date
   */
  funFormatDate(date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  }

  /**
  * @function funConvertToLocal()
  * this function converts local time to utc time
  * @param {string} timeZone time zone to convert
  * @returns {Date} date of given zone
  */
  funConvertToLocal(date: String, reset: String = null) {
    var a = moment.tz(date, "Etc/GMT-0");
    a.tz(this.timeZone);

    if (reset && reset.toLowerCase() == '1d') {
      a = a.set({ seconds: 0, minutes: 0 })
    }

    let localDate = a.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return localDate;
  }
}
