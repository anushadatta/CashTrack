import { Component, Input, OnInit } from '@angular/core';
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getName(name) {
    if (name=="mehul.kumar171@gmail.com")
    {
      return "Mehul Kumar"
    }
  }
}
