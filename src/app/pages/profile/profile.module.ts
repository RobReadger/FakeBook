import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { HeaderModule } from '../../components/header/header.module';
import { FeedModule } from '../feed/feed.module';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserDataChangeDialogComponent } from './components/user-data-change-dialog/user-data-change-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ProfileComponent,
    DeleteConfirmDialogComponent,
    UserDataChangeDialogComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    FeedModule,
    MatButton,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
