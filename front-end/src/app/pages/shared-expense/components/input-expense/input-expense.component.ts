import { Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SplitByComponent} from '../split-by/split-by.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

export interface ExpenseData {
  name: string;
  category: string;
  amount: string;
  friend_list: string[];
  split_or_not:string;
  split_by_method:string;
}

@Component({
  selector: 'app-input-expense',
  templateUrl: './input-expense.component.html',
  styleUrls: ['./input-expense.component.scss']
})

export class InputExpenseComponent implements OnInit {

  categories = ['Food', 'Travel', 'Entertainment', 'Shopping', 'Others'];
  your_friends = ['Anusha', 'Mehul'];
  pay_options = ['You owe Anusha money', 'Split Bill'];

  @Input() updateExpense: boolean;
  @Input() split_by_method = "";

  show_drop_or_not: boolean = true;
  
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<SplitByComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showDropOrNot() {
    if (this.data.friend_list.length > 1) {
      this.show_drop_or_not = false;
    }
  }

  ngOnInit(): void {
  }  

  addExpense():void {
    console.log("Expense data: ", this.data);
  }

  SplitByPopUp() {
    console.log("split");
    const dialogRef = this.dialog.open(SplitByComponent, {
      width: '500px',
      data: {split_by_method: this.split_by_method, expense_amount: this.data.amount, friends: this.data.friend_list}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

