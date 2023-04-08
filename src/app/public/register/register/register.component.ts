import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  registerUser(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.registerService.registerUser(this.registerForm.value)
        .subscribe(result => {
          // TODO: mostrar mensaje cuando se hace un registro
          this.route.navigate(['login']);
        })
      this.submitted = false;
      this.registerForm.reset();
    }
  }
}