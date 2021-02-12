import { Component, OnInit, Input } from '@angular/core';
import { NotificationHttpService } from "src/app/cashtrack-services/notification-http.service";
import { SubSink } from 'subsink';
import { CookieService } from 'ngx-cookie-service';
import '@angular/compiler';
import { CookieKeys, UserType } from 'src/app/common/enum';

interface Notifications {
  success: boolean;
  message: string;
  data: [{
    user_id: string;
    bill_id: any;
    type: string;
    message: string;
  }];
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})



export class NotificationsComponent implements OnInit {

  @Input() showNotification: boolean;
  @Input() user_email: string;

  notifications = [
    {title: "New Chat", sender:"Amrita Ravishankar", time:"6:41 p.m", date:"12th February, 2021"},
    {title: "Acknowledgement", sender:"Anusha Datta", time:"6:41 p.m", date:"12th February, 2021"},
    {title: "Acknowledgement", sender:"Anusha Datta", time:"6:41 p.m", date:"12th February, 2021"},
    {title: "Acknowledgement", sender:"Anusha Datta", time:"6:41 p.m", date:"12th February, 2021"},
  ]

  subSink: SubSink;
  itemList: Array<any>;

  constructor(
    private http: NotificationHttpService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.getNotifications();
  }


  openNotification(state: boolean) {
    console.log(state);

    this.showNotification = state;
  }

  getNotifications () {
    console.log(`noti user: ${this.user_email}`);
    this.subSink.sink = this.http.getNotification(this.user_email)
      .subscribe( (res) => {
        let res_obj: Notifications = JSON.parse(res.toString()); 
        console.log(res_obj.data);
        this.itemList = res_obj.data;
      }); 
  }

}