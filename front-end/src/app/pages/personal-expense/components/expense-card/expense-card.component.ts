import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InputExpenseComponent} from '../input-expense/input-expense.component';
import {PersonalExpensesHttpService} from '../../../../cashtrack-services/personal-expenses-http.service';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})

export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEditCard: EventEmitter<void> = new EventEmitter();
  @Output() updateFlag: EventEmitter<boolean> = new EventEmitter();


  name: string;
  category: string;
  amount: string;
  update:boolean = false;
  add:boolean = true;

  constructor(public dialog: MatDialog, private http: PersonalExpensesHttpService) { }

  ngOnInit(): void {
  }

  convertDate(timestamp) {
    timestamp = parseFloat(timestamp);
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

  deleteExpense() {
    this.onDelete.emit();
   }

  editExpense(expense): void {
    this.update = true;
    this.add = false;
    console.log("Edit new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {name: expense.label, category:expense.tag, amount:expense.expense_amount, update:this.update, add: this.add}
    });

    console.log(expense);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
    this.postUpdatedExpense(expense);
  }

  postUpdatedExpense(expense) {
    console.log("post expense");
  //   let url = "kjalj";
  //   this.http.updatePersonalExpenses(url, { title: 'Angular POST Request Example' }).subscribe(data => {
  //       this.name = expense.name;
  //       this.category = expense.category;
  //       this.amount = expense.amount
  //   })
  }
}
