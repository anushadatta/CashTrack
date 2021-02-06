import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  @Input() editExpense;
  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  personal_expenses = [
    {
      name : 'Pasta Express Diner',
      amount: '15.80',
      category: 'Food',
      created_at: '6th Febraury, 2021'
    },
    {
      name: 'Crowded Bowl',
      amount: '5.80',
      category: 'Food',
      created_at: '2nd Febraury, 2021'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteExpense(index: number) {
    this.personal_expenses.splice(index, 1);
}

  onEditExpense(expense){
    this.editExpense = expense;
    this.callParent();
  }

  callParent() {
    this.onEdit.emit(this.editExpense);
  }

}
