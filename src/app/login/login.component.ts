import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      loginPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(form) {
    const controls = form.controls;

    const username = controls.username.value;
    const password = controls.loginPassword.value;

    this.userService.findUser(username, password).subscribe((response) => {
      const currentUser = {
        id: response['id'],
        fullname: response['fullname'],
        username: response['username'],
        admin: response['admin'],
      };
      if (response) {
        let returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.loginForm.reset();
      } else console.log(currentUser);
    });
  }
}
