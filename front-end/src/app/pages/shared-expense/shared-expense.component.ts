import { Component, OnInit } from '@angular/core';
import {InputExpenseComponent} from './components/input-expense/input-expense.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shared-expense',
  templateUrl: './shared-expense.component.html',
  styleUrls: ['./shared-expense.component.scss']
})
export class SharedExpenseComponent implements OnInit {

  ngOnInit(): void {
  }

  name: string;
  category: string;
  amount: string;
  update: boolean = false;

  constructor(public dialog: MatDialog) { 
  }

  addNewExpense(expense?): void {
    console.log("Add/Edit new expense");
    console.log(expense);
    this.update = expense? true:false;
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      width: '500px',
      data: {name: expense? expense.name:this.name, category:expense? expense.category:this.category, amount:expense? expense.amount:this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
  }


}
