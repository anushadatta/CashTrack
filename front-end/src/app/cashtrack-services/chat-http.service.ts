import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { variables } from './variables';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private http: HttpClient) { }

  getChat (email) {
    return this.http.get(variables.endpoint + `/bills/getPersonalExp/${email}`);
  }

}