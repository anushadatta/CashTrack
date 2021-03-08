import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

interface PersonalExpenses {
  success: boolean;
  message: string;
  data: [{
    name: string;
    amount: number;
    category: string;
    created_at:string;
  }];
}

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  @Input() editExpense;
  @Input() expenses;
 
  expense_list;
  updated;
  index;

  isDataAvailable:boolean=true;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.expense_list = this.expenses;
  }

  deleteExpenseConfirm(expense) {  
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {               //Pass data object as a second parameter  
      data: { id: expense.id }, 
    });  

    dialogRef.afterClosed().subscribe(confirmresult => {  
      console.log(confirmresult);  
      if (confirmresult) {   
        this.onDeleteExpense(expense);  
        console.log("Delete confirm is approved by user.");  
      } else {  
        console.log("Delete confirm is cancelled by user.");  
      }  
    });  
  }  

  onDeleteExpense(index: number) {
    this.expense_list.splice(index, 1);
  }

  getOldExpense($event) {
    this.index = this.expense_list.indexOf($event);
    console.log("Index: ", this.index);
  }

  onEditExpense($event) {
    console.log("On edit expense list");
    this.updated = $event;
    console.log("Updated: ", this.updated);
    this.expense_list[this.index] = this.updated;
  }
}
