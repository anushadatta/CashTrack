import { Component, OnInit, Inject, Input, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

export interface DialogData {
  label: string;
  tag: string;
  expense_amount: number;
  created_at: number;
  add:boolean;
  update:boolean;
}

@Component({
  selector: 'app-input-expense',
  templateUrl: './input-expense.component.html',
  styleUrls: ['./input-expense.component.scss']
})

export class InputExpenseComponent implements OnInit {

  categories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Others'];
  category = '';

  updateExpense: string = 'false';

  constructor(
    public dialogRef: MatDialogRef<InputExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public http: HttpClient) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }   

  addExpense(): void{
    this.dialogRef.close(this.data);
    console.log("Data : ", this.data);
    this.data.created_at = Date.now();
  }
}

