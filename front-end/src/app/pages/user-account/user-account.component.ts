import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

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

  }

  getUserAccountInfo (user_email) {
    this.subSink.sink = this.http.getUserInfo(user_email)
      .subscribe( (res) => {
        console.log(res);
      } ) 

  }

}
