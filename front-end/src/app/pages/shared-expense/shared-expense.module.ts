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
import echarts from 'echarts/index.common'
import { SharedExpenseComponent } from './shared-expense.component';
import { SplitByComponent } from './split-by/split-by.component';
import { InputExpenseComponent } from './input-expense/input-expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';

const appRoutes: Routes = [
    { path: '', component: SharedExpenseComponent }
];

@NgModule({
    declarations: [
        SharedExpenseComponent,
        SplitByComponent,
        InputExpenseComponent,
        ExpenseListComponent,
        ExpenseCardComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(appRoutes),
        CustomMaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'wrong_key'
    	}),
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
        SharedExpenseComponent
    ]
})
export class SharedExpenseModule {}
