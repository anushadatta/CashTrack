import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  shared_expenses = [
    {
      name : 'Pasta Express Lunch',
      amount: '8.60',
      category: 'Food',
      created_at: '6th Febraury, 2021', 
      author: 'mehul.kumar171@gmail.com',
      payers: ['amritaravishankar00@gmail.com'],
      type: '1'
    },
    {
      name: 'Crowded Bowl',
      amount: '5.80',
      category: 'Food',
      created_at: '2nd Febraury, 2021',
      author: 'amritaravishankar00@gmail.com',
      payers: ['mehul.kumar171@gmail.com'],
      type: '2'
    },
  ];

  you_owe = [];
  you_are_owed = [];

  check_owe_or_owed() {
    for (let expense of this.shared_expenses)
    {
      if (expense.author == "amritaravishankar00@gmail.com")
      {
        this.you_are_owed.push(expense);
      }
      else if(expense.payers.includes("amritaravishankar00@gmail.com"))
      {
        this.you_owe.push(expense);
      }
    }
    console.log(this.you_owe);
    console.log(this.you_are_owed);
  }

  constructor() { 
    this.check_owe_or_owed();
  }

  ngOnInit(): void {
  }

}
