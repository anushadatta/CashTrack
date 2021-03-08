import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { variables } from './variables';

interface PersonalExpense {
  label: string;
  tag: string;
  updated_at: number;
  created_at: number;
  expense_amount: number;
  user_id: string;
  bill_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalExpensesHttpService {

  constructor(private http: HttpClient) { }

  getPersonalExpenses (email) {
    return this.http.get(variables.endpoint + `/bills/getPersonalExp/${email}`);
  }

  updatePersonalExpenses(body) {
    return this.http.put<any>(variables.endpoint + `/bills/updatePersonalExp/${body.user_email}/${body.bill_id}`, body);
  }

  postPersonalExpenses(body: PersonalExpense) {
    console.log("Post request body: ", body);
    const headerDict = {
      'Content-Type': 'text/plain',
    } 
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post<PersonalExpense>(variables.endpoint + `/bills/createPersonalExp`, body, requestOptions);
  }
}
