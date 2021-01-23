export interface SideBarEle {
    id: string;
    name: string;
    icon?: string;
    subMenu?: Array<SideBarEle>;
    badgeName?: string;
    isHeading?: boolean;
}

export interface LoadChartType {
    selectionType: number,
    date: Date
}

export interface StringKeyValuePair {
    key: string;
    value: string;
}

export interface KeyValue<T1, T2> {
    key: T1;
    value: T2;
}

export interface SiteInfo {
    specific_yield: string;
    commissioned_date: string;
    country: string;
    gmt_offset: string;
    lat: string;
    long: string;
    project_info: string;
    site_contact_info: string;
    site_id: string;
    site_location: string;
    sitename: string;
    time: string;
    user_id: string;
    generation: string;
    consumption: string;
    status: string;
    todayTotalGeneration: number;
    yesterdayTotalGeneration: number;
    monthTotalGeneration: number;
    lastMonthTotalGeneration: number;
    todayTotalConsumption: number;
    yesterdayTotalConsumption: number;
    monthTotalConsumption: number;
    lastMonthTotalConsumption: number;
    pr: string;
}

export interface SiteDetail {
    user_id?: number;
    site_id?: number;
    commissioned_date?: string;
    country?: string;
    gmt_offset?: string;
    lat?: string;
    long?: string;
    project_info?: string;
    site_contact_info?: string;
    site_location?: string;
    sitename?: string;
}

export interface EnergyAssetDetail {
    user_id?: number;
    slave_id: number;
    asset_id: string;
    sitename?: string;
    Pac?: string;
    Pdc?: string;
    asset_model?: string;
    asset_status?: string;
    asset_type?: string;
    interface?: string;
    protocol?: string;
    resync_dev_id?: string;
    serial_num?: string;
    site_id?: string;
    device_mac?: string;
    solarpanel_model?: string;
    Beta?: string;
    NOCT?: string;
    mpptKey?: string;
    mpptValue?: string;
}

export interface ResyncDeviceDetail {
    site_id?: number;
    user_id?: number;
    device_mac?: string;
    device_type?: string;
    sitename?: string;
    username?: string;
    resync_dev_mac_id?: string;
}

export interface AlertInfoDetail {
    alert_category: string,
    alert_type: string,
    daily_notification: string,
    device_mac: string
    high_h_th: string,
    high_l_th: string,
    monthly_notification: string,
    normal_h_th: string,
    normal_l_th: string,
    site_id: string,
    user_id: string,
    site_name?: string,
    alert_detail: Array<any>
}

export interface ResolutionDetail {
    user_id?: number;
    site_id?: number;
    register_name: string;
    asset_id?: string;
    asset_name?: string;
    average?: string;
    device_mac?: string;
    energy?: string;
    slave_id: string;
    unit?: string;
}

export interface ChartData {
    time: string;
    asset_name: string;
    energy: number;
}

export interface EChartSeriesType {
    name?: string;
    nameLocation?: string;
    nameGap?: number;
    type?: string;
    splitArea?: {
        show?: boolean;
    };
    splitLine?: {
        show?: boolean;
        lineStyle?: {
            color?: Array<string>;
        }
    };
    lineStyle?: {
        type?: string;
    };
    areaStyle?: {};
    yAxisIndex?: number;
    hoverAnimation?: boolean;
    smooth?: boolean;
    data?: Array<number | string>;
    stack?: string;
    color?: Array<string>;
    radius?: Array<string>;
    avoidLabelOverlap?: boolean;
    label?: {};
    labelLine?: {};
    axisLabel?: any;
    interval?: number;
}

export interface EChartOptionType {
    options?: any;
    textStyle?: {
        fontFamily?: string;
    },
    color?: Array<string>;
    grid?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    },
    legend?: {
        type?: string;
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        data?: Array<number | string>;
    },
    xAxis?: EChartSeriesType,
    visualMap?: any;
    tooltip?: {};
    yAxis?: any;
    series?: any;
    extra?: any;
}

export interface MaintenanceDetail {
    assigned_to: string;
    end_date: string;
    maintenance_id: string;
    maintenance_type: string;
    site: string;
    site_id: string;
    start_date: string;
    user_id: string;
}

export interface UserDetail {
    user_id: number;
    active?: 0 | 1;
    api_key?: string;
    contact_info?: string;
    country?: string;
    customer_name?: string;
    description?: string;
    email_id?: string;
    location?: string;
    password?: string;
    site_image?: string;
    site_url?: string;
    user_type?: string;
    username: string;
}

export interface SiteUserDetail {
    site_id: number;
    user_id: number;
    site_user_id: number;
    api_key: string;
    email_id: string;
    last_login: string;
    last_logout: string;
    site_name: string;
    site_user_name: string;
    site_user_password: string;
    active?: 0 | 1;
}

export interface AlarmDetail {
    user_id: number;
    site_id: number;
    alarm_cleared: string;
    alarm_started: string;
    asset_id: string;
    clear_email: string;
    resync_dev_mac_id: string;
    send_email: string;
    sitename: string;
    status: string;
    note: string;
    username: string;
}

export interface AssetData {
    asset_id: string;
    slave_id: number;
    value: number;
}

export interface SideBar {
    id: string;
    parentId?: string;
    pageTitle: string;
    icon?: string;
    addSeparator?: boolean;
    isSubMenuItem?: boolean;
    isHeading?: boolean;
    badgeName?: string;
    addHeader?: string;
    subMenu?: SideBar[];
    isNew?: boolean;
    category: string // either Dashboard or Operations
}

export interface SidebarCategory {
    id: string,
    title: string,
    expanded: boolean
}

export interface ForecastDataCountRes {
    count: number;
}

export interface EnergyTilesType {
    name: string;
    background: string;
    image: string;
    currentPower: string;
}

export interface ApiResponseType<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiInsertedResponse {
    isInserted: boolean;
}

export interface ApiUpdatedResponse {
    isUpdated: boolean;
}

export interface ApiDeleteResponse {
    isDeleted: boolean;
}