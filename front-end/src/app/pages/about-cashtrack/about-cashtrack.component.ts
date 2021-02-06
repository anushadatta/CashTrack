import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-about-cashtrack',
  templateUrl: './about-cashtrack.component.html',
  styleUrls: ['./about-cashtrack.component.scss']
})

export class AboutCashtrackComponent implements OnInit {

  showLoadingSpinner = true;

  constructor() { }

  ngOnInit(): void {
    this.showLoadingSpinner = false; 
  }

}
