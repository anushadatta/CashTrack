import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from 'angular-notifier';
import { HttpService } from 'src/app/services/http.service';
import { UserType } from 'src/app/common/enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  hide_current = true;
  hide_new = true;
  hide_confirm = true;

  updatePwdForm = new FormGroup({
    'password': new FormControl(''),
    'new_password': new FormControl(''),
    'new_confirm_pwd': new FormControl('')
  });

  // password = '';
  // new_password = '';
  // new_confirm_pwd = '';

  errorMsg = '';

  constructor(
    private http: HttpService,
    private notifier: NotifierService,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  save_password() {
    let password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    this.errorMsg = '';

    // check if any field is empty
    if (this.updatePwdForm.get('password').value === '' || this.updatePwdForm.get('new_password').value === '' || this.updatePwdForm.get('new_confirm_pwd').value === '') {
      this.errorMsg = 'Please insert all field';
      return;
    }

    // password and confirm password must match
    if (this.updatePwdForm.get('new_password').value !== this.updatePwdForm.get('new_confirm_pwd').value) {
      this.errorMsg = 'Password and Confirm Password does not match';
      return;
    }

    // old password and password must be different
    if (this.updatePwdForm.get('password').value === this.updatePwdForm.get('new_password').value) {
      this.errorMsg = 'Current Password and new password cannot be same';
      return;
    }

    // Min 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
    if (!(password_regex.test(this.updatePwdForm.get('password').value) || password_regex.test(this.updatePwdForm.get('new_password').value) || password_regex.test(this.updatePwdForm.get('new_confirm_pwd').value))) {
      this.errorMsg = 'Min 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character';
      return;
    }

    let validUser = '';
    if (this.data.type == UserType.site || this.data.type == UserType.demo_site) {
      validUser = this.data.site_user_name;
    } else {
      validUser = this.data.username;
    }

    // Insert query to update password for the first time
    let params = {
      username: validUser,
      password: this.updatePwdForm.get('new_password').value,
      default_pwd: this.data.default_pwd,
      old_password: this.updatePwdForm.get('password').value
    };

    this.http.funResetPassword(params)
      .subscribe(
        () => {
          this.notifier.notify('info', 'Password updated successfully. Login using new password');

          setTimeout(() => {
            this.dialogRef.close();
          }, 1500);
        },
        err => {
          // this.isOldPasswordValid = true;
          this.errorMsg = 'Please enter correct old password';
          console.log('error ', err);
        }
      );
  }

  ngOnInit() { }

}
