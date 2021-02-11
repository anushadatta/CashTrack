import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  showLoadingSpinner = true;

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

  constructor() { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

  }

  addNewFriends () {
    console.log("Add friends here");
  }

  moreInfo (friend_email) {
    console.log("Need more Info about " + friend_email);
  }

}
