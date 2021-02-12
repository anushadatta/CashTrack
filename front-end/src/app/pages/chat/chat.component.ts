import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import {MatDialog} from '@angular/material/dialog';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { ChatService } from '../../cashtrack-services/chat-http.service';
import { ConfigService } from '../../cashtrack-services/user-account-http.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  showLoadingSpinner = true;
  subSink: SubSink;

  user_name: string;
  user_email: string;
  user_img: string;

  // Variable to determine chat message sender 
  me: boolean = false; 

  chat_data = [
    {
      user_1 : 'anushadatta@gmail.com',
      user_2 : 'amritaravishankar00@gmail.com',
      messages : [
        ['anushadatta@gmail.com', 'Hi, how are you?', '10:01PM, 10th Feb 2021'], 
        ['amritaravishankar00@gmail.com', 'All good, sup', '10:04PM, 10th Feb 2021'], 
        ['anushadatta@gmail.com', 'Nothing much', '10:10PM, 10th Feb 2021']
      ],
    },
    {
      user_1 : 'anushadatta@gmail.com',
      user_2 : ' mehul.kumar171@gmail.com',
      messages : [
        ['anushadatta@gmail.com', 'Hi, how are you?', '10:01PM, 10th Feb 2021'], 
        ['amritaravishankar00@gmail.com', 'All good, sup', '10:04PM, 10th Feb 2021'], 
        ['anushadatta@gmail.com', 'Nothing much', '10:10PM, 10th Feb 2021']
      ],
    },
    {
      user_1 : 'anushadatta@gmail.com',
      user_2 : 'amritaravishankar00@gmail.com',
      messages : [
        ['anushadatta@gmail.com', 'Hi, how are you?', '10:01PM, 10th Feb 2021'], 
        ['amritaravishankar00@gmail.com', 'All good, sup', '10:04PM, 10th Feb 2021'], 
        ['anushadatta@gmail.com', 'Nothing much', '10:10PM, 10th Feb 2021']
      ],
    },
  ]

  constructor(public dialog: MatDialog, private cookie: CookieService, private http: ChatService) { }

  ngOnInit(): void {
    this.subSink = new SubSink();

    this.showLoadingSpinner = false;

    this.user_name = this.cookie.get('user-name');
    this.user_email = this.cookie.get('user-email');
    this.user_img = this.cookie.get('user-img');

    console.log(`got name from cookie ${this.user_name}`);
    
  }

  checkMessageSender (user_email) {

    if (user_email === this.user_email)
      this.me = true;
    else
      this.me = false;
    
    console.log("Message sender updated, me is: " + this.me); 
  }

  newChat() {
    console.log("Dummy function: Create a new chat");
  }

}
