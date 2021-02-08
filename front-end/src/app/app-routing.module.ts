import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IsUserGaurd } from './auth/isUser.gaurd';

import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      },
    ]
  },
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    children: [
      {
        path: 'landing-page',
        loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
        canActivate: [IsUserGaurd],
      }, 

      {
        path: 'user-account',
        loadChildren: () => import('./pages/user-account/user-account.module').then(m => m.UserAccountModule),
      },
      {
        path: 'personal-expense',
        loadChildren: () => import('./pages/personal-expense/personal-expense.module').then(m => m.PersonalExpenseModule),
        canActivate: [IsUserGaurd],
      }, 
      {
        path: 'shared-expense',
        loadChildren: () => import('./pages/shared-expense/shared-expense.module').then(m => m.SharedExpenseModule),
        canActivate: [IsUserGaurd],
      }, 
      {
        path: 'your-friends',
        loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule),
        canActivate: [IsUserGaurd],
      }, 
      {
        path: 'your-groups',
        loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule),
        canActivate: [IsUserGaurd],
      }, 
    ]
  },

  {
    path: 'support',
    component: AppLayoutComponent,
    children: [
      {
        path: 'about-cashtrack',
        loadChildren: () => import('./pages/about-cashtrack/about-cashtrack.module').then(m => m.AboutCashtrackModule),
        canActivate: [IsUserGaurd],
      },
      {
        path: 'faq',
        loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule),
        canActivate: [IsUserGaurd],
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: "reload" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
