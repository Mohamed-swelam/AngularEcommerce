import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = Array.isArray(response) ? response : [];
      },
      error: () => {
        this.errorMessage = 'Failed to load users.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteUser(userId: number) {
    if (!userId) {
      return;
    }

    const confirmed = confirm('Delete this user?');
    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      error: () => {
        this.errorMessage = 'Failed to delete user.';
      }
    });
  }
}
