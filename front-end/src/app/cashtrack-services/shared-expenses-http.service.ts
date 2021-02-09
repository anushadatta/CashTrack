import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { variables } from './variables';

@Injectable({
  providedIn: 'root'
})
export class SharedExpensesHttpService {

  constructor(private http: HttpClient) { }

  getSharedExpensesAuthor (email) {
    return this.http.get(variables.endpoint + `/bills/getSharedExp/author/${email}`);
  }
  getSharedExpensesPayer (email) {
    return this.http.get(variables.endpoint + `/bills/getSharedExp/payer/${email}`);
  }
}
