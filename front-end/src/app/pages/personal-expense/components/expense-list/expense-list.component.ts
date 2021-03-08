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
  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  
  expense_list;

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
}
