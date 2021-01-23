import { SiteDetail, EnergyAssetDetail, ResyncDeviceDetail, ResolutionDetail } from './common.type';

export interface CustomizedChartResponse {
  site_detail: SiteDetail[];
  energy_asset_detail: EnergyAssetDetail[];
  resync_device_detail: ResyncDeviceDetail[];
  register_name_list: ResolutionDetail[];
}
