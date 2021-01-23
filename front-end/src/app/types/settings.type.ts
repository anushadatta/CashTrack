import {
  UserDetail, SiteUserDetail, SiteDetail,
  EnergyAssetDetail, ResyncDeviceDetail
} from './common.type';

export interface UserDetailsRes {
  user_detail?: UserDetail[];
  site_user_detail: SiteUserDetail[];
}

export interface UserInfoRes {
  user_detail: UserDetail[];
  site_detail: SiteDetail[];
}

export interface SiteDetailsRes {
  user_detail: UserDetail[];
  site_detail: SiteDetail[];
}

export interface SiteDetailRes {
  site_detail: SiteDetail[];
  asset_detail: EnergyAssetDetail[];
  resync_device_detail: ResyncDeviceDetail[];
}

export interface ResyncDeviceDetailsRes {
  site_detail: SiteDetail[];
  resync_device_detail: ResyncDeviceDetail[];
}

export interface EnergyAssetDetailsRes {
  site_detail: SiteDetail[],
  resync_device_detail: ResyncDeviceDetail[],
  energy_asset_detail: EnergyAssetDetail[]
}
