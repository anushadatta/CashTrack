import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NotifierModule } from "angular-notifier";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyHttpInterceptor } from "./common/http.interceptor";
import { notifierOptions } from "./common/variable";
import { AppLayoutComponent } from "./components/app-layout/app-layout.component";
import { FormModalComponent } from "./components/form-modal/form-modal.component";
import { LoginLayoutComponent } from "./components/login-layout/login-layout.component";
import { SideBarNewComponent } from "./components/side-bar-new/side-bar-new.component";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { CommonComponentsModule } from "./modules/common-components/common-components.module";
import { CustomMaterialModule } from "./modules/custom-material/custom-material.module";
import { ConfirmDeleteDialog } from "./components/confirm-delete/confirm-delete.component";
import { InfoAlertDialog } from "./components/info-alert/info-alert.component";
import { APIResolver } from "./resolvers/energy-asset-info";
import { TimeagoModule} from 'ngx-timeago';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_BREAKPOINTS } from "./common/custom-breakpoints";
import { CustomShowHideDirective } from "./common/custom-show-hide.directive";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
    declarations: [
        AppComponent,
        LoginLayoutComponent,
        AppLayoutComponent,
        // DetailInfoComponent,
        FormModalComponent,
        // SideBarComponent,
        // DemoAccountComponent,
        ConfirmDeleteDialog,InfoAlertDialog,
        TopBarComponent,
        SideBarNewComponent,CustomShowHideDirective, 
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NotifierModule.withConfig(notifierOptions),
        CustomMaterialModule,
        JoyrideModule.forRoot(),
        // Ng4LoadingSpinnerModule.forRoot(),
        // ParticlesModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
        }),
        CommonComponentsModule,
        MatToolbarModule,
        MatTooltipModule,
        TimeagoModule.forRoot(),
        FlexLayoutModule.withConfig({ disableDefaultBps: true, addOrientationBps: true }, CUSTOM_BREAKPOINTS),
        LoggerModule.forRoot({
            level: environment.logging
                ? NgxLoggerLevel.LOG
                : NgxLoggerLevel.OFF,
            disableConsoleLogging: !environment.logging,
        }),
    ],
    entryComponents: [
        // DetailInfoComponent,
        FormModalComponent,
    ],
    providers: [
        CookieService,
        // CountryService,
        APIResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
