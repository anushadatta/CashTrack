import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  reseterror: boolean = false;

  isCredentialsValid = false;
  emailNotValid = false;
  errorMsg = '';

  forgotPasswordForm: FormGroup;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    private http: HttpService,
    private dialogRef: MatDialogRef<ForgotPwdComponent>,
    private dialog: MatDialog,
    private logger: NGXLogger
    ) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null),
    });

  }

  /**
   * @function funSendMail()
   * this function is called when ok button of dialog is clicked
   * it will send reset password link to specified mail address
   * @param {undefined}
   * @returns {undefined}
   */
  funSendMail() {
    if (!this.emailRegex.test(this.forgotPasswordForm.get('email').value)) {
      this.emailNotValid = true;
    } else {
      this.emailNotValid = false;
      this.http.funForgotPassword(this.forgotPasswordForm.get('email').value)
        .subscribe(() => {
          // this.reseterror = false;
          this.dialogRef.close();
          this.dialog.open(DialogBoxComponent, { width: 'auto' });
        }, error => {
          this.logger.error(error.error)
          // console.log(error.error);
          if (error.error) {
            this.isCredentialsValid = true;
            this.errorMsg = error.error;
          }
          // this.reseterror = true;
          // this.isCredentialsValid = true;
        });
    }
  }

  /**
   * @function funCloseDialog()
   * this function closes dialog
   * @param {undefined}
   * @returns {undefined}
   */
  funCloseDialog() {
    this.dialogRef.close();
  }
}
