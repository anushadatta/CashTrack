import { Injectable } from "@angular/core";
import { WORKING, DEAD, generationListForPortfolio, DISABLED, generationList, consumptionList } from "src/app/common/variable";
import { HttpService } from "src/app/services/http.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";
import { GlobalService } from "src/app/services/global.service";
import { ApiResponseType } from "src/app/types/common.type";

// import { GlobalService } from "src/app/services/global.service";

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private http: HttpService,
    private globalService: GlobalService,
  ) { }

  /**
   * @function funGetOverviewData()
   * this function sets overview data
   */
  funGetOverviewData(landingPageData) {

    const overviewData = {
      totalSolarGenUnit: '',
      totalSolarGen: '',
      co2SavingsUnit: '',
      co2Savings: '',
      totalConsumptionUnit: '',
      totalConsumption: ''
    };

    let totalGeneration = parseFloat(landingPageData['total_generation']);
    let totalEnergyGeneration;

    if (totalGeneration > 1000) { // convert to mega watt
      totalEnergyGeneration = (totalGeneration / 1000).toFixed(2);
      totalEnergyGeneration = Math.round(totalEnergyGeneration);
      overviewData.totalSolarGenUnit = ' MWh';
    } else {
      totalEnergyGeneration = totalGeneration.toFixed(0);
      totalEnergyGeneration = Math.round(totalEnergyGeneration);
      overviewData.totalSolarGenUnit = ' kWh';
    }

    // set total solar generation
    // this.totalSolarGen = totalEnergyGeneration;
    overviewData.totalSolarGen = totalEnergyGeneration;

    let emission;

    let co2emission = parseFloat(landingPageData['co2emission']);

    if (totalGeneration > 1000) { // convert to kilo gram
      emission = ((totalGeneration * co2emission) / 1000).toFixed(2);
      emission = Math.round(emission);
      overviewData.co2SavingsUnit = ' Mg';
    } else {
      emission = (totalGeneration * co2emission).toFixed(0);
      emission = Math.round(emission);
      overviewData.co2SavingsUnit = ' kg';
    }

    // set co2 savings
    overviewData.co2Savings = emission;

    let totalConsumption = parseFloat(landingPageData['total_consumption']);
    let totalEnergyConsumption;

    if (totalConsumption > 1000) { // convert to mega watt
      totalEnergyConsumption = (totalConsumption / 1000).toFixed(0);
      totalEnergyConsumption = Math.round(totalEnergyConsumption);
      overviewData.totalConsumptionUnit = ' MWh';
    } else {
      totalEnergyConsumption = totalConsumption.toFixed(0);
      totalEnergyConsumption = Math.round(totalEnergyConsumption);
      overviewData.totalConsumptionUnit = ' kWh';
    }

    // set total consumption
    overviewData.totalConsumption = totalEnergyConsumption;

    return overviewData;
  }

  /**
   * create date range for portfolio
   * @param {moment} date
   * @param {string} type
   */
  funGetPortfolioDateRange(date, type) {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    let startDate;
    let endDate;

    switch (type) {
      case 'today':
        // create today date range
        startDate = moment(date).format(dateFormat);
        endDate = moment(date).add(1, 'days').format(dateFormat);
        return [startDate, endDate];

      case 'yesterday':
        // create yesterday date range
        startDate = moment(date).subtract(1, 'days').format(dateFormat);
        endDate = date.format(dateFormat);
        return [startDate, endDate];

      case 'week':
        // create week date range
        let sDate = moment(date);
        const startDateSub = sDate.date() - (sDate.day() - 1);
        sDate.set({ date: startDateSub })
        startDate = sDate.format(dateFormat);
        endDate = moment(startDate).add(7, 'days').format(dateFormat);
        return [startDate, endDate];

      case 'month':
        date.set({ date: 1 });
        // create this month date range
        startDate = moment(date).format(dateFormat);
        endDate = moment(date).add(1, 'months').format(dateFormat);
        return [startDate, endDate];
    }
  }

  /**
   * get portfolio table data
   * @param param query param
   */
  getPortfolioData(param): Observable<any> {
    return this.http.funGetNewSitePortfolio(param).pipe(
      map((res: ApiResponseType<any>) => {

        let filteredData = [];
        let locations = [];

        // create based on site id
        let assetCapacity = {};

        let portfolioData = res.data;

        if (res.success && portfolioData['site_data'] && portfolioData['data']) {
          for (const site of portfolioData['site_data']) {

            // map location list
            locations.push({
              site_id: site['site_id'],
              lat: parseFloat(site['lat']),
              lng: parseFloat(site['long']),
              site_info: '<strong>site name:</strong> ' + site['sitename'] + '<br />' +
                '<strong>project_info:</strong> ' + site['project_info'] + '<br />' +
                '<strong>commissioned_date:</strong> ' + site['commissioned_date']
            });

            // get site detail
            const object = site;

            // generation
            const generation = portfolioData['data'][site.site_id]['total_generation'];

            // check if generation is available in asset_list
            let isGenerationAvailable = false;
            generationListForPortfolio.forEach(gen => isGenerationAvailable = isGenerationAvailable || param.asset_list.includes(gen));

            if (!isGenerationAvailable) {
              object['generation'] = '-';

            } else if (generation > 1000 || generation == 0) {
              object['generation'] = (generation / 1000).toFixed(2) + ' MWh';
            } else {
              object['generation'] = generation.toFixed(2) + ' kWh';
            }

            // consumption
            const consumption = portfolioData['data'][site.site_id]['total_consumption'];

            // if (param.asset_list == '') {
            //   object['consumption'] = '-';

            // } else
            if (consumption > 1000 || consumption == 0) {
              object['consumption'] = (consumption / 1000).toFixed(2) + ' MWh';
            } else {
              object['consumption'] = consumption.toFixed(2) + ' kWh';
            }

            // get pr
            if (!isGenerationAvailable) {
              object['pr'] = '-';

            } else if (portfolioData['data'][site.site_id]['pr'] != undefined) {
              let todayPr = portfolioData['data'][site.site_id]['pr'].toFixed(2) || 0;

              if (todayPr > 100) {
                todayPr = 100;
              }

              object['pr'] = todayPr;
            } else {
              object['pr'] = 'NA';
            }

            // site capacity
            let assetList = Object.keys(portfolioData['data'][site.site_id]['siteCapacity']);

            let i = assetList.indexOf('Plant');
            if (i > -1) {
              assetList.splice(i, 1);
            }

            i = assetList.indexOf('Irradiance');
            if (i > -1) {
              assetList.splice(i, 1);
            }

            assetCapacity[site.site_id] = {};

            assetList.forEach(assetName => {
              let pac = portfolioData['data'][site.site_id]['siteCapacity'][assetName].Pac;
              let pdc = portfolioData['data'][site.site_id]['siteCapacity'][assetName].Pdc;

              pac = parseFloat(parseFloat(pac).toFixed(2));
              pdc = parseFloat(parseFloat(pdc).toFixed(2));

              if (assetName == 'Solar') {
                if (pdc > 0) {
                  assetCapacity[site.site_id][assetName] = pdc + ' kWp';
                } else {
                  assetCapacity[site.site_id][assetName] = pac + ' kWp';
                }
              } else {
                assetCapacity[site.site_id][assetName] = pac + ' kWp';
              }
            });

            // specific yield
            const specific_yield = portfolioData['data'][site.site_id]['specific_yield'];
            // const solar_inverter_breakdown = portfolioData['data'][site.site_id]['solar_inverter_breakdown'];

            // console.log({ solar_inverter_breakdown, assetCapacity });

            // if (!isGenerationAvailable) {

            //   object['specific_yield'] = '-';

            // } else if (specific_yield[0] && specific_yield[0]['energy'] &&
            //   solar_inverter_breakdown[0] && solar_inverter_breakdown[0]['Pdc']) {

            //   object['specific_yield'] = (specific_yield[0]['energy'] / solar_inverter_breakdown[0]['Pdc']).toFixed(2) + ' kWh/kWp';
            // } else {
            //   object['specific_yield'] = 0 + ' kWh/kWp';
            // }

            let siteCapacity = portfolioData['data'][site.site_id]['siteCapacity']['Solar'];

            if (!isGenerationAvailable) {

              object['specific_yield'] = '-';

            } else if (siteCapacity && siteCapacity.Pdc && specific_yield.length > 0) {

              object['specific_yield'] = (specific_yield[0]['energy'] / siteCapacity.Pdc).toFixed(2) + ' kWh/kWp';

            } else {
              object['specific_yield'] = 0 + ' kWh/kWp';
            }

            // get alarm status for current site
            let alarmStatus = this.funGetAlarmStatus(site.site_id, site.active, portfolioData['data'][site.site_id]['alarm_status']);

            // set alarm status
            object['status'] = alarmStatus;

            // get ticket count
            const ticket_count = portfolioData['data'][site.site_id]['ticket_count'];
            if (ticket_count.length > 0) {
              object['ticket_count'] = ticket_count[0]['count'];
            } else {
              object['ticket_count'] = '0';
            }

            filteredData.push(object);
          }

          return { filteredData, assetCapacity, locations };
        }
      })
    );
  }

  /**
   * this function determines whether site is active or not
   * @param site_id site id of current site
   * @param alarmList alarm asset list for current site
   */
  funGetAlarmStatus(site_id: string, status: string, alarmList: Array<any>) {
    let alarmStatus = WORKING;

    // if site is dormant or inactive then gray out site
    if (alarmList.length <= 0 || status == '0') {

      // user: resyncx, site: 'SAFRA Mt Faber', 'SAFRA Jurong'
      // if (site_id == '11' || site_id == '12')
      //   alarmStatus = WORKING;
      // else
      alarmStatus = DISABLED;

    } else {

      for (const alarm of alarmList) {
        if (alarmStatus == DEAD || alarm.status == DEAD)
          alarmStatus = DEAD;
        else
          alarmStatus = WORKING;
      }
    }

    // user: accenture, site: site-1
    if (site_id == '109') {
      alarmStatus = WORKING;
    }

    return alarmStatus;
  }

  /**
   * @function funGetValueByDeviceMac()
   * this function returns total based on site_id and user_id
   * @param {Object} objOfTotal dev_id and total as object
   * @param {Array} devList list of user_id and site_id and dev_id
   * @param {string} site_id site_id
   * @param {string} user_id user_id
   */
  funGetValueByDeviceMac(objOfTotal, devList: Array<any>, site_id: string, user_id: string) {

    // get device which has given user_id and site_id
    let device = devList.filter(deviceInfo => deviceInfo.site_id == site_id && deviceInfo.user_id == user_id);

    // if given user_id and site_id is found
    // and objOfTotal property of resync_dev_mac_id
    if (device.length > 0 && objOfTotal.hasOwnProperty(device[0]['resync_dev_mac_id'])) {

      return objOfTotal[device[0]['resync_dev_mac_id']];
    }

    return 0;
  }

  /**
   * @function funCalcTotalEnergy()
   * this function calculates total energy from array
   * @param {string} key to calculate values from
   * @param {string} totalHolder total will be stored as value of this param
   * @param {Array} data array of data
   */
  funCalcTotalEnergy(key: string, totalHolder: string, data: Array<any>) {
    if (data.length < 1)
      return {};

    let total = {};

    data.forEach(d => {

      // add values if not first time
      if (total[d[totalHolder]]) {
        total[d[totalHolder]] = total[d[totalHolder]] + parseFloat(d[key] || 0);
      } else {
        total[d[totalHolder]] = parseFloat(d[key] || 0);
      }
    });

    return total;
  }

  /**
   * @function funDonutChartData()
   * this function generates data for donut chart
   */
  funDonutChartData(chartData) {

    if (chartData.length <= 0)
      return [];

    let pie_data = [];
    chartData.forEach(d => {
      let index = pie_data.findIndex(val => val.asset_name == d.asset_name);

      if (index > -1) {
        pie_data[index]['energy'] += d['energy'];
      } else {
        pie_data.push({ asset_name: d['asset_name'], energy: parseFloat(d['energy']) });
      }
    });

    pie_data.forEach((data, index) => {

      // if (data['asset_name'] == "Diesel Generator") {
      //   pie_data[index]['asset_name'] = 'GenSet';
      // }

      if (data['asset_name'] == 'Battery') {
        data['asset_name'] = this.globalService.funGetDisplayName(data['register_name']);
      } else {
        data['asset_name'] = this.globalService.funGetDisplayName(data['asset_name']);
      }

    });

    return pie_data;
  }

  normalizeRawQueryResult<T>(queryResult: T[][]): T[] {
    let energyAssetMap: T[] = [];
    for (const qResult of queryResult) {
      energyAssetMap = [...energyAssetMap, ...qResult];
    }
    return energyAssetMap;
  }

  formatBreakDownDataForChart(chartData) {

    /* {
      "11": {
        "Solar": [{
          "time": "2020-05-01T00:00:00.000Z",
          "energy": 539.46,
          "asset_name": "Solar",
          "device_mac": "24:86:F4:80:A6:27",
          "register_name": "AC-Power"
        }]
      }
    } */

    let assetBasedGenerationData: any = [];

    for (const cData of Object.values(chartData)) {
      assetBasedGenerationData = [...assetBasedGenerationData, ...Object.values(cData)];
    }

    let resolutionData: any = this.normalizeRawQueryResult(assetBasedGenerationData);

    // const generationData = resolutionData.filter(rData => generationList.includes(rData.asset_name));
    // const consumptionData = resolutionData.filter(rData => consumptionList.includes(rData.asset_name));

    // console.log({generationData});
    // console.log({consumptionData});

    // // calculate grid data
    // const gridData = this.globalService.funCalculateGrid(generationData, consumptionData);

    // resolutionData = [...generationData, ...gridData];

    let finalData = [];

    let timeList = [];
    let assetNameList = [];

    for (const gData of resolutionData) {
      if (!timeList.includes(gData.time)) {
        timeList.push(gData.time);
      }

      if (!assetNameList.includes(gData.asset_name)) {
        assetNameList.push(gData.asset_name);
      }
    }

    for (const _time of timeList) {
      for (const assetName of assetNameList) {
        const chartData = resolutionData.filter(gData =>
          gData.asset_name == assetName && gData.time == _time);

          const chartDataSum = {
            time: _time,
            asset_name: assetName,
            energy: chartData.map(c => c.energy).reduce((a,b) => a + b, 0)
          };

        finalData = [...finalData, chartDataSum];
      }
    }

    const generationData = finalData.filter(rData => generationList.includes(rData.asset_name));
    const consumptionData = finalData.filter(rData => consumptionList.includes(rData.asset_name));

    // calculate grid data
    const gridData = this.globalService.funCalculateGrid(generationData, consumptionData);

    return [...generationData, ...gridData];

    // finalData = [...generationData, ...gridData];

    // console.log(finalData);

    // return finalData;
  }

  /**
   * @function funBarChartData()
   * his function calculates bar chart data
   */
  funBarChartData(chartData, dateArray) {

    let isDataAvailable = false;
    if (chartData.length <= 0)
      return [];

    let bar_data = [];
    let columns = [];

    chartData.forEach(values => {

      let index = bar_data.findIndex(v => v.time == values.time);
      let assetValue = parseFloat(values['energy'].toFixed(2));

      let asset_name = this.globalService.funGetDisplayName(values['asset_name']);

      if (asset_name == 'DC-Power') {
        // negative values are valid
        isDataAvailable = true;
      } else {

        if (assetValue > 0) {
          isDataAvailable = true;
        }
      }

      // Convert Diesel Generator to GenSet
      // let asset_name = values['asset_name'];
      // if (asset_name == "Diesel Generator") {
      //   asset_name = "GenSet";
      // }

      if (index < 0) {
        let obj: any = {};

        obj['time'] = values['time'];
        obj[asset_name] = assetValue;
        bar_data.push(obj);

      } else {

        let obj = bar_data[index];
        obj[asset_name] = assetValue;
        bar_data[index] = obj;
      }

      // create column array
      let columnIndex = columns.findIndex(column => column == asset_name);

      // add unique value in columns array
      if (columnIndex < 0) {
        columns.push(asset_name);
      }
    });

    // return if all data are zero
    if (!isDataAvailable) {
      return [];
    }

    // get list of time from parsed data
    let timeList = bar_data.map(e => e.time).sort();

    let finalData = [];

    dateArray.forEach(date => {

      let dataObj = {
        time: date,
        data: {}
      };

      columns.forEach(column => {

        // check if current time is present in timeList
        if (timeList.includes(date)) {
          // get time object from bar_data
          let temp = bar_data.filter(obj => obj.time === date);

          dataObj['data'][column] = temp[0][column];

        } else {

          dataObj['data'][column] = 0;
        }
      });

      finalData.push(dataObj);
    });

    let calculatedData = { dateArray, columns, data: finalData };
    return calculatedData;
  }

  /**
   * create formated list of data for landing page chart
   * sum data based on site
   */
  funCreateFormatedDataForChart(timeList, generationData, gridData) {
    let finalData = [];

    for (const strTime of timeList) {
      let genData = [];
      let uniqueData = {};

      for (const site_id in generationData) {
        const _genData = generationData[site_id].filter(data => data.time == strTime);
        genData = [...genData, ..._genData];
      }

      for (const site_id in gridData) {
        const _gData = gridData[site_id].filter(data => data.time == strTime);
        genData = [...genData, ..._gData];
      }

      // add energy for same asset name
      for (const data of genData) {
        if (data.asset_name == 'Battery') {

          if (uniqueData[data.register_name] != undefined) {
            uniqueData[data.register_name] += data.energy;
          } else {
            uniqueData[data.register_name] = data.energy;
          }

        } else {

          if (uniqueData[data.asset_name] != undefined) {
            uniqueData[data.asset_name] += data.energy;
          } else {
            uniqueData[data.asset_name] = data.energy;
          }
        }

        // console.log({ data });
        // added for battery asset
        // uniqueData['register_name'] = data['register_name'];
      }

      for (const asset in uniqueData) {
        // console.log({ asset });
        let obj = {};
        obj['time'] = strTime;
        obj['asset_name'] = asset;
        obj['energy'] = uniqueData[asset];
        // obj['register_name'] = uniqueData['register_name'];
        finalData.push(obj);
      }

    }

    return finalData;
  }

  /**
   * @function funCreateDateRange()
   * this function creates date range based on args
   * @param {string} strDate string date
   * @param {number} count count for date range
   * @param {string} dateType type of range
   * @returns {string} range of date
   */
  funCreateDateRange(strDate: string, dateType: string) {

    let date = moment(strDate);
    date.set({ hour: 0, minute: 0, second: 0 });

    let startDate;
    let endDate;

    switch (dateType) {

      case 'week':

        date.subtract(date.day() - 1, 'days');

        // generate 1 week date range
        startDate = moment(date);
        date.add(7, 'days');
        endDate = moment(date);
        break;

      case 'month':

        // generate 1 month date range
        date.set({ date: 1 });
        startDate = moment(date);
        date.add(1, 'months');
        endDate = moment(date);
        break;

      case '6_month':

        // generate 6 month date range
        endDate = moment(date);
        startDate = date.subtract(6, 'months')
        startDate = moment(date);
        break;

      case 'year':
        date.subtract(1, 'years');

        // generate 1 year date range
        date.set({ date: 1, month: 0 });
        startDate = moment(date);
        date.add(1, 'years');
        endDate = moment(date);
        break;
    }

    // return [startDate, endDate];
    return [startDate.format('YYYY-MM-DD HH:mm:ss'), endDate.format('YYYY-MM-DD HH:mm:ss')];
  }

  /**
   * @function fun1WeekDateRange()
   * this function creates date range form 1 month
   */
  fun1WeekDateRange(today) {
    let dateArray = [];

    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    today.subtract(today.day() - 1, 'days');

    // create time array for x axis
    for (let i = 1; i <= 7; i++) {
      dateArray.push(today.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
      today.add(1, 'days');
    }
    return dateArray;
  }

  /**
   * @function fun1MonthDateRange()
   * this function creates date range form 1 month
   */
  fun1MonthDateRange(today) {
    let dateArray = [];

    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0, date: 1 });

    let numOfDays = today.daysInMonth();

    // create time array for x axis
    for (let i = 1; i <= numOfDays; i++) {
      dateArray.push(today.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
      today.add(1, 'days');
    }
    return dateArray;
  }

  /**
   * @function fun6MonthDateRange()
   * this function creates date range form 1 month
   */
  fun6MonthDateRange(today) {
    let dateArray = [];

    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0, date: 1 });
    today.subtract(6, 'months');

    // create time array for x axis
    for (let i = 0; i < 6; i++) {
      dateArray.push(today.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
      today.add(1, 'months');
    }
    return dateArray;
  }

  /**
   * @function fun1YearDateRange()
   * this function creates date range form 1 month
   */
  fun1YearDateRange(today) {
    let dateArray = [];

    today.subtract(1, 'year');

    today.set({ hour: 0, minute: 0, second: 0, millisecond: 0, date: 1, month: 0 });

    // create time array for x axis
    for (let i = 0; i < 12; i++) {
      dateArray.push(today.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
      today.add(1, 'months');
    }
    return dateArray;
  }

}