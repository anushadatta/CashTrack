import { Component, Input, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEditCard: EventEmitter<void> = new EventEmitter();

  name: string;
  category: string;
  amount: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteExpense() {
    this.onDelete.emit();
   }

  editExpense() {
    console.log(this.expense);
    console.log("edit card");
    this.onEditCard.emit(this.expense);
  }

}
