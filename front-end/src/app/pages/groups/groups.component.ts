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
      friends: [['Amrita Ravishankar', 'amritaravishankar00@gmail.com'], 
                ['Mehul Kumar', 'mehul.kumar171@gmail.com'], 
                ['Alex Leong', 'alexleong21997@gmail.com'],
                ['Daniel Loe', 'loe.daniel97@gmail.com'], 
                ['Elliott Ong', 'airwayaway@gmail.com'], 
                ['Nicklaus Tan', 'nick0013@e.ntu.edu.sg'], 
                ['S Sri Kalki', 'harish@gmail.com']] 
    },
    { 
      group_id: 2,
      name : 'MDP Algorithms Team',
      friends: [['Ritik Bhatia', 'bhatia.ritik5@gmail.com'], 
                ['Insyirah Nur Lukeman', 'mehul.kumar171@gmail.com']], 
    },
    { 
      group_id: 3,
      name : 'Mala Dinner',
      friends: [['Mallika Datta', 'mallika.datta25@gmail.com'],
                ['Dhruv Kapoor', 'dkaps@gmail.com'], 
                ['Khushi Singhal', 'khushaa24@gmail.com'], 
                ['Aditya Menon', 'aditya_menon06@gmail.con']], 
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
