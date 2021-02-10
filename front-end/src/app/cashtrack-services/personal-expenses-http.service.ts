import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { variables } from './variables';

@Injectable({
  providedIn: 'root'
})
export class PersonalExpensesHttpService {

  constructor(private http: HttpClient) { }

  getPersonalExpenses (email) {
    return this.http.get(variables.endpoint + `/bills/getPersonalExp/${email}`);
  }

  updatePersonalExpenses(email, bill_id) {
    return this.http.get(variables.endpoint + `/bills/updatePersonalExp/${email}/${bill_id}`);
  }
}
