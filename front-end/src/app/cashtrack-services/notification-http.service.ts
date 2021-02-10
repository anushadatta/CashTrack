import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { variables } from './variables';

const NotiRoute: string = "/notifications/";

@Injectable({
  providedIn: 'root'
})
export class NotificationHttpService {

  constructor(private http: HttpClient) { }

  getNotification (email) {
    return this.http.get(variables.endpoint + NotiRoute + `getNotifications/${email}`);
  }
}
