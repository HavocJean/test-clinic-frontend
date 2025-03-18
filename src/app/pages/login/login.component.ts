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
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.authService.setToken(data.access_token);
        this.router.navigate(['history']);
      },
      error: (err) => {
        this.errorMessage = 'E-mail ou senha inválidos';
      }
    });
  }
}