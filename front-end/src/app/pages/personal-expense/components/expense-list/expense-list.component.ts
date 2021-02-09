import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PersonalExpensesHttpService } from '../../../../cashtrack-services/personal-expenses-http.service';
import { SubSink } from 'subsink';
import { DateTimeISO8601 } from 'aws-sdk/clients/marketplacecatalog';

interface PersonalExpenses {
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

  @Input() editExpense;
  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  subSink: SubSink;
  user_email: string;
  // personal_expenses = [];
  personal_expenses = [
    {
      name : 'Pasta Express Diner',
      amount: '15.80',
      category: 'Food',
      created_at: '6th Febraury, 2021'
    },
    {
      name: 'Crowded Bowl',
      amount: '5.80',
      category: 'Food',
      created_at: '2nd Febraury, 2021'
    },
    {
      name: 'H&M',
      amount: '50.25',
      category: 'Shopping',
      created_at: '1st Febraury, 2021'
    },
  ]

  constructor(private cookie: CookieService, private http: PersonalExpensesHttpService) { }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
    this.getPersonalExpense(this.user_email);
  }

  onDeleteExpense(index: number) {
    this.personal_expenses.splice(index, 1);
}

  onEditExpense(expense){
    this.editExpense = expense;
    this.callParent();
  }

  callParent() {
    this.onEdit.emit(this.editExpense);
  }

  getPersonalExpense (user_email) {
    this.subSink.sink = this.http.getPersonalExpenses(user_email)
      .subscribe( (res) => {
        console.log(res);
        let res_str = JSON.stringify(res); 
        let res_obj: PersonalExpenses = JSON.parse(res_str);
        // this.personal_expenses = res_obj.data;
        // console.log(this.personal_expenses);
      } ) 

  }


}
