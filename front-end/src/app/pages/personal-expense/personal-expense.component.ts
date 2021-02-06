import { Component, OnInit } from '@angular/core';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-personal-expense',
  templateUrl: './personal-expense.component.html',
  styleUrls: ['./personal-expense.component.scss']
})
export class PersonalExpenseComponent implements OnInit {

  private input: InputExpenseComponent;

  name: string;
  category: string;
  amount: string;

  constructor(public dialog: MatDialog) { 
  }

  addNewExpense(): void {
    console.log("Add new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      width: '250px',
      data: {name: this.name, category: this.category, amount: this.amount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
  }

  ngOnInit(): void {

  }

}
