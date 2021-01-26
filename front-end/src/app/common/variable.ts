import { NotifierOptions } from "angular-notifier";
import { EChartOptionType } from "../types/common.type";
import { UserType } from "./enum";

export const accessRight = [
    {
        page: {
            pageName: "appLayoutPage",
            displayName: "Side Bar"
        },
        tags: [
            {
                tagName: "showForecastPage",
                displayName: "Forecast",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: false },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: false }
                ]
            },
            {
                tagName: "detailReportPage",
                displayName: "Detail Report",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: false },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: false }
                ]
            }
        ],
    },
    {
        page: {
            pageName: "dashboardPage",
            displayName: "Customer top-level dashboard"
        },
        tags: [
            {
                tagName: "consumptionChart",
                displayName: "Consumption Chart",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "chartSelection",
                displayName: "Chart Selection",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "chartSelectionByDate",
                displayName: "Chart Selection By Date",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "csvDownload",
                displayName: "Download CSV",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
        ],
    },
    {
        page: {
            pageName: "detailDashboardPage",
            displayName: "Detail Dashboard"
        },
        tags: [
            {
                tagName: "chartSelection",
                displayName: "Chart Selection",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "chartSelectionByDate",
                displayName: "Chart Selection By Date",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "csvDownload",
                displayName: "Download CSV",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "mpptConsumption",
                displayName: "MPPT Chart",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            },
            {
                tagName: "invPerformance",
                displayName: "Inverter Performance",
                access: [
                    { userType: UserType.admin, isAccessible: true },
                    { userType: UserType.user, isAccessible: true },
                    { userType: UserType.site, isAccessible: true },
                    { userType: UserType.demo_user, isAccessible: true },
                    { userType: UserType.demo_site, isAccessible: true }
                ]
            }
        ],
    }
];

export const demoUserBlurElements = {
    siteLandingPage: {
        breakdownBarChart: 'energyBreakdownBarChart',
        breakdownDonutChart: 'energyBreakdownDonutChart',
        portfolioTable: 'portfolioTable',
        downloadCsv: 'downloadCsv'
    },
    dashboardPage: {
        chartSelectionButtonYear: 'chartSelectionButtonYear',
        chartDatePicker: 'chartDatePicker',
        downloadCsv: 'downloadCsv'
    },
    detailDashboardPage: {
        chartSelectionButtonYear: 'chartSelectionButtonYear',
        chartDatePicker: 'chartDatePicker',
        downloadCsv: 'downloadCsv',
        loadPhaseChart: 'loadPhaseChart',
        loadFilterableTable: 'loadFilterableTable',
        loadDisplayImage: 'loadDisplayImage',
        batteryTable: 'batteryTable',
        invPerformanceTable: 'invPerformanceTable',
        invAssetCharts: 'invAssetCharts',
        phaseChart: 'phaseChart',
        instantaneousValueTable: 'instantaneousValueTable',
        loadConfigImage: 'loadConfigImage',
        loadConfigTable: 'loadConfigTable',
        invMpptStrChart: 'invMpptStrChart',

        'specific-yield-comp-chart': 'specificYieldChart',
        'pr-comp-chart': 'prChart',
        'inv-mppt-string-chart': 'inverterLevelStringMpptEnergy',
        'inv-ac-energy-chart': 'inverterLevelActiveEnergy',
        'inv-ac-current-chart': 'inverterLevelACCurrent',
        'inv-ac-voltage-chart': 'inverterLevelACVoltage',
        'inv-str-current-chart': 'inverterLevelStringCurrent',
        'inv-str-voltage-chart': 'inverterLevelStringVoltage',
        'inv-str-characteristics-chart': 'inverterLevelStringIV',
        'inv-dc-current-chart': 'inverterLevelDCCurrent',
        'inv-dc-voltage-chart': 'inverterLevelDCVoltage',
        'inv-dc-characteristics-chart': 'inverterLevelDCIV',
    },
    detailedReportPage: {
        aggregatedReport: 'aggregatedReport',
        customizedReport: 'customizedReport',
        siteReport: 'siteReport'
    },
    maintenancePage: {
        maintenanceHeader: 'maintenanceHeader',
        activeMaintenance: 'activeMaintenance',
        pastMaintenance: 'pastMaintenance'
    },
    teamDetailPage: {
        dragNDrop: 'dragNDrop',
        teamList: 'teamList'
    },
    ticketsPage: {
        ticketsHeader: 'ticketsHeader',
        ticketTableButtons: 'ticketTableButtons',
        ticketTable: 'ticketTable'
    },
    forecastPage: {
        todaySolarTile: 'todaySolarTile',
        todayLoadTile: 'todayLoadTile',
        weeklySolarTile: 'weeklySolarTile',
        weeklyLoadTile: 'weeklyLoadTile',
        todaySolarForecastTile: 'todaySolarForecastTile',
        todayLoadForecastTile: 'todayLoadForecastTile',
        weeklySolarForecastTile: 'weeklySolarForecastTile',
        weeklyLoadForecastTile: 'weeklyLoadForecastTile',
        todaySolarChart: 'todaySolarChart',
        todayLoadChart: 'todayLoadChart',
        weeklySolarChart: 'weeklySolarChart',
        weeklyLoadChart: 'weeklyLoadChart',
        todayTempChart: 'todayTempChart',
        weeklyTempChart: 'weeklyTempChart'
    }
};

export const demoUserBlurImgPath = '/api/images/demo_access/';

export const WORKING = 'green';
// export const NOTWORKING = 'yellow;
export const DISABLED = 'gray';
export const DEAD = 'red';

export const generationList = ['Solar', 'Diesel Generator', 'Battery', 'Irradiance', 'Grid'];
export const generationListForPortfolio = ['Solar', 'Diesel Generator', 'Irradiance'];
export const consumptionList = ['Hvac', 'Lift', 'Light', 'Plug', 'Load'];

export const landingPageSkipAssetList = ['Plant', 'Irradiance', 'Load', 'Hvac', 'Lift', 'Light', 'Plug', 'Load']

export const displayNameMapping = [
    { assetName: 'Diesel Generator', displayName: 'GenSet' },
    { assetName: 'Plug', displayName: 'Plug Load' },
    { assetName: 'Plant-1', displayName: 'Fuel Saved' },
    { assetName: 'AC-power-a', displayName: 'Phase A' },
    { assetName: 'AC-power-b', displayName: 'Phase B' },
    { assetName: 'AC-power-c', displayName: 'Phase C' },
    { assetName: 'ac-power-a', displayName: 'Phase A' },
    { assetName: 'ac-power-b', displayName: 'Phase B' },
    { assetName: 'ac-power-c', displayName: 'Phase C' },
    // { assetName: 'DC-Power-BMS1', displayName: 'DC-Power' },
    { assetName: 'DC-Power-BMS1', displayName: 'Battery (DC)' },
    { assetName: 'State-Of-Charge', displayName: 'DC-Power' },
    { assetName: 'SoC-sys', displayName: 'SoC' },
    { assetName: 'load-1', displayName: 'Load-1' },
    { assetName: 'load-2', displayName: 'Load-2' }
    // { assetName: 'Battery', displayName: 'DC-Power' },
    // { assetName: 'SoH-sys', displayName: 'Discharging' }
];

export const displayNameByAssetType = {
    battery: [
        { assetName: 'ac-power', displayName: 'Battery (AC)' },
        { assetName: 'dc-power-bms1', displayName: 'Battery (DC)' },
    ]
};

export const notifierOptions: NotifierOptions = {
    position: {
        horizontal: { position: 'right', distance: 12 },
        vertical: { position: 'top', distance: 12 }
    },
    behaviour: { autoHide: 1500, showDismissButton: false },
    theme: 'material'
};

export const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const monthListForPortfolio = {
    0: 'january',
    1: 'february',
    2: 'march',
    3: 'april',
    4: 'may',
    5: 'june',
    6: 'july',
    7: 'august',
    8: 'september',
    9: 'october',
    10: 'november',
    11: 'december',
}

export const noDataColor = '#9a9a9a';

export const topLevelColor = {
    'Solar': '#febd4f', 'Irradiance': '#50B83C', 'GenSet': '#9C6ADE',
    'Wind': '#B7ECEC', 'price': '#093e79', 'Price': '#093e79',
    'Hvac': '#45b959', 'Lift': '#ca6985', 'Light': '#5e8af1', 'Grid': '#9cbfbb',
    'Load-1': '#83af70', 'Load-2': '#9fc08f', 'Load-3': '#bcd2b3', 'Load-4': '#a8bf9e',
    'Plug Load': '#a5af27', 'Load': '#83af70', 'Battery': '#57baff', 'DC-Power': '#57baff',
    'Forecast': '#c8c8c8', 'Irradiance Forecast': '#33521d',
    'SoC': '#0C6980', 'SoH': '#2EB5E0',
    'disabled': '#9a9a9a'
};

export const colorList = {
    solar: {
        'Irradiance-1': '#50B83C', 'Solar Inv-1': '#F7C9A1', 'Solar Inv-2': '#F7C781', 'Solar Inv-3': '#F8C471', 'Solar Inv-4': '#EAB268', 'Solar Inv-5': '#FFB973', 'Solar Inv-6': '#F4AD6E', 'Solar Inv-7': '#FFA54C', 'Solar Inv-8': '#FF9226', 'Solar Inv-9': '#EF8425', 'Solar Inv-10': '#FEA204', 'Solar Inv-11': '#FFAA00', 'Solar Inv-12': '#D37F05', 'Solar Inv-13': '#C6770E',
        'Solar Inv-14': '#D68910', 'Solar Inv-15': '#B57301', 'Solar Inv-16': '#9C640C', 'Solar Inv-17': '#895816', 'Solar Inv-18': '#BC6320', 'Solar Inv-19': '#AD5914', 'Solar Inv-20': '#A0510A', 'Solar Inv-21': '#F7C9A1', 'Solar Inv-22': '#F7C781', 'Solar Inv-23': '#F8C471', 'Solar Inv-24': '#EAB268', 'Solar Inv-25': '#FFB973', 'Solar Inv-26': '#F4AD6E', 'Solar Inv-27': '#FFA54C', 'Solar Inv-28': '#FF9226',
        'Solar Inv-29': '#EF8425', 'Solar Inv-30': '#FEA204', 'Solar Inv-31': '#FFAA00', 'Solar Inv-32': '#D37F05', 'Solar Inv-33': '#C6770E', 'Solar Inv-34': '#D68910', 'Solar Inv-35': '#B57301', 'Solar Inv-36': '#9C640C', 'Solar Inv-37': '#895816', 'Solar Inv-38': '#BC6320', 'Solar Inv-39': '#AD5914', 'Solar Inv-40': '#FEA204', 'Solar Inv-41': '#FFAA00', 'Solar Inv-42': '#D37F05', 'Solar Inv-43': '#C6770E',
        'Solar Inv-44': '#D68910', 'Solar Inv-45': '#B57301', 'Solar Inv-46': '#9C640C', 'Solar Inv-47': '#895816', 'Solar Inv-48': '#BC6320', 'Solar Inv-49': '#AD5914', 'Solar Inv-50': '#FEA204', 'Solar Inv-51': '#FFAA00', 'Solar Inv-52': '#D37F05', 'Solar Inv-53': '#C6770E', 'Solar Inv-54': '#D68910', 'Solar Inv-55': '#B57301', 'Solar Inv-56': '#9C640C', 'Solar Inv-57': '#895816', 'Solar Inv-58': '#BC6320', 'Solar Inv-59': '#AD5914'
    },
    dg: { 'Fuel Saved': '#50B83C', 'DG-1': '#D3BCF7', 'DG-2': '#C9B3F2', 'DG-3': '#BCA9EA', 'DG-4': '#A896E2', 'DG-5': '#9888D8', 'DG-6': '#887CD1', 'DG-7': '#8078CE', 'DG-8': '#7572CC', 'DG-9': '#6767C9', 'DG-10': '#5E5EB7', 'DG-11': '#5959B5', 'DG-12': '#5151AF', 'DG-13': '#4747AD', 'DG-14': '#4040A8', 'DG-15': '#3A3A9B', 'DG-16': '#313199', 'DG-17': '#2A2A93', 'DG-18': '#242484', 'DG-19': '#202075', 'DG-20': '#1B1B66' },
    wind: { 'Wind-1': '#6bb6ff', 'Wind-2': '#51a9ff', 'Wind-3': '#389dff', 'Wind-4': '#1e90ff', 'Wind-5': '#0483ff', 'Wind-6': '#0077ea', 'Wind-7': '#006ad1', 'Wind-8': '#cfe7ff', 'Wind-9': '#a7d4ff', 'Wind-10': '#6cb7ff', 'Wind-11': '#45a3ff', 'Wind-12': '#1e90ff', 'Wind-13': '#0a86ff', 'Wind-14': '#007df6' },
    // battery: { 'Batter-1': '#c0f0c0', 'Batter-2': '#91e491', 'Batter-3': '#71dc71', 'Batter-4': '#52d552', 'Batter-5': '#42d142', 'Batter-6': '#32cd32', 'Batter-7': '#2ebd2e', 'Batter-8': '#269e26', 'Batter-9': '#1f7e1f', 'Batter-10': '#175f17', 'Batter-11': '#5bd75b', 'Batter-12': '#70dc70', 'Batter-13': '#47d247', 'Batter-14': '#32cd32', 'Batter-15': '#28a428' },
    plug: { 'plug-1': '#ccffcc', 'plug-2': '#99ff99', 'plug-3': '#4cff4c', 'plug-4': '#00ff00', 'plug-5': '#00e500', 'plug-6': '#00b200', 'plug-7': '#009900', 'plug-8': '#007f00', 'plug-9': '#006600', 'plug-10': '#004c00' },
    load: { 'Load-1': '#fbb574', 'Load-2': '#fec18b', 'Load-3': '#ffcda2', 'Load-4': '#ffdab9', 'Load-5': '#ffe6d0', 'Load-6': '#fff2e7', 'Load-7': '#ffffff', 'Load-8': '#e1dbe1', 'Phase E': '#d5cdd5', 'Phase D': '#c1b5c0', 'Phase C': '#ad9dac', 'Phase B': '#998698', 'Phase A': '#867085' },
    grid: { 'Grid Import': '#9cbfbb', 'Grid Export': '#a1eae2' },
    battery: { 'Battery (AC)': '#57baff', 'Battery (DC)': '#57baff', 'SoC': '#0c6880', 'Charging': '#0C6980', 'Discharging': '#2EB5E0' },
    'battery (ac)': { 'AC-Power': '#57baff', 'SoC': '#0c6880', 'Charging': '#0C6980', 'Discharging': '#2EB5E0' },
    'battery (dc)': { 'DC-Power': '#57baff', 'SoC': '#0c6880', 'Charging': '#0C6980', 'Discharging': '#2EB5E0' }
};

export const energyGenerationElement = [
    { name: 'Solar', background: '#f4f4f4', image: '../../assets/img/solar-gray.png', detail_image: '../../assets/img/new_solar-colored.svg', currentPower: '--', state: false },
    { name: 'GenSet', background: '#f4f4f4', image: '../../assets/img/dg-gray.png', detail_image: '../../assets/img/new_dg_colored.svg', currentPower: '--', state: false },
    { name: 'Battery', background: '#f4f4f4', image: '../../assets/img/battery-gray.png', detail_image: '../../assets/img/battery-colored.png', currentPower: '--', state: false },
    { name: 'Grid', background: '#f4f4f4', image: '../../assets/img/grid-gray.png', detail_image: '../../assets/img/grid-colored.png', currentPower: '--', state: false },
    { name: 'Plugload', background: '#f4f4f4', image: '../../assets/img/grid-gray.png', detail_image: '../../assets/img/grid-colored.png', currentPower: '--', state: false },
    { name: 'Load', background: '#f4f4f4', image: '../../assets/img/grid-gray.png', detail_image: '../../assets/img/plug_load.jpg', currentPower: '--', state: false }
];

export const deviceNameList = {
    solar: 'Solar',
    battery: 'Battery',
    dg: 'Diesel Generator',
    grid: 'Grid',
    ev: 'EV',
    plug: 'Plug',
    wind: 'Wind',
    load: 'Load'
};

export const assetNameList = {
    'Solar': 'solar',
    'Battery': 'battery',
    'GenSet': 'dg',
    'Grid': 'grid',
    'wind': 'wind',
    'Wind': 'wind',
    'Load-1': 'load',
    'Load-2': 'load'
};

export const mpptDisplayName = { 'mppt1_power': 'MPPT-1', 'mppt2_power': 'MPPT-2', 'mppt3_power': 'MPPT-3', 'mppt4_power': 'MPPT-4' };

export const stringDisplayName = {
    'string1_power': 'String-1', 'string2_power': 'String-2', 'string3_power': 'String-3', 'string4_power': 'String-4',
    'string5_power': 'String-5', 'string6_power': 'String-6', 'string7_power': 'String-7', 'string8_power': 'String-8',
    'string9_power': 'String-9', 'string10_power': 'String-10', 'string11_power': 'String-11', 'string12_power': 'String-12'
}

export const loadAssetId = {
    totalLoad: ['totalload-1'],
    load_asset_id: ['load-1', 'load-2']
}

export const getEChartDefaultConfig = (): EChartOptionType => ({
    textStyle: {
        fontFamily: 'geomanistregular'
    },
    color: [],
    grid: {
        top: 30,
        left: 60,
        right: 60
    },
    legend: {
        bottom: 10,
        data: []
    },
    xAxis: {
        data: [],
        name: '',
        nameLocation: 'center',
        nameGap: 45,
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#e8e8e8']
            }
        },
        interval: 10,
        axisLabel: {}
    },
    tooltip: {},
    yAxis: [
        {
            name: '',
            nameLocation: 'center',
            nameGap: 45,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e8e8e8']
                }
            },
        }
    ],
    series: [],
    extra: {
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    }
});

export const pageNameMapping = {
    siteLandingPage: 'Landing-Page',
    dashboardPage: 'Asset-Dashboard-Page',
    detailDashboardPage: 'Detail-Asset-Dashboard-Page',
    forecastPage: 'Forecast-Page'
};

export const CustomValidation = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    contact_no: /(\+[0-9]{2})?[-. ]?\(?(([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})|([0-9]{5})[-. ]?([0-9]{5}))/,
    password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    url: /^(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    char_with_space: /^[A-Za-z ]*$/,
    char_special_chart_number: /^[A-Za-z0-9\-.,!\? ]*$/,
    chart_num_hyphen_space: /^[A-Za-z0-9\- ]*/,
    mac_address: /([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
    numbers_only: /^[0-9]*$/
};

export const APIXU_KEY = '7';
export const OPENCAGEDATA_KEY = '703';

export const loadImagePath = '/api/images/load_image/';
// export const secret = '29kMTI2QGaadtYWlsLmNvbSxhZG';
export const secret = 'qiydgf98';

export const AGM_API_KEY = 'q8675ce';

export const registerNameMap = {
    'default': {
        'solar': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'battery': ['AC-Power', 'ac-power', 'DC-Power-BMS1', 'irradiance'],
        'dg': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'ev': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'grid': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'wind': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'light': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'load': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'lift': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
        'hvac': ['AC-Power', 'ac-power', 'Irradiance', 'irradiance'],
    },
    // '116': {
    //     'battery': ['DC-Power-BMS1']
    // },
    '15': {
        'battery': ['State-Of-Charge']
    }
};

export const weatherIconList = {
    'showers': '../../assets/img/weather/rainy.png',
    'rain': '../../assets/img/weather/rainy.png',
    'fog': '../../assets/img/weather/foggy.png',
    'mostly cloudy': '../../assets/img/weather/cloudy.png',
    'cloudy': '../../assets/img/weather/cloudy.png',
    'sunny': '../../assets/img/weather/sunny.png',
    'mostly sunny': '../../assets/img/weather/sunny.png',
    'partly cloudy': '../../assets/img/weather/sunwithcloud.png',
    'clear': '../../assets/img/weather/misty.png',
    'few showers': '../../assets/img/weather/misty.png',
    'mostly clear': '../../assets/img/weather/misty.png',
    'wind': '../../assets/img/weather/windy.png',
    'thunderstorms': '../../assets/img/weather/thunder.png',
    'isolated thunderstorms': '../../assets/img/weather/thunder.png',
    'scattered thunderstorms': '../../assets/img/weather/thunder.png'
};

export const resolutionCSVUnits = {
    "AC-apppower": { "energy": "kVAh", "average": "kVA" },
    "AC-apppower-a": { "energy": "kVAh", "average": "kVA" },
    "AC-apppower-b": { "energy": "kVAh", "average": "kVA" },
    "AC-apppower-c": { "energy": "kVAh", "average": "kVA" },
    "AC-energy-total": { "energy": "kWh", "average": "kW" },
    "AC-Power": { "energy": "kWh", "average": "kW" },
    "AC-power-a": { "energy": "kWh", "average": "kW" },
    "AC-power-b": { "energy": "kWh", "average": "kW" },
    "AC-power-c": { "energy": "kWh", "average": "kW" },
    "AC-ReactivePower": { "energy": "kVARh", "average": "kVAR" },
    "AC-reactivepower-a": { "energy": "kVARh", "average": "kVAR" },
    "AC-reactivepower-b": { "energy": "kVARh", "average": "kVAR" },
    "AC-reactivepower-c": { "energy": "kVARh", "average": "kVAR" },
    "AC-V-a": { "energy": "Volt", "average": "Volt" },
    "AC-V-b": { "energy": "Volt", "average": "Volt" },
    "AC-V-c": { "energy": "Volt", "average": "Volt" },
    "AC-V-ab": { "energy": "Volt", "average": "Volt" },
    "AC-V-bc": { "energy": "Volt", "average": "Volt" },
    "AC-V-ca": { "energy": "Volt", "average": "Volt" },
    "AC-V-avg": { "energy": "Volt", "average": "Volt" },
    "AC-powerfactor": { "energy": "", "average": "" },
    "AC-powerfactor-a": { "energy": "", "average": "" },
    "AC-powerfactor-b": { "energy": "", "average": "" },
    "AC-powerfactor-c": { "energy": "", "average": "" },
    "Irradiance": { "energy": "Wh/m2", "average": "W/m2" },
    "Irradiance-tracker-axis": { "energy": "Wh/m2", "average": "W/m2" },
    "Power-MPPT1": { "energy": "kWh", "average": "kW" },
    "Power-MPPT2": { "energy": "kWh", "average": "kW" },
    "Power-MPPT3": { "energy": "kWh", "average": "kW" },
    "Power-MPPT4": { "energy": "kWh", "average": "kW" },
    "V-str-": { "energy": "Volt", "average": "Volt" },
    "I-str-": { "energy": "Amp", "average": "Amp" },
    "P-str-": { "energy": "kWh", "average": "kW" },
    "AC-I-a": { "energy": "Amp", "average": "Amp" },
    "AC-I-c": { "energy": "Amp", "average": "Amp" },
    "AC-I-N": { "energy": "Amp", "average": "Amp" },
    "AC-I-n": { "energy": "Amp", "average": "Amp" },
    "AC-I-gnd": { "energy": "Amp", "average": "Amp" },
    "AC-I-avg": { "energy": "Amp", "average": "Amp" },
    "AC-I-b": { "energy": "Amp", "average": "Amp" },
    "AC-freq": { "energy": "Hz", "average": "Hz" },
    "Inv-efficiency": { "energy": "%", "average": "%" },
    "Temp-inv": { "energy": "Celsius", "average": "Celsius" },
    "Temp-inverter": { "energy": "Celsius", "average": "Celsius" },
    "Temp-Module": { "energy": "Celsius", "average": "Celsius" },
    "Temp-ambient": { "energy": "Celsius", "average": "Celsius" },
    "AC-Apparent-Power": { "energy": "kVAh", "average": "kVA" },
    "DC-Power": { "energy": "kWh", "average": "kW" },
    "DC-V": { "energy": "Volt", "average": "Volt" },
    "DC-I": { "energy": "Amp", "average": "Amp" },
    "Frequency": { "energy": "Hz", "average": "Hz" }
};

// dashboard
/**
 * 1D: Sum(Avg) - 15M
 * 1W: Sum(Energy) - 1H
 * 1M: Sum(Energy) - 1H
 * 1Y: Sum(Energy) - 1H
 */



// detail dashboard
/**
 * 1D: Sum(Energy) - 15M
 * 1W: Sum(Energy) - 1H
 * 1M: Sum(Energy) - 1H
 * 1Y: Sum(Energy) - 1H
 */


