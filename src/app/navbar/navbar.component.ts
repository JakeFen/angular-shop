import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
  }
}
