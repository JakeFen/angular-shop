import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user['admin']) return true;
    else return false;
  }
}
