import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() showNotification: boolean;
  constructor() { }

  ngOnInit(): void {
  }


  openNotification(state: boolean) {
    console.log(state);

    this.showNotification = state;
  }

}