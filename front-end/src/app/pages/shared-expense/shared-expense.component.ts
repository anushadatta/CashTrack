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
  amount: number;
  created_at:string;
  update: boolean = false;
  split_data = [];
  
  // type 2 - you are owed
  // type 1 - you owe
  shared_expenses = [
    {
      name : 'Pasta Express Lunch',
      split_data: [{friend:'amritaravishankar00@gmail.com', amount: '4.10'}],
      amount: '4.10',
      category: 'Food',
      created_at: '6th Febraury, 2021', 
      author: 'mehul.kumar171@gmail.com',
      payers: ['amritaravishankar00@gmail.com'],
      type: '1',
      comments: [
        {name: "Mehul Kumar", comment: "Pls pay me by next week"}]
    },
    {
      name : 'Cab to MBS',
      split_data: [{friend:'amritaravishankar00@gmail.com', amount: '17.20'}],
      amount: '17.20',
      category: 'Travel',
      created_at: '4th Febraury, 2021', 
      author: 'daniel@gmail.com',
      payers: ['amritaravishankar00@gmail.com'],
      type: '1',
      comments: [
        {name: "Anusha Datta", comment: "Pls pay me fast"}]
    },
    {
      name: 'Movie Night',
      split_data: [{friend:'mehul.kumar171@gmail.com', amount: '21.20'}],
      amount: '21.20',
      category: 'Entertainment',
      created_at: '2nd Febraury, 2021',
      author: 'amritaravishankar00@gmail.com',
      payers: ['mehul.kumar171@gmail.com'],
      type: '2', 
      comments: [
        {name: "Amrita Ravishankar", comment: "Pls pay me by next week"},
        {name:"Mehul Kumar", comment: "Sure"}]
    },
    {
      name: 'Coins for Laundry',
      split_data: [{friend:'daniel@gmail.com', amount: '4.30'}],
      amount: '4.30',
      category: 'Other',
      created_at: '2nd Febraury, 2021',
      author: 'amritaravishankar00@gmail.com',
      payers: ['daniel@gmail.com'],
      type: '2',
      comments: [
        {name: "Mehul Kumar", comment: "Pls pay me by next week"}],
    },
  ];

  total_you_owe = 0;
  total_you_are_owed =0;

  calcSummary1() {
    for (let i=0; i< this.shared_expenses.length; i++) {
      if (this.shared_expenses[i].type=='1') {
        console.log(Number(this.shared_expenses[i].amount));
        this.total_you_owe =  Number(this.total_you_owe) + Number(this.shared_expenses[i].amount);
      }
    }
    return Number(this.total_you_owe);
  }

  calcSummary2() {
    for (let i=0; i< this.shared_expenses.length; i++) {
      if (this.shared_expenses[i].type=='2') {
        console.log(Number(this.shared_expenses[i].amount));
        this.total_you_are_owed = Number(this.total_you_are_owed) + Number(this.shared_expenses[i].amount);
      }
    }
    return Number(this.total_you_are_owed);
  }

  constructor(public dialog: MatDialog) { 
    this.total_you_owe = this.calcSummary1();
    this.total_you_are_owed =this.calcSummary2();
    console.log("owe: ", this.total_you_owe);
    console.log("owed: ", this.total_you_are_owed);
  }

  addNewExpense(expense?): void {
    console.log("Add/Edit new expense");
    console.log(expense);
    this.update = expense? true:false;
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {name: expense? expense.name:this.name, category:expense? expense.category:this.category, amount:expense? expense.amount:this.amount, split_data: this.split_data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.created_at=this.convertDate(Date.now())
      result.type='2';
      result.author = 'amritaravishankar00@gmail.com';
      result.payers = result.friend_list;
      
      let len = result.friend_list.length;
      console.log(len);

      for (let i=0; i<len; i++) {
        let copy=JSON.parse(JSON.stringify(result));
        copy.split_data = [copy.split_data[i]];
        this.total_you_are_owed =  this.total_you_are_owed + copy.split_data[0].amount;
        console.log(this.total_you_are_owed);
        this.shared_expenses.unshift(copy);
      }
    });
  }

  convertDate(timestamp) {
    timestamp = parseFloat(timestamp);
    let months = {1: "January", 2:"February", 3:"March", 4:"April", 5:"May", 6: "June", 7: "July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"};
    let theDate = new Date(timestamp);
    let month = theDate.getMonth() + 1;
    let date = theDate.getDate() - 1;
    let year = theDate.getFullYear();
    let date_postfix = this.datePostfix(date);
    let final_date = date + date_postfix + " " +  months[month] + ", " + year; 
    return final_date
  }

  datePostfix(d) {
    if (d > 3 && d < 21) 
      return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }



}
