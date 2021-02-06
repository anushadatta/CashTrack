import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  constructor() { }

  ngOnInit(): void {
  }

}
