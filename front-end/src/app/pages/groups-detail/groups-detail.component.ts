import { Component, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { SubSink } from 'subsink';
import { NavigationEnd, Router } from "@angular/router";

import { MatDialog } from '@angular/material/dialog';
import {EventEmitter} from 'events';

import Chart from 'chart.js';

@Component({
  selector: 'app-groups-detail',
  templateUrl: './groups-detail.component.html',
  styleUrls: ['./groups-detail.component.css', '../landing/scss/paper-dashboard.scss']
})

export class GroupsDetailComponent implements OnInit {

  showLoadingSpinner = true;
  subSink: SubSink;

  user_name: string = '';
  user_email: string = '';
  
  group_id: string = '';
  group_name: string = '';
  friends: string[];
  

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  constructor(public dialog: MatDialog, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;
    this.subSink = new SubSink();

    this.user_name = this.cookie.get('user-name');
    this.user_email = this.cookie.get('user-email');

    this.group_id = this.cookie.get('selected-group_id');
    this.group_name = this.cookie.get('selected-group-name');
    this.friends = JSON.parse(this.cookie.get('selected-friends'));
    this.chartColor = "#FFFFFF";
    this.showLoadingSpinner = false;

    console.log(this.friends);



    let speedCanvas = document.getElementById("speedChart1");

    var dataFirst = {
      data: [0, -19, 15, 20, 30, -35, 0, 40, 50, -25, 30, 50, 70],
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
      datasets: [dataFirst]
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

  goBack () {
    this.cookie.delete('selected-group_id');
    this.cookie.delete('selected-group_name');
    this.cookie.delete('selected-friends');
    this.router.navigateByUrl('/dashboard/your-groups');
  }

  deleteFriend(friend_name, friend_email) {
    console.log("delete friend" + friend_name, friend_email);

    for(var i = 0; i< this.friends.length; i++) { 

      if (this.friends[i][1] == friend_email) {
        this.friends.splice(i, 1);
      } 
   }
  }

  addFriend() {
    console.log("add new friend to group here"); 
  }

  deleteGroup() {
    console.log("delete group here"); 
  }

}
