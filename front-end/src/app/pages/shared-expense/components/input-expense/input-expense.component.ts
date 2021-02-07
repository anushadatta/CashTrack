import { Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  category: string;
  amount: string;
  friend: string;
}

@Component({
  selector: 'app-input-expense',
  templateUrl: './input-expense.component.html',
  styleUrls: ['./input-expense.component.scss']
})

export class InputExpenseComponent implements OnInit {

  categories = ['Food', 'Travel', 'Shopping', 'Others'];
  category = 'Others';
  friend = "";

  friends = ['Anusha', 'Mehul']

  @Input() updateExpense: boolean;
  
  constructor(
    public dialogRef: MatDialogRef<InputExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }  

  addExpense():void {
    this.data.category = this.category;
    this.data.friend = this.friend;
    console.log(this.data);
  }
}

