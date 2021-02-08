import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ConfigService {

  endpoint = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  getUserInfo (email) {
    return this.http.get(this.endpoint.concat(`/users/getInfo/${email}`));
  }

}