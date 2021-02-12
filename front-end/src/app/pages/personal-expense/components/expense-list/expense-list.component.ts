import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PersonalExpensesHttpService } from '../../../../cashtrack-services/personal-expenses-http.service';
import { SubSink } from 'subsink';
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
  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  subSink: SubSink;
  user_email: string;
  personal_expenses = [];
  isDataAvailable:boolean=false;
  constructor(public dialog: MatDialog, private cookie: CookieService, private http: PersonalExpensesHttpService) { }

  ngOnInit(): void {
    this.subSink = new SubSink();
    this.user_email = this.cookie.get('user-email');
    this.getPersonalExpense(this.user_email).then(() =>
        this.isDataAvailable = true);
    console.log(this.isDataAvailable);
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
    this.personal_expenses.splice(index, 1);
}

  getPersonalExpense (user_email) {
    return this.http.getPersonalExpenses(user_email).toPromise().
      then( (res) => {
        let res_obj : PersonalExpenses = JSON.parse(res.toString());
        this.personal_expenses = res_obj.data;
        console.log(this.personal_expenses);
      }); 
  }
}
