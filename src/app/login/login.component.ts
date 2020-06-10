import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      loginPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(form) {
    let controls = form.controls;

    let username = controls.username.value;
    let password = controls.loginPassword.value;

    this.userService.findUser(username, password).subscribe((response) => {
      console.log(response);
    });
  }
}
