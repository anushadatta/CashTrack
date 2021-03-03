import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { NavigationEnd, Router } from "@angular/router";

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
      friends: {0: 'amritaravishankar00@gmail.com', 1: 'mehul@gmail.com', 2: 'alex00@gmail.com'}
    },
    { 
      group_id: 2,
      name : 'MDP Algorithms Team',
      friends: {0: 'amritaravishankar00@gmail.com', 1: 'mehul@gmail.com', 2: 'alex00@gmail.com'}
    },
    { 
      group_id: 3,
      name : 'Mala Dinner',
      friends: {0: 'amritaravishankar00@gmail.com', 1: 'mehul@gmail.com', 2: 'alex00@gmail.com'}
    },
  ]

  constructor(private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.showLoadingSpinner = false;

  }

  createGroup () {
    console.log("Create Group here");
  }

  
  moreInfo (group_id, group_name, friends) {
    this.cookie.set('selected-group_id', group_id, null, null, null, null, null);
    this.cookie.set('selected-group-name', group_name, null, null, null, null, null);
    this.cookie.set('selected-friends', JSON.stringify(friends), null, null, null, null, null);
    this.router.navigateByUrl('/dashboard/your-groups/details');
  }
  

}
