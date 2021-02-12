import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { NavigationEnd, Router } from "@angular/router";

import { MatDialog } from '@angular/material/dialog';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-friends-detail',
  templateUrl: './friends-detail.component.html',
  styleUrls: ['./friends-detail.component.css']
})
export class FriendsDetailComponent implements OnInit {

  showLoadingSpinner = true;
  friend_email: string = '';

  constructor(public dialog: MatDialog, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

    this.friend_email = this.cookie.get('selected-friend');
  }

  goBack () {
    this.cookie.delete('selected-friend');
    this.router.navigateByUrl('/dashboard/your-friends');
  }

}
