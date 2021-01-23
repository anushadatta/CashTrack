export interface ChartPoint {
  time: string;
  energy: number;
  asset_name: string;
}

export interface ForecastChartData {
  [propName: string]: ChartPoint[];
}

export interface ForecastResponse {
  lastPointCount: number;
  data: ForecastChartData;
  forecastData: ForecastChartData;
}
