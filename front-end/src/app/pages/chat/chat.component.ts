import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import {MatDialog} from '@angular/material/dialog';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { ChatService } from '../../cashtrack-services/chat-http.service';
import { ConfigService } from '../../cashtrack-services/user-account-http.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})

export class ChatComponent implements OnInit {

  showLoadingSpinner = true;
  subSink: SubSink;

  user_name: string;
  user_email: string;
  user_img: string;

  current_friend_id: number = 0; 
  text_message: string = "";

  chat_data = [
    { id: 0,
      user_1 : 'anushadatta@gmail.com',
      user_2 : 'amritaravishankar00@gmail.com',
      user_2_name: 'Amrita Ravishankar',
      status: 'online',
      messages : [
        ['anushadatta@gmail.com', 'Hi, did you send me $ for Pasta Express?', '10:01PM, 10th Feb 2021'], 
        ['amritaravishankar00@gmail.com', 'Not yet, will do tonight!', '10:04PM, 10th Feb 2021'], 
        ['anushadatta@gmail.com', 'Oks thanks!', '10:10PM, 10th Feb 2021']
      ],
    },
    { id: 1,
      user_1 : 'anushadatta@gmail.com',
      user_2 : ' mehul.kumar171@gmail.com',
      user_2_name: 'Mehul Kumar',
      status: 'away',
      messages : [
        ['mehul.kumar171@gmail.com', 'Hi, sup?', '09:34AM, 27th Feb 2021'], 
        ['anushadatta@gmail.com', 'Nm, just studying', '10:01AM, 27th Feb 2021'], 
        ['mehul.kumar171@gmail.com', 'Coming for the tutorial?', '10:10PM, 27th Feb 2021'],
        ['anushadatta@gmail.com', 'Yep, see you!', '11:13PM, 27th Feb 2021'], 
      ],
    },
    { id: 2,
      user_1 : 'anushadatta@gmail.com',
      user_2 : 'amritaravishankar00@gmail.com',
      user_2_name: 'Alex Leong',
      status: 'online',
      messages : [
        ['alexleong@gmail.com', 'Heyyy', '10:01PM, 10th Feb 2021'], 
        ['anushadatta@gmail.com', 'Done with wiki?', '10:04PM, 10th Feb 2021'], 
        ['alexleong@gmail.com', 'not yet..', '10:10PM, 10th Feb 2021']
      ],
    },
  ]



  constructor(public dialog: MatDialog, private cookie: CookieService, private http: ChatService, public datepipe: DatePipe) { 
    
  }

  ngOnInit(): void {
    this.subSink = new SubSink();

    this.showLoadingSpinner = false;

    this.user_name = this.cookie.get('user-name');
    this.user_email = this.cookie.get('user-email');
    this.user_img = this.cookie.get('user-img');

    console.log(`got name from cookie ${this.user_name}`);
    
  }

  newChat() {
    console.log("Dummy function: Create a new chat");
  }

  newMessage(message) {
    console.log("new message entered " + message); 

    let current_date = new Date(); 
    let formatted_date = this.datepipe.transform(current_date, 'h:mm a, MMM d y');

    let new_message = [this.user_email, message, formatted_date];


    this.chat_data[this.current_friend_id].messages.push(new_message);
  }

  changeCurrentFriendID(id) {
    console.log("change friend id being called " + id);
    this.current_friend_id = id;
  }

}
