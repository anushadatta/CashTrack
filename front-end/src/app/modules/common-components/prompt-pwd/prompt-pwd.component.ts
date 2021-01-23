import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys } from 'src/app/common/enum';
import { ApiResponseType } from 'src/app/types/common.type';

@Component({
  selector: 'app-prompt-pwd',
  templateUrl: './prompt-pwd.component.html',
  styleUrls: ['./prompt-pwd.component.css']
})
export class PromptPwdComponent implements OnInit {

  password: string;
  isPasswordEntered = false;
  isPasswordCorrect = false;

  hide = true;

  constructor(
    private dialogRef: MatDialogRef<PromptPwdComponent>,
    private http: HttpService,
    private cookie: CookieService
  ) { }

  ngOnInit() { }

  /**
   * @function funCheckPassword()
   * this function confirms username and password
   * @param {undefined}
   * @returns {undefined}
   */
  funCheckPassword() {
    if (this.password && this.password !== '') {
      this.isPasswordEntered = false;
      let username = this.cookie.get(CookieKeys.username);
      this.http.funConfirmPassword(username, this.password)
        .subscribe((res: ApiResponseType<any>) => {
          if (res.success && res.data.length > 0 && res.data[0]['user_count'] > 0) {
            this.dialogRef.close(true);
          } else {
            this.isPasswordCorrect = true;
          }
        });
    } else {
      this.isPasswordEntered = true;
    }
  }

  /**
   * @function funCancelClicked()
   * this function closes this dialog
   * @param {undefined}
   * @returns {undefined}
   */
  funCancelClicked() {
    this.dialogRef.close(false);
  }
}
