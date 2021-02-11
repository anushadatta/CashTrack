import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  showLoadingSpinner = true;

  groups_list = [
    { 
      group_id: 1,
      name : 'Advanced Software Engineering',
      friends: ['amritaravishankar00@gmail.com', 'mehul@gmail.com', 'alex00@gmail.com']
    },
    { 
      group_id: 2,
      name : 'MDP',
      friends: ['amritaravishankar00@gmail.com', 'mehul@gmail.com', 'alex00@gmail.com']
    },
    { 
      group_id: 3,
      name : 'Mala',
      friends: ['amritaravishankar00@gmail.com', 'mehul@gmail.com', 'alex00@gmail.com']
    },
  ]

  constructor() { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

  }

  createGroup () {
    console.log("Create Group here");
  }

  moreInfo (group_id) {
    console.log("Need more Info about group " + group_id);
  }

}
