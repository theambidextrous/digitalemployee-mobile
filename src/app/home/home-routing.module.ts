import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeGuard } from '../guards/home.guard';
import { SessionDataResolver } from '../resolvers/sessionData.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      sessionData: SessionDataResolver
    },
    // redirectTo: '/home/dashboard',
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../pages/dashboard/dashboard.module').then(
            m => m.DashboardPageModule
          )
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../pages/messages/messages.module').then(
            m => m.MessagesPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(
            m => m.SettingsPageModule
          )
      },
      {
        path: 'userinfo',
        loadChildren: () =>
          import('../pages/userinfo/userinfo.module').then(
            m => m.UserinfoPageModule
          )
      },
      {
        path: 'agencycodes',
        loadChildren: () => 
        import('../pages/agencycodes/agencycodes.module').then(
          m => m.AgencycodesPageModule
        )
      },
      // default home destination
      { path: '', redirectTo: '/home/dashboard', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
