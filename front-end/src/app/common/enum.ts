export enum CookieKeys {
  token = "token",
  api_key = "api_key",
  username = "username",
  user_type = "user_type",
  user_id = "user_id",
  admin_id = "admin_id",
  site_id = "site_id",
  site_user_id = "site_user_id",
  site_timezone = "site_timezone",
  time_zone = "time_zone",
  date = "date",
  month = "month",
  chart_state = "chart_state",
  year = "year",
  start_date = "start_date",
  end_date = "end_date",
  date_change = "date_change",
  btn_selection = "btn_selection",
}

export enum UserType {
  admin = "admin",
  user = "user",
  site = "site",
  demo_user = "demo_user",
  demo_site = "demo_site_user",
}

export enum NavigationState {
  homeState = "homeState",
  landingState = "landingState",
  dashboardState = "dashboardState",
  ticketState = "ticketState",
  settingState = "settingState",
  defaultState = "defaultState",
  maintenanceState = "maintenanceState"
}

export class AnalyticsAsset {
  id: string;
  assetName: string;
  link: string;
  icon?: string;
  display?: string;
}
