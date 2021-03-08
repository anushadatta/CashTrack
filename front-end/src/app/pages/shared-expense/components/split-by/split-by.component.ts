import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SplitMethodData {
  split_by_method:string;
  expense_amount:number;
  friends: string[];
  split_data: any[];
}

@Component({
  selector: 'app-split-by',
  templateUrl: './split-by.component.html',
  styleUrls: ['./split-by.component.scss']
})

export class SplitByComponent implements OnInit {

  split_by_method1 = "";
  friends = [];
  amount = 20;
  percent = 0;
  valueAvailable:boolean = false;
  share = 0;
  lengthFriends = 0;
  splitEqual = 0;

  split_data1 = [{friend: 'Anusha Datta', split:0, amount:0}, {friend:'Mehul Kumar', split:0, amount:0}];
  split_data = [];

  currency_data = [{currency: 'INR', value:0.018}, {currency: 'USD', value:1.32}, {currency: 'AUD', value:1.028}, {currency: 'EUR', value:1.486}]
  selected_currency;

  constructor(public dialogRef: MatDialogRef<SplitByComponent>, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: SplitMethodData) {
   }

  ngOnInit(): void {
    console.log(this.data.friends);
    this.friends = this.data.friends;
    this.lengthFriends = this.friends.length;
    this.splitEqual= (1/this.lengthFriends) * this.data.expense_amount;
    for(let f of this.friends) {
      let split_ele = {friend: f, split: 0, amount: 0};
      this.split_data.push(split_ele);
    }
  }

  onNoClickSplit(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.data.split_by_method = this.split_by_method1;
    console.log(this.data);
  }

  onCalculate(button) {
    if(button==="Shares")
    {
      let total = 0;
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        console.log(split.split);
        total += split.split;
      }
      console.log(total)

      for (let split of this.split_data) {
        split.amount = (split.split/total) * this.data.expense_amount;
        console.log(split.amount);
      }
    }

    else if (button=="Percent") {
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        split.amount = (split.split/100) * this.data.expense_amount;
        split.amount = Math.round(split.amount * 100) / 100
      }
    } 

    else if (button=="Custom") {
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        split.amount = split.split;
        split.amount = Math.round(split.amount * 100) / 100
      }
    } 

    else if (button=="Currency") {
      console.log(this.selected_currency)
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        for (let currency of this.currency_data)
        {
          if(this.selected_currency === currency.currency)
          {
            console.log(currency.value);
            split.amount = split.split * currency.value;
            split.amount = Math.round(split.amount * 100) / 100;
            break;
          }
        }       
      }
    } 
    this.valueAvailable = true;
    this.data.split_data = this.split_data;
  }
}
