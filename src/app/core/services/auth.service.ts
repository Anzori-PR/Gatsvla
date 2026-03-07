import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth;

  // Reactive current user signal
  currentUser = signal<User | null>(null);

  constructor() {
    this.auth = inject(Auth);
    // Listen for auth state changes app-wide
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  // ── Email / Password ──────────────────────
  async login(email: string, password: string) {
  return signInWithEmailAndPassword(this.auth, email, password);
}

  async register(email: string, password: string, displayName: string) {
  const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  await updateProfile(credential.user, { displayName });
  return credential;
}

  // ── Google ───────────────────────────────
  async loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(this.auth, provider);
}

  // ── Facebook ─────────────────────────────
  async loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(this.auth, provider);
}

  // ── Logout ───────────────────────────────
  async logout() {
  return signOut(this.auth);
}

  get isLoggedIn() {
  return this.currentUser() !== null;
}
}