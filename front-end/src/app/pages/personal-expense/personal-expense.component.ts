import { Component, OnInit, Output } from '@angular/core';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from '../../cashtrack-services/user-account-http.service';
import { SubSink } from 'subsink';
import { PersonalExpensesHttpService } from '../../cashtrack-services/personal-expenses-http.service';

interface PersonalExpense {
  user_id: string;
  bill_id: number;
  label: string;
  tag: string;
  created_at: number;
  updated_at: number;
  expense_amount: number;
}

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.scss']
})
export class PersonalExpenseComponent implements OnInit {

  label: string;
  tag: string;
  expense_amount: number;
  update: boolean = false;
  created_at: number;
  add: boolean = true;
  personal_expense = [{label:"Prime Supermarket", expense_amount:15.20, tag:"Food", created_at:1612281600000}, {label:"Crowded Bowl", expense_amount:4.70, tag:"Food", created_at:1612296900000}];

  subSink: SubSink;
  user_email: string;

  constructor(public dialog: MatDialog, public http: HttpClient, private cookie: CookieService,
    private userService: ConfigService, private personalExpenseService: PersonalExpensesHttpService) { 
  }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
  }

  addNewExpense(): void {
    console.log("Add new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {label: this.label, tag:this.tag, expense_amount:this.expense_amount, created_at: this.created_at, add:this.add, update: this.update}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("Parent: ", result);
      if (result!=undefined) {
        this.personal_expense.unshift(result);
      }  
    });
  }

}
