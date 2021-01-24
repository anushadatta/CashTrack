import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';

import { ForgotPwdComponent } from "./components/forgot-pwd/forgot-pwd.component";
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
// import * as browserInfo from 'src/node_package/browserInfo';
import { CookieKeys, UserType } from 'src/app/common/enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponseType } from 'src/app/types/common.type';
import { environment as env } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    // username = '';
    // password = '';
    // isCredentialValid = false;
    // isCredentialEntered = false;
    errorMsg = '';

    hide = true;
    myStyle = {};
    myParams = {};
    width = 100;
    height = 100;

    loginForm: FormGroup;
    isLoading: boolean = false;

    public gapiSetup: boolean = false; // marks if the gapi library has been loaded
    public authInstance: gapi.auth2.GoogleAuth;
    public error: string;
    public user: gapi.auth2.GoogleUser;

    constructor(
        private router: Router,
        private http: HttpService,
        private cookie: CookieService,
        private localStorage: LocalStorageService,
        private dialog: MatDialog,
        private logger: NGXLogger,
        private zone: NgZone
    ) { }

    ngOnInit() {
        // this.myStyle = {
        //     'position': 'fixed', 'width': '100%', 'height': '100%',
        //     'z-index': 0, 'top': 0, 'left': 0, 'right': 0, 'bottom': 0
        // };

        // this.myParams = {
        //     particles: {
        //         "number": {
        //             "value": 80,
        //             "density": { "enable": true, "value_area": 700 }
        //         },
        //         "color": { "value": "#ffffff" },
        //         "shape": {
        //             "type": "circle",
        //             "stroke": { "width": 0, "color": "#000000" },
        //             "polygon": { "nb_sides": 5 },
        //         },
        //         "opacity": {
        //             "value": 0.5,
        //             "random": false,
        //             "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
        //         },
        //         "size": {
        //             "value": 3,
        //             "random": true,
        //             "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
        //         },
        //         "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        //         "move": {
        //             "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false,
        //             "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        //         }
        //     }
        // };
    }

    // onSubmit() {
    //     let userName = this.loginForm.get('username').value;
    //     let passWord = this.loginForm.get('password').value;
    //     this.isLoading = true;

    //     this.http.funLogin(userName, passWord)
    //         .subscribe((res: ApiResponseType<any>) => {

    //             if (res.success) {
    //                 this.isLoading = false;

    //                 const userInfo = res.data;

    //                 if (userInfo.length <= 0) {
    //                     this.errorMsg = 'Invalid Username or Password!';
    //                     return;
    //                 }

    //                 // set token if found
    //                 if (userInfo[0].token && userInfo[0].token != '') {
    //                     this.cookie.set(CookieKeys.token, userInfo[0].token);
    //                     this.cookie.set(CookieKeys.api_key, userInfo[0].api_key);
    //                 }

    //                 if (userInfo[0].default_pwd == 1) {

    //                     this.dialog.open(UpdatePasswordComponent, { width: '400px', data: userInfo[0] });

    //                 } else {

    //                     if (userInfo[0]['type'] === UserType.admin) {
    //                         this.cookie.set(CookieKeys.username, userName);
    //                         this.cookie.set(CookieKeys.user_type, userInfo[0]['type']);
    //                         this.cookie.set(CookieKeys.user_id, userInfo[0]['user_id']);
    //                         this.cookie.set(CookieKeys.admin_id, userInfo[0]['admin_id']);

    //                         // send user id to google analytics
    //                         // this.googleAnalyticsService.storeUserId(userInfo[0]['admin_id']);

    //                         // redirect to home page
    //                         this.router.navigate(["/dashboard/home"]);
    //                     }
    //                     else if (userInfo[0]['type'] === UserType.user || userInfo[0]['type'] === UserType.demo_user) {
    //                         this.funSaveLoginTime(userInfo);
    //                         this.cookie.set(CookieKeys.username, userName);
    //                         this.cookie.set(CookieKeys.user_type, userInfo[0]['type']);
    //                         this.cookie.set(CookieKeys.user_id, userInfo[0]['user_id']);

    //                         // set site_user_id if available
    //                         if (userInfo[0]['site_user_id']) {
    //                             this.cookie.set(CookieKeys.site_user_id, userInfo[0]['site_user_id']);
    //                         }

    //                         // send user id to google analytics
    //                         // this.googleAnalyticsService.storeUserId(userInfo[0]['user_id']);
    //                         console.log(userInfo);
                            
    //                         // redirect to landing page
    //                         this.router.navigate(['dashboard/landing-page']);
    //                     }
    //                     else if (userInfo[0]['type'] == UserType.site || userInfo[0]['type'] == UserType.demo_site) {
    //                         this.funSaveLoginTime(userInfo);
    //                         this.cookie.set(CookieKeys.user_type, userInfo[0]['type']);
    //                         this.cookie.set(CookieKeys.user_id, userInfo[0]['user_id']);
    //                         this.cookie.set(CookieKeys.site_id, userInfo[0]['site_id']);
    //                         this.localStorage.setItem(CookieKeys.site_id, userInfo[0]['site_id']);

    //                         // set site_user_id if available
    //                         if (userInfo[0]['site_user_id']) {
    //                             this.cookie.set(CookieKeys.site_user_id, userInfo[0]['site_user_id']);
    //                         }

    //                         // redirect to dashboard
    //                         this.router.navigate(['dashboard/site']);
    //                     }
    //                     else {
    //                         this.errorMsg = 'Invalid Username or Password!';
    //                         // this.isCredentialValid = true;
    //                         // this.isCredentialEntered = false;
    //                     }
    //                 }
    //                 // } else {
    //                 //     this.errorMsg = 'Invalid Username or Password!';
    //                 //     // this.isCredentialValid = true;
    //                 //     // this.isCredentialEntered = false;
    //                 // }
    //             }
    //         }, error => {
    //             this.isLoading = false;
    //             if (typeof error.error == 'string') {
    //                 this.errorMsg = 'Invalid Username or Password!';
    //             } else {
    //                 ;
    //             }
    //             this.logger.error(error)
    //             // console.log(error);

    //             // this.isCredentialValid = true;
    //             // this.isCredentialEntered = false;
    //         });
    // }

    async initGoogleAuth(): Promise<void> {
        //  Create a new Promise where the resolve 
        // function is the callback passed to gapi.load
        const pload = new Promise((resolve) => {
        gapi.load('auth2', resolve);
        });

        // When the first promise resolves, it means we have gapi
        // loaded and that we can call gapi.init
        return pload.then(async () => {
        await gapi.auth2
            .init({ client_id: "376624460777-n6gb18ucb6ghlibkmagvaoqrnlfn3bmg.apps.googleusercontent.com" })
            .then(auth => {
            this.gapiSetup = true;
            this.authInstance = auth;
            });
        });
    }

    async authenticate(): Promise<gapi.auth2.GoogleUser> {
        // Initialize gapi if not done yet
        this.isLoading = true;

        if (!this.gapiSetup) {
            console.log('setting up auth..');
            await this.initGoogleAuth();
        }
        
        // Resolve or reject signin Promise
        return new Promise(async () => {
            await this.authInstance.signIn().then(
                user => {
                    var profile = user.getBasicProfile();
                    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail());

                    this.cookie.set('user-name', profile.getName(), null, null, null, null, null);
                    this.cookie.set('user-email', profile.getEmail(), null, null, null, null, null);
                    this.cookie.set('user-img', profile.getImageUrl(), null, null, null, null, null);

                    this.isLoading = false;
                    console.log('from cookie: ', this.cookie.get('user-name'));

                    this.zone.run(() => {
                        this.router.navigate(['dashboard/landing-page']);
                    });
                    
                },
                error => {
                    console.log(error);
                    this.errorMsg = `Unable to Login ${error.error}`;
                    this.isLoading = false;
                });
        });
    }
}