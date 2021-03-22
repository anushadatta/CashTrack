import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', './scss/paper-dashboard.scss']
})
export class LandingComponent implements OnInit {
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  showLoadingSpinner = true;

  public spending: number;
  public spendingLimit: number;
  public spendingTimeline: string;
  public spendingAmount: number;

  constructor(private cookie: CookieService){}

    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.showLoadingSpinner = false;

      
      this.spendingTimeline = this.cookie.get("limit-time").toUpperCase();
      this.spendingAmount = Number(this.cookie.get("limit-value"));

      this.spending = 800;

      // calculation for limit percent
      this.spendingLimit = 100-((this.spendingAmount-this.spending)/this.spendingAmount)*100;


      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
          datasets: [
            {
              borderColor:   '#ef8157',
              backgroundColor: "#ef8157",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [120, 150, 80, 200, 140, 160, 160, 150, 120, 100]
            },
            {
              borderColor:   '#6bd098',
              backgroundColor: '#6bd098',
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [280, 250, 150, 275, 245, 300, 265, 300, 320, 350]
            },
            {
              borderColor:  '#4acccd',
              backgroundColor: "#4acccd",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: '#fcc468',
              backgroundColor: '#fcc468',
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            },
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3, 4],
          datasets: [{
            label: "Categories",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#6bd098',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 340,120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }
}