import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { variables } from './variables';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ConfigService {

  constructor(private http: HttpClient) { }

  getUserInfo (email) {
    return this.http.get(variables.endpoint + `/users/getInfo/${email}`);
  }

}