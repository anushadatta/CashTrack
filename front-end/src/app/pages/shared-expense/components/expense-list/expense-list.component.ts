import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedExpensesHttpService } from '../../../../cashtrack-services/shared-expenses-http.service';
import { SubSink } from 'subsink';

interface SharedExpenses {
  success: boolean;
  message: string;
  data: [{
    name: string;
    amount: number;
    category: string;
    created_at:string;
  }];
}

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  
  user_email: string;
  subSink: SubSink;

  @Input() expenses;
  shared_expenses1;
  
  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
    this.getSharedExpenseAuthor(this.user_email);
    this.getSharedExpensePayer(this.user_email);
    console.log(this.expenses);
    this.shared_expenses1 = this.expenses;
    console.log("FULL LIST: ", this.shared_expenses1);
  }

  constructor(private cookie: CookieService, private http: SharedExpensesHttpService) { 
  }

  getSharedExpenseAuthor (user_email) {
    this.subSink.sink = this.http.getSharedExpensesAuthor(user_email)
      .subscribe( (res) => {
        let res_str = JSON.stringify(res); 
        let res_obj: SharedExpenses = JSON.parse(res_str);   
      }); 
  }

  getSharedExpensePayer (user_email) {
    this.subSink.sink = this.http.getSharedExpensesPayer(user_email)
      .subscribe( (res) => {
        let res_obj: SharedExpenses = JSON.parse(JSON.stringify(res));
      }); 
  }

  SettleUp($event) {
    let index = this.shared_expenses1.indexOf($event);
    this.shared_expenses1.splice(index, 1);
  }

}
