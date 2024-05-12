import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-data-change-dialog',
  templateUrl: './user-data-change-dialog.component.html',
  styleUrl: './user-data-change-dialog.component.scss',
})
export class UserDataChangeDialogComponent {
  userData?: User;
  dataChangeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDataChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder
  ) {
    this.userData = this.data;
    this.dataChangeForm = this.formBuilder.group(
      {
        name: [this.userData?.name, [Validators.required]],
        email: [this.userData?.email, [Validators.required, Validators.email]],
        password: [this.userData?.password, [Validators.required]],
        confirmPassword: [this.userData?.password, [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.dialogRef.close({
      uid: this.userData?.uid,
      name: this.dataChangeForm.get('name')?.value,
      email: this.dataChangeForm.get('email')?.value,
      password: this.dataChangeForm.get('password')?.value,
    } as User);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    if (!formGroup) {
      return false;
    }

    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
}
