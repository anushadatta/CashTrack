import { Component, Input, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  deleteExpense() {
    this.onDelete.emit();
   }

}
