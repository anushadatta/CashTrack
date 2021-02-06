import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  showLoadingSpinner = true;
  
  user_name: string;
  user_email: string;
  user_img: string;

  constructor(
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

    this.user_name = this.cookie.get('user-name');
    this.user_email = this.cookie.get('user-email');
    this.user_img = this.cookie.get('user-img');

    console.log(`got name from cookie ${this.user_name}`);

  }

}
