import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(fb: FormBuilder, private userService: UserService) {
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

    console.log(user);
    this.userService.createUser(user).subscribe((response) => {
      this.signUpForm.reset();
      console.log(response);
    });
  }
}
