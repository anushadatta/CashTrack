import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  showLoadingSpinner = true;

  constructor() { }

  ngOnInit(): void {
    this.showLoadingSpinner = false; 
    
  }

}
