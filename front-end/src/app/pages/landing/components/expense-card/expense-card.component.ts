import { Component, Input, OnInit } from '@angular/core';
import {CommentsComponent} from '../comments/comments.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() owe: boolean = true;
  @Input() owed: boolean = false;
  @Input() expense; 

  name: string;
  category: string;
  amount: string;
  // comments: [{name: "Mehul Kumar", comment: "Pls pay me fast"}];
  comment_text="";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getName(name) {
    if (name=="mehul.kumar171@gmail.com")
    {
      return "Mehul Kumar"
    }
  }

  showComments(): void {
    console.log("Comments");
    const dialogRef = this.dialog.open(CommentsComponent, {
      data: {comment: this.comment_text}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
  }

}
