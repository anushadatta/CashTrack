import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { displayNameMapping, secret } from '../common/variable';
import { UserType } from '../common/enum';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpService) { }

  /**
   * @function funCalculateGrid()
   * calculate grid data:
   * load = sum of all consumption assets
   * grid = load - (solar + battery)
   */
  funCalculateGrid(generationData, consumptionData) {

    if (!(generationData && consumptionData)) return [];

    let timeBasedGenerationData = [];
    let timeBasedConsumptionData = [];

    let dgData = [];

    let generationAssetList = ['Solar', 'Battery'];

    /**
     * create format as below
     * for generation and consumption
     * [{ time: "2019-07-25T17:00:00.000Z", asset: [{ asset_name: "Solar", energy: 20 }, ..] }, ..]
     */

    // create unique list based on time
    for (const generation of generationData) {

      if (generation.asset_name == 'Diesel Generator') {
        dgData.push(generation);
      }

      // get specific asset for generation calculation
      if (generationAssetList.includes(generation.asset_name)) {

        // find previously added object based on time
        let index = timeBasedGenerationData.findIndex(gData => gData.time == generation.time);

        // console.log(generation.asset_name);
        // asset info to push
        const assetInfo = { asset_name: generation.asset_name, energy: generation.energy };

        // add info to existing time based object
        if (index > -1) {
          timeBasedGenerationData[index].asset.push(assetInfo);
        } else {
          timeBasedGenerationData.push({ time: generation.time, asset: [assetInfo] });
        }
      }
    }

    // create unique list based on time
    for (const consumption of consumptionData) {
      // find previously added object based on time
      let index = timeBasedConsumptionData.findIndex(gData => gData.time == consumption.time);

      // asset info to push
      const assetInfo = { asset_name: consumption.asset_name, energy: consumption.energy };

      // add info to existing time based object
      if (index > -1) {
        timeBasedConsumptionData[index].asset.push(assetInfo);
      } else {
        timeBasedConsumptionData.push({ time: consumption.time, asset: [assetInfo] });
      }
    }

    /**
     * sum of all assets for each records
     * [{ time: "2019-07-25T17:00:00.000Z", sum: 40 }, ..]
     */

    // create sum based on time for generation
    const generationAssetSum = timeBasedGenerationData.map(data => {
      // sum of all asset energy
      const energySum = data.asset.reduce((a, b) => ({ energy: a.energy + b.energy }));
      return { time: data.time, sum: energySum.energy };
    });

    // create sum based on time for generation
    const consumptionAssetSum = timeBasedConsumptionData.map(data => {
      // sum of all asset energy
      const energySum = data.asset.reduce((a, b) => ({ energy: a.energy + b.energy }));
      return { time: data.time, sum: energySum.energy }
    });

    /**
     * create final grid calculation
     * @var calculatedGrid = @var consumptionAssetSum[asset.sum] - @var generationAssetSum[asset.sum]
     */

    let calculatedGrid = [];

    // loop over consumption
    for (const cAssetSum of consumptionAssetSum) {

      // find generation record from consumption.time
      let gAssetSum = generationAssetSum.find(asset => asset.time == cAssetSum.time);

      // // find dg record from consumption.time
      // let dgRecord = dgData.find(asset => asset.time == cAssetSum.time);

      let assetTime;
      if (gAssetSum) {
        assetTime = gAssetSum.time;
      } else {
        assetTime = cAssetSum.time;
      }

      // set sum to 0 if generation record not found
      if (!gAssetSum) {
        gAssetSum = { sum: 0, time: assetTime };
      }

      // set sum to 0 if consumption record not found
      if (!cAssetSum) {
        cAssetSum.sum = { sum: 0, time: assetTime };
      }

      let gridSum;

      // check if dg is not running
      // if (dgRecord && dgRecord.energy > 0) {
      //   gridSum = 0;
      // } else {
      gridSum = cAssetSum.sum - gAssetSum.sum;
      // }

      calculatedGrid.push({
        time: assetTime,
        energy: gridSum,
        asset_name: 'Grid'
      });
    }

    return calculatedGrid;
  }

  /**
   * @function funGetDisplayName()
   * returns display of internally used asset
   * @param internalName name used internally
   * @returns {string} name to be displayed
   */
  funGetDisplayName(internalName: string): string {
    let displayName: string;
    let assetObj = displayNameMapping.find(nameMap => nameMap.assetName == internalName);

    if (assetObj) {
      displayName = assetObj.displayName;
    } else {
      displayName = internalName;
    }

    return displayName;
  }

  /**
   * sort string array
   */
  funSortStringObjectArray(arg1, arg2, param = ''): number {
    let comparison = 0;

    if (param == '') {
      if (arg1 > arg2) {
        comparison = 1;
      } else if (arg1 < arg2) {
        comparison = -1;
      }
    } else {
      if (arg1[param] > arg2[param]) {
        comparison = 1;
      } else if (arg1[param] < arg2[param]) {
        comparison = -1;
      }
    }

    return comparison;
  }

  /**
   * sort alpha numeric array
   */
  funSortAlphaNumericObjectArray(arg1, arg2, param = ''): number {
    if (param == '') return arg1.match(/[0-9]+/) - arg2.match(/[0-9]+/);
    else return arg1[param].match(/[0-9]+/) - arg2[param].match(/[0-9]+/);
  }

  /**
   * sort alpha numeric array in descending order
   */
  funSortDescAlphaNumericObjectArray(arg1, arg2, param = ''): number {
    if (param == '') return arg2.match(/[0-9]+/) - arg1.match(/[0-9]+/);
    else return arg2[param].match(/[0-9]+/) - arg1[param].match(/[0-9]+/);
  }

  decrypt_url_param(params: string) {
    const reb64 = CryptoJS.enc.Hex.parse(params);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, secret);
    return decrypt.toString(CryptoJS.enc.Utf8);
  }

  encrypt_request_body(json_str_body: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(secret);
    const encrypted = CryptoJS.DES.encrypt(json_str_body, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt_request_body(string: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(secret);
    // direct decrypt ciphertext
    const decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(string)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * @function encrypt_string()
   * encrypts given string
   * @param string string to encrypt
   */
  encrypt_string(string: string) {
    let b64 = CryptoJS.AES.encrypt(string, secret).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  }

  /**
   * @function decrypt_string()
   * decrypts given string
   * @param string string to decrypt
   */
  decrypt_string(string: string) {
    let reb64 = CryptoJS.enc.Hex.parse(string);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, secret);
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  }

  async funDemoUserAccessControl(userType: string, pageName: string) {
    if (userType == UserType.demo_user || userType == UserType.demo_site) {

      const res = await this.http.funGetDemoUserAccessInfo({ page_name: pageName }).toPromise();

      let accessControl = {};

      if (!res.success && res.data.length <= 0) {
        return {};
      }

      for (const accessInfo of res.data) {
        accessControl[accessInfo['section_name']] = {
          disable: accessInfo['disable'] == '1',
          blur: accessInfo['blur'] == '1'
        };
      }

      return accessControl;

      // const accessControl = demoUserBlurElements.find(a => a.tagName == pageName);
      // if (accessControl) {
      //   return accessControl.section;
      // } else {
      //   return {};
      // }
    } else {
      return {};
    }
  }
}
