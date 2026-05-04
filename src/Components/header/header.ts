import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router) { }

  isAdmin(): boolean {

    return localStorage.getItem('role') === 'admin';
  }

  isLoggedIn(): boolean {

    return localStorage.getItem('auth') === 'true';
  }

  logout() {

    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
