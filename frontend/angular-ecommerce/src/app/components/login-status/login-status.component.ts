import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {

  user$ = this.auth.user$; // Dane logowania
  storage: Storage = sessionStorage;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin }); // Wylogowanie użytkownika
    this.router.navigate(['/login']); // Nawigacja po wylogowaniu
  }

  ngOnInit(): void {
    // Subskrybuj dane użytkownika i zapisz adres e-mail w sessionStorage
    this.user$.subscribe(user => {
      if (user && user.email) {
        this.storage.setItem('userEmail', user.email);
        console.log('User email saved to sessionStorage:', user.email);
      }
    });
  }
}
