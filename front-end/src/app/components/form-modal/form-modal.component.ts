import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MatDialogRef } from '@angular/material/dialog';

import { HttpService } from '../../services/http.service';
import { ApiResponseType } from 'src/app/types/common.type';

@Component({
    selector: 'form-modal',
    templateUrl: './form-modal.component.html',
    styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

    serverError;
    isFieldEmpty = false;
    isEmailValid = false;
    isUsernameValid = false;
    isCredentialsValid = false;

    email = "";
    message = "";
    subject = "";

    constructor(
        private http: HttpService,
        private dialogRef: MatDialogRef<FormModalComponent>,
        private notifier: NotifierService
    ) { }

    ngOnInit() { }

    /**
     * @function funSendClicked()
     * this function is called when ok button of dialog is clicked
     * it will send reset password link to specified mail address
     * @param {undefined}
     * @returns {undefined}
     */
    funSendClicked() {

        let email_rejex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // check if any field is empty
        if (this.message !== '' &&
            this.subject !== '' &&
            this.email !== '') {
            this.isFieldEmpty = false;

            // email must be in valid format
            if (email_rejex.test(this.email))
                this.isEmailValid = false;
            else
                this.isEmailValid = true;

            // check if all field values are valid
            if (!(this.isEmailValid ||
                this.isFieldEmpty)) {

                // send mail
                this.funSendMail();
            }

        } else { // field is empty
            this.isFieldEmpty = true;
        }
    }

    /**
     * @function funSendMail()
     * this functions send mail
     * @param {undefined}
     * @returns {undefined}
     */
    funSendMail() {

        let msg_with_email = ` <strong>From: ${this.email}</strong><br /><br /> ${this.message}`;

        let param = {
            msg_subject: this.subject,
            message: msg_with_email
        };
        this.http.funContactUs(param)
            .subscribe((data: ApiResponseType<any>) => {
                if (data.success && data.data['email_sent']) {
                    console.log('mail send successfully');
                    this.notifier.notify('info', 'Mail send successfully');

                    setTimeout(() => {
                        this.dialogRef.close();
                    }, 1500);
                }
            },
                (error) => this.serverError = error.error);
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
