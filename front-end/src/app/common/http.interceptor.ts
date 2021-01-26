import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CookieKeys } from './enum';
import { GlobalService } from '../services/global.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private cookie: CookieService,
        private localStorage: LocalStorageService,
        private dialogRef: MatDialog,
        private globalService: GlobalService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlc3luY2RlbW8iLCJpYXQiOjE2MTEyOTE5MDl9.mjwj5AJKXDbySCWm-rQXIo71xmBGa9b65FV1xLNeVpU';
        let api_key = '933099d9-aa05-4333-90d9-4b2811b8c650';

        let reqBody = req.body;
        let newRequest: HttpRequest<unknown>;

        // create empty body
        if (!reqBody) {
            reqBody = {};
        }

        let newBody: any;

        if (req.body instanceof FormData) {
            // file upload

            // const q = this.globalService.encrypt_request_body(reqBody.get('q'));

            // newBody.append('q', q);
            // newBody.append('image', reqBody.get('image'));
            newBody = new FormData();

            for (const pair of req.body.entries()) {
                const [key, value] = pair;
                let formValue = value;

                if (key === 'q') {
                    formValue = this.globalService.encrypt_request_body(value.toString());
                }

                newBody.append(key, formValue);
            }

        } else if (req.url.includes('/api/login/')) { // for login token is not required

            let body = JSON.stringify(reqBody);

            // encrypt body
            newRequest = req.clone();
            let encryptedText = this.globalService.encrypt_request_body(body);
            newBody = { q: encryptedText };

        } else { // add token and encrypt body

            // add token and api_key if available
            if (token != '' && api_key != '') {

                reqBody.token = token;
                reqBody.secret = api_key;

                let body = JSON.stringify(reqBody);

                // encrypt body
                newRequest = req.clone();
                let encryptedText = this.globalService.encrypt_request_body(body);
                newBody = { q: encryptedText };

            } else {

                // redirect to login page
                // this.cookie.deleteAll();
                // if (!this.router.url.includes('login')) {
                //     this.router.navigate(['/']);
                // }
                // // close all dialogs if found
                // this.dialogRef.closeAll();

                // cancel request
                return EMPTY;
            }
        }

        // encrypt request
        if (req.url.includes('localhost') ||
            req.url.includes('resyncdev.com') ||
            req.url.includes('18.221.144.37') ||
            req.url.includes('resyncportal.com')) {

            newRequest = req.clone({
                body: newBody,
                responseType: 'text'
            });
        }

        return next.handle(newRequest)
            .pipe(
                // catchError(error => {
                //     console.log(error.constructor.name);
                //     console.log(error.error, error instanceof HttpErrorResponse);
                //     // convert encrypted string to json object
                //     if (error instanceof HttpErrorResponse) {

                //         // in place of clone:
                //         return throwError(new HttpErrorResponse({
                //             error: { error: this.decryptResBody(error.error) },
                //             headers: error.headers,
                //             status: error.status,
                //             statusText: error.statusText,
                //             url: error.url || undefined,
                //         }));

                //         // throw this.decryptResBody(event);
                //     } else {
                //         console.log('error else');
                //         throw event;
                //     }
                // }),
                map(event => {
                    // convert encrypted string to json object
                    if (event instanceof HttpResponse) {
                        return event.clone({
                            body: this.decryptResBody(event.body)
                        });
                    }
                    return event;
                }),
                catchError(err => {
                    if (err.status == 600) {
                        throw err;
                    }
                    if (err.status == 500) {

                        // redirect to Login
                        this.cookie.deleteAll();
                        this.localStorage.removeAll();

                        if (!this.router.url.includes('login')) {
                            this.router.navigate(['/']);
                        }

                        // cancel request
                        return EMPTY;
                    }
                    // continue request
                    return next.handle(newRequest);
                }),
                // retry(2)
            );
    }

    decryptResBody(event: string) {
        // return event.clone({
        //     body: JSON.parse(this.globalService.decrypt_request_body(event.body))
        // });
        return JSON.parse(this.globalService.decrypt_request_body(event));
    }

}
