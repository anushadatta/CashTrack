import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SplitMethodData {
  split_by_method: string;
}

@Component({
  selector: 'app-split-by',
  templateUrl: './split-by.component.html',
  styleUrls: ['./split-by.component.scss']
})

export class SplitByComponent implements OnInit {

  methods = ['Equally', 'Shares', 'Amount'];
  split_by_method = "";
  split_by_method1 = "";
  friends = ['Anusha Datta', 'Mehul Kumar'];
  amount = 20;
  percent = 0;
  valueAvailable:boolean = false;
  share = 0;

  split_data = [{friend: 'Anusha Datta', split:0, amount:0}, {friend:'Mehul Kumar', split:0, amount:0}];

  constructor(public dialogRef: MatDialogRef<SplitByComponent>, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: SplitMethodData) {
    console.log("In constructor: ", this.data);
   }

  ngOnInit(): void {
  }

  onNoClickSplit(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.data.split_by_method = this.split_by_method;
    console.log(this.data);
  }

  getPercent() {
    this.percent = parseFloat((<HTMLInputElement>document.getElementById("share-input")).value);
    console.log(this.percent)
    return this.percent;
  }

  onCalculate(button) {
    console.log(button);
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
      }
    } 
    else if (button=="Custom") {
      for (let split of this.split_data) {
        split.split = parseFloat((<HTMLInputElement>document.getElementById(split.friend)).value);
        split.amount = split.split;
      }
    } 
    this.valueAvailable = true;
  }


}
