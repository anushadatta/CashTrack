import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { MyHttpInterceptor } from 'src/app/common/http.interceptor';
import { CustomMaterialModule } from 'src/app/modules/custom-material/custom-material.module';
// import { ParticlesModule } from 'angular-particle';
import { NotifierModule } from 'angular-notifier';
import { notifierOptions } from 'src/app/common/variable';

import { LoginComponent } from './login.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    declarations: [
        LoginComponent,
        UpdatePasswordComponent,
        ForgotPwdComponent,
        DialogBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(appRoutes),
        // ParticlesModule,
        CustomMaterialModule,
        NotifierModule.withConfig(notifierOptions)
    ],
	providers: [
	    CookieService
    ],
    entryComponents: [
        UpdatePasswordComponent,
        ForgotPwdComponent,
        DialogBoxComponent
    ]
})
export class LoginModule {}
