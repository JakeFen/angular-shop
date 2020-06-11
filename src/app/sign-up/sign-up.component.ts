import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = fb.group({
      fullName: ['', Validators.required],
      signUpUsername: ['', Validators.required],
      signUpPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signUp(form) {
    let controls = form.controls;
    let user = {
      fullname: controls.fullName.value,
      username: controls.signUpUsername.value,
      password: controls.signUpPassword.value,
    };

    this.userService.createUser(user).subscribe((response) => {
      if (response) {
        const currentUser = {
          id: response['id'],
          fullname: response['fullname'],
          username: response['username'],
          admin: response['admin'],
        };
        this.router.navigateByUrl('/');
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.signUpForm.reset();
      }
    });
  }
}
