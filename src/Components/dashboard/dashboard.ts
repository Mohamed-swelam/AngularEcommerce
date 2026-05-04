import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { catchError, finalize, Observable, of, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  data$!: Observable<any[]>;
  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.data$ = this.userService.getUsers().pipe(
      catchError(() => {
        this.errorMessage = 'Failed to load users.';
        this.cd.markForCheck();

        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cd.markForCheck();

      })
    );
  }

  deleteUser(userId: number): void {

    if (!userId) return;

    const confirmed = confirm('Delete this user?');

    if (!confirmed) return;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Failed to delete user.';
      }
    });
  }

}
