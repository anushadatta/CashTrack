import { Component, OnInit } from '@angular/core';
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

  you_owe = [];
  you_are_owed = [];
  
  user_email: string;
  subSink: SubSink;

  shared_expenses = [
    {
      name : 'Pasta Express Lunch',
      amount: '8.60',
      category: 'Food',
      created_at: '6th Febraury, 2021', 
      author: 'mehul.kumar171@gmail.com',
      payers: ['amritaravishankar00@gmail.com'],
      type: '1',
      comments: "Please pay me fast"
    },
    {
      name: 'Crowded Bowl',
      amount: '5.80',
      category: 'Food',
      created_at: '2nd Febraury, 2021',
      author: 'amritaravishankar00@gmail.com',
      payers: ['mehul.kumar171@gmail.com'],
      type: '2',
      comments: "Pls pay me by next week"
    },
  ];

  check_owe_or_owed() {
    for (let expense of this.shared_expenses)
    {
      if (expense.author == "amritaravishankar00@gmail.com")
      {
        this.you_are_owed.push(expense);
      }
      else if(expense.payers.includes("amritaravishankar00@gmail.com"))
      {
        this.you_owe.push(expense);
      }
    }
    console.log(this.you_owe);
    console.log(this.you_are_owed);
  }

  constructor(private cookie: CookieService, private http: SharedExpensesHttpService) { 
    this.check_owe_or_owed();
  }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
    this.getSharedExpenseAuthor(this.user_email);
    this.getSharedExpensePayer(this.user_email);
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

}
