import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { MatDialog } from '@angular/material/dialog';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  showLoadingSpinner = true;

  friend_email: string;
  invite: boolean = true;

  friends_list = [
    {
      name : 'Amrita Ravishankar',
      email: 'amritaravishankar00@gmail.com',
      is_friend: true,
    },
    {
      name : 'Mehul Kumar',
      email: 'mehul@gmail.com',
      is_friend: true,
    },
    {
      name : 'Alex',
      email: 'alex00@gmail.com',
      is_friend: true,
    },
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

  }

  addNewFriends () {
    console.log("Add friends here");

    const dialogRef = this.dialog.open(AddFriendComponent, {
      data: {friend_email: this.friend_email, invite: this.invite}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ');
      console.log('Result is ' + result);
    });
  }

  moreInfo (friend_email) {
    console.log("Need more Info about " + friend_email);
  }

}
