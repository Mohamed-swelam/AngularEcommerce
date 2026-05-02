import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginError = '';
  isSubmitting = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginError = '';
    this.isSubmitting = true;
    const { email, password } = this.loginForm.getRawValue();

    this.userService.getUsers().subscribe({
      next: (response) => {
        const users = Array.isArray(response) ? response : [];
        const match = users.find(
          (user: any) => user.email === email && user.password === password
        );

        if (match) {
          this.router.navigate(['/']);
          return;
        }

        this.loginError = 'Invalid email or password.';
      },
      error: () => {
        this.loginError = 'Login failed. Please try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
