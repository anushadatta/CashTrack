import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InputExpenseComponent} from '../input-expense/input-expense.component';

interface PersonalExpense {
  label: string;
  tag: string;
  updated_at: string;
  created_at: string;
  expense_amount: number;
  user_id: string;
  bill_id: number;
}

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})

export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEditCard: EventEmitter<void> = new EventEmitter();
  @Output() sendOld: EventEmitter<void> = new EventEmitter();

  name: string;
  category: string;
  amount: string;
  update:boolean = false;
  add:boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  convertDate(timestamp) {
    timestamp = parseFloat(timestamp);
    let months = {1: "January", 2:"February", 3:"March", 4:"April", 5:"May", 6: "June", 7: "July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"};
    let theDate = new Date(timestamp);
    let month = theDate.getMonth() + 1;
    let date = theDate.getDate();
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
      data: {label: expense.label, tag:expense.tag, expense_amount:expense.expense_amount, update:this.update, add: this.add}
    });
    this.sendOld.emit(expense);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("Card expense: ", result);
      this.onEditCard.emit(result);
    });
  }
}
