import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInBaseComponent } from './logged-in-base.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../pages/feed/feed.module').then((m) => m.FeedModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInRoutesModule {}
