import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInBaseComponent } from './logged-in-base.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { LoggedInRoutesModule } from './logged-in-routes.module';

@NgModule({
  declarations: [LoggedInBaseComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    FooterModule,
    LoggedInRoutesModule,
  ],
})
export class LoggedInBaseModule {}
