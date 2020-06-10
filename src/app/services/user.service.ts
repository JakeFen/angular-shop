import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user) {
    return this.http.post('/api/newUser', user);
  }

  findUser(username, password) {
    return this.http.get(`/api/user/${username}/${password}`);
  }
}
