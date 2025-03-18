import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  isSubmit = false;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    this.errorMessage = '';
  
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.authService.setToken(data.access_token, data.expires_in);
        this.router.navigate(['history']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'E-mail ou senha inválidos';
      }
    });
  }

  clearError() {
    this.errorMessage = '';
    this.isSubmit = false;
  }
}