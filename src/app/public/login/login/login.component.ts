import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/interfaces/user.interface';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  showErrorUserNotExist: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) { }

  get getFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginService.checkUserExist(email, password)
        .subscribe((user: User) => {
          if (!user) {
            this.showErrorUserNotExist = true;
            return;
          }

          this.showErrorUserNotExist = false;
          sessionStorage.setItem('userId', user.user_id || ''); // TODO: mejorar esto
          this.route.navigate(['dashboard']);
        })
    }
  }
}
