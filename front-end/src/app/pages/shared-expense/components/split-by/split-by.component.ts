import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SplitMethodData {
  split_by_method:string;
  expense_amount:string;
  friends: string;
}

@Component({
  selector: 'app-split-by',
  templateUrl: './split-by.component.html',
  styleUrls: ['./split-by.component.scss']
})

export class SplitByComponent implements OnInit {

  split_by_method1 = "";
  friends = ['Anusha Datta', 'Mehul Kumar'];
  amount = 20;
  percent = 0;
  valueAvailable:boolean = false;
  share = 0;

  split_data = [{friend: 'Anusha Datta', split:0, amount:0}, {friend:'Mehul Kumar', split:0, amount:0}];

  currency_data = [{currency: 'INR', value:0.018}, {currency: 'USD', value:1.32}, {currency: 'AUD', value:1.028}, {currency: 'EUR', value:1.486}]
  selected_currency;

  constructor(public dialogRef: MatDialogRef<SplitByComponent>, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: SplitMethodData) {
   }

  ngOnInit(): void {
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
        split.amount = (split.split/total) * this.amount;
        console.log(split.amount);
      }
    }

    else if (button=="Percent") {
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        split.amount = (split.split/100) * this.amount;
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
  }
}
