import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  activeTab: 'login' | 'register' = 'login';
  personType: 'physical' | 'legal' = 'physical';
  showPassword = false;

  loginForm = { email: '', password: '' };

  registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    terms: false
  };

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  closeOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  onLogin() {
    console.log('Login:', this.loginForm);
    // integrate with your auth service
  }

  onRegister() {
    console.log('Register:', this.registerForm);
    // integrate with your auth service
  }
}