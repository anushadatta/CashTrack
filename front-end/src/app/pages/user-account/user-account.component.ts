import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../cashtrack-services/user-account-http.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  showLoadingSpinner = true;
  subSink: SubSink;
  
  user_name: string;
  user_email: string;
  user_img: string;

  limit_percent: number;
  limit_time: string;
  limit: string;

  constructor(
    private cookie: CookieService,
    private http: ConfigService
  ) { }

  ngOnInit(): void {  
    this.subSink = new SubSink();

    this.showLoadingSpinner = false;

    this.user_name = this.cookie.get('user-name');
    this.user_email = this.cookie.get('user-email');
    this.user_img = this.cookie.get('user-img');

    this.getUserAccountInfo(this.user_email);

    console.log(`got name from cookie ${this.user_name}`);

    this.limit_percent = 50;
    this.limit = "1000";
    this.limit_time = "weekly";
  }​

  getUserAccountInfo (user_email): void {
    this.subSink.sink = this.http.getUserInfo(user_email)
      .subscribe( (res) => {
        console.log(res);
      } ) 
  }

  changePercent (newVal): void {
    console.log(newVal);
  }

}
