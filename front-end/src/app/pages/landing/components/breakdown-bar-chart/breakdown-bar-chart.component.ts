import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { getEChartDefaultConfig, topLevelColor } from 'src/app/common/variable';

@Component({
  selector: 'app-breakdown-bar-chart',
  templateUrl: './breakdown-bar-chart.component.html',
  styleUrls: ['./breakdown-bar-chart.component.css', '../../landing.component.css']
})
export class BreakdownBarChartComponent implements OnInit, OnDestroy {

  @Input('data') sourceData: Observable<any>;

  isEmptyData: boolean = false;

  // @ViewChild('chartDiv') chartDiv: ElementRef;
  myChart;
  chartData;
  options

  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.sourceData.subscribe(chartData => {

      if (chartData == 'resize-chart') {
        this.onResize();
      } else {

        this.chartData = {};
        this.getData(chartData);
      }
    });
  }

  onChartInit(event) {
    this.myChart = event;
  }

  /**
   * create empty chart with axis
   */
  funCreateEmptyChart() {
    this.options = getEChartDefaultConfig();
    this.isEmptyData = true;
    // this.myChart = echarts.init(this.chartDiv.nativeElement);
    // this.myChart.setOption(this.options, true);
  }

  /**
   * calculate chart data
   * @param chartData chart data
   */
  getData(chartData) {
    let data = {};
    let maxValue = 0;

    if (chartData.columns) {
      this.isEmptyData = false;

      for (const column of chartData.columns) {
        const assetData = chartData.data.map(d => d.data[column]);

        // get max value for battery asset (to prevent reverse bar chart)
        const max = Math.max(...assetData);

        if (max > maxValue) {
          maxValue = max;
        }

        data[column] = assetData;
      }
    } else {
      // create empty chart
      this.funCreateEmptyChart();
      return;
    }

    this.chartData.columns = chartData.columns;
    this.chartData.dateArray = chartData.dateArray;
    this.chartData.data = data;
    this.chartData.maxValue = maxValue;
    this.chartData.chartAxisFormat = chartData.chartAxisFormat;

    this.funCreateChart();
  }

  /**
   * create bar chart using data
   */
  funCreateChart() {
    this.options = getEChartDefaultConfig();

    this.options.legend.data = this.chartData.columns;
    this.options.xAxis.data = this.chartData.dateArray;

    this.options.grid.left = 80;
    this.options.grid.right = 40;

    // hide grid
    this.options.xAxis.splitLine.show = false;
    this.options.yAxis[0].splitLine.show = false;

    this.options.xAxis.axisLabel = {
      formatter: value => moment.utc(value).format(this.chartData.chartAxisFormat)
    };

    this.options.yAxis[0].name = 'Energy (kWh)';
    this.options.yAxis[0].nameGap = 55;

    if (this.chartData.maxValue < 10) {
      this.options.yAxis[0].max = 10;
    }

    this.options.tooltip = {
      formatter: text => {
        let unit = ' kWh';

        let tooltip = text.marker + ' ' + text.seriesName +
          ' : ' + text.value + ' ' + unit;
        return tooltip;
      }
    };

    this.options.series = [];
    this.options.color = [];

    for (const column of this.chartData.columns) {
      this.options.series.push({
        name: column,
        type: 'bar',
        itemStyle: this.options.extra,
        data: this.chartData.data[column]
      });
      this.options.color.push(topLevelColor[column]);
    }

    // this.myChart = echarts.init(this.chartDiv.nativeElement);
    // this.myChart.setOption(this.options, true);
  }

  onResize() {
    if (this.myChart) {
      this.myChart.resize();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
