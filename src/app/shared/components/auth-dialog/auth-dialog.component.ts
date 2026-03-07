import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

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

  private authService = inject(AuthService);

  activeTab: 'login' | 'register' = 'login';
  personType: 'physical' | 'legal' = 'physical';
  showPassword = false;
  loading = false;
  errorMessage = '';

  loginForm  = { email: '', password: '' };
  registerForm = {
    firstName: '', lastName: '', companyName: '',
    email: '', phone: '', password: '', terms: false
  };

  close() {
    this.isOpen = false;
    this.errorMessage = '';
    this.closed.emit();
  }

  closeOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) this.close();
  }

  async onLogin() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'გთხოვთ შეავსოთ ყველა ველი';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.authService.login(this.loginForm.email, this.loginForm.password);
      this.close();
    } catch (e: any) {
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.loading = false;
    }
  }

  async onRegister() {
    if (!this.registerForm.terms) {
      this.errorMessage = 'გთხოვთ დაეთანხმოთ წესებს';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    try {
      const name = this.personType === 'physical'
        ? `${this.registerForm.firstName} ${this.registerForm.lastName}`
        : this.registerForm.companyName;
      await this.authService.register(this.registerForm.email, this.registerForm.password, name);
      this.close();
    } catch (e: any) {
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.authService.loginWithGoogle();
      this.close();
    } catch (e: any) {
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.loading = false;
    }
  }

  async loginWithFacebook() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.authService.loginWithFacebook();
      this.close();
    } catch (e: any) {
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      'auth/user-not-found':       'მომხმარებელი ვერ მოიძებნა',
      'auth/wrong-password':       'პაროლი არასწორია',
      'auth/email-already-in-use': 'ეს ელ.ფოსტა უკვე გამოყენებულია',
      'auth/weak-password':        'პაროლი ძალიან მარტივია (მინ. 6 სიმბოლო)',
      'auth/invalid-email':        'ელ.ფოსტის ფორმატი არასწორია',
      'auth/popup-closed-by-user': 'შესვლა გაუქმდა',
      'auth/too-many-requests':    'ძალიან ბევრი მცდელობა. სცადეთ მოგვიანებით',
    };
    return messages[code] ?? 'დაფიქსირდა შეცდომა. სცადეთ თავიდან';
  }
}