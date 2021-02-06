import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  personal_expenses = [
    {
      title : 'Pasta Express Diner',
      amount: '15.80',
      tag: 'Food',
      created_at: '6th Febraury'
    },
    {
      title : 'Crowded Bowl',
      amount: '5.80',
      tag: 'Food',
      created_at: '2nd Febraury'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteExpense(index: number) {
    this.personal_expenses.splice(index, 1);
}

}
