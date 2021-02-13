import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxEchartsModule } from 'ngx-echarts';
import { AGM_API_KEY } from 'src/app/common/variable';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { CustomMaterialModule } from 'src/app/modules/custom-material/custom-material.module';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseCardComponent } from './components/expense-card/expense-card.component';
import { LandingComponent } from './landing.component';
import { CommentsComponent } from './components/comments/comments.component';

// tree shaking
// import * as echarts from 'echarts'
import echarts from 'echarts/index.common'


const appRoutes: Routes = [
    { path: '', component: LandingComponent }
];

@NgModule({
    declarations: [
        LandingComponent,
        ExpenseCardComponent,
        ExpenseListComponent,
        CommentsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(appRoutes),
        CustomMaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'wrong_key'
    	}),
        // Ng4LoadingSpinnerModule,
        NgbModule,
        CommonComponentsModule,
        NgxEchartsModule.forRoot({
            echarts
        })
    ],
	providers: [
        CookieService
    ],
    entryComponents: [
        LandingComponent
    ]
})
export class LandingModule {}
