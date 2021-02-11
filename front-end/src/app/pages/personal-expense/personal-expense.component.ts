import { Component, OnInit, Output } from '@angular/core';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import {MatDialog} from '@angular/material/dialog';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.scss']
})
export class PersonalExpenseComponent implements OnInit {

  name: string;
  category: string;
  amount: string;
  update: string = 'false';

  constructor(public dialog: MatDialog) { 
  }

  addNewExpense(): void {
    console.log("Add new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {name: this.name, category:this.category, amount:this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
  }

  ngOnInit(): void {

  }

  updatePersonalExpense() {
    console.log("update");
  }

}
