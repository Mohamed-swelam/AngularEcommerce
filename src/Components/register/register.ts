import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../CustomValidation/passwordMatchValidator';
import { showToast } from '../../Services/simple-toast';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }




  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    //check if email already exists
    const email = this.registerForm.get('email')?.value;
    this.userService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (exists) {
          showToast('Email already exists. Please use a different email.', 'warning');
        } else {
          this.registerUser();
        }
      },
      error: (error) => {
        console.error('Error checking email existence:', error);
      }
    });
  }

  private registerUser() {

    const { firstName, lastName, email, password } = this.registerForm.getRawValue();
    this.userService.addUser({ firstName, lastName, email, password }).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
