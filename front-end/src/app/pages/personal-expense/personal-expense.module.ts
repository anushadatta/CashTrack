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
import { PersonalExpenseComponent } from './personal-expense.component';
import { ExpenseCardComponent } from './components/expense-card/expense-card.component';
import { InputExpenseComponent } from './components/input-expense/input-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';


const appRoutes: Routes = [
    { path: '', component: PersonalExpenseComponent }
];

@NgModule({
    declarations: [
        PersonalExpenseComponent,
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
        ExpenseCardComponent
    ]
})
export class PersonalExpenseModule {}
