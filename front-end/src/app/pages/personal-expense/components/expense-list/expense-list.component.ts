import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PersonalExpensesHttpService } from '../../../../cashtrack-services/personal-expenses-http.service';
import { SubSink } from 'subsink';
import {MatDialog} from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

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
      name : 'Pasta Express Dinner',
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

  constructor(public dialog: MatDialog, private cookie: CookieService, private http: PersonalExpensesHttpService) { }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
    this.getPersonalExpense(this.user_email);
  }

  deleteExpenseConfirm(expense) {  
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {               //Pass data object as a second parameter  
      data: { id: expense.id }, 
    });  

    dialogRef.afterClosed().subscribe(confirmresult => {  
      console.log(confirmresult);  
      if (confirmresult) {   
        this.onDeleteExpense(expense);  
        console.log("Delete confirm is approved by user.");  
      } else {  
        console.log("Delete confirm is cancelled by user.");  
      }  
    });  
  }  

  onDeleteExpense(index: number) {
    this.personal_expenses.splice(index, 1);
}

  getPersonalExpense (user_email) {
    this.subSink.sink = this.http.getPersonalExpenses(user_email)
      .subscribe( (res) => {
        console.log(res);
        let res_str = JSON.stringify(res); 
        let res_obj = JSON.parse(res_str);
        console.log(res_obj);
        // : PersonalExpenses = JSON.parse(res_str);
        // this.personal_expenses = res_obj.data;
        // console.log(this.personal_expenses);
      }); 
  }

  convertDate(timestamp) {
    let months = {1: "January", 2:"February", 3:"March", 4:"April", 5:"May", 6: "June", 7: "July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"};
    let theDate = new Date(timestamp);
    let month = theDate.getMonth() + 1;
    let date = theDate.getDate() - 1;
    let year = theDate.getFullYear();
    let date_postfix = this.datePostfix(date);
    let final_date = date + date_postfix + " " +  months[month] + ", " + year; 
    return final_date
  }

  datePostfix(d) {
    if (d > 3 && d < 21) 
      return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
}
