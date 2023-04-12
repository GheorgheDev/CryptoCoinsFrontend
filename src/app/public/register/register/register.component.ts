import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private route: Router
  ) { }

  get getControlsForm() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Validacion para que sea unico
      fullname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Validacion para que sea unico
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      repeatPassword: ['', Validators.required]
    },
      {
        validator: this.checkPasswordsAreSame
      })
  }

  checkPasswordsAreSame(control: FormControl): ValidationErrors | null {
    const password = (control.get('password') as FormControl).value;
    const repeatPassword = (control.get('repeatPassword') as FormControl).value;

    return password !== repeatPassword ? { notSame: true } : null;
  }

  registerUser(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.registerService.registerUser(this.registerForm.value)
        .subscribe(() => {
          this.submitted = false;
          this.registerForm.reset();
          this.route.navigate(['login']);
        })
    }
  }
}