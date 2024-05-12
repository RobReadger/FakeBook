import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
52;
