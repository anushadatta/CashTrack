import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InputExpenseComponent} from '../input-expense/input-expense.component';
import {PersonalExpensesHttpService} from '../../../../cashtrack-services/personal-expenses-http.service';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  @Input() expense; 
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onEditCard: EventEmitter<void> = new EventEmitter();
  @Output() updateFlag: EventEmitter<boolean> = new EventEmitter();


  name: string;
  category: string;
  amount: string;
  update:boolean = false;
  add:boolean = true;

  constructor(public dialog: MatDialog, private http: PersonalExpensesHttpService) { }

  ngOnInit(): void {
  }

  deleteExpense() {
    this.onDelete.emit();
   }

  editExpense(expense): void {
    this.update = true;
    this.add = false;
    console.log("Edit new expense");
    const dialogRef = this.dialog.open(InputExpenseComponent, {
      data: {name: expense.name, category:expense.category, amount:expense.amount, update:this.update, add: this.add}
    });
    this.update = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
    });
    this.postUpdatedExpense(expense);
  }

  postUpdatedExpense(expense) {
    console.log("post expense");
  //   let url = "kjalj";
  //   this.http.updatePersonalExpenses(url, { title: 'Angular POST Request Example' }).subscribe(data => {
  //       this.name = expense.name;
  //       this.category = expense.category;
  //       this.amount = expense.amount
  //   })
  }
}
