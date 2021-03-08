import { Component, Input, OnInit, Output } from '@angular/core';
import {CommentsComponent} from '../comments/comments.component';
import {MatDialog} from '@angular/material/dialog';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() owe: boolean = true;
  @Input() owed: boolean = false;
  @Input() expense; 
  @Output() settle: EventEmitter<void> = new EventEmitter();

  name: string;
  category: string;
  amount: string;
  // comments: [{name: "Mehul Kumar", comment: "Pls pay me fast"}];
  comment_text="";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("Expense card", this.expense);
  }

  getName(name) {
    if (name=="mehul.kumar171@gmail.com")
    {
      return "Mehul Kumar"
    }
    else if (name=="anushadatta@gmail.com")
    {
      return "Anusha Datta"
    }
    else if (name=="daniel@gmail.com")
    {
      return "Daniel Leong"
    }
    else if (name=="amritaravishankar00@gmail.com")
    {
      return "Amrita Ravishankar"
    }
    else
    {
      return name
    }
  }

  showComments(): void {
    console.log("Comments");
    const dialogRef = this.dialog.open(CommentsComponent, {
      data: {comment: this.comment_text}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  onAuthorSettleUp(expense) {
    this.settle.emit(expense);
  }

}
