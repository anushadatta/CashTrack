import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { NgxEchartsModule } from 'ngx-echarts';
import { AGM_API_KEY } from 'src/app/common/variable';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { CustomMaterialModule } from 'src/app/modules/custom-material/custom-material.module';
import { FriendsComponent } from './friends.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';


const appRoutes: Routes = [
    { path: '', component: FriendsComponent }
];

@NgModule({
    declarations: [
        FriendsComponent,
        AddFriendComponent, 
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
        
    ],
	providers: [
        CookieService
    ],
    entryComponents: [
        FriendsComponent
    ]
})

export class FriendsModule {}
