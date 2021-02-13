import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SplitByComponent } from './components/split-by/split-by.component';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseCardComponent } from './components/expense-card/expense-card.component';
import { SummaryRowListComponent } from './components/summary-row-list/summary-row-list.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
        SummaryRowListComponent,
        SummaryCardsComponent,
        CommentsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
