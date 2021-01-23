import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
// import { MyHttpInterceptor } from 'src/app/common/http.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { LoadingComponentComponent } from './loading-component/loading-component.component';
import { PromptPwdComponent } from './prompt-pwd/prompt-pwd.component';
import { CustomLoadingSpinnerComponent } from './custom-loading-spinner/custom-loading-spinner.component';
import { DisplayDemoImgComponent } from './display-demo-img/display-demo-img.component';

@NgModule({
  declarations: [
    LoadingComponentComponent,
    PromptPwdComponent,
    CustomLoadingSpinnerComponent,
    DisplayDemoImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    HttpClientModule,
  ],
  exports: [
    LoadingComponentComponent,
    PromptPwdComponent,
    CustomLoadingSpinnerComponent,
    DisplayDemoImgComponent
  ],
  providers: [
    CookieService,
    // { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
  ]
})
export class CommonComponentsModule { }
