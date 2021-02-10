import { Component, OnInit } from '@angular/core';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.scss']
})
export class PersonalExpenseComponent implements OnInit {

  name: string;
  category: string;
  amount: string;
  update: boolean = false;

  constructor(public dialog: MatDialog) { 
  }

  addNewExpense(expense?): void {
    console.log("Add/Edit new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {name: expense? expense.name:this.name, category:expense? expense.category:this.category, amount:expense? expense.amount:this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
  }

  ngOnInit(): void {

  }

  checkUpdate() {
    
  }

}
