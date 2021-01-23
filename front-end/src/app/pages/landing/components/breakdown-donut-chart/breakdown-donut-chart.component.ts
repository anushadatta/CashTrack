import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { getEChartDefaultConfig, noDataColor, topLevelColor } from 'src/app/common/variable';

@Component({
  selector: 'app-breakdown-donut-chart',
  templateUrl: './breakdown-donut-chart.component.html',
  styleUrls: ['./breakdown-donut-chart.component.css', '../../landing.component.css']
})
export class BreakdownDonutChartComponent implements OnInit, OnDestroy {

  @Input('data') sourceData: Observable<any>;

  // @ViewChild('chartDiv') chartDiv: ElementRef;
  myChart;
  chartData;

  subscription: Subscription;
  options

  ngOnInit(): void {

    this.subscription = this.sourceData.subscribe(chartData => {

      if (chartData == 'resize-chart') {
        this.onResize();
      } else {
        this.chartData = {};
        this.chartData = chartData;
        this.funCreateChart();
      }
    });

  }

  onChartInit(e) {
    this.myChart = e
  }

  // ngAfterViewInit() {
  //   this.subscription = this.sourceData.subscribe(chartData => {

  //     if (chartData == 'resize-chart') {
  //       this.onResize();
  //     } else {
  //       this.chartData = {};
  //       this.chartData = chartData;
  //       this.funCreateChart();
  //     }
  //   });
  // }

  /**
   * create bar chart using data
   */
  funCreateChart() {
    this.options = getEChartDefaultConfig();

    this.options.tooltip = {
      formatter: text => {
        let unit = ' kWh';

        if (this.chartData.convertToMw) {
          unit = 'MWh';
        }

        let tooltip = text.marker + ' ' + text.name +
          ' : ' + text.value.toFixed(2) + ' ' + unit;
        return tooltip;
      }
    };

    this.options.legend = undefined;

    this.options.color = [];
    const data = [];

    if (this.chartData.data.length <= 0) {
      data.push({ name: 'no data', value: 100, hoverAnimation: false });
      delete this.options.tooltip;
      this.options.color.push(noDataColor);
    }

    for (const column of this.chartData.data) {
      this.options.color.push(topLevelColor[column.asset_name]);
      data.push({ name: column.asset_name, value: column.energy });
    }

    delete this.options.yAxis;
    delete this.options.xAxis;

    this.options.series = [{
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      itemStyle: this.options.extra,
      data
    }];
  }

  onResize() {
    if (this.myChart) {
      this.myChart.resize();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
