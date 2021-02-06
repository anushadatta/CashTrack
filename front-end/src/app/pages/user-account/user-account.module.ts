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
// import { AlarmStatusComponent } from './components/alarm-status/alarm-status.component';
// import { BreakdownBarChartComponent } from './components/breakdown-bar-chart/breakdown-bar-chart.component';
// import { BreakdownDonutChartComponent } from './components/breakdown-donut-chart/breakdown-donut-chart.component';
// import { CsvSelectionForLandingComponent } from './components/csv-selection-for-landing/csv-selection-for-landing.component';
import { UserAccountComponent } from './user-account.component';

// tree shaking
// import * as echarts from 'echarts'
import echarts from 'echarts/index.common'


const appRoutes: Routes = [
    { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
    declarations: [
        UserAccountComponent,
        // CsvSelectionForLandingComponent,
        // AlarmStatusComponent,
        // BreakdownBarChartComponent,
        // BreakdownDonutChartComponent
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
        // CsvSelectionForLandingComponent,
        // AlarmStatusComponent
        // UserAccountComponent
    ]
})
export class UserAccountModule {}
